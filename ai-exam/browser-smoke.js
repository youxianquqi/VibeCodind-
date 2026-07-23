/**
 * 无头浏览器轻量冒烟（jsdom）：组卷、答题、交卷、合格判定
 * 运行：npx --yes -p jsdom node browser-smoke.js
 */
const fs = require("fs");
const path = require("path");
const { JSDOM, VirtualConsole } = require("jsdom");

const root = __dirname;
const vc = new VirtualConsole();
vc.on("error", (e) => console.error("JSDOM error:", e));

const html = fs.readFileSync(path.join(root, "exam.html"), "utf8");
const dom = new JSDOM(html, {
  url: "http://localhost:5179/exam",
  runScripts: "outside-only",
  resources: "usable",
  virtualConsole: vc,
  beforeParse(window) {
    window.alert = () => {};
    window.confirm = () => true;
  },
});

const { window } = dom;
const { document } = window;

function loadScript(rel) {
  const code = fs.readFileSync(path.join(root, rel), "utf8");
  window.eval(code);
}

[
  "bank/loader.js",
  "bank/ai-usage.js",
  "engine/storage.js",
  "engine/scoring.js",
  "engine/timer.js",
  "engine/draw.js",
].forEach(loadScript);

// 不加载 exam-app（依赖 rAF 循环）；手工走流程
window.AiExamStorage.clearPaper();
const paper = window.AiExamDraw.drawExam();
if (paper.questions.length !== 20) throw new Error("not 20");

// 故意错 5 题
paper.questions.forEach((q, i) => {
  if (i < 5) {
    const wrong = q.options.map((_, oi) => oi).filter((oi) => !q.answer.includes(oi));
    paper.answers[i] = wrong.length ? [wrong[0]] : [];
  } else {
    paper.answers[i] = q.answer.slice();
  }
});

window.AiExamStorage.savePaper(paper);
const raw = window.AiExamStorage._rawPaper();
if (/"answer"\s*:/.test(raw)) throw new Error("paper leak answer");

const loaded = window.AiExamStorage.loadPaper();
const result = window.AiExamScoring.gradePaper(loaded.questions, loaded.answers);
if (result.wrongCount !== 5 || result.passed) {
  throw new Error("expected fail at 5 wrong, got " + JSON.stringify(result));
}

// 错 4 过
const paper2 = window.AiExamDraw.drawExam();
paper2.questions.forEach((q, i) => {
  if (i < 4) {
    const wrong = q.options.map((_, oi) => oi).filter((oi) => !q.answer.includes(oi));
    paper2.answers[i] = wrong.length ? [wrong[0]] : [];
  } else paper2.answers[i] = q.answer.slice();
});
const r2 = window.AiExamScoring.gradePaper(paper2.questions, paper2.answers);
if (r2.wrongCount !== 4 || !r2.passed) throw new Error("expected pass at 4 wrong");

// 渲染一题（检查 escape）
const q = paper.questions[0];
document.getElementById("question-card").innerHTML =
  '<p class="q-stem">' +
  String(q.stem)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;") +
  "</p>";
if (!document.querySelector(".q-stem").textContent) throw new Error("render empty");

console.log("browser-smoke passed: 错5不合格 / 错4合格 / 无试卷明文答案");
