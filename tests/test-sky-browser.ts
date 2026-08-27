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
    if (fs.existsSync(p)) {
      return p;
    }
  }
  throw new Error('No supported Chrome or Edge browser executable found on system.');
}

async function runSkyDiagnostics() {
  console.log('[SKY-TEST] Starting Vite dev server...');
  const server = await createServer({
    server: { port: 5173 }
  });
  await server.listen();
  const address = server.httpServer?.address();
  const port = typeof address === 'object' && address ? address.port : 5173;
  console.log(`[SKY-TEST] Vite server running at http://localhost:${port}`);

  const browserPath = getBrowserExecutable();
  console.log(`[SKY-TEST] Launching browser: ${browserPath}`);

  const browser = await puppeteer.launch({
    executablePath: browserPath,
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--enable-webgl',
      '--disable-features=WebGPU',
      '--use-gl=angle',
      '--ignore-gpu-blocklist',
      '--window-size=1280,800'
    ]
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  const consoleMessages: string[] = [];
  const consoleErrors: string[] = [];
  page.on('console', (msg) => {
    const text = msg.text();
    consoleMessages.push(`[${msg.type()}] ${text}`);
    if (msg.type() === 'error') {
      consoleErrors.push(text);
      console.error(`[BROWSER-ERROR] ${text}`);
    } else {
      console.log(`[BROWSER-${msg.type().toUpperCase()}] ${text}`);
    }
  });

  page.on('pageerror', (err) => {
    consoleErrors.push(err.toString());
    console.error(`[PAGE-ERROR] ${err.toString()}`);
  });

  try {
    console.log(`[SKY-TEST] Navigating to http://localhost:${port}...`);
    await page.goto(`http://localhost:${port}`, { waitUntil: 'networkidle0', timeout: 15000 });

    await page.waitForFunction(() => (window as any).__feather !== undefined, { timeout: 10000 });
    await page.evaluate(async () => {
      await (window as any).__feather.ready;
    });
    console.log('[SKY-TEST] Feather3D app ready!');

    // Wait a bit for initial frames
    await new Promise(r => setTimeout(r, 1000));

    // Test setting sky presets
    const presets = ['day', 'golden_hour', 'cherry', 'dusk', 'night', 'storm', 'off'];
    for (const preset of presets) {
      console.log(`[SKY-TEST] Testing preset: ${preset}...`);
      await page.evaluate(async (p) => {
        const feather = (window as any).__feather;
        feather.engine.environment.setSkyPreset(p, feather.engine.scene);
      }, preset);

      // Wait 1 second to render several frames
      await new Promise(r => setTimeout(r, 1000));
    }

    console.log('[SKY-TEST] Testing nature scenes...');
    const natureScenes = ['forest', 'temple_garden', 'sea_cliff', 'korean_bakery'];
    for (const sceneType of natureScenes) {
      console.log(`[SKY-TEST] Testing nature scene: ${sceneType}...`);
      await page.evaluate(async (st) => {
        const feather = (window as any).__feather;
        await feather.engine.loadNatureScene({ sceneType: st });
      }, sceneType);

      // Wait 1 second to render frames
      await new Promise(r => setTimeout(r, 1000));
    }

    console.log('[SKY-TEST] Diagnostic complete!');
  } catch (err: any) {
    console.error('[SKY-TEST] Test run error:', err);
  } finally {
    await browser.close();
    await server.close();
    console.log(`[SKY-TEST] Total errors encountered: ${consoleErrors.length}`);
  }
}

runSkyDiagnostics().catch(console.error);
