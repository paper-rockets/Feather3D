import * as THREE from 'three';
import { StageManager } from '../scene/StageManager';
import { FeatherCurve } from '../scene/FeatherCurve';
import { HistoryManager, ICommand } from '../core/HistoryManager';

export class DuplicateCurvesCommand implements ICommand {
  private stageManager: StageManager;
  private newCurves: FeatherCurve[];
  private layerIndex: number;

  constructor(stageManager: StageManager, newCurves: FeatherCurve[], layerIndex: number) {
    this.stageManager = stageManager;
    this.newCurves = newCurves;
    this.layerIndex = layerIndex;
  }

  public execute(): void {
    const layer = this.stageManager.layers[this.layerIndex] || this.stageManager.activeLayer;
    this.newCurves.forEach(c => layer.addCurve(c));
  }

  public undo(): void {
    this.newCurves.forEach(c => this.stageManager.removeCurve(c.id));
  }
}

export class SelectionTool {
  public selectedCurves: FeatherCurve[] = [];
  public selectionBoxHelper: THREE.BoxHelper;
  public selectionGroup: THREE.Group;
  private stageManager: StageManager;
  private historyManager: HistoryManager;

  constructor(stageManager: StageManager, historyManager: HistoryManager) {
    this.stageManager = stageManager;
    this.historyManager = historyManager;

    this.selectionGroup = new THREE.Group();
    this.selectionGroup.name = 'SelectionVisuals';

    const dummy = new THREE.Object3D();
    this.selectionBoxHelper = new THREE.BoxHelper(dummy, 0x00ff00);
    this.selectionBoxHelper.visible = false;
    this.selectionGroup.add(this.selectionBoxHelper);
  }

  public select(curve: FeatherCurve, multiSelect: boolean = false): void {
    if (!multiSelect) {
      this.selectedCurves = [curve];
    } else {
      if (!this.selectedCurves.includes(curve)) {
        this.selectedCurves.push(curve);
      }
    }
    this.updateVisuals();
  }

  public deselect(curve: FeatherCurve): void {
    const idx = this.selectedCurves.indexOf(curve);
    if (idx !== -1) {
      this.selectedCurves.splice(idx, 1);
    }
    this.updateVisuals();
  }

  public clearSelection(): void {
    this.selectedCurves = [];
    this.updateVisuals();
  }

  public selectAll(): void {
    this.selectedCurves = [...this.stageManager.activeLayer.curves];
    this.updateVisuals();
  }

  public invertSelection(): void {
    const all = this.stageManager.activeLayer.curves;
    this.selectedCurves = all.filter(c => !this.selectedCurves.includes(c));
    this.updateVisuals();
  }

  /**
   * Evaluates if a 2D screen lasso polygon encloses a curve's centroid.
   */
  public selectByLasso(
    lassoScreenPts: Array<{ x: number; y: number }>,
    camera: THREE.Camera,
    canvasWidth: number,
    canvasHeight: number
  ): void {
    const isPointInPoly = (px: number, py: number, poly: Array<{ x: number; y: number }>) => {
      let inside = false;
      for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
        const xi = poly[i].x, yi = poly[i].y;
        const xj = poly[j].x, yj = poly[j].y;
        const intersect = ((yi > py) !== (yj > py)) && (px < (xj - xi) * (py - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
      }
      return inside;
    };

    const newlySelected: FeatherCurve[] = [];
    const allCurves = this.stageManager.activeLayer.curves;

    allCurves.forEach(curve => {
      if (curve.locked || !curve.visible || curve.points.length === 0) return;

      // Project centroid to screen coordinates
      const centroid = new THREE.Vector3();
      curve.points.forEach(p => centroid.add(p.position));
      centroid.multiplyScalar(1 / curve.points.length);

      const screenPos = centroid.clone().project(camera);
      const sx = ((screenPos.x + 1) * 0.5) * canvasWidth;
      const sy = ((-screenPos.y + 1) * 0.5) * canvasHeight;

      if (isPointInPoly(sx, sy, lassoScreenPts)) {
        newlySelected.push(curve);
      }
    });

    this.selectedCurves = newlySelected;
    this.updateVisuals();
  }

  /**
   * Duplicates selected curves with a small 3D offset and records to HistoryManager.
   */
  public duplicateSelected(offset: THREE.Vector3 = new THREE.Vector3(0.05, 0.05, 0)): FeatherCurve[] {
    if (this.selectedCurves.length === 0) return [];

    const clonedCurves: FeatherCurve[] = [];

    this.selectedCurves.forEach(original => {
      const clonedPts = original.points.map(p => ({
        position: p.position.clone().add(offset),
        pressure: p.pressure,
        tilt: p.tilt.clone(),
        time: p.time
      }));

      const cloned = new FeatherCurve(
        clonedPts,
        original.profile,
        original.size,
        original.color.clone(),
        original.alpha,
        original.materialType,
        `curve_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`
      );
      clonedCurves.push(cloned);
    });

    const cmd = new DuplicateCurvesCommand(
      this.stageManager,
      clonedCurves,
      this.stageManager.activeLayerIndex
    );
    this.historyManager.execute(cmd);

    this.selectedCurves = clonedCurves;
    this.updateVisuals();
    return clonedCurves;
  }

  /**
   * Symmetrical Duplication: either mirrored across camera view center or globally across mirror plane.
   */
  public duplicateSymmetric(mode: 'view' | 'mirror' = 'view', camera?: THREE.Camera): FeatherCurve[] {
    if (this.selectedCurves.length === 0) return [];

    const clonedCurves: FeatherCurve[] = [];

    this.selectedCurves.forEach(original => {
      const clonedPts = original.points.map(p => {
        let mirroredPos = p.position.clone();
        if (mode === 'view' && camera) {
          // Mirror position across camera view center plane
          const forward = new THREE.Vector3().subVectors(original.points[0]?.position || new THREE.Vector3(), camera.position).normalize();
          const right = new THREE.Vector3().crossVectors(forward, camera.up).normalize();
          mirroredPos.addScaledVector(right, -2 * (mirroredPos.dot(right)));
        } else {
          // Default mirror across global X=0 axis
          mirroredPos.x = -mirroredPos.x;
        }
        return {
          position: mirroredPos,
          pressure: p.pressure,
          tilt: p.tilt.clone(),
          time: p.time
        };
      });

      const cloned = new FeatherCurve(
        clonedPts,
        original.profile,
        original.size,
        original.color.clone(),
        original.alpha,
        original.materialType,
        `curve_sym_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`
      );
      clonedCurves.push(cloned);
    });

    const cmd = new DuplicateCurvesCommand(
      this.stageManager,
      clonedCurves,
      this.stageManager.activeLayerIndex
    );
    this.historyManager.execute(cmd);

    this.selectedCurves = clonedCurves;
    this.updateVisuals();
    return clonedCurves;
  }

  public updateVisuals(): void {
    if (this.selectedCurves.length === 0) {
      this.selectionBoxHelper.visible = false;
      return;
    }

    const box = new THREE.Box3();
    this.selectedCurves.forEach(c => {
      if (c.mesh) {
        c.mesh.geometry.computeBoundingBox();
        if (c.mesh.geometry.boundingBox) {
          box.union(c.mesh.geometry.boundingBox);
        }
      }
    });

    if (!box.isEmpty()) {
      const center = new THREE.Vector3();
      const size = new THREE.Vector3();
      box.getCenter(center);
      box.getSize(size);

      const dummy = new THREE.Mesh(new THREE.BoxGeometry(size.x, size.y, size.z));
      dummy.position.copy(center);
      dummy.updateMatrixWorld();

      this.selectionBoxHelper.setFromObject(dummy);
      this.selectionBoxHelper.visible = true;
    } else {
      this.selectionBoxHelper.visible = false;
    }
  }
}
