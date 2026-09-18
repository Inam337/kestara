/**
 * Kestara shared loader: one-time session intro + internal-link page-transition beat.
 * Long intro (data-loader="long", Home) only plays once per browser session; every
 * other page falls back to the short intro. Once the session flag is set, no page
 * replays the intro — the click-intercept transition still runs for internal nav.
 */
(function () {
  "use strict";

  var SESSION_KEY = "kestara_loader_v1";
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function ready(fn) {
    if (document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }

  ready(function () {
    var loader = document.querySelector("[data-loader]");
    if (!loader) return;

    var isLong = loader.getAttribute("data-loader") === "long";
    var seen = false;
    try { seen = window.sessionStorage.getItem(SESSION_KEY) === "1"; } catch (e) { seen = false; }

    if (seen || reduceMotion) {
      loader.classList.add("is-hidden");
    } else {
      var fadeAt = isLong ? 1900 : 900;
      var removeAt = isLong ? 2500 : 1420;
      window.setTimeout(function () { loader.classList.add("is-out"); }, fadeAt);
      window.setTimeout(function () {
        loader.classList.add("is-hidden");
        try { window.sessionStorage.setItem(SESSION_KEY, "1"); } catch (e) {}
      }, removeAt);
    }

    document.addEventListener("click", function (ev) {
      var a = ev.target && ev.target.closest ? ev.target.closest("a") : null;
      if (!a) return;
      var href = a.getAttribute("href") || "";
      if (!href || href.charAt(0) === "#" || href.charAt(0) === "[" || a.target === "_blank") return;
      if (href.indexOf(".html") === -1) return;
      if (/^[a-z]+:\/\//i.test(href) && href.indexOf(window.location.origin) !== 0) return;

      ev.preventDefault();
      loader.classList.remove("is-hidden", "is-out");

      if (reduceMotion) {
        window.location.href = href;
        return;
      }
      window.setTimeout(function () {
        window.location.href = href;
      }, 720);
    }, true);
  });
})();
