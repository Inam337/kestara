/**
 * Kestara Guide: floating help chat (all pages). Builds its own markup, keeps the
 * conversation in sessionStorage, and POSTs the history to /api/chat (OpenAI).
 * Replies are rendered as escaped text with a tiny safe subset of markdown.
 */
(function () {
  "use strict";

  var STORE_KEY = "kestara-guide-chat";
  var MAX_INPUT = 1200;
  var GREETING = "Hi! I'm the **Kestara Guide**. I can explain how to set up the agent, what happens in each AI-DLC phase, and which plan fits your project. What would you like to know?";
  var SUGGESTIONS = [
    "How do I get started?",
    "What are the 12 phases?",
    "How do approval gates work?",
    "Which plan should I choose?"
  ];

  var MARK_SVG = '<svg viewBox="0 0 128 104" aria-hidden="true"><path d="M6 6 L70 46 L46 50 Z" fill="#1E3A8A"/><path d="M18 34 L74 54 L44 60 Z" fill="#3B82F6"/><path d="M24 52 L54 60 L36 66 Z" fill="#F59E0B"/><path d="M44 48 L122 42 L92 60 L60 64 Z" fill="#F8FAFC"/><path d="M58 62 L92 60 L34 98 Z" fill="#2563EB"/></svg>';

  function ready(fn) {
    if (document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }

  function load() {
    try { return JSON.parse(sessionStorage.getItem(STORE_KEY)) || []; } catch (e) { return []; }
  }
  function save(history) {
    try { sessionStorage.setItem(STORE_KEY, JSON.stringify(history.slice(-24))); } catch (e) { /* storage unavailable */ }
  }

  function escapeHtml(s) {
    return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  // Escape first, then allow **bold**, `code`, list lines and bare https links.
  function renderText(text) {
    var html = escapeHtml(text)
      .replace(/`([^`\n]+)`/g, "<code>$1</code>")
      .replace(/\*\*([^*\n]+)\*\*/g, "<strong>$1</strong>")
      .replace(/(^|\s)(https:\/\/[^\s<]+[^\s<.,;:!?)])/g, '$1<a href="$2" target="_blank" rel="noopener noreferrer">$2</a>');
    return html.split(/\n{2,}/).map(function (block) {
      var lines = block.split("\n");
      var isList = lines.every(function (l) { return /^\s*(\d+\.|[-*•])\s+/.test(l); });
      if (isList) {
        var ordered = /^\s*\d+\./.test(lines[0]);
        var items = lines.map(function (l) { return "<li>" + l.replace(/^\s*(\d+\.|[-*•])\s+/, "") + "</li>"; }).join("");
        return ordered ? "<ol>" + items + "</ol>" : "<ul>" + items + "</ul>";
      }
      return "<p>" + lines.join("<br>") + "</p>";
    }).join("");
  }

  ready(function () {
    var root = document.createElement("div");
    root.className = "k-chat";
    root.innerHTML =
      '<button type="button" class="k-chat__launcher" aria-expanded="false" aria-controls="kChatPanel">' +
        '<span class="k-chat__launcher-mark">' + MARK_SVG + '</span>' +
        '<span class="k-chat__launcher-text">Ask Kestara</span>' +
      '</button>' +
      '<section class="k-chat__panel" id="kChatPanel" role="dialog" aria-modal="false" aria-labelledby="kChatTitle" hidden>' +
        '<header class="k-chat__head">' +
          '<span class="k-chat__avatar">' + MARK_SVG + '</span>' +
          '<div class="k-chat__head-text">' +
            '<h2 class="k-chat__title" id="kChatTitle">Kestara Guide</h2>' +
            '<p class="k-chat__status"><span class="k-chat__status-dot"></span>AI assistant · setup &amp; guidelines</p>' +
          '</div>' +
          '<button type="button" class="k-chat__icon-btn" data-chat-reset aria-label="Start a new conversation" title="New conversation">' +
            '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10a6 6 0 1 0 1.8-4.3M4 4v3.5h3.5"/></svg>' +
          '</button>' +
          '<button type="button" class="k-chat__icon-btn" data-chat-close aria-label="Close chat">' +
            '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M5 5l10 10M15 5 5 15"/></svg>' +
          '</button>' +
        '</header>' +
        '<div class="k-chat__log" data-chat-log role="log" aria-live="polite" aria-relevant="additions"></div>' +
        '<div class="k-chat__chips" data-chat-chips></div>' +
        '<form class="k-chat__form" data-chat-form>' +
          '<label class="k-chat__sr" for="kChatInput">Ask a question about Kestara</label>' +
          '<textarea class="k-chat__input" id="kChatInput" rows="1" maxlength="' + MAX_INPUT + '" placeholder="Ask how to use the agent…"></textarea>' +
          '<button type="submit" class="k-chat__send" aria-label="Send message">' +
            '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10h11M11 5.5 15.5 10 11 14.5"/></svg>' +
          '</button>' +
        '</form>' +
        '<p class="k-chat__foot">AI answers can be inaccurate. For sales or partnerships, use the <a href="contact.html">contact form</a>.</p>' +
      '</section>';
    document.body.appendChild(root);

    var launcher = root.querySelector(".k-chat__launcher");
    var panel = root.querySelector(".k-chat__panel");
    var log = root.querySelector("[data-chat-log]");
    var chips = root.querySelector("[data-chat-chips]");
    var form = root.querySelector("[data-chat-form]");
    var input = root.querySelector(".k-chat__input");
    var sendBtn = root.querySelector(".k-chat__send");

    var history = load();
    var busy = false;

    function scrollToEnd() { log.scrollTop = log.scrollHeight; }

    function addBubble(role, text, extraClass) {
      var el = document.createElement("div");
      el.className = "k-chat__msg k-chat__msg--" + role + (extraClass ? " " + extraClass : "");
      if (role === "user") el.textContent = text;
      else el.innerHTML = renderText(text);
      log.appendChild(el);
      scrollToEnd();
      return el;
    }

    function renderChips() {
      chips.innerHTML = "";
      chips.hidden = history.length > 0;
      if (chips.hidden) return;
      SUGGESTIONS.forEach(function (q) {
        var b = document.createElement("button");
        b.type = "button";
        b.className = "k-chat__chip";
        b.textContent = q;
        b.addEventListener("click", function () { send(q); });
        chips.appendChild(b);
      });
    }

    function renderAll() {
      log.innerHTML = "";
      addBubble("assistant", GREETING);
      history.forEach(function (m) { addBubble(m.role, m.content); });
      renderChips();
    }

    function autosize() {
      input.style.height = "auto";
      input.style.height = Math.min(input.scrollHeight, 120) + "px";
    }

    function setBusy(state) {
      busy = state;
      sendBtn.disabled = state;
      input.setAttribute("aria-busy", state ? "true" : "false");
    }

    function send(text) {
      text = (text || "").trim();
      if (!text || busy) return;

      history.push({ role: "user", content: text.slice(0, MAX_INPUT) });
      save(history);
      addBubble("user", text);
      renderChips();
      input.value = "";
      autosize();

      var typing = addBubble("assistant", "", "k-chat__msg--typing");
      typing.innerHTML = "<span></span><span></span><span></span>";
      typing.setAttribute("aria-label", "Kestara Guide is typing");
      setBusy(true);

      fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history })
      })
        .then(function (res) {
          return res.json().catch(function () { return {}; }).then(function (data) { return { ok: res.ok, data: data }; });
        })
        .then(function (result) {
          typing.remove();
          if (result.ok && result.data.ok && result.data.reply) {
            history.push({ role: "assistant", content: result.data.reply });
            save(history);
            addBubble("assistant", result.data.reply);
          } else {
            // Drop the unanswered question so a retry doesn't send it twice.
            history.pop();
            save(history);
            addBubble("assistant", (result.data && result.data.error) || "Something went wrong. Please try again.", "k-chat__msg--error");
          }
        })
        .catch(function () {
          typing.remove();
          history.pop();
          save(history);
          addBubble("assistant", "I couldn't reach the server. Check your connection and try again.", "k-chat__msg--error");
        })
        .then(function () {
          setBusy(false);
          renderChips();
          if (!panel.hidden) input.focus();
        });
    }

    function open() {
      panel.hidden = false;
      root.classList.add("is-open");
      launcher.setAttribute("aria-expanded", "true");
      scrollToEnd();
      input.focus();
    }
    function close() {
      panel.hidden = true;
      root.classList.remove("is-open");
      launcher.setAttribute("aria-expanded", "false");
      launcher.focus();
    }

    launcher.addEventListener("click", function () { panel.hidden ? open() : close(); });
    root.querySelector("[data-chat-close]").addEventListener("click", close);
    root.querySelector("[data-chat-reset]").addEventListener("click", function () {
      if (busy) return;
      history = [];
      save(history);
      renderAll();
      input.focus();
    });
    panel.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });

    form.addEventListener("submit", function (e) { e.preventDefault(); send(input.value); });
    input.addEventListener("keydown", function (e) {
      if (e.key === "Enter" && !e.shiftKey && !e.isComposing) { e.preventDefault(); send(input.value); }
    });
    input.addEventListener("input", autosize);

    renderAll();
  });
})();
