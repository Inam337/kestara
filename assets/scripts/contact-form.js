/**
 * Contact page form: client-side-only validation state machine.
 * validate-on-blur (per field), clear-on-change, validate-all-on-submit, success + reset.
 * No backend endpoint is wired — see docs/.../README.md "Open Decisions for the Developer".
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

    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var errors = validateAll();
      var names = Object.keys(errors);

      names.forEach(function (name) { setFieldError(name, errors[name]); });
      ["fullName", "email", "subject", "message"].filter(function (n) { return names.indexOf(n) === -1; })
        .forEach(function (name) { setFieldError(name, ""); });

      if (names.length) {
        alertBox.hidden = false;
        var firstInvalid = fields[names[0]];
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      alertBox.hidden = true;
      form.hidden = true;
      successPanel.hidden = false;
      successPanel.focus();
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
