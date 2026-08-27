import * as THREE from 'three';
import { Engine } from './Engine';

export class SqueezeMenuController {
  private engine: Engine;
  public element: HTMLElement;
  public isVisible: boolean = false;
  public isStampActive: boolean = false;
  private currentScreenPos: { x: number; y: number } = { x: 0, y: 0 };
  private initialRollAngle: number = 0;

  constructor(engine: Engine) {
    this.engine = engine;
    this.element = document.createElement('div');
    this.element.id = 'squeeze-menu';
    this.element.className = 'squeeze-radial-menu';
    this.element.style.display = 'none';

    this.render();
    this.bindEvents();
    document.body.appendChild(this.element);
  }

  private render(): void {
    this.element.innerHTML = `
      <div class="squeeze-center-anchor">
        <button id="sq-btn-undo" class="squeeze-item item-n btn btn-sm">UNDO</button>
        <button id="sq-btn-redo" class="squeeze-item item-ne btn btn-sm">REDO</button>
        <button id="sq-btn-find-group" class="squeeze-item item-e btn btn-sm">FIND GRP</button>
        <button id="sq-btn-stamp" class="squeeze-item item-se btn btn-sm">STAMP</button>
        <button id="sq-btn-color" class="squeeze-item item-s btn btn-sm">COLOR</button>
        <button id="sq-btn-brush" class="squeeze-item item-sw btn btn-sm">BRUSH</button>
        <button id="sq-btn-clear" class="squeeze-item item-w btn btn-sm">CLEAR</button>
        <button id="sq-btn-close" class="squeeze-item item-nw btn btn-sm">CLOSE</button>
      </div>
    `;
  }

  private bindEvents(): void {
    this.element.querySelector('#sq-btn-undo')?.addEventListener('click', () => {
      this.engine.historyManager.undo();
      this.triggerHaptic();
      this.hide();
    });

    this.element.querySelector('#sq-btn-redo')?.addEventListener('click', () => {
      this.engine.historyManager.redo();
      this.triggerHaptic();
      this.hide();
    });

    this.element.querySelector('#sq-btn-find-group')?.addEventListener('click', () => {
      this.showFindGroupTooltip();
      this.triggerHaptic();
      this.hide();
    });

    this.element.querySelector('#sq-btn-stamp')?.addEventListener('click', () => {
      this.isStampActive = true;
      this.engine.selectionTool.duplicateSelected();
      this.triggerHaptic();
      this.hide();
    });

    this.element.querySelector('#sq-btn-color')?.addEventListener('click', () => {
      this.engine.setTool('inject');
      this.hide();
    });

    this.element.querySelector('#sq-btn-brush')?.addEventListener('click', () => {
      const isRibbon = this.engine.brushEngine.profile === 'ribbon';
      this.engine.brushEngine.setProfile(isRibbon ? 'tube' : 'ribbon');
      this.triggerHaptic();
      this.hide();
    });

    this.element.querySelector('#sq-btn-clear')?.addEventListener('click', () => {
      this.engine.selectionTool.clearSelection();
      this.hide();
    });

    this.element.querySelector('#sq-btn-close')?.addEventListener('click', () => {
      this.hide();
    });
  }

  public showAt(screenX: number, screenY: number): void {
    this.currentScreenPos = { x: screenX, y: screenY };
    this.element.style.left = `${screenX}px`;
    this.element.style.top = `${screenY}px`;
    this.element.style.display = 'block';
    this.isVisible = true;
    this.triggerHaptic();
  }

  public hide(): void {
    this.element.style.display = 'none';
    this.isVisible = false;
  }

  public triggerHaptic(type: 'light' | 'medium' | 'heavy' = 'light'): void {
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      const duration = type === 'light' ? 10 : (type === 'medium' ? 25 : 50);
      navigator.vibrate(duration);
    }
  }

  public showFindGroupTooltip(): void {
    const ndc = new THREE.Vector2(
      (this.currentScreenPos.x / window.innerWidth) * 2 - 1,
      -(this.currentScreenPos.y / window.innerHeight) * 2 + 1
    );
    const hit = this.engine.injectorTool.sampleStrokeAt(ndc, this.engine.viewport.activeCamera);
    if (hit) {
      const layer = this.engine.stageManager.layers.find(l => l.curves.some(c => c.id === hit.id));
      const layerName = layer ? layer.name : 'Default Layer';
      const tooltip = document.createElement('div');
      tooltip.className = 'feather-tooltip';
      tooltip.textContent = `GROUP: ${layerName}`;
      tooltip.style.left = `${this.currentScreenPos.x + 15}px`;
      tooltip.style.top = `${this.currentScreenPos.y - 15}px`;
      document.body.appendChild(tooltip);
      setTimeout(() => tooltip.remove(), 2500);
    }
  }

  /**
   * Translates stylus barrel roll twist into Z-axis rotation for active stamp duplication.
   */
  public handleBarrelRoll(twistRad: number): void {
    if (!this.isStampActive || this.engine.selectionTool.selectedCurves.length === 0) return;
    const deltaRoll = twistRad - this.initialRollAngle;
    this.initialRollAngle = twistRad;
    this.engine.joystickController.handle3DRotate('z', THREE.MathUtils.radToDeg(deltaRoll));
  }
}
