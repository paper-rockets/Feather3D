export interface TouchGestureCallbacks {
  onTwoFingerPan?: (deltaX: number, deltaY: number) => void;
  onTwoFingerZoom?: (zoomFactor: number) => void;
  onTwoFingerRotate?: (deltaAngle: number) => void;
  onThreeFingerTap?: () => void;
  onThreeFingerDoubleTap?: () => void;
  onThreeFingerSwipe?: (direction: 'left' | 'right' | 'up' | 'down', delta: number) => void;
  onOneFingerOrbit?: (deltaX: number, deltaY: number) => void;
  onOneFingerDoubleTap?: () => void;
  onOneFingerHoldPinOrbit?: (screenX: number, screenY: number) => void;
  onGestureCancelDrawing?: () => void;
}

export class TouchGestureManager {
  private element: HTMLElement;
  private callbacks: TouchGestureCallbacks;
  private initialTouchCount: number = 0;
  private touchStartTime: number = 0;
  private touchStartPositions: Array<{ x: number; y: number }> = [];
  private prevPinchDistance: number = 0;
  private prevPinchAngle: number = 0;
  private prevMidpoint: { x: number; y: number } = { x: 0, y: 0 };
  private prevSingleTouch: { x: number; y: number } = { x: 0, y: 0 };
  private holdTimer: number | null = null;
  private lastThreeFingerTapTime: number = 0;
  private lastSingleTapTime: number = 0;
  private lastSingleTapPos: { x: number; y: number } | null = null;

  public isPenActive: boolean = false;
  public isFingerPenMode: boolean = false;

  constructor(element: HTMLElement, callbacks: TouchGestureCallbacks = {}) {
    this.element = element;
    this.callbacks = callbacks;
    this.bindEvents();
  }

  public setPenActive(active: boolean): void {
    this.isPenActive = active;
  }

  public setFingerPenMode(enabled: boolean): void {
    this.isFingerPenMode = enabled;
  }

  private bindEvents(): void {
    const opts = { passive: false };

    this.element.addEventListener('touchstart', this.onTouchStart.bind(this), opts);
    window.addEventListener('touchmove', this.onTouchMove.bind(this), opts);
    window.addEventListener('touchend', this.onTouchEnd.bind(this), opts);
    window.addEventListener('touchcancel', this.onTouchEnd.bind(this), opts);
  }

  private onTouchStart(e: TouchEvent): void {
    this.initialTouchCount = e.touches.length;
    this.touchStartTime = Date.now();
    this.touchStartPositions = [];

    for (let i = 0; i < e.touches.length; i++) {
      this.touchStartPositions.push({
        x: e.touches[i].clientX,
        y: e.touches[i].clientY
      });
    }

    if (e.touches.length === 1 && !this.isPenActive && !this.isFingerPenMode) {
      this.prevSingleTouch = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
      };

      // 1-Finger Press and Hold to Pin Orbit Point (after 600ms)
      this.clearHoldTimer();
      const holdX = e.touches[0].clientX;
      const holdY = e.touches[0].clientY;
      this.holdTimer = window.setTimeout(() => {
        if (this.callbacks.onOneFingerHoldPinOrbit) {
          this.callbacks.onOneFingerHoldPinOrbit(holdX, holdY);
        }
      }, 600);
    } else {
      this.clearHoldTimer();
    }

    if (e.touches.length >= 2) {
      if (this.callbacks.onGestureCancelDrawing) {
        this.callbacks.onGestureCancelDrawing();
      }

      const t0 = e.touches[0];
      const t1 = e.touches[1];
      this.prevPinchDistance = Math.hypot(t1.clientX - t0.clientX, t1.clientY - t0.clientY);
      this.prevPinchAngle = Math.atan2(t1.clientY - t0.clientY, t1.clientX - t0.clientX);
      this.prevMidpoint = {
        x: (t0.clientX + t1.clientX) * 0.5,
        y: (t0.clientY + t1.clientY) * 0.5
      };
    }
  }

  private clearHoldTimer(): void {
    if (this.holdTimer !== null) {
      clearTimeout(this.holdTimer);
      this.holdTimer = null;
    }
  }

  private onTouchMove(e: TouchEvent): void {
    if (e.touches.length === 1) {
      const t0 = e.touches[0];
      const moveDist = Math.hypot(t0.clientX - this.prevSingleTouch.x, t0.clientY - this.prevSingleTouch.y);
      if (moveDist > 8) {
        this.clearHoldTimer();
      }

      if (!this.isPenActive && !this.isFingerPenMode) {
        const dx = t0.clientX - this.prevSingleTouch.x;
        const dy = t0.clientY - this.prevSingleTouch.y;

        if (this.callbacks.onOneFingerOrbit && (Math.abs(dx) > 0.5 || Math.abs(dy) > 0.5)) {
          this.callbacks.onOneFingerOrbit(dx, dy);
        }
        this.prevSingleTouch = { x: t0.clientX, y: t0.clientY };
      }
    } else if (e.touches.length === 2) {
      this.clearHoldTimer();
      e.preventDefault();
      const t0 = e.touches[0];
      const t1 = e.touches[1];

      // Pan midpoint delta
      const midX = (t0.clientX + t1.clientX) * 0.5;
      const midY = (t0.clientY + t1.clientY) * 0.5;
      const panDeltaX = midX - this.prevMidpoint.x;
      const panDeltaY = midY - this.prevMidpoint.y;

      if (this.callbacks.onTwoFingerPan && (Math.abs(panDeltaX) > 0.5 || Math.abs(panDeltaY) > 0.5)) {
        this.callbacks.onTwoFingerPan(panDeltaX, panDeltaY);
      }
      this.prevMidpoint = { x: midX, y: midY };

      // Pinch zoom
      const currentDist = Math.hypot(t1.clientX - t0.clientX, t1.clientY - t0.clientY);
      if (this.prevPinchDistance > 0 && this.callbacks.onTwoFingerZoom) {
        const zoomDelta = currentDist / this.prevPinchDistance;
        if (Math.abs(zoomDelta - 1.0) > 0.005) {
          this.callbacks.onTwoFingerZoom(zoomDelta);
        }
      }
      this.prevPinchDistance = currentDist;

      // Two-finger rotate
      const currentAngle = Math.atan2(t1.clientY - t0.clientY, t1.clientX - t0.clientX);
      let angleDelta = currentAngle - this.prevPinchAngle;
      if (angleDelta > Math.PI) angleDelta -= Math.PI * 2;
      if (angleDelta < -Math.PI) angleDelta += Math.PI * 2;

      if (this.callbacks.onTwoFingerRotate && Math.abs(angleDelta) > 0.01) {
        this.callbacks.onTwoFingerRotate(angleDelta);
      }
      this.prevPinchAngle = currentAngle;
    } else if (e.touches.length === 3) {
      this.clearHoldTimer();
      e.preventDefault();

      if (this.touchStartPositions.length >= 3) {
        const currentAvgY = (e.touches[0].clientY + e.touches[1].clientY + e.touches[2].clientY) / 3;
        const startAvgY = (this.touchStartPositions[0].y + this.touchStartPositions[1].y + this.touchStartPositions[2].y) / 3;
        const deltaY = currentAvgY - startAvgY;

        const currentAvgX = (e.touches[0].clientX + e.touches[1].clientX + e.touches[2].clientX) / 3;
        const startAvgX = (this.touchStartPositions[0].x + this.touchStartPositions[1].x + this.touchStartPositions[2].x) / 3;
        const deltaX = currentAvgX - startAvgX;

        if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > 10) {
          if (this.callbacks.onThreeFingerSwipe) {
            this.callbacks.onThreeFingerSwipe(deltaY > 0 ? 'down' : 'up', deltaY);
          }
        } else if (Math.abs(deltaX) > 25) {
          if (this.callbacks.onThreeFingerSwipe) {
            this.callbacks.onThreeFingerSwipe(deltaX > 0 ? 'right' : 'left', deltaX);
          }
        }
      }
    }
  }

  private onTouchEnd(e: TouchEvent): void {
    this.clearHoldTimer();
    const elapsed = Date.now() - this.touchStartTime;

    // 1-finger double tap -> Perfect View Snap
    if (this.initialTouchCount === 1 && elapsed < 300 && !this.isFingerPenMode) {
      const now = Date.now();
      const t0 = this.touchStartPositions[0];
      const dist = t0 && this.lastSingleTapPos
        ? Math.hypot(t0.x - this.lastSingleTapPos.x, t0.y - this.lastSingleTapPos.y)
        : Infinity;

      if (now - this.lastSingleTapTime < 350 && dist < 30) {
        if (this.callbacks.onOneFingerDoubleTap) {
          this.callbacks.onOneFingerDoubleTap();
        }
        this.lastSingleTapTime = 0;
      } else {
        this.lastSingleTapTime = now;
        this.lastSingleTapPos = t0 ? { x: t0.x, y: t0.y } : null;
      }
    }

    // 3-finger tap / double tap
    if (this.initialTouchCount === 3 && elapsed < 350) {
      const now = Date.now();
      if (now - this.lastThreeFingerTapTime < 350) {
        // 3-Finger Double Tap = Projection Toggle
        if (this.callbacks.onThreeFingerDoubleTap) {
          this.callbacks.onThreeFingerDoubleTap();
        }
        this.lastThreeFingerTapTime = 0;
      } else {
        this.lastThreeFingerTapTime = now;
        if (this.callbacks.onThreeFingerTap) {
          this.callbacks.onThreeFingerTap();
        }
      }
    }

    if (e.touches.length === 0) {
      this.initialTouchCount = 0;
      this.touchStartPositions = [];
    }
  }
}
