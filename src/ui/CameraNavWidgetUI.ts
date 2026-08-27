import { Engine } from '../core/Engine';

export class CameraNavWidgetUI {
  public element: HTMLElement;
  private engine: Engine;

  private padEl!: HTMLElement;
  private dotEl!: HTMLElement;
  private bodyEl!: HTMLElement;
  private tabEl!: HTMLElement;
  private isDragging = false;
  private isCollapsed = false;
  private lastX = 0;
  private lastY = 0;

  constructor(engine: Engine) {
    this.engine = engine;
    this.element = document.createElement('div');
    this.element.id = 'camera-nav-widget';
    this.element.className = 'navw navw-look';
    this.render();
    this.bindEvents();
    this.setCollapsed(true);
  }

  private render(): void {
    this.element.innerHTML = `
      <div class="navw-body" id="cnav-body">
        <div class="navw-header">
          <span class="navw-title">LOOK</span>
          <div class="navw-zoom-row">
            <button class="navw-zbtn" id="cnav-zoom-out" title="Zoom Out">-</button>
            <button class="navw-zbtn" id="cnav-zoom-in" title="Zoom In">+</button>
          </div>
        </div>
        <div class="navw-pad" id="cnav-pad">
          <svg class="navw-crosshair" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" stroke-width="0.8"/>
            <circle cx="50" cy="50" r="22" fill="none" stroke="currentColor" stroke-width="0.6"/>
            <line x1="50" y1="6" x2="50" y2="94" stroke="currentColor" stroke-width="0.6"/>
            <line x1="6" y1="50" x2="94" y2="50" stroke="currentColor" stroke-width="0.6"/>
          </svg>
          <div class="navw-dot" id="cnav-dot"></div>
        </div>
      </div>
      <button class="navw-tab" id="cnav-tab" title="Toggle Look HUD">
        <span class="navw-tab-text">LOOK</span>
      </button>
    `;

    this.padEl = this.element.querySelector('#cnav-pad') as HTMLElement;
    this.dotEl = this.element.querySelector('#cnav-dot') as HTMLElement;
    this.bodyEl = this.element.querySelector('#cnav-body') as HTMLElement;
    this.tabEl = this.element.querySelector('#cnav-tab') as HTMLElement;
  }

  public setCollapsed(collapsed: boolean): void {
    this.isCollapsed = collapsed;
    this.bodyEl.classList.toggle('navw-collapsed', this.isCollapsed);
    this.tabEl.classList.toggle('navw-tab-collapsed', this.isCollapsed);
  }

  private bindEvents(): void {
    const vp = this.engine.viewport;

    // Pull tab collapse/expand
    this.tabEl.addEventListener('click', (e) => {
      e.stopPropagation();
      this.setCollapsed(!this.isCollapsed);
    });

    // Drag to orbit
    this.padEl.addEventListener('pointerdown', (e: PointerEvent) => {
      this.isDragging = true;
      this.lastX = e.clientX;
      this.lastY = e.clientY;
      this.padEl.setPointerCapture(e.pointerId);
      this.moveDot(e);
    });

    this.padEl.addEventListener('pointermove', (e: PointerEvent) => {
      if (!this.isDragging) return;
      const dx = e.clientX - this.lastX;
      const dy = e.clientY - this.lastY;
      vp.orbit(dx * 1.5, dy * 1.5);
      this.lastX = e.clientX;
      this.lastY = e.clientY;
      this.moveDot(e);
    });

    const endDrag = () => {
      this.isDragging = false;
      this.dotEl.style.transform = 'translate(-50%, -50%)';
    };
    this.padEl.addEventListener('pointerup', endDrag);
    this.padEl.addEventListener('pointercancel', endDrag);

    this.padEl.addEventListener('dblclick', () => vp.setViewPreset('iso'));

    this.element.querySelector('#cnav-zoom-in')?.addEventListener('click', () => vp.zoom(1.25));
    this.element.querySelector('#cnav-zoom-out')?.addEventListener('click', () => vp.zoom(1 / 1.25));
  }

  private moveDot(e: PointerEvent): void {
    const rect = this.padEl.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const maxR = rect.width / 2 - 12;
    let dx = e.clientX - cx;
    let dy = e.clientY - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist > maxR) { dx = (dx / dist) * maxR; dy = (dy / dist) * maxR; }
    this.dotEl.style.transform = `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px))`;
  }
}
