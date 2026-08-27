import * as THREE from 'three';
import { PlaneGuide } from './PlaneGuide';
import { PrimitiveGuides, PrimitiveType } from './PrimitiveGuides';
import { MeshGuide } from './MeshGuide';
import { SurfaceSnapping, SurfaceSnapResult } from '../math/SurfaceSnapping';

export type GuideMode = 'none' | 'plane' | 'primitive' | 'mesh';

export class GuideManager {
  public mode: GuideMode = 'plane';
  public planeGuide: PlaneGuide;
  public primitiveGuide: PrimitiveGuides;
  public meshGuides: MeshGuide[] = [];
  public surfaceSnapper: SurfaceSnapping;
  public guideGroup: THREE.Group;

  constructor() {
    this.guideGroup = new THREE.Group();
    this.guideGroup.name = 'Guides';

    this.surfaceSnapper = new SurfaceSnapping();
    this.planeGuide = new PlaneGuide(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 1, 0), 4);
    this.primitiveGuide = new PrimitiveGuides('sphere', 1.5);
    this.primitiveGuide.setVisible(false);

    this.guideGroup.add(this.planeGuide.group);
    this.guideGroup.add(this.primitiveGuide.group);
  }

  public setMode(mode: GuideMode): void {
    this.mode = mode;
    this.planeGuide.setVisible(mode === 'plane');
    this.primitiveGuide.setVisible(mode === 'primitive');
    this.meshGuides.forEach(m => m.setVisible(mode === 'mesh'));
  }

  public setPrimitiveType(type: PrimitiveType): void {
    this.primitiveGuide.setType(type);
  }

  /**
   * Snaps a screen point to the active guide surface.
   */
  public snap(
    ndc: THREE.Vector2,
    camera: THREE.Camera
  ): { point: THREE.Vector3; normal: THREE.Vector3 } | null {
    if (this.mode === 'none') {
      // Unproject to default ground plane Y=0 with bounded radius
      const defaultPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(ndc, camera);

      // Check grazing angle near horizon
      if (Math.abs(raycaster.ray.direction.y) < 0.03) return null;

      const hit = new THREE.Vector3();
      const res = raycaster.ray.intersectPlane(defaultPlane, hit);
      if (res) {
        // Clamp to ground grid radius (6.0 units)
        const maxR = 6.0;
        if (hit.length() > maxR) {
          hit.setLength(maxR);
        }
        return { point: hit, normal: new THREE.Vector3(0, 1, 0) };
      }
      return null;
    }

    if (this.mode === 'plane') {
      if (this.planeGuide.isBent) {
        const snapRes = this.surfaceSnapper.snapScreenToSurface(
          ndc.x,
          ndc.y,
          camera,
          [this.planeGuide.planeMesh]
        );
        if (snapRes) {
          return { point: snapRes.point, normal: snapRes.normal };
        }
      }
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(ndc, camera);

      // Prevent division by near-zero dot product when looking parallel to the plane
      const dot = Math.abs(raycaster.ray.direction.dot(this.planeGuide.normal));
      if (dot < 0.03) return null;

      const hit = new THREE.Vector3();
      const res = raycaster.ray.intersectPlane(this.planeGuide.plane, hit);
      if (res) {
        // Bound to the plane's finite canvas extents
        const boundedPoint = this.planeGuide.clampToCanvasBounds(hit);
        return { point: boundedPoint, normal: this.planeGuide.normal.clone() };
      }
      return null;
    }

    if (this.mode === 'primitive') {
      const snapRes = this.surfaceSnapper.snapScreenToSurface(
        ndc.x,
        ndc.y,
        camera,
        [this.primitiveGuide.mesh]
      );
      if (snapRes) {
        return { point: snapRes.point, normal: snapRes.normal };
      }
      return null;
    }

    if (this.mode === 'mesh') {
      const meshes = this.meshGuides.map(m => m.mesh);
      const snapRes = this.surfaceSnapper.snapScreenToSurface(
        ndc.x,
        ndc.y,
        camera,
        meshes
      );
      if (snapRes) {
        return { point: snapRes.point, normal: snapRes.normal };
      }
      return null;
    }

    return null;
  }
}
