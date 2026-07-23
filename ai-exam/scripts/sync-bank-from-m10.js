const fs = require("fs");
const vm = require("vm");
const s = {};
s.window = s;
s.globalThis = s;
function run(f) {
  vm.runInNewContext(fs.readFileSync(f, "utf8"), s, { filename: f });
}
run("qualifying-exam/bank/loader.js");
run("qualifying-exam/bank/m10-ai-usage.js");
const qs = s.EXAM_BANKS.M10.map((q) => ({
  ...q,
  module: "AI",
  id: q.id.replace(/^m10-/, "ai-"),
}));
const body = qs
  .map((q) => "  " + JSON.stringify(q, null, 2).replace(/\n/g, "\n  "))
  .join(",\n");
fs.writeFileSync(
  "ai-exam/bank/ai-usage.js",
  'registerExamBank("AI", [\n' + body + "\n]);\n",
  "utf8"
);
console.log("wrote", qs.length);
console.log(qs[0].stem);
