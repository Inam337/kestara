/**
 * Vercel serverless function: sends the contact form as an email via the Gmail API.
 * Auth is a Gmail OAuth2 refresh token (see scripts/get-gmail-refresh-token.js),
 * not the account password — the refresh token is scoped to gmail.send only.
 */
const { google } = require("googleapis");

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function encodeBase64Url(str) {
  return Buffer.from(str, "utf-8")
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function buildRawMessage({ to, from, replyTo, subject, text }) {
  var lines = [
    "From: " + from,
    "To: " + to,
    "Reply-To: " + replyTo,
    "Subject: " + subject,
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

  var errors = {};
  if (!fullName) errors.fullName = "Full name is required.";
  if (!email || !EMAIL_RE.test(email)) errors.email = "A valid email address is required.";
  if (!subject) errors.subject = "Subject is required.";
  if (!message || message.length < 10) errors.message = "Message must be at least 10 characters.";
  return errors;
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  var body = req.body || {};
  var errors = validate(body);
  if (Object.keys(errors).length) {
    return res.status(400).json({ ok: false, errors: errors });
  }

  var CLIENT_ID = process.env.GMAIL_CLIENT_ID;
  var CLIENT_SECRET = process.env.GMAIL_CLIENT_SECRET;
  var REFRESH_TOKEN = process.env.GMAIL_REFRESH_TOKEN;
  var SENDER_EMAIL = process.env.GMAIL_SENDER_EMAIL;
  var TO_EMAIL = process.env.CONTACT_TO_EMAIL || SENDER_EMAIL;

  if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN || !SENDER_EMAIL) {
    console.error("Gmail API is not configured: missing one of GMAIL_CLIENT_ID/GMAIL_CLIENT_SECRET/GMAIL_REFRESH_TOKEN/GMAIL_SENDER_EMAIL.");
    return res.status(500).json({ ok: false, error: "Mail service is not configured." });
  }

  var fullName = body.fullName.trim();
  var email = body.email.trim();
  var company = (body.company || "").trim();
  var subject = body.subject.trim();
  var message = body.message.trim();

  var textBody =
    "New contact form submission from the Kestara website.\n\n" +
    "Name: " + fullName + "\n" +
    "Email: " + email + "\n" +
    (company ? "Company: " + company + "\n" : "") +
    "Subject: " + subject + "\n\n" +
    "Message:\n" + message + "\n";

  try {
    var oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET);
    oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

    var gmail = google.gmail({ version: "v1", auth: oauth2Client });

    var raw = buildRawMessage({
      to: TO_EMAIL,
      from: SENDER_EMAIL,
      replyTo: email,
      subject: "[Kestara Contact] " + subject + " — " + fullName,
      text: textBody
    });

    await gmail.users.messages.send({
      userId: "me",
      requestBody: { raw: raw }
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Gmail API send failed:", err && err.message ? err.message : err);
    return res.status(502).json({ ok: false, error: "Failed to send message. Please try again later." });
  }
};
