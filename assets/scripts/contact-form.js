/**
 * Contact page form: validate-on-blur (per field), clear-on-change,
 * validate-all-on-submit, then POST to /api/contact (Gmail API) and show
 * success/error state based on the response.
 */
(function () {
  "use strict";

  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  var MESSAGES = {
    fullName: "Please enter your full name.",
    email_required: "Please enter your email address.",
    email_invalid: "Enter a valid email address.",
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
      message: form.querySelector("#k-message")
    };

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
      ["fullName", "email", "subject", "message"].filter(function (n) { return names.indexOf(n) === -1; })
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
          message: fields.message.value
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
          showAlert("We couldn't send your message. Please check the fields and try again.");
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
        ["fullName", "email", "subject", "message"].forEach(function (name) { setFieldError(name, ""); });
        alertBox.hidden = true;
        successPanel.hidden = true;
        form.hidden = false;
        fields.fullName.focus();
      });
    }
  });
})();
