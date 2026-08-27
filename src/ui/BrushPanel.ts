import { Engine } from '../core/Engine';
import { ColorWheelModalUI } from './ColorWheelModalUI';
import {
  BrushPreset,
  BRUSH_PRESETS,
  BRUSH_CATEGORIES,
  BrushCategory,
  STARTER_BRUSH_IDS,
  AnimationOption,
  ANIMATION_OPTIONS
} from '../brushes/BrushPresets';
import { AnimatedMaterialType } from '../shaders/tslAnimatedMaterials';

export class BrushPanel {
  public element: HTMLElement;
  public undoRedoElement: HTMLElement;
  public presetsDrawerElement: HTMLElement;
  public sliderPopoverElement: HTMLElement;
  private engine: Engine;
  public colorWheelModal: ColorWheelModalUI;

  private colorSwatchCircle!: HTMLElement;
  private sizeValText!: HTMLElement;
  private sizeTargetDot!: HTMLElement;
  private opValText!: HTMLElement;
  private opFill!: HTMLElement;
  private profileBtn!: HTMLButtonElement;
  private pressureBtn!: HTMLButtonElement;
  private undoBtn!: HTMLButtonElement;
  private redoBtn!: HTMLButtonElement;

  private isPresetsDrawerOpen: boolean = false;
  private activeDrawerTab: 'brushes' | 'animations' = 'brushes';
  private activeCategory: BrushCategory = 'starter';
  private searchQuery: string = '';
  private customPresets: BrushPreset[] = [];

  private categoryTabsContainer!: HTMLElement;
  private presetsListContainer!: HTMLElement;
  private searchInput!: HTMLInputElement;
  private filterRowContainer!: HTMLElement;

  // Active Slider Popover State
  private activeSliderProp: 'size' | 'opacity' | null = null;
  private isDraggingSizeOnRail: boolean = false;
  private isDraggingOpOnRail: boolean = false;
  private dragStartY: number = 0;
  private dragStartVal: number = 0;

  private static STORAGE_KEY = 'feather3d_custom_brush_presets';

  constructor(engine: Engine) {
    this.engine = engine;

    this.loadCustomPresets();

    // Main Brush Rail
    this.element = document.createElement('aside');
    this.element.id = 'sidebar-panel';
    this.element.className = 'brush-vertical-pill';

    // Slide-out Presets / Brush Library Drawer
    this.presetsDrawerElement = document.createElement('div');
    this.presetsDrawerElement.id = 'brush-presets-drawer';
    this.presetsDrawerElement.className = 'brush-presets-drawer';

    // Floating Slider Popover for Size & Opacity
    this.sliderPopoverElement = document.createElement('div');
    this.sliderPopoverElement.id = 'brush-slider-popover';
    this.sliderPopoverElement.className = 'brush-slider-popover';
    this.sliderPopoverElement.style.display = 'none';

    // Detached Lower Undo/Redo Pill
    this.undoRedoElement = document.createElement('div');
    this.undoRedoElement.id = 'undo-redo-dock';
    this.undoRedoElement.className = 'undo-redo-pill';

    this.colorWheelModal = new ColorWheelModalUI(engine);

    this.render();
    this.bindEvents();

    document.body.appendChild(this.presetsDrawerElement);
    document.body.appendChild(this.sliderPopoverElement);
    document.body.appendChild(this.undoRedoElement);
  }

  public openPresetsDrawer(initialTab: 'brushes' | 'animations' = 'brushes'): void {
    this.activeDrawerTab = initialTab;
    this.isPresetsDrawerOpen = true;
    this.presetsDrawerElement.classList.add('open');
    document.body.classList.add('presets-drawer-active');
    this.colorWheelModal.hide();
    this.hideSliderPopover();
    this.updateDrawerHeaderTabs();
    this.renderPresetsList();
  }

  public closePresetsDrawer(): void {
    this.isPresetsDrawerOpen = false;
    this.presetsDrawerElement.classList.remove('open');
    document.body.classList.remove('presets-drawer-active');
  }

  public togglePresetsDrawer(initialTab: 'brushes' | 'animations' = 'brushes'): void {
    if (this.isPresetsDrawerOpen) {
      if (this.activeDrawerTab !== initialTab) {
        this.activeDrawerTab = initialTab;
        this.updateDrawerHeaderTabs();
        this.renderPresetsList();
      } else {
        this.closePresetsDrawer();
      }
    } else {
      this.openPresetsDrawer(initialTab);
    }
  }

  public showSliderPopover(prop: 'size' | 'opacity', anchorY: number): void {
    if (this.activeSliderProp === prop && this.sliderPopoverElement.style.display === 'flex') {
      this.hideSliderPopover();
      return;
    }

    this.activeSliderProp = prop;
    this.colorWheelModal.hide();
    this.closePresetsDrawer();

    const railRect = this.element.getBoundingClientRect();
    this.sliderPopoverElement.style.left = `${railRect.right + 12}px`;
    this.sliderPopoverElement.style.top = `${Math.min(window.innerHeight - 200, Math.max(10, anchorY - 60))}px`;
    this.sliderPopoverElement.style.display = 'flex';

    this.renderSliderPopoverContent();
  }

  public hideSliderPopover(): void {
    this.activeSliderProp = null;
    this.sliderPopoverElement.style.display = 'none';
  }

  private renderSliderPopoverContent(): void {
    if (!this.activeSliderProp) return;

    const isSize = this.activeSliderProp === 'size';
    const currentVal = isSize
      ? Math.round((this.engine.brushEngine.size / 2.0) * 1000)
      : Math.round(this.engine.brushEngine.opacity * 100);

    const min = isSize ? 1 : 1;
    const max = isSize ? 200 : 100;
    const unit = isSize ? 'mm' : '%';
    const title = isSize ? 'BRUSH SIZE' : 'BRUSH OPACITY';

    const quickPills = isSize
      ? [4, 10, 20, 40, 80, 150]
      : [15, 35, 50, 75, 90, 100];

    this.sliderPopoverElement.innerHTML = `
      <div class="popover-arrow-left"></div>
      <div class="slider-popover-header">
        <span class="slider-popover-title">${title}</span>
        <div class="slider-val-badge">
          <span id="slider-num-display">${currentVal}</span>
          <span class="slider-val-unit">${unit}</span>
        </div>
      </div>

      <div class="slider-track-row">
        <button id="btn-slider-minus" class="btn-step">-</button>
        <input id="slider-range-input" type="range" min="${min}" max="${max}" value="${currentVal}" class="prop-range-slider" />
        <button id="btn-slider-plus" class="btn-step">+</button>
      </div>

      <div class="slider-quick-pills-row">
        ${quickPills.map(val => `<button class="slider-quick-pill ${val === currentVal ? 'active' : ''}" data-val="${val}">${val}${unit}</button>`).join('')}
      </div>
    `;

    const rangeInput = this.sliderPopoverElement.querySelector('#slider-range-input') as HTMLInputElement;
    const numDisplay = this.sliderPopoverElement.querySelector('#slider-num-display') as HTMLElement;
    const minusBtn = this.sliderPopoverElement.querySelector('#btn-slider-minus') as HTMLButtonElement;
    const plusBtn = this.sliderPopoverElement.querySelector('#btn-slider-plus') as HTMLButtonElement;

    const updateValue = (val: number) => {
      const clamped = Math.max(min, Math.min(max, val));
      rangeInput.value = `${clamped}`;
      numDisplay.textContent = `${clamped}`;

      if (isSize) {
        this.sizeValText.textContent = `${clamped}`;
        this.engine.brushEngine.setSize((clamped / 1000) * 2.0);
        const dotScale = Math.min(18, Math.max(3, (clamped / 100) * 14));
        this.sizeTargetDot.style.width = `${dotScale}px`;
        this.sizeTargetDot.style.height = `${dotScale}px`;
      } else {
        this.opValText.textContent = `${clamped}%`;
        this.engine.brushEngine.setOpacity(clamped / 100);
        this.opFill.style.opacity = `${clamped / 100}`;
      }

      this.sliderPopoverElement.querySelectorAll<HTMLButtonElement>('.slider-quick-pill').forEach(btn => {
        const bVal = parseInt(btn.getAttribute('data-val') || '0', 10);
        btn.classList.toggle('active', bVal === clamped);
      });
    };

    rangeInput.addEventListener('input', () => {
      updateValue(parseInt(rangeInput.value, 10));
    });

    minusBtn.addEventListener('click', () => {
      const cur = parseInt(rangeInput.value, 10);
      updateValue(cur - (isSize ? 2 : 5));
    });

    plusBtn.addEventListener('click', () => {
      const cur = parseInt(rangeInput.value, 10);
      updateValue(cur + (isSize ? 2 : 5));
    });

    this.sliderPopoverElement.querySelectorAll<HTMLButtonElement>('.slider-quick-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        const pVal = parseInt(btn.getAttribute('data-val') || '0', 10);
        updateValue(pVal);
      });
    });
  }

  private loadCustomPresets(): void {
    try {
      const saved = localStorage.getItem(BrushPanel.STORAGE_KEY);
      if (saved) {
        this.customPresets = JSON.parse(saved);
      }
    } catch (e) {
      this.customPresets = [];
    }
  }

  private saveCustomPresets(): void {
    try {
      localStorage.setItem(BrushPanel.STORAGE_KEY, JSON.stringify(this.customPresets));
    } catch (e) {
      // Storage error ignored
    }
  }

  private render(): void {
    const activeP = this.engine.brushEngine.activePreset;
    const curSize = Math.round((this.engine.brushEngine.size / 2.0) * 1000);
    const curOp = Math.round(this.engine.brushEngine.opacity * 100);

    // 1. Main Brush Rail
    this.element.innerHTML = `
      <!-- Brush Type Thumbnail (tap to open/close Brush Library) -->
      <button id="sb-profile-btn" class="pill-brush-thumb" title="Brush Library (Toggle)">
        ${this.getBrushThumbnailHTML(activeP)}
      </button>

      <!-- Color Swatch Circle (Click to open/close Anchored Color Wheel) -->
      <div id="sb-color-circle" class="pill-swatch-circle" title="Color & Material (Toggle)" style="background-color: #${this.engine.brushEngine.color.getHexString()};"></div>

      <!-- Size Slider Circle (Click for Slider, or Drag Up/Down) -->
      <div id="sb-size-container" class="pill-slider-container" title="Brush Size (Click for Slider / Drag up/down)">
        <div id="sb-size-circle" class="pill-value-circle">
          <div id="size-target-dot" class="size-target-dot"></div>
        </div>
        <span id="sb-size-text" class="pill-label-text">${curSize}</span>
      </div>

      <!-- Opacity Slider Circle (Click for Slider, or Drag Up/Down) -->
      <div id="sb-op-container" class="pill-slider-container" title="Opacity (Click for Slider / Drag up/down)">
        <div id="sb-op-circle" class="pill-value-circle pill-opacity-circle">
          <div id="sb-op-fill" class="opacity-preview-fill" style="opacity: ${curOp / 100};"></div>
        </div>
        <span id="sb-op-text" class="pill-label-text">${curOp}%</span>
      </div>

      <!-- Pressure Sensitivity Capsule Toggle -->
      <button id="sb-pressure-btn" class="pill-capsule-btn ${this.engine.brushEngine.pressureSensitivity ? 'active' : ''}" title="Pressure sensitivity">
        <div class="capsule-toggle-bar"></div>
      </button>

      <!-- Injector / Syringe Tool -->
      <button id="sb-injector-btn" class="pill-round-btn" title="Eyedropper / Injector">PICK</button>
    `;

    // 2. Upgraded Brush Library Drawer with Universal Animation Tab
    this.presetsDrawerElement.innerHTML = `
      <div class="brush-library-header">
        <div class="brush-library-title-row">
          <div class="brush-drawer-tabs">
            <button id="tab-drawer-brushes" class="drawer-mode-tab ${this.activeDrawerTab === 'brushes' ? 'active' : ''}">BRUSH TIPS</button>
            <button id="tab-drawer-animations" class="drawer-mode-tab ${this.activeDrawerTab === 'animations' ? 'active' : ''}">ANIMATION SHADERS</button>
          </div>
          <div class="brush-library-header-actions">
            <button id="btn-add-preset" class="btn-preset-action" title="Save Current as Preset">SAVE</button>
            <button id="btn-close-presets" class="btn-preset-action" title="Close Library">CLOSE</button>
          </div>
        </div>
        <div id="drawer-filter-row" class="drawer-filter-subgroup">
          <div class="brush-search-bar">
            <input id="brush-search-input" type="text" placeholder="Search brush tips..." class="brush-search-input" />
          </div>
          <div class="brush-category-nav-row">
            <button id="btn-cat-prev" class="btn-cat-nav" title="Previous categories">&lt;</button>
            <div id="brush-category-tabs" class="brush-category-tabs"></div>
            <button id="btn-cat-next" class="btn-cat-nav" title="Next categories">&gt;</button>
          </div>
        </div>
      </div>
      <div id="presets-list" class="brush-library-grid"></div>
    `;

    // 3. Detached Undo / Redo Pill
    this.undoRedoElement.innerHTML = `
      <button id="dock-undo" class="undo-redo-btn" title="Undo">UNDO</button>
      <button id="dock-redo" class="undo-redo-btn" title="Redo">REDO</button>
    `;

    this.colorSwatchCircle = this.element.querySelector('#sb-color-circle') as HTMLElement;
    this.sizeValText = this.element.querySelector('#sb-size-text') as HTMLElement;
    this.sizeTargetDot = this.element.querySelector('#size-target-dot') as HTMLElement;
    this.opValText = this.element.querySelector('#sb-op-text') as HTMLElement;
    this.opFill = this.element.querySelector('#sb-op-fill') as HTMLElement;
    this.profileBtn = this.element.querySelector('#sb-profile-btn') as HTMLButtonElement;
    this.pressureBtn = this.element.querySelector('#sb-pressure-btn') as HTMLButtonElement;

    this.categoryTabsContainer = this.presetsDrawerElement.querySelector('#brush-category-tabs') as HTMLElement;
    this.presetsListContainer = this.presetsDrawerElement.querySelector('#presets-list') as HTMLElement;
    this.searchInput = this.presetsDrawerElement.querySelector('#brush-search-input') as HTMLInputElement;
    this.filterRowContainer = this.presetsDrawerElement.querySelector('#drawer-filter-row') as HTMLElement;

    this.undoBtn = this.undoRedoElement.querySelector('#dock-undo') as HTMLButtonElement;
    this.redoBtn = this.undoRedoElement.querySelector('#dock-redo') as HTMLButtonElement;

    this.renderCategoryTabs();
    this.renderPresetsList();
  }

  private updateDrawerHeaderTabs(): void {
    const tabBrushes = this.presetsDrawerElement.querySelector('#tab-drawer-brushes');
    const tabAnims = this.presetsDrawerElement.querySelector('#tab-drawer-animations');
    tabBrushes?.classList.toggle('active', this.activeDrawerTab === 'brushes');
    tabAnims?.classList.toggle('active', this.activeDrawerTab === 'animations');

    if (this.filterRowContainer) {
      this.filterRowContainer.style.display = this.activeDrawerTab === 'brushes' ? 'flex' : 'none';
    }
  }

  private renderCategoryTabs(): void {
    if (!this.categoryTabsContainer) return;
    this.categoryTabsContainer.innerHTML = '';

    BRUSH_CATEGORIES.forEach(cat => {
      const tab = document.createElement('button');
      tab.className = `brush-cat-chip ${this.activeCategory === cat.id ? 'active' : ''}`;
      tab.textContent = cat.name;
      tab.title = cat.description;

      tab.addEventListener('click', (e) => {
        e.stopPropagation();
        this.activeCategory = cat.id;
        this.categoryTabsContainer.querySelectorAll('.brush-cat-chip').forEach(el => el.classList.remove('active'));
        tab.classList.add('active');
        this.renderPresetsList();
      });

      this.categoryTabsContainer.appendChild(tab);
    });
  }

  private renderPresetsList(): void {
    if (!this.presetsListContainer) return;
    this.presetsListContainer.innerHTML = '';

    if (this.activeDrawerTab === 'animations') {
      this.renderAnimationsList();
      return;
    }

    const allPresets: BrushPreset[] = [
      ...Object.values(BRUSH_PRESETS),
      ...this.customPresets
    ];

    const q = this.searchQuery.toLowerCase().trim();

    const filtered = allPresets.filter(p => {
      let matchCat: boolean;
      if (this.activeCategory === 'all') {
        matchCat = true;
      } else if (this.activeCategory === 'starter') {
        matchCat = STARTER_BRUSH_IDS.includes(p.id);
      } else {
        matchCat = p.category === this.activeCategory;
      }
      const matchSearch = !q || p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });

    if (filtered.length === 0) {
      const emptyNotice = document.createElement('div');
      emptyNotice.className = 'brush-library-empty';
      emptyNotice.textContent = 'No brushes found matching criteria.';
      this.presetsListContainer.appendChild(emptyNotice);
      return;
    }

    filtered.forEach(preset => {
      const isCustom = preset.category === 'custom';
      const isActive = this.engine.brushEngine.activePreset.id === preset.id;

      const card = document.createElement('div');
      card.className = `brush-item-card ${isActive ? 'active' : ''}`;
      card.title = preset.description;

      const displaySize = Math.round((preset.defaultSize / 2.0) * 1000);
      const displayOp = Math.round(preset.defaultOpacity * 100);

      card.innerHTML = `
        <!-- 1. Authentic Brush Tip Icon -->
        <div class="brush-card-icon-box" title="${preset.name}">
          ${preset.iconFile ? `<img src="${import.meta.env.BASE_URL}icons/brushes/${preset.iconFile}" class="brush-card-icon-img" alt="${preset.name}" onerror="this.style.display='none'" />` : `<div class="brush-card-icon-fallback"></div>`}
        </div>

        <!-- 2. Dynamic Stroke Geometry Preview -->
        <div class="brush-card-preview-box" title="Stroke Effect">
          ${this.getBrushStrokePreviewSVG(preset)}
        </div>

        <!-- 3. Details & Meta -->
        <div class="brush-card-info">
          <div class="brush-card-name-row">
            <span class="brush-card-title">${preset.name}</span>
            <span class="brush-card-category-tag">${preset.category.toUpperCase()}</span>
          </div>
          <div class="brush-card-meta-row">
            <span class="brush-card-stat">Size ${displaySize}mm</span>
            <span class="brush-card-stat">Op ${displayOp}%</span>
            ${isCustom ? `<button class="btn-del-custom-preset" title="Delete Preset">Delete</button>` : ''}
          </div>
        </div>
      `;

      card.addEventListener('click', (e) => {
        e.stopPropagation();
        if ((e.target as HTMLElement).classList.contains('btn-del-custom-preset')) {
          this.deleteCustomPreset(preset.id);
          return;
        }

        this.applyPreset(preset);
        this.presetsListContainer.querySelectorAll('.brush-item-card').forEach(el => el.classList.remove('active'));
        card.classList.add('active');
      });

      this.presetsListContainer.appendChild(card);
    });
  }

  private renderAnimationsList(): void {
    const currentOverlay = this.engine.brushEngine.animatedOverlay;

    ANIMATION_OPTIONS.forEach(opt => {
      const isActive = currentOverlay === opt.id;

      const card = document.createElement('div');
      card.className = `brush-item-card ${isActive ? 'active' : ''}`;
      card.title = opt.description;

      card.innerHTML = `
        <div class="brush-card-info">
          <div class="brush-card-name-row">
            <span class="brush-card-title">${opt.name.toUpperCase()}</span>
            <span class="brush-card-category-tag">${isActive ? 'ACTIVE' : 'SHADER'}</span>
          </div>
          <div class="brush-card-meta-row">
            <span class="brush-card-desc">${opt.description}</span>
          </div>
        </div>
      `;

      card.addEventListener('click', (e) => {
        e.stopPropagation();
        this.engine.brushEngine.setAnimatedOverlay(opt.id);
        this.presetsListContainer.querySelectorAll('.brush-item-card').forEach(el => el.classList.remove('active'));
        card.classList.add('active');
      });

      this.presetsListContainer.appendChild(card);
    });
  }

  private applyPreset(preset: BrushPreset): void {
    this.engine.brushEngine.setPreset(preset);

    const displaySize = Math.round((this.engine.brushEngine.size / 2.0) * 1000);
    const displayOp = Math.round(this.engine.brushEngine.opacity * 100);

    this.sizeValText.textContent = `${displaySize}`;
    this.opValText.textContent = `${displayOp}%`;
    this.colorSwatchCircle.style.backgroundColor = `#${this.engine.brushEngine.color.getHexString()}`;
    this.pressureBtn.classList.toggle('active', this.engine.brushEngine.pressureSensitivity);

    this.profileBtn.innerHTML = this.getBrushThumbnailHTML(preset);
  }

  private deleteCustomPreset(id: string): void {
    this.customPresets = this.customPresets.filter(p => p.id !== id);
    this.saveCustomPresets();
    this.renderPresetsList();
  }

  private getBrushThumbnailHTML(preset: BrushPreset): string {
    if (preset.iconFile) {
      return `<img src="${import.meta.env.BASE_URL}icons/brushes/${preset.iconFile}" class="rail-thumb-img" alt="${preset.name}" />`;
    }
    return this.getBrushThumbnailFallbackSVG(preset);
  }

  private getBrushThumbnailFallbackSVG(preset: BrushPreset): string {
    const p = preset.profile;
    const strokeWidth = p === 'tube' ? '3.5' : p === 'chisel' ? '4.0' : p === 'hair_coil' ? '2.5' : '2.0';

    if (p === 'hair_coil' || p === 'hair_wave' || p === 'hair_zigzag') {
      return `<svg viewBox="0 0 36 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 10 C 8 2, 12 18, 16 10 C 20 2, 24 18, 28 10 C 32 2, 34 10, 36 10"/></svg>`;
    }
    if (p === 'bristle') {
      return `<svg viewBox="0 0 36 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M4 14 C 10 7, 20 4, 32 6"/><path d="M4 16 C 10 9, 20 6, 32 8"/><path d="M4 18 C 10 11, 20 8, 32 10"/></svg>`;
    }
    if (p === 'foliage' || p === 'particles') {
      return `<svg viewBox="0 0 36 20" fill="currentColor"><circle cx="6" cy="14" r="2.5"/><circle cx="14" cy="8" r="3.5"/><circle cx="22" cy="12" r="3"/><circle cx="30" cy="6" r="2.5"/></svg>`;
    }
    if (p === 'chisel') {
      return `<svg viewBox="0 0 36 20" fill="none" stroke="currentColor" stroke-width="4.5" stroke-linecap="square"><path d="M4 16 C 12 6, 22 4, 32 5"/></svg>`;
    }

    return `<svg viewBox="0 0 36 20" fill="none" stroke="currentColor" stroke-width="${strokeWidth}" stroke-linecap="round"><path d="M4 16 C 8 6, 16 2, 32 4"/></svg>`;
  }

  private getBrushStrokePreviewSVG(preset: BrushPreset): string {
    const p = preset.profile;
    const col = 'currentColor';

    if (p === 'hair_coil') {
      return `
        <svg viewBox="0 0 60 20" fill="none" stroke="${col}" stroke-width="1.8" stroke-linecap="round">
          <path d="M3 10 C 6 2, 9 18, 12 10 C 15 2, 18 18, 21 10 C 24 2, 27 18, 30 10 C 33 2, 36 18, 39 10 C 42 2, 45 18, 48 10 C 51 2, 54 18, 57 10"/>
        </svg>
      `;
    }

    if (p === 'hair_wave') {
      return `
        <svg viewBox="0 0 60 20" fill="none" stroke="${col}" stroke-width="2" stroke-linecap="round">
          <path d="M3 10 Q 15 2, 30 10 T 57 10"/>
        </svg>
      `;
    }

    if (p === 'hair_zigzag') {
      return `
        <svg viewBox="0 0 60 20" fill="none" stroke="${col}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <path d="M3 10 L 10 3 L 17 17 L 24 3 L 31 17 L 38 3 L 45 17 L 52 3 L 57 10"/>
        </svg>
      `;
    }

    if (p === 'bristle') {
      return `
        <svg viewBox="0 0 60 20" fill="none" stroke="${col}" stroke-width="1.2" stroke-linecap="round">
          <path d="M3 12 C 18 5, 38 4, 57 6" opacity="0.9"/>
          <path d="M3 14 C 18 7, 38 6, 57 8" opacity="1.0"/>
          <path d="M3 16 C 18 9, 38 8, 57 10" opacity="0.7"/>
        </svg>
      `;
    }

    if (p === 'foliage') {
      return `
        <svg viewBox="0 0 60 20" fill="${col}">
          <circle cx="6" cy="12" r="3"/>
          <circle cx="16" cy="7" r="4.5"/>
          <circle cx="27" cy="11" r="3.8"/>
          <circle cx="38" cy="7" r="4.8"/>
          <circle cx="48" cy="10" r="3.5"/>
          <circle cx="56" cy="8" r="2.5"/>
        </svg>
      `;
    }

    if (p === 'particles') {
      return `
        <svg viewBox="0 0 60 20" fill="${col}">
          <circle cx="5" cy="12" r="1.5"/>
          <circle cx="13" cy="6" r="2.5"/>
          <circle cx="21" cy="14" r="1.2"/>
          <circle cx="29" cy="7" r="3"/>
          <circle cx="38" cy="13" r="1.8"/>
          <circle cx="47" cy="6" r="2.4"/>
          <circle cx="55" cy="11" r="2"/>
        </svg>
      `;
    }

    if (p === 'chisel') {
      return `
        <svg viewBox="0 0 60 20" fill="none" stroke="${col}" stroke-width="4.5" stroke-linecap="square">
          <path d="M3 14 C 18 5, 38 4, 57 5"/>
        </svg>
      `;
    }

    if (p === 'tube') {
      return `
        <svg viewBox="0 0 60 20" fill="none" stroke="${col}" stroke-width="4" stroke-linecap="round">
          <path d="M3 14 C 18 5, 38 4, 57 5"/>
        </svg>
      `;
    }

    return `
      <svg viewBox="0 0 60 20" fill="none" stroke="${col}" stroke-width="2.2" stroke-linecap="round">
        <path d="M3 14 C 18 5, 38 4, 57 5"/>
      </svg>
    `;
  }

  private bindEvents(): void {
    // Profile toggle -> opens / toggles presets drawer
    this.profileBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.colorWheelModal.hide();
      this.hideSliderPopover();
      this.togglePresetsDrawer('brushes');
    });

    this.presetsDrawerElement.querySelector('#btn-close-presets')?.addEventListener('click', (e) => {
      e.stopPropagation();
      this.closePresetsDrawer();
    });

    // Drawer header subtabs (BRUSH TIPS vs ANIMATION SHADERS)
    this.presetsDrawerElement.querySelector('#tab-drawer-brushes')?.addEventListener('click', (e) => {
      e.stopPropagation();
      this.activeDrawerTab = 'brushes';
      this.updateDrawerHeaderTabs();
      this.renderPresetsList();
    });

    this.presetsDrawerElement.querySelector('#tab-drawer-animations')?.addEventListener('click', (e) => {
      e.stopPropagation();
      this.activeDrawerTab = 'animations';
      this.updateDrawerHeaderTabs();
      this.renderPresetsList();
    });

    // Category navigation buttons
    this.presetsDrawerElement.querySelector('#btn-cat-prev')?.addEventListener('click', (e) => {
      e.stopPropagation();
      if (this.categoryTabsContainer) {
        this.categoryTabsContainer.scrollBy({ left: -140, behavior: 'smooth' });
      }
    });

    this.presetsDrawerElement.querySelector('#btn-cat-next')?.addEventListener('click', (e) => {
      e.stopPropagation();
      if (this.categoryTabsContainer) {
        this.categoryTabsContainer.scrollBy({ left: 140, behavior: 'smooth' });
      }
    });

    // Mouse wheel horizontal scroll on category tabs
    this.categoryTabsContainer?.addEventListener('wheel', (e: WheelEvent) => {
      e.preventDefault();
      this.categoryTabsContainer.scrollLeft += e.deltaY;
    }, { passive: false });

    // Add current settings as a Custom Preset
    this.presetsDrawerElement.querySelector('#btn-add-preset')?.addEventListener('click', (e) => {
      e.stopPropagation();
      const curSize = this.engine.brushEngine.size;
      const curOp = this.engine.brushEngine.opacity;
      const presetName = prompt('Enter a name for this custom preset:', `Custom ${this.customPresets.length + 1}`);
      if (!presetName) return;

      const newPreset: BrushPreset = {
        id: `custom_${Date.now()}`,
        name: presetName.trim(),
        category: 'custom',
        description: 'User saved custom preset',
        profile: this.engine.brushEngine.profile,
        materialType: this.engine.brushEngine.materialType,
        defaultSize: curSize,
        defaultOpacity: curOp,
        smoothingAlpha: this.engine.brushEngine.smoothingAlpha,
        taperStart: this.engine.brushEngine.taperStart,
        taperEnd: this.engine.brushEngine.taperEnd,
        pressureRadius: this.engine.brushEngine.pressureSensitivity,
        pressureOpacity: false,
        iconFile: 'palette_custombrush.png'
      };

      this.customPresets.unshift(newPreset);
      this.saveCustomPresets();
      this.activeCategory = 'custom';
      this.renderCategoryTabs();
      this.renderPresetsList();
    });

    // Search filter input
    this.searchInput?.addEventListener('input', () => {
      this.searchQuery = this.searchInput.value;
      this.renderPresetsList();
    });

    this.searchInput?.addEventListener('click', (e) => {
      e.stopPropagation();
    });

    // Color Swatch Circle -> open/toggle Anchored Color Wheel
    this.colorSwatchCircle.addEventListener('click', (e) => {
      e.stopPropagation();
      if (this.isPresetsDrawerOpen) {
        this.closePresetsDrawer();
      }
      this.hideSliderPopover();

      if (this.colorWheelModal.isVisible) {
        this.colorWheelModal.hide();
      } else {
        const rect = this.colorSwatchCircle.getBoundingClientRect();
        this.colorWheelModal.showAt(rect.right + 12, rect.top - 40);
      }
    });

    // Update color swatch when brush color changes
    const originalSetColor = this.engine.brushEngine.setColor.bind(this.engine.brushEngine);
    this.engine.brushEngine.setColor = (col) => {
      originalSetColor(col);
      const hex = typeof col === 'string' ? col : `#${col.getHexString()}`;
      this.colorSwatchCircle.style.backgroundColor = hex;
    };

    // 1. Brush Size Container: Click to open Slider, Drag up/down to live adjust
    const sizeContainer = this.element.querySelector('#sb-size-container') as HTMLElement;
    sizeContainer?.addEventListener('click', (e) => {
      e.stopPropagation();
      const rect = sizeContainer.getBoundingClientRect();
      this.showSliderPopover('size', rect.top);
    });

    sizeContainer?.addEventListener('pointerdown', (e: PointerEvent) => {
      this.isDraggingSizeOnRail = true;
      this.dragStartY = e.clientY;
      this.dragStartVal = Math.round((this.engine.brushEngine.size / 2.0) * 1000);
      sizeContainer.setPointerCapture(e.pointerId);
    });

    sizeContainer?.addEventListener('pointermove', (e: PointerEvent) => {
      if (!this.isDraggingSizeOnRail) return;
      const deltaY = this.dragStartY - e.clientY; // Drag up increases size
      const newVal = Math.max(1, Math.min(200, Math.round(this.dragStartVal + deltaY * 0.8)));
      this.sizeValText.textContent = `${newVal}`;
      this.engine.brushEngine.setSize((newVal / 1000) * 2.0);
      const dotScale = Math.min(18, Math.max(3, (newVal / 100) * 14));
      this.sizeTargetDot.style.width = `${dotScale}px`;
      this.sizeTargetDot.style.height = `${dotScale}px`;
    });

    sizeContainer?.addEventListener('pointerup', (e: PointerEvent) => {
      this.isDraggingSizeOnRail = false;
      try { sizeContainer.releasePointerCapture(e.pointerId); } catch (err) {}
    });

    // 2. Opacity Container: Click to open Slider, Drag up/down to live adjust
    const opContainer = this.element.querySelector('#sb-op-container') as HTMLElement;
    opContainer?.addEventListener('click', (e) => {
      e.stopPropagation();
      const rect = opContainer.getBoundingClientRect();
      this.showSliderPopover('opacity', rect.top);
    });

    opContainer?.addEventListener('pointerdown', (e: PointerEvent) => {
      this.isDraggingOpOnRail = true;
      this.dragStartY = e.clientY;
      this.dragStartVal = Math.round(this.engine.brushEngine.opacity * 100);
      opContainer.setPointerCapture(e.pointerId);
    });

    opContainer?.addEventListener('pointermove', (e: PointerEvent) => {
      if (!this.isDraggingOpOnRail) return;
      const deltaY = this.dragStartY - e.clientY; // Drag up increases opacity
      const newVal = Math.max(0, Math.min(100, Math.round(this.dragStartVal + deltaY * 0.6)));
      this.opValText.textContent = `${newVal}%`;
      this.engine.brushEngine.setOpacity(newVal / 100);
      this.opFill.style.opacity = `${newVal / 100}`;
    });

    opContainer?.addEventListener('pointerup', (e: PointerEvent) => {
      this.isDraggingOpOnRail = false;
      try { opContainer.releasePointerCapture(e.pointerId); } catch (err) {}
    });

    // Pressure Sensitivity Capsule
    this.pressureBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const next = !this.engine.brushEngine.pressureSensitivity;
      this.engine.brushEngine.setPressureSensitivity(next);
      this.pressureBtn.classList.toggle('active', next);
    });

    // Injector / Syringe
    this.element.querySelector('#sb-injector-btn')?.addEventListener('click', (e) => {
      e.stopPropagation();
      this.colorWheelModal.hide();
      this.closePresetsDrawer();
      this.hideSliderPopover();
      this.engine.setTool('inject');
    });

    // Detached Undo / Redo
    this.undoBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.engine.historyManager.undo();
    });
    this.redoBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.engine.historyManager.redo();
    });

    this.engine.historyManager.onStateChange = () => {
      this.undoBtn.style.opacity = this.engine.historyManager.undoCount > 0 ? '1' : '0.35';
      this.redoBtn.style.opacity = this.engine.historyManager.redoCount > 0 ? '1' : '0.35';
    };

    // Global outside-click dismiss for popovers
    document.addEventListener('pointerdown', (e: PointerEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      // Color Wheel outside click
      if (
        this.colorWheelModal.isVisible &&
        !this.colorWheelModal.element.contains(target) &&
        !this.colorSwatchCircle.contains(target)
      ) {
        this.colorWheelModal.hide();
      }

      // Slider Popover outside click
      if (
        this.sliderPopoverElement.style.display === 'flex' &&
        !this.sliderPopoverElement.contains(target) &&
        !sizeContainer.contains(target) &&
        !opContainer.contains(target)
      ) {
        this.hideSliderPopover();
      }

      // Presets drawer outside click
      if (
        this.isPresetsDrawerOpen &&
        !this.presetsDrawerElement.contains(target) &&
        !this.profileBtn.contains(target)
      ) {
        this.closePresetsDrawer();
      }
    });
  }
}
