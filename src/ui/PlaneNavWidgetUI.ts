import * as THREE from 'three';
import { Engine } from '../core/Engine';

export class PlaneNavWidgetUI {
  public element: HTMLElement;
  private engine: Engine;

  private tiltPhi = 0;
  private tiltTheta = 0;
  private depth = 0;

  private padEl!: HTMLElement;
  private dotEl!: HTMLElement;
  private bodyEl!: HTMLElement;
  private tabEl!: HTMLElement;
  private readoutEl!: HTMLElement;
  private depthValEl!: HTMLElement;
  private isDragging = false;
  private isCollapsed = false;

  constructor(engine: Engine) {
    this.engine = engine;
    this.element = document.createElement('div');
    this.element.id = 'plane-nav-widget';
    this.element.className = 'navw navw-canvas';
    this.render();
    this.bindEvents();
    this.setCollapsed(true);
  }

  private render(): void {
    this.element.innerHTML = `
      <div class="navw-body" id="pnav-body">
        <div class="navw-header">
          <span class="navw-title">CANVAS</span>
          <div class="pnav-presets">
            <button class="pnav-preset active" data-preset="floor">Floor</button>
            <button class="pnav-preset" data-preset="wall">Wall</button>
            <button class="pnav-preset" data-preset="side">Side</button>
          </div>
        </div>
        <div class="navw-pad" id="pnav-pad">
          <svg class="navw-crosshair" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" stroke-width="0.8"/>
            <circle cx="50" cy="50" r="22" fill="none" stroke="currentColor" stroke-width="0.6"/>
            <line x1="50" y1="6" x2="50" y2="94" stroke="currentColor" stroke-width="0.6"/>
            <line x1="6" y1="50" x2="94" y2="50" stroke="currentColor" stroke-width="0.6"/>
          </svg>
          <span class="pnav-compass pnav-c-top">Wall</span>
          <span class="pnav-compass pnav-c-right">Side</span>
          <span class="pnav-compass pnav-c-bottom">Wall</span>
          <span class="pnav-compass pnav-c-left">Side</span>
          <div class="navw-dot" id="pnav-dot"></div>
        </div>
        <div class="pnav-depth-row">
          <span class="pnav-depth-label">Depth</span>
          <input id="pnav-depth" type="range" min="-50" max="50" value="0" class="pnav-depth-slider" />
          <span id="pnav-depth-val" class="pnav-depth-val">0</span>
        </div>
        <div class="pnav-readout" id="pnav-readout">Drawing on: Floor</div>
      </div>
      <button class="navw-tab" id="pnav-tab" title="Toggle Canvas HUD">
        <span class="navw-tab-text">CANVAS</span>
      </button>
    `;

    this.padEl = this.element.querySelector('#pnav-pad') as HTMLElement;
    this.dotEl = this.element.querySelector('#pnav-dot') as HTMLElement;
    this.bodyEl = this.element.querySelector('#pnav-body') as HTMLElement;
    this.tabEl = this.element.querySelector('#pnav-tab') as HTMLElement;
    this.readoutEl = this.element.querySelector('#pnav-readout') as HTMLElement;
    this.depthValEl = this.element.querySelector('#pnav-depth-val') as HTMLElement;
    this.updateDot();
    this.updateReadout();
  }

  public setCollapsed(collapsed: boolean): void {
    this.isCollapsed = collapsed;
    this.bodyEl.classList.toggle('navw-collapsed', this.isCollapsed);
    this.tabEl.classList.toggle('navw-tab-collapsed', this.isCollapsed);
  }

  private bindEvents(): void {
    // Pull tab
    this.tabEl.addEventListener('click', (e) => {
      e.stopPropagation();
      this.setCollapsed(!this.isCollapsed);
    });

    // Presets
    this.element.querySelectorAll<HTMLButtonElement>('.pnav-preset').forEach(btn => {
      btn.addEventListener('click', () => {
        this.applyPreset(btn.getAttribute('data-preset')!);
        this.element.querySelectorAll('.pnav-preset').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });

    // Tilt pad drag
    this.padEl.addEventListener('pointerdown', (e: PointerEvent) => {
      this.isDragging = true;
      this.padEl.setPointerCapture(e.pointerId);
      this.handlePadMove(e);
    });
    this.padEl.addEventListener('pointermove', (e: PointerEvent) => {
      if (!this.isDragging) return;
      this.handlePadMove(e);
    });
    this.padEl.addEventListener('pointerup', () => { this.isDragging = false; });
    this.padEl.addEventListener('pointercancel', () => { this.isDragging = false; });
    this.padEl.addEventListener('dblclick', () => {
      this.applyPreset('floor');
      this.element.querySelectorAll('.pnav-preset').forEach(b =>
        b.classList.toggle('active', b.getAttribute('data-preset') === 'floor'));
    });

    // Depth
    const depthSlider = this.element.querySelector('#pnav-depth') as HTMLInputElement;
    depthSlider.addEventListener('input', () => {
      this.depth = parseFloat(depthSlider.value) / 10;
      this.depthValEl.textContent = depthSlider.value;
      this.applyToGuide();
    });
  }

  private handlePadMove(e: PointerEvent): void {
    const rect = this.padEl.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const radius = rect.width / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.min(Math.sqrt(dx * dx + dy * dy), radius);
    this.tiltPhi = (dist / radius) * (Math.PI / 2);
    this.tiltTheta = Math.atan2(dx, -dy);

    const maxR = radius - 12;
    const clampD = Math.min(dist, maxR);
    const angle = Math.atan2(dy, dx);
    this.dotEl.style.transform = `translate(calc(-50% + ${clampD * Math.cos(angle)}px), calc(-50% + ${clampD * Math.sin(angle)}px))`;

    this.updateActivePreset();
    this.applyToGuide();
  }

  private applyPreset(preset: string): void {
    switch (preset) {
      case 'floor':
        this.tiltPhi = 0; this.tiltTheta = 0; break;
      case 'wall':
        this.tiltPhi = Math.PI / 2; this.tiltTheta = 0;
        this.engine.viewport.setViewPreset('front'); break;
      case 'side':
        this.tiltPhi = Math.PI / 2; this.tiltTheta = Math.PI / 2;
        this.engine.viewport.setViewPreset('right'); break;
    }
    this.updateDot();
    this.applyToGuide();
    this.updateReadout();
  }

  private applyToGuide(): void {
    const gm = this.engine.guideManager;
    if (gm.mode !== 'plane') gm.setMode('plane');
    const normal = new THREE.Vector3(
      Math.sin(this.tiltPhi) * Math.sin(this.tiltTheta),
      Math.cos(this.tiltPhi),
      Math.sin(this.tiltPhi) * Math.cos(this.tiltTheta)
    ).normalize();
    const position = normal.clone().multiplyScalar(this.depth * 0.1);
    gm.planeGuide.setTransform(position, normal);
    this.updateReadout();
  }

  private updateDot(): void {
    const maxR = 42;
    const dist = (this.tiltPhi / (Math.PI / 2)) * maxR;
    const dx = dist * Math.sin(this.tiltTheta);
    const dy = -dist * Math.cos(this.tiltTheta);
    this.dotEl.style.transform = `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px))`;
  }

  private updateActivePreset(): void {
    const deg = Math.round(this.tiltPhi * 180 / Math.PI);
    let active = 'none';
    if (deg < 5) active = 'floor';
    else if (deg > 80) {
      const t = ((this.tiltTheta % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
      active = (t > Math.PI / 4 && t < Math.PI * 3 / 4) ? 'side' : 'wall';
    }
    this.element.querySelectorAll('.pnav-preset').forEach(b =>
      b.classList.toggle('active', b.getAttribute('data-preset') === active));
  }

  private updateReadout(): void {
    const deg = Math.round(this.tiltPhi * 180 / Math.PI);
    let name = 'Floor';
    if (deg >= 5) {
      const t = ((this.tiltTheta % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
      name = (t > Math.PI / 4 && t < Math.PI * 3 / 4) ? `Side (${deg} deg)` : `Wall (${deg} deg)`;
    }
    this.readoutEl.textContent = `Drawing on: ${name}`;
  }

  public refresh(): void {
    const n = this.engine.guideManager.planeGuide.normal;
    this.tiltPhi = Math.acos(Math.min(1, Math.abs(n.y)));
    this.tiltTheta = Math.atan2(n.x, n.z);
    this.updateDot();
    this.updateReadout();
    this.updateActivePreset();
  }
}
