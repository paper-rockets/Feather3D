import * as THREE from 'three';
import { Engine } from '../core/Engine';

export class ColorPalette {
  public element: HTMLElement;
  private engine: Engine;
  private defaultColors: string[] = [
    '#1a1a2e',
    '#b03020',
    '#1a9940',
    '#1e52a0',
    '#d4a373',
    '#fefae0',
    '#606c38',
    '#ffffff'
  ];
  public colorHistory: string[] = ['#1a1a2e', '#b03020', '#1a9940', '#1e52a0'];

  private currentH: number = 240;
  private currentS: number = 20;
  private currentB: number = 18;

  constructor(engine: Engine) {
    this.engine = engine;
    this.element = document.createElement('div');
    this.element.style.display = 'flex';
    this.element.style.flexDirection = 'column';
    this.element.style.gap = '6px';

    this.render();
  }

  public addColorToHistory(hex: string): void {
    const formatted = hex.toLowerCase();
    const idx = this.colorHistory.indexOf(formatted);
    if (idx !== -1) {
      this.colorHistory.splice(idx, 1);
    }
    this.colorHistory.unshift(formatted);
    if (this.colorHistory.length > 8) {
      this.colorHistory.pop();
    }
    this.renderHistory();
  }

  private updateFromHSB(): void {
    const color = new THREE.Color();
    color.setHSL(this.currentH / 360, this.currentS / 100, this.currentB / 100);
    const hex = `#${color.getHexString()}`;
    this.engine.brushEngine.setColor(hex);
  }

  private render(): void {
    this.element.innerHTML = `
      <div style="display: flex; gap: 4px; align-items: center;">
        <div class="color-swatch-list" id="swatch-list"></div>
        <input id="color-hex-input" type="color" value="#1a1a2e" style="width: 24px; height: 24px; border: none; background: transparent; cursor: pointer;">
        <button id="btn-eyedropper" class="btn btn-sm">DROP</button>
        <button id="btn-toggle-hsb" class="btn btn-sm">HSV</button>
      </div>

      <div id="hsb-drawer" style="display: none; flex-direction: column; gap: 4px; padding: 6px 0; border-top: 1px solid var(--bdr);">
        <div class="prop-group" style="justify-content: space-between;">
          <span class="prop-label" style="font-size: 9px;">HUE</span>
          <input id="slider-hue" type="range" min="0" max="360" value="${this.currentH}" style="width: 80px;">
        </div>
        <div class="prop-group" style="justify-content: space-between;">
          <span class="prop-label" style="font-size: 9px;">SAT</span>
          <input id="slider-sat" type="range" min="0" max="100" value="${this.currentS}" style="width: 80px;">
        </div>
        <div class="prop-group" style="justify-content: space-between;">
          <span class="prop-label" style="font-size: 9px;">BRI</span>
          <input id="slider-bri" type="range" min="0" max="100" value="${this.currentB}" style="width: 80px;">
        </div>
      </div>

      <div style="display: flex; gap: 4px; align-items: center;">
        <span style="font-size: 9px; font-weight: 700; color: var(--mut);">RECENT:</span>
        <div id="history-swatch-list" style="display: flex; gap: 4px;"></div>
      </div>
    `;

    const swatchList = this.element.querySelector('#swatch-list') as HTMLElement;
    this.defaultColors.forEach((hex, idx) => {
      const swatch = document.createElement('div');
      swatch.className = `color-swatch ${idx === 0 ? 'selected' : ''}`;
      swatch.style.backgroundColor = hex;
      swatch.addEventListener('click', () => {
        this.element.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('selected'));
        swatch.classList.add('selected');
        this.engine.brushEngine.setColor(hex);
        this.addColorToHistory(hex);
      });
      swatchList.appendChild(swatch);
    });

    const hexInput = this.element.querySelector('#color-hex-input') as HTMLInputElement;
    hexInput.addEventListener('input', (e) => {
      const hex = (e.target as HTMLInputElement).value;
      this.engine.brushEngine.setColor(hex);
      this.addColorToHistory(hex);
    });

    const eyeBtn = this.element.querySelector('#btn-eyedropper') as HTMLButtonElement;
    eyeBtn?.addEventListener('click', () => {
      this.engine.setTool('inject');
    });

    const hsbBtn = this.element.querySelector('#btn-toggle-hsb') as HTMLButtonElement;
    const hsbDrawer = this.element.querySelector('#hsb-drawer') as HTMLElement;
    hsbBtn.addEventListener('click', () => {
      const isOpen = hsbDrawer.style.display === 'flex';
      hsbDrawer.style.display = isOpen ? 'none' : 'flex';
      hsbBtn.classList.toggle('active', !isOpen);
    });

    const hSlider = this.element.querySelector('#slider-hue') as HTMLInputElement;
    const sSlider = this.element.querySelector('#slider-sat') as HTMLInputElement;
    const bSlider = this.element.querySelector('#slider-bri') as HTMLInputElement;

    hSlider.addEventListener('input', (e) => {
      this.currentH = parseInt((e.target as HTMLInputElement).value, 10);
      this.updateFromHSB();
    });
    sSlider.addEventListener('input', (e) => {
      this.currentS = parseInt((e.target as HTMLInputElement).value, 10);
      this.updateFromHSB();
    });
    bSlider.addEventListener('input', (e) => {
      this.currentB = parseInt((e.target as HTMLInputElement).value, 10);
      this.updateFromHSB();
    });

    this.renderHistory();
  }

  private renderHistory(): void {
    const list = this.element.querySelector('#history-swatch-list') as HTMLElement;
    if (!list) return;
    list.innerHTML = '';

    this.colorHistory.forEach(hex => {
      const swatch = document.createElement('div');
      swatch.style.width = '14px';
      swatch.style.height = '14px';
      swatch.style.borderRadius = '2px';
      swatch.style.backgroundColor = hex;
      swatch.style.border = '1px solid var(--bdr)';
      swatch.style.cursor = 'pointer';
      swatch.addEventListener('click', () => {
        this.engine.brushEngine.setColor(hex);
      });
      list.appendChild(swatch);
    });
  }
}
