import puppeteer from 'puppeteer-core';
import { createServer } from 'vite';
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
    if (fs.existsSync(p)) return p;
  }
  throw new Error('No supported browser executable found.');
}

async function runFullInteractiveTest() {
  console.log('[INTERACTIVE-TEST] Starting Vite dev server...');
  const server = await createServer({ server: { port: 5174 } });
  await server.listen();
  const port = 5174;
  console.log(`[INTERACTIVE-TEST] Vite server running at http://localhost:${port}`);

  const browserPath = getBrowserExecutable();
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

  const errors: string[] = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      errors.push(`[CONSOLE_ERROR] ${msg.text()}`);
      console.error(`[BROWSER-CONSOLE-ERROR] ${msg.text()}`);
    }
  });

  page.on('pageerror', (err) => {
    errors.push(`[PAGE_ERROR] ${err.toString()}`);
    console.error(`[BROWSER-PAGE-ERROR] ${err.toString()}`);
  });

  try {
    await page.goto(`http://localhost:${port}`, { waitUntil: 'networkidle0', timeout: 15000 });
    await page.waitForFunction(() => (window as any).__feather !== undefined, { timeout: 10000 });
    await page.evaluate(async () => {
      await (window as any).__feather.ready;
    });

    console.log('[INTERACTIVE-TEST] App ready.');

    // 1. Open Stage Panel and switch to Environment tab
    console.log('[INTERACTIVE-TEST] Testing Stage Panel UI interaction...');
    await page.evaluate(() => {
      const feather = (window as any).__feather;
      feather.uiManager.stagePanel.show();
      const envTab = document.querySelector('#tab-env') as HTMLElement;
      envTab?.click();
    });
    await new Promise(r => setTimeout(r, 500));

    // 2. Click each Sky button in Stage Panel
    const skyBtns = ['day', 'golden_hour', 'cherry', 'dusk', 'night', 'storm', 'off'];
    for (const sky of skyBtns) {
      console.log(`[INTERACTIVE-TEST] Clicking sky button: ${sky}...`);
      await page.evaluate((s) => {
        const btn = document.querySelector(`.sky-btn[data-sky="${s}"]`) as HTMLElement;
        if (btn) btn.click();
        else throw new Error(`Sky button for ${s} not found in DOM`);
      }, sky);
      await new Promise(r => setTimeout(r, 600));
    }

    // 3. Click each Nature Scene button in Stage Panel
    const sceneBtnIds = ['#btn-nature-forest', '#btn-nature-temple', '#btn-nature-cliff', '#btn-nature-bakery'];
    for (const id of sceneBtnIds) {
      console.log(`[INTERACTIVE-TEST] Clicking nature scene button: ${id}...`);
      await page.evaluate(async (btnId) => {
        const btn = document.querySelector(btnId) as HTMLElement;
        if (btn) btn.click();
        else console.warn(`Button ${btnId} not found in DOM`);
      }, id);
      await new Promise(r => setTimeout(r, 1200));
    }

    // 4. Test drawing strokes while sky is active
    console.log('[INTERACTIVE-TEST] Testing stroke drawing with sky active...');
    await page.evaluate(() => {
      const feather = (window as any).__feather;
      feather.engine.environment.setSkyPreset('day', feather.engine.scene);
    });
    await new Promise(r => setTimeout(r, 300));

    // Simulate pointer stroke
    const canvasRect = await page.evaluate(() => {
      const canvas = document.querySelector('canvas');
      if (!canvas) return null;
      const r = canvas.getBoundingClientRect();
      return { x: r.x, y: r.y, width: r.width, height: r.height };
    });

    if (canvasRect) {
      const startX = canvasRect.x + canvasRect.width * 0.4;
      const startY = canvasRect.y + canvasRect.height * 0.4;
      await page.mouse.move(startX, startY);
      await page.mouse.down();
      for (let i = 0; i < 10; i++) {
        await page.mouse.move(startX + i * 15, startY + Math.sin(i) * 20);
        await new Promise(r => setTimeout(r, 20));
      }
      await page.mouse.up();
      console.log('[INTERACTIVE-TEST] Stroke drawn successfully.');
    }

    // 5. Test switching camera views and orthographic mode
    console.log('[INTERACTIVE-TEST] Testing camera view transitions...');
    const views = ['front', 'back', 'left', 'right', 'top', 'bottom', 'iso'];
    for (const v of views) {
      await page.evaluate((viewPreset) => {
        const feather = (window as any).__feather;
        feather.engine.viewport.setViewPreset(viewPreset as any);
      }, v);
      await new Promise(r => setTimeout(r, 300));
    }

    // Toggle orthographic
    await page.evaluate(() => {
      const feather = (window as any).__feather;
      feather.engine.viewport.toggleProjection();
    });
    await new Promise(r => setTimeout(r, 500));
    await page.evaluate(() => {
      const feather = (window as any).__feather;
      feather.engine.viewport.toggleProjection();
    });
    await new Promise(r => setTimeout(r, 500));

    // 6. Test New Sketch
    console.log('[INTERACTIVE-TEST] Testing new sketch...');
    await page.evaluate(() => {
      const feather = (window as any).__feather;
      feather.engine.newSketch();
    });
    await new Promise(r => setTimeout(r, 500));

    // 7. Re-enable sky after new sketch
    console.log('[INTERACTIVE-TEST] Re-enabling sky after new sketch...');
    await page.evaluate(() => {
      const feather = (window as any).__feather;
      feather.engine.environment.setSkyPreset('golden_hour', feather.engine.scene);
    });
    await new Promise(r => setTimeout(r, 800));

    console.log('[INTERACTIVE-TEST] Interactive tests finished.');
  } catch (err) {
    console.error('[INTERACTIVE-TEST] Error:', err);
    errors.push(`[TEST_ERR] ${err}`);
  } finally {
    await browser.close();
    await server.close();
    console.log(`[INTERACTIVE-TEST] Completed with ${errors.length} errors:`, errors);
  }
}

runFullInteractiveTest().catch(console.error);
