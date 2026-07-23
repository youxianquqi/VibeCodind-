const http = require("http");

function get(url, redirects = 0) {
  if (redirects > 5) return Promise.reject(new Error("too many redirects"));
  const full = url.startsWith("http") ? url : "http://localhost:5179" + url;
  return new Promise((res, rej) => {
    http
      .get(full, (r) => {
        const code = r.statusCode;
        if (code >= 300 && code < 400 && r.headers.location) {
          r.resume();
          const next = r.headers.location.startsWith("http")
            ? r.headers.location
            : "http://localhost:5179" + r.headers.location;
          get(next, redirects + 1).then(res, rej);
          return;
        }
        let d = "";
        r.on("data", (c) => (d += c));
        r.on("end", () => res({ status: code, body: d, url: full }));
      })
      .on("error", rej);
  });
}

(async () => {
  let failed = 0;
  const pages = [
    "/",
    "/index.html",
    "/exam.html",
    "/result.html",
    "/practice.html",
    "/bank/loader.js",
    "/bank/ai-usage.js",
    "/engine/draw.js",
    "/engine/scoring.js",
    "/engine/storage.js",
    "/engine/timer.js",
    "/engine/exam-app.js",
    "/shared/exam.css",
  ];
  for (const p of pages) {
    const r = await get(p);
    const ok = r.status === 200 && r.body.length > 0;
    console.log(ok ? "OK" : "FAIL", r.status, p, "->", r.url, "len=" + r.body.length);
    if (!ok) failed++;
  }

  const bank = await get("/bank/ai-usage.js");
  if (!bank.body.includes('registerExamBank("AI"')) {
    console.log("FAIL bank header");
    failed++;
  }
  const m = bank.body.match(/"stem": "([^"]+)/);
  console.log("OK bank utf8:", m ? m[1].slice(0, 40) : "(none)");

  const exam = await get("/exam.html");
  const order = [
    "bank/loader.js",
    "bank/ai-usage.js",
    "engine/storage.js",
    "engine/scoring.js",
    "engine/timer.js",
    "engine/draw.js",
    "engine/exam-app.js",
  ];
  let last = -1;
  for (const f of order) {
    const i = exam.body.indexOf(f);
    if (i < 0 || i < last) {
      console.log("FAIL script order", f, i);
      failed++;
    } else {
      console.log("OK script", f);
    }
    last = i;
  }

  console.log(failed ? failed + " failed" : "HTTP checks passed");
  process.exit(failed ? 1 : 0);
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
