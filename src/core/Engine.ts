import * as THREE from 'three';
import { Viewport } from './Viewport';
import { StageManager } from '../scene/StageManager';
import { EnvironmentSettings } from '../scene/EnvironmentSettings';
import { ResourceManager } from '../scene/ResourceManager';
import { GuideManager } from '../guides/GuideManager';
import { BrushEngine } from '../brushes/BrushEngine';
import { HistoryManager, ICommand } from './HistoryManager';
import { SymmetryManager } from './SymmetryManager';
import { InputManager } from './InputManager';
import { TouchGestureManager } from './TouchGestureManager';
import { JoystickController } from '../joystick/JoystickController';
import { EraserTool } from '../brushes/EraserTool';
import { InjectorTool } from '../brushes/InjectorTool';
import { LiquifyTool } from '../brushes/LiquifyTool';
import { SelectionTool } from '../tools/SelectionTool';
import { DrawShapeTool } from '../tools/DrawShapeTool';
import { KeyboardShortcuts } from './KeyboardShortcuts';
import { SqueezeMenuController } from './SqueezeMenuController';
import { ShapeRecognition } from '../math/ShapeRecognition';
import { ClipboardService } from '../io/ClipboardService';
import { CurvePoint, CurveMath } from '../math/CurveMath';
import { FeatherCurve } from '../scene/FeatherCurve';
import { LoftingMath } from '../math/LoftingMath';
import { StrokeGeometryBuilder } from '../geometry/StrokeGeometryBuilder';
import { CustomShaderMaterials } from '../shaders/CustomShaderMaterials';
import { ProjectStorage } from '../io/ProjectStorage';
import { GLTFImportService } from '../io/GLTFImportService';

import { AirbreathEngine, AestheticPreset } from '../rendering/AirbreathEngine';
import { NatureSceneBuilder, NatureSceneOptions } from '../scene/NatureSceneBuilder';

export type ToolType = 'draw' | 'draw_shape' | 'erase' | 'select' | 'loft' | 'liquify' | 'inject' | 'transform' | 'navigate';


export class AddCurveCommand implements ICommand {
  private stageManager: StageManager;
  private curve: FeatherCurve;
  private mirrorCurve: FeatherCurve | null;
  private layerIndex: number;

  constructor(
    stageManager: StageManager,
    curve: FeatherCurve,
    mirrorCurve: FeatherCurve | null,
    layerIndex: number
  ) {
    this.stageManager = stageManager;
    this.curve = curve;
    this.mirrorCurve = mirrorCurve;
    this.layerIndex = layerIndex;
  }

  public execute(): void {
    const layer = this.stageManager.layers[this.layerIndex] || this.stageManager.activeLayer;
    layer.addCurve(this.curve);
    if (this.mirrorCurve) {
      layer.addCurve(this.mirrorCurve);
    }
  }

  public undo(): void {
    this.stageManager.removeCurve(this.curve.id);
    if (this.mirrorCurve) {
      this.stageManager.removeCurve(this.mirrorCurve.id);
    }
  }
}

export class AddLoftedMeshCommand implements ICommand {
  private stageManager: StageManager;
  private mesh: THREE.Mesh;
  private layerIndex: number;

  constructor(stageManager: StageManager, mesh: THREE.Mesh, layerIndex: number) {
    this.stageManager = stageManager;
    this.mesh = mesh;
    this.layerIndex = layerIndex;
  }

  public execute(): void {
    const layer = this.stageManager.layers[this.layerIndex] || this.stageManager.activeLayer;
    layer.addLoftedMesh(this.mesh);
  }

  public undo(): void {
    const layer = this.stageManager.layers[this.layerIndex] || this.stageManager.activeLayer;
    layer.group.remove(this.mesh);
  }
}

export class Engine {
  public scene: THREE.Scene;
  public viewport: Viewport;
  public stageManager: StageManager;
  public environment: EnvironmentSettings;
  public resourceManager: ResourceManager;
  public guideManager: GuideManager;
  public brushEngine: BrushEngine;
  public historyManager: HistoryManager;
  public symmetryManager: SymmetryManager;
  public airbreath: AirbreathEngine;
  public joystickController: JoystickController;
  public eraserTool: EraserTool;
  public injectorTool: InjectorTool;
  public liquifyTool: LiquifyTool;
  public selectionTool: SelectionTool;
  public drawShapeTool: DrawShapeTool;
  public keyboardShortcuts: KeyboardShortcuts;
  public squeezeMenu: SqueezeMenuController;
  public inputManager: InputManager;
  public touchGestures: TouchGestureManager;

  public activeTool: ToolType = 'draw';
  public isDrawing: boolean = false;
  public shapeAssistEnabled: boolean = false;
  public isARActive: boolean = false;

  private currentRawPoints: CurvePoint[] = [];
  private liveStrokeMesh: THREE.Mesh | null = null;
  private liveMirrorMesh: THREE.Mesh | null = null;
  public loftSelectedCurves: FeatherCurve[] = [];
  private lastDragPoint3D: THREE.Vector3 | null = null;
  private lastPointerScreenPos: { x: number; y: number } = { x: 0, y: 0 };
  private lassoScreenPts: Array<{ x: number; y: number }> = [];
  private shapeHoldTimer: number | null = null;

  public onToolChange?: (tool: ToolType) => void;
  public onCurveCreated?: (curve: FeatherCurve) => void;
  public onToggleHideUI?: () => void;
  public onFingerPenChange?: (enabled: boolean) => void;
  public onOpenTutorial?: (tab?: any) => void;
  public onCursorFeedback?: (data: {
    type: 'touch' | 'pen' | 'hover';
    screenX: number;
    screenY: number;
    isDown: boolean;
    colorHex?: string;
    radiusPx?: number;
    worldPos?: THREE.Vector3;
  }) => void;
  public onCursorHoverEnd?: () => void;

  constructor(container: HTMLElement) {
    this.scene = new THREE.Scene();
    this.viewport = new Viewport(container);
    this.stageManager = new StageManager();
    this.environment = new EnvironmentSettings();
    this.resourceManager = new ResourceManager();
    this.guideManager = new GuideManager();
    this.brushEngine = new BrushEngine();
    this.historyManager = new HistoryManager();
    this.symmetryManager = new SymmetryManager();
    this.joystickController = new JoystickController();
    this.selectionTool = new SelectionTool(this.stageManager, this.historyManager);
    this.drawShapeTool = new DrawShapeTool();

    this.airbreath = new AirbreathEngine(
      this.viewport.renderer,
      this.scene,
      this.viewport.camera
    );

    this.eraserTool = new EraserTool(this.stageManager, this.historyManager);
    this.injectorTool = new InjectorTool(this.stageManager, this.brushEngine);
    this.liquifyTool = new LiquifyTool(this.stageManager, this.historyManager);
    this.keyboardShortcuts = new KeyboardShortcuts(this);
    this.squeezeMenu = new SqueezeMenuController(this);


    // Assemble scene graph
    this.scene.background = new THREE.Color(this.environment.config.bgColor);
    this.scene.add(this.environment.environmentGroup);
    this.scene.add(this.stageManager.rootGroup);
    this.scene.add(this.guideManager.guideGroup);
    this.scene.add(this.resourceManager.resourceGroup);
    this.scene.add(this.symmetryManager.symmetryGroup);
    this.scene.add(this.joystickController.gizmo.group);
    this.scene.add(this.selectionTool.selectionGroup);

    // Context awareness: Collapse depth axis in orthographic Perfect View
    this.viewport.onPerfectViewChange = (isPerfect, collapsedAxis) => {
      this.joystickController.collapseAxis(isPerfect ? collapsedAxis : null);
    };

    // Setup Inputs
    this.inputManager = new InputManager(container, {
      onPointerDrawStart: this.handlePointerStart.bind(this),
      onPointerDrawMove: this.handlePointerMove.bind(this),
      onPointerDrawEnd: this.handlePointerEnd.bind(this),
      onStylusBarrelButton: (sx, sy) => {
        if (this.squeezeMenu.isVisible) {
          this.squeezeMenu.hide();
        } else {
          this.squeezeMenu.showAt(sx, sy);
        }
      },
      onStylusHover: (sx, sy, ndc) => {
        if (this.activeTool === 'inject') {
          // Update loupe position while hovering
        }
        const snap = this.guideManager.snap(ndc, this.viewport.activeCamera);
        if (this.onCursorFeedback) {
          this.onCursorFeedback({
            type: 'hover',
            screenX: sx,
            screenY: sy,
            isDown: false,
            colorHex: '#' + this.brushEngine.color.getHexString(),
            radiusPx: Math.max(8, this.brushEngine.size * 300),
            worldPos: snap ? snap.point : undefined
          });
        }
      },
      onPenActiveChange: (active) => {
        // While the stylus is drawing, suppress 1-finger orbit so a resting
        // hand/finger doesn't spin the camera.
        this.touchGestures.setPenActive(active);
      }
    });

    this.touchGestures = new TouchGestureManager(container, {
      onOneFingerOrbit: (dx, dy) => {
        if (this.activeTool === 'navigate' || !this.isDrawing) {
          this.viewport.orbit(dx, dy);
        }
      },
      onOneFingerDoubleTap: () => {
        this.viewport.snapToNearestPerfectView();
      },
      onTwoFingerPan: (dx, dy) => this.viewport.pan(dx, dy),
      onTwoFingerZoom: (factor) => this.viewport.zoom(factor),
      onTwoFingerRotate: (dAngle) => {
        // Two-finger roll
      },
      onThreeFingerTap: () => this.historyManager.undo(),
      onThreeFingerDoubleTap: () => this.viewport.toggleProjection(),
      onThreeFingerSwipeVertical: (deltaY) => {
        // Continuous FOV zoom distortion (10mm to 500mm focal length)
        const currentFocal = this.viewport.focalLengthMm;
        const sensitivity = 0.4;
        this.viewport.setFocalLengthMm(currentFocal - deltaY * sensitivity);
      },
      onThreeFingerSwipe: (dir, delta) => {
        if (dir === 'up' || dir === 'down') {
          const currentFocal = this.viewport.focalLengthMm;
          const deltaMm = dir === 'up' ? 2 : -2;
          this.viewport.setFocalLengthMm(currentFocal + deltaMm);
        } else if (dir === 'right') {
          this.historyManager.redo();
        } else {
          this.historyManager.undo();
        }
      },
      onOneFingerHoldPinOrbit: (sx, sy) => {
        const ndc = new THREE.Vector2(
          (sx / window.innerWidth) * 2 - 1,
          -(sy / window.innerHeight) * 2 + 1
        );
        const snap = this.guideManager.snap(ndc, this.viewport.activeCamera);
        if (snap) {
          this.viewport.setOrbitPoint(snap.point);
          this.squeezeMenu.triggerHaptic('medium');
        }
      },
      onGestureCancelDrawing: () => {
        this.cancelDrawing();
      }
    });


    this.inputManager.onFingerPenChange = (enabled) => {
      this.touchGestures.setFingerPenMode(enabled);
    };

    this.setupXRControllers();
  }

  /**
   * WEBGPU-MIGRATION: async bootstrap. Awaits the renderer's GPU context, then
   * starts the render loop. Must be awaited before the app is considered ready.
   */
  public async init(): Promise<void> {
    await this.viewport.init();
    this.startRenderLoop();
  }

  public toggleFingerPen(enabled?: boolean): boolean {
    const next = enabled !== undefined ? enabled : !this.inputManager.isFingerPenMode;
    this.inputManager.setFingerPenMode(next);
    this.touchGestures.setFingerPenMode(next);
    return next;
  }

  public setTool(tool: ToolType): void {
    this.activeTool = tool;
    this.loftSelectedCurves = [];
    this.cancelDrawing();
    this.joystickController.setEnabled(tool === 'transform');

    if (tool === 'transform' && this.selectionTool.selectedCurves.length > 0) {
      this.joystickController.setTarget(this.selectionTool.selectedCurves[0].mesh);
    }

    if (this.onToolChange) {
      this.onToolChange(tool);
    }
  }

  public cancelDrawing(): void {
    this.clearShapeHoldTimer();
    this.drawShapeTool.cancel();
    this.isDrawing = false;
    this.removeLiveStrokeMeshes();
    this.currentRawPoints = [];
    this.inputManager.cancelCurrentPointer();
  }

  private clearShapeHoldTimer(): void {
    if (this.shapeHoldTimer !== null) {
      clearTimeout(this.shapeHoldTimer);
      this.shapeHoldTimer = null;
    }
  }


  public deleteSelectedCurves(): void {
    if (this.selectionTool.selectedCurves.length === 0) return;
    this.selectionTool.selectedCurves.forEach(c => {
      this.stageManager.removeCurve(c.id);
    });
    this.selectionTool.clearSelection();
  }

  public async copySelectedCurves(): Promise<boolean> {
    return ClipboardService.copyCurves(this.selectionTool.selectedCurves);
  }

  public async pasteCurves(): Promise<void> {
    const data = await ClipboardService.pasteCurves();
    if (data && data.length > 0) {
      const cloned = data.map(d => FeatherCurve.fromJSON(d));
      cloned.forEach(c => {
        c.points.forEach(p => p.position.add(new THREE.Vector3(0.05, 0.05, 0)));
        c.updateGeometry();
        this.stageManager.activeLayer.addCurve(c);
      });
      this.selectionTool.selectedCurves = cloned;
      this.selectionTool.updateVisuals();
    }
  }

  private handlePointerStart(pt: CurvePoint, ndc: THREE.Vector2, e: PointerEvent): void {
    this.lastPointerScreenPos = { x: e.clientX, y: e.clientY };

    if (this.onCursorFeedback) {
      this.onCursorFeedback({
        type: e.pointerType === 'pen' ? 'pen' : 'touch',
        screenX: e.clientX,
        screenY: e.clientY,
        isDown: true,
        colorHex: '#' + this.brushEngine.color.getHexString(),
        radiusPx: Math.max(6, (this.brushEngine.size * 300) * (pt.pressure || 0.5))
      });
    }

    if (this.activeTool === 'navigate') {
      return;
    }

    if (this.activeTool === 'select') {
      this.lassoScreenPts = [{ x: e.clientX, y: e.clientY }];
      return;
    }

    if (this.activeTool === 'erase') {
      this.eraserTool.eraseAt(ndc, this.viewport.activeCamera);
      return;
    }

    if (this.activeTool === 'inject') {
      this.injectorTool.sampleStrokeAt(ndc, this.viewport.activeCamera);
      return;
    }

    if (this.activeTool === 'loft') {
      this.handleLoftSelection(ndc);
      return;
    }

    if (this.activeTool === 'liquify') {
      const snap = this.guideManager.snap(ndc, this.viewport.activeCamera);
      if (snap) {
        this.lastDragPoint3D = snap.point.clone();
        this.liquifyTool.startDeform();
      }
      return;
    }

    if (this.activeTool === 'draw' || this.activeTool === 'draw_shape') {
      const snap = this.guideManager.snap(ndc, this.viewport.activeCamera);
      if (!snap) return;

      this.isDrawing = true;
      this.clearShapeHoldTimer();

      const worldPt: CurvePoint = {
        position: snap.point.clone(),
        pressure: pt.pressure,
        tilt: pt.tilt.clone(),
        time: pt.time
      };

      this.currentRawPoints = [worldPt];
      this.createLiveStrokeMeshes();

      if (this.activeTool === 'draw_shape' || this.shapeAssistEnabled) {
        this.drawShapeTool.startStroke(pt, snap.point);
        this.shapeHoldTimer = window.setTimeout(() => {
          if (this.isDrawing && this.currentRawPoints.length >= 3) {
            const lastPos = this.currentRawPoints[this.currentRawPoints.length - 1].position;
            const fitted = this.drawShapeTool.triggerHold(lastPos);
            if (fitted && fitted.length > 0) {
              this.currentRawPoints = fitted;
              this.updateLiveStrokeMeshes();
              this.squeezeMenu.triggerHaptic('light');
            }
          }
        }, 320);
      }
    }
  }

  private handlePointerMove(pt: CurvePoint, ndc: THREE.Vector2, e: PointerEvent): void {
    if (this.onCursorFeedback && (this.isDrawing || this.activeTool === 'draw' || this.activeTool === 'draw_shape')) {
      this.onCursorFeedback({
        type: e.pointerType === 'pen' ? 'pen' : 'touch',
        screenX: e.clientX,
        screenY: e.clientY,
        isDown: true,
        colorHex: '#' + this.brushEngine.color.getHexString(),
        radiusPx: Math.max(6, (this.brushEngine.size * 300) * (pt.pressure || 0.5))
      });
    }

    if (this.activeTool === 'navigate') {
      const dx = e.clientX - this.lastPointerScreenPos.x;
      const dy = e.clientY - this.lastPointerScreenPos.y;
      this.viewport.orbit(dx, dy);
      this.lastPointerScreenPos = { x: e.clientX, y: e.clientY };
      return;
    }

    if (this.activeTool === 'select') {
      this.lassoScreenPts.push({ x: e.clientX, y: e.clientY });
      return;
    }

    if (this.activeTool === 'erase' && e.buttons > 0) {
      this.eraserTool.eraseAt(ndc, this.viewport.activeCamera);
      return;
    }

    if (this.activeTool === 'liquify' && this.lastDragPoint3D) {
      const snap = this.guideManager.snap(ndc, this.viewport.activeCamera);
      if (snap) {
        const curPt = snap.point.clone();
        const delta = curPt.clone().sub(this.lastDragPoint3D);
        this.liquifyTool.applyDeform(curPt, delta);
        this.lastDragPoint3D.copy(curPt);
      }
      return;
    }

    if ((this.activeTool === 'draw' || this.activeTool === 'draw_shape') && this.isDrawing) {
      const snap = this.guideManager.snap(ndc, this.viewport.activeCamera);
      if (!snap) return;

      if (this.drawShapeTool.isHoldActive) {
        const adjusted = this.drawShapeTool.updateHoldDrag(snap.point);
        if (adjusted && adjusted.length > 0) {
          this.currentRawPoints = adjusted;
          this.updateLiveStrokeMeshes();
        }
        return;
      }

      const prev = this.currentRawPoints[this.currentRawPoints.length - 1];
      const smoothedPos = CurveMath.smoothEMA(
        prev.position,
        snap.point,
        this.brushEngine.smoothingAlpha
      );

      if (smoothedPos.distanceTo(prev.position) > 0.002) {
        const newPt: CurvePoint = {
          position: smoothedPos,
          pressure: pt.pressure,
          tilt: pt.tilt.clone(),
          time: pt.time
        };
        this.currentRawPoints.push(newPt);
        this.updateLiveStrokeMeshes();

        if (this.activeTool === 'draw_shape' || this.shapeAssistEnabled) {
          this.drawShapeTool.addPoint(pt, smoothedPos);
          this.clearShapeHoldTimer();
          this.shapeHoldTimer = window.setTimeout(() => {
            if (this.isDrawing && this.currentRawPoints.length >= 3) {
              const lastPos = this.currentRawPoints[this.currentRawPoints.length - 1].position;
              const fitted = this.drawShapeTool.triggerHold(lastPos);
              if (fitted && fitted.length > 0) {
                this.currentRawPoints = fitted;
                this.updateLiveStrokeMeshes();
                this.squeezeMenu.triggerHaptic('light');
              }
            }
          }, 320);
        }
      }
    }
  }

  private handlePointerEnd(e: PointerEvent): void {
    this.clearShapeHoldTimer();

    if (this.onCursorFeedback) {
      this.onCursorFeedback({
        type: e.pointerType === 'pen' ? 'pen' : 'touch',
        screenX: e.clientX,
        screenY: e.clientY,
        isDown: false
      });
    }

    if (this.activeTool === 'select') {
      if (this.lassoScreenPts.length > 5) {
        this.selectionTool.selectByLasso(
          this.lassoScreenPts,
          this.viewport.activeCamera,
          window.innerWidth,
          window.innerHeight
        );
      }
      this.lassoScreenPts = [];
      return;
    }

    if (this.activeTool === 'liquify') {
      this.liquifyTool.endDeform();
      this.lastDragPoint3D = null;
      return;
    }

    if ((this.activeTool === 'draw' || this.activeTool === 'draw_shape') && this.isDrawing) {
      this.isDrawing = false;

      if (this.currentRawPoints.length >= 2) {
        let finalPoints = CurveMath.resampleCurve(this.currentRawPoints, 4);

        // Shape Auto-Completion and hold-and-drag committed shape
        if (this.drawShapeTool.isHoldActive) {
          const committed = this.drawShapeTool.commitShape();
          if (committed && committed.length >= 2) {
            finalPoints = committed;
          }
        } else if (this.activeTool === 'draw_shape' || this.shapeAssistEnabled) {
          const shapeData = DrawShapeTool.recognizeAndFit(finalPoints);
          if (shapeData.type !== 'none' && shapeData.points.length >= 2) {
            finalPoints = shapeData.points;
          }
          this.drawShapeTool.cancel();
        } else {
          this.drawShapeTool.cancel();
        }

        const curve = new FeatherCurve(
          finalPoints,
          this.brushEngine.profile,
          this.brushEngine.size,
          this.brushEngine.color,
          this.brushEngine.opacity,
          this.brushEngine.materialType
        );

        let mirrorCurve: FeatherCurve | null = null;
        if (this.symmetryManager.axis !== 'none') {
          const mirroredPts = this.symmetryManager.mirrorPoints(finalPoints);
          if (mirroredPts.length > 1) {
            mirrorCurve = new FeatherCurve(
              mirroredPts,
              this.brushEngine.profile,
              this.brushEngine.size,
              this.brushEngine.color,
              this.brushEngine.opacity,
              this.brushEngine.materialType
            );
          }
        }

        const cmd = new AddCurveCommand(
          this.stageManager,
          curve,
          mirrorCurve,
          this.stageManager.activeLayerIndex
        );
        this.historyManager.execute(cmd);

        if (this.onCurveCreated) {
          this.onCurveCreated(curve);
        }
      }

      this.removeLiveStrokeMeshes();
      this.currentRawPoints = [];
    }
  }


  private createLiveStrokeMeshes(): void {
    const geo = new THREE.BufferGeometry();
    const mat = CustomShaderMaterials.createMaterial({
      type: this.brushEngine.materialType,
      opacity: this.brushEngine.opacity
    });

    this.liveStrokeMesh = new THREE.Mesh(geo, mat);
    this.scene.add(this.liveStrokeMesh);

    if (this.symmetryManager.axis !== 'none') {
      this.liveMirrorMesh = new THREE.Mesh(geo.clone(), mat.clone());
      this.scene.add(this.liveMirrorMesh);
    }
  }

  private updateLiveStrokeMeshes(): void {
    if (!this.liveStrokeMesh || this.currentRawPoints.length < 2) return;

    const resampled = CurveMath.resampleCurve(this.currentRawPoints, 2);
    const newGeo = StrokeGeometryBuilder.buildGeometry(resampled, {
      profile: this.brushEngine.profile,
      size: this.brushEngine.size,
      color: this.brushEngine.color,
      alpha: this.brushEngine.opacity,
      taperStart: this.brushEngine.taperStart,
      taperEnd: false,
      scatterType: this.brushEngine.materialType === 'foliage_fir' ? 'foliage_fir' : undefined
    });

    this.liveStrokeMesh.geometry.dispose();
    this.liveStrokeMesh.geometry = newGeo;

    if (this.liveMirrorMesh && this.symmetryManager.axis !== 'none') {
      const mirrorPts = this.symmetryManager.mirrorPoints(resampled);
      if (mirrorPts.length > 1) {
        const mirrorGeo = StrokeGeometryBuilder.buildGeometry(mirrorPts, {
          profile: this.brushEngine.profile,
          size: this.brushEngine.size,
          color: this.brushEngine.color,
          alpha: this.brushEngine.opacity,
          taperStart: this.brushEngine.taperStart,
          taperEnd: false
        });
        this.liveMirrorMesh.geometry.dispose();
        this.liveMirrorMesh.geometry = mirrorGeo;
      }
    }
  }

  private removeLiveStrokeMeshes(): void {
    if (this.liveStrokeMesh) {
      this.scene.remove(this.liveStrokeMesh);
      this.liveStrokeMesh.geometry.dispose();
      (this.liveStrokeMesh.material as THREE.Material).dispose();
      this.liveStrokeMesh = null;
    }
    if (this.liveMirrorMesh) {
      this.scene.remove(this.liveMirrorMesh);
      this.liveMirrorMesh.geometry.dispose();
      (this.liveMirrorMesh.material as THREE.Material).dispose();
      this.liveMirrorMesh = null;
    }
  }

  private handleLoftSelection(ndc: THREE.Vector2): void {
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(ndc, this.viewport.activeCamera);
    const allCurves = this.stageManager.getAllCurves();
    const meshes = allCurves.map(c => c.mesh);

    const intersects = raycaster.intersectObjects(meshes, false);
    if (intersects.length > 0) {
      const curveId = intersects[0].object.userData.curveId;
      const curve = this.stageManager.findCurveById(curveId);
      if (curve) {
        if (!this.loftSelectedCurves.includes(curve)) {
          this.loftSelectedCurves.push(curve);
        }

        if (this.loftSelectedCurves.length === 2) {
          const geo = LoftingMath.loftBetweenTwoCurves(
            this.loftSelectedCurves[0].points,
            this.loftSelectedCurves[1].points,
            32,
            12
          );

          const mat = new THREE.MeshStandardMaterial({
            color: this.brushEngine.color,
            roughness: 0.4,
            metalness: 0.1,
            side: THREE.DoubleSide
          });

          const mesh = new THREE.Mesh(geo, mat);
          const cmd = new AddLoftedMeshCommand(
            this.stageManager,
            mesh,
            this.stageManager.activeLayerIndex
          );
          this.historyManager.execute(cmd);

          this.loftSelectedCurves = [];
        }
      }
    }
  }

  public applyLofting(tension: number = 0.5): void {
    if (this.loftSelectedCurves.length < 2) return;
    const curvePointsList = this.loftSelectedCurves.map(c => c.points);
    const geo = LoftingMath.loftMultiCurves(curvePointsList, 32, tension);

    const mat = new THREE.MeshStandardMaterial({
      color: this.brushEngine.color,
      roughness: 0.4,
      metalness: 0.1,
      side: THREE.DoubleSide
    });

    const mesh = new THREE.Mesh(geo, mat);
    const cmd = new AddLoftedMeshCommand(
      this.stageManager,
      mesh,
      this.stageManager.activeLayerIndex
    );
    this.historyManager.execute(cmd);
    this.loftSelectedCurves = [];
  }

  public async captureAndSaveThumbnail(): Promise<string> {
    const dataUrl = this.viewport.canvas.toDataURL('image/jpeg', 0.85);
    const curves = this.stageManager.getAllCurves();
    const projectId = `proj_${Date.now()}`;
    const projectJson = JSON.stringify({
      version: '2.0.0',
      layers: this.stageManager.layers.map(l => l.toJSON())
    });

    await ProjectStorage.saveProject(
      projectId,
      `Sketch_${new Date().toLocaleTimeString().replace(/:/g, '')}`,
      projectJson,
      curves.length,
      dataUrl
    );

    this.squeezeMenu.triggerHaptic('heavy');
    return dataUrl;
  }

  public toggleARViewer(): void {
    this.isARActive = !this.isARActive;
    if (this.isARActive) {
      this.environment.setBgColor('transparent', this.scene);
      this.viewport.canvas.style.backgroundColor = 'transparent';
      alert('AR Mode Activated: Set to transparent pass-through background with real-world spatial framing.');
    } else {
      this.environment.setBgColor(this.environment.config.bgColor, this.scene);
    }
  }

  public async importGLBFromFile(file: File): Promise<THREE.Group> {
    const result = await GLTFImportService.loadFromFile(file);
    GLTFImportService.fitToScene(result.scene);
    GLTFImportService.sanitizeModelMaterials(result.scene);
    this.stageManager.activeLayer.group.add(result.scene);
    console.log(`[Feather3D] Imported model: ${result.name}`);
    return result.scene;
  }

  public async importGLBFromURL(url: string): Promise<THREE.Group> {
    const result = await GLTFImportService.loadFromURL(url);
    GLTFImportService.fitToScene(result.scene);
    GLTFImportService.sanitizeModelMaterials(result.scene);
    this.stageManager.activeLayer.group.add(result.scene);
    console.log(`[Feather3D] Imported model: ${result.name}`);
    return result.scene;
  }

  public snapActiveLayerToGround(): void {
    const activeGroup = this.stageManager.activeLayer?.group;
    if (activeGroup) {
      GLTFImportService.snapToGround(activeGroup);
    }
  }

  public openFilePicker(): void {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.glb,.gltf,model/gltf-binary,model/gltf+json';
    input.style.display = 'none';
    document.body.appendChild(input);
    input.onchange = async () => {
      const file = input.files?.[0];
      if (file) {
        try {
          await this.importGLBFromFile(file);
        } catch (err) {
          console.error('[Feather3D] Failed to import model:', err);
          alert(`Failed to import model: ${err instanceof Error ? err.message : String(err)}`);
        }
      }
      if (document.body.contains(input)) {
        document.body.removeChild(input);
      }
    };
    input.click();
  }

  public animationCallbacks: Array<(delta: number, elapsed: number) => void> = [];

  public addAnimationCallback(cb: (delta: number, elapsed: number) => void): () => void {
    this.animationCallbacks.push(cb);
    return () => {
      const idx = this.animationCallbacks.indexOf(cb);
      if (idx !== -1) this.animationCallbacks.splice(idx, 1);
    };
  }

  public async loadNatureScene(options?: NatureSceneOptions): Promise<THREE.Group> {
    return NatureSceneBuilder.buildNatureScene(this, options);
  }

  public newSketch(): void {
    NatureSceneBuilder.cleanup(this);
    this.animationCallbacks = [];
    this.stageManager.clear();
    this.historyManager.clear();
    this.selectionTool.clearSelection();
    this.guideManager.clearMeshGuides();
    this.guideManager.setMode('plane');
    this.environment.removeSky(this.scene);
    const isDark = document.body.classList.contains('dark-mode');
    this.environment.setBgColor(isDark ? '#1a1a2e' : '#dcd7ec', this.scene);
    this.environment.toggleGroundGrid(true);
    this.airbreath.applyPreset('cel_shaded');
    this.airbreath.setShadowsEnabled(true);
    this.viewport.setViewPreset('iso');
  }

  public loadCanvasTemplate(templateId: string): THREE.Group | null {
    this.newSketch();
    const guide = this.guideManager.loadTemplateGuide(templateId);
    if (!guide) return null;
    this.activeTool = 'draw';
    if (this.onToolChange) this.onToolChange('draw');
    return guide.group;
  }

  private startRenderLoop(): void {
    window.addEventListener('resize', () => {
      this.airbreath.setSize(window.innerWidth, window.innerHeight);
    });

    const clock = new THREE.Clock();
    // WEBGPU-MIGRATION: renderAsync MUST be awaited before scheduling the next
    // frame. Firing it every requestAnimationFrame without awaiting overlaps
    // async GPU submissions so no draw ever completes -- only the clear color is
    // presented. Await the frame, then schedule the next.
    const animate = async () => {
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();
      this.viewport.update();
      this.environment.updateSkyTime(delta);
      this.environment.updateSkyPosition(this.viewport.activeCamera.position);

      for (let i = 0; i < this.animationCallbacks.length; i++) {
        try {
          this.animationCallbacks[i](delta, elapsed);
        } catch (e) {
          console.error('[Feather3D] Animation callback error:', e);
        }
      }

      this.airbreath.updateCamera(this.viewport.activeCamera);
      try {
        await this.airbreath.render(delta);
      } catch (err) {
        console.error('[Feather3D] Render frame failed:', err);
      }
      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }

  private setupXRControllers(): void {
    const renderer = this.viewport.renderer;
    if (!renderer.xr) return;
    renderer.xr.enabled = true;

    const controller = renderer.xr.getController(0);
    controller.addEventListener('selectstart', () => {
      if (this.activeTool !== 'draw') return;
      this.isDrawing = true;
      this.currentRawPoints = [];
      this.createLiveStrokeMeshes();
    });

    controller.addEventListener('selectend', () => {
      if (this.isDrawing) {
        this.isDrawing = false;
        if (this.currentRawPoints.length >= 2) {
          const finalPoints = CurveMath.resampleCurve(this.currentRawPoints, 4);
          const curve = new FeatherCurve(
            finalPoints,
            this.brushEngine.profile,
            this.brushEngine.size,
            this.brushEngine.color,
            this.brushEngine.opacity,
            this.brushEngine.materialType
          );

          let mirrorCurve: FeatherCurve | null = null;
          if (this.symmetryManager.axis !== 'none') {
            const mirroredPts = this.symmetryManager.mirrorPoints(finalPoints);
            if (mirroredPts.length > 1) {
              mirrorCurve = new FeatherCurve(
                mirroredPts,
                this.brushEngine.profile,
                this.brushEngine.size,
                this.brushEngine.color,
                this.brushEngine.opacity,
                this.brushEngine.materialType
              );
            }
          }

          const cmd = new AddCurveCommand(
            this.stageManager,
            curve,
            mirrorCurve,
            this.stageManager.activeLayerIndex
          );
          this.historyManager.execute(cmd);

          if (this.onCurveCreated) {
            this.onCurveCreated(curve);
          }
        }

        this.removeLiveStrokeMeshes();
        this.currentRawPoints = [];
      }
    });

    this.scene.add(controller);

    this.addAnimationCallback((delta, elapsed) => {
      if (renderer.xr.isPresenting && this.isDrawing) {
        const position = new THREE.Vector3();
        position.setFromMatrixPosition(controller.matrixWorld);

        let pressure = 0.5;
        const session = renderer.xr.getSession();
        if (session && session.inputSources && session.inputSources[0]) {
          const inputSource = session.inputSources[0];
          if (inputSource.gamepad && inputSource.gamepad.buttons[0]) {
            pressure = inputSource.gamepad.buttons[0].value || 0.5;
          }
        }

        const worldPt: CurvePoint = {
          position: position.clone(),
          pressure: Math.max(0.1, pressure),
          tilt: new THREE.Vector2(0, 0),
          time: performance.now()
        };

        if (this.currentRawPoints.length === 0) {
          this.currentRawPoints.push(worldPt);
        } else {
          const prev = this.currentRawPoints[this.currentRawPoints.length - 1];
          if (worldPt.position.distanceTo(prev.position) > 0.002) {
            this.currentRawPoints.push(worldPt);
            this.updateLiveStrokeMeshes();
          }
        }
      }
    });
  }
}

