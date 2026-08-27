import * as THREE from 'three';

export type CameraPreset = 'front' | 'back' | 'left' | 'right' | 'top' | 'bottom' | 'iso';

export class Viewport {
  public container: HTMLElement;
  public canvas: HTMLCanvasElement;
  // WEBGPU-MIGRATION: WebGPURenderer auto-selects a WebGPU backend and falls
  // back to WebGL2 when navigator.gpu is unavailable. It requires an async
  // init() before the first render (see Viewport.init()).
  public renderer: THREE.WebGPURenderer;
  public backendName: 'webgpu' | 'webgl2' | 'unknown' = 'unknown';
  public camera: THREE.PerspectiveCamera;
  public orthoCamera: THREE.OrthographicCamera;
  public activeCamera: THREE.Camera;
  public target: THREE.Vector3;
  public radius: number = 5.0;
  public theta: number = Math.PI * 0.25; // Horizontal angle
  public phi: number = Math.PI * 0.35;   // Vertical angle
  public isDamping: boolean = true;
  public isOrthographic: boolean = false;
  public isWebGPU: boolean = false;
  public focalLengthMm: number = 50; // Standard 50mm

  public onPerfectViewChange?: (isPerfect: boolean, collapsedAxis: 'x' | 'y' | 'z' | null) => void;

  private targetTheta: number;
  private targetPhi: number;
  private targetRadius: number;
  private targetLookAt: THREE.Vector3;

  private isRightMouseDown: boolean = false;
  private isMiddleMouseDown: boolean = false;
  private prevMousePos: { x: number; y: number } = { x: 0, y: 0 };
  private lastPerfectState: boolean = false;

  constructor(container: HTMLElement) {
    this.container = container;
    this.canvas = typeof document !== 'undefined'
      ? document.createElement('canvas')
      : ({ style: {}, addEventListener: () => {}, removeEventListener: () => {}, getContext: () => null } as any);
    if (this.container && this.container.appendChild && typeof document !== 'undefined') {
      this.container.appendChild(this.canvas);
    }

    // Detect WebGPU availability
    this.isWebGPU = typeof navigator !== 'undefined' && 'gpu' in navigator;

    // WEBGPU-MIGRATION: construct the WebGPURenderer. The GPU device/context is
    // acquired asynchronously in init() — nothing may render before that
    // resolves. WebGPURenderer transparently falls back to a WebGL2 backend
    // when navigator.gpu is unavailable.
    // NOTE: preserveDrawingBuffer is not a WebGPU parameter; thumbnail/PNG
    // capture must move to renderer.readRenderTargetPixelsAsync() (export phase).
    this.renderer = new THREE.WebGPURenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });

    const width = typeof window !== 'undefined' ? window.innerWidth : 800;
    const height = typeof window !== 'undefined' ? window.innerHeight : 600;
    const dpr = typeof window !== 'undefined' ? Math.min(window.devicePixelRatio || 1, 2) : 1;
    this.renderer.setPixelRatio(dpr);
    this.renderer.setSize(width, height);
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.0;

    // Perspective Camera (near plane 0.1 optimizes 24-bit z-buffer depth precision)
    this.camera = new THREE.PerspectiveCamera(
      45,
      width / height,
      0.1,
      1000
    );

    // Orthographic Camera
    const aspect = width / height;
    const frustumSize = 4.0;
    this.orthoCamera = new THREE.OrthographicCamera(
      (-frustumSize * aspect) / 2,
      (frustumSize * aspect) / 2,
      frustumSize / 2,
      -frustumSize / 2,
      0.1,
      1000
    );

    this.activeCamera = this.camera;

    this.target = new THREE.Vector3(0, 0.5, 0);
    this.targetLookAt = this.target.clone();
    this.targetTheta = this.theta;
    this.targetPhi = this.phi;
    this.targetRadius = this.radius;

    this.updateCameraPosition();
    this.bindNavigationEvents();
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', this.onResize.bind(this));
    }
  }

  /**
   * WEBGPU-MIGRATION: acquire the GPU device/context asynchronously. Must be
   * awaited before the first render. Resolves the actual bound backend
   * (WebGPU vs the WebGL2 fallback) for diagnostics.
   */
  public async init(): Promise<void> {
    await this.renderer.init();
    // Report the ACTUAL bound backend (not just navigator.gpu availability):
    // WebGPURenderer may still fall back to WebGL2 even when navigator.gpu
    // exists (e.g. adapter request fails).
    const backend: any = (this.renderer as any).backend;
    this.backendName = backend?.isWebGPUBackend ? 'webgpu' : 'webgl2';
    const dpr = typeof window !== 'undefined' ? Math.min(window.devicePixelRatio || 1, 2) : 1;
    this.renderer.setPixelRatio(dpr);
    // Full resize (renderer + camera aspect). init() runs at DOMContentLoaded,
    // which can precede CSS layout, so the WebGPU swapchain would otherwise be
    // configured against a 0-size canvas. Re-apply on the next animation frame
    // once layout has settled to guarantee a non-zero backing surface.
    this.onResize();
    if (typeof requestAnimationFrame !== 'undefined') {
      requestAnimationFrame(() => this.onResize());
    }
    console.log(
      `[Feather3D] Renderer backend: ${this.backendName.toUpperCase()}` +
        (this.backendName === 'webgl2'
          ? ' (WebGPU unavailable — running in compatibility mode)'
          : '')
    );
  }

  private bindNavigationEvents(): void {
    if (typeof window === 'undefined') return;

    // Wheel zoom
    this.canvas.addEventListener?.('wheel', (e: WheelEvent) => {
      e.preventDefault();
      const zoomFactor = e.deltaY > 0 ? 0.9 : 1.1;
      this.zoom(zoomFactor);
    }, { passive: false });

    // Right-click orbit & Middle-click pan
    this.canvas.addEventListener?.('mousedown', (e: MouseEvent) => {
      if (e.button === 2) {
        this.isRightMouseDown = true;
        this.prevMousePos = { x: e.clientX, y: e.clientY };
      } else if (e.button === 1) {
        this.isMiddleMouseDown = true;
        this.prevMousePos = { x: e.clientX, y: e.clientY };
      }
    });

    window.addEventListener('mousemove', (e: MouseEvent) => {
      if (this.isRightMouseDown) {
        const dx = e.clientX - this.prevMousePos.x;
        const dy = e.clientY - this.prevMousePos.y;
        this.orbit(dx, dy);
        this.prevMousePos = { x: e.clientX, y: e.clientY };
      } else if (this.isMiddleMouseDown) {
        const dx = e.clientX - this.prevMousePos.x;
        const dy = e.clientY - this.prevMousePos.y;
        this.pan(dx, dy);
        this.prevMousePos = { x: e.clientX, y: e.clientY };
      }
    });

    window.addEventListener('mouseup', (e: MouseEvent) => {
      if (e.button === 2) this.isRightMouseDown = false;
      if (e.button === 1) this.isMiddleMouseDown = false;
    });

    this.canvas.addEventListener?.('contextmenu', (e: any) => e.preventDefault());
  }

  public updateCameraPosition(): void {
    const x = this.target.x + this.radius * Math.sin(this.phi) * Math.sin(this.theta);
    const y = this.target.y + this.radius * Math.cos(this.phi);
    const z = this.target.z + this.radius * Math.sin(this.phi) * Math.cos(this.theta);

    this.camera.position.set(x, y, z);
    this.camera.lookAt(this.target);

    this.orthoCamera.position.set(x, y, z);
    this.orthoCamera.lookAt(this.target);

    // Update orthographic frustum based on radius
    const aspect = typeof window !== 'undefined' ? (window.innerWidth / window.innerHeight) : 1.333;
    const frustumSize = this.radius * 0.8;
    this.orthoCamera.left = (-frustumSize * aspect) / 2;
    this.orthoCamera.right = (frustumSize * aspect) / 2;
    this.orthoCamera.top = frustumSize / 2;
    this.orthoCamera.bottom = -frustumSize / 2;
    this.orthoCamera.updateProjectionMatrix();

    this.checkPerfectView();
  }

  public setOrbitPoint(point: THREE.Vector3): void {
    this.targetLookAt.copy(point);
    this.target.copy(point);
    this.updateCameraPosition();
  }

  public setFocalLengthMm(mm: number): void {
    this.focalLengthMm = THREE.MathUtils.clamp(mm, 10, 500);
    // Standard 35mm film aperture = 24mm height
    const fovRad = 2 * Math.atan(24 / (2 * this.focalLengthMm));
    this.camera.fov = THREE.MathUtils.radToDeg(fovRad);
    this.camera.updateProjectionMatrix();
  }

  public toggleProjection(): boolean {
    this.isOrthographic = !this.isOrthographic;
    this.activeCamera = this.isOrthographic ? this.orthoCamera : this.camera;
    this.updateCameraPosition();
    return this.isOrthographic;
  }

  public checkPerfectView(): void {
    const isPerf = this.isPerfectView();
    const axis = this.getPerfectViewAxis();
    if (isPerf !== this.lastPerfectState) {
      this.lastPerfectState = isPerf;
      if (this.onPerfectViewChange) {
        this.onPerfectViewChange(isPerf, axis);
      }
    }
  }

  public isPerfectView(): boolean {
    const eps = 0.05; // ~3 degrees
    const isTop = Math.abs(this.phi) < eps;
    const isBottom = Math.abs(this.phi - Math.PI) < eps;
    const isEquatorial = Math.abs(this.phi - Math.PI * 0.5) < eps;

    if (isTop || isBottom) return true;
    if (isEquatorial) {
      const normTheta = ((this.theta % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
      const isFront = Math.abs(normTheta) < eps || Math.abs(normTheta - Math.PI * 2) < eps;
      const isBack = Math.abs(normTheta - Math.PI) < eps;
      const isRight = Math.abs(normTheta - Math.PI * 0.5) < eps;
      const isLeft = Math.abs(normTheta - Math.PI * 1.5) < eps;
      return isFront || isBack || isRight || isLeft;
    }
    return false;
  }

  public getPerfectViewAxis(): 'x' | 'y' | 'z' | null {
    const eps = 0.05;
    const isTop = Math.abs(this.phi) < eps;
    const isBottom = Math.abs(this.phi - Math.PI) < eps;
    if (isTop || isBottom) return 'y';

    const isEquatorial = Math.abs(this.phi - Math.PI * 0.5) < eps;
    if (isEquatorial) {
      const normTheta = ((this.theta % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
      const isFront = Math.abs(normTheta) < eps || Math.abs(normTheta - Math.PI * 2) < eps;
      const isBack = Math.abs(normTheta - Math.PI) < eps;
      if (isFront || isBack) return 'z';

      const isRight = Math.abs(normTheta - Math.PI * 0.5) < eps;
      const isLeft = Math.abs(normTheta - Math.PI * 1.5) < eps;
      if (isRight || isLeft) return 'x';
    }
    return null;
  }

  public update(delta: number = 0.016): void {
    if (this.isDamping) {
      const factor = 0.2;
      this.theta += (this.targetTheta - this.theta) * factor;
      this.phi += (this.targetPhi - this.phi) * factor;
      this.radius += (this.targetRadius - this.radius) * factor;
      this.target.lerp(this.targetLookAt, factor);
      this.updateCameraPosition();
    }
  }

  public orbit(deltaX: number, deltaY: number): void {
    this.targetTheta -= deltaX * 0.008;
    this.targetPhi -= deltaY * 0.008;
    this.targetPhi = THREE.MathUtils.clamp(this.targetPhi, 0.01, Math.PI - 0.01);
    if (!this.isDamping) {
      this.theta = this.targetTheta;
      this.phi = this.targetPhi;
      this.updateCameraPosition();
    }
  }

  public pan(deltaX: number, deltaY: number): void {
    const forward = new THREE.Vector3().subVectors(this.target, this.camera.position).normalize();
    const right = new THREE.Vector3().crossVectors(forward, this.camera.up).normalize();
    const up = new THREE.Vector3().crossVectors(right, forward).normalize();

    const factor = this.radius * 0.002;
    const move = right.clone().multiplyScalar(-deltaX * factor).add(up.clone().multiplyScalar(deltaY * factor));

    this.targetLookAt.add(move);
    if (!this.isDamping) {
      this.target.copy(this.targetLookAt);
      this.updateCameraPosition();
    }
  }

  public zoom(factor: number): void {
    this.targetRadius = THREE.MathUtils.clamp(this.targetRadius / factor, 0.2, 50.0);
    if (!this.isDamping) {
      this.radius = this.targetRadius;
      this.updateCameraPosition();
    }
  }

  public snapToNearestPerfectView(): void {
    const currentPhi = ((this.targetPhi % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
    if (currentPhi < Math.PI * 0.25) {
      this.setViewPreset('top');
      return;
    }
    if (currentPhi > Math.PI * 0.75) {
      this.setViewPreset('bottom');
      return;
    }

    const normTheta = ((this.targetTheta % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
    const candidates: Array<{ preset: CameraPreset; angle: number }> = [
      { preset: 'front', angle: 0 },
      { preset: 'right', angle: Math.PI * 0.5 },
      { preset: 'back', angle: Math.PI },
      { preset: 'left', angle: Math.PI * 1.5 },
      { preset: 'front', angle: Math.PI * 2 }
    ];

    let closestPreset: CameraPreset = 'front';
    let minDiff = Infinity;
    for (const c of candidates) {
      const diff = Math.abs(normTheta - c.angle);
      if (diff < minDiff) {
        minDiff = diff;
        closestPreset = c.preset;
      }
    }
    this.setViewPreset(closestPreset);
  }

  public setViewPreset(preset: CameraPreset): void {
    switch (preset) {
      case 'front':
        this.targetTheta = 0;
        this.targetPhi = Math.PI * 0.5;
        break;
      case 'back':
        this.targetTheta = Math.PI;
        this.targetPhi = Math.PI * 0.5;
        break;
      case 'left':
        this.targetTheta = -Math.PI * 0.5;
        this.targetPhi = Math.PI * 0.5;
        break;
      case 'right':
        this.targetTheta = Math.PI * 0.5;
        this.targetPhi = Math.PI * 0.5;
        break;
      case 'top':
        this.targetTheta = 0;
        this.targetPhi = 0.01;
        break;
      case 'bottom':
        this.targetTheta = 0;
        this.targetPhi = Math.PI - 0.01;
        break;
      case 'iso':
      default:
        this.targetTheta = Math.PI * 0.25;
        this.targetPhi = Math.PI * 0.35;
        break;
    }
  }

  public unprojectScreenPointToPlane(ndc: THREE.Vector2, plane: THREE.Plane): THREE.Vector3 | null {
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(ndc, this.activeCamera);
    const targetPoint = new THREE.Vector3();
    const hit = raycaster.ray.intersectPlane(plane, targetPoint);
    return hit ? targetPoint : null;
  }

  public onResize(): void {
    const width = typeof window !== 'undefined' ? window.innerWidth : 800;
    const height = typeof window !== 'undefined' ? window.innerHeight : 600;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    const aspect = width / height;
    const frustumSize = this.radius * 0.8;
    this.orthoCamera.left = (-frustumSize * aspect) / 2;
    this.orthoCamera.right = (frustumSize * aspect) / 2;
    this.orthoCamera.top = frustumSize / 2;
    this.orthoCamera.bottom = -frustumSize / 2;
    this.orthoCamera.updateProjectionMatrix();

    this.renderer.setSize(width, height);
  }

  public dispose(): void {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.onResize);
    }
    this.renderer.dispose();
  }
}
