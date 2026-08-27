import * as THREE from 'three';
import { MeshBVH, acceleratedRaycast, computeBoundsTree, disposeBoundsTree } from 'three-mesh-bvh';

// Extend Three.js BufferGeometry and Mesh with BVH methods
THREE.BufferGeometry.prototype.computeBoundsTree = computeBoundsTree;
THREE.BufferGeometry.prototype.disposeBoundsTree = disposeBoundsTree;
THREE.Mesh.prototype.raycast = acceleratedRaycast;

export interface SurfaceSnapResult {
  point: THREE.Vector3;
  normal: THREE.Vector3;
  distance: number;
  mesh: THREE.Mesh;
}

export class SurfaceSnapping {
  private raycaster: THREE.Raycaster;
  private static normalOffset: number = 0.002; // Small epsilon to prevent z-fighting

  constructor() {
    this.raycaster = new THREE.Raycaster();
    this.raycaster.firstHitOnly = true;
  }

  /**
   * Builds and attaches a BVH spatial index to a mesh geometry.
   */
  public static buildBVH(mesh: THREE.Mesh): void {
    if (!mesh.geometry) return;
    if (!(mesh.geometry as any).boundsTree) {
      (mesh.geometry as any).computeBoundsTree({
        maxLeafTris: 10,
        strategy: 0
      });
    }
  }

  /**
   * Casts ray from camera through normalized screen coordinates (-1 to 1) onto guide meshes.
   */
  public snapScreenToSurface(
    ndcX: number,
    ndcY: number,
    camera: THREE.Camera,
    targets: THREE.Mesh[]
  ): SurfaceSnapResult | null {
    this.raycaster.setFromCamera(new THREE.Vector2(ndcX, ndcY), camera);
    const intersects = this.raycaster.intersectObjects(targets, false);

    if (intersects.length > 0) {
      const hit = intersects[0];
      const normal = hit.face ? hit.face.normal.clone().transformDirection(hit.object.matrixWorld) : new THREE.Vector3(0, 1, 0);
      const snappedPoint = hit.point.clone().addScaledVector(normal, SurfaceSnapping.normalOffset);

      return {
        point: snappedPoint,
        normal: normal,
        distance: hit.distance,
        mesh: hit.object as THREE.Mesh
      };
    }
    return null;
  }

  /**
   * Snaps a 3D point to the closest surface location on target meshes.
   */
  public snapWorldPointToSurface(
    worldPoint: THREE.Vector3,
    viewDirection: THREE.Vector3,
    targets: THREE.Mesh[]
  ): SurfaceSnapResult | null {
    this.raycaster.set(worldPoint, viewDirection);
    const intersects = this.raycaster.intersectObjects(targets, false);

    if (intersects.length > 0) {
      const hit = intersects[0];
      const normal = hit.face ? hit.face.normal.clone().transformDirection(hit.object.matrixWorld) : new THREE.Vector3(0, 1, 0);
      const snappedPoint = hit.point.clone().addScaledVector(normal, SurfaceSnapping.normalOffset);

      return {
        point: snappedPoint,
        normal: normal,
        distance: hit.distance,
        mesh: hit.object as THREE.Mesh
      };
    }
    return null;
  }
}
