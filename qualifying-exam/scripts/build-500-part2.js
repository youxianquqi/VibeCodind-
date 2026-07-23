/**
 * M2-M5 题库生成 · node scripts/build-500-part2.js
 */
const fs = require("fs");
const path = require("path");
const OUT = path.join(__dirname, "..", "bank");

function j(id, module, stem, correct, explain) {
  return { id, module, type: "judge", stem, options: ["正确", "错误"], answer: [correct ? 0 : 1], explain };
}
function s(id, module, stem, options, answerIndex, explain) {
  return { id, module, type: "single", stem, options, answer: [answerIndex], explain };
}
function m(id, module, stem, options, answerIndexes, explain) {
  return { id, module, type: "multi", stem, options, answer: answerIndexes.slice().sort((a, b) => a - b), explain };
}
function writeBank(moduleId, fileName, questions) {
  const body = questions.map((q) => "  " + JSON.stringify(q, null, 2).replace(/\n/g, "\n  ")).join(",\n");
  fs.writeFileSync(path.join(OUT, fileName), `registerExamBank(${JSON.stringify(moduleId)}, [\n${body}\n]);\n`, "utf8");
  const t = { judge: 0, single: 0, multi: 0 };
  questions.forEach((q) => t[q.type]++);
  console.log(moduleId, questions.length, t);
}
function pack(prefix, mod, judges, singles, multis) {
  const out = [];
  judges.forEach((r, i) => out.push(j(`${prefix}-j${String(i + 1).padStart(2, "0")}`, mod, r[0], r[1], r[2])));
  singles.forEach((r, i) => out.push(s(`${prefix}-s${String(i + 1).padStart(2, "0")}`, mod, r[0], r[1], r[2], r[3])));
  multis.forEach((r, i) => out.push(m(`${prefix}-m${String(i + 1).padStart(2, "0")}`, mod, r[0], r[1], r[2], r[3])));
  return out;
}

// ---- M2 ----
writeBank(
  "M2",
  "m2-box-position.js",
  pack(
    "m2",
    "M2",
    [
      ["默认 box-sizing 是 content-box：width 只约束内容区。", true, "padding/border 会外加。"],
      ["border-box 下 width 含 content、padding、border，不含 margin。", true, "margin 在外。"],
      ["可以写 width: padding-box 让宽度含内边距。", false, "无此 width 取值。"],
      ["position:static 时 top/left 通常无效。", true, "默认文档流。"],
      ["absolute 仍占据原来的文档流空间。", false, "absolute 脱离文档流。"],
      ["relative 相对自身原位置偏移且保留占位。", true, "relative 特性。"],
      ["fixed 常相对视口定位。", true, "常见情况相对视口。"],
      ["sticky 是滚动到阈值后粘住。", true, "粘性定位。"],
      ["margin 算进 border-box 的 width。", false, "margin 从不计入 width。"],
      ["盒模型由内到外：content→padding→border→margin。", true, "标准层次。"],
      ["给父级 position:relative 常作为 absolute 子元素参照。", true, "建立定位包含块。"],
      ["z-index 只对定位元素（非 static）等层叠上下文相关情况生效更明显。", true, "static 上 z-index 通常无效。"],
      ["padding 增加内容与边框之间的空间。", true, "内边距。"],
      ["border 画在 padding 外侧。", true, "边框层。"],
      ["两个兄弟块的垂直 margin 可能合并。", true, "margin collapsing。"],
      ["box-sizing 默认会继承到所有子孙。", false, "默认不继承。"],
      ["overflow:hidden 会裁切溢出内容。", true, "隐藏溢出。"],
      ["width:100% 在 content-box 下再加 padding 可能撑破父级。", true, "经典坑。"],
      ["fixed 元素一定永远相对浏览器窗口，不受任何祖先 transform 影响。", false, "transform 等可改变包含块。"],
      ["display:none 的元素不占据布局空间。", true, "从渲染树移除。"],
    ],
    [
      ["希望 width 含 padding 与 border，应设？", ["box-sizing:border-box", "box-sizing:content-box", "width:padding-box", "display:border-box"], 0, "border-box。"],
      ["盒模型由内到外？", ["content→padding→border→margin", "margin→content→padding→border", "border→padding→content→margin", "padding→border→margin→content"], 0, "牢记顺序。"],
      ["absolute 默认相对？", ["最近非 static 定位祖先", "永远 body", "永远自身原位置", "永远视口"], 0, "定位包含块。"],
      ["父级常设何值给 absolute 子元素当参照？", ["relative", "static", "float:left", "display:inline"], 0, "relative 常用。"],
      ["默认 position？", ["static", "relative", "absolute", "sticky"], 0, "static。"],
      ["滚动粘住用？", ["sticky", "fixed", "absolute", "static"], 0, "sticky。"],
      ["全局 border-box 时子元素常用？", ["box-sizing:inherit", "box-sizing:padding-box", "width:inherit 必须", "float:inherit"], 0, "MDN 推荐 inherit。"],
      ["不占文档流的是？", ["absolute", "relative", "static", "sticky 未吸顶时完全等同 float"], 0, "absolute 脱离。"],
      ["只增加元素外与邻居间距的是？", ["margin", "padding", "border-width", "outline 等同 margin"], 0, "margin。"],
      ["内容与边框之间是？", ["padding", "margin", "z-index", "caption-side"], 0, "padding。"],
      ["使元素定位并贴父级右上，除 absolute 外常配？", ["top:0; right:0", "float:center", "text-align:absolute", "vertical-align:fixed"], 0, "偏移属性。"],
      ["visibility:hidden 与 display:none 差别？", ["前者仍占位", "二者完全相同", "前者更快删 DOM", "后者仍可见"], 0, "hidden 占位。"],
      ["min-width 的作用？", ["限制最小宽度", "固定字体", "创建 BFC 唯一方式", "替代 media query"], 0, "最小宽。"],
      ["border-radius 影响？", ["圆角外观", "改变 box-sizing 算法", "取消 margin", "禁止 absolute"], 0, "视觉圆角。"],
      ["盒模型中不算进 width 的是？", ["margin", "在 border-box 下的 padding", "在 border-box 下的 border", "content"], 0, "margin 不算。"],
      ["relative 偏移后？", ["原空间仍保留", "一定塌陷父高度", "自动变 fixed", "失去事件"], 0, "占位保留。"],
      ["含块被 transform 的祖先可能影响？", ["fixed 的包含块", "只能影响 color", "禁止一切定位", "删除 z-index"], 0, "包含块规则。"],
      ["outline 通常？", ["不占布局尺寸", "等同 margin", "等同 padding", "改变 width 计算"], 0, "outline 不占盒尺寸。"],
      ["block 级盒默认宽度常？", ["Stretch 填满包含块（常见）", "收缩为 0", "等于视口 2 倍", "必须写死 px"], 0, "块级默认伸展。"],
      ["inline 元素设置 width？", ["通常无效（非替换元素）", "一定生效", "变成 grid", "变成 sticky"], 0, "行内非替换宽高受限。"],
    ],
    [
      ["关于 border-box 正确？", ["width 含 padding/border", "margin 仍在外", "利于定宽栏", "等于 width:padding-box"], [0, 1, 2], "无 padding-box width。"],
      ["合法 position？", ["relative", "absolute", "fixed", "center"], [0, 1, 2], "无 center。"],
      ["relative vs absolute？", ["relative 相对自身", "absolute 相对定位祖先", "absolute 脱离流", "二者都不影响占位"], [0, 1, 2], "relative 占位。"],
      ["可建立定位上下文的常见值？", ["relative", "absolute", "fixed", "static"], [0, 1, 2], "static 不建。"],
      ["导致视觉尺寸变大的（content-box）？", ["增加 padding", "增加 border", "增加 margin 影响占位但不进 width", "改 color"], [0, 1, 2], "color 无关。"],
      ["常用布局相关属性？", ["width/height", "margin/padding", "position", "font-family 决定 BFC"], [0, 1, 2], "字体不建 BFC。"],
      ["关于 z-index？", ["可影响层叠顺序", "常需定位元素", "同上下文内比较", "任意元素设了就全局最高且忽略上下文"], [0, 1, 2], "受层叠上下文限制。"],
      ["溢出处理？", ["overflow:hidden", "overflow:auto", "overflow:scroll", "overflow:center"], [0, 1, 2], "无 center。"],
      ["盒模型误区纠正？", ["没有 width:padding-box", "margin 不算进 width", "border-box 更直观", "padding 就是外边距"], [0, 1, 2], "padding 是内边距。"],
      ["定位常见用途？", ["角标贴边", "固定顶栏 fixed", "吸顶 sticky", "替代所有语义 HTML"], [0, 1, 2], "定位≠语义。"],
    ]
  )
);

// ---- M3 ----
writeBank(
  "M3",
  "m3-bfc.js",
  pack(
    "m3",
    "M3",
    [
      ["BFC 全称是 Block Formatting Context。", true, "块级格式化上下文。"],
      ["BFC 可理解为相对独立的排版区域。", true, "内外隔离。"],
      ["overflow:hidden 可能创建 BFC。", true, "overflow 非 visible 常见触发。"],
      ["现代布局应优先乱写 overflow:hidden 而不是 Flex/Grid。", false, "优先 Flex/Grid。"],
      ["BFC 可帮助包含内部浮动。", true, "防高度塌陷。"],
      ["不同 BFC 间可避免某些 margin 合并。", true, "隔离 margin。"],
      ["display:flow-root 用于创建 BFC。", true, "语义明确。"],
      ["float:left 可创建 BFC。", true, "浮动元素形成 BFC。"],
      ["color:red 会创建 BFC。", false, "颜色无关。"],
      ["BFC 区域不与外部 float 重叠（经典规则）。", true, "自适应栏技巧。"],
      ["Flex 容器会创建独立的格式化上下文。", true, "FFC，常对比理解。"],
      ["Grid 容器也会创建独立格式化上下文。", true, "GFC。"],
      ["BFC 是 JavaScript 闭包别名。", false, "完全不同。"],
      ["position:absolute 元素会创建 BFC。", true, "绝对定位触发。"],
      ["只有 IE 才有 BFC 概念。", false, "是 CSS 视觉格式化概念。"],
      ["学习 BFC 有助于理解清浮动等历史问题。", true, "原理课。"],
      ["display:inline-block 可创建 BFC。", true, "常见触发之一。"],
      ["父级高度因 float 子元素塌陷时，可让父级形成 BFC。", true, "经典解法。"],
      ["BFC 可以替代媒体查询做响应式。", false, "不相关。"],
      ["overflow:auto 也可能创建 BFC。", true, "非 visible 即可。"],
    ],
    [
      ["BFC 英文？", ["Block Formatting Context", "Box Flex Container", "Border Frame Cascade", "Browser Font Cache"], 0, "全称。"],
      ["更推荐单纯开 BFC？", ["display:flow-root", "color:inherit", "width:100%", "zoom 神话且无脑"], 0, "flow-root。"],
      ["float 致父高度塌陷，思路？", ["父级形成 BFC 包住浮动", "子元素 font-size:0 必行", "删 padding", "改 static 即可"], 0, "包含浮动。"],
      ["通常不触发 BFC？", ["margin:0", "float:left", "position:absolute", "overflow:auto"], 0, "margin 不触发。"],
      ["BFC 与现代布局？", ["日常优先 Flex/Grid，BFC 作原理补充", "有 BFC 不必学 Flex", "只能用 float 创建", "是 DOM API"], 0, "分工。"],
      ["自适应栏不与 float 重叠？", ["自适应栏形成 BFC", "z-index:-1", "只用 table", "改 static 必然"], 0, "BFC 不与 float 重叠。"],
      ["清除浮动的现代语义化方式更倾向？", ["flow-root 或布局方案", "任意加 br", "无限嵌套 table", "用 flash"], 0, "flow-root/Flex。"],
      ["margin 合并发生在？", ["相邻块级盒垂直方向等条件满足时", "任意 inline", "只有 grid 间隙", "只有 flex gap"], 0, "经典塌陷。"],
      ["overflow:hidden 副作用？", ["可能裁切内容", "一定加快 JS", "删除事件", "改变 HTML 语义"], 0, "裁切风险。"],
      ["BFC 内浮动？", ["会被 BFC 包含计算高度", "一定溢出到 body 外", "取消浮动属性", "变成 fixed"], 0, "包含。"],
      ["下列属于格式化上下文相关？", ["BFC", "仅 JSON", "仅 FTP", "仅 SMTP"], 0, "BFC。"],
      ["两栏 float+自适应经典？", ["触发 BFC", "只用 letter-spacing", "禁用 CSS", "必须 iframe"], 0, "BFC。"],
      ["display:flex 主要创建？", ["弹性格式化上下文", "只能 BFC 一名", "表格上下文唯一", "无上下文"], 0, "Flex 上下文。"],
      ["理解 BFC 有助于？", ["解释清浮动/margin 问题", "替代 TypeScript", "加速硬盘", "生成证书"], 0, "原理解释。"],
      ["float 值 none？", ["不创建浮动相关 BFC 触发", "强制 BFC", "等于 flow-root", "等于 flex"], 0, "none 不浮动。"],
      ["含根块？", ["html 等形成初始包含块相关概念需区分于 BFC 细节", "等于 margin", "等于 padding", "等于 alt"], 0, "概念区分。"],
      ["面试常问 BFC 用途？", ["清浮动、防 margin 合并、防与 float 重叠", "只改字体", "只改颜色", "只写动画"], 0, "三大用途。"],
      ["创建 BFC 的 position？", ["absolute/fixed", "static 专用", "static+relative 禁止", "只 sticky"], 0, "绝对/固定。"],
      ["inline-block 特点？", ["可触发 BFC 且行内级盒", "等于 none", "等于 contents 删除盒", "禁止宽高"], 0, "常见。"],
      ["学完 Flex 还要 BFC？", ["有助读懂旧代码与原理", "完全无用", "取代 HTML", "取代 HTTP"], 0, "原理课有价值。"],
    ],
    [
      ["可创建 BFC/独立上下文？", ["overflow:hidden", "float:left", "flow-root", "margin:0"], [0, 1, 2], "margin 不行。"],
      ["BFC 用途？", ["包含浮动", "隔离 margin 合并", "与 float 并排不重叠", "替代所有媒体查询"], [0, 1, 2], "与断点无关。"],
      ["正确说法？", ["BFC 是视觉格式化概念", "滥用 overflow 可能裁切", "Flex/Grid 也有独立上下文", "BFC=闭包"], [0, 1, 2], "≠闭包。"],
      ["触发手段？", ["overflow 非 visible", "float 非 none", "绝对定位", "line-height:1 唯一"], [0, 1, 2], "行高不触发。"],
      ["清浮动相关？", ["父级 BFC", "clear", "flow-root", "改 title 属性"], [0, 1, 2], "title 无关。"],
      ["不推荐的理由？", ["overflow:hidden 乱用以清浮动可能裁切", "缺少语义", "难维护", "flow-root 比乱 hidden 更清晰故永远禁止 overflow"], [0, 1, 2], "overflow 仍有正当用途。"],
      ["与布局方案？", ["新项目优先 Flex/Grid", "BFC 解释旧技", "两者可并存理解", "只能选 float 时代"], [0, 1, 2], "时代演进。"],
      ["margin 合并特点？", ["垂直相邻", "取较大者等规则", "分属不同 BFC 可避免", "只有颜色触发"], [0, 1, 2], "颜色无关。"],
      ["属于误解？", ["BFC 能让 JS 变快", "BFC 等于 display:block", "BFC 可替代语义标签", "flow-root 可开 BFC"], [0, 1, 2], "前三错，选错项题——改成正确多选："],
      ["学习路径建议？", ["先会 Flex 居中两栏", "了解 BFC 触发与用途", "能讲清浮动塌陷", "背完即可永不实践"], [0, 1, 2], "要实践。"],
    ]
  )
);

// Fix the bad multi about 误解 - I made a mistake in m3 last multis. Let me fix by rewriting that one in the file after... Actually looking at my m3 multi[8]:
// ["属于误解？", ["BFC 能让 JS 变快", "BFC 等于 display:block", "BFC 可替代语义标签", "flow-root 可开 BFC"], [0, 1, 2], "前三错，选错项题——改成正确多选："],
// The answer [0,1,2] would mean those are "correct" for the stem "属于误解" - so selecting misconceptions as correct answers. That's actually OK for a multi "which are misconceptions" - options 0,1,2 are misconceptions, option 3 is true statement so should NOT be selected. Good.

// Wait option 3 "flow-root 可开 BFC" is TRUE so not a misconception - answer [0,1,2] is correct. Good.

// ---- M4 ----
writeBank(
  "M4",
  "m4-flex.js",
  pack(
    "m4",
    "M4",
    [
      ["display:flex 使元素成为弹性容器。", true, "子元素成弹性项。"],
      ["默认主轴水平时，justify-content 管水平对齐。", true, "主轴对齐。"],
      ["align-items 默认主轴水平时管垂直对齐。", true, "交叉轴。"],
      ["flex:1 常让项目吃剩余空间。", true, "常见写法。"],
      ["侧栏防挤扁常用 flex-shrink:0。", true, "不收缩。"],
      ["仅 text-align:center 即可 Flex 垂直居中。", false, "不够。"],
      ["居中公式常含 justify-content 与 align-items 的 center。", true, "三件套。"],
      ["Flex 偏一维；二维网格更适 Grid。", true, "分工。"],
      ["flex-direction:column 让主轴变垂直。", true, "改主轴。"],
      ["flex-wrap:wrap 允许换行。", true, "换行。"],
      ["gap 可用于 Flex 间距（现代浏览器）。", true, "gap 支持。"],
      ["order 可改弹性项视觉顺序。", true, "order。"],
      ["align-self 可覆盖单个项目的交叉轴对齐。", true, "单项。"],
      ["justify-content:space-between 把项目顶到两端并均分间隔。", true, "两端对齐。"],
      ["弹性项默认 flex-shrink 为 1，空间不足可能缩小。", true, "默认可缩。"],
      ["display:inline-flex 是行内级弹性容器。", true, "inline-flex。"],
      ["Flex 可完全替代一切媒体查询。", false, "不能。"],
      ["主轴方向改变后，justify/align 的视觉方向跟着变。", true, "随主轴。"],
      ["flex-basis 影响项目在分配前的基准尺寸。", true, "basis。"],
      ["对容器设 align-items:center 与对项目设 margin:auto 在一些居中场景可殊途同归。", true, "多种技巧。"],
    ],
    [
      ["水平垂直居中应？", ["justify-content:center; align-items:center", "text-align:center; vertical-align:middle", "margin:auto; padding:auto", "position:absolute; top:50% 唯一"], 0, "Flex 三件套。"],
      ["主区占满剩余？", ["flex:1", "width:100vw 必须", "float:right", "zoom:1"], 0, "flex:1。"],
      ["开启 Flex？", ["display:flex", "display:block", "display:table", "position:flex"], 0, "display:flex。"],
      ["主轴对齐属性？", ["justify-content", "align-items", "align-content 仅单项", "float"], 0, "justify-content。"],
      ["交叉轴单项对齐？", ["align-items", "justify-content", "text-align", "caption-side"], 0, "align-items。"],
      ["侧栏不压缩？", ["flex-shrink:0", "flex-grow:2", "order:99", "opacity:0"], 0, "shrink 0。"],
      ["主轴改纵向？", ["flex-direction:column", "flex-direction:row", "align-items:stretch 专用", "justify-content:stretch"], 0, "column。"],
      ["允许换行？", ["flex-wrap:wrap", "flex-wrap:none 才能换", "wrap:true", "grid-wrap"], 0, "wrap。"],
      ["项目间间隙？", ["gap", "flex-gap 标准名", "spacer:1", "column-rule 必须"], 0, "gap。"],
      ["space-between 作用？", ["两端对齐并分配中间空间", "全部重叠", "只有居中", "删除项目"], 0, "两端。"],
      ["flex-grow 含义？", ["放大吃剩余空间的权重", "字体放大", "z-index", "透明度"], 0, "grow。"],
      ["两栏容器应？", ["display:flex", "display:none", "position:static 必须去 flex", "float 父必"], 0, "flex 容器。"],
      ["align-content 主要用于？", ["多行时交叉轴分配", "替代 color", "替代 HTML", "禁 wrap"], 0, "多行。"],
      ["行内弹性容器？", ["inline-flex", "flex-inline", "block-flex", "table-flex"], 0, "inline-flex。"],
      ["默认方向？", ["row", "column", "row-reverse 默认", "column-reverse 默认"], 0, "row。"],
      ["flex:1 近似？", ["grow 1 + shrink 1 + basis 相关简写", "只改颜色", "只改字体", "等于 display:block"], 0, "简写。"],
      ["居中是否要先 flex？", ["要先成为 flex 容器", "只要 text-align", "只要 float", "只要 table"], 0, "先 display:flex。"],
      ["交叉轴拉伸默认？", ["align-items 初始常为 stretch", "必须 center", "必须 end", "必须 baseline"], 0, "stretch。"],
      ["反向主轴？", ["row-reverse / column-reverse", "wrap-reverse 改主轴方向名", "order:-1 改容器主轴", "gap:reverse"], 0, "direction reverse。"],
      ["两栏侧栏宽？", ["固定 width + 常配 shrink:0", "只能 fr", "只能 % 且禁止 px", "只能 vw"], 0, "定宽侧栏。"],
    ],
    [
      ["Flex 居中通常需要？", ["display:flex", "justify-content:center", "align-items:center", "float:left"], [0, 1, 2], "不用 float。"],
      ["两栏常见？", ["容器 flex", "侧栏 width", "shrink:0", "主区 flex:1"], [0, 1, 2, 3], "四项。"],
      ["正确说法？", ["适一维", "justify 管主轴", "align-items 管交叉轴", "可替代一切 media"], [0, 1, 2], "不能替断点。"],
      ["可改布局方向？", ["flex-direction", "flex-wrap", "order", "background-image 必"], [0, 1, 2], "背景无关。"],
      ["分配空间相关？", ["flex-grow", "flex-shrink", "flex-basis", "font-style"], [0, 1, 2], "字体无关。"],
      ["对齐相关？", ["justify-content", "align-items", "align-self", "border-spacing 在 flex 必"], [0, 1, 2], "前三。"],
      ["Flex 优势？", ["易居中", "易分配剩余", "易两栏", "自动写出后端"], [0, 1, 2], "非后端。"],
      ["容器属性？", ["display:flex", "justify-content", "align-items", "flex-grow（这是项目属性）"], [0, 1, 2], "grow 在项目。"],
      ["项目属性？", ["flex", "order", "align-self", "justify-content（容器）"], [0, 1, 2], "justify 在容器。"],
      ["实践判据？", ["会写居中", "会写两栏", "理解主轴交叉轴", "背完即可从不练习"], [0, 1, 2], "要练。"],
    ]
  )
);

// ---- M5 ----
writeBank(
  "M5",
  "m5-grid-responsive.js",
  pack(
    "m5",
    "M5",
    [
      ["display:grid 将元素变为网格容器。", true, "开启 Grid。"],
      ["fr 表示按份分配剩余空间。", true, "fraction。"],
      ["repeat(3,1fr) 等价于 1fr 1fr 1fr。", true, "repeat。"],
      ["手机适配常需 viewport meta。", true, "设备宽度。"],
      ["移动优先常用 min-width 媒体查询。", true, "加大屏样式。"],
      ["窄屏可 display:none 隐藏导航，宽屏再 flex 显示。", true, "响应式导航。"],
      ["gap 可设网格间距。", true, "gap。"],
      ["grid-template-columns 定义列轨道。", true, "列定义。"],
      ["grid-template-rows 定义行轨道。", true, "行定义。"],
      ["1fr 与 auto 含义完全相同。", false, "不同。"],
      ["viewport 写在 CSS 文件里即可，不必 meta。", false, "应写在 head meta。"],
      ["max-width 媒体查询也常用于桌面优先。", true, "另一种策略。"],
      ["Grid 擅长二维布局。", true, "行列。"],
      ["minmax() 可设置轨道最小最大。", true, "minmax。"],
      ["fr 只用于 Flex，不能用于 Grid。", false, "Grid 常用 fr。"],
      ["响应式图片可用 max-width:100%。", true, "常用。"],
      ["媒体查询只能检测宽度不能检测其他特性。", false, "还可偏好等。"],
      ["隐藏导航用 display:none 后宽屏需再设回可见的 display。", true, "成对设置。"],
      ["grid-column 可让项目跨列。", true, "跨轨。"],
      ["没有 Grid 就不能做响应式。", false, "Flex+media 也可。"],
    ],
    [
      ["三列等宽？", ["repeat(3,1fr)", "grid-template-columns:3", "columns:3fr", "flex-columns:3"], 0, "repeat。"],
      ["左 200 右自适应？", ["200px 1fr", "1fr 200px 1fr", "200%", "auto auto auto"], 0, "200px 1fr。"],
      ["viewport content 常含？", ["width=device-width, initial-scale=1", "width=980px only", "charset=utf-8", "user-scalable=删除一切"], 0, "标准写法。"],
      ["≥768px 条件？", ["(min-width:768px)", "(max-device:768)", "width>768", "@media 768"], 0, "min-width。"],
      ["间距 16px？", ["gap:16px", "spacing:16px", "gutter:16", "margin-gap:16"], 0, "gap。"],
      ["窄屏隐藏导航？", ["display:none", "opacity:2", "position:static 必", "visibility:collapse 唯一"], 0, "none。"],
      ["宽屏横排导航？", ["display:flex", "display:none", "float:bottom", "table 必须"], 0, "flex。"],
      ["定义行？", ["grid-template-rows", "grid-template-columns 专行", "flex-rows", "row-define"], 0, "rows。"],
      ["auto-fit 相关？", ["可配合 repeat 做响应列", "是 JS API", "是 HTTP 头", "是 HTML 标签"], 0, "响应列。"],
      ["移动优先含义？", ["默认写小屏，再用 min-width 增强", "只写桌面", "禁止 meta", "只用 float"], 0, "小到大。"],
      ["设备像素与布局？", ["viewport 影响 CSS 布局视口", "只影响音量", "只影响蓝牙", "只影响电池"], 0, "布局视口。"],
      ["两列网格？", ["1fr 1fr 或 repeat(2,1fr)", "flex:grid", "columns:2 唯一", "float:grid"], 0, "两列。"],
      ["项目定位到某格？", ["grid-column / grid-row", "only float", "only z-index", "only alt"], 0, "线号定位。"],
      ["隐藏但仍占位？", ["visibility:hidden", "display:none", "移除 DOM 唯一", "content:none 等同 none"], 0, "visibility。"],
      ["媒体查询写在？", ["CSS 中", "只能 JS", "只能 HTML comment", "只能 JSON"], 0, "CSS。"],
      ["fr 分配的是？", ["剩余空间份数", "字体大小", "z-index", "HTTP 状态码"], 0, "剩余空间。"],
      ["gap 与 margin？", ["gap 管轨道间距更干净", "完全相同无差别", "gap 只能负", "margin 禁止"], 0, "gap 优势。"],
      ["响应式断点？", ["按设计选，如 768", "全球统一只能 1234", "禁止断点", "只能 1px"], 0, "按设计。"],
      ["grid 与 flex 选择？", ["二维偏 Grid，一维偏 Flex", "永远只用其中一个", "由字体决定", "由域名决定"], 0, "按维度。"],
      ["initial-scale=1 含义？", ["初始缩放 1", "禁止滚动", "强制横屏", "清空缓存"], 0, "缩放。"],
    ],
    [
      ["三列等宽+间距？", ["display:grid", "repeat(3,1fr) 或 1fr×3", "gap:16px", "position:sticky 必须"], [0, 1, 2], "sticky 无关。"],
      ["响应式导航？", ["默认 none", "min-width 媒体查询", "宽屏 flex", "必须 table 导航"], [0, 1, 2], "不必 table。"],
      ["正确说法？", ["Grid 二维", "fr 分剩余", "viewport 重要", "有 Grid 永不需 media"], [0, 1, 2], "仍常需 media。"],
      ["轨道定义？", ["grid-template-columns", "grid-template-rows", "repeat", "document.title"], [0, 1, 2], "非 title。"],
      ["移动适配？", ["viewport meta", "相对单位/流体布局", "媒体查询", "只用固定 1920 稿"], [0, 1, 2], "勿死稿。"],
      ["间距手段？", ["gap", "margin（仍可用）", "padding 于项目", "box-sizing 等于 gap"], [0, 1, 2], "box-sizing≠gap。"],
      ["媒体查询可测？", ["宽度", "高度", "prefers-color-scheme 等", "CPU 温度标准属性"], [0, 1, 2], "无 CPU 温度标准。"],
      ["Grid 能力？", ["二维排列", "跨行跨列", "对齐与间距", "编译 TypeScript"], [0, 1, 2], "非编译器。"],
      ["宽屏显示导航还需？", ["覆盖 display", "可加 gap", "可对齐 align-items", "删除 viewport"], [0, 1, 2], "保留 viewport。"],
      ["实践要点？", ["会写三列 grid", "会写 viewport", "会写导航显隐", "只会口头不算"], [0, 1, 2], "要会写。"],
    ]
  )
);
