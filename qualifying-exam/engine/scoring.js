/**
 * scoring.js — 判断 / 单选 / 多选判分
 * 判断 1 分、单选 2 分、多选 4 分（全对才给分）
 */
(function (global) {
  const SCORE = { judge: 1, single: 2, multi: 4 };
  const PASS_LINE = 90;
  const TOTAL = 100;

  function normalize(arr) {
    return [...(arr || [])].map(Number).sort((a, b) => a - b);
  }

  function arraysEqual(a, b) {
    const x = normalize(a);
    const y = normalize(b);
    if (x.length !== y.length) return false;
    return x.every((v, i) => v === y[i]);
  }

  function scoreQuestion(question, userAnswer) {
    const points = SCORE[question.type] || 0;
    const ok = arraysEqual(question.answer, userAnswer || []);
    return { correct: ok, earned: ok ? points : 0, max: points };
  }

  /**
   * @param {Array} questions 试卷题目（含 answer）
   * @param {Object} answersMap { [index]: number[] }
   */
  function gradePaper(questions, answersMap) {
    let earned = 0;
    const details = questions.map((q, i) => {
      const user = answersMap[i] || [];
      const r = scoreQuestion(q, user);
      earned += r.earned;
      return {
        index: i,
        id: q.id,
        module: q.module,
        type: q.type,
        stem: q.stem,
        options: q.options,
        answer: q.answer,
        userAnswer: normalize(user),
        explain: q.explain,
        correct: r.correct,
        earned: r.earned,
        max: r.max,
      };
    });

    return {
      score: earned,
      total: TOTAL,
      passLine: PASS_LINE,
      passed: earned >= PASS_LINE,
      details,
      wrongList: details.filter((d) => !d.correct).map((d) => ({
        id: d.id,
        module: d.module,
        type: d.type,
        stem: d.stem,
        options: d.options,
        answer: d.answer,
        explain: d.explain,
      })),
    };
  }

  global.ExamScoring = {
    SCORE,
    PASS_LINE,
    TOTAL,
    scoreQuestion,
    gradePaper,
    arraysEqual,
    normalize,
  };
})(typeof window !== "undefined" ? window : globalThis);
