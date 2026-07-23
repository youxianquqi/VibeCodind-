/**
 * 自测：node verify.js
 * 核对题库规模、抽题比例、计分与合格线
 */
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = __dirname;
const sandbox = {
  console,
  window: {},
  globalThis: {},
};
sandbox.window = sandbox;
sandbox.globalThis = sandbox;

function run(file) {
  const code = fs.readFileSync(path.join(root, file), "utf8");
  vm.runInNewContext(code, sandbox, { filename: file });
}

run("bank/loader.js");
[
  "bank/m1-semantic.js",
  "bank/m2-box-position.js",
  "bank/m3-bfc.js",
  "bank/m4-flex.js",
  "bank/m5-grid-responsive.js",
  "bank/m6-js-basics.js",
  "bank/m7-dom-events.js",
  "bank/m8-js-advanced.js",
  "bank/m9-js-async.js",
  "bank/m10-ai-usage.js",
].forEach(run);

run("engine/scoring.js");
run("engine/draw.js");

const all = sandbox.ExamDraw.collectAllBanks();
const report = sandbox.ExamDraw.validateBank(all);

let failed = 0;
console.log("=== 题库规模 ===");
report.forEach((r) => {
  const line = `${r.module} judge=${r.judge} single=${r.single} multi=${r.multi} ${r.ok ? "OK" : "FAIL"}`;
  console.log(line);
  if (!r.ok) failed++;
});
console.log("总题数:", all.length);
if (all.length < 500) {
  console.log("FAIL 题库应 ≥500，当前", all.length);
  failed++;
} else {
  console.log("OK 题库 ≥500");
}

console.log("\n=== 抽题 ===");
const paper = sandbox.ExamDraw.drawExam(all);
if (paper.questions.length !== 50) {
  console.log("FAIL count", paper.questions.length);
  failed++;
} else {
  console.log("OK 50 题");
}

const byType = { judge: 0, single: 0, multi: 0 };
const byMod = {};
paper.questions.forEach((q) => {
  byType[q.type]++;
  byMod[q.module] = (byMod[q.module] || 0) + 1;
});
console.log("题型:", byType);
if (byType.judge !== 20 || byType.single !== 20 || byType.multi !== 10) {
  console.log("FAIL 题型比例");
  failed++;
} else {
  console.log("OK 20/20/10");
}

Object.keys(byMod).forEach((m) => {
  if (byMod[m] !== 5) {
    console.log("FAIL 模块题数", m, byMod[m]);
    failed++;
  }
});
console.log("模块题数:", byMod);

// 每模块内类型
const modType = {};
paper.questions.forEach((q) => {
  modType[q.module] = modType[q.module] || { judge: 0, single: 0, multi: 0 };
  modType[q.module][q.type]++;
});
Object.entries(modType).forEach(([m, t]) => {
  if (t.judge !== 2 || t.single !== 2 || t.multi !== 1) {
    console.log("FAIL 模块内比例", m, t);
    failed++;
  }
});
console.log("OK 每模块 2+2+1");

console.log("\n=== 计分 ===");
// 全对
const allCorrect = {};
paper.questions.forEach((q, i) => {
  allCorrect[i] = q.answer.slice();
});
const full = sandbox.ExamScoring.gradePaper(paper.questions, allCorrect);
console.log("全对得分:", full.score, "passed:", full.passed);
if (full.score !== 100 || !full.passed) {
  console.log("FAIL 全对应 100 合格");
  failed++;
} else console.log("OK 满分 100 合格");

// 全错
const none = {};
const empty = sandbox.ExamScoring.gradePaper(paper.questions, none);
console.log("全空得分:", empty.score);
if (empty.score !== 0 || empty.passed) {
  console.log("FAIL 全空应 0 不合格");
  failed++;
} else console.log("OK 全空 0");

// 多选少选不得分
const multiQ = paper.questions.find((q) => q.type === "multi" && q.answer.length >= 2);
if (multiQ) {
  const idx = paper.questions.indexOf(multiQ);
  const answers = {};
  answers[idx] = [multiQ.answer[0]]; // 少选
  const r = sandbox.ExamScoring.scoreQuestion(multiQ, answers[idx]);
  console.log("多选少选得分:", r.earned);
  if (r.earned !== 0) {
    console.log("FAIL 多选少选应 0");
    failed++;
  } else console.log("OK 多选少选 0");
}

// 合格线：89 不合格，90 合格 —— 构造得分
console.log("合格线常量:", sandbox.ExamScoring.PASS_LINE);
if (sandbox.ExamScoring.PASS_LINE !== 90) {
  failed++;
  console.log("FAIL 合格线应为 90");
} else console.log("OK 合格线 90");

// 判断 1 / 单选 2 / 多选 4
const S = sandbox.ExamScoring.SCORE;
if (S.judge !== 1 || S.single !== 2 || S.multi !== 4) {
  console.log("FAIL 分值", S);
  failed++;
} else console.log("OK 分值 1/2/4");

console.log("\n=== 选项打乱后答案仍正确 ===");
const sample = all.find((q) => q.type === "single");
const shuffled = sandbox.ExamDraw.shuffleOptions(sample);
const originalCorrectText = sample.options[sample.answer[0]];
const newText = shuffled.options[shuffled.answer[0]];
if (originalCorrectText !== newText) {
  console.log("FAIL 打乱后答案文本不一致");
  failed++;
} else console.log("OK 打乱保持正确选项文本");

console.log("\n" + (failed ? failed + " failed" : "All checks passed"));
process.exit(failed ? 1 : 0);
