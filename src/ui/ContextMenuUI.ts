import { Engine, ToolType } from '../core/Engine';

/**
 * ContextMenuUI: Bottom-center floating contextual dock for active tool modifiers.
 * 100% clean plain text with zero emojis or decorative glyphs.
 */
export class ContextMenuUI {
  public element: HTMLElement;
  private engine: Engine;
  public onBrushNameClick?: () => void;
  public onSizeClick?: (anchorY: number) => void;
  public onOpacityClick?: (anchorY: number) => void;
  public onColorClick?: () => void;

  constructor(engine: Engine) {
    this.engine = engine;
    this.element = document.createElement('div');
    this.element.id = 'bottom-context-menu';
    this.element.className = 'bottom-context-dock';

    this.render();
    this.bindEvents();
    document.body.appendChild(this.element);
  }

  public refresh(): void {
    this.render();
    this.bindEvents();
  }

  public hide(): void {
    this.element.innerHTML = '';
  }

  public render(): void {
    const tool = this.engine.activeTool;

    if (tool === 'draw' || tool === 'inject') {
      const brush = this.engine.brushEngine;
      const presetName = brush.activePreset?.name || 'BRUSH';
      const sizeVal = Math.round((brush.size / 2.0) * 1000);
      const opVal = Math.round(brush.opacity * 100);
      const colorHex = `#${brush.color.getHexString()}`;
      const guideMode = this.engine.guideManager.mode;
      let planeName = 'FLOOR';
      if (guideMode === 'primitive') planeName = 'GUIDE';
      else if (guideMode === 'mesh') planeName = 'MESH';
      else if (guideMode === 'plane') {
        const n = this.engine.guideManager.planeGuide.normal;
        const tilt = Math.round(Math.acos(Math.min(1, Math.abs(n.y))) * 180 / Math.PI);
        if (tilt < 5) planeName = 'FLOOR';
        else if (Math.abs(n.z) > Math.abs(n.x)) planeName = `WALL ${tilt} DEG`;
        else planeName = `SIDE ${tilt} DEG`;
      }


      this.element.innerHTML = `
        <div class="context-pill status-strip">
          <div class="status-chip status-chip-btn" id="ctx-brush-name" title="Tap to open brush library">
            <span class="status-swatch" style="background:${colorHex};"></span>
            <span class="status-text">${presetName.toUpperCase()}</span>
          </div>
          <span class="status-sep"></span>
          <div class="status-chip">
            <span class="status-text status-plane-label">${planeName}</span>
          </div>
          <span class="status-sep"></span>
          <div class="status-chip status-chip-btn" id="ctx-size-chip" title="Tap to adjust size">
            <span class="status-text">SIZE ${sizeVal}MM</span>
          </div>
          <span class="status-sep"></span>
          <div class="status-chip status-chip-btn" id="ctx-op-chip" title="Tap to adjust opacity">
            <span class="status-text">OP ${opVal}%</span>
          </div>
        </div>
      `;
    } else if (tool === 'select' || tool === 'transform') {
      this.element.innerHTML = `
        <div class="ipad-context-card">
          <div class="ipad-ctx-tabs">
            <button class="ipad-ctx-tab active" id="ctx-tab-xform">TRANSFORM</button>
            <button class="ipad-ctx-tab" id="ctx-tab-liq">LIQUIFY</button>
          </div>
          <div class="ipad-ctx-actions">
            <button class="ipad-action-btn" id="ctx-snap-btn">SNAP</button>
            <button class="ipad-action-btn" id="ctx-dup-btn">DUPLICATE</button>
            <button class="ipad-action-btn" id="ctx-mirror-btn">MIRROR</button>
            <button class="ipad-action-btn" id="ctx-flip-btn">FLIP</button>
            <button class="ipad-action-btn btn-danger-action" id="ctx-delete-btn">DELETE</button>
          </div>
        </div>
      `;
    } else if (tool === 'liquify') {
      this.element.innerHTML = `
        <div class="ipad-context-card">
          <div class="ipad-ctx-tabs">
            <button class="ipad-ctx-tab" id="ctx-tab-xform">TRANSFORM</button>
            <button class="ipad-ctx-tab active" id="ctx-tab-liq">LIQUIFY</button>
          </div>
          <div class="ipad-ctx-actions">
            <button class="ipad-action-btn" id="ctx-reset-liq">RESET</button>
            <button class="ipad-action-btn" id="ctx-flip-liq">FLIP</button>
            <button class="ipad-action-btn" id="ctx-apply-liq">APPLY</button>
            <button class="ipad-action-btn btn-danger-action" id="ctx-delete-btn">DELETE</button>
          </div>
        </div>
      `;
    } else if (tool === 'loft') {
      this.element.innerHTML = `
        <div class="context-pill">
          <span style="font-size: 10px; font-weight: 700; white-space: nowrap; letter-spacing: 0.05em;">LOFT TENSION</span>
          <input id="ctx-loft-tension" type="range" min="0" max="100" value="50" class="prop-range-slider" style="width: 90px;">
          <button id="ctx-loft-apply" class="btn btn-sm active">BRIDGE</button>
          <button id="ctx-loft-cancel" class="btn btn-sm">CANCEL</button>
        </div>
      `;
    } else if (tool === 'erase') {
      const mode = this.engine.eraserTool.mode;
      this.element.innerHTML = `
        <div class="context-pill">
          <button id="ctx-erase-mode" class="btn btn-sm active">${mode === 'vacuum' ? 'VACUUM' : 'POINT'}</button>
          <div style="display: flex; align-items: center; gap: 6px; padding: 0 4px;">
            <span style="font-size: 9px; font-weight: 700; color: var(--mut); letter-spacing: 0.05em;">RADIUS</span>
            <input id="ctx-erase-radius" type="range" min="2" max="50" value="10" class="prop-range-slider" style="width: 60px;">
          </div>
        </div>
      `;
    } else {
      this.element.innerHTML = '';
    }
  }

  private bindEvents(): void {
    const tool = this.engine.activeTool;

    if (tool === 'draw' || tool === 'inject') {
      this.element.querySelector('#ctx-brush-name')?.addEventListener('click', () => {
        if (this.onBrushNameClick) this.onBrushNameClick();
      });
      this.element.querySelector('#ctx-size-chip')?.addEventListener('click', (e) => {
        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
        if (this.onSizeClick) this.onSizeClick(rect.top);
      });
      this.element.querySelector('#ctx-op-chip')?.addEventListener('click', (e) => {
        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
        if (this.onOpacityClick) this.onOpacityClick(rect.top);
      });
      this.element.querySelector('#ctx-brush-name .status-swatch')?.addEventListener('click', (e) => {
        e.stopPropagation();
        if (this.onColorClick) this.onColorClick();
      });
    } else if (tool === 'select' || tool === 'transform') {
      this.element.querySelector('#ctx-tab-liq')?.addEventListener('click', () => {
        this.engine.setTool('liquify');
      });

      this.element.querySelector('#ctx-tab-xform')?.addEventListener('click', () => {
        this.engine.setTool('transform');
      });

      this.element.querySelector('#ctx-snap-btn')?.addEventListener('click', () => {
        this.engine.snapActiveLayerToGround();
      });

      this.element.querySelector('#ctx-dup-btn')?.addEventListener('click', () => {
        this.engine.selectionTool.duplicateSymmetric('view', this.engine.viewport.camera);
      });

      this.element.querySelector('#ctx-mirror-btn')?.addEventListener('click', () => {
        this.engine.selectionTool.duplicateSymmetric('mirror');
      });

      this.element.querySelector('#ctx-flip-btn')?.addEventListener('click', () => {
        this.engine.selectionTool.duplicateSymmetric('mirror');
      });

      this.element.querySelector('#ctx-delete-btn')?.addEventListener('click', () => {
        this.engine.deleteSelectedCurves();
      });
    } else if (tool === 'liquify') {
      this.element.querySelector('#ctx-tab-xform')?.addEventListener('click', () => {
        this.engine.setTool('transform');
      });

      this.element.querySelector('#ctx-apply-liq')?.addEventListener('click', () => {
        this.engine.setTool('select');
      });

      this.element.querySelector('#ctx-reset-liq')?.addEventListener('click', () => {
        this.engine.selectionTool.clearSelection();
      });

      this.element.querySelector('#ctx-flip-liq')?.addEventListener('click', () => {
        this.engine.selectionTool.duplicateSymmetric('mirror');
      });

      this.element.querySelector('#ctx-delete-btn')?.addEventListener('click', () => {
        this.engine.deleteSelectedCurves();
      });
    } else if (tool === 'loft') {
      const tensionSlider = this.element.querySelector('#ctx-loft-tension') as HTMLInputElement;
      tensionSlider?.addEventListener('input', (e) => {
        const val = parseInt((e.target as HTMLInputElement).value, 10) / 100;
        this.engine.applyLofting(val);
      });

      this.element.querySelector('#ctx-loft-apply')?.addEventListener('click', () => {
        const val = parseInt((tensionSlider?.value || '50'), 10) / 100;
        this.engine.applyLofting(val);
        this.engine.setTool('draw');
      });

      this.element.querySelector('#ctx-loft-cancel')?.addEventListener('click', () => {
        this.engine.loftSelectedCurves = [];
        this.engine.setTool('draw');
      });
    } else if (tool === 'erase') {
      this.element.querySelector('#ctx-erase-mode')?.addEventListener('click', () => {
        this.engine.eraserTool.toggleMode();
        this.refresh();
      });

      const radiusSlider = this.element.querySelector('#ctx-erase-radius') as HTMLInputElement;
      radiusSlider?.addEventListener('input', (e) => {
        const val = parseInt((e.target as HTMLInputElement).value, 10);
        this.engine.eraserTool.radius = (val / 100) * 0.5;
      });
    }
  }
}
