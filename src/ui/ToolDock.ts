import { Engine, ToolType } from '../core/Engine';
import { SymmetryAxis } from '../core/SymmetryManager';
import { GuideMode } from '../guides/GuideManager';
import { icon } from './icons';

/**
 * ToolDock: Top-right compact horizontal pill with tool selector buttons.
 * Matches Feather reference: small row of Draw, Erase, Select, Vacuum, Deselect,
 * Mirror, Clipboard, Stage toggle.
 */
export class ToolDock {
  public element: HTMLElement;
  private engine: Engine;
  private symBtn!: HTMLButtonElement;
  private guideBtn!: HTMLButtonElement;

  public onAnimationToggle?: () => void;
  public onStageToggle?: () => void;
  public onClipboardToggle?: () => void;
  public onActiveToolChange?: (tool: ToolType) => void;

  private currentSymIndex: number = 0;
  private symOptions: SymmetryAxis[] = ['none', 'x', 'y', 'z'];

  private currentGuideIndex: number = 0;
  private guideOptions: Array<{ mode: GuideMode; label: string; icon: string; prim?: string }> = [
    { mode: 'plane', label: '3D Guide Plane', icon: 'plane' },
    { mode: 'primitive', label: 'Sphere Guide', icon: 'sphere', prim: 'sphere' },
    { mode: 'primitive', label: 'Cube Guide', icon: 'cube', prim: 'cube' },
    { mode: 'primitive', label: 'Cylinder Guide', icon: 'cylinder', prim: 'cylinder' },
    { mode: 'primitive', label: 'Cone Guide', icon: 'cone', prim: 'cone' },
    { mode: 'primitive', label: 'Torus Guide', icon: 'torus', prim: 'torus' },
    { mode: 'none', label: 'Guide Off', icon: 'off' }
  ];

  private axisColors: Record<string, string> = { x: '#e0483a', y: '#3ab24a', z: '#3a6be0' };

  constructor(engine: Engine) {
    this.engine = engine;
    this.element = document.createElement('div');
    this.element.id = 'tool-dock';

    this.render();
    this.bindEvents();
  }

  private render(): void {
    this.element.innerHTML = `
      <button data-tool="draw" class="td-btn td-labeled active" title="Draw">${icon('draw')}<span class="td-label">Draw</span></button>
      <button data-tool="erase" class="td-btn td-labeled" title="Erase">${icon('erase')}<span class="td-label">Erase</span></button>
      <button data-tool="select" class="td-btn td-labeled" title="Select">${icon('select')}<span class="td-label">Select</span></button>
      <span class="td-sep"></span>
      <button id="btn-sym" class="td-btn td-labeled" title="Mirror symmetry">${icon('mirror')}<span class="td-label">Mirror</span></button>
      <button id="btn-clipboard-toggle" class="td-btn td-labeled" title="Reference image">${icon('image')}<span class="td-label">Ref</span></button>
      <button id="btn-stage-toggle" class="td-btn td-labeled" title="Layers / groups">${icon('layers')}<span class="td-label">Layers</span></button>
    `;

    this.symBtn = this.element.querySelector('#btn-sym') as HTMLButtonElement;
    this.guideBtn = this.element.querySelector('#btn-sym') as HTMLButtonElement;
  }

  private bindEvents(): void {
    const toolButtons = this.element.querySelectorAll<HTMLButtonElement>('[data-tool]');
    toolButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        toolButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const tool = btn.getAttribute('data-tool');
        this.engine.shapeAssistEnabled = false;
        this.engine.setTool(tool as ToolType);
      });
    });

    this.onActiveToolChange = (tool) => {
      toolButtons.forEach(b => {
        const t = b.getAttribute('data-tool');
        b.classList.toggle('active', t === tool);
      });
    };

    this.symBtn.addEventListener('click', () => {
      this.currentSymIndex = (this.currentSymIndex + 1) % this.symOptions.length;
      const axis = this.symOptions[this.currentSymIndex];
      this.engine.symmetryManager.setAxis(axis);
      this.symBtn.innerHTML = icon('mirror');
      // Tint the mirror icon in the axis colour (X red / Y green / Z blue).
      this.symBtn.style.color = axis === 'none' ? '' : this.axisColors[axis];
      this.symBtn.title = axis === 'none' ? 'Mirror symmetry' : `Mirror: ${axis.toUpperCase()} axis`;
      this.symBtn.classList.toggle('active', axis !== 'none');
    });

    this.element.querySelector('#btn-clipboard-toggle')?.addEventListener('click', () => {
      if (this.onClipboardToggle) this.onClipboardToggle();
    });

    this.element.querySelector('#btn-stage-toggle')?.addEventListener('click', () => {
      if (this.onStageToggle) this.onStageToggle();
    });
  }
}
