/**
 * draw.js — 按模块比例随机抽题 + 打乱选项顺序
 * 每模块：2 判断 + 2 单选 + 1 多选 = 5 题；10 模块共 50 题
 */
(function (global) {
  const MODULE_ORDER = [
    "M1",
    "M2",
    "M3",
    "M4",
    "M5",
    "M6",
    "M7",
    "M8",
    "M9",
    "M10",
  ];

  const DRAW_PLAN = { judge: 2, single: 2, multi: 1 };

  function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function pickN(arr, n) {
    if (arr.length < n) {
      throw new Error(
        `题库不足：需要 ${n} 题，实际 ${arr.length}（${arr[0] && arr[0].module} ${arr[0] && arr[0].type}）`
      );
    }
    return shuffle(arr).slice(0, n);
  }

  /** 打乱选项并重映射 answer 索引 */
  function shuffleOptions(question) {
    const indices = question.options.map((_, i) => i);
    const shuffledIdx = shuffle(indices);
    const newOptions = shuffledIdx.map((i) => question.options[i]);
    const oldToNew = {};
    shuffledIdx.forEach((old, neu) => {
      oldToNew[old] = neu;
    });
    const newAnswer = question.answer.map((old) => oldToNew[old]).sort((a, b) => a - b);
    return {
      ...question,
      options: newOptions,
      answer: newAnswer,
      _optionMap: shuffledIdx,
    };
  }

  function groupBank(allQuestions) {
    const map = {};
    allQuestions.forEach((q) => {
      if (!map[q.module]) map[q.module] = { judge: [], single: [], multi: [] };
      if (!map[q.module][q.type]) map[q.module][q.type] = [];
      map[q.module][q.type].push(q);
    });
    return map;
  }

  /**
   * @param {Array} allQuestions 全题库
   * @returns {{ questions: Array, meta: Object }}
   */
  function drawExam(allQuestions) {
    const grouped = groupBank(allQuestions);
    const paper = [];

    MODULE_ORDER.forEach((mod) => {
      const g = grouped[mod];
      if (!g) throw new Error(`缺少模块题库：${mod}`);
      paper.push(...pickN(g.judge, DRAW_PLAN.judge).map(shuffleOptions));
      paper.push(...pickN(g.single, DRAW_PLAN.single).map(shuffleOptions));
      paper.push(...pickN(g.multi, DRAW_PLAN.multi).map(shuffleOptions));
    });

    // 保持模块顺序（每模块 5 题连在一起），题目在模块内已随机
    // 可选：整体再打乱模块块——计划要求按模块抽，不强制整体打乱；这里轻微打乱模块块顺序更贴近科目一
    const blocks = [];
    for (let i = 0; i < paper.length; i += 5) {
      blocks.push(paper.slice(i, i + 5));
    }
    const shuffledBlocks = shuffle(blocks);
    const questions = shuffledBlocks.flat().map((q, i) => ({
      ...q,
      examIndex: i,
    }));

    return {
      questions,
      meta: {
        drawnAt: Date.now(),
        count: questions.length,
        durationMs: 45 * 60 * 1000,
        passLine: 90,
        plan: DRAW_PLAN,
        modules: MODULE_ORDER.slice(),
      },
      answers: {},
      flags: {},
      currentIndex: 0,
      remainingMs: 45 * 60 * 1000,
    };
  }

  /** 练习模式：从题库或错题本抽 n 题 */
  function drawPractice(pool, n) {
    const list = shuffle(pool).slice(0, Math.min(n, pool.length));
    return list.map(shuffleOptions);
  }

  function collectAllBanks() {
    const banks = global.EXAM_BANKS || {};
    return Object.values(banks).flat();
  }

  function validateBank(allQuestions) {
    const grouped = groupBank(allQuestions);
    const report = [];
    MODULE_ORDER.forEach((mod) => {
      const g = grouped[mod] || { judge: [], single: [], multi: [] };
      report.push({
        module: mod,
        judge: g.judge.length,
        single: g.single.length,
        multi: g.multi.length,
        ok:
          g.judge.length >= 20 &&
          g.single.length >= 20 &&
          g.multi.length >= 10,
      });
    });
    return report;
  }

  global.ExamDraw = {
    MODULE_ORDER,
    DRAW_PLAN,
    shuffle,
    shuffleOptions,
    drawExam,
    drawPractice,
    collectAllBanks,
    validateBank,
    groupBank,
  };
})(typeof window !== "undefined" ? window : globalThis);
