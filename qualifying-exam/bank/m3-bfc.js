registerExamBank("M3", [
  {
    "id": "m3-j01",
    "module": "M3",
    "type": "judge",
    "stem": "BFC 全称是 Block Formatting Context。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": [
      0
    ],
    "explain": "块级格式化上下文。"
  },
  {
    "id": "m3-j02",
    "module": "M3",
    "type": "judge",
    "stem": "BFC 可理解为相对独立的排版区域。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": [
      0
    ],
    "explain": "内外隔离。"
  },
  {
    "id": "m3-j03",
    "module": "M3",
    "type": "judge",
    "stem": "overflow:hidden 可能创建 BFC。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": [
      0
    ],
    "explain": "overflow 非 visible 常见触发。"
  },
  {
    "id": "m3-j04",
    "module": "M3",
    "type": "judge",
    "stem": "现代布局应优先乱写 overflow:hidden 而不是 Flex/Grid。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": [
      1
    ],
    "explain": "优先 Flex/Grid。"
  },
  {
    "id": "m3-j05",
    "module": "M3",
    "type": "judge",
    "stem": "BFC 可帮助包含内部浮动。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": [
      0
    ],
    "explain": "防高度塌陷。"
  },
  {
    "id": "m3-j06",
    "module": "M3",
    "type": "judge",
    "stem": "不同 BFC 间可避免某些 margin 合并。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": [
      0
    ],
    "explain": "隔离 margin。"
  },
  {
    "id": "m3-j07",
    "module": "M3",
    "type": "judge",
    "stem": "display:flow-root 用于创建 BFC。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": [
      0
    ],
    "explain": "语义明确。"
  },
  {
    "id": "m3-j08",
    "module": "M3",
    "type": "judge",
    "stem": "float:left 可创建 BFC。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": [
      0
    ],
    "explain": "浮动元素形成 BFC。"
  },
  {
    "id": "m3-j09",
    "module": "M3",
    "type": "judge",
    "stem": "color:red 会创建 BFC。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": [
      1
    ],
    "explain": "颜色无关。"
  },
  {
    "id": "m3-j10",
    "module": "M3",
    "type": "judge",
    "stem": "BFC 区域不与外部 float 重叠（经典规则）。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": [
      0
    ],
    "explain": "自适应栏技巧。"
  },
  {
    "id": "m3-j11",
    "module": "M3",
    "type": "judge",
    "stem": "Flex 容器会创建独立的格式化上下文。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": [
      0
    ],
    "explain": "FFC，常对比理解。"
  },
  {
    "id": "m3-j12",
    "module": "M3",
    "type": "judge",
    "stem": "Grid 容器也会创建独立格式化上下文。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": [
      0
    ],
    "explain": "GFC。"
  },
  {
    "id": "m3-j13",
    "module": "M3",
    "type": "judge",
    "stem": "BFC 是 JavaScript 闭包别名。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": [
      1
    ],
    "explain": "完全不同。"
  },
  {
    "id": "m3-j14",
    "module": "M3",
    "type": "judge",
    "stem": "position:absolute 元素会创建 BFC。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": [
      0
    ],
    "explain": "绝对定位触发。"
  },
  {
    "id": "m3-j15",
    "module": "M3",
    "type": "judge",
    "stem": "只有 IE 才有 BFC 概念。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": [
      1
    ],
    "explain": "是 CSS 视觉格式化概念。"
  },
  {
    "id": "m3-j16",
    "module": "M3",
    "type": "judge",
    "stem": "学习 BFC 有助于理解清浮动等历史问题。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": [
      0
    ],
    "explain": "原理课。"
  },
  {
    "id": "m3-j17",
    "module": "M3",
    "type": "judge",
    "stem": "display:inline-block 可创建 BFC。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": [
      0
    ],
    "explain": "常见触发之一。"
  },
  {
    "id": "m3-j18",
    "module": "M3",
    "type": "judge",
    "stem": "父级高度因 float 子元素塌陷时，可让父级形成 BFC。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": [
      0
    ],
    "explain": "经典解法。"
  },
  {
    "id": "m3-j19",
    "module": "M3",
    "type": "judge",
    "stem": "BFC 可以替代媒体查询做响应式。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": [
      1
    ],
    "explain": "不相关。"
  },
  {
    "id": "m3-j20",
    "module": "M3",
    "type": "judge",
    "stem": "overflow:auto 也可能创建 BFC。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": [
      0
    ],
    "explain": "非 visible 即可。"
  },
  {
    "id": "m3-s01",
    "module": "M3",
    "type": "single",
    "stem": "BFC 英文？",
    "options": [
      "Block Formatting Context",
      "Box Flex Container",
      "Border Frame Cascade",
      "Browser Font Cache"
    ],
    "answer": [
      0
    ],
    "explain": "全称。"
  },
  {
    "id": "m3-s02",
    "module": "M3",
    "type": "single",
    "stem": "更推荐单纯开 BFC？",
    "options": [
      "display:flow-root",
      "color:inherit",
      "width:100%",
      "zoom 神话且无脑"
    ],
    "answer": [
      0
    ],
    "explain": "flow-root。"
  },
  {
    "id": "m3-s03",
    "module": "M3",
    "type": "single",
    "stem": "float 致父高度塌陷，思路？",
    "options": [
      "父级形成 BFC 包住浮动",
      "子元素 font-size:0 必行",
      "删 padding",
      "改 static 即可"
    ],
    "answer": [
      0
    ],
    "explain": "包含浮动。"
  },
  {
    "id": "m3-s04",
    "module": "M3",
    "type": "single",
    "stem": "通常不触发 BFC？",
    "options": [
      "margin:0",
      "float:left",
      "position:absolute",
      "overflow:auto"
    ],
    "answer": [
      0
    ],
    "explain": "margin 不触发。"
  },
  {
    "id": "m3-s05",
    "module": "M3",
    "type": "single",
    "stem": "BFC 与现代布局？",
    "options": [
      "日常优先 Flex/Grid，BFC 作原理补充",
      "有 BFC 不必学 Flex",
      "只能用 float 创建",
      "是 DOM API"
    ],
    "answer": [
      0
    ],
    "explain": "分工。"
  },
  {
    "id": "m3-s06",
    "module": "M3",
    "type": "single",
    "stem": "自适应栏不与 float 重叠？",
    "options": [
      "自适应栏形成 BFC",
      "z-index:-1",
      "只用 table",
      "改 static 必然"
    ],
    "answer": [
      0
    ],
    "explain": "BFC 不与 float 重叠。"
  },
  {
    "id": "m3-s07",
    "module": "M3",
    "type": "single",
    "stem": "清除浮动的现代语义化方式更倾向？",
    "options": [
      "flow-root 或布局方案",
      "任意加 br",
      "无限嵌套 table",
      "用 flash"
    ],
    "answer": [
      0
    ],
    "explain": "flow-root/Flex。"
  },
  {
    "id": "m3-s08",
    "module": "M3",
    "type": "single",
    "stem": "margin 合并发生在？",
    "options": [
      "相邻块级盒垂直方向等条件满足时",
      "任意 inline",
      "只有 grid 间隙",
      "只有 flex gap"
    ],
    "answer": [
      0
    ],
    "explain": "经典塌陷。"
  },
  {
    "id": "m3-s09",
    "module": "M3",
    "type": "single",
    "stem": "overflow:hidden 副作用？",
    "options": [
      "可能裁切内容",
      "一定加快 JS",
      "删除事件",
      "改变 HTML 语义"
    ],
    "answer": [
      0
    ],
    "explain": "裁切风险。"
  },
  {
    "id": "m3-s10",
    "module": "M3",
    "type": "single",
    "stem": "BFC 内浮动？",
    "options": [
      "会被 BFC 包含计算高度",
      "一定溢出到 body 外",
      "取消浮动属性",
      "变成 fixed"
    ],
    "answer": [
      0
    ],
    "explain": "包含。"
  },
  {
    "id": "m3-s11",
    "module": "M3",
    "type": "single",
    "stem": "下列属于格式化上下文相关？",
    "options": [
      "BFC",
      "仅 JSON",
      "仅 FTP",
      "仅 SMTP"
    ],
    "answer": [
      0
    ],
    "explain": "BFC。"
  },
  {
    "id": "m3-s12",
    "module": "M3",
    "type": "single",
    "stem": "两栏 float+自适应经典？",
    "options": [
      "触发 BFC",
      "只用 letter-spacing",
      "禁用 CSS",
      "必须 iframe"
    ],
    "answer": [
      0
    ],
    "explain": "BFC。"
  },
  {
    "id": "m3-s13",
    "module": "M3",
    "type": "single",
    "stem": "display:flex 主要创建？",
    "options": [
      "弹性格式化上下文",
      "只能 BFC 一名",
      "表格上下文唯一",
      "无上下文"
    ],
    "answer": [
      0
    ],
    "explain": "Flex 上下文。"
  },
  {
    "id": "m3-s14",
    "module": "M3",
    "type": "single",
    "stem": "理解 BFC 有助于？",
    "options": [
      "解释清浮动/margin 问题",
      "替代 TypeScript",
      "加速硬盘",
      "生成证书"
    ],
    "answer": [
      0
    ],
    "explain": "原理解释。"
  },
  {
    "id": "m3-s15",
    "module": "M3",
    "type": "single",
    "stem": "float 值 none？",
    "options": [
      "不创建浮动相关 BFC 触发",
      "强制 BFC",
      "等于 flow-root",
      "等于 flex"
    ],
    "answer": [
      0
    ],
    "explain": "none 不浮动。"
  },
  {
    "id": "m3-s16",
    "module": "M3",
    "type": "single",
    "stem": "含根块？",
    "options": [
      "html 等形成初始包含块相关概念需区分于 BFC 细节",
      "等于 margin",
      "等于 padding",
      "等于 alt"
    ],
    "answer": [
      0
    ],
    "explain": "概念区分。"
  },
  {
    "id": "m3-s17",
    "module": "M3",
    "type": "single",
    "stem": "面试常问 BFC 用途？",
    "options": [
      "清浮动、防 margin 合并、防与 float 重叠",
      "只改字体",
      "只改颜色",
      "只写动画"
    ],
    "answer": [
      0
    ],
    "explain": "三大用途。"
  },
  {
    "id": "m3-s18",
    "module": "M3",
    "type": "single",
    "stem": "创建 BFC 的 position？",
    "options": [
      "absolute/fixed",
      "static 专用",
      "static+relative 禁止",
      "只 sticky"
    ],
    "answer": [
      0
    ],
    "explain": "绝对/固定。"
  },
  {
    "id": "m3-s19",
    "module": "M3",
    "type": "single",
    "stem": "inline-block 特点？",
    "options": [
      "可触发 BFC 且行内级盒",
      "等于 none",
      "等于 contents 删除盒",
      "禁止宽高"
    ],
    "answer": [
      0
    ],
    "explain": "常见。"
  },
  {
    "id": "m3-s20",
    "module": "M3",
    "type": "single",
    "stem": "学完 Flex 还要 BFC？",
    "options": [
      "有助读懂旧代码与原理",
      "完全无用",
      "取代 HTML",
      "取代 HTTP"
    ],
    "answer": [
      0
    ],
    "explain": "原理课有价值。"
  },
  {
    "id": "m3-m01",
    "module": "M3",
    "type": "multi",
    "stem": "可创建 BFC/独立上下文？",
    "options": [
      "overflow:hidden",
      "float:left",
      "flow-root",
      "margin:0"
    ],
    "answer": [
      0,
      1,
      2
    ],
    "explain": "margin 不行。"
  },
  {
    "id": "m3-m02",
    "module": "M3",
    "type": "multi",
    "stem": "BFC 用途？",
    "options": [
      "包含浮动",
      "隔离 margin 合并",
      "与 float 并排不重叠",
      "替代所有媒体查询"
    ],
    "answer": [
      0,
      1,
      2
    ],
    "explain": "与断点无关。"
  },
  {
    "id": "m3-m03",
    "module": "M3",
    "type": "multi",
    "stem": "正确说法？",
    "options": [
      "BFC 是视觉格式化概念",
      "滥用 overflow 可能裁切",
      "Flex/Grid 也有独立上下文",
      "BFC=闭包"
    ],
    "answer": [
      0,
      1,
      2
    ],
    "explain": "≠闭包。"
  },
  {
    "id": "m3-m04",
    "module": "M3",
    "type": "multi",
    "stem": "触发手段？",
    "options": [
      "overflow 非 visible",
      "float 非 none",
      "绝对定位",
      "line-height:1 唯一"
    ],
    "answer": [
      0,
      1,
      2
    ],
    "explain": "行高不触发。"
  },
  {
    "id": "m3-m05",
    "module": "M3",
    "type": "multi",
    "stem": "清浮动相关？",
    "options": [
      "父级 BFC",
      "clear",
      "flow-root",
      "改 title 属性"
    ],
    "answer": [
      0,
      1,
      2
    ],
    "explain": "title 无关。"
  },
  {
    "id": "m3-m06",
    "module": "M3",
    "type": "multi",
    "stem": "不推荐的理由？",
    "options": [
      "overflow:hidden 乱用以清浮动可能裁切",
      "缺少语义",
      "难维护",
      "flow-root 比乱 hidden 更清晰故永远禁止 overflow"
    ],
    "answer": [
      0,
      1,
      2
    ],
    "explain": "overflow 仍有正当用途。"
  },
  {
    "id": "m3-m07",
    "module": "M3",
    "type": "multi",
    "stem": "与布局方案？",
    "options": [
      "新项目优先 Flex/Grid",
      "BFC 解释旧技",
      "两者可并存理解",
      "只能选 float 时代"
    ],
    "answer": [
      0,
      1,
      2
    ],
    "explain": "时代演进。"
  },
  {
    "id": "m3-m08",
    "module": "M3",
    "type": "multi",
    "stem": "margin 合并特点？",
    "options": [
      "垂直相邻",
      "取较大者等规则",
      "分属不同 BFC 可避免",
      "只有颜色触发"
    ],
    "answer": [
      0,
      1,
      2
    ],
    "explain": "颜色无关。"
  },
  {
    "id": "m3-m09",
    "module": "M3",
    "type": "multi",
    "stem": "属于误解？",
    "options": [
      "BFC 能让 JS 变快",
      "BFC 等于 display:block",
      "BFC 可替代语义标签",
      "flow-root 可开 BFC"
    ],
    "answer": [
      0,
      1,
      2
    ],
    "explain": "前三错，选错项题——改成正确多选："
  },
  {
    "id": "m3-m10",
    "module": "M3",
    "type": "multi",
    "stem": "学习路径建议？",
    "options": [
      "先会 Flex 居中两栏",
      "了解 BFC 触发与用途",
      "能讲清浮动塌陷",
      "背完即可永不实践"
    ],
    "answer": [
      0,
      1,
      2
    ],
    "explain": "要实践。"
  }
]);
