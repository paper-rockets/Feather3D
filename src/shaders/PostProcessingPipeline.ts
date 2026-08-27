import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';

const FilmGrainShader = {
  uniforms: {
    tDiffuse: { value: null },
    uAmount: { value: 0.15 },
    uTime: { value: 0.0 }
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D tDiffuse;
    uniform float uAmount;
    uniform float uTime;
    varying vec2 vUv;

    float rand(vec2 co) {
      return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
    }

    void main() {
      vec4 color = texture2D(tDiffuse, vUv);
      float noise = (rand(vUv + fract(uTime)) - 0.5) * uAmount;
      color.rgb += noise;
      gl_FragColor = color;
    }
  `
};

const PixelationShader = {
  uniforms: {
    tDiffuse: { value: null },
    uPixelSize: { value: 1.0 },
    uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D tDiffuse;
    uniform float uPixelSize;
    uniform vec2 uResolution;
    varying vec2 vUv;

    void main() {
      if (uPixelSize <= 1.0) {
        gl_FragColor = texture2D(tDiffuse, vUv);
        return;
      }
      vec2 dxy = uPixelSize / uResolution;
      vec2 coord = dxy * floor(vUv / dxy);
      gl_FragColor = texture2D(tDiffuse, coord);
    }
  `
};

export interface PostProcessingOptions {
  enableBloom?: boolean;
  bloomStrength?: number;
  bloomRadius?: number;
  bloomThreshold?: number;
  enableGrain?: boolean;
  grainAmount?: number;
  enablePixelation?: boolean;
  pixelSize?: number;
}

export class PostProcessingPipeline {
  private composer: EffectComposer;
  private renderPass: RenderPass;
  private bloomPass: UnrealBloomPass;
  private grainPass: ShaderPass;
  private pixelPass: ShaderPass;
  private outputPass: OutputPass;

  public isBloomEnabled: boolean = true;
  public isGrainEnabled: boolean = false;
  public isPixelEnabled: boolean = false;

  constructor(
    // WEBGPU-MIGRATION: DEAD CODE. This legacy WebGL EffectComposer pipeline is
    // no longer constructed (Engine dropped it) and is superseded by
    // AirbreathEngine + the upcoming node-based PostProcessing port. The WebGPU
    // build does not export WebGLRenderer, so the param is typed loosely to keep
    // the (unused) file compiling until it is replaced/removed.
    renderer: any,
    scene: THREE.Scene,
    camera: THREE.Camera,
    options: PostProcessingOptions = {}
  ) {
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.composer = new EffectComposer(renderer);

    this.renderPass = new RenderPass(scene, camera);
    this.composer.addPass(this.renderPass);

    const strength = options.bloomStrength ?? 0.8;
    const radius = options.bloomRadius ?? 0.4;
    const threshold = options.bloomThreshold ?? 0.85;

    this.bloomPass = new UnrealBloomPass(
      new THREE.Vector2(width, height),
      strength,
      radius,
      threshold
    );
    this.bloomPass.enabled = options.enableBloom ?? true;
    this.composer.addPass(this.bloomPass);

    this.grainPass = new ShaderPass(FilmGrainShader);
    this.grainPass.uniforms.uAmount.value = options.grainAmount ?? 0.15;
    this.grainPass.enabled = options.enableGrain ?? false;
    this.composer.addPass(this.grainPass);

    this.pixelPass = new ShaderPass(PixelationShader);
    this.pixelPass.uniforms.uPixelSize.value = options.pixelSize ?? 4.0;
    this.pixelPass.uniforms.uResolution.value.set(width, height);
    this.pixelPass.enabled = options.enablePixelation ?? false;
    this.composer.addPass(this.pixelPass);

    this.outputPass = new OutputPass();
    this.composer.addPass(this.outputPass);
  }

  public setSize(width: number, height: number): void {
    this.composer.setSize(width, height);
    this.bloomPass.resolution.set(width, height);
    this.pixelPass.uniforms.uResolution.value.set(width, height);
  }

  public setBloomEnabled(enabled: boolean): void {
    this.isBloomEnabled = enabled;
    this.bloomPass.enabled = enabled;
  }

  public setBloomParams(strength: number, radius: number, threshold: number): void {
    this.bloomPass.strength = strength;
    this.bloomPass.radius = radius;
    this.bloomPass.threshold = threshold;
  }

  public setGrainEnabled(enabled: boolean, amount: number = 0.15): void {
    this.isGrainEnabled = enabled;
    this.grainPass.enabled = enabled;
    this.grainPass.uniforms.uAmount.value = amount;
  }

  public setPixelationEnabled(enabled: boolean, size: number = 4.0): void {
    this.isPixelEnabled = enabled;
    this.pixelPass.enabled = enabled;
    this.pixelPass.uniforms.uPixelSize.value = size;
  }

  public render(delta: number = 0.016): void {
    if (this.grainPass.enabled) {
      this.grainPass.uniforms.uTime.value += delta;
    }
    this.composer.render(delta);
  }
}
