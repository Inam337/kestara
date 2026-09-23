/**
 * Vercel serverless function: sends the contact form as an email via the Gmail API.
 * Auth is a Gmail OAuth2 refresh token (see scripts/get-gmail-refresh-token.js),
 * not the account password — the refresh token is scoped to gmail.send only.
 *
 * Two emails per submission:
 *   1. Internal notification to CONTACT_TO_EMAIL, subject tagged with the plan.
 *   2. Auto-reply to the sender with next steps for the plan they picked.
 * Abuse guards: a honeypot field and a best-effort per-IP rate limit (in-memory,
 * so it only holds within one warm function instance).
 */
const { google } = require("googleapis");

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
// GitHub usernames: 1–39 chars, alphanumeric or single hyphens, no leading/trailing hyphen
const GITHUB_RE = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i;

const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const rateHits = new Map();

// Single source of truth for plans. Access is granted through GitHub (public repo, or an
// invite to the plan's private-org team) — usage is not metered.
const PLANS = {
  free: {
    label: "Free",
    price: "$0",
    paid: false,
    includes: [
      "The public Kestara repository",
      "The full 12-phase AI-DLC workflow and every agent",
      "Community support through GitHub Issues"
    ]
  },
  starter: {
    label: "Starter",
    price: "$19/mo",
    paid: true,
    includes: [
      "Everything in Free",
      "Access to the private Pro Pack repository",
      "Starter theme and component library",
      "Extended Security, Performance and Deployment checklists"
    ]
  },
  pro: {
    label: "Professional",
    price: "$49/mo",
    paid: true,
    includes: [
      "Everything in Starter",
      "Access to the private Templates repository",
      "Industry templates (e-commerce, membership, LMS)",
      "CMS content-model presets",
      "Email support"
    ]
  },
  business: {
    label: "Business",
    price: "$149/mo",
    paid: true,
    includes: [
      "Everything in Professional",
      "All private repositories, up to 5 GitHub seats",
      "Early access to new releases",
      "Priority support"
    ]
  },
  enterprise: {
    label: "Enterprise",
    price: "Custom",
    paid: true,
    includes: [
      "Everything in Business",
      "Private fork and custom agent configuration",
      "Onboarding with the Kestara team"
    ]
  }
};

function encodeBase64Url(str) {
  return Buffer.from(str, "utf-8")
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

// Strip CR/LF so user input can never inject extra headers.
function headerSafe(value) {
  return String(value).replace(/[\r\n]+/g, " ").trim();
}

// RFC 2047 encode non-ASCII subjects (names, em dashes) so mail clients render them.
function encodeSubject(subject) {
  var safe = headerSafe(subject);
  return /^[\x20-\x7E]*$/.test(safe) ? safe : "=?UTF-8?B?" + Buffer.from(safe, "utf-8").toString("base64") + "?=";
}

function buildRawMessage({ to, from, replyTo, subject, text }) {
  var lines = [
    "From: " + headerSafe(from),
    "To: " + headerSafe(to),
    "Reply-To: " + headerSafe(replyTo),
    "Subject: " + encodeSubject(subject),
    "MIME-Version: 1.0",
    "Content-Type: text/plain; charset=UTF-8",
    "",
    text
  ];
  return encodeBase64Url(lines.join("\r\n"));
}

function validate(body) {
  var fullName = (body.fullName || "").trim();
  var email = (body.email || "").trim();
  var subject = (body.subject || "").trim();
  var message = (body.message || "").trim();
  var plan = (body.plan || "").trim();
  var github = (body.githubUsername || "").trim().replace(/^@/, "");

  var errors = {};
  if (!fullName) errors.fullName = "Full name is required.";
  if (!email || !EMAIL_RE.test(email)) errors.email = "A valid email address is required.";
  if (!subject) errors.subject = "Subject is required.";
  if (!message || message.length < 10) errors.message = "Message must be at least 10 characters.";
  if (plan && !PLANS[plan]) errors.plan = "Select a valid plan.";
  if (github && !GITHUB_RE.test(github)) errors.githubUsername = "Enter a valid GitHub username.";
  return errors;
}

function isRateLimited(ip) {
  var now = Date.now();
  var hits = (rateHits.get(ip) || []).filter(function (t) { return now - t < RATE_LIMIT_WINDOW_MS; });
  hits.push(now);
  rateHits.set(ip, hits);
  return hits.length > RATE_LIMIT_MAX;
}

function buildAutoReply({ fullName, planKey, github, repoUrl }) {
  var plan = PLANS[planKey];
  var firstName = fullName.split(/\s+/)[0];
  var lines = ["Hi " + firstName + ",", "", "Thanks for contacting Kestara. We've received your message and will reply to this address."];

  if (!plan) {
    lines.push("", "If you'd like to get started right away, the Kestara agent is free and open source:");
    if (repoUrl) lines.push(repoUrl);
  } else {
    lines.push("", "You selected the " + plan.label + " plan (" + plan.price + "). It includes:");
    plan.includes.forEach(function (item) { lines.push("  - " + item); });

    if (planKey === "free") {
      lines.push("", "Get started in three steps:");
      lines.push("  1. Clone the repository" + (repoUrl ? ": " + repoUrl : "."));
      lines.push("  2. Open the folder in Claude Code.");
      lines.push("  3. Start with the Idea phase — the agent will walk you through the rest.");
      if (repoUrl) lines.push("", "Questions and bug reports: " + repoUrl.replace(/\/$/, "") + "/issues");
    } else if (planKey === "enterprise") {
      lines.push("", "We'll be in touch to schedule a call about your requirements.");
    } else if (github) {
      lines.push("", "Once your plan is confirmed we'll invite the GitHub account @" + github + " to the private repositories.");
    } else {
      lines.push("", "To grant access to the private repositories, reply to this email with your GitHub username.");
    }
  }

  lines.push("", "— The Kestara team");
  return lines.join("\n");
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  var body = req.body || {};

  // Honeypot: real users never see or fill this field. Pretend success so bots don't retry.
  if ((body.website || "").trim()) {
    return res.status(200).json({ ok: true });
  }

  var ip = headerSafe((req.headers["x-forwarded-for"] || "").split(",")[0] || (req.socket && req.socket.remoteAddress) || "unknown");
  if (isRateLimited(ip)) {
    return res.status(429).json({ ok: false, error: "Too many messages. Please try again in a few minutes." });
  }

  var errors = validate(body);
  if (Object.keys(errors).length) {
    return res.status(400).json({ ok: false, errors: errors });
  }

  var CLIENT_ID = process.env.GMAIL_CLIENT_ID;
  var CLIENT_SECRET = process.env.GMAIL_CLIENT_SECRET;
  var REFRESH_TOKEN = process.env.GMAIL_REFRESH_TOKEN;
  var SENDER_EMAIL = process.env.GMAIL_SENDER_EMAIL;
  var TO_EMAIL = process.env.CONTACT_TO_EMAIL || SENDER_EMAIL;
  var REPO_URL = process.env.KESTARA_REPO_URL || "";

  if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN || !SENDER_EMAIL) {
    console.error("Gmail API is not configured: missing one of GMAIL_CLIENT_ID/GMAIL_CLIENT_SECRET/GMAIL_REFRESH_TOKEN/GMAIL_SENDER_EMAIL.");
    return res.status(500).json({ ok: false, error: "Mail service is not configured." });
  }

  var fullName = body.fullName.trim();
  var email = body.email.trim();
  var company = (body.company || "").trim();
  var subject = body.subject.trim();
  var planKey = (body.plan || "").trim();
  var plan = PLANS[planKey];
  // Username only matters for plans that grant private-repo access
  var github = plan && plan.paid ? (body.githubUsername || "").trim().replace(/^@/, "") : "";
  var message = body.message.trim();

  var textBody =
    "New contact form submission from the Kestara website.\n\n" +
    "Name: " + fullName + "\n" +
    "Email: " + email + "\n" +
    (company ? "Company: " + company + "\n" : "") +
    "Subject: " + subject + "\n" +
    (plan ? "Plan of Interest: " + plan.label + " (" + plan.price + ")\n" : "Plan of Interest: none selected\n") +
    (github ? "GitHub username: @" + github + " (https://github.com/" + github + ")\n" : "") +
    (plan && plan.paid && !github && planKey !== "enterprise" ? "Action: ask for a GitHub username to grant repo access.\n" : "") +
    "\nMessage:\n" + message + "\n";

  var planTag = plan ? plan.label : "No plan";

  try {
    var oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET);
    oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

    var gmail = google.gmail({ version: "v1", auth: oauth2Client });

    await gmail.users.messages.send({
      userId: "me",
      requestBody: {
        raw: buildRawMessage({
          to: TO_EMAIL,
          from: SENDER_EMAIL,
          replyTo: email,
          subject: "[Kestara · " + planTag + "] " + subject + " — " + fullName,
          text: textBody
        })
      }
    });

    // The internal notification is what matters; an auto-reply failure shouldn't fail the request.
    try {
      await gmail.users.messages.send({
        userId: "me",
        requestBody: {
          raw: buildRawMessage({
            to: email,
            from: "Kestara <" + SENDER_EMAIL + ">",
            replyTo: TO_EMAIL,
            subject: plan ? "Your Kestara " + plan.label + " plan — next steps" : "We received your message — Kestara",
            text: buildAutoReply({ fullName: fullName, planKey: planKey, github: github, repoUrl: REPO_URL })
          })
        }
      });
    } catch (replyErr) {
      console.error("Auto-reply send failed:", replyErr && replyErr.message ? replyErr.message : replyErr);
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Gmail API send failed:", err && err.message ? err.message : err);
    return res.status(502).json({ ok: false, error: "Failed to send message. Please try again later." });
  }
};
