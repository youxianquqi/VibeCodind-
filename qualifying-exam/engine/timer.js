/**
 * timer.js — 倒计时与自动交卷
 */
(function (global) {
  function createTimer(options) {
    const durationMs = options.durationMs ?? 45 * 60 * 1000;
    const onTick = options.onTick || (() => {});
    const onEnd = options.onEnd || (() => {});
    let remaining = options.remainingMs ?? durationMs;
    let timerId = null;
    let lastTs = null;
    let running = false;

    function format(ms) {
      const s = Math.max(0, Math.ceil(ms / 1000));
      const m = Math.floor(s / 60);
      const sec = s % 60;
      return String(m).padStart(2, "0") + ":" + String(sec).padStart(2, "0");
    }

    function tick(now) {
      if (!running) return;
      if (lastTs == null) lastTs = now;
      const delta = now - lastTs;
      lastTs = now;
      remaining -= delta;
      onTick(Math.max(0, remaining), format(remaining));
      if (remaining <= 0) {
        stop();
        onEnd();
        return;
      }
      timerId = requestAnimationFrame(tick);
    }

    function start() {
      if (running) return;
      running = true;
      lastTs = null;
      timerId = requestAnimationFrame(tick);
    }

    function stop() {
      running = false;
      if (timerId != null) cancelAnimationFrame(timerId);
      timerId = null;
    }

    function getRemaining() {
      return Math.max(0, remaining);
    }

    return { start, stop, format, getRemaining };
  }

  global.ExamTimer = { createTimer, DURATION_MS: 45 * 60 * 1000 };
})(typeof window !== "undefined" ? window : globalThis);
