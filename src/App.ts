import { Engine } from './core/Engine';
import { UIManager } from './ui/UIManager';
import { DiagnosticsHarness } from './debug/DiagnosticsHarness';

export class App {
  public engine: Engine;
  public uiManager: UIManager;
  public container: HTMLElement;
  public diagnostics: DiagnosticsHarness;

  constructor(root: HTMLElement) {
    this.container = document.createElement('div');
    this.container.id = 'canvas-container';
    root.appendChild(this.container);

    this.engine = new Engine(this.container);
    this.uiManager = new UIManager(root, this.engine);
    this.diagnostics = new DiagnosticsHarness(this);

    // Debug handle for diagnostics/dev tooling.
    (window as any).__feather = this;
    (window as any).loadNatureScene = (sceneType?: any, skyPreset?: any) => this.engine.loadNatureScene({ sceneType, skyPreset });

    // WEBGPU-MIGRATION: kick off async renderer init (acquires the WebGPU/WebGL2
    // backend) then starts the render loop. Errors are surfaced to the console.
    this.ready = this.engine.init().catch((err) => {
      console.error('[Feather3D] Renderer initialization failed:', err);
    });
  }

  public ready: Promise<void>;
}
