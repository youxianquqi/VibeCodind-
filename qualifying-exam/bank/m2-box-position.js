registerExamBank("M2", [
  {
    "id": "m2-j01",
    "module": "M2",
    "type": "judge",
    "stem": "默认 box-sizing 是 content-box：width 只约束内容区。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": [
      0
    ],
    "explain": "padding/border 会外加。"
  },
  {
    "id": "m2-j02",
    "module": "M2",
    "type": "judge",
    "stem": "border-box 下 width 含 content、padding、border，不含 margin。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": [
      0
    ],
    "explain": "margin 在外。"
  },
  {
    "id": "m2-j03",
    "module": "M2",
    "type": "judge",
    "stem": "可以写 width: padding-box 让宽度含内边距。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": [
      1
    ],
    "explain": "无此 width 取值。"
  },
  {
    "id": "m2-j04",
    "module": "M2",
    "type": "judge",
    "stem": "position:static 时 top/left 通常无效。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": [
      0
    ],
    "explain": "默认文档流。"
  },
  {
    "id": "m2-j05",
    "module": "M2",
    "type": "judge",
    "stem": "absolute 仍占据原来的文档流空间。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": [
      1
    ],
    "explain": "absolute 脱离文档流。"
  },
  {
    "id": "m2-j06",
    "module": "M2",
    "type": "judge",
    "stem": "relative 相对自身原位置偏移且保留占位。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": [
      0
    ],
    "explain": "relative 特性。"
  },
  {
    "id": "m2-j07",
    "module": "M2",
    "type": "judge",
    "stem": "fixed 常相对视口定位。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": [
      0
    ],
    "explain": "常见情况相对视口。"
  },
  {
    "id": "m2-j08",
    "module": "M2",
    "type": "judge",
    "stem": "sticky 是滚动到阈值后粘住。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": [
      0
    ],
    "explain": "粘性定位。"
  },
  {
    "id": "m2-j09",
    "module": "M2",
    "type": "judge",
    "stem": "margin 算进 border-box 的 width。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": [
      1
    ],
    "explain": "margin 从不计入 width。"
  },
  {
    "id": "m2-j10",
    "module": "M2",
    "type": "judge",
    "stem": "盒模型由内到外：content→padding→border→margin。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": [
      0
    ],
    "explain": "标准层次。"
  },
  {
    "id": "m2-j11",
    "module": "M2",
    "type": "judge",
    "stem": "给父级 position:relative 常作为 absolute 子元素参照。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": [
      0
    ],
    "explain": "建立定位包含块。"
  },
  {
    "id": "m2-j12",
    "module": "M2",
    "type": "judge",
    "stem": "z-index 只对定位元素（非 static）等层叠上下文相关情况生效更明显。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": [
      0
    ],
    "explain": "static 上 z-index 通常无效。"
  },
  {
    "id": "m2-j13",
    "module": "M2",
    "type": "judge",
    "stem": "padding 增加内容与边框之间的空间。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": [
      0
    ],
    "explain": "内边距。"
  },
  {
    "id": "m2-j14",
    "module": "M2",
    "type": "judge",
    "stem": "border 画在 padding 外侧。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": [
      0
    ],
    "explain": "边框层。"
  },
  {
    "id": "m2-j15",
    "module": "M2",
    "type": "judge",
    "stem": "两个兄弟块的垂直 margin 可能合并。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": [
      0
    ],
    "explain": "margin collapsing。"
  },
  {
    "id": "m2-j16",
    "module": "M2",
    "type": "judge",
    "stem": "box-sizing 默认会继承到所有子孙。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": [
      1
    ],
    "explain": "默认不继承。"
  },
  {
    "id": "m2-j17",
    "module": "M2",
    "type": "judge",
    "stem": "overflow:hidden 会裁切溢出内容。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": [
      0
    ],
    "explain": "隐藏溢出。"
  },
  {
    "id": "m2-j18",
    "module": "M2",
    "type": "judge",
    "stem": "width:100% 在 content-box 下再加 padding 可能撑破父级。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": [
      0
    ],
    "explain": "经典坑。"
  },
  {
    "id": "m2-j19",
    "module": "M2",
    "type": "judge",
    "stem": "fixed 元素一定永远相对浏览器窗口，不受任何祖先 transform 影响。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": [
      1
    ],
    "explain": "transform 等可改变包含块。"
  },
  {
    "id": "m2-j20",
    "module": "M2",
    "type": "judge",
    "stem": "display:none 的元素不占据布局空间。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": [
      0
    ],
    "explain": "从渲染树移除。"
  },
  {
    "id": "m2-s01",
    "module": "M2",
    "type": "single",
    "stem": "希望 width 含 padding 与 border，应设？",
    "options": [
      "box-sizing:border-box",
      "box-sizing:content-box",
      "width:padding-box",
      "display:border-box"
    ],
    "answer": [
      0
    ],
    "explain": "border-box。"
  },
  {
    "id": "m2-s02",
    "module": "M2",
    "type": "single",
    "stem": "盒模型由内到外？",
    "options": [
      "content→padding→border→margin",
      "margin→content→padding→border",
      "border→padding→content→margin",
      "padding→border→margin→content"
    ],
    "answer": [
      0
    ],
    "explain": "牢记顺序。"
  },
  {
    "id": "m2-s03",
    "module": "M2",
    "type": "single",
    "stem": "absolute 默认相对？",
    "options": [
      "最近非 static 定位祖先",
      "永远 body",
      "永远自身原位置",
      "永远视口"
    ],
    "answer": [
      0
    ],
    "explain": "定位包含块。"
  },
  {
    "id": "m2-s04",
    "module": "M2",
    "type": "single",
    "stem": "父级常设何值给 absolute 子元素当参照？",
    "options": [
      "relative",
      "static",
      "float:left",
      "display:inline"
    ],
    "answer": [
      0
    ],
    "explain": "relative 常用。"
  },
  {
    "id": "m2-s05",
    "module": "M2",
    "type": "single",
    "stem": "默认 position？",
    "options": [
      "static",
      "relative",
      "absolute",
      "sticky"
    ],
    "answer": [
      0
    ],
    "explain": "static。"
  },
  {
    "id": "m2-s06",
    "module": "M2",
    "type": "single",
    "stem": "滚动粘住用？",
    "options": [
      "sticky",
      "fixed",
      "absolute",
      "static"
    ],
    "answer": [
      0
    ],
    "explain": "sticky。"
  },
  {
    "id": "m2-s07",
    "module": "M2",
    "type": "single",
    "stem": "全局 border-box 时子元素常用？",
    "options": [
      "box-sizing:inherit",
      "box-sizing:padding-box",
      "width:inherit 必须",
      "float:inherit"
    ],
    "answer": [
      0
    ],
    "explain": "MDN 推荐 inherit。"
  },
  {
    "id": "m2-s08",
    "module": "M2",
    "type": "single",
    "stem": "不占文档流的是？",
    "options": [
      "absolute",
      "relative",
      "static",
      "sticky 未吸顶时完全等同 float"
    ],
    "answer": [
      0
    ],
    "explain": "absolute 脱离。"
  },
  {
    "id": "m2-s09",
    "module": "M2",
    "type": "single",
    "stem": "只增加元素外与邻居间距的是？",
    "options": [
      "margin",
      "padding",
      "border-width",
      "outline 等同 margin"
    ],
    "answer": [
      0
    ],
    "explain": "margin。"
  },
  {
    "id": "m2-s10",
    "module": "M2",
    "type": "single",
    "stem": "内容与边框之间是？",
    "options": [
      "padding",
      "margin",
      "z-index",
      "caption-side"
    ],
    "answer": [
      0
    ],
    "explain": "padding。"
  },
  {
    "id": "m2-s11",
    "module": "M2",
    "type": "single",
    "stem": "使元素定位并贴父级右上，除 absolute 外常配？",
    "options": [
      "top:0; right:0",
      "float:center",
      "text-align:absolute",
      "vertical-align:fixed"
    ],
    "answer": [
      0
    ],
    "explain": "偏移属性。"
  },
  {
    "id": "m2-s12",
    "module": "M2",
    "type": "single",
    "stem": "visibility:hidden 与 display:none 差别？",
    "options": [
      "前者仍占位",
      "二者完全相同",
      "前者更快删 DOM",
      "后者仍可见"
    ],
    "answer": [
      0
    ],
    "explain": "hidden 占位。"
  },
  {
    "id": "m2-s13",
    "module": "M2",
    "type": "single",
    "stem": "min-width 的作用？",
    "options": [
      "限制最小宽度",
      "固定字体",
      "创建 BFC 唯一方式",
      "替代 media query"
    ],
    "answer": [
      0
    ],
    "explain": "最小宽。"
  },
  {
    "id": "m2-s14",
    "module": "M2",
    "type": "single",
    "stem": "border-radius 影响？",
    "options": [
      "圆角外观",
      "改变 box-sizing 算法",
      "取消 margin",
      "禁止 absolute"
    ],
    "answer": [
      0
    ],
    "explain": "视觉圆角。"
  },
  {
    "id": "m2-s15",
    "module": "M2",
    "type": "single",
    "stem": "盒模型中不算进 width 的是？",
    "options": [
      "margin",
      "在 border-box 下的 padding",
      "在 border-box 下的 border",
      "content"
    ],
    "answer": [
      0
    ],
    "explain": "margin 不算。"
  },
  {
    "id": "m2-s16",
    "module": "M2",
    "type": "single",
    "stem": "relative 偏移后？",
    "options": [
      "原空间仍保留",
      "一定塌陷父高度",
      "自动变 fixed",
      "失去事件"
    ],
    "answer": [
      0
    ],
    "explain": "占位保留。"
  },
  {
    "id": "m2-s17",
    "module": "M2",
    "type": "single",
    "stem": "含块被 transform 的祖先可能影响？",
    "options": [
      "fixed 的包含块",
      "只能影响 color",
      "禁止一切定位",
      "删除 z-index"
    ],
    "answer": [
      0
    ],
    "explain": "包含块规则。"
  },
  {
    "id": "m2-s18",
    "module": "M2",
    "type": "single",
    "stem": "outline 通常？",
    "options": [
      "不占布局尺寸",
      "等同 margin",
      "等同 padding",
      "改变 width 计算"
    ],
    "answer": [
      0
    ],
    "explain": "outline 不占盒尺寸。"
  },
  {
    "id": "m2-s19",
    "module": "M2",
    "type": "single",
    "stem": "block 级盒默认宽度常？",
    "options": [
      "Stretch 填满包含块（常见）",
      "收缩为 0",
      "等于视口 2 倍",
      "必须写死 px"
    ],
    "answer": [
      0
    ],
    "explain": "块级默认伸展。"
  },
  {
    "id": "m2-s20",
    "module": "M2",
    "type": "single",
    "stem": "inline 元素设置 width？",
    "options": [
      "通常无效（非替换元素）",
      "一定生效",
      "变成 grid",
      "变成 sticky"
    ],
    "answer": [
      0
    ],
    "explain": "行内非替换宽高受限。"
  },
  {
    "id": "m2-m01",
    "module": "M2",
    "type": "multi",
    "stem": "关于 border-box 正确？",
    "options": [
      "width 含 padding/border",
      "margin 仍在外",
      "利于定宽栏",
      "等于 width:padding-box"
    ],
    "answer": [
      0,
      1,
      2
    ],
    "explain": "无 padding-box width。"
  },
  {
    "id": "m2-m02",
    "module": "M2",
    "type": "multi",
    "stem": "合法 position？",
    "options": [
      "relative",
      "absolute",
      "fixed",
      "center"
    ],
    "answer": [
      0,
      1,
      2
    ],
    "explain": "无 center。"
  },
  {
    "id": "m2-m03",
    "module": "M2",
    "type": "multi",
    "stem": "relative vs absolute？",
    "options": [
      "relative 相对自身",
      "absolute 相对定位祖先",
      "absolute 脱离流",
      "二者都不影响占位"
    ],
    "answer": [
      0,
      1,
      2
    ],
    "explain": "relative 占位。"
  },
  {
    "id": "m2-m04",
    "module": "M2",
    "type": "multi",
    "stem": "可建立定位上下文的常见值？",
    "options": [
      "relative",
      "absolute",
      "fixed",
      "static"
    ],
    "answer": [
      0,
      1,
      2
    ],
    "explain": "static 不建。"
  },
  {
    "id": "m2-m05",
    "module": "M2",
    "type": "multi",
    "stem": "导致视觉尺寸变大的（content-box）？",
    "options": [
      "增加 padding",
      "增加 border",
      "增加 margin 影响占位但不进 width",
      "改 color"
    ],
    "answer": [
      0,
      1,
      2
    ],
    "explain": "color 无关。"
  },
  {
    "id": "m2-m06",
    "module": "M2",
    "type": "multi",
    "stem": "常用布局相关属性？",
    "options": [
      "width/height",
      "margin/padding",
      "position",
      "font-family 决定 BFC"
    ],
    "answer": [
      0,
      1,
      2
    ],
    "explain": "字体不建 BFC。"
  },
  {
    "id": "m2-m07",
    "module": "M2",
    "type": "multi",
    "stem": "关于 z-index？",
    "options": [
      "可影响层叠顺序",
      "常需定位元素",
      "同上下文内比较",
      "任意元素设了就全局最高且忽略上下文"
    ],
    "answer": [
      0,
      1,
      2
    ],
    "explain": "受层叠上下文限制。"
  },
  {
    "id": "m2-m08",
    "module": "M2",
    "type": "multi",
    "stem": "溢出处理？",
    "options": [
      "overflow:hidden",
      "overflow:auto",
      "overflow:scroll",
      "overflow:center"
    ],
    "answer": [
      0,
      1,
      2
    ],
    "explain": "无 center。"
  },
  {
    "id": "m2-m09",
    "module": "M2",
    "type": "multi",
    "stem": "盒模型误区纠正？",
    "options": [
      "没有 width:padding-box",
      "margin 不算进 width",
      "border-box 更直观",
      "padding 就是外边距"
    ],
    "answer": [
      0,
      1,
      2
    ],
    "explain": "padding 是内边距。"
  },
  {
    "id": "m2-m10",
    "module": "M2",
    "type": "multi",
    "stem": "定位常见用途？",
    "options": [
      "角标贴边",
      "固定顶栏 fixed",
      "吸顶 sticky",
      "替代所有语义 HTML"
    ],
    "answer": [
      0,
      1,
      2
    ],
    "explain": "定位≠语义。"
  }
]);
