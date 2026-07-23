/**
 * Aurora AI UI · 交互层
 * 涟漪 / Toast / 主题 / 数字滚动 / 环形仪表 / 彩带 / 滚动显现 / 引擎联动
 * 无依赖，file:// 协议可直接运行。
 */
(function (global) {
  "use strict";

  /* ---------- 主题 ---------- */
  const THEME_KEY = "ai_ui_theme";

  function getTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved) return saved;
    return global.matchMedia && global.matchMedia("(prefers-color-scheme: light)").matches
      ? "light"
      : "dark";
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(THEME_KEY, theme);
    document.querySelectorAll("[data-theme-toggle]").forEach(function (btn) {
      btn.innerHTML = theme === "light" ? iconUse("moon") : iconUse("sun");
      btn.setAttribute("data-tip", theme === "light" ? "切换深色" : "切换浅色");
    });
  }

  function toggleTheme() {
    applyTheme(getTheme() === "light" ? "dark" : "light");
  }

  /* ---------- 图标 ---------- */
  function iconUse(name, cls) {
    return '<svg class="icon' + (cls ? " " + cls : "") + '" aria-hidden="true"><use href="#i-' + name + '"></use></svg>';
  }

  /* ---------- 按钮涟漪 ---------- */
  function initRipple() {
    document.addEventListener("pointerdown", function (e) {
      const btn = e.target.closest(".btn, .mode-card, .sheet-btn");
      if (!btn || btn.disabled) return;
      const rect = btn.getBoundingClientRect();
      const d = Math.max(rect.width, rect.height);
      const span = document.createElement("span");
      span.className = "ripple";
      span.style.width = span.style.height = d + "px";
      span.style.left = e.clientX - rect.left - d / 2 + "px";
      span.style.top = e.clientY - rect.top - d / 2 + "px";
      const cs = getComputedStyle(btn);
      if (cs.position === "static") btn.style.position = "relative";
      if (cs.overflow === "visible") btn.style.overflow = "hidden";
      btn.appendChild(span);
      setTimeout(function () { span.remove(); }, 650);
    });
  }

  /* ---------- Toast ---------- */
  let toastWrap = null;
  const TOAST_ICONS = { ok: "check-circle", bad: "x-circle", info: "info", warn: "alert" };

  function toast(message, type, duration) {
    type = type || "info";
    duration = duration || 2600;
    if (!toastWrap) {
      toastWrap = document.createElement("div");
      toastWrap.className = "toast-wrap";
      document.body.appendChild(toastWrap);
    }
    const el = document.createElement("div");
    el.className = "toast toast--" + type;
    el.innerHTML = iconUse(TOAST_ICONS[type] || "info") + "<span>" + message + "</span>";
    toastWrap.appendChild(el);
    setTimeout(function () {
      el.classList.add("is-out");
      setTimeout(function () { el.remove(); }, 260);
    }, duration);
  }

  /* ---------- Modal 确认框（Promise 版 confirm） ---------- */
  function confirmModal(options) {
    const opts = Object.assign(
      { title: "确认操作", message: "", okText: "确定", cancelText: "取消", danger: false, icon: "alert" },
      options
    );
    return new Promise(function (resolve) {
      const backdrop = document.createElement("div");
      backdrop.className = "modal-backdrop";
      backdrop.innerHTML =
        '<div class="modal" role="dialog" aria-modal="true">' +
        '<div class="modal__icon" style="' + (opts.danger ? "background:var(--bad-bg);color:var(--bad)" : "") + '">' +
        iconUse(opts.icon, "icon--lg") +
        "</div>" +
        "<h3>" + opts.title + "</h3>" +
        "<p>" + opts.message + "</p>" +
        '<div class="btn-row">' +
        '<button type="button" class="btn btn--ghost" data-act="cancel">' + opts.cancelText + "</button>" +
        '<button type="button" class="btn ' + (opts.danger ? "btn--danger" : "btn--primary") + '" data-act="ok">' + opts.okText + "</button>" +
        "</div></div>";
      document.body.appendChild(backdrop);
      function close(val) {
        backdrop.remove();
        document.removeEventListener("keydown", onKey);
        resolve(val);
      }
      function onKey(e) {
        if (e.key === "Escape") close(false);
        if (e.key === "Enter") close(true);
      }
      document.addEventListener("keydown", onKey);
      backdrop.addEventListener("click", function (e) {
        if (e.target === backdrop) close(false);
        const act = e.target.closest("[data-act]");
        if (act) close(act.getAttribute("data-act") === "ok");
      });
      const okBtn = backdrop.querySelector('[data-act="ok"]');
      if (okBtn) okBtn.focus();
    });
  }

  /* ---------- 数字滚动 ---------- */
  function countUp(el, target, options) {
    const opts = Object.assign({ duration: 1100, from: 0, suffix: "" }, options);
    const start = performance.now();
    function frame(now) {
      const t = Math.min(1, (now - start) / opts.duration);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = Math.round(opts.from + (target - opts.from) * eased) + opts.suffix;
      if (t < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  /* ---------- 环形仪表 ---------- */
  function animateGauge(bar, ratio) {
    const c = 2 * Math.PI * Number(bar.getAttribute("r"));
    bar.style.strokeDasharray = c.toFixed(2);
    bar.style.strokeDashoffset = c.toFixed(2);
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        bar.style.strokeDashoffset = (c * (1 - Math.max(0, Math.min(1, ratio)))).toFixed(2);
      });
    });
  }

  /* ---------- 彩带 ---------- */
  function confetti(options) {
    const opts = Object.assign({ count: 130, duration: 2600 }, options);
    const canvas = document.createElement("canvas");
    canvas.className = "confetti-canvas";
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    document.body.appendChild(canvas);
    const ctx = canvas.getContext("2d");
    const colors = ["#6e63f6", "#4d8dff", "#22d3ee", "#34d399", "#fbbf24", "#fb7185", "#f0abfc"];
    const parts = [];
    for (let i = 0; i < opts.count; i++) {
      parts.push({
        x: canvas.width / 2 + (Math.random() - 0.5) * canvas.width * 0.35,
        y: canvas.height * 0.28,
        vx: (Math.random() - 0.5) * 11,
        vy: -(4 + Math.random() * 9),
        size: 4 + Math.random() * 6,
        color: colors[(Math.random() * colors.length) | 0],
        rot: Math.random() * Math.PI,
        vr: (Math.random() - 0.5) * 0.25,
        shape: Math.random() > 0.4 ? "rect" : "circle",
      });
    }
    const start = performance.now();
    (function frame(now) {
      const elapsed = now - start;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;
      parts.forEach(function (p) {
        p.vy += 0.22;
        p.vx *= 0.992;
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vr;
        if (p.y < canvas.height + 30 && elapsed < opts.duration + 1400) alive = true;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.globalAlpha = Math.max(0, 1 - elapsed / (opts.duration + 1200));
        ctx.fillStyle = p.color;
        if (p.shape === "rect") ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
        else { ctx.beginPath(); ctx.arc(0, 0, p.size / 2.4, 0, 7); ctx.fill(); }
        ctx.restore();
      });
      if (alive) requestAnimationFrame(frame);
      else canvas.remove();
    })(start);
  }

  /* ---------- 滚动显现 ---------- */
  function initReveal() {
    const els = document.querySelectorAll("[data-reveal]");
    if (!els.length) return;
    if (!("IntersectionObserver" in global)) {
      els.forEach(function (el) { el.classList.add("is-in"); });
      return;
    }
    const io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            en.target.classList.add("is-in");
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.08 }
    );
    els.forEach(function (el) { io.observe(el); });
  }

  /* ---------- 题目卡片过渡（监听引擎重绘） ---------- */
  function initQuestionTransition() {
    const card = document.getElementById("question-card");
    if (!card) return;
    let first = true;
    new MutationObserver(function () {
      if (first) { first = false; return; }
      card.classList.remove("q-enter");
      void card.offsetWidth;
      card.classList.add("q-enter");
    }).observe(card, { childList: true });
  }

  /* ---------- 考试页：计时环 + 答题卡进度 与引擎同步 ---------- */
  function initExamSync(totalMs) {
    const total = totalMs || 20 * 60 * 1000;
    const timerEl = document.getElementById("timer");
    const ring = document.querySelector(".ring");
    const ringBar = ring && ring.querySelector(".ring__bar");

    function parseMs(text) {
      const m = /^(\d+):(\d{2})$/.exec((text || "").trim());
      return m ? (Number(m[1]) * 60 + Number(m[2])) * 1000 : null;
    }

    if (timerEl) {
      new MutationObserver(function () {
        const ms = parseMs(timerEl.textContent);
        // 环形进度
        if (ring && ringBar && ms != null) {
          const c = 2 * Math.PI * Number(ringBar.getAttribute("r"));
          ringBar.style.strokeDasharray = c.toFixed(2);
          ringBar.style.strokeDashoffset = (c * (1 - ms / total)).toFixed(2);
        }
        // 状态色同步到环
        if (ring) {
          ring.classList.toggle("is-warn", timerEl.classList.contains("is-warn"));
          ring.classList.toggle("is-danger", timerEl.classList.contains("is-danger"));
        }
      }).observe(timerEl, { childList: true, characterData: true, subtree: true, attributes: true, attributeFilter: ["class"] });
    }

    const grid = document.getElementById("sheet-grid");
    const countEl = document.querySelector(".sheet-count");
    const progressEl = document.querySelector(".sheet-progress > i");
    if (grid) {
      new MutationObserver(function () {
        const answered = grid.querySelectorAll(".sheet-btn.is-answered").length;
        const all = grid.querySelectorAll(".sheet-btn").length || 20;
        if (countEl) countEl.textContent = answered + " / " + all;
        if (progressEl) progressEl.style.width = (answered / all) * 100 + "%";
      }).observe(grid, { childList: true, subtree: true, attributes: true, attributeFilter: ["class"] });
    }
  }

  /* ---------- 移动端答题卡抽屉 ---------- */
  function initSheetDrawer() {
    const fab = document.querySelector(".sheet-fab");
    const sheet = document.querySelector(".answer-sheet");
    if (!fab || !sheet) return;
    let backdrop = document.querySelector(".sheet-backdrop");
    if (!backdrop) {
      backdrop = document.createElement("div");
      backdrop.className = "sheet-backdrop";
      document.body.appendChild(backdrop);
    }
    function setOpen(open) {
      sheet.classList.toggle("is-open", open);
      backdrop.classList.toggle("is-open", open);
    }
    fab.addEventListener("click", function () { setOpen(!sheet.classList.contains("is-open")); });
    backdrop.addEventListener("click", function () { setOpen(false); });
    sheet.addEventListener("click", function (e) {
      if (e.target.closest(".sheet-btn") && global.innerWidth <= 920) setOpen(false);
    });
  }

  /* ---------- 开关 ---------- */
  function initSwitches() {
    document.querySelectorAll(".switch").forEach(function (sw) {
      sw.addEventListener("click", function () {
        sw.setAttribute("aria-checked", sw.getAttribute("aria-checked") === "true" ? "false" : "true");
      });
    });
  }

  /* ---------- 初始化 ---------- */
  function init() {
    if (global.AiIcons) global.AiIcons.inject();
    applyTheme(getTheme());
    initRipple();
    initReveal();
    initQuestionTransition();
    initSheetDrawer();
    initSwitches();
    document.querySelectorAll("[data-theme-toggle]").forEach(function (btn) {
      btn.addEventListener("click", toggleTheme);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  global.AiUI = {
    toast,
    confirm: confirmModal,
    countUp,
    animateGauge,
    confetti,
    icon: iconUse,
    applyTheme,
    toggleTheme,
    initExamSync,
  };
})(window);
