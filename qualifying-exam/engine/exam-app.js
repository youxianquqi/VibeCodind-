/**
 * exam-app.js — 正式考试作答页
 */
(function () {
  const TYPE_LABEL = { judge: "判断", single: "单选", multi: "多选" };
  const TYPE_CLASS = { judge: "badge--judge", single: "badge--single", multi: "badge--multi" };
  const OPTION_LETTERS = "ABCDEFGH";

  let paper = null;
  let timer = null;
  let submitting = false;

  function ensurePaper() {
    const existing = ExamStorage.loadPaper();
    if (existing && existing.questions && existing.questions.length === 50 && existing.remainingMs > 0) {
      return existing;
    }
    const all = ExamDraw.collectAllBanks();
    const report = ExamDraw.validateBank(all);
    const bad = report.filter((r) => !r.ok);
    if (bad.length) {
      console.error("题库校验失败", bad);
      alert("题库不足，无法开考。请检查控制台。");
      location.href = "index.html";
      return null;
    }
    paper = ExamDraw.drawExam(all);
    ExamStorage.savePaper(paper);
    return paper;
  }

  function save() {
    ExamStorage.savePaper(paper);
  }

  function getAnswer(i) {
    return paper.answers[i] || [];
  }

  function setAnswer(i, arr) {
    paper.answers[i] = ExamScoring.normalize(arr);
    save();
    renderSheet();
  }

  function renderSheet() {
    const grid = document.getElementById("sheet-grid");
    grid.innerHTML = paper.questions
      .map(function (q, i) {
        const answered = (paper.answers[i] || []).length > 0;
        const flagged = !!paper.flags[i];
        const cur = i === paper.currentIndex;
        const cls = [
          "sheet-btn",
          answered ? "is-answered" : "",
          flagged ? "is-flagged" : "",
          cur ? "is-current" : "",
        ]
          .filter(Boolean)
          .join(" ");
        return (
          '<button type="button" class="' +
          cls +
          '" data-i="' +
          i +
          '">' +
          (i + 1) +
          "</button>"
        );
      })
      .join("");
  }

  function renderQuestion() {
    const i = paper.currentIndex;
    const q = paper.questions[i];
    const user = getAnswer(i);
    const isMulti = q.type === "multi";
    const inputType = isMulti ? "checkbox" : "radio";

    document.getElementById("progress-label").textContent =
      "第 " + (i + 1) + " / " + paper.questions.length + " 题 · " + q.module;

    const card = document.getElementById("question-card");
    const tip =
      q.type === "multi"
        ? '<p class="meta">多选题：请选出所有正确项（全对才得分）</p>'
        : q.type === "judge"
          ? '<p class="meta">判断题：选择「正确」或「错误」</p>'
          : '<p class="meta">单选题：请选择一项</p>';

    card.innerHTML =
      '<div class="q-meta">' +
      '<span class="badge ' +
      TYPE_CLASS[q.type] +
      '">' +
      TYPE_LABEL[q.type] +
      "</span>" +
      "<span>" +
      q.module +
      "</span>" +
      "<span>满分 " +
      ExamScoring.SCORE[q.type] +
      " 分</span>" +
      "</div>" +
      tip +
      '<p class="q-stem">' +
      escapeHtml(q.stem) +
      "</p>" +
      '<ul class="options" id="options">' +
      q.options
        .map(function (opt, oi) {
          const checked = user.indexOf(oi) !== -1;
          return (
            '<li class="option' +
            (checked ? " is-selected" : "") +
            '" data-oi="' +
            oi +
            '">' +
            '<input type="' +
            inputType +
            '" name="q' +
            i +
            '" value="' +
            oi +
            '"' +
            (checked ? " checked" : "") +
            " />" +
            '<span class="option-label">' +
            OPTION_LETTERS[oi] +
            ".</span>" +
            '<span class="option-text">' +
            escapeHtml(opt) +
            "</span>" +
            "</li>"
          );
        })
        .join("") +
      "</ul>";

    document.getElementById("btn-prev").disabled = i === 0;
    document.getElementById("btn-next").textContent =
      i === paper.questions.length - 1 ? "最后一题" : "下一题";
    document.getElementById("btn-flag").textContent = paper.flags[i]
      ? "取消标记"
      : "标记";

    card.querySelectorAll(".option").forEach(function (el) {
      el.addEventListener("click", function (e) {
        if (e.target.tagName === "INPUT") {
          // 让 change 处理
          return;
        }
        const input = el.querySelector("input");
        if (isMulti) {
          input.checked = !input.checked;
        } else {
          input.checked = true;
        }
        syncFromInputs();
      });
      el.querySelector("input").addEventListener("change", syncFromInputs);
    });

    renderSheet();
  }

  function syncFromInputs() {
    const i = paper.currentIndex;
    const q = paper.questions[i];
    const inputs = document.querySelectorAll("#options input");
    const selected = [];
    inputs.forEach(function (inp) {
      if (inp.checked) selected.push(Number(inp.value));
    });
    if (q.type !== "multi" && selected.length > 1) {
      selected.splice(0, selected.length - 1);
    }
    setAnswer(i, selected);
    document.querySelectorAll("#options .option").forEach(function (el) {
      const oi = Number(el.getAttribute("data-oi"));
      el.classList.toggle("is-selected", selected.indexOf(oi) !== -1);
    });
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function go(i) {
    paper.currentIndex = Math.max(0, Math.min(paper.questions.length - 1, i));
    save();
    renderQuestion();
  }

  function doSubmit(auto) {
    if (submitting) return;
    if (!auto) {
      const unanswered = paper.questions.filter(function (_, i) {
        return !(paper.answers[i] && paper.answers[i].length);
      }).length;
      const msg =
        (unanswered
          ? "还有 " + unanswered + " 题未作答。\n"
          : "") + "确定交卷？交卷后不可修改。";
      if (!confirm(msg)) return;
    }
    submitting = true;
    if (timer) timer.stop();
    paper.remainingMs = timer ? timer.getRemaining() : 0;
    const result = ExamScoring.gradePaper(paper.questions, paper.answers);
    result.at = Date.now();
    result.autoSubmit = !!auto;
    result.durationUsedMs =
      (paper.meta && paper.meta.durationMs ? paper.meta.durationMs : ExamTimer.DURATION_MS) -
      (paper.remainingMs || 0);
    ExamStorage.saveResult(result);
    ExamStorage.addHistory({
      at: result.at,
      score: result.score,
      passed: result.passed,
    });
    if (result.wrongList.length) {
      ExamStorage.addWrongQuestions(result.wrongList);
    }
    ExamStorage.clearPaper();
    location.href = "result.html";
  }

  function bind() {
    document.getElementById("btn-prev").addEventListener("click", function () {
      go(paper.currentIndex - 1);
    });
    document.getElementById("btn-next").addEventListener("click", function () {
      if (paper.currentIndex < paper.questions.length - 1) go(paper.currentIndex + 1);
    });
    document.getElementById("btn-flag").addEventListener("click", function () {
      const i = paper.currentIndex;
      paper.flags[i] = !paper.flags[i];
      save();
      renderQuestion();
    });
    document.getElementById("btn-submit").addEventListener("click", function () {
      doSubmit(false);
    });
    document.getElementById("sheet-grid").addEventListener("click", function (e) {
      const btn = e.target.closest("[data-i]");
      if (!btn) return;
      go(Number(btn.getAttribute("data-i")));
    });

    window.addEventListener("beforeunload", function () {
      if (paper && timer && !submitting) {
        paper.remainingMs = timer.getRemaining();
        save();
      }
    });
  }

  function startTimer() {
    const el = document.getElementById("timer");
    timer = ExamTimer.createTimer({
      remainingMs: paper.remainingMs,
      onTick: function (ms, text) {
        el.textContent = text;
        el.classList.toggle("is-warn", ms < 5 * 60 * 1000 && ms >= 60 * 1000);
        el.classList.toggle("is-danger", ms < 60 * 1000);
        paper.remainingMs = ms;
      },
      onEnd: function () {
        alert("时间到，系统自动交卷。");
        doSubmit(true);
      },
    });
    // 每 15 秒持久化一次剩余时间
    setInterval(function () {
      if (paper && timer && !submitting) {
        paper.remainingMs = timer.getRemaining();
        save();
      }
    }, 15000);
    timer.start();
  }

  paper = ensurePaper();
  if (!paper) return;
  bind();
  renderQuestion();
  startTimer();
})();
