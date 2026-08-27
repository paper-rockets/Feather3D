import { Engine } from '../core/Engine';
import { icon } from './icons';

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
      const presetName = brush.activePreset?.name || 'Brush';
      const sizeVal = Math.round((brush.size / 2.0) * 1000);
      const opVal = Math.round(brush.opacity * 100);
      const colorHex = `#${brush.color.getHexString()}`;
      const guideMode = this.engine.guideManager.mode;
      let planeName = 'Floor';
      if (guideMode === 'primitive') planeName = 'Guide';
      else if (guideMode === 'mesh') planeName = 'Mesh';
      else if (guideMode === 'plane') {
        const n = this.engine.guideManager.planeGuide.normal;
        const tilt = Math.round(Math.acos(Math.min(1, Math.abs(n.y))) * 180 / Math.PI);
        if (tilt < 5) planeName = 'Floor';
        else if (Math.abs(n.z) > Math.abs(n.x)) planeName = `Wall ${tilt} deg`;
        else planeName = `Side ${tilt} deg`;
      }

      this.element.innerHTML = `
        <div class="context-pill status-strip">
          <div class="status-chip status-chip-btn" id="ctx-brush-name" title="Change Brush">
            <span class="status-swatch" style="background:${colorHex};"></span>
            <span class="status-text">${presetName}</span>
          </div>
          <span class="status-sep"></span>
          <div class="status-chip" title="Active Plane Orientation">
            <span class="status-text status-plane-label">${planeName}</span>
          </div>
          <span class="status-sep"></span>
          <div class="status-chip status-chip-btn" id="ctx-size-chip" title="Brush Size">
            <span class="status-text">Size ${sizeVal}</span>
          </div>
          <span class="status-sep"></span>
          <div class="status-chip status-chip-btn" id="ctx-op-chip" title="Brush Opacity">
            <span class="status-text">Op ${opVal}%</span>
          </div>
        </div>
      `;
    } else if (tool === 'select' || tool === 'transform') {
      this.element.innerHTML = `
        <div class="ipad-context-card">
          <div class="ipad-ctx-tabs">
            <button class="ipad-ctx-tab active" id="ctx-tab-xform">Transform</button>
            <button class="ipad-ctx-tab" id="ctx-tab-liq">Liquify</button>
          </div>
          <div class="ipad-ctx-actions">
            <button class="ipad-action-btn" id="ctx-snap-btn" title="Snap to Ground">${icon('cubeCenter')}</button>
            <button class="ipad-action-btn" id="ctx-dup-btn" title="Duplicate">${icon('duplicate')}</button>
            <button class="ipad-action-btn" id="ctx-mirror-btn" title="Mirror Duplicate">${icon('mirror')}</button>
            <button class="ipad-action-btn" id="ctx-flip-btn" title="Flip / Invert">${icon('flipHourglass')}</button>
            <button class="ipad-action-btn btn-danger-action" id="ctx-delete-btn" title="Delete">${icon('trash')}</button>
          </div>
        </div>
      `;
    } else if (tool === 'liquify') {
      this.element.innerHTML = `
        <div class="ipad-context-card">
          <div class="ipad-ctx-tabs">
            <button class="ipad-ctx-tab" id="ctx-tab-xform">Transform</button>
            <button class="ipad-ctx-tab active" id="ctx-tab-liq">Liquify</button>
          </div>
          <div class="ipad-ctx-actions">
            <button class="ipad-action-btn" id="ctx-reset-liq" title="Reset Liquify">${icon('reset')}</button>
            <button class="ipad-action-btn" id="ctx-flip-liq" title="Flip">${icon('flipHourglass')}</button>
            <button class="ipad-action-btn" id="ctx-apply-liq" title="Apply">${icon('check')}</button>
            <button class="ipad-action-btn btn-danger-action" id="ctx-delete-btn" title="Delete">${icon('trash')}</button>
          </div>
        </div>
      `;
    } else if (tool === 'loft') {
      this.element.innerHTML = `
        <div class="context-pill">
          <span style="font-size: 10px; font-weight: 700; white-space: nowrap;">LOFT TENSION</span>
          <input id="ctx-loft-tension" type="range" min="0" max="100" value="50" style="width: 90px;">
          <button id="ctx-loft-apply" class="btn btn-sm active">BRIDGE</button>
          <button id="ctx-loft-cancel" class="btn btn-sm">CANCEL</button>
        </div>
      `;
    } else if (tool === 'erase') {
      const mode = this.engine.eraserTool.mode;
      this.element.innerHTML = `
        <div class="context-pill">
          <button id="ctx-erase-mode" class="btn btn-sm active">${mode === 'vacuum' ? 'VACUUM' : 'POINT'}</button>
          <div style="display: flex; align-items: center; gap: 4px; padding: 0 4px;">
            <span style="font-size: 9px; font-weight: 700; color: var(--mut);">RADIUS</span>
            <input id="ctx-erase-radius" type="range" min="2" max="50" value="10" style="width: 60px;">
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
