import { Engine } from '../core/Engine';
import { icon } from './icons';

export class StagePanelUI {
  public element: HTMLElement;
  private engine: Engine;
  private activeTab: 'layers' | 'resources' | 'env' = 'layers';
  public isVisible: boolean = false;
  public onGuideTutorialClick?: () => void;
  public onClose?: () => void;

  constructor(engine: Engine) {
    this.engine = engine;
    this.element = document.createElement('div');
    this.element.id = 'stage-panel';
    this.element.className = 'stage-dropdown-flyout';
    this.element.style.display = 'none';

    this.render();
  }

  public show(): void {
    this.isVisible = true;
    this.element.style.display = 'flex';
    this.element.classList.add('open');
    this.refresh();
  }

  public hide(): void {
    this.isVisible = false;
    this.element.style.display = 'none';
    this.element.classList.remove('open');
    if (this.onClose) this.onClose();
  }

  public toggle(): void {
    if (this.isVisible) {
      this.hide();
    } else {
      this.show();
    }
  }

  public refresh(): void {
    this.render();
  }

  private render(): void {
    this.element.innerHTML = `
      <!-- Top Action Bar with Close Button -->
      <div class="stage-header-actions">
        <div class="stage-header-left">
          <button id="btn-stage-trash" class="stage-action-btn btn-trash-action" title="Delete Active Layer">${icon('trash')}</button>
          <button id="btn-stage-dup" class="stage-action-btn" title="Duplicate Layer">${icon('duplicate')}</button>
          <button id="btn-stage-focus" class="stage-action-btn" title="Center View on Object">${icon('cubeCenter')}</button>
        </div>
        <button id="btn-stage-close" class="btn-stage-close-action" title="Close Panel">CLOSE</button>
      </div>

      <!-- 3 Green-Highlighted Icon Tabs -->
      <div class="stage-tab-header">
        <button id="tab-layers" class="stage-tab-btn ${this.activeTab === 'layers' ? 'active' : ''}" title="Layers & Groups">
          <span class="stage-tab-label">LAYERS</span>
          ${this.activeTab === 'layers' ? '<div class="tab-active-indicator"></div>' : ''}
        </button>
        <button id="tab-resources" class="stage-tab-btn ${this.activeTab === 'resources' ? 'active' : ''}" title="Resources & References">
          <span class="stage-tab-label">RESOURCES</span>
          ${this.activeTab === 'resources' ? '<div class="tab-active-indicator"></div>' : ''}
        </button>
        <button id="tab-env" class="stage-tab-btn ${this.activeTab === 'env' ? 'active' : ''}" title="Environment & Scene">
          <span class="stage-tab-label">ENVIRONMENT</span>
          ${this.activeTab === 'env' ? '<div class="tab-active-indicator"></div>' : ''}
        </button>
      </div>

      <!-- Tab Content Area -->
      <div id="stage-tab-content" class="stage-tab-body"></div>
    `;

    const content = this.element.querySelector('#stage-tab-content') as HTMLElement;

    if (this.activeTab === 'layers') {
      this.renderLayersTab(content);
    } else if (this.activeTab === 'resources') {
      this.renderResourcesTab(content);
    } else if (this.activeTab === 'env') {
      this.renderEnvTab(content);
    }

    this.bindTabEvents();
    this.bindHeaderActionEvents();
  }

  private bindHeaderActionEvents(): void {
    this.element.querySelector('#btn-stage-close')?.addEventListener('click', () => {
      this.hide();
    });

    this.element.querySelector('#btn-stage-trash')?.addEventListener('click', () => {
      if (this.engine.stageManager.layers.length > 1) {
        this.engine.stageManager.removeLayer(this.engine.stageManager.activeLayerIndex);
        this.refresh();
      }
    });

    this.element.querySelector('#btn-stage-dup')?.addEventListener('click', () => {
      this.engine.stageManager.addLayer(`Layer ${this.engine.stageManager.layers.length + 1}`);
      this.refresh();
    });

    this.element.querySelector('#btn-stage-focus')?.addEventListener('click', () => {
      this.engine.viewport.setViewPreset('iso');
    });
  }

  public renderLayersTab(container: HTMLElement): void {
    const list = document.createElement('div');
    list.className = 'stage-layer-list';

    this.engine.stageManager.layers.forEach((layer, idx) => {
      const isActive = idx === this.engine.stageManager.activeLayerIndex;

      const item = document.createElement('div');
      item.className = `stage-layer-row ${isActive ? 'active-green-pill' : ''}`;
      item.innerHTML = `
        <span class="stage-layer-name">${layer.name}</span>
        <div class="stage-layer-buttons">
          <button data-idx="${idx}" class="btn-layer-icon btn-layer-arrow" title="Select Layer">${icon('arrowRight')}</button>
          <button data-idx="${idx}" class="btn-layer-icon btn-layer-eye ${layer.visible ? '' : 'layer-hidden'}" title="Toggle Visibility">${icon('eye')}</button>
        </div>
      `;

      item.addEventListener('click', (e) => {
        if ((e.target as HTMLElement).closest('button')) return;
        this.engine.stageManager.setActiveLayer(idx);
        this.refresh();
      });

      const eyeBtn = item.querySelector('.btn-layer-eye') as HTMLButtonElement;
      eyeBtn?.addEventListener('click', (e) => {
        e.stopPropagation();
        layer.setVisible(!layer.visible);
        this.refresh();
      });

      const arrowBtn = item.querySelector('.btn-layer-arrow') as HTMLButtonElement;
      arrowBtn?.addEventListener('click', (e) => {
        e.stopPropagation();
        this.engine.stageManager.setActiveLayer(idx);
        this.refresh();
      });

      list.appendChild(item);
    });

    // Add New Layer Row
    const addRow = document.createElement('button');
    addRow.className = 'btn-add-layer-row';
    addRow.innerHTML = `<span>+ NEW LAYER</span>`;
    addRow.addEventListener('click', () => {
      this.engine.stageManager.addLayer(`Layer ${this.engine.stageManager.layers.length + 1}`);
      this.refresh();
    });
    list.appendChild(addRow);

    container.appendChild(list);
  }

  private static BRUSH_PRESETS = [
    { name: 'Cloth line',  profile: 'ribbon', size: 0.02, opacity: 1.0,  pressure: true,  svgD: 'M4 16 C 8 6, 16 2, 32 5',   sw: '1.5' },
    { name: 'Character',   profile: 'ribbon', size: 0.04, opacity: 0.9,  pressure: true,  svgD: 'M4 15 C 9 5, 18 3, 32 7',   sw: '2.5' },
    { name: 'Balloon',     profile: 'tube',   size: 0.08, opacity: 1.0,  pressure: false, svgD: 'M4 13 C 10 4, 20 4, 32 10',  sw: '5' },
    { name: 'Tree 2',      profile: 'ribbon', size: 0.015,opacity: 0.8,  pressure: true,  svgD: 'M4 17 C 8 8, 14 5, 20 9 S 28 15, 32 8', sw: '1' },
    { name: 'Tree 1',      profile: 'ribbon', size: 0.025,opacity: 0.85, pressure: true,  svgD: 'M4 16 C 10 6, 22 4, 32 12',  sw: '2' },
    { name: 'Sketch',      profile: 'ribbon', size: 0.01, opacity: 0.7,  pressure: true,  svgD: 'M4 15 C 10 10, 14 6, 20 12 S 28 8, 32 14', sw: '1' },
  ];

  private activePresetIndex: number = 0;

  public renderResourcesTab(container: HTMLElement): void {
    const presets = StagePanelUI.BRUSH_PRESETS;

    container.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 10px;">
        <!-- Brush Presets -->
        <div>
          <div style="font-size: 9px; font-weight: 700; color: var(--mut); padding: 4px 0 6px;">BRUSH PRESETS</div>
          <div id="brush-preset-list" style="display: flex; flex-direction: column; gap: 3px;"></div>
        </div>

        <!-- Reference Import -->
        <div style="border-top: 1px solid var(--bdr); padding-top: 8px;">
          <div style="font-size: 9px; font-weight: 700; color: var(--mut); padding-bottom: 6px;">REFERENCE</div>
          <div style="display: flex; flex-direction: column; gap: 4px;">
            <label class="btn btn-sm" style="cursor: pointer; text-align: center; width: 100%;">
              + MODEL (GLB/OBJ) / IMAGE
              <input id="ref-file-input" type="file" accept="image/*,.obj,.glb,.gltf,model/gltf-binary,model/gltf+json" style="display: none;">
            </label>
            <label class="btn btn-sm" style="cursor: pointer; text-align: center; width: 100%;">
              + VIDEO TEXTURE (MP4)
              <input id="ref-video-input" type="file" accept="video/mp4,video/webm,video/*" style="display: none;">
            </label>
          </div>
          <div id="ref-resource-list" style="margin-top: 8px; display: flex; flex-direction: column; gap: 6px;"></div>
        </div>
      </div>
    `;

    // Render preset cards
    const presetList = container.querySelector('#brush-preset-list') as HTMLElement;
    presets.forEach((p, idx) => {
      const isActive = idx === this.activePresetIndex;
      const card = document.createElement('div');
      card.className = `brush-preset-card ${isActive ? 'active' : ''}`;
      card.innerHTML = `
        <svg viewBox="0 0 36 20" fill="none" stroke="currentColor" stroke-width="${p.sw}" stroke-linecap="round" class="preset-card-thumb">
          <path d="${p.svgD}"/>
        </svg>
        <span class="preset-card-name">${p.name}</span>
        <span class="preset-card-dot ${isActive ? 'is-active' : ''}"></span>
      `;
      card.addEventListener('click', () => {
        this.activePresetIndex = idx;
        this.engine.brushEngine.setProfile(p.profile as any);
        this.engine.brushEngine.setSize(p.size);
        this.engine.brushEngine.setOpacity(p.opacity);
        this.engine.brushEngine.setPressureSensitivity(p.pressure);
        this.renderResourcesTab(container);
      });
      presetList.appendChild(card);
    });

    const fileInput = container.querySelector('#ref-file-input') as HTMLInputElement;
    fileInput?.addEventListener('change', async (e) => {
      const files = (e.target as HTMLInputElement).files;
      if (files && files.length > 0) {
        const file = files[0];
        const ext = file.name.split('.').pop()?.toLowerCase();
        if (ext === 'glb' || ext === 'gltf') {
          try {
            await this.engine.importGLBFromFile(file);
          } catch (err) {
            console.error('[Feather3D] Failed to import GLB reference:', err);
            alert(`Failed to import model: ${err instanceof Error ? err.message : String(err)}`);
          }
        } else {
          const url = URL.createObjectURL(file);
          this.engine.resourceManager.addReferenceImage(url, file.name, 1.0, this.engine.viewport.activeCamera);
        }
        this.renderResourcesTab(container);
      }
    });

    const videoInput = container.querySelector('#ref-video-input') as HTMLInputElement;
    videoInput?.addEventListener('change', (e) => {
      const files = (e.target as HTMLInputElement).files;
      if (files && files.length > 0) {
        this.engine.resourceManager.addVideoTexture(files[0], this.engine.viewport.activeCamera);
        this.renderResourcesTab(container);
      }
    });

    const list = container.querySelector('#ref-resource-list') as HTMLElement;
    this.engine.resourceManager.resources.forEach(res => {
      const isVideo = res.type === 'video';
      const item = document.createElement('div');
      item.className = 'layer-item';
      item.innerHTML = `
        <div style="display: flex; flex-direction: column; gap: 2px; max-width: 100px;">
          <span style="font-size: 10px; font-weight: 700; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${res.name}</span>
          <span style="font-size: 8px; color: var(--mut);">${res.type.toUpperCase()}</span>
        </div>
        <div style="display: flex; gap: 4px;">
          ${isVideo ? `<button class="btn btn-sm btn-vid-play">${res.videoEl?.paused !== false ? 'PLAY' : 'PAUSE'}</button>` : ''}
          <button class="btn btn-sm btn-res-state">${res.state.toUpperCase()}</button>
          <button class="btn btn-sm btn-danger btn-del-res">DEL</button>
        </div>
      `;

      const playBtn = item.querySelector('.btn-vid-play') as HTMLButtonElement | null;
      if (playBtn && res.videoEl) {
        const vid = res.videoEl;
        playBtn.addEventListener('click', () => {
          if (vid.paused) { vid.play(); playBtn.textContent = 'PAUSE'; }
          else { vid.pause(); playBtn.textContent = 'PLAY'; }
        });
      }

      item.querySelector('.btn-res-state')?.addEventListener('click', () => {
        this.engine.resourceManager.cycleState(res.id);
        this.renderResourcesTab(container);
      });

      item.querySelector('.btn-del-res')?.addEventListener('click', () => {
        this.engine.resourceManager.removeResource(res.id);
        this.renderResourcesTab(container);
      });

      list.appendChild(item);
    });
  }

  public renderEnvTab(container: HTMLElement): void {
    const air = this.engine.airbreath;

    container.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 10px; font-size: 11px;">
        <!-- Wandrlust Aesthetic Presets -->
        <div style="display: flex; flex-direction: column; gap: 4px;">
          <span style="font-weight: 700; color: var(--mut);">AESTHETIC PRESETS</span>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4px;">
            <button data-preset="minimalist" class="btn btn-sm preset-btn ${air.currentPreset === 'minimalist' ? 'active' : ''}">MINIMALIST</button>
            <button data-preset="cel_shaded" class="btn btn-sm preset-btn ${air.currentPreset === 'cel_shaded' ? 'active' : ''}">CEL-SHADED</button>
            <button data-preset="low_poly" class="btn btn-sm preset-btn ${air.currentPreset === 'low_poly' ? 'active' : ''}">LOW-POLY</button>
            <button data-preset="glow" class="btn btn-sm preset-btn ${air.currentPreset === 'glow' ? 'active' : ''}">GLOW NEON</button>
            <button data-preset="cinematic_dof" class="btn btn-sm preset-btn ${air.currentPreset === 'cinematic_dof' ? 'active' : ''}" style="grid-column: span 2;">CINEMATIC DOF</button>
          </div>
        </div>

        <!-- Lighting & Soft Shadows -->
        <div style="display: flex; flex-direction: column; gap: 6px; border-top: 1px solid var(--bdr); padding-top: 8px;">
          <span style="font-weight: 700; color: var(--mut);">LIGHTING & SHADOWS</span>
          <div style="display: flex; gap: 4px;">
            <button id="btn-toggle-shadows" class="btn btn-sm ${air.isShadowsEnabled ? 'active' : ''}" style="flex: 1;">SHADOWS: ${air.isShadowsEnabled ? 'ON' : 'OFF'}</button>
            <button id="btn-align-light" class="btn btn-sm" style="flex: 1;">SUN TO CAM</button>
          </div>
          <button id="btn-toggle-outlines" class="btn btn-sm ${air.isToonOutlineEnabled ? 'active' : ''}">TOON INK OUTLINES: ${air.isToonOutlineEnabled ? 'ON' : 'OFF'}</button>
        </div>

        <!-- Post-Processing Pipeline -->
        <div style="display: flex; flex-direction: column; gap: 6px; border-top: 1px solid var(--bdr); padding-top: 8px;">
          <span style="font-weight: 700; color: var(--mut);">POST-PROCESSING FX</span>
          <button id="btn-toggle-bloom" class="btn btn-sm ${air.isBloomEnabled ? 'active' : ''}">GLOW BLOOM: ${air.isBloomEnabled ? 'ON' : 'OFF'}</button>
          <button id="btn-toggle-dof" class="btn btn-sm ${air.isDoFEnabled ? 'active' : ''}">DEPTH OF FIELD: ${air.isDoFEnabled ? 'ON' : 'OFF'}</button>
          <button id="btn-toggle-grain" class="btn btn-sm ${air.isGrainEnabled ? 'active' : ''}">FILM GRAIN: ${air.isGrainEnabled ? 'ON' : 'OFF'}</button>
          <button id="btn-toggle-pixel" class="btn btn-sm ${air.isPixelEnabled ? 'active' : ''}">RETRO PIXELS: ${air.isPixelEnabled ? 'ON' : 'OFF'}</button>
        </div>

        <!-- 3D Guide -->
        <div style="display: flex; flex-direction: column; gap: 4px; border-top: 1px solid var(--bdr); padding-top: 8px;">
          <span style="font-weight: 700; color: var(--mut);">3D GUIDE</span>
          <div style="display: flex; gap: 4px; flex-wrap: wrap;">
            <button id="btn-guide-off" class="btn btn-sm" style="flex: 1;">OFF</button>
            <button id="btn-guide-plane" class="btn btn-sm" style="flex: 1;">PLANE</button>
            <button id="btn-guide-sphere" class="btn btn-sm" style="flex: 1;">SPHERE</button>
            <button id="btn-guide-cube" class="btn btn-sm" style="flex: 1;">CUBE</button>
            <button id="btn-guide-cylinder" class="btn btn-sm" style="flex: 1;">CYLINDER</button>
          </div>
          <button id="btn-guide-tutorial" class="btn btn-sm" style="margin-top: 2px; color: var(--accent, #3ab24a); font-weight: 700;">GUIDE TUTORIAL & HELP (H)</button>
        </div>

        <!-- World Grid & Axes -->
        <div style="display: flex; flex-direction: column; gap: 4px; border-top: 1px solid var(--bdr); padding-top: 8px;">
          <span style="font-weight: 700; color: var(--mut);">GRID & AXES</span>
          <div style="display: flex; gap: 4px;">
            <button id="btn-toggle-grid" class="btn btn-sm" style="flex: 1;">GRID: ${this.engine.environment.config.showGroundGrid ? 'ON' : 'OFF'}</button>
            <button id="btn-toggle-axes" class="btn btn-sm" style="flex: 1;">AXIS RGB: ${this.engine.environment.config.showAxes ? 'ON' : 'OFF'}</button>
          </div>
        </div>

        <!-- Background Colors -->
        <div style="display: flex; flex-direction: column; gap: 4px; border-top: 1px solid var(--bdr); padding-top: 8px;">
          <span style="font-weight: 700; color: var(--mut);">WORLD BACKGROUND</span>
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
            <input type="color" id="bg-color-picker" value="${this.engine.environment.config.bgColor}" style="width: 36px; height: 36px; border-radius: 50%; border: 1px solid var(--bdr); cursor: pointer; padding: 0; background: none;">
            <span id="bg-color-hex" style="font-size: 11px; color: var(--mut);">${this.engine.environment.config.bgColor}</span>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4px;">
            <button data-bg="#d4ddd6" class="btn btn-sm bg-opt">SAGE GREEN</button>
            <button data-bg="#dcd7ec" class="btn btn-sm bg-opt">LAVENDER</button>
            <button data-bg="#1a1a2e" class="btn btn-sm bg-opt">DARK CANVAS</button>
            <button data-bg="#e8e8ec" class="btn btn-sm bg-opt">LIGHT GREY</button>
            <button data-bg="#ffffff" class="btn btn-sm bg-opt">PURE WHITE</button>
          </div>
        </div>

        <!-- Background Image -->
        <div style="display: flex; flex-direction: column; gap: 4px; border-top: 1px solid var(--bdr); padding-top: 8px;">
          <span style="font-weight: 700; color: var(--mut);">BACKGROUND SKYBOX IMAGE</span>
          <div style="display: flex; gap: 4px;">
            <label class="btn btn-sm" style="flex: 1; cursor: pointer; text-align: center;">
              + CHOOSE IMAGE
              <input id="bg-img-input" type="file" accept="image/*" style="display: none;">
            </label>
            <button id="btn-clear-bg-img" class="btn btn-sm btn-danger">CLEAR</button>
          </div>
        </div>

        <!-- Procedural Sky -->
        <div style="display: flex; flex-direction: column; gap: 4px; border-top: 1px solid var(--bdr); padding-top: 8px;">
          <span style="font-weight: 700; color: var(--mut);">PROCEDURAL SKY</span>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4px;">
            <button data-sky="off" class="btn btn-sm sky-btn ${this.engine.environment.config.skyPreset === 'off' ? 'active' : ''}">OFF</button>
            <button data-sky="day" class="btn btn-sm sky-btn ${this.engine.environment.config.skyPreset === 'day' ? 'active' : ''}">DAY</button>
            <button data-sky="golden_hour" class="btn btn-sm sky-btn ${this.engine.environment.config.skyPreset === 'golden_hour' ? 'active' : ''}">GOLDEN HOUR</button>
            <button data-sky="cherry" class="btn btn-sm sky-btn ${this.engine.environment.config.skyPreset === 'cherry' ? 'active' : ''}">CHERRY</button>
            <button data-sky="dusk" class="btn btn-sm sky-btn ${this.engine.environment.config.skyPreset === 'dusk' ? 'active' : ''}">DUSK</button>
            <button data-sky="night" class="btn btn-sm sky-btn ${this.engine.environment.config.skyPreset === 'night' ? 'active' : ''}">NIGHT</button>
            <button data-sky="storm" class="btn btn-sm sky-btn ${this.engine.environment.config.skyPreset === 'storm' ? 'active' : ''}" style="grid-column: span 2;">STORM</button>
          </div>
        </div>

        <!-- Nature Scene Showcase -->
        <div style="display: flex; flex-direction: column; gap: 4px; border-top: 1px solid var(--bdr); padding-top: 8px;">
          <span style="font-weight: 700; color: var(--mut);">LIVING NATURE SCENE SHOWCASE</span>
          <div style="display: flex; flex-direction: column; gap: 4px;">
            <button id="btn-nature-forest" class="btn btn-sm" style="text-align: left;">FOREST SANCTUARY (DAY + WILDLIFE)</button>
            <button id="btn-nature-temple" class="btn btn-sm" style="text-align: left;">TEMPLE WATER GARDEN (CHERRY + SAKURA)</button>
            <button id="btn-nature-cliff" class="btn btn-sm" style="text-align: left;">SEA CLIFF ISLE (DUSK + OCEAN)</button>
            <button id="btn-nature-bakery" class="btn btn-sm" style="text-align: left;">KOREAN BAKERY CAFE (GOLDEN HOUR)</button>
          </div>
        </div>
      </div>
    `;

    // Aesthetic presets listeners
    container.querySelectorAll('.preset-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const preset = btn.getAttribute('data-preset') as any;
        air.applyPreset(preset);
        this.refresh();
      });
    });

    // Shadows toggle
    container.querySelector('#btn-toggle-shadows')?.addEventListener('click', () => {
      air.setShadowsEnabled(!air.isShadowsEnabled);
      this.refresh();
    });

    // Sun to camera
    container.querySelector('#btn-align-light')?.addEventListener('click', () => {
      air.alignLightToCamera(this.engine.viewport.camera);
    });

    // Toon outlines toggle
    container.querySelector('#btn-toggle-outlines')?.addEventListener('click', () => {
      air.setToonOutlineEnabled(!air.isToonOutlineEnabled);
      this.refresh();
    });

    // Bloom toggle
    container.querySelector('#btn-toggle-bloom')?.addEventListener('click', () => {
      air.setBloomEnabled(!air.isBloomEnabled);
      this.refresh();
    });

    // Depth of field toggle
    container.querySelector('#btn-toggle-dof')?.addEventListener('click', () => {
      air.setDoFEnabled(!air.isDoFEnabled);
      this.refresh();
    });

    // Film grain toggle
    container.querySelector('#btn-toggle-grain')?.addEventListener('click', () => {
      air.setGrainEnabled(!air.isGrainEnabled);
      this.refresh();
    });

    // Retro pixels toggle
    container.querySelector('#btn-toggle-pixel')?.addEventListener('click', () => {
      air.setPixelEnabled(!air.isPixelEnabled);
      this.refresh();
    });

    // 3D Guide buttons
    const guideMap: Record<string, { mode: any; prim?: string }> = {
      '#btn-guide-off': { mode: 'none' },
      '#btn-guide-plane': { mode: 'plane' },
      '#btn-guide-sphere': { mode: 'primitive', prim: 'sphere' },
      '#btn-guide-cube': { mode: 'primitive', prim: 'cube' },
      '#btn-guide-cylinder': { mode: 'primitive', prim: 'cylinder' },
    };
    Object.entries(guideMap).forEach(([sel, cfg]) => {
      container.querySelector(sel)?.addEventListener('click', () => {
        this.engine.guideManager.setMode(cfg.mode);
        if (cfg.prim) this.engine.guideManager.setPrimitiveType(cfg.prim as any);
      });
    });

    container.querySelector('#btn-guide-tutorial')?.addEventListener('click', () => {
      if (this.onGuideTutorialClick) this.onGuideTutorialClick();
    });

    // Background color picker
    const bgPicker = container.querySelector('#bg-color-picker') as HTMLInputElement;
    const bgHex = container.querySelector('#bg-color-hex') as HTMLElement;
    bgPicker?.addEventListener('input', () => {
      const hex = bgPicker.value;
      if (bgHex) bgHex.textContent = hex;
      this.engine.environment.setBgColor(hex, this.engine.scene);
    });

    // Grid / Axes
    container.querySelector('#btn-toggle-grid')?.addEventListener('click', () => {
      this.engine.environment.toggleGroundGrid();
      this.refresh();
    });

    container.querySelector('#btn-toggle-axes')?.addEventListener('click', () => {
      this.engine.environment.toggleAxes();
      this.refresh();
    });

    // Backgrounds
    container.querySelectorAll('.bg-opt').forEach(btn => {
      btn.addEventListener('click', () => {
        const hex = btn.getAttribute('data-bg')!;
        this.engine.environment.setBgColor(hex, this.engine.scene);
        const picker = container.querySelector('#bg-color-picker') as HTMLInputElement;
        const hexLabel = container.querySelector('#bg-color-hex') as HTMLElement;
        if (picker) picker.value = hex;
        if (hexLabel) hexLabel.textContent = hex;
      });
    });

    const bgImgInput = container.querySelector('#bg-img-input') as HTMLInputElement;
    bgImgInput?.addEventListener('change', (e) => {
      const files = (e.target as HTMLInputElement).files;
      if (files && files.length > 0) {
        const url = URL.createObjectURL(files[0]);
        this.engine.environment.setBgTexture(url, this.engine.scene);
      }
    });

    container.querySelector('#btn-clear-bg-img')?.addEventListener('click', () => {
      this.engine.environment.clearBgTexture(this.engine.scene);
    });

    // Procedural Sky Presets
    container.querySelectorAll('.sky-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const skyPreset = btn.getAttribute('data-sky') as any;
        this.engine.environment.setSkyPreset(skyPreset, this.engine.scene);
        this.refresh();
      });
    });

    // Nature Scene Showcases
    container.querySelector('#btn-nature-forest')?.addEventListener('click', async () => {
      await this.engine.loadNatureScene({ sceneType: 'forest', skyPreset: 'day' });
      this.refresh();
    });

    container.querySelector('#btn-nature-temple')?.addEventListener('click', async () => {
      await this.engine.loadNatureScene({ sceneType: 'temple_garden', skyPreset: 'cherry' });
      this.refresh();
    });

    container.querySelector('#btn-nature-cliff')?.addEventListener('click', async () => {
      await this.engine.loadNatureScene({ sceneType: 'sea_cliff', skyPreset: 'dusk' });
      this.refresh();
    });

    container.querySelector('#btn-nature-bakery')?.addEventListener('click', async () => {
      await this.engine.loadNatureScene({ sceneType: 'korean_bakery', skyPreset: 'golden_hour', includeWater: false });
      this.refresh();
    });
  }

  private bindTabEvents(): void {
    this.element.querySelector('#tab-layers')?.addEventListener('click', () => {
      this.activeTab = 'layers';
      this.refresh();
    });
    this.element.querySelector('#tab-resources')?.addEventListener('click', () => {
      this.activeTab = 'resources';
      this.refresh();
    });
    this.element.querySelector('#tab-env')?.addEventListener('click', () => {
      this.activeTab = 'env';
      this.refresh();
    });
  }
}
