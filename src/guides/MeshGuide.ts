import * as THREE from 'three';
import { SurfaceSnapping } from '../math/SurfaceSnapping';

export class MeshGuide {
  public mesh: THREE.Mesh;
  public group: THREE.Group;

  constructor(mesh: THREE.Mesh) {
    this.mesh = mesh;
    this.group = new THREE.Group();
    this.group.name = 'MeshGuide';

    SurfaceSnapping.buildBVH(this.mesh);
    this.group.add(this.mesh);
  }

  public setVisible(visible: boolean): void {
    this.group.visible = visible;
  }
}
