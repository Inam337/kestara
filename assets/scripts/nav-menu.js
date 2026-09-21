/**
 * Kestara shared mobile nav: animated full-screen menu with backdrop,
 * body-scroll lock, and a small focus trap. Mirrors loader.js conventions.
 */
(function () {
  "use strict";

  function ready(fn) {
    if (document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }

  ready(function () {
    var toggle = document.getElementById("kNavToggle");
    var nav = document.getElementById("kNavCollapse");
    var backdrop = document.getElementById("kNavBackdrop");
    if (!toggle || !nav || !backdrop) return;

    var mq = window.matchMedia("(min-width: 861px)");
    var scrollY = 0;

    function focusableItems() {
      return nav.querySelectorAll("a, button");
    }

    function open() {
      scrollY = window.scrollY || window.pageYOffset || 0;
      document.body.classList.add("nav-open");
      document.body.style.top = (-scrollY) + "px";
      toggle.setAttribute("aria-expanded", "true");
      nav.setAttribute("aria-hidden", "false");
      var items = focusableItems();
      if (items.length) items[0].focus({ preventScroll: true });
      document.addEventListener("keydown", onKeydown);
    }

    function close(returnFocus) {
      document.body.classList.remove("nav-open");
      document.body.style.top = "";
      window.scrollTo(0, scrollY);
      toggle.setAttribute("aria-expanded", "false");
      nav.setAttribute("aria-hidden", "true");
      document.removeEventListener("keydown", onKeydown);
      if (returnFocus) toggle.focus({ preventScroll: true });
    }

    function isOpen() {
      return document.body.classList.contains("nav-open");
    }

    function onKeydown(ev) {
      if (ev.key === "Escape" || ev.key === "Esc") {
        close(true);
        return;
      }
      if (ev.key !== "Tab") return;
      var items = Array.prototype.filter.call(focusableItems(), function (el) {
        return el.offsetParent !== null;
      });
      if (!items.length) return;
      var first = items[0];
      var last = items[items.length - 1];
      if (ev.shiftKey && document.activeElement === first) {
        ev.preventDefault();
        last.focus();
      } else if (!ev.shiftKey && document.activeElement === last) {
        ev.preventDefault();
        first.focus();
      }
    }

    toggle.addEventListener("click", function () {
      if (isOpen()) close(false);
      else open();
    });

    backdrop.addEventListener("click", function () { close(false); });

    nav.addEventListener("click", function (ev) {
      var a = ev.target && ev.target.closest ? ev.target.closest("a") : null;
      if (a) close(false);
    });

    mq.addEventListener
      ? mq.addEventListener("change", function (ev) { if (ev.matches) close(false); })
      : mq.addListener(function (ev) { if (ev.matches) close(false); });
  });
})();
