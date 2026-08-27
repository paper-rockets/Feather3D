import { Engine } from '../core/Engine';
import { FeatherProjectSerializer } from '../io/FeatherProjectSerializer';
import { GLTFExporterService } from '../io/GLTFExporterService';
import { OBJExporterService } from '../io/OBJExporterService';
import { USDZExporterService } from '../io/USDZExporterService';
import { STLExporterService } from '../io/STLExporterService';
import { ImageRenderer } from '../io/ImageRenderer';
import { TurntableRecorder } from '../io/TurntableRecorder';

export class ExportModal {
  public element: HTMLElement;
  private engine: Engine;
  private isVisible: boolean = false;
  private turntable: TurntableRecorder;

  constructor(engine: Engine) {
    this.engine = engine;
    this.turntable = new TurntableRecorder();
    this.element = document.createElement('div');
    this.element.className = 'modal-overlay';
    this.element.style.display = 'none';

    this.render();
    this.bindEvents();
  }

  public show(): void {
    this.isVisible = true;
    this.element.style.display = 'flex';
  }

  public hide(): void {
    this.isVisible = false;
    this.element.style.display = 'none';
  }

  private render(): void {
    this.element.innerHTML = `
      <div class="modal-card">
        <div class="modal-header">
          <span class="modal-title">EXPORT / SAVE PROJECT</span>
          <button id="btn-close-export" class="btn btn-sm">CLOSE</button>
        </div>

        <div style="font-size: 11px; font-weight: 700; margin-bottom: 8px; color: var(--mut);">3D FORMATS</div>
        <div class="modal-grid">
          <button id="btn-export-glb" class="btn">GLTF / GLB BINARY</button>
          <button id="btn-export-obj" class="btn">WAVEFRONT OBJ</button>
          <button id="btn-export-usdz" class="btn">USDZ (APPLE AR)</button>
          <button id="btn-export-stl" class="btn">STL (3D PRINT)</button>
        </div>

        <div style="font-size: 11px; font-weight: 700; margin-bottom: 8px; color: var(--mut);">PROJECT & MEDIA</div>
        <div class="modal-grid">
          <button id="btn-export-feather" class="btn">SAVE PROJECT (.JSON)</button>
          <button id="btn-export-png" class="btn">HIGH-RES PNG (2X)</button>
          <button id="btn-export-video" class="btn">360 TURNTABLE VIDEO</button>
          <label class="btn" style="cursor: pointer; text-align: center;">
            OPEN PROJECT (.JSON)
            <input id="input-open-feather" type="file" accept=".json,.wandrlust,.feather" style="display: none;">
          </label>
        </div>
      </div>
    `;
  }

  private bindEvents(): void {
    this.element.querySelector('#btn-close-export')?.addEventListener('click', () => this.hide());
    this.element.addEventListener('click', (e) => {
      if (e.target === this.element) this.hide();
    });

    // GLB Export
    this.element.querySelector('#btn-export-glb')?.addEventListener('click', async () => {
      await GLTFExporterService.exportGLB(this.engine.stageManager.rootGroup);
      this.hide();
    });

    // OBJ Export
    this.element.querySelector('#btn-export-obj')?.addEventListener('click', () => {
      OBJExporterService.exportOBJ(this.engine.stageManager.rootGroup);
      this.hide();
    });

    // USDZ Export
    this.element.querySelector('#btn-export-usdz')?.addEventListener('click', async () => {
      await USDZExporterService.exportUSDZ(this.engine.stageManager.rootGroup);
      this.hide();
    });

    // STL Export
    this.element.querySelector('#btn-export-stl')?.addEventListener('click', () => {
      STLExporterService.exportSTL(this.engine.stageManager.rootGroup);
      this.hide();
    });

    // Save Project JSON
    this.element.querySelector('#btn-export-feather')?.addEventListener('click', () => {
      const json = FeatherProjectSerializer.serialize(
        this.engine.stageManager,
        this.engine.environment,
        this.engine.viewport
      );
      FeatherProjectSerializer.downloadFile(json, 'sketch.json');
      this.hide();
    });

    // High-Res PNG
    this.element.querySelector('#btn-export-png')?.addEventListener('click', () => {
      ImageRenderer.capturePNG(
        this.engine.viewport.renderer,
        this.engine.scene,
        this.engine.viewport.camera,
        2
      );
      this.hide();
    });

    // 360 Video
    this.element.querySelector('#btn-export-video')?.addEventListener('click', () => {
      this.turntable.startRecording(this.engine.viewport, 4000, undefined, () => {
        // finished
      });
      this.hide();
    });

    // Open Project JSON
    const openInput = this.element.querySelector('#input-open-feather') as HTMLInputElement;
    openInput?.addEventListener('change', (e) => {
      const files = (e.target as HTMLInputElement).files;
      if (files && files.length > 0) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const content = event.target?.result as string;
          if (content) {
            FeatherProjectSerializer.deserialize(
              content,
              this.engine.stageManager,
              this.engine.environment,
              this.engine.viewport
            );
            this.hide();
          }
        };
        reader.readAsText(files[0]);
      }
    });
  }
}
