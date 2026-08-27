import * as THREE from 'three';
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

/**
 * UIManager: Core controller for all user interface modules in Feather Sketch Studio V9.
 * Coordinates Glass Dark UI layout, hide UI global view state, and Cursor Feedback HUDs.
 * 100% clean plain text with zero emojis or decorative glyphs.
 */
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

  public isUIHidden: boolean = false;
  private restoreButton!: HTMLButtonElement;

  // Cursor Feedback Elements
  private touchCursorEl!: HTMLElement;
  private penHoverCursorEl!: HTMLElement;
  private penCoordBadgeEl!: HTMLElement;

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

    this.createRestoreButton();
    this.createCursorFeedbackElements();
    this.mount();
    this.bindInteractions();
  }

  private createRestoreButton(): void {
    this.restoreButton = document.createElement('button');
    this.restoreButton.id = 'btn-restore-ui';
    this.restoreButton.className = 'btn btn-restore-ui';
    this.restoreButton.textContent = 'RESTORE UI';
    this.restoreButton.style.display = 'none';

    this.restoreButton.addEventListener('click', () => {
      this.toggleHideUI();
    });
  }

  private createCursorFeedbackElements(): void {
    // 1. Touch Cursor (Color circle indicator)
    this.touchCursorEl = document.createElement('div');
    this.touchCursorEl.id = 'touch-cursor-indicator';
    document.body.appendChild(this.touchCursorEl);

    // 2. Pen Cursor (Spatial Coordinate Hover Projection HUD)
    this.penHoverCursorEl = document.createElement('div');
    this.penHoverCursorEl.id = 'pen-hover-cursor';
    this.penHoverCursorEl.innerHTML = `
      <div class="pen-hover-reticle">
        <div class="pen-hover-center-dot"></div>
      </div>
      <div class="pen-spatial-coord-badge" id="pen-coord-badge">X: 0.00 Y: 0.00 Z: 0.00</div>
    `;
    document.body.appendChild(this.penHoverCursorEl);
    this.penCoordBadgeEl = this.penHoverCursorEl.querySelector('#pen-coord-badge') as HTMLElement;
  }

  public toggleHideUI(): void {
    this.isUIHidden = !this.isUIHidden;
    const elementsToToggle = [
      this.topNav.element,
      this.toolDock.element,
      this.brushPanel.element,
      this.brushPanel.undoRedoElement,
      this.brushPanel.presetsDrawerElement,
      this.brushPanel.sliderPopoverElement,
      this.contextMenu.element,
      this.stagePanel.element,
      this.joystickWidget.element,
      this.cameraNavWidget.element,
      this.planeNavWidget.element,
      this.sequenceTimeline.element
    ];

    elementsToToggle.forEach(el => {
      if (el) {
        el.style.opacity = this.isUIHidden ? '0' : '1';
        el.style.pointerEvents = this.isUIHidden ? 'none' : 'auto';
        el.style.transition = 'opacity 0.2s ease';
      }
    });

    this.restoreButton.style.display = this.isUIHidden ? 'block' : 'none';
  }

  private mount(): void {
    this.rootContainer.appendChild(this.topNav.element);
    this.rootContainer.appendChild(this.toolDock.element);
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
  }

  private bindInteractions(): void {
    // ToolDock callbacks
    this.toolDock.onStageToggle = () => {
      this.brushPanel.colorWheelModal.hide();
      this.brushPanel.closePresetsDrawer();
      this.stagePanel.toggle();
    };

    this.toolDock.onClipboardToggle = () => {
      this.closeAllPopovers();
      this.clipboardOverlay.toggle();
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
      this.brushPanel.togglePresetsDrawer('brushes');
    };
    this.contextMenu.onAnimationClick = () => {
      this.brushPanel.togglePresetsDrawer('animations');
    };
    this.contextMenu.onSizeClick = (anchorY: number) => {
      this.brushPanel.showSliderPopover('size', anchorY);
    };
    this.contextMenu.onOpacityClick = (anchorY: number) => {
      this.brushPanel.showSliderPopover('opacity', anchorY);
    };
    this.contextMenu.onColorClick = () => {
      this.brushPanel.colorWheelModal.toggle();
    };

    this.engine.brushEngine.onPresetChange = () => {
      this.contextMenu.refresh();
    };

    this.engine.brushEngine.onAnimatedOverlayChange = () => {
      this.contextMenu.refresh();
    };

    this.engine.onToolChange = (tool) => {
      this.joystickWidget.setVisible(tool === 'transform');
      this.contextMenu.refresh();
      if (this.toolDock.onActiveToolChange) this.toolDock.onActiveToolChange(tool);
    };

    this.engine.onCurveCreated = () => {
      this.stagePanel.refresh();
      this.sequenceTimeline.refresh();
      this.contextMenu.refresh();
    };

    // Cursor Feedback Event Binding
    this.engine.onCursorFeedback = (data) => {
      if (data.isDown) {
        // Touch Cursor Active (Drawing / Touching)
        this.penHoverCursorEl.style.opacity = '0';

        const radius = data.radiusPx || 12;
        this.touchCursorEl.style.left = `${data.screenX}px`;
        this.touchCursorEl.style.top = `${data.screenY}px`;
        this.touchCursorEl.style.width = `${radius * 2}px`;
        this.touchCursorEl.style.height = `${radius * 2}px`;
        this.touchCursorEl.style.backgroundColor = data.colorHex || '#2563eb';
        this.touchCursorEl.style.opacity = '0.85';
      } else if (data.type === 'hover') {
        // Pen Cursor Active (Hovering with Stylus)
        this.touchCursorEl.style.opacity = '0';

        this.penHoverCursorEl.style.left = `${data.screenX}px`;
        this.penHoverCursorEl.style.top = `${data.screenY}px`;
        this.penHoverCursorEl.style.opacity = '1';

        if (data.worldPos && this.penCoordBadgeEl) {
          const { x, y, z } = data.worldPos;
          this.penCoordBadgeEl.textContent = `X: ${x.toFixed(2)} Y: ${y.toFixed(2)} Z: ${z.toFixed(2)}`;
        }
      } else {
        // Pointer Up / Inactive
        this.touchCursorEl.style.opacity = '0';
        this.penHoverCursorEl.style.opacity = '0';
      }
    };

    this.engine.onCursorHoverEnd = () => {
      this.touchCursorEl.style.opacity = '0';
      this.penHoverCursorEl.style.opacity = '0';
    };
  }
}
