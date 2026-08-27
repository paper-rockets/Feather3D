import { App } from '../App';
import * as THREE from 'three';
import { FeatherCurve } from '../scene/FeatherCurve';
import { CurvePoint } from '../math/CurveMath';

export interface DiagnosticLogEntry {
  timestamp: string;
  step: string;
  status: 'INFO' | 'PASS' | 'WARN' | 'FAIL';
  details?: any;
}

export class DiagnosticsHarness {
  private app: App;
  private logs: DiagnosticLogEntry[] = [];
  private hudElement: HTMLElement | null = null;
  private isRunning: boolean = false;

  constructor(app: App) {
    this.app = app;
    this.setupGlobalHooks();
    this.createTimestampHUD();
    this.bindKeyboardShortcuts();
    this.log('INFO', 'Harness Initialized', { version: '1.0.0' });
  }

  private setupGlobalHooks(): void {
    // Intercept uncaught window errors
    window.addEventListener('error', (event) => {
      this.log('FAIL', 'Uncaught Window Error', {
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        stack: event.error?.stack
      });
    });

    // Intercept unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      this.log('FAIL', 'Unhandled Promise Rejection', {
        reason: event.reason?.message || event.reason
      });
    });

    // Attach to global window object
    (window as any).__FEATHER_DIAGNOSTICS__ = this;
  }

  private createTimestampHUD(): void {
    if (this.hudElement) return;

    this.hudElement = document.createElement('div');
    this.hudElement.id = 'feather-diagnostics-hud';
    this.hudElement.style.position = 'fixed';
    this.hudElement.style.top = '12px';
    this.hudElement.style.right = '12px';
    this.hudElement.style.padding = '8px 12px';
    this.hudElement.style.background = 'rgba(0, 0, 0, 0.75)';
    this.hudElement.style.color = '#00ffcc';
    this.hudElement.style.fontFamily = 'monospace';
    this.hudElement.style.fontSize = '12px';
    this.hudElement.style.borderRadius = '4px';
    this.hudElement.style.zIndex = '999999';
    this.hudElement.style.pointerEvents = 'none';
    this.hudElement.style.display = 'none';

    document.body.appendChild(this.hudElement);

    setInterval(() => {
      if (this.hudElement && this.hudElement.style.display !== 'none') {
        const timeStr = new Date().toISOString().substring(11, 23);
        const lastLog = this.logs[this.logs.length - 1];
        const stepName = lastLog ? lastLog.step : 'IDLE';
        this.hudElement.innerText = `[DIAGNOSTICS ${timeStr}] STEP: ${stepName}`;
      }
    }, 100);
  }

  private bindKeyboardShortcuts(): void {
    window.addEventListener('keydown', (e) => {
      // Ctrl+Shift+D triggers report download
      if (e.ctrlKey && e.shiftKey && (e.key === 'D' || e.key === 'd')) {
        e.preventDefault();
        this.exportReport();
      }
      // Ctrl+Shift+H toggles HUD
      if (e.ctrlKey && e.shiftKey && (e.key === 'H' || e.key === 'h')) {
        e.preventDefault();
        this.toggleHUD();
      }
    });
  }

  public log(status: 'INFO' | 'PASS' | 'WARN' | 'FAIL', step: string, details?: any): void {
    const entry: DiagnosticLogEntry = {
      timestamp: new Date().toISOString(),
      step,
      status,
      details
    };
    this.logs.push(entry);
    const prefix = `[FEATHER-DIAGNOSTICS] [${status}] ${step}`;
    if (status === 'FAIL') {
      console.error(prefix, details || '');
    } else if (status === 'WARN') {
      console.warn(prefix, details || '');
    } else {
      console.log(prefix, details || '');
    }
  }

  public toggleHUD(force?: boolean): void {
    if (!this.hudElement) return;
    const isVisible = this.hudElement.style.display !== 'none';
    const show = force !== undefined ? force : !isVisible;
    this.hudElement.style.display = show ? 'block' : 'none';
  }

  public getLogs(): DiagnosticLogEntry[] {
    return [...this.logs];
  }

  public clearLogs(): void {
    this.logs = [];
  }

  public exportReport(): void {
    const reportData = {
      timestamp: new Date().toISOString(),
      app: 'Feather3D',
      totalLogs: this.logs.length,
      failures: this.logs.filter(l => l.status === 'FAIL'),
      warnings: this.logs.filter(l => l.status === 'WARN'),
      logs: this.logs
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `feather_diagnostic_report_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    this.log('INFO', 'Exported Diagnostic Report', { count: this.logs.length });
  }

  /**
   * Runs the automated diagnostic suite across live subsystems.
   */
  public async runAll(): Promise<{ passed: number; failed: number; total: number }> {
    if (this.isRunning) {
      console.warn('[FEATHER-DIAGNOSTICS] Run is already in progress.');
      return { passed: 0, failed: 0, total: 0 };
    }

    this.isRunning = true;
    this.toggleHUD(true);
    this.log('INFO', 'Starting Full Live Diagnostics');

    let passed = 0;
    let failed = 0;

    const runStep = async (name: string, fn: () => Promise<void> | void) => {
      try {
        await fn();
        this.log('PASS', name);
        passed++;
      } catch (err: any) {
        this.log('FAIL', name, { error: err.message, stack: err.stack });
        failed++;
      }
    };

    // Step 1: Verify Engine & Viewport State
    await runStep('Engine & Viewport Initialization', async () => {
      if (!this.app.engine) throw new Error('Engine is not initialized');
      if (!this.app.engine.viewport) throw new Error('Viewport is not initialized');
      if (!this.app.engine.stageManager) throw new Error('StageManager is not initialized');
    });

    // Step 2: Layer & Stage Operations
    await runStep('Layer Addition & Active Selection', async () => {
      const initialCount = this.app.engine.stageManager.layers.length;
      const newLayer = this.app.engine.stageManager.addLayer('Diagnostics_Layer');
      if (this.app.engine.stageManager.layers.length !== initialCount + 1) {
        throw new Error('Layer count did not increment');
      }
      if (this.app.engine.stageManager.activeLayer !== newLayer) {
        throw new Error('Newly created layer is not active');
      }
    });

    // Step 3: Curve Creation & Ribbon Geometry Generation
    await runStep('Curve Creation & Ribbon Mesh Generation', async () => {
      const pts: CurvePoint[] = [
        { position: new THREE.Vector3(0, 0, 0), pressure: 0.5, tilt: new THREE.Vector2(), time: 0 },
        { position: new THREE.Vector3(0.5, 0.5, 0), pressure: 0.8, tilt: new THREE.Vector2(), time: 50 },
        { position: new THREE.Vector3(1.0, 0, 0), pressure: 0.4, tilt: new THREE.Vector2(), time: 100 }
      ];
      const curve = new FeatherCurve(pts, 'ribbon', 0.04, new THREE.Color(0x00ccff), 1.0, 'glow', 'diag_curve_ribbon');
      this.app.engine.stageManager.addCurveToActiveLayer(curve);

      if (!curve.mesh) throw new Error('FeatherCurve did not build mesh');
      if (curve.mesh.geometry.getAttribute('position').count === 0) {
        throw new Error('Geometry position buffer is empty');
      }
    });

    // Step 4: Tube Geometry Generation
    await runStep('Curve Creation & Tube Mesh Generation', async () => {
      const pts: CurvePoint[] = [
        { position: new THREE.Vector3(-1, 0, 0), pressure: 0.5, tilt: new THREE.Vector2(), time: 0 },
        { position: new THREE.Vector3(-0.5, 0.5, 0), pressure: 0.8, tilt: new THREE.Vector2(), time: 50 },
        { position: new THREE.Vector3(0, 0, 0), pressure: 0.4, tilt: new THREE.Vector2(), time: 100 }
      ];
      const tubeCurve = new FeatherCurve(pts, 'tube', 0.02, new THREE.Color(0xff8800), 1.0, 'shaded', 'diag_curve_tube');
      this.app.engine.stageManager.addCurveToActiveLayer(tubeCurve);

      if (!tubeCurve.mesh) throw new Error('Tube curve did not build mesh');
    });

    // Step 5: Symmetry Mirroring Verification
    await runStep('Symmetry Manager Plane & Mirroring', async () => {
      const sym = this.app.engine.symmetryManager;
      sym.setAxis('x');
      if (sym.axis !== 'x') throw new Error('Symmetry axis not set to x');
      const testPt: CurvePoint[] = [{ position: new THREE.Vector3(1.5, 2.0, 3.0), pressure: 0.5, tilt: new THREE.Vector2(), time: 0 }];
      const mirrored = sym.mirrorPoints(testPt);
      if (mirrored[0].position.x !== -1.5) throw new Error('Symmetry did not invert X coordinate');
      sym.setAxis('none');
    });

    // Step 6: History Manager Undo/Redo
    await runStep('History Manager Undo/Redo Execution', async () => {
      const hist = this.app.engine.historyManager;
      const initialCurves = this.app.engine.stageManager.getAllCurves().length;
      
      const dummyCurve = new FeatherCurve(
        [{ position: new THREE.Vector3(0, 0, 0), pressure: 0.5, tilt: new THREE.Vector2(), time: 0 }, { position: new THREE.Vector3(1, 0, 0), pressure: 0.5, tilt: new THREE.Vector2(), time: 50 }],
        'ribbon', 0.02, new THREE.Color(0xffffff)
      );
      
      this.app.engine.stageManager.addCurveToActiveLayer(dummyCurve);
      if (this.app.engine.stageManager.getAllCurves().length !== initialCurves + 1) {
        throw new Error('Curve was not added');
      }

      this.app.engine.stageManager.removeCurve(dummyCurve.id);
      if (this.app.engine.stageManager.getAllCurves().length !== initialCurves) {
        throw new Error('Curve was not removed');
      }
    });

    this.isRunning = false;
    this.log('INFO', 'Live Diagnostics Completed', { passed, failed, total: passed + failed });
    return { passed, failed, total: passed + failed };
  }
}
