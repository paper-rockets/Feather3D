import * as THREE from 'three';
import { SurfaceSnapping } from '../math/SurfaceSnapping';

export class MeshGuide {
  public mesh: THREE.Mesh;
  public meshes: THREE.Mesh[] = [];
  public group: THREE.Group;

  constructor(target: THREE.Mesh | THREE.Group | THREE.Mesh[]) {
    this.group = new THREE.Group();
    this.group.name = 'MeshGuide';

    if (Array.isArray(target)) {
      target.forEach(m => {
        if (m.geometry) {
          SurfaceSnapping.buildBVH(m);
        }
        this.meshes.push(m);
        this.group.add(m);
      });
      this.mesh = this.meshes[0] || new THREE.Mesh();
    } else if ((target as THREE.Group).isGroup) {
      const grp = target as THREE.Group;
      grp.traverse(child => {
        if ((child as THREE.Mesh).isMesh) {
          const m = child as THREE.Mesh;
          if (m.geometry) {
            SurfaceSnapping.buildBVH(m);
          }
          this.meshes.push(m);
        }
      });
      this.mesh = this.meshes[0] || new THREE.Mesh();
      this.group.add(grp);
    } else {
      const m = target as THREE.Mesh;
      if (m.geometry) {
        SurfaceSnapping.buildBVH(m);
      }
      this.meshes.push(m);
      this.mesh = m;
      this.group.add(m);
    }
  }

  public setVisible(visible: boolean): void {
    this.group.visible = visible;
  }

  public getMeshes(): THREE.Mesh[] {
    return this.meshes;
  }
}
