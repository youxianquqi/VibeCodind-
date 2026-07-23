registerExamBank("M6", [
  {
    "id": "m6-j01",
    "module": "M6",
    "type": "judge",
    "stem": "const 绑定不能重新赋值。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": [
      0
    ],
    "explain": "对象内容仍可能改。"
  },
  {
    "id": "m6-j02",
    "module": "M6",
    "type": "judge",
    "stem": "=== 会做类型转换因此更宽松。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": [
      1
    ],
    "explain": "=== 不转换。"
  },
  {
    "id": "m6-j03",
    "module": "M6",
    "type": "judge",
    "stem": "map 返回新数组。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": [
      0
    ],
    "explain": "不就地映射返回值。"
  },
  {
    "id": "m6-j04",
    "module": "M6",
    "type": "judge",
    "stem": "箭头函数没有自己的 arguments，this 词法继承。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": [
      0
    ],
    "explain": "箭头特性。"
  },
  {
    "id": "m6-j05",
    "module": "M6",
    "type": "judge",
    "stem": "typeof null 是 \"null\"。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": [
      1
    ],
    "explain": "是 object。"
  },
  {
    "id": "m6-j06",
    "module": "M6",
    "type": "judge",
    "stem": "filter 按条件返回新数组。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": [
      0
    ],
    "explain": "筛选。"
  },
  {
    "id": "m6-j07",
    "module": "M6",
    "type": "judge",
    "stem": "let 块级作用域，var 函数作用域。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": [
      0
    ],
    "explain": "差异。"
  },
  {
    "id": "m6-j08",
    "module": "M6",
    "type": "judge",
    "stem": "== 可能触发强制类型转换。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": [
      0
    ],
    "explain": "宽松相等。"
  },
  {
    "id": "m6-j09",
    "module": "M6",
    "type": "judge",
    "stem": "forEach 返回新数组。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": [
      1
    ],
    "explain": "返回 undefined。"
  },
  {
    "id": "m6-j10",
    "module": "M6",
    "type": "judge",
    "stem": "reduce 可把数组归约为单值。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": [
      0
    ],
    "explain": "归约。"
  },
  {
    "id": "m6-j11",
    "module": "M6",
    "type": "judge",
    "stem": "NaN === NaN 为 true。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": [
      1
    ],
    "explain": "为 false。"
  },
  {
    "id": "m6-j12",
    "module": "M6",
    "type": "judge",
    "stem": "Array.isArray([]) 为 true。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": [
      0
    ],
    "explain": "判断数组。"
  },
  {
    "id": "m6-j13",
    "module": "M6",
    "type": "judge",
    "stem": "模板字符串用反引号。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": [
      0
    ],
    "explain": "` `。"
  },
  {
    "id": "m6-j14",
    "module": "M6",
    "type": "judge",
    "stem": "const 声明的对象属性绝对不能改。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": [
      1
    ],
    "explain": "仅禁重新绑定。"
  },
  {
    "id": "m6-j15",
    "module": "M6",
    "type": "judge",
    "stem": "短电路 && || 常用于默认值等逻辑。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": [
      0
    ],
    "explain": "常用。"
  },
  {
    "id": "m6-j16",
    "module": "M6",
    "type": "judge",
    "stem": "typeof function 是 \"function\"。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": [
      0
    ],
    "explain": "特殊。"
  },
  {
    "id": "m6-j17",
    "module": "M6",
    "type": "judge",
    "stem": "循环可用 break 跳出。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": [
      0
    ],
    "explain": "break。"
  },
  {
    "id": "m6-j18",
    "module": "M6",
    "type": "judge",
    "stem": "严格模式可用 'use strict'。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": [
      0
    ],
    "explain": "严格模式。"
  },
  {
    "id": "m6-j19",
    "module": "M6",
    "type": "judge",
    "stem": "对象键若为标识符可用点号访问。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": [
      0
    ],
    "explain": "obj.key。"
  },
  {
    "id": "m6-j20",
    "module": "M6",
    "type": "judge",
    "stem": "JS 中函数是一等公民，可赋值传递。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": [
      0
    ],
    "explain": "一等函数。"
  },
  {
    "id": "m6-s01",
    "module": "M6",
    "type": "single",
    "stem": "不做类型转换的比较？",
    "options": [
      "===",
      "==",
      "<>",
      "~~="
    ],
    "answer": [
      0
    ],
    "explain": "严格相等。"
  },
  {
    "id": "m6-s02",
    "module": "M6",
    "type": "single",
    "stem": "映射新数组？",
    "options": [
      "map",
      "forEach 返回数组",
      "splice 只读",
      "pop"
    ],
    "answer": [
      0
    ],
    "explain": "map。"
  },
  {
    "id": "m6-s03",
    "module": "M6",
    "type": "single",
    "stem": "归约？",
    "options": [
      "reduce",
      "find",
      "some",
      "join 专用求和"
    ],
    "answer": [
      0
    ],
    "explain": "reduce。"
  },
  {
    "id": "m6-s04",
    "module": "M6",
    "type": "single",
    "stem": "typeof []？",
    "options": [
      "\"object\"",
      "\"array\"",
      "\"list\"",
      "\"undefined\""
    ],
    "answer": [
      0
    ],
    "explain": "object。"
  },
  {
    "id": "m6-s05",
    "module": "M6",
    "type": "single",
    "stem": "至少一个满足？",
    "options": [
      "some",
      "every",
      "map",
      "join"
    ],
    "answer": [
      0
    ],
    "explain": "some。"
  },
  {
    "id": "m6-s06",
    "module": "M6",
    "type": "single",
    "stem": "函数声明？",
    "options": [
      "会提升可先调用（同作用域）",
      "绝不提升",
      "箭头可 new",
      "不能当值"
    ],
    "answer": [
      0
    ],
    "explain": "声明提升。"
  },
  {
    "id": "m6-s07",
    "module": "M6",
    "type": "single",
    "stem": "找首个元素？",
    "options": [
      "find",
      "filter 返回元素非数组",
      "sort",
      "keys"
    ],
    "answer": [
      0
    ],
    "explain": "find。"
  },
  {
    "id": "m6-s08",
    "module": "M6",
    "type": "single",
    "stem": "块级绑定？",
    "options": [
      "let/const",
      "只用 var",
      "只用 function 名",
      "只用 label"
    ],
    "answer": [
      0
    ],
    "explain": "let/const。"
  },
  {
    "id": "m6-s09",
    "module": "M6",
    "type": "single",
    "stem": "判断数组？",
    "options": [
      "Array.isArray",
      "typeof === \"array\"",
      "=== []",
      "instanceof String"
    ],
    "answer": [
      0
    ],
    "explain": "isArray。"
  },
  {
    "id": "m6-s10",
    "module": "M6",
    "type": "single",
    "stem": "模板字符串？",
    "options": [
      "`Hello ${name}`",
      "'Hello ${name}' 必插值",
      "\"${}\" 自动",
      "#{} Ruby 唯一"
    ],
    "answer": [
      0
    ],
    "explain": "反引号。"
  },
  {
    "id": "m6-s11",
    "module": "M6",
    "type": "single",
    "stem": "全部满足？",
    "options": [
      "every",
      "some",
      "map",
      "pop"
    ],
    "answer": [
      0
    ],
    "explain": "every。"
  },
  {
    "id": "m6-s12",
    "module": "M6",
    "type": "single",
    "stem": "对象合并浅拷贝常？",
    "options": [
      "Object.assign 或展开",
      "==",
      "===",
      "typeof"
    ],
    "answer": [
      0
    ],
    "explain": "assign/..."
  },
  {
    "id": "m6-s13",
    "module": "M6",
    "type": "single",
    "stem": "switch 比较类似？",
    "options": [
      "严格相等风格匹配",
      "只宽松 ==",
      "只正则",
      "只 DOM"
    ],
    "answer": [
      0
    ],
    "explain": "严格匹配。"
  },
  {
    "id": "m6-s14",
    "module": "M6",
    "type": "single",
    "stem": "while 与 for？",
    "options": [
      "都可循环",
      "while 禁止条件",
      "for 禁止初值",
      "都不能 break"
    ],
    "answer": [
      0
    ],
    "explain": "都可。"
  },
  {
    "id": "m6-s15",
    "module": "M6",
    "type": "single",
    "stem": "默认参数？",
    "options": [
      "function f(x=1){}",
      "只能外置 if",
      "禁止",
      "属于 CSS"
    ],
    "answer": [
      0
    ],
    "explain": "默认参。"
  },
  {
    "id": "m6-s16",
    "module": "M6",
    "type": "single",
    "stem": "剩余参数？",
    "options": [
      "...args",
      "arguments 箭头可用",
      "params*",
      "varargs 关键字"
    ],
    "answer": [
      0
    ],
    "explain": "..."
  },
  {
    "id": "m6-s17",
    "module": "M6",
    "type": "single",
    "stem": "includes？",
    "options": [
      "判断是否包含值",
      "删元素",
      "排序",
      "建 Promise"
    ],
    "answer": [
      0
    ],
    "explain": "包含。"
  },
  {
    "id": "m6-s18",
    "module": "M6",
    "type": "single",
    "stem": "解构数组？",
    "options": [
      "const [a,b]=arr",
      "只能对象",
      "只能 JSON.parse",
      "属于 HTML"
    ],
    "answer": [
      0
    ],
    "explain": "数组解构。"
  },
  {
    "id": "m6-s19",
    "module": "M6",
    "type": "single",
    "stem": "假值含？",
    "options": [
      "0、''、null、undefined、NaN、false",
      "只有 null",
      "只有 []",
      "只有 {}"
    ],
    "answer": [
      0
    ],
    "explain": "假值列表。"
  },
  {
    "id": "m6-s20",
    "module": "M6",
    "type": "single",
    "stem": "JSON.parse？",
    "options": [
      "解析 JSON 字符串",
      "深拷贝任意函数",
      "编译 CSS",
      "发 HTTP 必"
    ],
    "answer": [
      0
    ],
    "explain": "解析。"
  },
  {
    "id": "m6-m01",
    "module": "M6",
    "type": "multi",
    "stem": "数组常用方法？",
    "options": [
      "map",
      "filter",
      "reduce",
      "querySelector"
    ],
    "answer": [
      0,
      1,
      2
    ],
    "explain": "后者 DOM。"
  },
  {
    "id": "m6-m02",
    "module": "M6",
    "type": "multi",
    "stem": "let/const/var？",
    "options": [
      "let/const 块级",
      "const 不重绑",
      "var 提升无块级",
      "const 对象属性永不可变"
    ],
    "answer": [
      0,
      1,
      2
    ],
    "explain": "属性可改。"
  },
  {
    "id": "m6-m03",
    "module": "M6",
    "type": "multi",
    "stem": "为 true？",
    "options": [
      "1===1",
      "1==\"1\"",
      "1===\"1\"",
      "null==undefined"
    ],
    "answer": [
      0,
      1,
      3
    ],
    "explain": "严格不等。"
  },
  {
    "id": "m6-m04",
    "module": "M6",
    "type": "multi",
    "stem": "声明方式？",
    "options": [
      "let",
      "const",
      "var",
      "define 关键字标准"
    ],
    "answer": [
      0,
      1,
      2
    ],
    "explain": "无 define。"
  },
  {
    "id": "m6-m05",
    "module": "M6",
    "type": "multi",
    "stem": "循环结构？",
    "options": [
      "for",
      "while",
      "for...of",
      "box-sizing"
    ],
    "answer": [
      0,
      1,
      2
    ],
    "explain": "非 CSS。"
  },
  {
    "id": "m6-m06",
    "module": "M6",
    "type": "multi",
    "stem": "函数相关？",
    "options": [
      "声明",
      "表达式",
      "箭头",
      "grid-template"
    ],
    "answer": [
      0,
      1,
      2
    ],
    "explain": "非 Grid。"
  },
  {
    "id": "m6-m07",
    "module": "M6",
    "type": "multi",
    "stem": "真值判断注意？",
    "options": [
      "空数组是真",
      "空对象是真",
      "0 是假",
      "[]==[] 为 true"
    ],
    "answer": [
      0,
      1,
      2
    ],
    "explain": "引用不等。"
  },
  {
    "id": "m6-m08",
    "module": "M6",
    "type": "multi",
    "stem": "字符串方法？",
    "options": [
      "includes",
      "slice",
      "trim",
      "flex-grow"
    ],
    "answer": [
      0,
      1,
      2
    ],
    "explain": "非 flex。"
  },
  {
    "id": "m6-m09",
    "module": "M6",
    "type": "multi",
    "stem": "对象操作？",
    "options": [
      "点号访问",
      "中括号访问",
      "Object.keys",
      "align-items"
    ],
    "answer": [
      0,
      1,
      2
    ],
    "explain": "非 CSS。"
  },
  {
    "id": "m6-m10",
    "module": "M6",
    "type": "multi",
    "stem": "学习重点？",
    "options": [
      "类型与比较",
      "数组方法",
      "函数基础",
      "背完不写代码"
    ],
    "answer": [
      0,
      1,
      2
    ],
    "explain": "要写。"
  }
]);
