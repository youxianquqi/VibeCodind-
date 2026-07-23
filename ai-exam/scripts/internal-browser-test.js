/**
 * 内部浏览器全流程测试（puppeteer-core + 本机 Chrome/Edge）
 * 依赖：静态服 http://localhost:5178
 * 运行：node scripts/internal-browser-test.js
 */
const fs = require("fs");
const path = require("path");

async function findChrome() {
  const candidates = [
    process.env.CHROME_PATH,
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
    path.join(process.env.LOCALAPPDATA || "", "Google\\Chrome\\Application\\chrome.exe"),
    "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
  ].filter(Boolean);
  for (const c of candidates) {
    if (fs.existsSync(c)) return c;
  }
  throw new Error("未找到 Chrome/Edge");
}

function assert(cond, msg, errs) {
  if (!cond) errs.push(msg);
}

(async () => {
  const puppeteer = require("puppeteer-core");
  const browser = await puppeteer.launch({
    executablePath: await findChrome(),
    headless: true,
    args: ["--no-sandbox"],
  });
  const page = await browser.newPage();
  const errs = [];
  const log = [];

  page.on("dialog", async (d) => {
    await d.accept();
  });

  // —— 首页 ——
  await page.setViewport({ width: 1100, height: 800 });
  await page.goto("http://localhost:5178/", { waitUntil: "networkidle0" });
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: "networkidle0" });
  assert((await page.title()).includes("AI"), "首页标题异常", errs);
  assert(await page.$("a#btn-start"), "缺少正式考试按钮", errs);
  log.push("index-ok");

  // —— 开考（桌面）——
  await page.click("a#btn-start");
  await page.waitForSelector("#sheet-grid .sheet-btn", { timeout: 8000 });
  const desktop = await page.evaluate(() => {
    const shell = getComputedStyle(document.querySelector(".exam-shell"));
    const fab = getComputedStyle(document.getElementById("sheet-fab"));
    const sheet = getComputedStyle(document.getElementById("answer-sheet"));
    return {
      cols: shell.gridTemplateColumns,
      fab: fab.display,
      sheetPos: sheet.position,
      progress: document.getElementById("progress-label")?.textContent || "",
      timer: document.getElementById("timer")?.textContent || "",
      sheetCount: document.querySelectorAll(".sheet-btn").length,
      hasOptions: !!document.querySelector(".option"),
    };
  });
  assert(desktop.cols.includes("220px"), "桌面应为双栏", errs);
  assert(desktop.fab === "none", "桌面不应显示 FAB", errs);
  assert(desktop.sheetPos === "sticky", "桌面答题卡应为 sticky", errs);
  assert(desktop.sheetCount === 20, "答题卡应为 20 格，实际 " + desktop.sheetCount, errs);
  assert(/1\s*\/\s*20/.test(desktop.progress), "进度文案异常: " + desktop.progress, errs);
  assert(desktop.hasOptions, "未渲染选项", errs);
  log.push("exam-desktop");

  await page.click(".option");
  await page.click("#btn-flag");
  assert(
    await page.evaluate(() => !!document.querySelector(".sheet-btn.is-flagged")),
    "标记后答题卡应有黄框态",
    errs
  );
  await page.click("#btn-next");
  assert(
    await page.evaluate(() =>
      /2\s*\/\s*20/.test(document.getElementById("progress-label")?.textContent || "")
    ),
    "下一题未到第 2 题",
    errs
  );

  await page.reload({ waitUntil: "networkidle0" });
  assert(
    (await page.evaluate(() => document.querySelectorAll(".sheet-btn.is-answered").length)) >= 1,
    "续考应保留已答",
    errs
  );
  log.push("exam-resume");

  // —— 窄屏抽屉 ——
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1, isMobile: true });
  await page.goto("http://localhost:5178/exam.html", { waitUntil: "networkidle0" });
  await page.waitForSelector("#sheet-fab");
  const fabBox = await page.$eval("#sheet-fab", (el) => {
    const s = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    return { display: s.display, w: r.width, h: r.height };
  });
  assert(fabBox.display !== "none" && fabBox.w > 0, "手机应显示 FAB", errs);

  await page.click("#sheet-fab");
  await page.waitForFunction(
    () => document.getElementById("answer-sheet")?.classList.contains("is-open"),
    { timeout: 3000 }
  );
  await new Promise((r) => setTimeout(r, 280));
  const mobileOpen = await page.evaluate(() => {
    const sheet = document.getElementById("answer-sheet");
    const backdrop = document.getElementById("sheet-backdrop");
    const ss = getComputedStyle(sheet);
    const bs = getComputedStyle(backdrop);
    const rect = sheet.getBoundingClientRect();
    return {
      sheetPos: ss.position,
      transform: ss.transform,
      opacity: bs.opacity,
      backdropOpen: backdrop.classList.contains("is-open"),
      visible: rect.top < innerHeight && rect.height > 40,
    };
  });
  assert(mobileOpen.sheetPos === "fixed", "手机答题卡应为 fixed", errs);
  assert(
    mobileOpen.transform === "none" || mobileOpen.transform === "matrix(1, 0, 0, 1, 0, 0)",
    "抽屉打开后 transform 异常: " + mobileOpen.transform,
    errs
  );
  assert(mobileOpen.opacity === "1" && mobileOpen.backdropOpen, "遮罩应可见", errs);
  assert(mobileOpen.visible, "抽屉打开后应在视口内", errs);

  await page.click('[data-i="4"]');
  await page.waitForFunction(
    () => !document.getElementById("answer-sheet")?.classList.contains("is-open"),
    { timeout: 3000 }
  );
  const progress5 = await page.evaluate(
    () => document.getElementById("progress-label")?.textContent || ""
  );
  assert(/5\s*\/\s*20/.test(progress5), "应跳到第 5 题: " + progress5, errs);
  log.push("exam-mobile-drawer");

  // —— 合格：错 3 题 ——
  await page.setViewport({ width: 1100, height: 800, deviceScaleFactor: 1, isMobile: false });
  await page.goto("http://localhost:5178/exam.html", { waitUntil: "networkidle0" });
  const fillPass = await page.evaluate(() => {
    const paper = window.AiExamStorage.loadPaper();
    if (!paper) return { ok: false };
    paper.questions.forEach((q, i) => {
      if (i < 3) {
        const wrong = q.options.map((_, oi) => oi).filter((oi) => !q.answer.includes(oi));
        paper.answers[i] = wrong.length ? [wrong[0]] : [];
      } else {
        paper.answers[i] = (q.answer || []).slice();
      }
    });
    window.AiExamStorage.savePaper(paper);
    // 阻止 beforeunload 用内存旧答卷覆盖刚写入的 localStorage
    window.AiExamStorage.savePaper = function () {};
    const graded = window.AiExamScoring.gradePaper(paper.questions, paper.answers);
    return { ok: true, wrongCount: graded.wrongCount, passed: graded.passed };
  });
  assert(fillPass.ok, "填卷失败", errs);
  assert(fillPass.wrongCount === 3 && fillPass.passed, "预判分应为错3合格，实际 " + JSON.stringify(fillPass), errs);

  await page.reload({ waitUntil: "networkidle0" });
  await page.click("#btn-submit");
  await page.waitForFunction(() => /result/.test(location.href), { timeout: 8000 });
  const passHero = await page.evaluate(() => ({
    isPass: document.querySelector(".score-hero")?.classList.contains("is-pass") === true,
    text: document.querySelector(".score-hero")?.innerText || "",
    reviews: document.querySelectorAll(".review-item").length,
    paperCleared: !window.AiExamStorage.loadPaper(),
    historyLen: window.AiExamStorage.loadHistory().length,
  }));
  assert(passHero.isPass, "结果页应合格: " + passHero.text.replace(/\s+/g, " "), errs);
  assert(passHero.reviews === 20, "解析应为 20 条", errs);
  assert(passHero.paperCleared, "交卷后试卷应清空", errs);
  assert(passHero.historyLen >= 1, "应写入历史", errs);
  log.push("result-pass");

  // —— 不合格：错 5 题 ——
  await page.goto("http://localhost:5178/exam.html", { waitUntil: "networkidle0" });
  await page.evaluate(() => {
    window.AiExamStorage.clearPaper();
  });
  await page.reload({ waitUntil: "networkidle0" });
  await page.waitForSelector(".sheet-btn");
  await page.evaluate(() => {
    const paper = window.AiExamStorage.loadPaper();
    paper.questions.forEach((q, i) => {
      if (i < 5) {
        const wrong = q.options.map((_, oi) => oi).filter((oi) => !q.answer.includes(oi));
        paper.answers[i] = wrong.length ? [wrong[0]] : [];
      } else {
        paper.answers[i] = (q.answer || []).slice();
      }
    });
    window.AiExamStorage.savePaper(paper);
    window.AiExamStorage.savePaper = function () {};
  });
  await page.reload({ waitUntil: "networkidle0" });
  await page.click("#btn-submit");
  await page.waitForFunction(() => /result/.test(location.href), { timeout: 8000 });
  assert(
    await page.evaluate(
      () => document.querySelector(".score-hero")?.classList.contains("is-fail") === true
    ),
    "错 5 题应不合格",
    errs
  );
  log.push("result-fail");

  // —— 练习 ——
  await page.goto("http://localhost:5178/practice.html", { waitUntil: "networkidle0" });
  await page.select("#count", "5");
  await page.click("#btn-start");
  await page.waitForSelector("#question-card .option", { timeout: 5000 });
  await page.click(".option");
  await page.click("#btn-check");
  assert(
    await page.evaluate(() => {
      const fb = document.getElementById("feedback");
      return fb && !fb.hidden && fb.innerText.length > 0;
    }),
    "练习检查应显示反馈",
    errs
  );
  log.push("practice-ok");

  // —— 首页历史 ——
  await page.goto("http://localhost:5178/", { waitUntil: "networkidle0" });
  const hist0 = await page.evaluate(
    () => document.querySelector("#history-list li")?.innerText || ""
  );
  assert(hist0 && !hist0.includes("暂无"), "首页应显示最近成绩: " + hist0, errs);
  log.push("history-ok");

  console.log(JSON.stringify({ steps: log, desktop, mobileOpen, fillPass, passHero, errs }, null, 2));
  if (errs.length) {
    console.error("FAIL\n" + errs.join("\n"));
    process.exit(1);
  }
  console.log("OK internal-browser-test");
  await browser.close();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
