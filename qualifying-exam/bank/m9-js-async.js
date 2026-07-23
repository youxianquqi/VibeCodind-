registerExamBank("M9", [
  {
    "id": "m9-j01",
    "module": "M9",
    "type": "judge",
    "stem": "Promise 表示异步最终完成或失败。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": [
      0
    ],
    "explain": "容器。"
  },
  {
    "id": "m9-j02",
    "module": "M9",
    "type": "judge",
    "stem": "async 函数返回 Promise。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": [
      0
    ],
    "explain": "包装。"
  },
  {
    "id": "m9-j03",
    "module": "M9",
    "type": "judge",
    "stem": "await 用在 async 内（或支持顶层 await 的模块）。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": [
      0
    ],
    "explain": "语法。"
  },
  {
    "id": "m9-j04",
    "module": "M9",
    "type": "judge",
    "stem": "setTimeout(fn,0) 保证先于当前同步执行。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": [
      1
    ],
    "explain": "宏任务稍后。"
  },
  {
    "id": "m9-j05",
    "module": "M9",
    "type": "judge",
    "stem": "fetch 返回 Promise。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": [
      0
    ],
    "explain": "网络。"
  },
  {
    "id": "m9-j06",
    "module": "M9",
    "type": "judge",
    "stem": "then 回调通常作微任务。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": [
      0
    ],
    "explain": "微任务。"
  },
  {
    "id": "m9-j07",
    "module": "M9",
    "type": "judge",
    "stem": "宏任务后常处理清微任务。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": [
      0
    ],
    "explain": "事件循环。"
  },
  {
    "id": "m9-j08",
    "module": "M9",
    "type": "judge",
    "stem": "Promise 三态：pending/fulfilled/rejected。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": [
      0
    ],
    "explain": "三态。"
  },
  {
    "id": "m9-j09",
    "module": "M9",
    "type": "judge",
    "stem": "rejected 可用 catch 处理。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": [
      0
    ],
    "explain": "catch。"
  },
  {
    "id": "m9-j10",
    "module": "M9",
    "type": "judge",
    "stem": "Promise.all 全成功才成功。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": [
      0
    ],
    "explain": "all。"
  },
  {
    "id": "m9-j11",
    "module": "M9",
    "type": "judge",
    "stem": "Promise.race 取最先结束的那个。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": [
      0
    ],
    "explain": "race。"
  },
  {
    "id": "m9-j12",
    "module": "M9",
    "type": "judge",
    "stem": "await 失败会抛错，可用 try/catch。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": [
      0
    ],
    "explain": "捕获。"
  },
  {
    "id": "m9-j13",
    "module": "M9",
    "type": "judge",
    "stem": "fetch 404 默认一定 throw。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": [
      1
    ],
    "explain": "需查 ok/status。"
  },
  {
    "id": "m9-j14",
    "module": "M9",
    "type": "judge",
    "stem": "JSON 解析 response.json() 也是异步。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": [
      0
    ],
    "explain": "返回 Promise。"
  },
  {
    "id": "m9-j15",
    "module": "M9",
    "type": "judge",
    "stem": "微任务包括 queueMicrotask 等。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": [
      0
    ],
    "explain": "微任务源。"
  },
  {
    "id": "m9-j16",
    "module": "M9",
    "type": "judge",
    "stem": "异步等于多线程共享 this。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": [
      1
    ],
    "explain": "别混。"
  },
  {
    "id": "m9-j17",
    "module": "M9",
    "type": "judge",
    "stem": "then 可链式调用。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": [
      0
    ],
    "explain": "链式。"
  },
  {
    "id": "m9-j18",
    "module": "M9",
    "type": "judge",
    "stem": "new Promise((resolve,reject)=>{}) 可造 Promise。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": [
      0
    ],
    "explain": "构造。"
  },
  {
    "id": "m9-j19",
    "module": "M9",
    "type": "judge",
    "stem": "async 中 return 值会 resolve。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": [
      0
    ],
    "explain": "包装值。"
  },
  {
    "id": "m9-j20",
    "module": "M9",
    "type": "judge",
    "stem": "事件循环让 JS 能非阻塞调度任务。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": [
      0
    ],
    "explain": "调度。"
  },
  {
    "id": "m9-s01",
    "module": "M9",
    "type": "single",
    "stem": "已成功 Promise？",
    "options": [
      "Promise.resolve(v)",
      "Promise.fail",
      "async.reject",
      "setTimeout.resolve"
    ],
    "answer": [
      0
    ],
    "explain": "resolve。"
  },
  {
    "id": "m9-s02",
    "module": "M9",
    "type": "single",
    "stem": "并行全完成？",
    "options": [
      "Promise.all",
      "race 等全部",
      "JSON.all",
      "await 无组合"
    ],
    "answer": [
      0
    ],
    "explain": "all。"
  },
  {
    "id": "m9-s03",
    "module": "M9",
    "type": "single",
    "stem": "解析 JSON？",
    "options": [
      "response.json()",
      "toJSONSync",
      "JSON.fetch",
      "await response 变对象"
    ],
    "answer": [
      0
    ],
    "explain": "json()。"
  },
  {
    "id": "m9-s04",
    "module": "M9",
    "type": "single",
    "stem": "宏任务来源？",
    "options": [
      "setTimeout",
      "Promise.then",
      "queueMicrotask",
      "await 微任务"
    ],
    "answer": [
      0
    ],
    "explain": "定时器。"
  },
  {
    "id": "m9-s05",
    "module": "M9",
    "type": "single",
    "stem": "async 错误？",
    "options": [
      "try/catch 包 await",
      "只能 onerror",
      "@catch CSS",
      "HTML catch 属性"
    ],
    "answer": [
      0
    ],
    "explain": "try/catch。"
  },
  {
    "id": "m9-s06",
    "module": "M9",
    "type": "single",
    "stem": "三态？",
    "options": [
      "pending/fulfilled/rejected",
      "start/loading/end",
      "sync/async/defer",
      "open/close"
    ],
    "answer": [
      0
    ],
    "explain": "标准。"
  },
  {
    "id": "m9-s07",
    "module": "M9",
    "type": "single",
    "stem": "事件循环？",
    "options": [
      "调度宏/微任务实现异步",
      "每秒一行",
      "异步=多线程 this",
      "微任务永远无法插队于同轮"
    ],
    "answer": [
      0
    ],
    "explain": "调度。"
  },
  {
    "id": "m9-s08",
    "module": "M9",
    "type": "single",
    "stem": "reject？",
    "options": [
      "Promise.reject",
      "Promise.failok",
      "throw 同步代替一切异步",
      "HTTP 403 自动"
    ],
    "answer": [
      0
    ],
    "explain": "reject。"
  },
  {
    "id": "m9-s09",
    "module": "M9",
    "type": "single",
    "stem": "finally？",
    "options": [
      "无论成败执行",
      "只成功",
      "只失败",
      "取消 Promise 态"
    ],
    "answer": [
      0
    ],
    "explain": "finally。"
  },
  {
    "id": "m9-s10",
    "module": "M9",
    "type": "single",
    "stem": "allSettled？",
    "options": [
      "等全部结束不论成败",
      "等于 race",
      "等于 resolve",
      "等于 map"
    ],
    "answer": [
      0
    ],
    "explain": "settled。"
  },
  {
    "id": "m9-s11",
    "module": "M9",
    "type": "single",
    "stem": "超时实现思路？",
    "options": [
      "Promise.race 竞速超时",
      "只能同步 sleep",
      "禁 fetch",
      "改 CSS"
    ],
    "answer": [
      0
    ],
    "explain": "race。"
  },
  {
    "id": "m9-s12",
    "module": "M9",
    "type": "single",
    "stem": "可读性？",
    "options": [
      "async/await 常更清晰",
      "必须回调地狱",
      "禁止 Promise",
      "只能 xhr 同步"
    ],
    "answer": [
      0
    ],
    "explain": "await。"
  },
  {
    "id": "m9-s13",
    "module": "M9",
    "type": "single",
    "stem": "微任务排在？",
    "options": [
      "常在当前宏任务后、下一宏任务前",
      "明年",
      "DOM 删后永不再",
      "仅 CSS 动画帧强制"
    ],
    "answer": [
      0
    ],
    "explain": "时机。"
  },
  {
    "id": "m9-s14",
    "module": "M9",
    "type": "single",
    "stem": "fetch 方法？",
    "options": [
      "可指定 method headers body",
      "只能 GET 且无头",
      "不能跨域任何情况",
      "自动写 SQL"
    ],
    "answer": [
      0
    ],
    "explain": "配置。"
  },
  {
    "id": "m9-s15",
    "module": "M9",
    "type": "single",
    "stem": "取消？",
    "options": [
      "AbortController 等方案",
      "不可能",
      "只能关电脑",
      "改 typeof"
    ],
    "answer": [
      0
    ],
    "explain": "Abort。"
  },
  {
    "id": "m9-s16",
    "module": "M9",
    "type": "single",
    "stem": "then 第二参？",
    "options": [
      "可作拒捕",
      "改盒模型",
      "改语义标签",
      "开 BFC"
    ],
    "answer": [
      0
    ],
    "explain": "拒捕。"
  },
  {
    "id": "m9-s17",
    "module": "M9",
    "type": "single",
    "stem": "并发限制？",
    "options": [
      "需自行队列/池",
      "Promise.all 自动限 1",
      "浏览器禁并发",
      "只能串行同步"
    ],
    "answer": [
      0
    ],
    "explain": "自控。"
  },
  {
    "id": "m9-s18",
    "module": "M9",
    "type": "single",
    "stem": "调试异步？",
    "options": [
      "看调用栈/断点/日志顺序",
      "只能猜",
      "禁 console",
      "改 alt"
    ],
    "answer": [
      0
    ],
    "explain": "调试。"
  },
  {
    "id": "m9-s19",
    "module": "M9",
    "type": "single",
    "stem": "sleep 异步？",
    "options": [
      "await new Promise(r=>setTimeout(r,ms))",
      "while 死循环最好",
      "alert 循环",
      "CSS transition 必"
    ],
    "answer": [
      0
    ],
    "explain": "Promise+定时器。"
  },
  {
    "id": "m9-s20",
    "module": "M9",
    "type": "single",
    "stem": "错误传播？",
    "options": [
      "未 catch 的拒成未处理拒",
      "自动消失无影响",
      "变 CSS 警告",
      "变 404 页"
    ],
    "answer": [
      0
    ],
    "explain": "未处理拒。"
  },
  {
    "id": "m9-m01",
    "module": "M9",
    "type": "multi",
    "stem": "异步相关？",
    "options": [
      "Promise",
      "async/await",
      "setTimeout",
      "box-sizing"
    ],
    "answer": [
      0,
      1,
      2
    ],
    "explain": "非盒模型。"
  },
  {
    "id": "m9-m02",
    "module": "M9",
    "type": "multi",
    "stem": "fetch 注意？",
    "options": [
      "查 ok/状态码",
      "catch 失败",
      "json 异步",
      "失败自动无限重试"
    ],
    "answer": [
      0,
      1,
      2
    ],
    "explain": "无无限重试。"
  },
  {
    "id": "m9-m03",
    "module": "M9",
    "type": "multi",
    "stem": "宏微任务？",
    "options": [
      "then 偏微",
      "setTimeout 偏宏",
      "宏后清微",
      "完全无区别"
    ],
    "answer": [
      0,
      1,
      2
    ],
    "explain": "有区别。"
  },
  {
    "id": "m9-m04",
    "module": "M9",
    "type": "multi",
    "stem": "组合子？",
    "options": [
      "all",
      "race",
      "allSettled",
      "align-items"
    ],
    "answer": [
      0,
      1,
      2
    ],
    "explain": "非 Flex。"
  },
  {
    "id": "m9-m05",
    "module": "M9",
    "type": "multi",
    "stem": "写 async？",
    "options": [
      "async 函数",
      "await 表达式",
      "try/catch",
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
    "id": "m9-m06",
    "module": "M9",
    "type": "multi",
    "stem": "状态？",
    "options": [
      "pending",
      "fulfilled",
      "rejected",
      "float"
    ],
    "answer": [
      0,
      1,
      2
    ],
    "explain": "非 float。"
  },
  {
    "id": "m9-m07",
    "module": "M9",
    "type": "multi",
    "stem": "网络？",
    "options": [
      "fetch",
      "HTTP 状态",
      "headers",
      "BFC 触发"
    ],
    "answer": [
      0,
      1,
      2
    ],
    "explain": "非 BFC。"
  },
  {
    "id": "m9-m08",
    "module": "M9",
    "type": "multi",
    "stem": "定时？",
    "options": [
      "setTimeout",
      "setInterval",
      "clearTimeout",
      "section 标签"
    ],
    "answer": [
      0,
      1,
      2
    ],
    "explain": "非 HTML。"
  },
  {
    "id": "m9-m09",
    "module": "M9",
    "type": "multi",
    "stem": "好习惯？",
    "options": [
      "处理错误",
      "理解顺序",
      "避免假同步死循环",
      "忽略拒"
    ],
    "answer": [
      0,
      1,
      2
    ],
    "explain": "勿忽略。"
  },
  {
    "id": "m9-m10",
    "module": "M9",
    "type": "multi",
    "stem": "考点？",
    "options": [
      "Promise",
      "事件循环",
      "fetch",
      "科目二倒车入库操作杆手感"
    ],
    "answer": [
      0,
      1,
      2
    ],
    "explain": "非科目二。"
  }
]);
