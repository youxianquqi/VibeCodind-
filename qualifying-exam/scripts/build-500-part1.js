/**
 * 生成约 500 道科目一难度题库并写入 bank/*.js
 * 运行：node scripts/build-500.js
 */
const fs = require("fs");
const path = require("path");

const OUT = path.join(__dirname, "..", "bank");

function j(id, module, stem, correct, explain) {
  return {
    id,
    module,
    type: "judge",
    stem,
    options: ["正确", "错误"],
    answer: [correct ? 0 : 1],
    explain,
  };
}
function s(id, module, stem, options, answerIndex, explain) {
  return {
    id,
    module,
    type: "single",
    stem,
    options,
    answer: [answerIndex],
    explain,
  };
}
function m(id, module, stem, options, answerIndexes, explain) {
  return {
    id,
    module,
    type: "multi",
    stem,
    options,
    answer: answerIndexes.slice().sort((a, b) => a - b),
    explain,
  };
}

function writeBank(moduleId, fileName, questions) {
  const body = questions
    .map((q) => "  " + JSON.stringify(q, null, 2).replace(/\n/g, "\n  "))
    .join(",\n");
  const code = `registerExamBank(${JSON.stringify(moduleId)}, [\n${body}\n]);\n`;
  fs.writeFileSync(path.join(OUT, fileName), code, "utf8");
  const t = { judge: 0, single: 0, multi: 0 };
  questions.forEach((q) => t[q.type]++);
  console.log(moduleId, questions.length, t);
}

// ========== M1 语义化 ==========
const M1 = [];
const m1j = [
  ["每个页面通常只应有一个 main 表示主内容。", true, "规范建议每页一个 main。"],
  ["div 有明确文档语义，应优先于 header 使用。", false, "div 无语义。"],
  ["nav 用于包裹导航链接区域。", true, "nav 表示导航。"],
  ["article 适合可独立成篇的内容。", true, "如博文、新闻条目。"],
  ["section 与 div 语义完全相同。", false, "section 是主题分区。"],
  ["footer 适合放版权与页脚链接。", true, "footer 表示页脚。"],
  ["开闭标签必须匹配，如 header 对应 /header。", true, "标签要成对匹配。"],
  ["img 应尽量提供有意义的 alt 文本（装饰图可空 alt）。", true, "利于无障碍。"],
  ["用 table 做整站页面布局是现代推荐做法。", false, "布局用 CSS；table 用于表数据。"],
  ["button 更适合触发操作，纯跳转链接更适合 a。", true, "语义与可访问性更好。"],
  ["h1~h6 应用于标题层级，不要只为了放大字号。", true, "标题有文档大纲语义。"],
  ["label 可以通过 for 关联 input，提升表单可访问性。", true, "点击 label 可聚焦控件。"],
  ["strong 表示重要性，b 仅表示粗体样式（语义更弱）。", true, "优先用语义标签。"],
  ["ul/ol 用于列表；随意用 br 堆列表不利于结构。", true, "列表用 ul/ol/li。"],
  ["header 只能出现在页面最顶部一次。", false, "区块也可有 header。"],
  ["aside 常表示侧边栏或附属内容。", true, "与主内容相关的附属信息。"],
  ["把整页都包在 article 里通常比合理分区更好。", false, "应按内容选择标签。"],
  ["语义化有助于读屏软件理解页面结构。", true, "无障碍的重要基础。"],
  ["SEO 也可能受益于清晰的标题与结构标签。", true, "有助搜索引擎理解。"],
  ["span 是行内容器，本身几乎无语义。", true, "类似 div 的行内版。"],
];
m1j.forEach((row, i) =>
  M1.push(j(`m1-j${String(i + 1).padStart(2, "0")}`, "M1", row[0], row[1], row[2]))
);
const m1s = [
  ["页面顶部品牌区最适合用？", ["header", "aside", "pre", "code"], 0, "header 表示页眉。"],
  ["主导航链接外层优先用？", ["nav", "table", "marquee", "script"], 0, "nav。"],
  ["本页核心正文主体用？", ["main", "body", "html", "head"], 0, "main；body 范围更大。"],
  ["独立博文外层更合适？", ["article", "span", "br", "hr"], 0, "article。"],
  ["带标题的主题分区用？", ["section", "img", "meta", "link"], 0, "section。"],
  ["下列哪个几乎无语义？", ["div", "header", "footer", "nav"], 0, "div。"],
  ["装饰性图片的 alt 常设为？", ["空字符串 alt=\"\"", "一长段无关广告", "必须与 src 同名", "禁止写 alt"], 0, "装饰图用空 alt。"],
  ["点击按钮提交表单，控件宜用？", ["button 或 input type=submit", "div + 点击跳转假象", "span", "p"], 0, "用真正的按钮控件。"],
  ["文档主标题通常用？", ["h1", "h6 才能最大", "b", "font"], 0, "页面主标题常用 h1。"],
  ["表头单元格标签是？", ["th", "td 完全一样", "caption 代替 th", "thead 文本节点"], 0, "th 表头。"],
  ["语义化主要目的？", ["用含义表达结构，利无障碍与维护", "让 CSS 必然更短", "让 JS 更快", "自动压缩图片"], 0, "结构与可访问性。"],
  ["站内跳到页面锚点用？", ["a href=\"#id\"", "button 默认跳锚", "form method=anchor", "img usemap 唯一方式"], 0, "a 的哈希链接。"],
  ["引用大段来源文本可用？", ["blockquote", "blink", "center", "font"], 0, "blockquote。"],
  ["一组定义列表用？", ["dl/dt/dd", "仅用 br", "仅用 div", "table 必须"], 0, "dl 结构。"],
  ["图文说明组合可用？", ["figure + figcaption", "只有 b", "只有 i", "frameset"], 0, "figure。"],
  ["强调语气更语义的是？", ["em", "i 一定更强", "u", "s"], 0, "em 表强调。"],
  ["页面语言声明常在？", ["html 的 lang 属性", "CSS color", "JS 变量名", "jpg 文件名"], 0, "lang。"],
  ["可访问的图标按钮应？", ["提供可感知名称（文本或 aria-label）", "只有背景图无名字", "用 title 代替一切", "字号设为 0 即可"], 0, "需要可访问名称。"],
  ["多个 nav 是否允许？", ["可以，如页头与页脚导航", "绝对只能一个", "只能写在 table 里", "必须藏在 iframe"], 0, "可以有多处导航。"],
  ["主内容重复的站点导航不应放进？", ["main 内部当唯一主内容", "header", "footer", "nav"], 0, "重复导航一般不作为 main 主体。"],
];
m1s.forEach((row, i) =>
  M1.push(s(`m1-s${String(i + 1).padStart(2, "0")}`, "M1", row[0], row[1], row[2], row[3]))
);
const m1m = [
  ["常见文档结构语义标签？", ["header", "nav", "main", "blink"], [0, 1, 2], "blink 已废弃。"],
  ["关于 article/section？", ["article 可独立成篇", "section 主题分区常带标题", "可按内容嵌套", "与 div 语义相同"], [0, 1, 2], "不同于 div。"],
  ["合理语义化做法？", ["优先有含义标签", "开闭匹配", "一页多个 main 当分区", "footer 放版权"], [0, 1, 3], "通常一个 main。"],
  ["利于无障碍的做法？", ["有意义的 alt", "正确标题层级", "用 div 模拟所有按钮且无角色", "label 关联控件"], [0, 1, 3], "假按钮需额外处理。"],
  ["适合用 a 的场景？", ["跳转到另一 URL", "页内锚点", "下载链接", "切换开关状态（更宜 button）"], [0, 1, 2], "开关用 button。"],
  ["表格相关正确标签？", ["table", "thead/tbody", "th/td", "用 table 画整站两栏布局更现代"], [0, 1, 2], "别用 table 布局。"],
  ["媒体与文本？", ["img 配 alt", "video 可提供字幕轨道", "只用背景图表达关键信息且无替代文本", "audio 可提供替代文案"], [0, 1, 3], "信息不能只在背景图。"],
  ["表单语义？", ["form", "label", "input/textarea/select", "用 div 点击伪造且无键盘支持"], [0, 1, 2], "要可键盘操作。"],
  ["下列属于分区/结构？", ["header", "footer", "aside", "typeof"], [0, 1, 2], "typeof 是 JS。"],
  ["写 HTML 时应注意？", ["语义优先", "可访问名称", "合法嵌套", "随意省略所有引号与结束标签以求短"], [0, 1, 2], "保持合法清晰。"],
];
m1m.forEach((row, i) =>
  M1.push(m(`m1-m${String(i + 1).padStart(2, "0")}`, "M1", row[0], row[1], row[2], row[3]))
);

writeBank("M1", "m1-semantic.js", M1);

console.log("M1 done, continue in same script...");
