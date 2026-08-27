import { Engine, ToolType } from './Engine';

export class KeyboardShortcuts {
  private engine: Engine;
  private lastSpaceTime: number = 0;
  private lastTabTime: number = 0;

  constructor(engine: Engine) {
    this.engine = engine;
    this.bindEvents();
  }

  private bindEvents(): void {
    window.addEventListener('keydown', (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT')) {
        return;
      }

      const isCmdOrCtrl = e.metaKey || e.ctrlKey;
      const isShift = e.shiftKey;
      const isAlt = e.altKey;

      // ── Tool Initialization (B, E, W/V, I, U, Shift+X) ──
      if (!isCmdOrCtrl) {
        // B: Toggle Draw / Draw Shape
        if (e.key === 'b' || e.key === 'B') {
          if (this.engine.activeTool === 'draw') {
            this.engine.shapeAssistEnabled = !this.engine.shapeAssistEnabled;
          } else {
            this.engine.setTool('draw');
          }
          return;
        }

        // E: Toggle Erase / Vacuum
        if (e.key === 'e' || e.key === 'E') {
          if (this.engine.activeTool === 'erase') {
            this.engine.eraserTool.toggleMode();
          } else {
            this.engine.setTool('erase');
          }
          return;
        }

        // W or V: Toggle Selection
        if (e.key === 'w' || e.key === 'W' || (e.key === 'v' || e.key === 'V' && !isCmdOrCtrl)) {
          this.engine.setTool(this.engine.activeTool === 'select' ? 'draw' : 'select');
          return;
        }

        // Shift + X: Toggle Mirror
        if (isShift && (e.key === 'x' || e.key === 'X')) {
          const axes = ['none', 'x', 'y', 'z'] as const;
          const curIdx = axes.indexOf(this.engine.symmetryManager.axis as any);
          const nextAxis = axes[(curIdx + 1) % axes.length];
          this.engine.symmetryManager.setAxis(nextAxis);
          return;
        }

        // I: Activate Injector
        if (e.key === 'i' || e.key === 'I') {
          this.engine.setTool('inject');
          return;
        }

        // U: Hide UI Toggle
        if (e.key === 'u' || e.key === 'U') {
          if (this.engine.onToggleHideUI) {
            this.engine.onToggleHideUI();
          }
          return;
        }

        // H or ?: Open Tutorial & Guide
        if (e.key === 'h' || e.key === 'H' || e.key === '?') {
          if (this.engine.onOpenTutorial) {
            this.engine.onOpenTutorial('vertical');
          }
          return;
        }

        // D / F: Zoom / Pan View
        if (e.key === 'd' || e.key === 'D') {
          this.engine.viewport.zoom(1.1);
          return;
        }
        if (e.key === 'f' || e.key === 'F') {
          this.engine.viewport.pan(10, 0);
          return;
        }

        // Spacebar: Navigate / double Spacebar: Perfect View Snap
        if (e.code === 'Space') {
          e.preventDefault();
          const now = Date.now();
          if (now - this.lastSpaceTime < 350) {
            this.engine.viewport.snapToNearestPerfectView();
            this.lastSpaceTime = 0;
          } else {
            this.lastSpaceTime = now;
            this.engine.setTool(this.engine.activeTool === 'navigate' ? 'draw' : 'navigate');
          }
          return;
        }

        // Tab x2: Switch Projection View
        if (e.key === 'Tab') {
          e.preventDefault();
          const now = Date.now();
          if (now - this.lastTabTime < 350) {
            this.engine.viewport.toggleProjection();
            this.lastTabTime = 0;
          } else {
            this.lastTabTime = now;
          }
          return;
        }

        // [ and ]: Brush Radius Adjust (Alt: +/-1, Shift: +/-10)
        if (e.key === '[' || e.key === ']') {
          const step = isShift ? 0.02 : (isAlt ? 0.002 : 0.008);
          const delta = e.key === ']' ? step : -step;
          this.engine.brushEngine.setSize(Math.max(0.001, this.engine.brushEngine.size + delta));
          return;
        }

        // - and =: Opacity Adjust (Alt: +/-1, Shift: +/-10)
        if (e.key === '-' || e.key === '=') {
          const step = isShift ? 0.1 : (isAlt ? 0.01 : 0.05);
          const delta = e.key === '=' ? step : -step;
          this.engine.brushEngine.setOpacity(Math.max(0.05, Math.min(1.0, this.engine.brushEngine.opacity + delta)));
          return;
        }

        // Numeric Tool Shortcuts (1 - 7)
        if (e.key === '1') { this.engine.setTool('draw'); return; }
        if (e.key === '2') { this.engine.setTool('erase'); return; }
        if (e.key === '3') { this.engine.setTool('select'); return; }
        if (e.key === '4') { this.engine.setTool('loft'); return; }
        if (e.key === '5') { this.engine.setTool('liquify'); return; }
        if (e.key === '6') { this.engine.setTool('inject'); return; }
        if (e.key === '7') { this.engine.setTool('transform'); return; }

        // Delete / Backspace
        if (e.key === 'Delete' || e.key === 'Backspace') {
          e.preventDefault();
          this.engine.deleteSelectedCurves();
          return;
        }

        // Escape: Clear selection
        if (e.key === 'Escape') {
          this.engine.selectionTool.clearSelection();
          return;
        }
      }

      // ── Command / Ctrl Shortcuts ──
      if (isCmdOrCtrl) {
        // Undo: Ctrl+Z
        if ((e.key === 'z' || e.key === 'Z') && !isShift) {
          e.preventDefault();
          this.engine.historyManager.undo();
          return;
        }

        // Redo: Ctrl+Y or Ctrl+Shift+Z
        if (e.key === 'y' || e.key === 'Y' || ((e.key === 'z' || e.key === 'Z') && isShift)) {
          e.preventDefault();
          this.engine.historyManager.redo();
          return;
        }

        // Shift + Cmd + D: Duplicate Symmetrically (by View)
        if (isShift && (e.key === 'd' || e.key === 'D')) {
          e.preventDefault();
          this.engine.selectionTool.duplicateSymmetric('view', this.engine.viewport.camera);
          return;
        }

        // Duplicate: Ctrl+D
        if (e.key === 'd' || e.key === 'D') {
          e.preventDefault();
          this.engine.selectionTool.duplicateSelected();
          return;
        }

        // Select All: Ctrl+A
        if (e.key === 'a' || e.key === 'A') {
          e.preventDefault();
          this.engine.selectionTool.selectAll();
          return;
        }

        // Copy: Ctrl+C
        if (e.key === 'c' || e.key === 'C') {
          e.preventDefault();
          this.engine.copySelectedCurves();
          return;
        }

        // Paste: Ctrl+V
        if (e.key === 'v' || e.key === 'V') {
          e.preventDefault();
          this.engine.pasteCurves();
          return;
        }
      }

      // Shift + Alt + D: Duplicate Symmetrically (by Mirror)
      if (isShift && isAlt && (e.key === 'd' || e.key === 'D')) {
        e.preventDefault();
        this.engine.selectionTool.duplicateSymmetric('mirror');
        return;
      }
    });
  }
}
