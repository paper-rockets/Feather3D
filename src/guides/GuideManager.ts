import * as THREE from 'three';
import { PlaneGuide } from './PlaneGuide';
import { PrimitiveGuides, PrimitiveType } from './PrimitiveGuides';
import { MeshGuide } from './MeshGuide';
import { SurfaceSnapping } from '../math/SurfaceSnapping';
import { MeshCanvasTemplates } from './MeshCanvasTemplates';

export type GuideMode = 'none' | 'plane' | 'primitive' | 'mesh';

export class GuideManager {
  public mode: GuideMode = 'plane';
  public planeGuide: PlaneGuide;
  public primitiveGuide: PrimitiveGuides;
  public meshGuides: MeshGuide[] = [];
  public surfaceSnapper: SurfaceSnapping;
  public guideGroup: THREE.Group;
  public activeTemplateId: string | null = null;

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

  public addMeshGuide(guide: MeshGuide): void {
    this.meshGuides.push(guide);
    this.guideGroup.add(guide.group);
    guide.setVisible(this.mode === 'mesh');
  }

  public removeMeshGuide(guide: MeshGuide): void {
    const idx = this.meshGuides.indexOf(guide);
    if (idx !== -1) {
      this.meshGuides.splice(idx, 1);
      this.guideGroup.remove(guide.group);
    }
  }

  public clearMeshGuides(): void {
    this.meshGuides.forEach(guide => {
      this.guideGroup.remove(guide.group);
    });
    this.meshGuides = [];
    this.activeTemplateId = null;
  }

  public setMeshGuide(guide: MeshGuide): void {
    this.clearMeshGuides();
    this.addMeshGuide(guide);
    this.setMode('mesh');
  }

  public loadTemplateGuide(templateId: string): MeshGuide | null {
    const res = MeshCanvasTemplates.loadTemplate(templateId);
    if (!res) return null;

    this.clearMeshGuides();
    this.activeTemplateId = templateId;
    this.addMeshGuide(res.guide);
    this.setMode('mesh');
    return res.guide;
  }

  /**
   * Snaps a screen point to the active guide surface.
   */
  public snap(
    ndc: THREE.Vector2,
    camera: THREE.Camera
  ): { point: THREE.Vector3; normal: THREE.Vector3 } | null {
    if (this.mode === 'none') {
      // Unproject to default ground plane Y=0
      const defaultPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(ndc, camera);
      const hit = new THREE.Vector3();
      const res = raycaster.ray.intersectPlane(defaultPlane, hit);
      if (res) {
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
      const hit = new THREE.Vector3();
      const res = raycaster.ray.intersectPlane(this.planeGuide.plane, hit);
      if (res) {
        return { point: hit, normal: this.planeGuide.normal.clone() };
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
      const meshes: THREE.Mesh[] = [];
      this.meshGuides.forEach(g => {
        const submeshes = g.getMeshes();
        if (submeshes && submeshes.length > 0) {
          meshes.push(...submeshes);
        } else if (g.mesh) {
          meshes.push(g.mesh);
        }
      });

      if (meshes.length === 0) return null;

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
