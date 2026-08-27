import * as THREE from 'three';
import { StageManager } from '../scene/StageManager';
import { BrushEngine } from './BrushEngine';
import { FeatherCurve } from '../scene/FeatherCurve';

export class InjectorTool {
  private stageManager: StageManager;
  private brushEngine: BrushEngine;
  private raycaster: THREE.Raycaster;

  constructor(stageManager: StageManager, brushEngine: BrushEngine) {
    this.stageManager = stageManager;
    this.brushEngine = brushEngine;
    this.raycaster = new THREE.Raycaster();
  }

  /**
   * Samples properties from a clicked stroke and updates the BrushEngine.
   */
  public sampleStrokeAt(ndc: THREE.Vector2, camera: THREE.Camera): FeatherCurve | null {
    this.raycaster.setFromCamera(ndc, camera);
    const allCurves = this.stageManager.getAllCurves();
    const meshes = allCurves.map(c => c.mesh);

    const intersects = this.raycaster.intersectObjects(meshes, false);
    if (intersects.length > 0) {
      const hit = intersects[0];
      const curveId = hit.object.userData.curveId;
      if (curveId) {
        const curve = this.stageManager.findCurveById(curveId);
        if (curve) {
          this.brushEngine.setColor(curve.color);
          this.brushEngine.setSize(curve.size);
          this.brushEngine.setOpacity(curve.alpha);
          this.brushEngine.setMaterialType(curve.materialType);
          this.brushEngine.setProfile(curve.profile);
          return curve;
        }
      }
    }
    return null;
  }
}
