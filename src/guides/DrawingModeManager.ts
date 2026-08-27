import * as THREE from 'three';
import { InteractivePaperSheet } from './InteractivePaperSheet';
import { StageManager } from '../scene/StageManager';
import { ResourceManager } from '../scene/ResourceManager';
import { SurfaceSnapping, SurfaceSnapResult } from '../math/SurfaceSnapping';

export type DrawMethod = 'spatial' | 'touch' | 'screen_facing' | 'interactive_sheet';

export interface DrawSnapResult {
  point: THREE.Vector3;
  normal: THREE.Vector3;
  hitTarget?: 'mesh' | 'curve' | 'ground' | 'screen_plane' | 'paper_sheet' | 'spatial';
  sourceMesh?: THREE.Mesh;
}

export class DrawingModeManager {
  public activeMethod: DrawMethod = 'spatial';
  public paperSheet: InteractivePaperSheet;
  public surfaceSnapper: SurfaceSnapping;

  // Spatial Stroke parameters
  public spatialDepth: number = 3.0;
  public spatialCursorMesh: THREE.Group;
  public spatialCursorPoint: THREE.Vector3 = new THREE.Vector3();

  private stageManager: StageManager;
  private resourceManager: ResourceManager;
  private groundPlane: THREE.Plane;

  // For screen_facing mode:
  private screenFacingPlane: THREE.Plane = new THREE.Plane();
  private screenFacingNormal: THREE.Vector3 = new THREE.Vector3();
  private screenFacingAnchor: THREE.Vector3 = new THREE.Vector3(0, 1.0, 0);

  // Epsilon offset along surface normal to prevent z-fighting
  private static readonly SURFACE_OFFSET = 0.003;

  public onMethodChange?: (method: DrawMethod) => void;

  constructor(
    stageManager: StageManager,
    resourceManager: ResourceManager,
    parentGroup?: THREE.Object3D
  ) {
    this.stageManager = stageManager;
    this.resourceManager = resourceManager;
    this.surfaceSnapper = new SurfaceSnapping();
    this.groundPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);

    // 1. Paper Sheet Setup
    this.paperSheet = new InteractivePaperSheet(new THREE.Vector3(0, 1.2, 0));
    this.paperSheet.setVisible(false);

    // 2. Spatial 3D Cursor Mesh
    this.spatialCursorMesh = new THREE.Group();
    this.spatialCursorMesh.name = 'SpatialStrokeCursor';

    const sphereGeo = new THREE.SphereGeometry(0.06, 8, 8);
    const sphereMat = new THREE.MeshBasicMaterial({
      color: 0x3b82f6,
      wireframe: true,
      depthTest: false,
      transparent: true,
      opacity: 0.8
    });
    const sphere = new THREE.Mesh(sphereGeo, sphereMat);
    this.spatialCursorMesh.add(sphere);

    // X/Y/Z Axis indicators
    const lineMatX = new THREE.LineBasicMaterial({ color: 0xef4444, depthTest: false });
    const lineMatY = new THREE.LineBasicMaterial({ color: 0x22c55e, depthTest: false });
    const lineMatZ = new THREE.LineBasicMaterial({ color: 0x3b82f6, depthTest: false });

    const pointsX = [new THREE.Vector3(-0.15, 0, 0), new THREE.Vector3(0.15, 0, 0)];
    const geoX = new THREE.BufferGeometry().setFromPoints(pointsX);
    this.spatialCursorMesh.add(new THREE.Line(geoX, lineMatX));

    const pointsY = [new THREE.Vector3(0, -0.15, 0), new THREE.Vector3(0, 0.15, 0)];
    const geoY = new THREE.BufferGeometry().setFromPoints(pointsY);
    this.spatialCursorMesh.add(new THREE.Line(geoY, lineMatY));

    const pointsZ = [new THREE.Vector3(0, 0, -0.15), new THREE.Vector3(0, 0, 0.15)];
    const geoZ = new THREE.BufferGeometry().setFromPoints(pointsZ);
    this.spatialCursorMesh.add(new THREE.Line(geoZ, lineMatZ));

    // Spatial cursor is visible by default because 'spatial' is default method
    this.spatialCursorMesh.visible = true;

    if (parentGroup) {
      parentGroup.add(this.paperSheet.group);
      parentGroup.add(this.spatialCursorMesh);
    }

    this.bindGyroscope();
  }

  public setDrawMethod(method: DrawMethod): void {
    if (this.activeMethod === method) return;
    this.activeMethod = method;

    // Visibility management
    this.paperSheet.setVisible(method === 'interactive_sheet');
    this.spatialCursorMesh.visible = (method === 'spatial');

    if (this.onMethodChange) {
      this.onMethodChange(method);
    }
  }

  public getDrawMethod(): DrawMethod {
    return this.activeMethod;
  }

  public adjustDepth(deltaY: number): void {
    // Wheel scroll adjusts depth
    this.spatialDepth += deltaY * 0.005;
    this.spatialDepth = THREE.MathUtils.clamp(this.spatialDepth, 0.5, 20.0);
  }

  private bindGyroscope(): void {
    if (typeof window === 'undefined') return;

    let lastBeta: number | null = null;
    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (this.activeMethod !== 'spatial') return;
      if (e.beta === null) return;

      if (lastBeta === null) {
        lastBeta = e.beta;
        return;
      }

      const diff = e.beta - lastBeta;
      // Filter out huge sudden jumps
      if (Math.abs(diff) < 15) {
        // Tilting phone forward/backward directly pushes/pulls the 3D drawing cursor!
        this.spatialDepth += diff * 0.05;
        this.spatialDepth = THREE.MathUtils.clamp(this.spatialDepth, 0.5, 20.0);
      }
      lastBeta = e.beta;
    };

    window.addEventListener('deviceorientation', handleOrientation);
  }

  public startStroke(
    ndc: THREE.Vector2,
    camera: THREE.Camera,
    sceneTarget: THREE.Vector3
  ): void {
    if (this.activeMethod === 'screen_facing') {
      camera.getWorldDirection(this.screenFacingNormal);
      this.screenFacingNormal.normalize();

      const touchHit = this.snapTouch(ndc, camera, sceneTarget);
      if (touchHit) {
        this.screenFacingAnchor.copy(touchHit.point);
      } else {
        this.screenFacingAnchor.copy(sceneTarget);
      }

      this.screenFacingPlane.setFromNormalAndCoplanarPoint(
        this.screenFacingNormal,
        this.screenFacingAnchor
      );
    }
  }

  public snap(
    ndc: THREE.Vector2,
    camera: THREE.Camera,
    sceneTarget: THREE.Vector3 = new THREE.Vector3(0, 0.5, 0)
  ): DrawSnapResult | null {
    switch (this.activeMethod) {
      case 'spatial':
        return this.snapSpatial(ndc, camera);
      case 'touch':
        return this.snapTouch(ndc, camera, sceneTarget);
      case 'screen_facing':
        return this.snapScreenFacing(ndc, camera, sceneTarget);
      case 'interactive_sheet':
        return this.snapInteractiveSheet(ndc, camera);
      default:
        return this.snapSpatial(ndc, camera);
    }
  }

  /**
   * Spatial Stroke Snapping (mid-air drawing cursor)
   */
  public snapSpatial(
    ndc: THREE.Vector2,
    camera: THREE.Camera
  ): DrawSnapResult | null {
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(ndc, camera);

    this.spatialCursorPoint.copy(raycaster.ray.origin)
      .addScaledVector(raycaster.ray.direction, this.spatialDepth);

    this.spatialCursorMesh.position.copy(this.spatialCursorPoint);

    return {
      point: this.spatialCursorPoint.clone(),
      normal: raycaster.ray.direction.clone().negate(),
      hitTarget: 'spatial'
    };
  }

  public snapTouch(
    ndc: THREE.Vector2,
    camera: THREE.Camera,
    sceneTarget: THREE.Vector3
  ): DrawSnapResult | null {
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(ndc, camera);

    const targetMeshes: THREE.Mesh[] = [];

    // Stage curve meshes
    const allCurves = this.stageManager.getAllCurves();
    for (const curve of allCurves) {
      if (curve.visible && curve.mesh) {
        targetMeshes.push(curve.mesh);
      }
    }

    // Stage lofted meshes and 3D models
    for (const layer of this.stageManager.layers) {
      if (!layer.visible) continue;
      for (const mesh of layer.loftedMeshes) {
        targetMeshes.push(mesh);
      }
      layer.group.traverse((obj) => {
        if ((obj as THREE.Mesh).isMesh && obj.visible && !targetMeshes.includes(obj as THREE.Mesh)) {
          targetMeshes.push(obj as THREE.Mesh);
        }
      });
    }

    // Resource items (images, imported models)
    for (const res of this.resourceManager.resources) {
      if (res.state !== 'hidden' && res.mesh) {
        targetMeshes.push(res.mesh);
      }
    }

    if (targetMeshes.length > 0) {
      const intersects = raycaster.intersectObjects(targetMeshes, false);
      if (intersects.length > 0) {
        const hit = intersects[0];
        let normal = new THREE.Vector3(0, 1, 0);
        if (hit.face) {
          normal = hit.face.normal.clone().transformDirection(hit.object.matrixWorld);
        } else {
          normal.subVectors(camera.position, hit.point).normalize();
        }

        const snappedPoint = hit.point.clone().addScaledVector(normal, DrawingModeManager.SURFACE_OFFSET);
        const isCurve = hit.object.userData && hit.object.userData.curveId;

        return {
          point: snappedPoint,
          normal,
          hitTarget: isCurve ? 'curve' : 'mesh',
          sourceMesh: hit.object as THREE.Mesh
        };
      }
    }

    const groundHit = new THREE.Vector3();
    const hitGround = raycaster.ray.intersectPlane(this.groundPlane, groundHit);
    if (hitGround) {
      const dirToHit = new THREE.Vector3().subVectors(groundHit, camera.position);
      const camForward = camera.getWorldDirection(new THREE.Vector3());
      if (dirToHit.dot(camForward) > 0) {
        return {
          point: groundHit,
          normal: new THREE.Vector3(0, 1, 0),
          hitTarget: 'ground'
        };
      }
    }

    const camDir = camera.getWorldDirection(new THREE.Vector3());
    const fallbackPlane = new THREE.Plane().setFromNormalAndCoplanarPoint(camDir, sceneTarget);
    const airHit = new THREE.Vector3();
    if (raycaster.ray.intersectPlane(fallbackPlane, airHit)) {
      return {
        point: airHit,
        normal: camDir.clone().negate(),
        hitTarget: 'screen_plane'
      };
    }

    return null;
  }

  public snapScreenFacing(
    ndc: THREE.Vector2,
    camera: THREE.Camera,
    sceneTarget: THREE.Vector3
  ): DrawSnapResult | null {
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(ndc, camera);

    if (this.screenFacingNormal.lengthSq() < 0.5) {
      camera.getWorldDirection(this.screenFacingNormal);
      this.screenFacingNormal.normalize();
      this.screenFacingAnchor.copy(sceneTarget);
      this.screenFacingPlane.setFromNormalAndCoplanarPoint(
        this.screenFacingNormal,
        this.screenFacingAnchor
      );
    }

    const hit = new THREE.Vector3();
    const res = raycaster.ray.intersectPlane(this.screenFacingPlane, hit);
    if (res) {
      return {
        point: hit,
        normal: this.screenFacingNormal.clone().negate(),
        hitTarget: 'screen_plane'
      };
    }

    return null;
  }

  public snapInteractiveSheet(
    ndc: THREE.Vector2,
    camera: THREE.Camera
  ): DrawSnapResult | null {
    const snap = this.paperSheet.snap(ndc, camera);
    if (snap) {
      return {
        point: snap.point,
        normal: snap.normal,
        hitTarget: 'paper_sheet'
      };
    }
    return null;
  }

  public dispose(): void {
    this.paperSheet.dispose();
    if (this.spatialCursorMesh.parent) {
      this.spatialCursorMesh.parent.remove(this.spatialCursorMesh);
    }
  }
}
