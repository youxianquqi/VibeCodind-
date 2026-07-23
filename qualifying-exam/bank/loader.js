/**
 * bank/loader.js — 注册题库到 window.EXAM_BANKS
 */
(function (global) {
  global.EXAM_BANKS = global.EXAM_BANKS || {};
  global.registerExamBank = function (moduleId, questions) {
    global.EXAM_BANKS[moduleId] = questions;
  };
})(typeof window !== "undefined" ? window : globalThis);
