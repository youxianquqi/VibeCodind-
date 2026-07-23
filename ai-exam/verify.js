/**
 * AI 独立考自测：node verify.js
 */
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = __dirname;
const sandbox = { console };
sandbox.window = sandbox;
sandbox.globalThis = sandbox;

function run(file) {
  let code = fs.readFileSync(path.join(root, file), "utf8");
  if (code.charCodeAt(0) === 0xfeff) code = code.slice(1);
  vm.runInNewContext(code, sandbox, { filename: file });
}

run("bank/loader.js");
run("bank/ai-usage.js");
run("engine/scoring.js");
run("engine/draw.js");

let failed = 0;
const report = sandbox.AiExamDraw.validateBank();
console.log("题库:", report);
if (!report.ok || report.total < 20) {
  console.log("FAIL 题库");
  failed++;
} else console.log("OK 题库");

const paper = sandbox.AiExamDraw.drawExam();
console.log("抽题数:", paper.questions.length);
if (paper.questions.length !== 20) {
  failed++;
  console.log("FAIL 应为 20");
} else console.log("OK 20 题");

const byType = { judge: 0, single: 0, multi: 0 };
paper.questions.forEach((q) => byType[q.type]++);
console.log("题型:", byType);
if (byType.judge !== 8 || byType.single !== 8 || byType.multi !== 4) {
  failed++;
  console.log("FAIL 比例应为 8/8/4");
} else console.log("OK 8/8/4");

// 全对 → 合格
const allRight = {};
paper.questions.forEach((q, i) => {
  allRight[i] = q.answer.slice();
});
const full = sandbox.AiExamScoring.gradePaper(paper.questions, allRight);
console.log("全对: 错", full.wrongCount, "passed", full.passed);
if (full.wrongCount !== 0 || !full.passed) {
  failed++;
  console.log("FAIL 全应对合格");
} else console.log("OK 全对合格");

// 恰好错 4 → 合格；错 5 → 不合格
function makeWrong(n) {
  const answers = {};
  paper.questions.forEach((q, i) => {
    if (i < n) {
      // 故意答错：选一个不在答案里的选项
      const wrong = q.options.map((_, oi) => oi).filter((oi) => q.answer.indexOf(oi) === -1);
      answers[i] = wrong.length ? [wrong[0]] : [];
    } else {
      answers[i] = q.answer.slice();
    }
  });
  return sandbox.AiExamScoring.gradePaper(paper.questions, answers);
}

const w4 = makeWrong(4);
console.log("错4: wrong=", w4.wrongCount, "passed=", w4.passed);
if (w4.wrongCount !== 4 || !w4.passed) {
  failed++;
  console.log("FAIL 错4应合格");
} else console.log("OK 错4合格");

const w5 = makeWrong(5);
console.log("错5: wrong=", w5.wrongCount, "passed=", w5.passed);
if (w5.wrongCount !== 5 || w5.passed) {
  failed++;
  console.log("FAIL 错5应不合格");
} else console.log("OK 错5不合格");

console.log(failed ? failed + " failed" : "All checks passed");
process.exit(failed ? 1 : 0);
