/**
 * Contact page form: validate-on-blur (per field), clear-on-change,
 * validate-all-on-submit, then POST to /api/contact (Gmail API) and show
 * success/error state based on the response.
 */
(function () {
  "use strict";

  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  var GITHUB_RE = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i;

  // Short summaries shown under the plan select; full plan details live in api/contact.js.
  var PLAN_SUMMARY = {
    free: "Public repo, full 12-phase workflow, community support.",
    starter: "Adds the private Pro Pack: starter theme, components, extended checklists.",
    pro: "Adds the private Templates repo, CMS presets and email support.",
    business: "All private repos for up to 5 GitHub seats, early access, priority support.",
    enterprise: "Private fork, custom agent configuration and onboarding."
  };
  var PAID_WITH_INVITE = { starter: true, pro: true, business: true };

  var MESSAGES = {
    fullName: "Please enter your full name.",
    email_required: "Please enter your email address.",
    email_invalid: "Enter a valid email address.",
    githubUsername: "Enter a valid GitHub username.",
    subject: "Please select a subject.",
    message: "Please provide at least a sentence about your project."
  };

  function ready(fn) {
    if (document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }

  ready(function () {
    var form = document.querySelector("[data-contact-form]");
    if (!form) return;

    var successPanel = document.querySelector("[data-contact-success]");
    var alertBox = form.querySelector("[data-form-alert]");

    var fields = {
      fullName: form.querySelector("#k-name"),
      email: form.querySelector("#k-email"),
      company: form.querySelector("#k-company"),
      subject: form.querySelector("#k-subject"),
      plan: form.querySelector("#k-plan"),
      githubUsername: form.querySelector("#k-github"),
      message: form.querySelector("#k-message"),
      website: form.querySelector("#k-website")
    };

    var githubField = form.querySelector("[data-github-field]");
    var planSummary = form.querySelector("[data-plan-summary]");

    function githubVisible() {
      return !!PAID_WITH_INVITE[fields.plan.value];
    }

    // Optional field: only validated when shown and filled in.
    function validateGithub() {
      var value = fields.githubUsername.value.trim().replace(/^@/, "");
      if (!githubVisible() || !value) return "";
      return GITHUB_RE.test(value) ? "" : MESSAGES.githubUsername;
    }

    function syncPlan() {
      var key = fields.plan.value;
      planSummary.textContent = PLAN_SUMMARY[key] || "";
      planSummary.hidden = !PLAN_SUMMARY[key];
      githubField.hidden = !githubVisible();
      if (githubField.hidden) setFieldError("githubUsername", "");
    }

    function validateField(name, value) {
      switch (name) {
        case "fullName":
          return value.trim() ? "" : MESSAGES.fullName;
        case "email":
          if (!value.trim()) return MESSAGES.email_required;
          return EMAIL_RE.test(value.trim()) ? "" : MESSAGES.email_invalid;
        case "subject":
          return value ? "" : MESSAGES.subject;
        case "message":
          return value.trim().length >= 10 ? "" : MESSAGES.message;
        default:
          return "";
      }
    }

    function setFieldError(name, message) {
      var el = fields[name];
      var errorEl = form.querySelector('[data-error-for="' + name + '"]');
      if (message) {
        el.setAttribute("aria-invalid", "true");
        el.style.borderColor = "var(--error)";
        if (errorEl) { errorEl.textContent = message; errorEl.hidden = false; }
      } else {
        el.setAttribute("aria-invalid", "false");
        el.style.borderColor = "";
        if (errorEl) { errorEl.hidden = true; errorEl.textContent = ""; }
      }
    }

    function clearErrorOnChange(name) {
      setFieldError(name, "");
    }

    // Completion rail in the card's title bar: counts required fields that pass validation.
    var progressFill = form.querySelector("[data-form-progress]");
    var progressCount = form.querySelector("[data-form-progress-count]");
    var REQUIRED = ["fullName", "email", "subject", "message"];

    function updateProgress() {
      var done = REQUIRED.filter(function (name) { return !validateField(name, fields[name].value); }).length;
      if (progressFill) progressFill.style.width = (done / REQUIRED.length) * 100 + "%";
      if (progressCount) progressCount.textContent = done;
    }

    REQUIRED.forEach(function (name) {
      fields[name].addEventListener("input", updateProgress);
      fields[name].addEventListener("change", updateProgress);
    });
    updateProgress();

    fields.plan.addEventListener("change", syncPlan);
    syncPlan();
    fields.githubUsername.addEventListener("input", function () { setFieldError("githubUsername", ""); });
    fields.githubUsername.addEventListener("blur", function () { setFieldError("githubUsername", validateGithub()); });

    ["fullName", "email", "subject", "message"].forEach(function (name) {
      var el = fields[name];
      el.addEventListener("input", function () { clearErrorOnChange(name); });
      if (name === "subject") el.addEventListener("change", function () { clearErrorOnChange(name); });
      el.addEventListener("blur", function () {
        setFieldError(name, validateField(name, el.value));
      });
    });

    function validateAll() {
      var errors = {};
      ["fullName", "email", "subject", "message"].forEach(function (name) {
        var msg = validateField(name, fields[name].value);
        if (msg) errors[name] = msg;
      });
      var githubMsg = validateGithub();
      if (githubMsg) errors.githubUsername = githubMsg;
      return errors;
    }

    var submitBtn = form.querySelector('button[type="submit"]');
    var submitBtnDefaultHtml = submitBtn ? submitBtn.innerHTML : "";

    function setSending(isSending) {
      if (!submitBtn) return;
      submitBtn.disabled = isSending;
      submitBtn.innerHTML = isSending ? "Sending…" : submitBtnDefaultHtml;
    }

    function showAlert(text) {
      alertBox.textContent = text || "Please correct the highlighted fields before sending.";
      alertBox.hidden = false;
    }

    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var errors = validateAll();
      var names = Object.keys(errors);

      names.forEach(function (name) { setFieldError(name, errors[name]); });
      ["fullName", "email", "subject", "message", "githubUsername"].filter(function (n) { return names.indexOf(n) === -1; })
        .forEach(function (name) { setFieldError(name, ""); });

      if (names.length) {
        showAlert();
        var firstInvalid = fields[names[0]];
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      alertBox.hidden = true;
      setSending(true);

      fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: fields.fullName.value,
          email: fields.email.value,
          company: fields.company.value,
          subject: fields.subject.value,
          plan: fields.plan.value,
          githubUsername: githubVisible() ? fields.githubUsername.value : "",
          message: fields.message.value,
          website: fields.website.value
        })
      })
        .then(function (res) {
          return res.json().then(function (data) { return { ok: res.ok, data: data }; });
        })
        .then(function (result) {
          setSending(false);

          if (result.ok && result.data && result.data.ok) {
            form.hidden = true;
            successPanel.hidden = false;
            successPanel.focus();
            return;
          }

          if (result.data && result.data.errors) {
            Object.keys(result.data.errors).forEach(function (name) {
              setFieldError(name, result.data.errors[name]);
            });
          }
          showAlert(result.data && result.data.error && !result.data.errors
            ? result.data.error
            : "We couldn't send your message. Please check the fields and try again.");
        })
        .catch(function () {
          setSending(false);
          showAlert("We couldn't reach the server. Please try again in a moment.");
        });
    });

    var resetBtn = document.querySelector("[data-contact-reset]");
    if (resetBtn) {
      resetBtn.addEventListener("click", function () {
        form.reset();
        ["fullName", "email", "subject", "message", "githubUsername"].forEach(function (name) { setFieldError(name, ""); });
        updateProgress();
        syncPlan();
        alertBox.hidden = true;
        successPanel.hidden = true;
        form.hidden = false;
        fields.fullName.focus();
      });
    }
  });
})();
