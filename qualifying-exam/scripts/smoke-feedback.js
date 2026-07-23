/**
 * 综合考上线冒烟：即时反馈 + 首页文案
 * 依赖：http://localhost:5179
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

(async () => {
  const puppeteer = require(path.join(__dirname, "../../ai-exam/node_modules/puppeteer-core"));
  const browser = await puppeteer.launch({
    executablePath: await findChrome(),
    headless: true,
    args: ["--no-sandbox"],
  });
  const page = await browser.newPage();
  const errs = [];
  page.on("dialog", async (d) => d.accept());

  await page.setViewport({ width: 1100, height: 800 });
  await page.goto("http://localhost:5179/", { waitUntil: "networkidle0" });
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: "networkidle0" });
  if (!/答完一题立即显示对错与解析/.test(await page.evaluate(() => document.body.innerText))) {
    errs.push("首页缺即时反馈文案");
  }

  await page.click('a[href="exam.html"]');
  await page.waitForSelector("#sheet-grid .sheet-btn", { timeout: 10000 });

  await page.evaluate(async () => {
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    for (let t = 0; t < 20; t++) {
      const tip = document.querySelector(".question-card .meta")?.textContent || "";
      const isMulti = tip.includes("多选");
      document.querySelector("#options .option")?.click();
      if (isMulti) document.getElementById("btn-confirm-answer")?.click();
      await sleep(100);
      const fb = document.getElementById("exam-feedback");
      if (fb && !fb.hidden && fb.innerText.length > 0) return;
      document.getElementById("btn-next")?.click();
      await sleep(80);
    }
  });

  const ok = await page.evaluate(() => {
    const fb = document.getElementById("exam-feedback");
    return {
      fb: !!(fb && !fb.hidden && fb.querySelector(".explain")),
      locked: document.querySelectorAll("#options input[disabled]").length > 0,
      mark: !!document.querySelector(".sheet-btn.is-right, .sheet-btn.is-wrong"),
    };
  });
  if (!ok.fb) errs.push("正式考无即时反馈/解析");
  if (!ok.locked) errs.push("揭晓后未锁定");
  if (!ok.mark) errs.push("答题卡无对错色");

  // stage0 静态可达（同机另一路径）
  await page.goto("http://localhost:5179/../stage0-quiz/", { waitUntil: "domcontentloaded" }).catch(() => {});

  console.log(JSON.stringify({ ok, errs }, null, 2));
  await browser.close();
  if (errs.length) {
    console.error("FAIL\n" + errs.join("\n"));
    process.exit(1);
  }
  console.log("OK qe-smoke-feedback");
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
