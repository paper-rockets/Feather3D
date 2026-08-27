import * as THREE from 'three';
import { CurvePoint } from '../math/CurveMath';

export type SymmetryAxis = 'none' | 'x' | 'y' | 'z';

export class SymmetryManager {
  public axis: SymmetryAxis = 'none';
  public mirrorPlaneMesh: THREE.Mesh;
  public symmetryGroup: THREE.Group;

  constructor() {
    this.symmetryGroup = new THREE.Group();
    this.symmetryGroup.name = 'Symmetry';

    // Visual plane indicator for symmetry
    const geometry = new THREE.PlaneGeometry(8, 8);
    const material = new THREE.MeshBasicMaterial({
      color: 0x1e52a0,
      transparent: true,
      opacity: 0.15,
      side: THREE.DoubleSide,
      depthWrite: false
    });

    this.mirrorPlaneMesh = new THREE.Mesh(geometry, material);
    this.mirrorPlaneMesh.visible = false;
    this.symmetryGroup.add(this.mirrorPlaneMesh);
  }

  public setAxis(axis: SymmetryAxis): void {
    this.axis = axis;
    if (axis === 'none') {
      this.mirrorPlaneMesh.visible = false;
      return;
    }

    this.mirrorPlaneMesh.visible = true;
    this.mirrorPlaneMesh.rotation.set(0, 0, 0);

    if (axis === 'x') {
      // Plane YZ (x = 0)
      this.mirrorPlaneMesh.rotation.y = Math.PI * 0.5;
    } else if (axis === 'y') {
      // Plane XZ (y = 0)
      this.mirrorPlaneMesh.rotation.x = Math.PI * 0.5;
    } else if (axis === 'z') {
      // Plane XY (z = 0)
      this.mirrorPlaneMesh.rotation.set(0, 0, 0);
    }
  }

  public mirrorPoints(points: CurvePoint[]): CurvePoint[] {
    if (this.axis === 'none') return [];

    return points.map(p => {
      const pos = p.position.clone();
      if (this.axis === 'x') pos.x = -pos.x;
      if (this.axis === 'y') pos.y = -pos.y;
      if (this.axis === 'z') pos.z = -pos.z;

      return {
        position: pos,
        pressure: p.pressure,
        tilt: p.tilt.clone(),
        time: p.time
      };
    });
  }
}
