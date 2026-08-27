import * as THREE from 'three';
import { CurvePoint } from '../math/CurveMath';

export interface PointerDrawCallbacks {
  onPointerDrawStart: (point: CurvePoint, ndc: THREE.Vector2, e: PointerEvent) => void;
  onPointerDrawMove: (point: CurvePoint, ndc: THREE.Vector2, e: PointerEvent) => void;
  onPointerDrawEnd: (e: PointerEvent) => void;
  onStylusBarrelButton?: (screenX: number, screenY: number, e: PointerEvent) => void;
  onStylusButtonToggle?: (isPressed: boolean, screenX: number, screenY: number, e: PointerEvent) => void;
  onStylusHover?: (screenX: number, screenY: number, ndc: THREE.Vector2) => void;
  /** Fired when a stylus/pen goes down (true) or lifts (false) so navigation
   *  gestures can suppress 1-finger orbit while the pen is drawing. */
  onPenActiveChange?: (active: boolean) => void;
}

export class InputManager {
  private element: HTMLElement;
  private callbacks: PointerDrawCallbacks;
  private activePointerId: number | null = null;
  public isStylusActive: boolean = false;
  public isFingerPenMode: boolean = false;
  public isBarrelButtonPressed: boolean = false;
  public minPressure: number = 0.05;

  public onFingerPenChange?: (enabled: boolean) => void;

  constructor(element: HTMLElement, callbacks: PointerDrawCallbacks) {
    this.element = element;
    this.callbacks = callbacks;
    this.bindEvents();
  }

  public setFingerPenMode(enabled: boolean): void {
    if (this.isFingerPenMode === enabled) return;
    this.isFingerPenMode = enabled;
    if (this.onFingerPenChange) this.onFingerPenChange(enabled);
  }

  private bindEvents(): void {
    if (this.element && this.element.addEventListener) {
      this.element.addEventListener('pointerdown', this.onPointerDown.bind(this));
      // Prevent default Android S-Pen / browser right-click context menu
      this.element.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        return false;
      });
      if (this.element.style) {
        this.element.style.touchAction = 'none';
      }
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('pointermove', this.onPointerMove.bind(this));
      window.addEventListener('pointerup', this.onPointerUp.bind(this));
      window.addEventListener('pointercancel', this.onPointerUp.bind(this));
    }
  }


  private getNDC(clientX: number, clientY: number): THREE.Vector2 {
    const rect = this.element.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 2 - 1;
    const y = -(((clientY - rect.top) / rect.height) * 2 - 1);
    return new THREE.Vector2(x, y);
  }

  private extractCurvePoint(e: PointerEvent): CurvePoint {
    let pressure = e.pressure;

    if (e.pointerType === 'pen') {
      pressure = e.pressure > 0 ? e.pressure : 0.5;
    } else if (e.pointerType === 'mouse') {
      pressure = e.buttons > 0 ? 0.5 : 0.0;
    } else {
      // Touch (when Finger-Pen is enabled)
      pressure = e.pressure > 0 ? e.pressure : 0.5;
    }

    const tiltX = e.tiltX || 0;
    const tiltY = e.tiltY || 0;

    return {
      position: new THREE.Vector3(e.clientX, e.clientY, 0),
      pressure: Math.max(this.minPressure, pressure),
      tilt: new THREE.Vector2(tiltX, tiltY),
      time: performance.now()
    };
  }

  private isStylusBarrelButtonEvent(e: PointerEvent): boolean {
    return e.pointerType === 'pen' && (
      e.button === 2 ||
      e.button === 5 ||
      (e.buttons & 2) !== 0 ||
      (e.buttons & 32) !== 0
    );
  }

  private onPointerDown(e: PointerEvent): void {
    // S-Pen / Stylus barrel button press detection
    if (this.isStylusBarrelButtonEvent(e)) {
      this.isBarrelButtonPressed = true;
      if (this.callbacks.onStylusBarrelButton) {
        this.callbacks.onStylusBarrelButton(e.clientX, e.clientY, e);
      }
      if (this.callbacks.onStylusButtonToggle) {
        this.callbacks.onStylusButtonToggle(true, e.clientX, e.clientY, e);
      }
      if (e.cancelable) e.preventDefault();
      return;
    }

    // Mouse: Only left-click draws (button 0); right and middle click are reserved for Viewport navigation
    if (e.pointerType === 'mouse' && e.button !== 0) return;

    if (e.pointerType === 'pen') {
      this.isStylusActive = true;
      if (this.callbacks.onPenActiveChange) this.callbacks.onPenActiveChange(true);
      if (e.cancelable) e.preventDefault();
    }

    // Touch: draws ONLY when Finger-Pen is enabled. Otherwise, let TouchGestureManager handle navigation.
    if (e.pointerType === 'touch') {
      if (!this.isFingerPenMode) {
        return;
      }
      if (e.cancelable) e.preventDefault();
    }

    this.activePointerId = e.pointerId;
    try {
      this.element.setPointerCapture(e.pointerId);
    } catch (err) {
      // Ignore pointer capture error
    }

    const pt = this.extractCurvePoint(e);
    const ndc = this.getNDC(e.clientX, e.clientY);
    this.callbacks.onPointerDrawStart(pt, ndc, e);
  }

  private onPointerMove(e: PointerEvent): void {
    // Track S-Pen button state transitions during hover or drag
    if (e.pointerType === 'pen') {
      const isButtonPressed = (e.buttons & 2) !== 0 || (e.buttons & 32) !== 0;
      if (isButtonPressed !== this.isBarrelButtonPressed) {
        this.isBarrelButtonPressed = isButtonPressed;
        if (this.callbacks.onStylusButtonToggle) {
          this.callbacks.onStylusButtonToggle(isButtonPressed, e.clientX, e.clientY, e);
        }
        if (isButtonPressed && this.callbacks.onStylusBarrelButton) {
          this.callbacks.onStylusBarrelButton(e.clientX, e.clientY, e);
        }
      }
    }

    if (this.activePointerId !== e.pointerId) {
      // S-Pen / Stylus Hover detection
      if (e.pointerType === 'pen' && this.callbacks.onStylusHover) {
        const ndc = this.getNDC(e.clientX, e.clientY);
        this.callbacks.onStylusHover(e.clientX, e.clientY, ndc);
      }
      return;
    }

    // High-frequency capture via coalesced events if available
    const samples = typeof e.getCoalescedEvents === 'function' ? e.getCoalescedEvents() : [];
    const events = samples.length > 0 ? samples : [e];

    for (const sample of events) {
      const pt = this.extractCurvePoint(sample);
      const ndc = this.getNDC(sample.clientX, sample.clientY);
      this.callbacks.onPointerDrawMove(pt, ndc, sample);
    }
  }

  private onPointerUp(e: PointerEvent): void {
    if (e.pointerType === 'pen') {
      if (this.isBarrelButtonPressed) {
        this.isBarrelButtonPressed = false;
        if (this.callbacks.onStylusButtonToggle) {
          this.callbacks.onStylusButtonToggle(false, e.clientX, e.clientY, e);
        }
      }
      if (this.callbacks.onPenActiveChange) {
        this.callbacks.onPenActiveChange(false);
      }
    }

    if (this.activePointerId === e.pointerId) {
      try {
        if (this.element.hasPointerCapture(e.pointerId)) {
          this.element.releasePointerCapture(e.pointerId);
        }
      } catch (err) {
        // Ignore capture release error
      }

      this.activePointerId = null;
      if (e.pointerType === 'pen') {
        this.isStylusActive = false;
      }
      this.callbacks.onPointerDrawEnd(e);
    }
  }

  public cancelCurrentPointer(): void {
    this.activePointerId = null;
    this.isStylusActive = false;
    this.isBarrelButtonPressed = false;
  }
}

