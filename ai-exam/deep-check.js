/**
 * 深度检查：题库完整性、抽题稳定性、localStorage 往返、合格线边界、泄题面
 * node deep-check.js
 */
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = __dirname;
const sandbox = {
  console,
  Buffer,
  localStorage: (() => {
    const store = {};
    return {
      getItem: (k) => (k in store ? store[k] : null),
      setItem: (k, v) => {
        store[k] = String(v);
      },
      removeItem: (k) => {
        delete store[k];
      },
      _store: store,
    };
  })(),
};
sandbox.window = sandbox;
sandbox.globalThis = sandbox;

function run(file) {
  let code = fs.readFileSync(path.join(root, file), "utf8");
  if (code.charCodeAt(0) === 0xfeff) code = code.slice(1);
  vm.runInNewContext(code, sandbox, { filename: file });
}

run("bank/loader.js");
run("bank/ai-usage.js");
run("engine/storage.js");
run("engine/scoring.js");
run("engine/draw.js");

let failed = 0;
function fail(msg) {
  failed++;
  console.log("FAIL:", msg);
}
function ok(msg) {
  console.log("OK:", msg);
}

const bank = sandbox.AiExamDraw.collectBank();
const ids = new Set();
bank.forEach((q) => {
  if (ids.has(q.id)) fail("重复 id " + q.id);
  ids.add(q.id);
  if (!q.stem || !q.explain) fail("缺题干/解析 " + q.id);
  if (!Array.isArray(q.options) || q.options.length < 2) fail("选项异常 " + q.id);
  if (!Array.isArray(q.answer) || !q.answer.length) fail("答案空 " + q.id);
  q.answer.forEach((i) => {
    if (i < 0 || i >= q.options.length) fail("答案越界 " + q.id + " -> " + i);
  });
  if (q.type === "judge") {
    if (q.options.length !== 2 || q.answer.length !== 1) fail("判断题格式 " + q.id);
  }
  if (q.type === "single") {
    if (q.options.length !== 4 || q.answer.length !== 1) fail("单选格式 " + q.id);
  }
  if (q.type === "multi") {
    if (q.answer.length < 2 || q.answer.length > 3) fail("多选正确项数 " + q.id);
  }
});
ok("题库结构检查完成，共 " + bank.length + " 题，唯一 id " + ids.size);

// 抽题 100 次稳定性
for (let t = 0; t < 100; t++) {
  const paper = sandbox.AiExamDraw.drawExam();
  if (paper.questions.length !== 20) fail("抽题数非20 @" + t);
  const types = { judge: 0, single: 0, multi: 0 };
  const seen = new Set();
  paper.questions.forEach((q) => {
    types[q.type]++;
    if (seen.has(q.id)) fail("同卷重复题 " + q.id);
    seen.add(q.id);
    // 打乱后答案仍指向正确文本：与原题对照
    const orig = bank.find((b) => b.id === q.id);
    const correctTexts = orig.answer.map((i) => orig.options[i]).sort();
    const paperTexts = q.answer.map((i) => q.options[i]).sort();
    if (JSON.stringify(correctTexts) !== JSON.stringify(paperTexts)) {
      fail("打乱后答案文本漂移 " + q.id);
    }
  });
  if (types.judge !== 8 || types.single !== 8 || types.multi !== 4) {
    fail("题型比例 @" + t + " " + JSON.stringify(types));
  }
}
ok("100 次抽题稳定");

// localStorage 往返：答案键字符串化
const paper = sandbox.AiExamDraw.drawExam();
paper.answers[0] = paper.questions[0].answer.slice();
paper.answers[3] = [0];
sandbox.AiExamStorage.savePaper(paper);
const loaded = sandbox.AiExamStorage.loadPaper();
if (!loaded.answers[0] && !loaded.answers["0"]) fail("answers 丢失");
const a0 = loaded.answers[0] || loaded.answers["0"];
if (!sandbox.AiExamScoring.equal(a0, paper.questions[0].answer)) {
  fail("往返后答案不一致");
} else ok("localStorage answers 往返正常");

// 未作答算错
const empty = sandbox.AiExamScoring.gradePaper(paper.questions, {});
if (empty.wrongCount !== 20 || empty.passed) fail("全空应 20 错不合格");
else ok("全空 20 错不合格");

// 多选少选
const multi = paper.questions.find((q) => q.type === "multi" && q.answer.length >= 2);
const idx = paper.questions.indexOf(multi);
const partial = {};
partial[idx] = [multi.answer[0]];
const pr = sandbox.AiExamScoring.gradePaper(paper.questions, partial);
if (pr.details[idx].correct) fail("多选少选不应算对");
else ok("多选少选算错");

// 合格线边界
function gradeWithWrong(n) {
  const answers = {};
  paper.questions.forEach((q, i) => {
    if (i < n) {
      const wrong = q.options.map((_, oi) => oi).filter((oi) => q.answer.indexOf(oi) === -1);
      answers[i] = wrong.length ? [wrong[0]] : [];
    } else answers[i] = q.answer.slice();
  });
  return sandbox.AiExamScoring.gradePaper(paper.questions, answers);
}
[0, 1, 4].forEach((n) => {
  const r = gradeWithWrong(n);
  if (!r.passed || r.wrongCount !== n) fail("错" + n + "应合格，实际 " + JSON.stringify({ w: r.wrongCount, p: r.passed }));
});
[5, 6, 10, 20].forEach((n) => {
  const r = gradeWithWrong(n);
  if (r.passed || r.wrongCount !== n) fail("错" + n + "应不合格，实际 " + JSON.stringify({ w: r.wrongCount, p: r.passed }));
});
ok("合格线边界 错0~4过 / 错5~20不过");

// 泄题面：试卷持久化是否含明文答案
const raw = sandbox.AiExamStorage._rawPaper();
if (raw && /"answer"\s*:/.test(raw)) {
  console.log("WARN: localStorage 试卷含明文 answer，考生可 F12 偷看标准答案");
  fail("泄题：试卷存储含 answer 字段");
} else {
  ok("试卷存储未暴露 answer 字段");
}

// 但仍可从 akey 解出——记录为残余风险（静态站无法杜绝）
const akey = sandbox.localStorage.getItem("ai_exam_akey");
if (!akey) fail("缺少答案键，无法续考/判分");
else ok("答案键已分离存储（轻度混淆，非防专业作弊）");

// 模拟完整考试：答对 16 交卷
sandbox.AiExamStorage.clearPaper();
const exam = sandbox.AiExamDraw.drawExam();
const ans = {};
exam.questions.forEach((q, i) => {
  ans[i] = i < 4 ? [] : q.answer.slice(); // 前 4 题空=错，后 16 对
});
exam.answers = ans;
sandbox.AiExamStorage.savePaper(exam);
const resumed = sandbox.AiExamStorage.loadPaper();
if (!resumed.questions[0].answer) fail("续考后答案键未合并");
else ok("续考合并答案键正常");

const graded = sandbox.AiExamScoring.gradePaper(resumed.questions, resumed.answers);
// 前4空算错 → wrong=4 → 合格
if (graded.wrongCount !== 4 || !graded.passed) {
  fail("模拟交卷结果异常 " + JSON.stringify({ w: graded.wrongCount, p: graded.passed, c: graded.correctCount }));
} else ok("模拟交卷：错4合格");

sandbox.AiExamStorage.saveResult(graded);
sandbox.AiExamStorage.addHistory({
  at: Date.now(),
  correctCount: graded.correctCount,
  wrongCount: graded.wrongCount,
  passed: graded.passed,
});
sandbox.AiExamStorage.clearPaper();
if (sandbox.AiExamStorage.loadPaper()) fail("交卷后试卷未清空");
else ok("交卷后试卷已清空");

console.log("\n" + (failed ? failed + " issue(s)" : "All deep checks passed"));
process.exit(failed ? 1 : 0);
