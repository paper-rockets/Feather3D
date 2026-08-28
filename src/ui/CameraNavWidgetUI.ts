import * as THREE from 'three';
import { Engine } from '../core/Engine';

export type CameraNavMode = 'orbit' | 'stick' | 'fps' | 'plane';

export class CameraNavWidgetUI {
  public element: HTMLElement;
  private engine: Engine;

  private currentMode: CameraNavMode = 'orbit';
  private isCollapsed: boolean = false;
  private hapticsEnabled: boolean = true;

  // DOM Elements
  private bodyEl!: HTMLElement;
  private tabEl!: HTMLElement;
  private modeTabs!: NodeListOf<HTMLButtonElement>;
  private panels!: { [key in CameraNavMode]: HTMLElement };
  private hapticBtn!: HTMLButtonElement;

  // Orbit Mode
  private orbitPadEl!: HTMLElement;
  private orbitDotEl!: HTMLElement;
  private isOrbitDragging: boolean = false;
  private lastOrbitX: number = 0;
  private lastOrbitY: number = 0;
  private lastSnapState: boolean = false;

  // Stick Mode
  private stickPadEl!: HTMLElement;
  private stickPuckEl!: HTMLElement;
  private isStickDragging: boolean = false;
  private stickDeltaX: number = 0;
  private stickDeltaY: number = 0;
  private stickAnimFrame: number | null = null;

  // FPS Mode
  private fpsPadEl!: HTMLElement;
  private fpsDotEl!: HTMLElement;
  private isFpsDragging: boolean = false;
  private lastFpsX: number = 0;
  private lastFpsY: number = 0;
  private fpsLookSensitivity: number = 1.0;
  private walkState = { fwd: false, back: false, left: false, right: false };
  private walkAnimFrame: number | null = null;

  // Plane Mode
  private planePadEl!: HTMLElement;
  private planeDotEl!: HTMLElement;
  private paperSheetEl!: HTMLElement;
  private planeReadoutEl!: HTMLElement;
  private planeDepthSlider!: HTMLInputElement;
  private planeDepthValEl!: HTMLElement;
  private isPlaneDragging: boolean = false;
  private tiltPhi: number = 0;
  private tiltTheta: number = 0;
  private depth: number = 0;
  private lastDepthNotch: number = 0;

  constructor(engine: Engine) {
    this.engine = engine;
    this.element = document.createElement('div');
    this.element.id = 'camera-nav-widget';
    this.element.className = 'navw';
    this.render();
    this.bindEvents();
    this.syncFromPlaneGuide();
    if (typeof window !== 'undefined' && window.innerWidth <= 768) {
      this.setCollapsed(true);
    }
  }

  private render(): void {
    this.element.innerHTML = `
      <div class="navw-body" id="cnav-body">
        <!-- Top Title Bar with Instant Hide Button -->
        <div class="cnav-widget-topbar">
          <span class="cnav-widget-title">NAVIGATOR</span>
          <button id="cnav-hide-card-btn" class="cnav-card-hide-btn" title="Hide Navigator">HIDE</button>
        </div>

        <!-- Unified 4-Mode Tab Row -->
        <div class="cnav-mode-tabs" role="tablist">
          <button class="cnav-tab-btn active" data-mode="orbit">Orbit</button>
          <button class="cnav-tab-btn" data-mode="stick">Stick</button>
          <button class="cnav-tab-btn" data-mode="fps">FPS</button>
          <button class="cnav-tab-btn" data-mode="plane">Plane</button>
        </div>

        <div class="cnav-content">
          <!-- Orbit Mode Panel -->
          <div class="cnav-panel active" id="cnav-panel-orbit">
            <div class="navw-header">
              <span class="navw-title">ORBIT</span>
              <div class="navw-zoom-row">
                <button class="navw-zbtn" id="cnav-zoom-out" title="Zoom Out">-</button>
                <button class="navw-zbtn" id="cnav-zoom-in" title="Zoom In">+</button>
              </div>
            </div>
            <div class="cnav-pad cnav-orbit-pad" id="cnav-orbit-pad">
              <svg class="cnav-triad-disc" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="54" fill="none" stroke="var(--bdr)" stroke-width="1.5" />
                <circle cx="60" cy="60" r="44" fill="none" stroke="#ef4444" stroke-width="2.5" stroke-dasharray="25 4" opacity="0.9" />
                <circle cx="60" cy="60" r="32" fill="none" stroke="#22c55e" stroke-width="2.5" stroke-dasharray="18 4" opacity="0.9" />
                <circle cx="60" cy="60" r="20" fill="none" stroke="#3b82f6" stroke-width="2.5" stroke-dasharray="12 3" opacity="0.9" />
                <line x1="60" y1="6" x2="60" y2="114" stroke="var(--mut)" stroke-width="1" stroke-dasharray="3 3" opacity="0.4" />
                <line x1="6" y1="60" x2="114" y2="60" stroke="var(--mut)" stroke-width="1" stroke-dasharray="3 3" opacity="0.4" />
              </svg>
              <span class="cnav-axis-lbl cnav-lbl-x">X</span>
              <span class="cnav-axis-lbl cnav-lbl-y">Y</span>
              <span class="cnav-axis-lbl cnav-lbl-z">Z</span>
              <div class="navw-dot" id="cnav-orbit-dot"></div>
            </div>
            <div class="cnav-hint">Drag to orbit. Double click resets ISO.</div>
          </div>

          <!-- Stick Mode Panel -->
          <div class="cnav-panel" id="cnav-panel-stick">
            <div class="navw-header">
              <span class="navw-title">PAN STICK</span>
            </div>
            <div class="cnav-pad cnav-stick-pad" id="cnav-stick-pad">
              <svg class="cnav-stick-guide" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="54" fill="none" stroke="var(--bdr)" stroke-width="1.5" />
                <circle cx="60" cy="60" r="28" fill="none" stroke="var(--mut)" stroke-width="1" stroke-dasharray="2 2" opacity="0.3" />
                <line x1="60" y1="8" x2="60" y2="112" stroke="var(--bdr)" stroke-width="1" />
                <line x1="8" y1="60" x2="112" y2="60" stroke="var(--bdr)" stroke-width="1" />
              </svg>
              <div class="cnav-stick-puck" id="cnav-stick-puck">
                <div class="cnav-stick-puck-inner"></div>
              </div>
            </div>
            <div class="cnav-hint">Hold and push to pan smoothly</div>
          </div>

          <!-- FPS Mode Panel -->
          <div class="cnav-panel" id="cnav-panel-fps">
            <div class="navw-header">
              <span class="navw-title">FIRST PERSON</span>
            </div>
            <div class="cnav-fps-container">
              <div class="cnav-pad cnav-fps-pad" id="cnav-fps-pad">
                <svg class="navw-crosshair" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" stroke-width="0.8"/>
                  <circle cx="50" cy="50" r="14" fill="none" stroke="currentColor" stroke-width="0.8"/>
                  <line x1="50" y1="10" x2="50" y2="90" stroke="currentColor" stroke-width="0.8"/>
                  <line x1="10" y1="50" x2="90" y2="50" stroke="currentColor" stroke-width="0.8"/>
                </svg>
                <div class="navw-dot" id="cnav-fps-dot"></div>
              </div>
              <div class="cnav-fps-sens-row">
                <span class="cnav-fps-sens-label">Sensitivity</span>
                <input type="range" id="cnav-fps-sens" min="0.2" max="2.5" step="0.1" value="1.0" class="cnav-slider" />
                <span id="cnav-fps-sens-val" class="cnav-slider-val">1.0x</span>
              </div>
              <div class="cnav-fps-walk-grid">
                <button class="cnav-walk-btn" id="cnav-walk-fwd">Fwd</button>
                <div class="cnav-walk-mid-row">
                  <button class="cnav-walk-btn" id="cnav-walk-left">Left</button>
                  <button class="cnav-walk-btn" id="cnav-walk-back">Back</button>
                  <button class="cnav-walk-btn" id="cnav-walk-right">Right</button>
                </div>
              </div>
            </div>
          </div>

          <!-- Plane Mode Panel -->
          <div class="cnav-panel" id="cnav-panel-plane">
            <div class="navw-header">
              <span class="navw-title">CANVAS</span>
              <div class="pnav-presets">
                <button class="pnav-preset active" data-preset="floor">Floor</button>
                <button class="pnav-preset" data-preset="wall">Wall</button>
                <button class="pnav-preset" data-preset="side">Side</button>
              </div>
            </div>
            <div class="cnav-pad cnav-plane-pad" id="cnav-plane-pad">
              <div class="cnav-paper-viewport" id="cnav-paper-viewport">
                <div class="cnav-paper-sheet" id="cnav-paper-sheet">
                  <div class="cnav-paper-grid"></div>
                  <div class="cnav-paper-origin-line"></div>
                </div>
              </div>
              <span class="pnav-compass pnav-c-top">Wall</span>
              <span class="pnav-compass pnav-c-right">Side</span>
              <span class="pnav-compass pnav-c-bottom">Wall</span>
              <span class="pnav-compass pnav-c-left">Side</span>
              <div class="navw-dot" id="cnav-plane-dot"></div>
            </div>
            <div class="pnav-depth-row">
              <span class="pnav-depth-label">Depth</span>
              <input id="cnav-plane-depth" type="range" min="-50" max="50" value="0" class="pnav-depth-slider" />
              <span id="cnav-plane-depth-val" class="pnav-depth-val">0</span>
            </div>
            <div class="pnav-readout" id="cnav-plane-readout">Drawing on: Floor</div>
            <div style="display: flex; gap: 4px; margin-top: 6px;">
              <button class="btn btn-sm" id="cnav-toggle-plane-btn" style="flex: 1; font-weight: 700; height: 26px; border-radius: 0px; background: var(--accent, #2563eb); color: #fff;">PLANE: VISIBLE</button>
            </div>
          </div>
        </div>

        <!-- Haptics Toggle Row -->
        <div class="cnav-haptic-row">
          <span class="cnav-haptic-label">Haptics</span>
          <button class="cnav-haptic-btn active" id="cnav-haptic-btn">Haptics: ON</button>
        </div>
      </div>

      <!-- Collapsible Pull Tab -->
      <button class="navw-tab" id="cnav-tab" title="Toggle Navigation Widget">
        <span class="cnav-tab-label">NAV</span>
      </button>
    `;

    this.bodyEl = this.element.querySelector('#cnav-body') as HTMLElement;
    this.tabEl = this.element.querySelector('#cnav-tab') as HTMLElement;
    this.modeTabs = this.element.querySelectorAll<HTMLButtonElement>('.cnav-tab-btn');
    this.hapticBtn = this.element.querySelector('#cnav-haptic-btn') as HTMLButtonElement;

    this.panels = {
      orbit: this.element.querySelector('#cnav-panel-orbit') as HTMLElement,
      stick: this.element.querySelector('#cnav-panel-stick') as HTMLElement,
      fps: this.element.querySelector('#cnav-panel-fps') as HTMLElement,
      plane: this.element.querySelector('#cnav-panel-plane') as HTMLElement
    };

    // Orbit elements
    this.orbitPadEl = this.element.querySelector('#cnav-orbit-pad') as HTMLElement;
    this.orbitDotEl = this.element.querySelector('#cnav-orbit-dot') as HTMLElement;

    // Stick elements
    this.stickPadEl = this.element.querySelector('#cnav-stick-pad') as HTMLElement;
    this.stickPuckEl = this.element.querySelector('#cnav-stick-puck') as HTMLElement;

    // FPS elements
    this.fpsPadEl = this.element.querySelector('#cnav-fps-pad') as HTMLElement;
    this.fpsDotEl = this.element.querySelector('#cnav-fps-dot') as HTMLElement;

    // Plane elements
    this.planePadEl = this.element.querySelector('#cnav-plane-pad') as HTMLElement;
    this.planeDotEl = this.element.querySelector('#cnav-plane-dot') as HTMLElement;
    this.paperSheetEl = this.element.querySelector('#cnav-paper-sheet') as HTMLElement;
    this.planeReadoutEl = this.element.querySelector('#cnav-plane-readout') as HTMLElement;
    this.planeDepthSlider = this.element.querySelector('#cnav-plane-depth') as HTMLInputElement;
    this.planeDepthValEl = this.element.querySelector('#cnav-plane-depth-val') as HTMLElement;
  }

  public triggerHaptic(duration: number = 15): void {
    if (this.hapticsEnabled && typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate([duration]);
      } catch (_) {}
    }
  }

  public setMode(mode: CameraNavMode): void {
    this.currentMode = mode;
    this.modeTabs.forEach(tab => {
      tab.classList.toggle('active', tab.getAttribute('data-mode') === mode);
    });

    Object.entries(this.panels).forEach(([m, panel]) => {
      panel.classList.toggle('active', m === mode);
    });

    if (mode === 'plane') {
      const gm = this.engine.guideManager;
      if (gm.mode !== 'plane') gm.setMode('plane');
      this.syncFromPlaneGuide();
    }

    this.triggerHaptic(15);
  }

  public get isCardCollapsed(): boolean {
    return this.isCollapsed;
  }

  public setCollapsed(collapsed: boolean): void {
    this.isCollapsed = collapsed;
    this.bodyEl.classList.toggle('navw-collapsed', this.isCollapsed);
    this.tabEl.classList.toggle('navw-tab-flipped', this.isCollapsed);
    const label = this.tabEl.querySelector('.cnav-tab-label');
    if (label) {
      label.textContent = this.isCollapsed ? 'NAV: OPEN' : 'NAV';
    }
  }

  public toggleCollapse(): void {
    this.setCollapsed(!this.isCollapsed);
  }

  public getMode(): CameraNavMode {
    return this.currentMode;
  }

  private bindEvents(): void {
    const vp = this.engine.viewport;

    // Instant Hide button in topbar
    this.element.querySelector('#cnav-hide-card-btn')?.addEventListener('click', (e) => {
      e.stopPropagation();
      this.setCollapsed(true);
    });

    // Pull tab collapse/expand
    this.tabEl.addEventListener('click', (e) => {
      e.stopPropagation();
      this.toggleCollapse();
    });

    // Mode tabs
    this.modeTabs.forEach(btn => {
      btn.addEventListener('click', () => {
        const mode = btn.getAttribute('data-mode') as CameraNavMode;
        if (mode) this.setMode(mode);
      });
    });

    // Haptics toggle
    this.hapticBtn.addEventListener('click', () => {
      this.hapticsEnabled = !this.hapticsEnabled;
      this.hapticBtn.classList.toggle('active', this.hapticsEnabled);
      this.hapticBtn.textContent = this.hapticsEnabled ? 'Haptics: ON' : 'Haptics: OFF';
      if (this.hapticsEnabled) {
        this.triggerHaptic(20);
      }
    });

    // --- ORBIT MODE EVENTS ---
    this.orbitPadEl.addEventListener('pointerdown', (e: PointerEvent) => {
      this.isOrbitDragging = true;
      this.lastOrbitX = e.clientX;
      this.lastOrbitY = e.clientY;
      this.orbitPadEl.setPointerCapture(e.pointerId);
      this.moveDot(this.orbitPadEl, this.orbitDotEl, e);
    });

    this.orbitPadEl.addEventListener('pointermove', (e: PointerEvent) => {
      if (!this.isOrbitDragging) return;
      this.handleOrbitMove(e);
    });

    const endOrbitDrag = () => {
      this.isOrbitDragging = false;
      this.orbitDotEl.style.transform = 'translate(-50%, -50%)';
    };
    this.orbitPadEl.addEventListener('pointerup', endOrbitDrag);
    this.orbitPadEl.addEventListener('pointercancel', endOrbitDrag);

    this.orbitPadEl.addEventListener('dblclick', () => {
      vp.setViewPreset('iso');
      this.triggerHaptic(15);
    });

    this.element.querySelector('#cnav-zoom-in')?.addEventListener('click', () => {
      vp.zoom(1.25);
      this.triggerHaptic(10);
    });
    this.element.querySelector('#cnav-zoom-out')?.addEventListener('click', () => {
      vp.zoom(1 / 1.25);
      this.triggerHaptic(10);
    });

    // --- STICK MODE EVENTS ---
    this.stickPadEl.addEventListener('pointerdown', (e: PointerEvent) => {
      this.isStickDragging = true;
      this.stickPadEl.setPointerCapture(e.pointerId);
      this.handleStickMove(e);
    });

    this.stickPadEl.addEventListener('pointermove', (e: PointerEvent) => {
      if (!this.isStickDragging) return;
      this.handleStickMove(e);
    });

    const endStickDrag = () => {
      this.resetStickPuck();
    };
    this.stickPadEl.addEventListener('pointerup', endStickDrag);
    this.stickPadEl.addEventListener('pointercancel', endStickDrag);

    // --- FPS MODE EVENTS ---
    this.fpsPadEl.addEventListener('pointerdown', (e: PointerEvent) => {
      this.isFpsDragging = true;
      this.lastFpsX = e.clientX;
      this.lastFpsY = e.clientY;
      this.fpsPadEl.setPointerCapture(e.pointerId);
      this.moveDot(this.fpsPadEl, this.fpsDotEl, e);
    });

    this.fpsPadEl.addEventListener('pointermove', (e: PointerEvent) => {
      if (!this.isFpsDragging) return;
      const dx = e.clientX - this.lastFpsX;
      const dy = e.clientY - this.lastFpsY;
      vp.orbit(dx * this.fpsLookSensitivity * 1.5, dy * this.fpsLookSensitivity * 1.5);
      this.lastFpsX = e.clientX;
      this.lastFpsY = e.clientY;
      this.moveDot(this.fpsPadEl, this.fpsDotEl, e);
    });

    const endFpsDrag = () => {
      this.isFpsDragging = false;
      this.fpsDotEl.style.transform = 'translate(-50%, -50%)';
    };
    this.fpsPadEl.addEventListener('pointerup', endFpsDrag);
    this.fpsPadEl.addEventListener('pointercancel', endFpsDrag);

    // FPS Sensitivity slider
    const sensSlider = this.element.querySelector('#cnav-fps-sens') as HTMLInputElement;
    const sensValEl = this.element.querySelector('#cnav-fps-sens-val') as HTMLElement;
    sensSlider.addEventListener('input', () => {
      this.fpsLookSensitivity = parseFloat(sensSlider.value);
      sensValEl.textContent = `${this.fpsLookSensitivity.toFixed(1)}x`;
    });

    // FPS Walk Buttons
    this.bindWalkButton('cnav-walk-fwd', 'fwd');
    this.bindWalkButton('cnav-walk-back', 'back');
    this.bindWalkButton('cnav-walk-left', 'left');
    this.bindWalkButton('cnav-walk-right', 'right');

    // --- PLANE MODE EVENTS ---
    this.element.querySelectorAll<HTMLButtonElement>('#cnav-panel-plane .pnav-preset').forEach(btn => {
      btn.addEventListener('click', () => {
        const preset = btn.getAttribute('data-preset');
        if (preset) this.applyPlanePreset(preset);
      });
    });

    this.planePadEl.addEventListener('pointerdown', (e: PointerEvent) => {
      this.isPlaneDragging = true;
      this.planePadEl.setPointerCapture(e.pointerId);
      this.handlePlanePadMove(e);
    });

    this.planePadEl.addEventListener('pointermove', (e: PointerEvent) => {
      if (!this.isPlaneDragging) return;
      this.handlePlanePadMove(e);
    });

    const endPlaneDrag = () => {
      this.isPlaneDragging = false;
    };
    this.planePadEl.addEventListener('pointerup', endPlaneDrag);
    this.planePadEl.addEventListener('pointercancel', endPlaneDrag);

    this.planePadEl.addEventListener('dblclick', () => {
      this.applyPlanePreset('floor');
    });

    this.planeDepthSlider.addEventListener('input', () => {
      const rawVal = parseInt(this.planeDepthSlider.value, 10);
      this.depth = rawVal / 10;
      this.planeDepthValEl.textContent = this.planeDepthSlider.value;

      const notch = Math.round(rawVal / 10) * 10;
      if (rawVal === notch && notch !== this.lastDepthNotch) {
        this.triggerHaptic(10);
        this.lastDepthNotch = notch;
      }

      this.applyToPlaneGuide();
    });

    const planeVisBtn = this.element.querySelector('#cnav-toggle-plane-btn') as HTMLButtonElement;
    if (planeVisBtn) {
      planeVisBtn.addEventListener('click', () => {
        const gm = this.engine.guideManager;
        const currentVis = gm.planeGuide.group.visible;
        gm.planeGuide.setVisible(!currentVis);
        planeVisBtn.textContent = !currentVis ? 'PLANE: VISIBLE' : 'PLANE: HIDDEN';
        planeVisBtn.style.background = !currentVis ? 'var(--accent, #2563eb)' : 'var(--btn-subtle, rgba(0,0,0,0.06))';
        planeVisBtn.style.color = !currentVis ? '#ffffff' : 'var(--mut, #666)';
      });
    }
  }

  private handleOrbitMove(e: PointerEvent): void {
    const dx = e.clientX - this.lastOrbitX;
    const dy = e.clientY - this.lastOrbitY;
    this.engine.viewport.orbit(dx * 1.5, dy * 1.5);
    this.lastOrbitX = e.clientX;
    this.lastOrbitY = e.clientY;
    this.moveDot(this.orbitPadEl, this.orbitDotEl, e);

    const isPerfect = this.engine.viewport.isPerfectView();
    if (isPerfect && !this.lastSnapState) {
      this.triggerHaptic(15);
    }
    this.lastSnapState = isPerfect;
  }

  private handleStickMove(e: PointerEvent): void {
    const rect = this.stickPadEl.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const maxR = rect.width / 2 - 16;
    let dx = e.clientX - cx;
    let dy = e.clientY - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist > maxR && dist > 0) {
      dx = (dx / dist) * maxR;
      dy = (dy / dist) * maxR;
    }
    this.stickPuckEl.style.transform = `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px))`;
    this.stickDeltaX = maxR > 0 ? dx / maxR : 0;
    this.stickDeltaY = maxR > 0 ? dy / maxR : 0;

    this.startStickLoop();
  }

  private startStickLoop(): void {
    if (this.stickAnimFrame !== null) return;
    const loop = () => {
      if (this.isStickDragging && (Math.abs(this.stickDeltaX) > 0.04 || Math.abs(this.stickDeltaY) > 0.04)) {
        const speed = 10.0 * (this.engine.viewport.radius / 5.0);
        this.engine.viewport.pan(this.stickDeltaX * speed, -this.stickDeltaY * speed);
        this.stickAnimFrame = requestAnimationFrame(loop);
      } else if (this.isStickDragging) {
        this.stickAnimFrame = requestAnimationFrame(loop);
      } else {
        this.stickAnimFrame = null;
      }
    };
    this.stickAnimFrame = requestAnimationFrame(loop);
  }

  private resetStickPuck(): void {
    this.isStickDragging = false;
    this.stickDeltaX = 0;
    this.stickDeltaY = 0;
    this.stickPuckEl.style.transform = 'translate(-50%, -50%)';
    if (this.stickAnimFrame !== null) {
      cancelAnimationFrame(this.stickAnimFrame);
      this.stickAnimFrame = null;
    }
  }

  private bindWalkButton(buttonId: string, direction: 'fwd' | 'back' | 'left' | 'right'): void {
    const btn = this.element.querySelector(`#${buttonId}`) as HTMLButtonElement;
    if (!btn) return;

    const startWalk = (e: Event) => {
      e.preventDefault();
      this.walkState[direction] = true;
      btn.classList.add('walking');
      this.triggerHaptic(10);
      this.startWalkLoop();
    };

    const stopWalk = (e: Event) => {
      e.preventDefault();
      this.walkState[direction] = false;
      btn.classList.remove('walking');
    };

    btn.addEventListener('pointerdown', startWalk);
    btn.addEventListener('pointerup', stopWalk);
    btn.addEventListener('pointercancel', stopWalk);
    btn.addEventListener('pointerleave', stopWalk);
  }

  private startWalkLoop(): void {
    if (this.walkAnimFrame !== null) return;
    const loop = () => {
      const { fwd, back, left, right } = this.walkState;
      if (fwd || back || left || right) {
        const forward = new THREE.Vector3();
        this.engine.viewport.camera.getWorldDirection(forward);
        forward.y = 0;
        if (forward.lengthSq() > 0.0001) {
          forward.normalize();
        } else {
          forward.set(0, 0, -1);
        }

        const rightVec = new THREE.Vector3().crossVectors(forward, new THREE.Vector3(0, 1, 0)).normalize();
        const move = new THREE.Vector3();
        const walkSpeed = 0.08 * (this.engine.viewport.radius / 5.0);

        if (fwd) move.addScaledVector(forward, walkSpeed);
        if (back) move.addScaledVector(forward, -walkSpeed);
        if (right) move.addScaledVector(rightVec, walkSpeed);
        if (left) move.addScaledVector(rightVec, -walkSpeed);

        this.engine.viewport.target.add(move);
        (this.engine.viewport as any).targetLookAt?.add(move);
        this.engine.viewport.updateCameraPosition();

        this.walkAnimFrame = requestAnimationFrame(loop);
      } else {
        this.walkAnimFrame = null;
      }
    };
    this.walkAnimFrame = requestAnimationFrame(loop);
  }

  private handlePlanePadMove(e: PointerEvent): void {
    const rect = this.planePadEl.getBoundingClientRect();
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
    this.planeDotEl.style.transform = `translate(calc(-50% + ${clampD * Math.cos(angle)}px), calc(-50% + ${clampD * Math.sin(angle)}px))`;

    this.updatePaperSheetTransform();
    this.updateActivePlanePreset();
    this.applyToPlaneGuide();
  }

  public applyPlanePreset(preset: string): void {
    switch (preset) {
      case 'floor':
        this.tiltPhi = 0;
        this.tiltTheta = 0;
        break;
      case 'wall':
        this.tiltPhi = Math.PI / 2;
        this.tiltTheta = 0;
        this.engine.viewport.setViewPreset('front');
        break;
      case 'side':
        this.tiltPhi = Math.PI / 2;
        this.tiltTheta = Math.PI / 2;
        this.engine.viewport.setViewPreset('right');
        break;
    }
    this.updatePlaneDot();
    this.updatePaperSheetTransform();
    this.applyToPlaneGuide();
    this.updatePlaneReadout();
    this.triggerHaptic(15);
  }

  private updatePaperSheetTransform(): void {
    const degPhi = (this.tiltPhi * 180) / Math.PI;
    const degTheta = (this.tiltTheta * 180) / Math.PI;
    const rotX = 70 - degPhi * (70 / 90);
    this.paperSheetEl.style.transform = `rotateX(${rotX}deg) rotateZ(${-degTheta}deg)`;
  }

  private applyToPlaneGuide(): void {
    const gm = this.engine.guideManager;
    if (gm.mode !== 'plane') gm.setMode('plane');
    const normal = new THREE.Vector3(
      Math.sin(this.tiltPhi) * Math.sin(this.tiltTheta),
      Math.cos(this.tiltPhi),
      Math.sin(this.tiltPhi) * Math.cos(this.tiltTheta)
    ).normalize();
    const position = normal.clone().multiplyScalar(this.depth * 0.1);
    gm.planeGuide.setTransform(position, normal);
    this.updatePlaneReadout();
  }

  private updatePlaneDot(): void {
    const maxR = 42;
    const dist = (this.tiltPhi / (Math.PI / 2)) * maxR;
    const dx = dist * Math.sin(this.tiltTheta);
    const dy = -dist * Math.cos(this.tiltTheta);
    this.planeDotEl.style.transform = `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px))`;
  }

  private updateActivePlanePreset(): void {
    const deg = Math.round((this.tiltPhi * 180) / Math.PI);
    let active = 'none';
    if (deg < 5) active = 'floor';
    else if (deg > 80) {
      const t = (((this.tiltTheta % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2));
      active = (t > Math.PI / 4 && t < Math.PI * 3 / 4) ? 'side' : 'wall';
    }
    this.element.querySelectorAll('#cnav-panel-plane .pnav-preset').forEach(b => {
      b.classList.toggle('active', b.getAttribute('data-preset') === active);
    });
  }

  private updatePlaneReadout(): void {
    const deg = Math.round((this.tiltPhi * 180) / Math.PI);
    let name = 'Floor';
    if (deg >= 5) {
      const t = (((this.tiltTheta % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2));
      const isSide = (t > Math.PI / 4 && t < Math.PI * 3 / 4) || (t > Math.PI * 5 / 4 && t < Math.PI * 7 / 4);
      name = isSide ? `Side (${deg} deg)` : `Wall (${deg} deg)`;
    }
    this.planeReadoutEl.textContent = `Drawing on: ${name}`;
  }

  public syncFromPlaneGuide(): void {
    const n = this.engine.guideManager.planeGuide.normal;
    this.tiltPhi = Math.acos(Math.min(1, Math.abs(n.y)));
    this.tiltTheta = Math.atan2(n.x, n.z);
    this.updatePlaneDot();
    this.updatePaperSheetTransform();
    this.updatePlaneReadout();
    this.updateActivePlanePreset();
  }

  public refresh(): void {
    this.syncFromPlaneGuide();
  }

  private moveDot(pad: HTMLElement, dot: HTMLElement, e: PointerEvent): void {
    const rect = pad.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const maxR = rect.width / 2 - 12;
    let dx = e.clientX - cx;
    let dy = e.clientY - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist > maxR && dist > 0) {
      dx = (dx / dist) * maxR;
      dy = (dy / dist) * maxR;
    }
    dot.style.transform = `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px))`;
  }

  public dispose(): void {
    if (this.stickAnimFrame !== null) {
      cancelAnimationFrame(this.stickAnimFrame);
      this.stickAnimFrame = null;
    }
    if (this.walkAnimFrame !== null) {
      cancelAnimationFrame(this.walkAnimFrame);
      this.walkAnimFrame = null;
    }
  }
}
