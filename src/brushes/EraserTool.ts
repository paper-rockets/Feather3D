import * as THREE from 'three';
import { StageManager } from '../scene/StageManager';
import { FeatherCurve } from '../scene/FeatherCurve';
import { HistoryManager, ICommand } from '../core/HistoryManager';
import { CurvePoint } from '../math/CurveMath';

export type EraserMode = 'erase' | 'vacuum';

export class DeleteCurveCommand implements ICommand {
  private stageManager: StageManager;
  private curve: FeatherCurve;
  private layerIndex: number;

  constructor(stageManager: StageManager, curve: FeatherCurve, layerIndex: number) {
    this.stageManager = stageManager;
    this.curve = curve;
    this.layerIndex = layerIndex;
  }

  public execute(): void {
    this.stageManager.removeCurve(this.curve.id);
  }

  public undo(): void {
    const layer = this.stageManager.layers[this.layerIndex] || this.stageManager.activeLayer;
    layer.addCurve(this.curve);
  }
}

export class SplitCurveCommand implements ICommand {
  private stageManager: StageManager;
  private originalCurve: FeatherCurve;
  private newCurves: FeatherCurve[];
  private layerIndex: number;

  constructor(
    stageManager: StageManager,
    originalCurve: FeatherCurve,
    newCurves: FeatherCurve[],
    layerIndex: number
  ) {
    this.stageManager = stageManager;
    this.originalCurve = originalCurve;
    this.newCurves = newCurves;
    this.layerIndex = layerIndex;
  }

  public execute(): void {
    const layer = this.stageManager.layers[this.layerIndex] || this.stageManager.activeLayer;
    this.stageManager.removeCurve(this.originalCurve.id);
    for (const c of this.newCurves) {
      layer.addCurve(c);
    }
  }

  public undo(): void {
    const layer = this.stageManager.layers[this.layerIndex] || this.stageManager.activeLayer;
    for (const c of this.newCurves) {
      this.stageManager.removeCurve(c.id);
    }
    layer.addCurve(this.originalCurve);
  }
}

export class EraserTool {
  private stageManager: StageManager;
  private historyManager: HistoryManager;
  private raycaster: THREE.Raycaster;
  public mode: EraserMode = 'erase';
  public radius: number = 0.1;

  constructor(stageManager: StageManager, historyManager: HistoryManager) {
    this.stageManager = stageManager;
    this.historyManager = historyManager;
    this.raycaster = new THREE.Raycaster();
  }

  public setMode(mode: EraserMode): void {
    this.mode = mode;
  }

  public toggleMode(): EraserMode {
    this.mode = this.mode === 'erase' ? 'vacuum' : 'erase';
    return this.mode;
  }

  /**
   * Erases or vacuums curve under the pointer NDC.
   */
  public eraseAt(ndc: THREE.Vector2, camera: THREE.Camera): boolean {
    this.raycaster.setFromCamera(ndc, camera);
    const allCurves = this.stageManager.getAllCurves();
    const meshes = allCurves.map(c => c.mesh);

    const intersects = this.raycaster.intersectObjects(meshes, false);
    if (intersects.length > 0) {
      const hit = intersects[0];
      const curveId = hit.object.userData.curveId;
      if (curveId) {
        const curve = this.stageManager.findCurveById(curveId);
        if (curve && !curve.locked) {
          const layerIndex = this.stageManager.activeLayerIndex;

          if (this.mode === 'vacuum') {
            const cmd = new DeleteCurveCommand(this.stageManager, curve, layerIndex);
            this.historyManager.execute(cmd);
            return true;
          } else {
            // Point Eraser: Trim or split curve around the contact point
            const hitPoint = hit.point;
            const pts = curve.points;
            const eraseRadius = this.radius;

            const remainingSegments: CurvePoint[][] = [];
            let currentSegment: CurvePoint[] = [];

            for (const pt of pts) {
              if (pt.position.distanceTo(hitPoint) > eraseRadius) {
                currentSegment.push(pt);
              } else {
                if (currentSegment.length >= 2) {
                  remainingSegments.push(currentSegment);
                }
                currentSegment = [];
              }
            }
            if (currentSegment.length >= 2) {
              remainingSegments.push(currentSegment);
            }

            if (remainingSegments.length === 0) {
              const cmd = new DeleteCurveCommand(this.stageManager, curve, layerIndex);
              this.historyManager.execute(cmd);
              return true;
            } else {
              const newCurves = remainingSegments.map((segmentPts, i) => {
                return new FeatherCurve(
                  segmentPts,
                  curve.profile,
                  curve.size,
                  curve.color.clone(),
                  curve.alpha,
                  curve.materialType,
                  `curve_${Date.now()}_${i}`
                );
              });

              const cmd = new SplitCurveCommand(this.stageManager, curve, newCurves, layerIndex);
              this.historyManager.execute(cmd);
              return true;
            }
          }
        }
      }
    }
    return false;
  }
}
