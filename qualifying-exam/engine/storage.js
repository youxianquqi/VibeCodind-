/**
 * storage.js — localStorage：错题本、历次成绩、当前试卷
 */
(function (global) {
  const KEYS = {
    paper: "qa_exam_paper",
    result: "qa_exam_result",
    wrong: "qa_wrong_book",
    history: "qa_exam_history",
  };

  function read(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return fallback;
      return JSON.parse(raw);
    } catch {
      return fallback;
    }
  }

  function write(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function savePaper(paper) {
    write(KEYS.paper, paper);
  }

  function loadPaper() {
    return read(KEYS.paper, null);
  }

  function clearPaper() {
    localStorage.removeItem(KEYS.paper);
  }

  function saveResult(result) {
    write(KEYS.result, result);
  }

  function loadResult() {
    return read(KEYS.result, null);
  }

  function addHistory(entry) {
    const list = read(KEYS.history, []);
    list.unshift(entry);
    write(KEYS.history, list.slice(0, 30));
  }

  function loadHistory() {
    return read(KEYS.history, []);
  }

  /** 错题本：以题目 id 为键去重，保留最新一次错误信息 */
  function addWrongQuestions(items) {
    const book = read(KEYS.wrong, {});
    items.forEach((q) => {
      book[q.id] = {
        id: q.id,
        module: q.module,
        type: q.type,
        stem: q.stem,
        options: q.options,
        answer: q.answer,
        explain: q.explain,
        savedAt: Date.now(),
      };
    });
    write(KEYS.wrong, book);
  }

  function removeWrong(id) {
    const book = read(KEYS.wrong, {});
    delete book[id];
    write(KEYS.wrong, book);
  }

  function loadWrongBook() {
    const book = read(KEYS.wrong, {});
    return Object.values(book).sort((a, b) => b.savedAt - a.savedAt);
  }

  function clearWrongBook() {
    write(KEYS.wrong, {});
  }

  global.ExamStorage = {
    savePaper,
    loadPaper,
    clearPaper,
    saveResult,
    loadResult,
    addHistory,
    loadHistory,
    addWrongQuestions,
    removeWrong,
    loadWrongBook,
    clearWrongBook,
  };
})(typeof window !== "undefined" ? window : globalThis);
