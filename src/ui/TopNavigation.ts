import { Engine } from '../core/Engine';
import { CameraPreset } from '../core/Viewport';
import { icon } from './icons';

export class TopNavigation {
  public element: HTMLElement;
  private engine: Engine;
  private isDarkMode: boolean = false;
  private isLeftHanded: boolean = false;
  private theme: 'light' | 'dark' | 'eink' = 'light';

  public onStageToggle?: () => void;
  public onExportClick?: () => void;
  public onProjectsClick?: () => void;
  public onClipboardToggle?: () => void;
  public onHideUIToggle?: () => void;
  public onGuideTutorialClick?: () => void;
  
  public onLayerPopupToggle?: () => void;
  public onUndoClick?: () => void;
  public onRedoClick?: () => void;
  public onPagesToggle?: () => void;
  public onViewsToggle?: () => void;
  public onSettingsChanged?: (setting: string, value: any) => void;

  constructor(engine: Engine) {
    this.engine = engine;
    this.element = document.createElement('header');
    this.element.id = 'topbar';

    this.render();
    this.bindEvents();
  }

  private render(): void {
    this.element.innerHTML = `
      <style>
        #topbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 44px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: var(--pan);
          border-bottom: 1px solid var(--bdr);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          z-index: 150;
          padding: 0 12px;
          box-sizing: border-box;
          box-shadow: var(--shadow-sm);
        }
        #topbar .topbar-group {
          display: flex;
          align-items: center;
          gap: 4px;
          height: 100%;
        }
        .topbar-relative {
          position: relative;
          display: flex;
          align-items: center;
        }
        .dropdown-menu {
          position: absolute;
          top: 40px;
          background: var(--pan-solid, var(--pan));
          border: 1px solid var(--bdr);
          border-radius: var(--radius);
          padding: 8px;
          display: none;
          flex-direction: column;
          gap: 4px;
          box-shadow: var(--shadow);
          z-index: 1000;
          min-width: 180px;
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }
        #main-menu-dropdown { left: 0; }
        #view-popover-dropdown { left: 0; }
        #settings-dropdown { right: 0; }
        .td-sep {
          width: 1px;
          height: 20px;
          background: var(--bdr);
          margin: 0 4px;
        }
      </style>

      <!-- LEFT SECTION -->
      <div class="topbar-group topbar-left">
        <button id="btn-home" class="td-btn" title="Dashboard">${icon('home')}</button>
        
        <div class="topbar-relative">
          <button id="btn-menu" class="td-btn" title="Menu">${icon('menu')}</button>
          <div id="main-menu-dropdown" class="dropdown-menu">
            <div class="dropdown-group-label">FILE</div>
            <button id="btn-menu-new-sketch" class="dropdown-item">New Sketch</button>
            <button id="btn-projects" class="dropdown-item">Dashboard</button>
            <button id="btn-export-quick" class="dropdown-item">Export Project</button>
            <button id="btn-import-glb" class="dropdown-item">Import GLB Model</button>
            <div class="dropdown-separator"></div>
            <div class="dropdown-group-label">VIEW</div>
            <button id="btn-menu-reset-cam" class="dropdown-item">Reset Camera</button>
            <button id="btn-menu-toggle-ortho" class="dropdown-item">Projection: ${this.engine.viewport.isOrthographic ? 'Ortho' : 'Persp'}</button>
            <button id="btn-menu-hide-ui" class="dropdown-item">Hide UI</button>
            <button id="btn-snap-ground" class="dropdown-item">Snap to Ground</button>
            <div class="dropdown-separator"></div>
            <div class="dropdown-group-label">EXTRAS</div>
            <button id="btn-nature-scene" class="dropdown-item">Nature Scene Showcase</button>
            <button id="btn-capture-thumb" class="dropdown-item">Capture Thumbnail</button>
            <button id="btn-toggle-ar" class="dropdown-item">AR Viewer</button>
            <button id="btn-pwa-install" class="dropdown-item">Install App</button>
          </div>
        </div>

        <button id="btn-new-sketch" class="td-btn" title="New Sketch">${icon('plus')}</button>
        <button id="btn-undo" class="td-btn" title="Undo">${icon('undo')}</button>
        <button id="btn-redo" class="td-btn" title="Redo">${icon('redo')}</button>
        <button id="btn-clear" class="td-btn" title="Clear Stage">${icon('trash')}</button>

        <div class="topbar-relative">
          <button id="btn-view-popover" class="td-btn" title="View Options">${icon('cubeCenter')}</button>
          <div id="view-popover-dropdown" class="dropdown-menu">
            <button id="btn-vp-reset" class="dropdown-item">Reset Camera (Iso)</button>
            <button id="btn-vp-front" class="dropdown-item">Front View</button>
            <button id="btn-vp-back" class="dropdown-item">Back View</button>
            <button id="btn-vp-left" class="dropdown-item">Left View</button>
            <button id="btn-vp-right" class="dropdown-item">Right View</button>
            <button id="btn-vp-top" class="dropdown-item">Top View</button>
            <button id="btn-vp-bottom" class="dropdown-item">Bottom View</button>
            <div class="dropdown-separator"></div>
            <button id="btn-vp-ortho" class="dropdown-item">Toggle Ortho/Persp</button>
          </div>
        </div>
      </div>

      <!-- CENTER TOOLS SECTION -->
      <div class="topbar-group topbar-center">
        <button data-tool="draw" class="td-btn active" title="Draw">${icon('draw')}<span>Draw</span></button>
        <button data-tool="erase" class="td-btn" title="Erase">${icon('erase')}<span>Erase</span></button>
        <button data-tool="select" class="td-btn" title="Select">${icon('select')}<span>Select</span></button>
        <span class="td-sep"></span>
        <button id="btn-sym" class="td-btn" title="Mirror Symmetry">${icon('mirror')}<span>Mirror</span></button>
        <button id="btn-ref-import" class="td-btn" title="Reference image / 3D model">${icon('image')}<span>Ref</span></button>
        <button id="btn-stage-toggle" class="td-btn" title="Layers / Stage">${icon('layers')}<span>Layers</span></button>
      </div>

      <!-- RIGHT SECTION -->
      <div class="topbar-group topbar-right">
        <button id="btn-look-mode" class="td-btn" title="Look Mode / Orbit Camera">${icon('eye')}<span>Look</span></button>
        <button id="btn-hide-ui" class="td-btn" title="Hide UI">Hide UI</button>
        <button id="btn-export" class="td-btn" title="Export Project">Export</button>
        
        <div class="topbar-relative">
          <button id="btn-settings" class="td-btn" title="Settings">Settings</button>
          <div id="settings-dropdown" class="dropdown-menu">
            <button id="btn-dark-mode" class="dropdown-item">Dark Mode: Off</button>
            <button id="btn-eink-theme" class="dropdown-item">Theme: Light</button>
            <button id="btn-finger-pen" class="dropdown-item">Finger-Pen: Off</button>
            <button id="btn-hand-mode" class="dropdown-item">Hand: R</button>
            <div class="dropdown-separator"></div>
            <button id="btn-tutorial" class="dropdown-item">Tutorial & Help</button>
          </div>
        </div>
      </div>
    `;
  }

  private bindEvents(): void {
    // Dropdowns
    this.setupDropdown('btn-menu', 'main-menu-dropdown');
    this.setupDropdown('btn-view-popover', 'view-popover-dropdown');
    this.setupDropdown('btn-settings', 'settings-dropdown');

    // Home / Projects
    this.element.querySelector('#btn-home')?.addEventListener('click', () => {
      if (this.onProjectsClick) this.onProjectsClick();
    });
    this.element.querySelector('#btn-projects')?.addEventListener('click', () => {
      if (this.onProjectsClick) this.onProjectsClick();
    });

    // File Menu Actions
    this.element.querySelector('#btn-menu-new-sketch')?.addEventListener('click', () => this.engine.newSketch());
    this.element.querySelector('#btn-new-sketch')?.addEventListener('click', () => this.engine.newSketch());
    this.element.querySelector('#btn-export-quick')?.addEventListener('click', () => {
      if (this.onExportClick) this.onExportClick();
    });
    this.element.querySelector('#btn-export')?.addEventListener('click', () => {
      if (this.onExportClick) this.onExportClick();
    });
    this.element.querySelector('#btn-import-glb')?.addEventListener('click', () => this.engine.openFilePicker());
    
    // View Menu Actions
    this.element.querySelector('#btn-menu-reset-cam')?.addEventListener('click', () => this.engine.viewport.setViewPreset('iso'));
    this.element.querySelector('#btn-menu-toggle-ortho')?.addEventListener('click', (e) => {
      const isOrtho = this.engine.viewport.toggleProjection();
      const btn = e.target as HTMLElement;
      btn.textContent = `Projection: ${isOrtho ? 'Ortho' : 'Persp'}`;
    });
    this.element.querySelector('#btn-menu-hide-ui')?.addEventListener('click', () => {
      if (this.onHideUIToggle) this.onHideUIToggle();
    });
    this.element.querySelector('#btn-snap-ground')?.addEventListener('click', () => this.engine.snapActiveLayerToGround());

    // Undo / Redo / Clear
    this.element.querySelector('#btn-undo')?.addEventListener('click', () => {
      this.engine.historyManager.undo();
      if (this.onUndoClick) this.onUndoClick();
    });
    this.element.querySelector('#btn-redo')?.addEventListener('click', () => {
      this.engine.historyManager.redo();
      if (this.onRedoClick) this.onRedoClick();
    });
    this.element.querySelector('#btn-clear')?.addEventListener('click', () => this.engine.stageManager.clear());

    // View Popover
    this.element.querySelector('#btn-vp-reset')?.addEventListener('click', () => this.engine.viewport.setViewPreset('iso'));
    this.element.querySelector('#btn-vp-front')?.addEventListener('click', () => this.engine.viewport.setViewPreset('front'));
    this.element.querySelector('#btn-vp-back')?.addEventListener('click', () => this.engine.viewport.setViewPreset('back'));
    this.element.querySelector('#btn-vp-left')?.addEventListener('click', () => this.engine.viewport.setViewPreset('left'));
    this.element.querySelector('#btn-vp-right')?.addEventListener('click', () => this.engine.viewport.setViewPreset('right'));
    this.element.querySelector('#btn-vp-top')?.addEventListener('click', () => this.engine.viewport.setViewPreset('top'));
    this.element.querySelector('#btn-vp-bottom')?.addEventListener('click', () => this.engine.viewport.setViewPreset('bottom'));
    this.element.querySelector('#btn-vp-iso')?.addEventListener('click', () => this.engine.viewport.setViewPreset('iso'));
    this.element.querySelector('#btn-vp-ortho')?.addEventListener('click', () => this.engine.viewport.toggleProjection());

    // Extras
    this.element.querySelector('#btn-nature-scene')?.addEventListener('click', async () => await this.engine.loadNatureScene());
    this.element.querySelector('#btn-capture-thumb')?.addEventListener('click', () => this.engine.captureAndSaveThumbnail());
    this.element.querySelector('#btn-toggle-ar')?.addEventListener('click', () => this.engine.toggleARViewer());
    this.element.querySelector('#btn-pwa-install')?.addEventListener('click', () => {
      if ((window as any).triggerPwaInstall) {
        (window as any).triggerPwaInstall();
      }
    });

    // Tool Buttons (Draw, Erase, Select)
    const toolButtons = this.element.querySelectorAll<HTMLButtonElement>('[data-tool]');
    toolButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        toolButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const tool = btn.getAttribute('data-tool');
        this.engine.shapeAssistEnabled = false;
        this.engine.setTool(tool as any);
      });
    });

    // Symmetry Mirror Cycling
    const symBtn = this.element.querySelector('#btn-sym') as HTMLButtonElement | null;
    const symOptions: ('none' | 'x' | 'y' | 'z')[] = ['none', 'x', 'y', 'z'];
    let currentSymIndex = 0;
    const axisColors: Record<string, string> = { x: '#e0483a', y: '#3ab24a', z: '#3a6be0' };

    symBtn?.addEventListener('click', () => {
      currentSymIndex = (currentSymIndex + 1) % symOptions.length;
      const axis = symOptions[currentSymIndex];
      this.engine.symmetryManager.setAxis(axis);
      if (symBtn) {
        symBtn.style.color = axis === 'none' ? '' : axisColors[axis];
        symBtn.title = axis === 'none' ? 'Mirror Symmetry' : `Mirror: ${axis.toUpperCase()} Axis`;
        symBtn.classList.toggle('active', axis !== 'none');
      }
    });

    this.element.querySelector('#btn-ref-import')?.addEventListener('click', () => {
      if (this.onClipboardToggle) this.onClipboardToggle();
    });

    this.element.querySelector('#btn-stage-toggle')?.addEventListener('click', () => {
      if (this.onStageToggle) this.onStageToggle();
    });

    // Right Section
    this.element.querySelector('#btn-look-mode')?.addEventListener('click', () => this.engine.setTool('navigate'));
    this.element.querySelector('#btn-hide-ui')?.addEventListener('click', () => {
      if (this.onHideUIToggle) this.onHideUIToggle();
    });
    this.element.querySelector('#btn-export')?.addEventListener('click', () => {
      if (this.onExportClick) this.onExportClick();
    });

    // Settings
    const darkBtn = this.element.querySelector('#btn-dark-mode') as HTMLButtonElement;
    darkBtn?.addEventListener('click', () => {
      this.isDarkMode = !this.isDarkMode;
      document.body.classList.toggle('dark-mode', this.isDarkMode);
      if (this.isDarkMode) {
        document.body.removeAttribute('data-theme');
        this.theme = 'dark';
        einkBtn.textContent = 'Theme: Dark';
      } else {
        this.theme = 'light';
        einkBtn.textContent = 'Theme: Light';
      }
      darkBtn.textContent = `Dark Mode: ${this.isDarkMode ? 'On' : 'Off'}`;
      this.engine.environment.setBgColor(this.isDarkMode ? '#1a1a2e' : '#dcd7ec', this.engine.scene);
      if (this.onSettingsChanged) this.onSettingsChanged('darkMode', this.isDarkMode);
    });

    const einkBtn = this.element.querySelector('#btn-eink-theme') as HTMLButtonElement;
    einkBtn?.addEventListener('click', () => {
      if (this.theme === 'light') {
        this.theme = 'dark';
        this.isDarkMode = true;
        document.body.classList.add('dark-mode');
        document.body.removeAttribute('data-theme');
        this.engine.environment.setBgColor('#1a1a2e', this.engine.scene);
      } else if (this.theme === 'dark') {
        this.theme = 'eink';
        this.isDarkMode = false;
        document.body.classList.remove('dark-mode');
        document.body.setAttribute('data-theme', 'eink');
        this.engine.environment.setBgColor('#ffffff', this.engine.scene);
      } else {
        this.theme = 'light';
        this.isDarkMode = false;
        document.body.classList.remove('dark-mode');
        document.body.removeAttribute('data-theme');
        this.engine.environment.setBgColor('#dcd7ec', this.engine.scene);
      }
      darkBtn.textContent = `Dark Mode: ${this.isDarkMode ? 'On' : 'Off'}`;
      einkBtn.textContent = `Theme: ${this.theme.charAt(0).toUpperCase() + this.theme.slice(1)}`;
      if (this.onSettingsChanged) this.onSettingsChanged('theme', this.theme);
    });

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
      if (this.onSettingsChanged) this.onSettingsChanged('fingerPen', state);
    });
    this.engine.onFingerPenChange = (enabled) => updateFingerPenUI(enabled);

    const handBtn = this.element.querySelector('#btn-hand-mode') as HTMLButtonElement;
    handBtn?.addEventListener('click', () => {
      this.isLeftHanded = !this.isLeftHanded;
      document.body.classList.toggle('left-handed', this.isLeftHanded);
      handBtn.textContent = this.isLeftHanded ? 'Hand: L' : 'Hand: R';
      if (this.onSettingsChanged) this.onSettingsChanged('handMode', this.isLeftHanded ? 'L' : 'R');
    });

    this.element.querySelector('#btn-tutorial')?.addEventListener('click', () => {
      if (this.onGuideTutorialClick) this.onGuideTutorialClick();
    });
  }

  private setupDropdown(buttonId: string, dropdownId: string): void {
    const btn = this.element.querySelector(`#${buttonId}`) as HTMLElement;
    const dropdown = this.element.querySelector(`#${dropdownId}`) as HTMLElement;
    if (!btn || !dropdown) return;

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isVisible = dropdown.style.display === 'flex';
      
      // Close all other dropdowns
      this.element.querySelectorAll('.dropdown-menu').forEach((el) => {
        (el as HTMLElement).style.display = 'none';
      });

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

  public setActiveTool(tool: string): void {
    const toolButtons = this.element.querySelectorAll<HTMLButtonElement>('[data-tool]');
    toolButtons.forEach(b => {
      const t = b.getAttribute('data-tool');
      b.classList.toggle('active', t === tool);
    });
  }
}
