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

  /**
   * Sets the active erase mode ('erase' for vector point erase, 'vacuum' for binary deletion).
   */
  public setMode(mode: EraserMode): void {
    this.mode = mode;
  }

  public getMode(): EraserMode {
    return this.mode;
  }

  public toggleMode(): EraserMode {
    this.mode = this.mode === 'erase' ? 'vacuum' : 'erase';
    return this.mode;
  }

  /**
   * Finds the layer index containing the given curve ID.
   */
  private findLayerIndexOfCurve(curveId: string): number {
    for (let i = 0; i < this.stageManager.layers.length; i++) {
      if (this.stageManager.layers[i].curves.some(c => c.id === curveId)) {
        return i;
      }
    }
    return this.stageManager.activeLayerIndex;
  }

  /**
   * Erases or vacuums curves under the pointer NDC.
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
        if (curve && !curve.locked && curve.visible) {
          const layerIndex = this.findLayerIndexOfCurve(curve.id);

          if (this.mode === 'vacuum') {
            // Vacuum Mode: binary deletion of the entire curve
            const cmd = new DeleteCurveCommand(this.stageManager, curve, layerIndex);
            this.historyManager.execute(cmd);
            return true;
          } else {
            // Erase Mode: vector point erase within spherical radius
            return this.eraseCurvePointsAt(curve, hit.point, this.radius, layerIndex);
          }
        }
      }
    }
    return false;
  }

  /**
   * Vector point erase at a specific 3D sphere coordinate.
   */
  public eraseSphere(center: THREE.Vector3, radius: number = this.radius): boolean {
    const allCurves = this.stageManager.getAllCurves();
    let anyErased = false;

    for (const curve of allCurves) {
      if (curve.locked || !curve.visible || curve.points.length === 0) continue;

      let hasNearPoint = false;
      for (const pt of curve.points) {
        if (pt.position.distanceTo(center) <= radius) {
          hasNearPoint = true;
          break;
        }
      }

      if (hasNearPoint) {
        const layerIndex = this.findLayerIndexOfCurve(curve.id);
        if (this.mode === 'vacuum') {
          const cmd = new DeleteCurveCommand(this.stageManager, curve, layerIndex);
          this.historyManager.execute(cmd);
          anyErased = true;
        } else {
          const res = this.eraseCurvePointsAt(curve, center, radius, layerIndex);
          if (res) anyErased = true;
        }
      }
    }

    return anyErased;
  }

  /**
   * Performs point-level vector erase on a curve around a 3D center point,
   * splitting the remaining points into new curve segments or deleting if none remain.
   */
  private eraseCurvePointsAt(
    curve: FeatherCurve,
    center: THREE.Vector3,
    eraseRadius: number,
    layerIndex: number
  ): boolean {
    const pts = curve.points;
    const remainingSegments: CurvePoint[][] = [];
    let currentSegment: CurvePoint[] = [];
    let pointsRemoved = 0;

    // Check points strictly within spherical radius
    for (const pt of pts) {
      if (pt.position.distanceTo(center) > eraseRadius) {
        currentSegment.push(pt);
      } else {
        pointsRemoved++;
        if (currentSegment.length >= 2) {
          remainingSegments.push(currentSegment);
        }
        currentSegment = [];
      }
    }
    if (currentSegment.length >= 2) {
      remainingSegments.push(currentSegment);
    }

    // Fallback: If no discrete points fell inside the radius (sparse curve), remove the single closest point
    if (pointsRemoved === 0 && pts.length > 0) {
      let closestIdx = 0;
      let minDistance = Infinity;
      for (let i = 0; i < pts.length; i++) {
        const d = pts[i].position.distanceTo(center);
        if (d < minDistance) {
          minDistance = d;
          closestIdx = i;
        }
      }

      if (minDistance <= eraseRadius * 2.0) {
        const seg1 = pts.slice(0, closestIdx);
        const seg2 = pts.slice(closestIdx + 1);
        if (seg1.length >= 2) remainingSegments.push(seg1);
        if (seg2.length >= 2) remainingSegments.push(seg2);
        pointsRemoved++;
      }
    }

    if (pointsRemoved === 0) {
      return false;
    }

    if (remainingSegments.length === 0) {
      // Entire curve removed or no segments with >= 2 points remain
      const cmd = new DeleteCurveCommand(this.stageManager, curve, layerIndex);
      this.historyManager.execute(cmd);
      return true;
    } else {
      // Rebuild remaining segments as new FeatherCurve instances
      const newCurves = remainingSegments.map((segmentPts, i) => {
        const newCurve = new FeatherCurve(
          segmentPts,
          curve.profile,
          curve.size,
          curve.color.clone(),
          curve.alpha,
          curve.materialType,
          `curve_${Date.now()}_${i}_${Math.random().toString(36).substring(2, 6)}`
        );
        newCurve.taperStart = curve.taperStart;
        newCurve.taperEnd = curve.taperEnd;
        return newCurve;
      });

      const cmd = new SplitCurveCommand(this.stageManager, curve, newCurves, layerIndex);
      this.historyManager.execute(cmd);
      return true;
    }
  }
}

