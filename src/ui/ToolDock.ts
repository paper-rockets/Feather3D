import { Engine, ToolType } from '../core/Engine';
import { SymmetryAxis } from '../core/SymmetryManager';

/**
 * ToolDock: Top-right compact glass dark horizontal pill with dual-state tool buttons.
 * 100% clean plain text design with zero emojis or decorative glyphs.
 */
export class ToolDock {
  public element: HTMLElement;
  private engine: Engine;

  private drawBtn!: HTMLButtonElement;
  private eraseBtn!: HTMLButtonElement;
  private selectBtn!: HTMLButtonElement;
  private symBtn!: HTMLButtonElement;
  private stableBtn!: HTMLButtonElement;
  private refBtn!: HTMLButtonElement;
  private stageBtn!: HTMLButtonElement;

  public onStageToggle?: () => void;
  public onClipboardToggle?: () => void;
  public onActiveToolChange?: (tool: ToolType) => void;

  private currentSymIndex: number = 0;
  private symOptions: SymmetryAxis[] = ['none', 'x', 'y', 'z'];
  private axisColors: Record<string, string> = { x: '#ff4d4d', y: '#2ecc71', z: '#3498db' };
  public isStableStrokesEnabled: boolean = true;

  constructor(engine: Engine) {
    this.engine = engine;
    this.element = document.createElement('div');
    this.element.id = 'tool-dock';

    this.render();
    this.bindEvents();
  }

  private render(): void {
    this.element.innerHTML = `
      <button id="btn-dock-draw" data-tool="draw" class="td-btn active" title="Draw / Draw Shape (Tap to toggle)">
        <span id="td-draw-label">DRAW</span>
      </button>
      <button id="btn-dock-erase" data-tool="erase" class="td-btn" title="Erase / Vacuum (Tap to toggle)">
        <span id="td-erase-label">ERASE</span>
      </button>
      <button id="btn-dock-select" data-tool="select" class="td-btn" title="Select">
        <span>SELECT</span>
      </button>
      <span class="td-sep"></span>
      <button id="btn-dock-sym" class="td-btn" title="Mirror symmetry (Tap to cycle axes)">
        <span id="td-sym-label">MIRROR</span>
      </button>
      <button id="btn-dock-stable" class="td-btn active" title="Stable strokes smoothing (Tap to toggle)">
        <span id="td-stable-label">STABLE</span>
      </button>
      <span class="td-sep"></span>
      <button id="btn-dock-ref" class="td-btn" title="Reference image overlay">
        <span>REF</span>
      </button>
      <button id="btn-dock-stage" class="td-btn" title="Stage layers & groups">
        <span>LAYERS</span>
      </button>
    `;

    this.drawBtn = this.element.querySelector('#btn-dock-draw') as HTMLButtonElement;
    this.eraseBtn = this.element.querySelector('#btn-dock-erase') as HTMLButtonElement;
    this.selectBtn = this.element.querySelector('#btn-dock-select') as HTMLButtonElement;
    this.symBtn = this.element.querySelector('#btn-dock-sym') as HTMLButtonElement;
    this.stableBtn = this.element.querySelector('#btn-dock-stable') as HTMLButtonElement;
    this.refBtn = this.element.querySelector('#btn-dock-ref') as HTMLButtonElement;
    this.stageBtn = this.element.querySelector('#btn-dock-stage') as HTMLButtonElement;
  }

  private bindEvents(): void {
    // 1. Dual-State Draw / Draw Shape
    this.drawBtn.addEventListener('click', () => {
      if (this.engine.activeTool === 'draw') {
        // Toggle dual-state: Draw Shape
        this.engine.shapeAssistEnabled = !this.engine.shapeAssistEnabled;
      } else {
        this.engine.shapeAssistEnabled = false;
        this.engine.setTool('draw');
      }
      this.updateToolStates();
    });

    // 2. Dual-State Erase / Vacuum
    this.eraseBtn.addEventListener('click', () => {
      if (this.engine.activeTool === 'erase') {
        // Toggle dual-state: Erase vs Vacuum
        this.engine.eraserTool.toggleMode();
      } else {
        this.engine.setTool('erase');
      }
      this.updateToolStates();
    });

    // 3. Select Tool
    this.selectBtn.addEventListener('click', () => {
      this.engine.setTool('select');
      this.updateToolStates();
    });

    // 4. Mirror Symmetry (Cycle None -> X -> Y -> Z)
    this.symBtn.addEventListener('click', () => {
      this.currentSymIndex = (this.currentSymIndex + 1) % this.symOptions.length;
      const axis = this.symOptions[this.currentSymIndex];
      this.engine.symmetryManager.setAxis(axis);
      this.updateSymmetryState();
    });

    // 5. Stable Strokes Toggle
    this.stableBtn.addEventListener('click', () => {
      this.isStableStrokesEnabled = !this.isStableStrokesEnabled;
      this.stableBtn.classList.toggle('active', this.isStableStrokesEnabled);
      const label = this.stableBtn.querySelector('#td-stable-label');
      if (label) {
        label.textContent = this.isStableStrokesEnabled ? 'STABLE' : 'STABLE OFF';
      }
    });

    // 6. Ref / Clipboard Overlay
    this.refBtn.addEventListener('click', () => {
      if (this.onClipboardToggle) this.onClipboardToggle();
    });

    // 7. Stage / Layers Drawer
    this.stageBtn.addEventListener('click', () => {
      if (this.onStageToggle) this.onStageToggle();
    });

    // External tool change listener
    this.onActiveToolChange = (tool: ToolType) => {
      this.updateToolStates();
    };
  }

  public updateToolStates(): void {
    const tool = this.engine.activeTool;

    // Draw state
    const isDraw = tool === 'draw';
    this.drawBtn.classList.toggle('active', isDraw);
    const drawLabel = this.drawBtn.querySelector('#td-draw-label');
    if (drawLabel) {
      drawLabel.textContent = (isDraw && this.engine.shapeAssistEnabled) ? 'DRAW SHAPE' : 'DRAW';
    }

    // Erase state
    const isErase = tool === 'erase';
    this.eraseBtn.classList.toggle('active', isErase);
    const eraseLabel = this.eraseBtn.querySelector('#td-erase-label');
    if (eraseLabel) {
      const mode = this.engine.eraserTool.mode;
      eraseLabel.textContent = (isErase && mode === 'vacuum') ? 'VACUUM' : 'ERASE';
    }

    // Select state
    this.selectBtn.classList.toggle('active', tool === 'select' || tool === 'transform');
  }

  private updateSymmetryState(): void {
    const axis = this.symOptions[this.currentSymIndex];
    const symLabel = this.symBtn.querySelector('#td-sym-label');
    if (symLabel) {
      symLabel.textContent = axis === 'none' ? 'MIRROR' : `MIRROR: ${axis.toUpperCase()}`;
    }
    this.symBtn.classList.toggle('active', axis !== 'none');
    this.symBtn.style.color = axis === 'none' ? '' : this.axisColors[axis];
  }
}
