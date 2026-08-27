import { Engine } from '../core/Engine';

/**
 * TopNavigation: Top-left system menu and dashboard launcher.
 * 100% clean plain text design with zero emojis or decorative glyphs.
 */
export class TopNavigation {
  public element: HTMLElement;
  private engine: Engine;
  private isDarkMode: boolean = false;
  private isHighContrast: boolean = false;
  private isLeftHanded: boolean = false;

  public onStageToggle?: () => void;
  public onExportClick?: () => void;
  public onProjectsClick?: () => void;
  public onClipboardToggle?: () => void;
  public onHideUIToggle?: () => void;
  public onGuideTutorialClick?: () => void;

  constructor(engine: Engine) {
    this.engine = engine;
    this.element = document.createElement('header');
    this.element.id = 'topbar';

    this.render();
    this.bindEvents();
  }

  private render(): void {
    this.element.innerHTML = `
      <!-- Top-Left: System Menu Quadrant -->
      <div class="topbar-group system-menu-quadrant">
        <button id="btn-home" class="sys-nav-btn" title="Dashboard / Projects">PROJECTS</button>
        <button id="btn-menu" class="sys-nav-btn" title="System Menu">MENU</button>
        <div id="main-menu-dropdown" class="dropdown-menu">
          <div class="dropdown-group-label">FILE</div>
          <button id="btn-new-sketch" class="dropdown-item">New Sketch</button>
          <button id="btn-projects" class="dropdown-item">Dashboard</button>
          <button id="btn-export-quick" class="dropdown-item">Export Project</button>
          <button id="btn-import-glb" class="dropdown-item">Import GLB Model</button>
          <div class="dropdown-separator"></div>
          <div class="dropdown-group-label">VIEW</div>
          <button id="btn-reset-cam" class="dropdown-item">Reset Camera</button>
          <button id="btn-toggle-ortho" class="dropdown-item">Projection: ${this.engine.viewport.isOrthographic ? 'Ortho' : 'Persp'}</button>
          <button id="btn-hide-ui" class="dropdown-item">Hide UI <span class="dropdown-shortcut">U</span></button>
          <button id="btn-snap-ground" class="dropdown-item">Snap to Ground</button>
          <div class="dropdown-separator"></div>
          <div class="dropdown-group-label">SETTINGS</div>
          <button id="btn-dark-mode" class="dropdown-item">Dark Mode: Off</button>
          <button id="btn-high-contrast" class="dropdown-item">High Contrast: Off</button>
          <button id="btn-finger-pen" class="dropdown-item">Finger-Pen: Off</button>
          <button id="btn-hand-mode" class="dropdown-item">Hand: R</button>
          <div class="dropdown-separator"></div>
          <button id="btn-tutorial" class="dropdown-item" style="color: var(--accent); font-weight: 700;">Help & Tutorial <span class="dropdown-shortcut">H</span></button>
          <div class="dropdown-separator"></div>
          <div class="dropdown-group-label">EXTRAS</div>
          <button id="btn-nature-scene" class="dropdown-item">Showcase Scene</button>
          <button id="btn-capture-thumb" class="dropdown-item">Capture Thumbnail</button>
          <button id="btn-toggle-ar" class="dropdown-item">AR Viewer</button>
          <button id="btn-pwa-install" class="dropdown-item">Install App</button>
        </div>
      </div>
    `;
  }

  private bindEvents(): void {
    // Dropdown toggle
    this.setupDropdown('btn-menu', 'main-menu-dropdown');

    // Home / Projects Dashboard
    this.element.querySelector('#btn-home')?.addEventListener('click', () => {
      if (this.onProjectsClick) this.onProjectsClick();
    });

    this.element.querySelector('#btn-projects')?.addEventListener('click', () => {
      if (this.onProjectsClick) this.onProjectsClick();
    });

    // Tutorial & Guide Help
    this.element.querySelector('#btn-tutorial')?.addEventListener('click', () => {
      if (this.onGuideTutorialClick) this.onGuideTutorialClick();
    });

    // Capture Thumbnail
    this.element.querySelector('#btn-capture-thumb')?.addEventListener('click', () => {
      this.engine.captureAndSaveThumbnail();
    });

    this.element.querySelector('#btn-new-sketch')?.addEventListener('click', () => {
      this.engine.newSketch();
    });

    this.element.querySelector('#btn-export-quick')?.addEventListener('click', () => {
      if (this.onExportClick) this.onExportClick();
    });

    this.element.querySelector('#btn-import-glb')?.addEventListener('click', () => {
      this.engine.openFilePicker();
    });

    this.element.querySelector('#btn-nature-scene')?.addEventListener('click', async () => {
      await this.engine.loadNatureScene();
    });

    // Snap active 3D model/layer to ground grid
    this.element.querySelector('#btn-snap-ground')?.addEventListener('click', () => {
      this.engine.snapActiveLayerToGround();
    });

    // Hide UI
    this.element.querySelector('#btn-hide-ui')?.addEventListener('click', () => {
      if (this.onHideUIToggle) this.onHideUIToggle();
    });

    // Projection Toggle
    const orthoBtn = this.element.querySelector('#btn-toggle-ortho') as HTMLButtonElement;
    orthoBtn?.addEventListener('click', () => {
      const isOrtho = this.engine.viewport.toggleProjection();
      orthoBtn.textContent = `Projection: ${isOrtho ? 'Ortho' : 'Persp'}`;
    });

    // Reset Camera
    this.element.querySelector('#btn-reset-cam')?.addEventListener('click', () => {
      this.engine.viewport.setViewPreset('iso');
    });

    // AR Toggle
    this.element.querySelector('#btn-toggle-ar')?.addEventListener('click', () => {
      this.engine.toggleARViewer();
    });

    // Dark Mode Toggle
    const darkBtn = this.element.querySelector('#btn-dark-mode') as HTMLButtonElement;
    darkBtn?.addEventListener('click', () => {
      this.isDarkMode = !this.isDarkMode;
      document.body.classList.toggle('dark-mode', this.isDarkMode);
      darkBtn.textContent = `Dark Mode: ${this.isDarkMode ? 'On' : 'Off'}`;
      this.engine.environment.setBgColor(this.isDarkMode ? '#141520' : '#d4ddd6', this.engine.scene);
      this.engine.environment.setGridColors(
        this.isDarkMode ? '#4a4e70' : '#968060',
        this.isDarkMode ? '#2c2f48' : '#c4bedb'
      );
    });

    // High Contrast Toggle
    const hcBtn = this.element.querySelector('#btn-high-contrast') as HTMLButtonElement;
    hcBtn?.addEventListener('click', () => {
      this.isHighContrast = !this.isHighContrast;
      document.body.classList.toggle('high-contrast', this.isHighContrast);
      hcBtn.textContent = `High Contrast: ${this.isHighContrast ? 'On' : 'Off'}`;
    });

    // Finger-Pen mode toggle
    const fingerPenBtn = this.element.querySelector('#btn-finger-pen') as HTMLButtonElement;
    const updateFingerPenUI = (enabled: boolean) => {
      if (fingerPenBtn) {
        fingerPenBtn.textContent = `Finger-Pen: ${enabled ? 'On' : 'Off'}`;
        fingerPenBtn.classList.toggle('active', enabled);
      }
    };
    updateFingerPenUI(this.engine.inputManager.isFingerPenMode);
    fingerPenBtn?.addEventListener('click', () => {
      const state = this.engine.toggleFingerPen();
      updateFingerPenUI(state);
    });
    this.engine.onFingerPenChange = (enabled) => updateFingerPenUI(enabled);

    // Hand orientation
    const handBtn = this.element.querySelector('#btn-hand-mode') as HTMLButtonElement;
    handBtn?.addEventListener('click', () => {
      this.isLeftHanded = !this.isLeftHanded;
      document.body.classList.toggle('left-handed', this.isLeftHanded);
      handBtn.textContent = this.isLeftHanded ? 'Hand: L' : 'Hand: R';
    });

    // PWA Install
    this.element.querySelector('#btn-pwa-install')?.addEventListener('click', () => {
      if (window.triggerPwaInstall) {
        window.triggerPwaInstall();
      }
    });
  }

  private setupDropdown(buttonId: string, dropdownId: string): void {
    const btn = this.element.querySelector(`#${buttonId}`) as HTMLElement;
    const dropdown = this.element.querySelector(`#${dropdownId}`) as HTMLElement;
    if (!btn || !dropdown) return;

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isVisible = dropdown.style.display === 'flex';
      dropdown.style.display = isVisible ? 'none' : 'flex';
    });

    dropdown.querySelectorAll('.dropdown-item').forEach((item) => {
      item.addEventListener('click', () => {
        dropdown.style.display = 'none';
      });
    });

    window.addEventListener('click', () => {
      dropdown.style.display = 'none';
    });
  }
}
