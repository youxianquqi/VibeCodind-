/**
 * 响应式冒烟：桌面/平板/手机布局与答题卡抽屉
 * 运行：node scripts/responsive-check.js
 * 依赖：puppeteer-core + 本机 Chrome/Edge；静态服 http://localhost:5178
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
  throw new Error("未找到 Chrome/Edge，可设置 CHROME_PATH");
}

(async () => {
  const puppeteer = require("puppeteer-core");
  const browser = await puppeteer.launch({
    executablePath: await findChrome(),
    headless: true,
    args: ["--no-sandbox"],
  });
  const page = await browser.newPage();
  const results = {};

  for (const [name, width, height, mobile] of [
    ["desktop", 1100, 800, false],
    ["tablet", 800, 900, true],
    ["phone", 390, 844, true],
  ]) {
    await page.setViewport({ width, height, isMobile: mobile, deviceScaleFactor: 1 });
    await page.goto("http://localhost:5178/exam.html", {
      waitUntil: "networkidle0",
      timeout: 20000,
    });

    const base = await page.evaluate(() => {
      const shell = document.querySelector(".exam-shell");
      const sheet = document.getElementById("answer-sheet");
      const fab = document.getElementById("sheet-fab");
      const cs = getComputedStyle(shell);
      const ss = getComputedStyle(sheet);
      const fs = getComputedStyle(fab);
      return {
        w: innerWidth,
        cols: cs.gridTemplateColumns,
        sheetPos: ss.position,
        fabDisplay: fs.display,
        optionH: Math.round(document.querySelector(".option")?.getBoundingClientRect().height || 0),
        btnH: Math.round(document.querySelector(".btn")?.getBoundingClientRect().height || 0),
        sheetBtnH: Math.round(document.querySelector(".sheet-btn")?.getBoundingClientRect().height || 0),
      };
    });

    let drawer = null;
    if (width <= 920) {
      drawer = await page.evaluate(async () => {
        const sheet = document.getElementById("answer-sheet");
        const fab = document.getElementById("sheet-fab");
        const backdrop = document.getElementById("sheet-backdrop");
        fab.click();
        await new Promise((r) => setTimeout(r, 320));
        const ss = getComputedStyle(sheet);
        const bs = getComputedStyle(backdrop);
        const rect = sheet.getBoundingClientRect();
        const open = {
          hasOpen: sheet.classList.contains("is-open"),
          backdropOpen: backdrop.classList.contains("is-open"),
          transform: ss.transform,
          opacity: bs.opacity,
          sheetTop: Math.round(rect.top),
          sheetVisible: rect.top < innerHeight && rect.height > 40,
        };
        document.querySelector('[data-i="2"]').click();
        await new Promise((r) => setTimeout(r, 50));
        open.closedAfterPick = !sheet.classList.contains("is-open");
        open.progress = document.getElementById("progress-label").textContent;
        return open;
      });
    }

    results[name] = { ...base, drawer };
  }

  // 断言
  const errs = [];
  if (!results.desktop.cols.includes("220px")) errs.push("desktop: 期望双栏含 220px");
  if (results.desktop.sheetPos !== "sticky") errs.push("desktop: 答题卡应为 sticky");
  if (results.desktop.fabDisplay !== "none") errs.push("desktop: FAB 应隐藏");

  if (results.tablet.cols !== "760px" && !/^[\d.]+px$/.test(results.tablet.cols)) {
    // single column often reports as one track
  }
  if (results.tablet.cols.includes("220px")) errs.push("tablet: 不应再是双栏");
  if (results.tablet.sheetPos !== "fixed") errs.push("tablet: 答题卡应为 fixed");
  if (results.tablet.fabDisplay === "none") errs.push("tablet: FAB 应显示");
  if (!results.tablet.drawer?.hasOpen) errs.push("tablet: 打开抽屉失败");
  if (results.tablet.drawer?.transform !== "none" && results.tablet.drawer?.transform !== "matrix(1, 0, 0, 1, 0, 0)") {
    errs.push("tablet: 打开后 transform 应为 none，实际 " + results.tablet.drawer?.transform);
  }
  if (results.tablet.drawer?.opacity !== "1") errs.push("tablet: 遮罩 opacity 应为 1");
  if (!results.tablet.drawer?.closedAfterPick) errs.push("tablet: 点题后应关闭抽屉");

  if (results.phone.sheetPos !== "fixed") errs.push("phone: 答题卡应为 fixed");
  if (results.phone.fabDisplay === "none") errs.push("phone: FAB 应显示");
  if (results.phone.optionH < 40) errs.push("phone: 选项热区偏小 " + results.phone.optionH);
  if (results.phone.btnH < 40) errs.push("phone: 按钮热区偏小 " + results.phone.btnH);
  if (!results.phone.drawer?.sheetVisible) errs.push("phone: 抽屉打开后不可见");
  if (!results.phone.drawer?.closedAfterPick) errs.push("phone: 点题后应关闭抽屉");

  console.log(JSON.stringify(results, null, 2));
  if (errs.length) {
    console.error("FAIL:\n" + errs.join("\n"));
    process.exit(1);
  }
  console.log("OK responsive-check");
  await browser.close();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
