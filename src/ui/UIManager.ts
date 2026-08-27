import { Engine } from '../core/Engine';
import { TopNavigation } from './TopNavigation';
import { ToolDock } from './ToolDock';
import { BrushPanel } from './BrushPanel';
import { StagePanelUI } from './StagePanelUI';
import { JoystickWidgetUI } from './JoystickWidgetUI';
import { ExportModal } from './ExportModal';
import { HomeScreenUI } from './HomeScreenUI';
import { SequenceTimelineUI } from './SequenceTimelineUI';
import { ContextMenuUI } from './ContextMenuUI';
import { ClipboardOverlayUI } from './ClipboardOverlayUI';
import { MagnifierLoupeHUD } from './MagnifierLoupeHUD';
import { GuideTutorialModal } from './GuideTutorialModal';
import { CameraNavWidgetUI } from './CameraNavWidgetUI';
import { PlaneNavWidgetUI } from './PlaneNavWidgetUI';
import { SidebarManager, SidebarToolcard } from './SidebarManager';
import { NavCubeWidget } from './NavCubeWidget';

export type ActiveDrawerType = 'none' | 'brushLibrary' | 'stagePanel' | 'colorWheel' | 'sliderPopover' | 'clipboard';

export class UIManager {
  public rootContainer: HTMLElement;
  public engine: Engine;
  public topNav: TopNavigation;
  public toolDock: ToolDock;
  public brushPanel: BrushPanel;
  public stagePanel: StagePanelUI;
  public joystickWidget: JoystickWidgetUI;
  public exportModal: ExportModal;
  public homeScreen: HomeScreenUI;
  public sequenceTimeline: SequenceTimelineUI;
  public contextMenu: ContextMenuUI;
  public clipboardOverlay: ClipboardOverlayUI;
  public magnifierLoupe: MagnifierLoupeHUD;
  public guideTutorialModal: GuideTutorialModal;
  public cameraNavWidget: CameraNavWidgetUI;
  public planeNavWidget: PlaneNavWidgetUI;
  public sidebarManager: SidebarManager;
  public navCubeWidget: NavCubeWidget;

  public isUIHidden: boolean = false;
  public activeDrawer: ActiveDrawerType = 'none';
  public isMobile: boolean = false;

  private restoreButton!: HTMLButtonElement;
  private backdropOverlay!: HTMLElement;

  constructor(rootContainer: HTMLElement, engine: Engine) {
    this.rootContainer = rootContainer;
    this.engine = engine;

    this.topNav = new TopNavigation(engine);
    this.toolDock = new ToolDock(engine);
    this.brushPanel = new BrushPanel(engine);
    this.stagePanel = new StagePanelUI(engine);
    this.joystickWidget = new JoystickWidgetUI(engine);
    this.exportModal = new ExportModal(engine);
    this.homeScreen = new HomeScreenUI(engine);
    this.sequenceTimeline = new SequenceTimelineUI(engine);
    this.contextMenu = new ContextMenuUI(engine);
    this.clipboardOverlay = new ClipboardOverlayUI(engine);
    this.magnifierLoupe = new MagnifierLoupeHUD(engine);
    this.guideTutorialModal = new GuideTutorialModal(engine);
    this.cameraNavWidget = new CameraNavWidgetUI(engine);
    this.planeNavWidget = new PlaneNavWidgetUI(engine);

    // Phase 1: New merged UI components
    this.sidebarManager = new SidebarManager(engine);
    this.navCubeWidget = new NavCubeWidget(engine);

    // Create sidebar toolcards from existing panel content
    this.setupSidebarToolcards();

    // Hook NavCube into render loop for real-time updates
    engine.addAnimationCallback(() => {
      this.navCubeWidget.update();
    });

    this.createBackdropOverlay();
    this.createRestoreButton();
    this.checkResponsive();
    this.mount();
    this.bindInteractions();
    this.bindResponsiveEvents();
  }

  private createBackdropOverlay(): void {
    this.backdropOverlay = document.createElement('div');
    this.backdropOverlay.id = 'ui-backdrop-overlay';
    this.backdropOverlay.className = 'ui-backdrop';
    this.backdropOverlay.style.display = 'none';
    this.backdropOverlay.addEventListener('click', () => {
      this.closeAllPopovers();
    });
  }

  private createRestoreButton(): void {
    this.restoreButton = document.createElement('button');
    this.restoreButton.id = 'btn-restore-ui';
    this.restoreButton.className = 'btn btn-sm active';
    this.restoreButton.textContent = 'RESTORE UI';
    this.restoreButton.style.display = 'none';
    this.restoreButton.style.position = 'fixed';
    this.restoreButton.style.top = '12px';
    this.restoreButton.style.left = '12px';
    this.restoreButton.style.zIndex = '9999';

    this.restoreButton.addEventListener('click', () => {
      this.toggleHideUI();
    });
  }

  private checkResponsive(): void {
    this.isMobile = window.innerWidth < 768 || (window.innerWidth < 1024 && window.innerHeight > window.innerWidth);
    document.body.classList.toggle('mobile-viewport', this.isMobile);
    document.body.classList.toggle('desktop-viewport', !this.isMobile);
  }

  private bindResponsiveEvents(): void {
    window.addEventListener('resize', () => {
      const prevMobile = this.isMobile;
      this.checkResponsive();
      if (prevMobile !== this.isMobile) {
        this.closeAllPopovers();
      }
    });

    window.addEventListener('orientationchange', () => {
      setTimeout(() => {
        this.checkResponsive();
        this.closeAllPopovers();
      }, 100);
    });
  }

  public setActiveDrawer(drawer: ActiveDrawerType): void {
    this.activeDrawer = drawer;

    if (drawer !== 'none') {
      if (this.isMobile) {
        this.backdropOverlay.style.display = 'block';
        document.body.classList.add('drawer-open-mobile');
      }
      document.body.classList.add('has-active-drawer');
    } else {
      this.backdropOverlay.style.display = 'none';
      document.body.classList.remove('drawer-open-mobile');
      document.body.classList.remove('has-active-drawer');
    }

    // Adapt nav widgets when heavy drawers are open
    const shouldTuckNavs = this.isMobile && drawer !== 'none';
    this.cameraNavWidget.element.classList.toggle('navw-tucked', shouldTuckNavs);
    this.planeNavWidget.element.classList.toggle('navw-tucked', shouldTuckNavs);
  }

  public toggleHideUI(): void {
    this.isUIHidden = !this.isUIHidden;
    document.body.classList.toggle('ui-hidden', this.isUIHidden);

    const elementsToToggle = [
      this.topNav.element,
      this.brushPanel.element,
      this.brushPanel.undoRedoElement,
      this.brushPanel.presetsDrawerElement,
      this.contextMenu.element,
      this.stagePanel.element,
      this.joystickWidget.element,
      this.cameraNavWidget.element,
      this.planeNavWidget.element,
      this.sequenceTimeline.element,
      this.sidebarManager.element,
      this.navCubeWidget.element
    ];

    elementsToToggle.forEach(el => {
      if (el) {
        el.style.opacity = this.isUIHidden ? '0' : '1';
        el.style.pointerEvents = this.isUIHidden ? 'none' : 'auto';
      }
    });

    this.sidebarManager.setVisible(!this.isUIHidden);
    this.restoreButton.style.display = this.isUIHidden ? 'block' : 'none';
  }

  private mount(): void {
    this.rootContainer.appendChild(this.backdropOverlay);
    this.rootContainer.appendChild(this.topNav.element);
    this.rootContainer.appendChild(this.brushPanel.element);
    this.rootContainer.appendChild(this.stagePanel.element);
    this.rootContainer.appendChild(this.joystickWidget.element);
    this.rootContainer.appendChild(this.cameraNavWidget.element);
    this.rootContainer.appendChild(this.planeNavWidget.element);
    this.rootContainer.appendChild(this.sequenceTimeline.element);
    this.rootContainer.appendChild(this.exportModal.element);
    this.rootContainer.appendChild(this.homeScreen.element);
    this.rootContainer.appendChild(this.guideTutorialModal.element);
    this.rootContainer.appendChild(this.restoreButton);
  }

  public closeAllPopovers(): void {
    this.brushPanel.colorWheelModal.hide();
    this.brushPanel.closePresetsDrawer();
    this.brushPanel.hideSliderPopover();
    this.stagePanel.hide();
    this.contextMenu.hide();
    this.guideTutorialModal.hide();
    this.clipboardOverlay.hide();
    this.setActiveDrawer('none');
  }

  private bindInteractions(): void {
    // ToolDock callbacks
    this.toolDock.onStageToggle = () => {
      if (this.stagePanel.isVisible) {
        this.stagePanel.hide();
        this.setActiveDrawer('none');
      } else {
        this.closeAllPopovers();
        this.stagePanel.show();
        this.setActiveDrawer('stagePanel');
      }
    };

    this.toolDock.onClipboardToggle = () => {
      const isVisible = this.clipboardOverlay.isVisible;
      this.closeAllPopovers();
      if (!isVisible) {
        this.clipboardOverlay.show();
        this.setActiveDrawer('clipboard');
      }
    };

    // StagePanel close listener
    this.stagePanel.onClose = () => {
      this.stagePanel.hide();
      this.setActiveDrawer('none');
    };

    // TopNav callbacks
    this.topNav.onProjectsClick = () => {
      this.closeAllPopovers();
      this.homeScreen.show();
    };

    this.topNav.onExportClick = () => {
      this.closeAllPopovers();
      this.exportModal.show();
    };

    this.topNav.onHideUIToggle = () => {
      this.closeAllPopovers();
      this.toggleHideUI();
    };

    this.topNav.onGuideTutorialClick = () => {
      this.closeAllPopovers();
      this.guideTutorialModal.show('vertical');
    };

    // StagePanel callbacks
    this.stagePanel.onGuideTutorialClick = () => {
      this.guideTutorialModal.show('vertical');
    };

    // Brush Panel Drawer callbacks
    this.brushPanel.onPresetsDrawerOpen = () => {
      this.stagePanel.hide();
      this.clipboardOverlay.hide();
      this.setActiveDrawer('brushLibrary');
    };

    this.brushPanel.onPresetsDrawerClose = () => {
      if (this.activeDrawer === 'brushLibrary') {
        this.setActiveDrawer('none');
      }
    };

    this.brushPanel.onColorWheelOpen = () => {
      this.stagePanel.hide();
      this.clipboardOverlay.hide();
      this.setActiveDrawer('colorWheel');
    };

    this.brushPanel.onColorWheelClose = () => {
      if (this.activeDrawer === 'colorWheel') {
        this.setActiveDrawer('none');
      }
    };

    this.brushPanel.onSliderPopoverOpen = () => {
      this.setActiveDrawer('sliderPopover');
    };

    this.brushPanel.onSliderPopoverClose = () => {
      if (this.activeDrawer === 'sliderPopover') {
        this.setActiveDrawer('none');
      }
    };

    // TopNav stage toggle -> toggles sidebar collapse or stage panel
    this.topNav.onStageToggle = () => {
      this.sidebarManager.setCollapsed(!this.sidebarManager.isCollapsed);
    };

    this.topNav.onClipboardToggle = () => {
      const isVisible = this.clipboardOverlay.isVisible;
      this.closeAllPopovers();
      if (!isVisible) {
        this.clipboardOverlay.show();
        this.setActiveDrawer('clipboard');
      }
    };

    this.topNav.onSettingsChanged = (setting, val) => {
      if (setting === 'handMode') {
        this.sidebarManager.toggleDockSide();
      }
    };

    // Engine callbacks
    this.engine.onOpenTutorial = (tab?: any) => {
      this.closeAllPopovers();
      this.guideTutorialModal.show(tab || 'vertical');
    };

    this.engine.onToggleHideUI = () => {
      this.closeAllPopovers();
      this.toggleHideUI();
    };

    this.contextMenu.onBrushNameClick = () => {
      this.stagePanel.hide();
      this.brushPanel.togglePresetsDrawer();
    };

    this.contextMenu.onSizeClick = (anchorY: number) => {
      this.brushPanel.showSliderPopover('size', anchorY);
    };

    this.contextMenu.onOpacityClick = (anchorY: number) => {
      this.brushPanel.showSliderPopover('opacity', anchorY);
    };

    this.contextMenu.onColorClick = () => {
      this.stagePanel.hide();
      this.brushPanel.colorWheelModal.toggle();
    };

    this.engine.onToolChange = (tool) => {
      this.joystickWidget.setVisible(tool === 'transform');
      this.contextMenu.refresh();
      this.topNav.setActiveTool(tool);
    };

    this.engine.onStrokeStart = () => {
      this.closeAllPopovers();
    };

    this.engine.onCurveCreated = () => {
      this.stagePanel.refresh();
      this.refreshSidebarToolcards();
      this.sequenceTimeline.refresh();
      this.contextMenu.refresh();
    };
  }

  private envCardContent!: HTMLElement;
  private layersCardContent!: HTMLElement;
  private resourcesCardContent!: HTMLElement;

  private setupSidebarToolcards(): void {
    this.envCardContent = document.createElement('div');
    this.stagePanel.renderEnvTab(this.envCardContent);
    const envCard = new SidebarToolcard('ENVIRONMENT & GUIDES', 'ENV', this.envCardContent);
    this.sidebarManager.addToolcard(envCard);

    this.layersCardContent = document.createElement('div');
    this.stagePanel.renderLayersTab(this.layersCardContent);
    const layersCard = new SidebarToolcard('LAYERS & GROUPS', 'LAY', this.layersCardContent);
    this.sidebarManager.addToolcard(layersCard);

    this.resourcesCardContent = document.createElement('div');
    this.stagePanel.renderResourcesTab(this.resourcesCardContent);
    const resourcesCard = new SidebarToolcard('RESOURCES & ASSETS', 'RES', this.resourcesCardContent);
    this.sidebarManager.addToolcard(resourcesCard);
  }

  public refreshSidebarToolcards(): void {
    if (this.layersCardContent) {
      this.layersCardContent.innerHTML = '';
      this.stagePanel.renderLayersTab(this.layersCardContent);
    }
    if (this.resourcesCardContent) {
      this.resourcesCardContent.innerHTML = '';
      this.stagePanel.renderResourcesTab(this.resourcesCardContent);
    }
    if (this.envCardContent) {
      this.envCardContent.innerHTML = '';
      this.stagePanel.renderEnvTab(this.envCardContent);
    }
  }
}
