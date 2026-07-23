/**
 * Aurora AI UI · 图标库
 * 语言：24px viewBox / 1.7 描边 / 圆角端点，对齐 Lucide / 主流 AI 产品图标风格
 * 用法：AiIcons.inject() 注入 sprite 后，AiIcons.use('check') 生成 <svg> 标记，
 *       或手写 <svg class="icon"><use href="#i-check"/></svg>
 */
(function (global) {
  const SPRITE = `
  <symbol id="i-sparkles" viewBox="0 0 24 24"><path d="M12 4l1.7 4.6 4.8 1.7-4.8 1.7L12 16.6l-1.7-4.6-4.8-1.7 4.8-1.7z"/><path d="M18.5 15.5l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8z"/><path d="M5 16l.6 1.7 1.7.6-1.7.6L5 20.6l-.6-1.7-1.7-.6 1.7-.6z"/></symbol>
  <symbol id="i-sparkle" viewBox="0 0 24 24"><path d="M12 4l1.8 5 5.2 1.8-5.2 1.8L12 17.8l-1.8-5.2L5 10.8l5.2-1.8z"/></symbol>
  <symbol id="i-bot" viewBox="0 0 24 24"><rect x="5" y="9" width="14" height="10" rx="3"/><path d="M12 9V5.5"/><circle cx="12" cy="4.2" r="1.3"/><path d="M3.5 12.5v3M20.5 12.5v3"/><circle cx="9.3" cy="13.4" r=".95" fill="currentColor" stroke="none"/><circle cx="14.7" cy="13.4" r=".95" fill="currentColor" stroke="none"/><path d="M9.6 16.5h4.8"/></symbol>
  <symbol id="i-cpu" viewBox="0 0 24 24"><rect x="7" y="7" width="10" height="10" rx="2"/><rect x="10.5" y="10.5" width="3" height="3" rx=".6"/><path d="M9.5 4v3M14.5 4v3M9.5 17v3M14.5 17v3M4 9.5h3M4 14.5h3M17 9.5h3M17 14.5h3"/></symbol>
  <symbol id="i-book" viewBox="0 0 24 24"><path d="M12 6.5c-1.5-1.2-3.5-1.7-7-1.7v13c3.5 0 5.5.5 7 1.7 1.5-1.2 3.5-1.7 7-1.7v-13c-3.5 0-5.5.5-7 1.7z"/><path d="M12 6.5v13"/></symbol>
  <symbol id="i-clock" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/></symbol>
  <symbol id="i-timer" viewBox="0 0 24 24"><circle cx="12" cy="13.5" r="7.5"/><path d="M12 10v3.5l2.5 1.5"/><path d="M10 2.5h4M12 2.5V6"/></symbol>
  <symbol id="i-flag" viewBox="0 0 24 24"><path d="M6 21V4"/><path d="M6 4.8h11l-2.5 3.7L17 12.2H6"/></symbol>
  <symbol id="i-check" viewBox="0 0 24 24"><path d="M4.5 12.5l5 5 10-11"/></symbol>
  <symbol id="i-check-circle" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5"/><path d="M8.5 12.3l2.4 2.4 4.6-5"/></symbol>
  <symbol id="i-x" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></symbol>
  <symbol id="i-x-circle" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5"/><path d="M9 9l6 6M15 9l-6 6"/></symbol>
  <symbol id="i-chevron-left" viewBox="0 0 24 24"><path d="M14.5 5.5L8 12l6.5 6.5"/></symbol>
  <symbol id="i-chevron-right" viewBox="0 0 24 24"><path d="M9.5 5.5L16 12l-6.5 6.5"/></symbol>
  <symbol id="i-arrow-left" viewBox="0 0 24 24"><path d="M19 12H5"/><path d="M11 6l-6 6 6 6"/></symbol>
  <symbol id="i-arrow-right" viewBox="0 0 24 24"><path d="M5 12h14"/><path d="M13 6l6 6-6 6"/></symbol>
  <symbol id="i-arrow-up-right" viewBox="0 0 24 24"><path d="M7 17L17 7"/><path d="M8.5 7H17v8.5"/></symbol>
  <symbol id="i-home" viewBox="0 0 24 24"><path d="M4 11.5L12 4l8 7.5"/><path d="M6.5 10v9.5h11V10"/></symbol>
  <symbol id="i-rotate" viewBox="0 0 24 24"><path d="M3.5 4.5V9H8"/><path d="M4.6 9A8.5 8.5 0 1 1 3.5 13.5"/></symbol>
  <symbol id="i-trash" viewBox="0 0 24 24"><path d="M4.5 6.5h15"/><path d="M9.5 6V4.5h5V6"/><path d="M6.5 6.5l.8 12.7a1.5 1.5 0 0 0 1.5 1.3h6.4a1.5 1.5 0 0 0 1.5-1.3l.8-12.7"/><path d="M10 10.5v6M14 10.5v6"/></symbol>
  <symbol id="i-chart" viewBox="0 0 24 24"><path d="M4 4v15.5a.5.5 0 0 0 .5.5H20"/><path d="M8 15.5v-4M12.5 15.5V8M17 15.5v-7"/></symbol>
  <symbol id="i-shield" viewBox="0 0 24 24"><path d="M12 3.5l7 2.5v5.5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z"/><path d="M9 11.8l2.2 2.2 4-4.5"/></symbol>
  <symbol id="i-zap" viewBox="0 0 24 24"><path d="M13 2.5L4.5 13.5H11L10 21.5l8.5-11H12z"/></symbol>
  <symbol id="i-alert" viewBox="0 0 24 24"><path d="M12 4L2.8 19.5h18.4z"/><path d="M12 10v4"/><circle cx="12" cy="16.8" r=".95" fill="currentColor" stroke="none"/></symbol>
  <symbol id="i-info" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5"/><path d="M12 11v5.2"/><circle cx="12" cy="7.8" r=".95" fill="currentColor" stroke="none"/></symbol>
  <symbol id="i-help" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5"/><path d="M9.6 9.4a2.6 2.6 0 1 1 3.6 2.9c-.9.5-1.2 1-1.2 2"/><circle cx="12" cy="17.2" r=".95" fill="currentColor" stroke="none"/></symbol>
  <symbol id="i-grad" viewBox="0 0 24 24"><path d="M2.5 9.5L12 5l9.5 4.5L12 14z"/><path d="M6.5 11.6V16c0 1.3 2.5 2.7 5.5 2.7s5.5-1.4 5.5-2.7v-4.4"/><path d="M21.5 9.5V15"/></symbol>
  <symbol id="i-target" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none"/></symbol>
  <symbol id="i-edit" viewBox="0 0 24 24"><path d="M16.8 3.8a2.35 2.35 0 0 1 3.3 3.3L8.5 18.7 4 20l1.3-4.5z"/><path d="M14.5 6.1l3.4 3.4"/></symbol>
  <symbol id="i-list" viewBox="0 0 24 24"><path d="M10.5 6.5H20M10.5 12H20M10.5 17.5H20"/><path d="M3.5 6l1.2 1.2L7 4.8"/><path d="M3.5 11.5l1.2 1.2L7 10.3"/><path d="M3.5 17l1.2 1.2L7 15.8"/></symbol>
  <symbol id="i-moon" viewBox="0 0 24 24"><path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/></symbol>
  <symbol id="i-sun" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2.5V5M12 19v2.5M2.5 12H5M19 12h2.5M5 5l1.8 1.8M17.2 17.2L19 19M19 5l-1.8 1.8M6.8 17.2L5 19"/></symbol>
  <symbol id="i-trophy" viewBox="0 0 24 24"><path d="M8 4.5h8V10a4 4 0 0 1-8 0z"/><path d="M8 6H4.8v1.5A3.2 3.2 0 0 0 8 10.7M16 6h3.2v1.5A3.2 3.2 0 0 1 16 10.7"/><path d="M12 14v2.5M9.5 16.5h5M8 20h8"/></symbol>
  <symbol id="i-flame" viewBox="0 0 24 24"><path d="M12 21a6 6 0 0 0 6-6c0-4-3-6.5-6-11-3 4.5-6 7-6 11a6 6 0 0 0 6 6z"/></symbol>
  <symbol id="i-layers" viewBox="0 0 24 24"><path d="M12 3.5l9 4.5-9 4.5-9-4.5z"/><path d="M3.5 12.5L12 16.8l8.5-4.3"/><path d="M3.5 16.5L12 20.8l8.5-4.3"/></symbol>
  <symbol id="i-wand" viewBox="0 0 24 24"><path d="M6 21L18.5 8.5"/><path d="M15 4l.5 1.5L17 6l-1.5.5L15 8l-.5-1.5L13 6l1.5-.5z"/><path d="M19.5 10.5l.4 1.1 1.1.4-1.1.4-.4 1.1-.4-1.1-1.1-.4 1.1-.4z"/><path d="M8.5 2.5l.4 1.1 1.1.4-1.1.4-.4 1.1-.4-1.1-1.1-.4 1.1-.4z"/></symbol>
  <symbol id="i-gauge" viewBox="0 0 24 24"><path d="M4 14.5a8 8 0 1 1 16 0"/><path d="M12 14.5l4-4.5"/><circle cx="12" cy="14.5" r="1.3" fill="currentColor" stroke="none"/></symbol>
  <symbol id="i-bulb" viewBox="0 0 24 24"><path d="M9.5 18h5M10.5 21h3"/><path d="M12 3.5a5.5 5.5 0 0 1 3 10.1c-.7.5-1 1-1 1.9v.5h-4v-.5c0-.9-.3-1.4-1-1.9A5.5 5.5 0 0 1 12 3.5z"/></symbol>
  <symbol id="i-history" viewBox="0 0 24 24"><path d="M3.5 12a8.5 8.5 0 1 1 2.5 6"/><path d="M3.5 4.5V9H8"/><path d="M12 8v4.2l3 1.8"/></symbol>
  <symbol id="i-menu" viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h16"/></symbol>
  <symbol id="i-award" viewBox="0 0 24 24"><circle cx="12" cy="9.5" r="5.5"/><path d="M8.8 14l-1.6 6.5 4.8-2.6 4.8 2.6L15.2 14"/></symbol>
  <symbol id="i-grid" viewBox="0 0 24 24"><rect x="4" y="4" width="7" height="7" rx="1.8"/><rect x="13" y="4" width="7" height="7" rx="1.8"/><rect x="4" y="13" width="7" height="7" rx="1.8"/><rect x="13" y="13" width="7" height="7" rx="1.8"/></symbol>
  <symbol id="i-eye" viewBox="0 0 24 24"><path d="M2.5 12S6 5.8 12 5.8 21.5 12 21.5 12 18 18.2 12 18.2 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="2.8"/></symbol>
  <symbol id="i-lock" viewBox="0 0 24 24"><rect x="5.5" y="10.5" width="13" height="9.5" rx="2"/><path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5"/></symbol>
  <symbol id="i-file" viewBox="0 0 24 24"><path d="M6 3.5h7.5L19 8.5V20.5H6z"/><path d="M13 3.5V9H19"/><path d="M9 13h6M9 16.5h6"/></symbol>
  <symbol id="i-send" viewBox="0 0 24 24"><path d="M21 3.5L3.5 10.8l7 2.2 2.2 7z"/><path d="M21 3.5L10.5 13"/></symbol>
  <symbol id="i-bookmark" viewBox="0 0 24 24"><path d="M6.5 4h11v16.5L12 16.8l-5.5 3.7z"/></symbol>
  <symbol id="i-refresh" viewBox="0 0 24 24"><path d="M20.5 4.5V9H16"/><path d="M19.4 9A8.5 8.5 0 1 0 20.5 13.5"/></symbol>
  <symbol id="i-sliders" viewBox="0 0 24 24"><path d="M5 8h6M15 8h4M5 16h2M11 16h8"/><circle cx="13" cy="8" r="2.2"/><circle cx="9" cy="16" r="2.2"/></symbol>
  `;

  function inject() {
    if (document.getElementById("ai-icons-sprite")) return;
    const wrap = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    wrap.setAttribute("id", "ai-icons-sprite");
    wrap.setAttribute("aria-hidden", "true");
    wrap.setAttribute(
      "style",
      "position:absolute;width:0;height:0;overflow:hidden"
    );
    wrap.innerHTML = SPRITE;
    (document.body || document.documentElement).appendChild(wrap);
  }

  function use(name, cls) {
    return (
      '<svg class="icon' + (cls ? " " + cls : "") + '" aria-hidden="true">' +
      '<use href="#i-' + name + '"></use></svg>'
    );
  }

  global.AiIcons = { inject, use, SPRITE };
})(window);
