import * as THREE from 'three';
import { StageManager } from '../scene/StageManager';
import { FeatherCurve } from '../scene/FeatherCurve';
import { HistoryManager, ICommand } from '../core/HistoryManager';
import { CurvePoint } from '../math/CurveMath';

export class DeformCurveCommand implements ICommand {
  private curve: FeatherCurve;
  private oldPoints: CurvePoint[];
  private newPoints: CurvePoint[];

  constructor(curve: FeatherCurve, oldPoints: CurvePoint[], newPoints: CurvePoint[]) {
    this.curve = curve;
    this.oldPoints = oldPoints.map(p => ({
      position: p.position.clone(),
      pressure: p.pressure,
      tilt: p.tilt.clone(),
      time: p.time
    }));
    this.newPoints = newPoints.map(p => ({
      position: p.position.clone(),
      pressure: p.pressure,
      tilt: p.tilt.clone(),
      time: p.time
    }));
  }

  public execute(): void {
    this.curve.points = this.newPoints.map(p => ({
      position: p.position.clone(),
      pressure: p.pressure,
      tilt: p.tilt.clone(),
      time: p.time
    }));
    this.curve.updateGeometry();
  }

  public undo(): void {
    this.curve.points = this.oldPoints.map(p => ({
      position: p.position.clone(),
      pressure: p.pressure,
      tilt: p.tilt.clone(),
      time: p.time
    }));
    this.curve.updateGeometry();
  }
}

export class LiquifyTool {
  private stageManager: StageManager;
  private historyManager: HistoryManager;
  public radius: number = 0.5;
  public strength: number = 1.0;
  private activeDeformedCurves: Map<string, CurvePoint[]> = new Map();

  constructor(stageManager: StageManager, historyManager: HistoryManager) {
    this.stageManager = stageManager;
    this.historyManager = historyManager;
  }

  public startDeform(): void {
    this.activeDeformedCurves.clear();
  }

  /**
   * Displaces curve control points within radius R along deltaVector.
   */
  public applyDeform(
    brushCenter: THREE.Vector3,
    deltaVector: THREE.Vector3
  ): void {
    const allCurves = this.stageManager.getAllCurves();

    allCurves.forEach(curve => {
      if (curve.locked || !curve.visible) return;

      let curveModified = false;

      // Cache original points for undo before first modification in this gesture
      if (!this.activeDeformedCurves.has(curve.id)) {
        this.activeDeformedCurves.set(
          curve.id,
          curve.points.map(p => ({
            position: p.position.clone(),
            pressure: p.pressure,
            tilt: p.tilt.clone(),
            time: p.time
          }))
        );
      }

      for (let i = 0; i < curve.points.length; i++) {
        const pt = curve.points[i];
        const dist = pt.position.distanceTo(brushCenter);

        if (dist <= this.radius) {
          // Smoothstep weight falloff: W(d) = 1.0 - 3(d/R)^2 + 2(d/R)^3
          const normD = dist / this.radius;
          const weight = 1.0 - 3.0 * Math.pow(normD, 2) + 2.0 * Math.pow(normD, 3);
          const displacement = deltaVector.clone().multiplyScalar(weight * this.strength);

          pt.position.add(displacement);
          curveModified = true;
        }
      }

      if (curveModified) {
        curve.updateGeometry();
      }
    });
  }

  public endDeform(): void {
    this.activeDeformedCurves.forEach((oldPts, curveId) => {
      const curve = this.stageManager.findCurveById(curveId);
      if (curve) {
        const cmd = new DeformCurveCommand(curve, oldPts, curve.points);
        this.historyManager.recordExecuted(cmd);
      }
    });
    this.activeDeformedCurves.clear();
  }
}
