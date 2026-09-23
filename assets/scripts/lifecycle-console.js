/**
 * Home page lifecycle console: 12-phase autoplay stepper + hero ticker mirror.
 * Single source of truth (`active`) drives the console panel, the rail dots/marker/fill,
 * and the hero's live phase indicator.
 */
(function () {
  "use strict";

  var PHASES = [
    { num: "01", name: "Idea", color: "var(--stage-discovery)", owner: "Orchestrator", output: "Project brief",
      detail: "The intent is written down before anything else: what is being built, for whom, and what success looks like. No stack, no scope, no code yet." },
    { num: "02", name: "Discovery", color: "var(--stage-discovery)", owner: "Orchestrator", output: "Discovery report",
      detail: "Purpose, target users, business goals, existing systems and anything that must remain unchanged are established with the developer." },
    { num: "03", name: "Requirements", color: "var(--stage-requirements)", owner: "Architect", output: "Requirement set",
      detail: "Pages, features, integrations and third-party APIs are confirmed and scoped. Ambiguity is resolved here rather than discovered mid-build." },
    { num: "04", name: "Architecture", color: "var(--stage-architecture)", owner: "Architect", output: "Architecture decision record",
      detail: "Stack, theme approach, a single frontend framework and the project hierarchy are chosen and documented — one framework, never three." },
    { num: "05", name: "Design", color: "var(--stage-design)", owner: "Designer", output: "Page + component inventory",
      detail: "The approved design is analysed into global components, a page inventory and per-page handoff units before a line of markup is written." },
    { num: "06", name: "Development", color: "var(--stage-development)", owner: "Developer", output: "Templates + components",
      detail: "The global design system is built first, then pages one at a time. Every shared element is built once and reused — no duplicated CSS or JS." },
    { num: "07", name: "CMS / Backend", color: "var(--stage-cms)", owner: "CMS agent", output: "Content model",
      detail: "Content types, taxonomies and editable fields are modelled so administrators manage the site without touching code, with graceful empty states." },
    { num: "08", name: "Testing", color: "var(--stage-qa)", owner: "QA agent", output: "QA report",
      detail: "Functional, responsive and cross-browser checks run per page against real viewports — part of building the page, not a pass at the end." },
    { num: "09", name: "Security", color: "var(--stage-security)", owner: "Security agent", output: "Security review",
      detail: "Input validation, output escaping, nonces, permissions, upload handling and API exposure are reviewed before release." },
    { num: "10", name: "Performance", color: "var(--stage-performance)", owner: "Performance agent", output: "Before / after metrics",
      detail: "Assets, render-blocking resources, images, fonts, caching and queries are optimized, then measured again and recorded." },
    { num: "11", name: "Deployment", color: "var(--stage-deployment)", owner: "Deployment agent", output: "Release checklist",
      detail: "Backup, database, files, URL integrity, SSL and cache follow a controlled path from staging to production." },
    { num: "12", name: "Production", color: "var(--stage-production)", owner: "Orchestrator", output: "Verification + docs",
      detail: "The live site is verified end to end — pages, forms, media, admin, SEO, mobile — and handed over with documentation." }
  ];

  var AUTOPLAY_MS = 2800;

  function ready(fn) {
    if (document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }

  ready(function () {
    var console_ = document.querySelector("[data-lifecycle-console]");
    if (!console_) return;

    var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    var stages = Array.prototype.slice.call(console_.querySelectorAll(".console__stage"));
    var railWrap = console_.querySelector(".console__rail-wrap");
    var marker = console_.querySelector(".console__marker");
    var trackFill = console_.querySelector(".console__track-fill");
    var kickerNum = console_.querySelector("[data-kicker-num]");
    var nameEl = console_.querySelector("[data-detail-name]");
    var descEl = console_.querySelector("[data-detail-desc]");
    var ownerEl = console_.querySelector("[data-detail-owner]");
    var outputEl = console_.querySelector("[data-detail-output]");

    var tickerNum = document.querySelector("[data-ticker-num]");
    var tickerName = document.querySelector("[data-ticker-name]");

    var state = { active: 0, auto: true };
    var timer = null;

    // Keep the active stage centred in the horizontally scrollable rail (mobile layouts).
    // Scrolls only the rail container, never the page.
    function followActive() {
      if (!railWrap || railWrap.scrollWidth <= railWrap.clientWidth) return;
      var btn = stages[state.active];
      var target = btn.offsetLeft + btn.offsetWidth / 2 - railWrap.clientWidth / 2;
      railWrap.scrollTo({ left: Math.max(0, target), behavior: reduceMotion ? "auto" : "smooth" });
    }

    function render() {
      var phase = PHASES[state.active];
      var pos = ((state.active + 0.5) / PHASES.length) * 100 + "%";

      marker.style.left = pos;
      trackFill.style.width = pos;

      kickerNum.textContent = phase.num;
      nameEl.textContent = phase.name;
      descEl.textContent = phase.detail;
      ownerEl.textContent = phase.owner;
      outputEl.textContent = phase.output;

      if (tickerNum) tickerNum.textContent = phase.num;
      if (tickerName) tickerName.textContent = phase.name;

      followActive();

      stages.forEach(function (btn, i) {
        var stateAttr = i < state.active ? "completed" : (i === state.active ? "active" : "future");
        btn.setAttribute("data-state", stateAttr);
        if (i === state.active) {
          btn.querySelector(".console__dot").style.background = phase.color;
        } else {
          btn.querySelector(".console__dot").style.background = "";
        }
      });
    }

    function pick(i) {
      state.active = i;
      state.auto = false;
      render();
    }

    stages.forEach(function (btn, i) {
      btn.addEventListener("click", function () { pick(i); });
    });

    render();

    if (!reduceMotion) {
      timer = window.setInterval(function () {
        if (!state.auto) return;
        state.active = (state.active + 1) % PHASES.length;
        render();
      }, AUTOPLAY_MS);
    }
  });
})();
