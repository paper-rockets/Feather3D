import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const CHROME_PATHS = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe'
];

function getBrowserExecutable(): string {
  for (const p of CHROME_PATHS) {
    if (fs.existsSync(p)) {
      return p;
    }
  }
  throw new Error('No supported Chrome or Edge browser executable found on system.');
}

async function runHeadlessDiagnostics() {
  const rootDir = path.resolve(__dirname, '..');
  const resultsDir = path.join(rootDir, 'test-results');
  const screenshotsDir = path.join(resultsDir, 'screenshots');

  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  const browserPath = getBrowserExecutable();
  console.log(`[HEADLESS-RUNNER] Using browser binary: ${browserPath}`);

  const browser = await puppeteer.launch({
    executablePath: browserPath,
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--enable-webgl',
      '--use-gl=angle',
      '--ignore-gpu-blocklist',
      '--window-size=1280,800'
    ]
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  const consoleErrors: string[] = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
      console.error(`[BROWSER-CONSOLE-ERROR] ${msg.text()}`);
    }
  });

  page.on('pageerror', (err) => {
    consoleErrors.push(err.toString());
    console.error(`[BROWSER-PAGE-ERROR] ${err.toString()}`);
  });

  const targetUrl = process.env.APP_URL || 'http://localhost:3000';
  console.log(`[HEADLESS-RUNNER] Connecting to ${targetUrl}...`);

  try {
    await page.goto(targetUrl, { waitUntil: 'networkidle0', timeout: 15000 });
  } catch (err: any) {
    console.error(`[HEADLESS-RUNNER] Failed to load ${targetUrl}. Is Vite dev server running?`);
    await browser.close();
    process.exit(1);
  }

  // 1. Snapshot Initial Load
  const initialScreenshot = path.join(screenshotsDir, '01_initial_canvas.png');
  await page.screenshot({ path: initialScreenshot });
  console.log(`[HEADLESS-RUNNER] Saved initial screenshot: ${initialScreenshot}`);

  // 2. Execute Diagnostics Harness inside browser
  console.log('[HEADLESS-RUNNER] Executing in-browser function diagnostics...');
  const result = await page.evaluate(async () => {
    const diag = (window as any).__FEATHER_DIAGNOSTICS__;
    if (!diag) {
      throw new Error('DiagnosticsHarness (__FEATHER_DIAGNOSTICS__) not found on window object.');
    }
    return await diag.runAll();
  });

  // 3. Snapshot Completed State
  const completedScreenshot = path.join(screenshotsDir, '02_diagnostics_completed.png');
  await page.screenshot({ path: completedScreenshot });
  console.log(`[HEADLESS-RUNNER] Saved completion screenshot: ${completedScreenshot}`);

  // 4. Extract Full Diagnostic Logs
  const logs = await page.evaluate(() => {
    const diag = (window as any).__FEATHER_DIAGNOSTICS__;
    return diag ? diag.getLogs() : [];
  });

  const report = {
    timestamp: new Date().toISOString(),
    summary: result,
    consoleErrors,
    logs
  };

  const reportPath = path.join(resultsDir, 'report.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  console.log(`[HEADLESS-RUNNER] Diagnostic Report written to: ${reportPath}`);

  await browser.close();

  if (result.failed > 0 || consoleErrors.length > 0) {
    console.error(`[HEADLESS-RUNNER] Completed with ${result.failed} function failures and ${consoleErrors.length} console errors.`);
    process.exit(1);
  } else {
    console.log(`[HEADLESS-RUNNER] All ${result.passed} functions executed and verified successfully.`);
  }
}

runHeadlessDiagnostics().catch((err) => {
  console.error('[HEADLESS-RUNNER] Execution error:', err);
  process.exit(1);
});
