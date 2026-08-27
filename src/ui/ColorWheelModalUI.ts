import * as THREE from 'three';
import { Engine } from '../core/Engine';
import { MaterialType } from '../shaders/CustomShaderMaterials';
import { icon } from './icons';
import { SKETCHBOOK_COLOR_SETS } from '../scene/SketchbookPalettes';

export class ColorWheelModalUI {
  public element: HTMLElement;
  private engine: Engine;
  public isVisible: boolean = false;

  private canvas!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;
  private hexBtn!: HTMLElement;
  private hexInput!: HTMLInputElement;
  private activeMaterial: MaterialType = 'shadeless';
  private activePaletteSetIndex: number = 0;
  private palettesGridContainer!: HTMLElement;

  private currentHue: number = 240; // Default blue
  private currentSat: number = 1.0;
  private currentVal: number = 1.0;
  private isDraggingRing: boolean = false;
  private isDraggingSquare: boolean = false;

  constructor(engine: Engine) {
    this.engine = engine;
    this.element = document.createElement('div');
    this.element.id = 'color-wheel-popover';
    this.element.className = 'color-popover-card';
    this.element.style.display = 'none';

    this.render();
    this.bindEvents();
    document.body.appendChild(this.element);
  }

  public showAt(x: number, y: number): void {
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      this.element.style.left = '50%';
      this.element.style.top = 'auto';
      this.element.style.bottom = '80px';
      this.element.style.transform = 'translateX(-50%)';
    } else {
      this.element.style.transform = 'none';
      const popoverW = 260;
      const popoverH = 460;
      const clampedX = Math.min(window.innerWidth - popoverW - 16, Math.max(12, x));
      const clampedY = Math.min(window.innerHeight - popoverH - 16, Math.max(12, y));
      this.element.style.left = `${clampedX}px`;
      this.element.style.top = `${clampedY}px`;
      this.element.style.bottom = 'auto';
    }

    this.element.style.display = 'flex';
    this.isVisible = true;
    this.drawColorWheel();
    this.renderPalettesGrid();
  }

  public hide(): void {
    this.isVisible = false;
    this.element.style.display = 'none';
  }

  public toggleAt(x: number, y: number): void {
    if (this.isVisible) {
      this.hide();
    } else {
      this.showAt(x, y);
    }
  }

  public toggle(): void {
    if (this.isVisible) {
      this.hide();
    } else {
      const isMobile = window.innerWidth < 768;
      if (isMobile) {
        this.showAt(10, window.innerHeight - 440);
      } else {
        this.showAt(70, window.innerHeight / 2 - 200);
      }
    }
  }

  private render(): void {
    this.element.innerHTML = `
      <div class="popover-arrow-left"></div>

      <!-- Top Bar: Hex Badge, Eyedropper, and Close -->
      <div class="color-popover-topbar">
        <div id="cw-hex-badge" class="cw-hex-pill" title="Click to type HEX">
          <span id="cw-hex-text">2600FF</span>
          <input id="cw-hex-input" type="text" value="2600FF" maxlength="6" style="display: none;">
        </div>
        <div style="display: flex; gap: 4px; align-items: center;">
          <button id="cw-dropper-btn" class="cw-icon-btn" title="Eyedropper">${icon('syringe')}</button>
          <button id="cw-close-btn" class="cw-close-action" title="Close Color Picker">X</button>
        </div>
      </div>

      <!-- Center: Rainbow Hue Ring + SV Square Canvas -->
      <div class="color-canvas-container">
        <canvas id="cw-canvas" width="220" height="220" style="touch-action: none; cursor: crosshair;"></canvas>
      </div>

      <!-- Material Sphere Preview Buttons -->
      <div class="material-spheres-row">
        <!-- 1: Flat Shadeless -->
        <button class="mat-sphere-btn ${this.activeMaterial === 'shadeless' ? 'active' : ''}" data-mat="shadeless" title="Flat Shadeless">
          <div class="sphere-preview sphere-flat"></div>
        </button>

        <!-- 2: Cel-Shaded Toon -->
        <button class="mat-sphere-btn ${this.activeMaterial === 'cel_shaded' ? 'active' : ''}" data-mat="cel_shaded" title="Cel-Shaded Toon">
          <div class="sphere-preview sphere-toon"></div>
        </button>

        <!-- 3: Smooth Shaded -->
        <button class="mat-sphere-btn ${this.activeMaterial === 'shaded' ? 'active' : ''}" data-mat="shaded" title="Smooth Shaded">
          <div class="sphere-preview sphere-smooth"></div>
        </button>

        <!-- 4: Cutout -->
        <div style="position: relative; display: flex; flex-direction: column; align-items: center;">
          <button class="mat-sphere-btn ${this.activeMaterial === 'cutout' ? 'active' : ''}" data-mat="cutout" title="Cutout">
            <div class="sphere-preview sphere-cutout"></div>
          </button>
        </div>
      </div>

      <!-- Official Sketchbook Palettes Section -->
      <div class="cw-palettes-section">
        <div class="cw-palettes-tabs-row">
          <button class="cw-pal-tab active" data-set="0">Basic</button>
          <button class="cw-pal-tab" data-set="1">Greys</button>
          <button class="cw-pal-tab" data-set="2">Variety</button>
        </div>
        <div id="cw-palettes-grid" class="cw-palettes-grid"></div>
      </div>
    `;

    this.canvas = this.element.querySelector('#cw-canvas') as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d')!;
    this.hexBtn = this.element.querySelector('#cw-hex-badge') as HTMLElement;
    this.hexInput = this.element.querySelector('#cw-hex-input') as HTMLInputElement;
    this.palettesGridContainer = this.element.querySelector('#cw-palettes-grid') as HTMLElement;

    this.drawColorWheel();
    this.renderPalettesGrid();
  }

  private renderPalettesGrid(): void {
    if (!this.palettesGridContainer) return;
    this.palettesGridContainer.innerHTML = '';

    const currentGroup = SKETCHBOOK_COLOR_SETS[this.activePaletteSetIndex] || SKETCHBOOK_COLOR_SETS[0];

    currentGroup.palettes.forEach(sub => {
      const row = document.createElement('div');
      row.className = 'cw-palette-row';

      const label = document.createElement('span');
      label.className = 'cw-palette-name';
      label.textContent = sub.name;
      row.appendChild(label);

      const swatchesWrap = document.createElement('div');
      swatchesWrap.className = 'cw-swatches-wrap';

      sub.colors.forEach(hex => {
        const sw = document.createElement('div');
        sw.className = 'cw-swatch-dot';
        sw.style.backgroundColor = hex;
        sw.title = `${sub.name}: ${hex.toUpperCase()}`;
        sw.addEventListener('click', () => {
          this.setColorFromHex(hex);
        });
        swatchesWrap.appendChild(sw);
      });

      row.appendChild(swatchesWrap);
      this.palettesGridContainer.appendChild(row);
    });
  }

  private drawColorWheel(): void {
    const w = this.canvas.width;
    const h = this.canvas.height;
    const cx = w / 2;
    const cy = h / 2;
    const outerR = cx - 6;
    const innerR = outerR - 22;

    this.ctx.clearRect(0, 0, w, h);

    // Draw Outer Hue Ring
    for (let angle = 0; angle < 360; angle++) {
      const startAngle = ((angle - 1) * Math.PI) / 180;
      const endAngle = ((angle + 1) * Math.PI) / 180;
      this.ctx.beginPath();
      this.ctx.arc(cx, cy, (outerR + innerR) / 2, startAngle, endAngle);
      this.ctx.strokeStyle = `hsl(${angle}, 100%, 50%)`;
      this.ctx.lineWidth = outerR - innerR;
      this.ctx.stroke();
    }

    // Draw Hue Ring Indicator
    const hueRad = (this.currentHue * Math.PI) / 180;
    const indicatorR = (outerR + innerR) / 2;
    const ix = cx + Math.cos(hueRad) * indicatorR;
    const iy = cy + Math.sin(hueRad) * indicatorR;

    this.ctx.beginPath();
    this.ctx.arc(ix, iy, 7, 0, Math.PI * 2);
    this.ctx.strokeStyle = '#ffffff';
    this.ctx.lineWidth = 2.5;
    this.ctx.stroke();

    // Draw Inner Saturation/Value Box
    const boxSize = innerR * 1.35;
    const bx = cx - boxSize / 2;
    const by = cy - boxSize / 2;

    // Horizontal White to Pure Hue gradient
    const gradH = this.ctx.createLinearGradient(bx, by, bx + boxSize, by);
    gradH.addColorStop(0, '#ffffff');
    gradH.addColorStop(1, `hsl(${this.currentHue}, 100%, 50%)`);
    this.ctx.fillStyle = gradH;
    this.ctx.fillRect(bx, by, boxSize, boxSize);

    // Vertical Transparent to Black gradient
    const gradV = this.ctx.createLinearGradient(bx, by, bx, by + boxSize);
    gradV.addColorStop(0, 'rgba(0, 0, 0, 0)');
    gradV.addColorStop(1, '#000000');
    this.ctx.fillStyle = gradV;
    this.ctx.fillRect(bx, by, boxSize, boxSize);

    // Sat/Val Indicator Ring
    const px = bx + this.currentSat * boxSize;
    const py = by + (1 - this.currentVal) * boxSize;

    this.ctx.beginPath();
    this.ctx.arc(px, py, 7, 0, Math.PI * 2);
    this.ctx.strokeStyle = '#ffffff';
    this.ctx.lineWidth = 2.5;
    this.ctx.stroke();
  }

  private bindEvents(): void {
    // Close button
    this.element.querySelector('#cw-close-btn')?.addEventListener('click', () => {
      this.hide();
    });

    // Eyedropper button
    this.element.querySelector('#cw-dropper-btn')?.addEventListener('click', () => {
      this.hide();
      this.engine.setTool('inject');
    });

    // Material Sphere Selection
    const matBtns = this.element.querySelectorAll<HTMLButtonElement>('.mat-sphere-btn');
    matBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        matBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const mat = btn.getAttribute('data-mat') as MaterialType;
        this.activeMaterial = mat;
        this.engine.brushEngine.setMaterialType(mat);
      });
    });

    // Palette tab chips
    const palTabs = this.element.querySelectorAll<HTMLButtonElement>('.cw-pal-tab');
    palTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        palTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        this.activePaletteSetIndex = parseInt(tab.getAttribute('data-set') || '0', 10);
        this.renderPalettesGrid();
      });
    });

    // Hex Button input toggle
    const hexText = this.element.querySelector('#cw-hex-text') as HTMLElement;
    this.hexBtn.addEventListener('click', () => {
      hexText.style.display = 'none';
      this.hexInput.style.display = 'block';
      this.hexInput.focus();
      this.hexInput.select();
    });

    this.hexInput.addEventListener('blur', () => {
      this.applyHexInput();
    });

    this.hexInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        this.applyHexInput();
      }
    });

    const handleCanvasInteraction = (e: MouseEvent | TouchEvent) => {
      const rect = this.canvas.getBoundingClientRect();
      const clientX = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : (e as MouseEvent).clientY;
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      const cx = this.canvas.width / 2;
      const cy = this.canvas.height / 2;
      const outerR = cx - 6;
      const innerR = outerR - 22;
      const dist = Math.hypot(x - cx, y - cy);

      const boxSize = innerR * 1.35;
      const bx = cx - boxSize / 2;
      const by = cy - boxSize / 2;

      if (this.isDraggingRing || (!this.isDraggingSquare && dist >= innerR - 8 && dist <= outerR + 8)) {
        this.isDraggingRing = true;
        let angle = (Math.atan2(y - cy, x - cx) * 180) / Math.PI;
        if (angle < 0) angle += 360;
        this.currentHue = Math.round(angle);
        this.updateColor();
      } else if (this.isDraggingSquare || (x >= bx && x <= bx + boxSize && y >= by && y <= by + boxSize)) {
        this.isDraggingSquare = true;
        this.currentSat = Math.max(0, Math.min(1, (x - bx) / boxSize));
        this.currentVal = Math.max(0, Math.min(1, 1 - (y - by) / boxSize));
        this.updateColor();
      }
    };

    this.canvas.addEventListener('mousedown', (e) => {
      handleCanvasInteraction(e);
      window.addEventListener('mousemove', handleCanvasInteraction);
      window.addEventListener('mouseup', () => {
        this.isDraggingRing = false;
        this.isDraggingSquare = false;
        window.removeEventListener('mousemove', handleCanvasInteraction);
      }, { once: true });
    });

    this.canvas.addEventListener('touchstart', (e) => {
      e.preventDefault();
      handleCanvasInteraction(e);
      const onTouchMove = (te: TouchEvent) => handleCanvasInteraction(te);
      window.addEventListener('touchmove', onTouchMove, { passive: false });
      window.addEventListener('touchend', () => {
        this.isDraggingRing = false;
        this.isDraggingSquare = false;
        window.removeEventListener('touchmove', onTouchMove);
      }, { once: true });
    });
  }

  private applyHexInput(): void {
    const hexText = this.element.querySelector('#cw-hex-text') as HTMLElement;
    let val = this.hexInput.value.replace('#', '').trim();
    if (val.length === 6) {
      this.setColorFromHex(`#${val}`);
    }
    hexText.textContent = val.toUpperCase();
    hexText.style.display = 'block';
    this.hexInput.style.display = 'none';
  }

  private updateColor(): void {
    this.drawColorWheel();
    const color = new THREE.Color();
    const h = this.currentHue / 360;
    const s = this.currentSat;
    const v = this.currentVal;

    const i = Math.floor(h * 6);
    const f = h * 6 - i;
    const p = v * (1 - s);
    const q = v * (1 - f * s);
    const t = v * (1 - (1 - f) * s);

    let r = 0, g = 0, b = 0;
    switch (i % 6) {
      case 0: r = v; g = t; b = p; break;
      case 1: r = q; g = v; b = p; break;
      case 2: r = p; g = v; b = t; break;
      case 3: r = p; g = q; b = v; break;
      case 4: r = t; g = p; b = v; break;
      case 5: r = v; g = p; b = q; break;
    }

    color.setRGB(r, g, b);
    const hexClean = color.getHexString().toUpperCase();
    const hexFull = `#${hexClean}`;

    const hexText = this.element.querySelector('#cw-hex-text') as HTMLElement;
    if (hexText) hexText.textContent = hexClean;
    if (this.hexInput) this.hexInput.value = hexClean;

    this.engine.brushEngine.setColor(hexFull);
  }

  public setColorFromHex(hex: string): void {
    try {
      const col = new THREE.Color(hex);
      const hsl = { h: 0, s: 0, l: 0 };
      col.getHSL(hsl);
      this.currentHue = Math.round(hsl.h * 360);
      this.currentSat = hsl.s;
      this.currentVal = hsl.l;
      this.updateColor();
    } catch (err) {
      // Ignore invalid hex
    }
  }
}
