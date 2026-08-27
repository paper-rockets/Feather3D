import * as THREE from 'three';
import { pass } from 'three/tsl';
import { bloom } from 'three/addons/tsl/display/BloomNode.js';
import { film } from 'three/addons/tsl/display/FilmNode.js';

export type AestheticPreset = 'minimalist' | 'cel_shaded' | 'low_poly' | 'glow' | 'cinematic_dof';

/**
 * Airbreath Rendering Engine
 *
 * Owns the scene lighting model (dynamic sun + soft shadows + ground shadow
 * plane), the aesthetic presets, and a WebGPU node-based post pipeline.
 *
 * WEBGPU-MIGRATION status:
 *  • Bloom (glow) + film grain: ported to node-based PostProcessing (below).
 *  • Toon outline + depth-of-field blur: still TODO — they need depth/normal
 *    passes and visual tuning. `sobel()`, `dof()`, and `pixelationPass()` from
 *    three/addons/tsl/display are the building blocks.
 *
 * Safety: post-processing is only used when at least one effect is enabled
 * (the default "minimalist" preset enables none, so the default render path is
 * the known-good direct renderAsync). Any failure building or running the post
 * pipeline falls back to a direct render — it can never black-screen.
 */
export class AirbreathEngine {
  private renderer: THREE.WebGPURenderer;
  private scene: THREE.Scene;
  private camera: THREE.Camera;

  // Lighting & Shadows
  public shadowLight: THREE.DirectionalLight;
  public ambientLight: THREE.AmbientLight;
  public shadowPlane: THREE.Mesh;

  // Effect state flags (mirrored by StagePanelUI).
  public isShadowsEnabled: boolean = true;
  public isToonOutlineEnabled: boolean = false;
  public isBloomEnabled: boolean = true;
  public isDoFEnabled: boolean = false;
  public isGrainEnabled: boolean = false;
  public isPixelEnabled: boolean = false;

  // Bloom / grain parameters (baked into the node graph on rebuild).
  private bloomStrength: number = 0.7;
  private bloomRadius: number = 0.35;
  private bloomThreshold: number = 0.85;
  private grainAmount: number = 0.12;

  // Node post-processing (null when no effect is active or setup failed).
  private post: THREE.PostProcessing | null = null;
  private postFailed: boolean = false;

  public currentPreset: AestheticPreset = 'minimalist';

  constructor(
    renderer: THREE.WebGPURenderer,
    scene: THREE.Scene,
    camera: THREE.Camera
  ) {
    this.renderer = renderer;
    this.scene = scene;
    this.camera = camera;

    // Soft shadows. `.type` differs between WebGL/WebGPU; cast to stay compatible.
    this.renderer.shadowMap.enabled = true;
    (this.renderer.shadowMap as any).type = THREE.PCFSoftShadowMap;

    // Directional Shadow Light
    this.shadowLight = new THREE.DirectionalLight(0xffffff, 1.2);
    this.shadowLight.position.set(6, 12, 8);
    this.shadowLight.castShadow = true;
    this.shadowLight.shadow.mapSize.width = 2048;
    this.shadowLight.shadow.mapSize.height = 2048;
    this.shadowLight.shadow.camera.near = 0.5;
    this.shadowLight.shadow.camera.far = 40;
    this.shadowLight.shadow.bias = -0.0005;
    this.shadowLight.shadow.radius = 2.0;

    const d = 12;
    this.shadowLight.shadow.camera.left = -d;
    this.shadowLight.shadow.camera.right = d;
    this.shadowLight.shadow.camera.top = d;
    this.shadowLight.shadow.camera.bottom = -d;
    this.scene.add(this.shadowLight);

    // Ambient Fill Light
    this.ambientLight = new THREE.AmbientLight(0xffffff, 0.75);
    this.scene.add(this.ambientLight);

    // Ground Shadow Receiver Plane
    const shadowGeo = new THREE.PlaneGeometry(60, 60);
    const shadowMat = new THREE.MeshStandardNodeMaterial({
      color: 0x000000,
      roughness: 1.0,
      metalness: 0.0,
      transparent: true,
      opacity: 0.08,
      depthWrite: false,
      side: THREE.DoubleSide
    });
    this.shadowPlane = new THREE.Mesh(shadowGeo, shadowMat);
    this.shadowPlane.rotation.x = -Math.PI / 2;
    this.shadowPlane.position.y = -0.001;
    this.shadowPlane.receiveShadow = true;
    this.scene.add(this.shadowPlane);

    // Default preset (minimalist -> no effects -> direct render).
    this.applyPreset('minimalist');
  }

  /** Whether any post effect that is actually implemented is enabled. */
  private anyEffectOn(): boolean {
    return this.isBloomEnabled || this.isGrainEnabled;
  }

  /**
   * (Re)build the node post pipeline from the current flags/params. Builds the
   * pipeline only when an effect is on; wraps everything so a failure disables
   * post cleanly rather than breaking rendering.
   */
  private rebuildPost(): void {
    this.post = null;
    this.postFailed = false;
    if (!this.anyEffectOn()) return;

    try {
      const post = new THREE.PostProcessing(this.renderer);
      const scenePass = pass(this.scene, this.camera);
      const color = scenePass.getTextureNode();

      let outputNode: any = color;
      if (this.isBloomEnabled) {
        outputNode = outputNode.add(
          bloom(color, this.bloomStrength, this.bloomRadius, this.bloomThreshold)
        );
      }
      if (this.isGrainEnabled) {
        outputNode = film(outputNode, this.grainAmount);
      }

      post.outputNode = outputNode;
      this.post = post;
    } catch (e) {
      console.warn('[Feather3D] Post-processing setup failed; using direct render.', e);
      this.post = null;
      this.postFailed = true;
    }
  }

  public updateCamera(camera: THREE.Camera): void {
    if (camera !== this.camera) {
      // Camera identity changed (e.g. perspective <-> orthographic). The scene
      // pass was built against the old camera, so rebuild.
      this.camera = camera;
      if (this.post) this.rebuildPost();
    } else {
      this.camera = camera;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public setSize(_width: number, _height: number): void {
    // PostProcessing follows the renderer size automatically — nothing to do.
  }

  /**
   * Apply Aesthetic Presets. Lighting applies immediately; effect flags/params
   * are set and the post pipeline is rebuilt once at the end.
   */
  public applyPreset(preset: AestheticPreset): void {
    this.currentPreset = preset;

    switch (preset) {
      case 'minimalist':
        this.isShadowsEnabled = false;
        this.isBloomEnabled = false;
        this.isDoFEnabled = false;
        this.isToonOutlineEnabled = false;
        this.isGrainEnabled = false;
        this.isPixelEnabled = false;
        this.ambientLight.intensity = 1.0;
        this.shadowLight.intensity = 0.6;
        break;

      case 'cel_shaded':
        this.isShadowsEnabled = true;
        this.isBloomEnabled = true;
        this.bloomStrength = 0.5; this.bloomRadius = 0.25; this.bloomThreshold = 0.9;
        this.isToonOutlineEnabled = true;
        this.isDoFEnabled = false;
        this.isGrainEnabled = false;
        this.isPixelEnabled = false;
        this.ambientLight.intensity = 0.65;
        this.shadowLight.intensity = 1.3;
        break;

      case 'low_poly':
        this.isShadowsEnabled = true;
        this.isBloomEnabled = false;
        this.isToonOutlineEnabled = false;
        this.isDoFEnabled = false;
        this.isGrainEnabled = false;
        this.isPixelEnabled = false;
        this.ambientLight.intensity = 0.55;
        this.shadowLight.intensity = 1.4;
        break;

      case 'glow':
        this.isShadowsEnabled = true;
        this.isBloomEnabled = true;
        this.bloomStrength = 1.6; this.bloomRadius = 0.5; this.bloomThreshold = 0.65;
        this.isToonOutlineEnabled = false;
        this.isDoFEnabled = false;
        this.isGrainEnabled = true; this.grainAmount = 0.1;
        this.isPixelEnabled = false;
        this.ambientLight.intensity = 0.35;
        this.shadowLight.intensity = 0.8;
        break;

      case 'cinematic_dof':
        this.isShadowsEnabled = true;
        this.isBloomEnabled = true;
        this.bloomStrength = 0.6; this.bloomRadius = 0.3; this.bloomThreshold = 0.85;
        this.isDoFEnabled = true;
        this.isToonOutlineEnabled = false;
        this.isGrainEnabled = true; this.grainAmount = 0.08;
        this.isPixelEnabled = false;
        this.ambientLight.intensity = 0.7;
        this.shadowLight.intensity = 1.2;
        break;
    }

    this.applyShadowState();
    this.rebuildPost();
  }

  private applyShadowState(): void {
    this.shadowLight.castShadow = this.isShadowsEnabled;
    this.shadowPlane.visible = this.isShadowsEnabled;
    this.renderer.shadowMap.enabled = this.isShadowsEnabled;
  }

  public setShadowsEnabled(enabled: boolean): void {
    this.isShadowsEnabled = enabled;
    this.applyShadowState();
  }

  public setToonOutlineEnabled(enabled: boolean, _strength: number = 0.65): void {
    // TODO(WEBGPU-MIGRATION): sobel-based ink outline pass not wired yet.
    this.isToonOutlineEnabled = enabled;
  }

  public setBloomEnabled(enabled: boolean): void {
    this.isBloomEnabled = enabled;
    this.rebuildPost();
  }

  public setBloomParams(strength: number, radius: number, threshold: number): void {
    this.bloomStrength = strength;
    this.bloomRadius = radius;
    this.bloomThreshold = threshold;
    this.rebuildPost();
  }

  public setDoFEnabled(enabled: boolean, _focus: number = 5.0, _aperture: number = 0.025, _maxblur: number = 0.015): void {
    // TODO(WEBGPU-MIGRATION): dof() blur pass not wired yet.
    this.isDoFEnabled = enabled;
  }

  public setGrainEnabled(enabled: boolean, amount: number = 0.12): void {
    this.isGrainEnabled = enabled;
    this.grainAmount = amount;
    this.rebuildPost();
  }

  public setPixelEnabled(enabled: boolean, _pixelSize: number = 4.0): void {
    // TODO(WEBGPU-MIGRATION): pixelationPass() not wired yet.
    this.isPixelEnabled = enabled;
  }

  public alignLightToCamera(camera: THREE.Camera): void {
    this.shadowLight.position.copy(camera.position);
    this.shadowLight.target.position.set(0, 0, 0);
  }

  public render(_delta: number = 0.016): Promise<void> {
    // Use the node post pipeline only when it built successfully; otherwise
    // render directly. Any runtime failure permanently falls back to direct
    // render so the app can never black-screen. The promise MUST be awaited by
    // the caller (Engine.startRenderLoop) so async submissions don't overlap.
    if (this.post && !this.postFailed) {
      return this.post.renderAsync().catch((e) => {
        console.warn('[Feather3D] Post render failed; falling back to direct render.', e);
        this.postFailed = true;
        this.post = null;
        return this.renderer.renderAsync(this.scene, this.camera);
      });
    }
    return this.renderer.renderAsync(this.scene, this.camera);
  }
}
