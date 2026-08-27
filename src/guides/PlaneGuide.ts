import * as THREE from 'three';
import { SurfaceSnapping } from '../math/SurfaceSnapping';

export class PlaneGuide {
  public position: THREE.Vector3;
  public normal: THREE.Vector3;
  public size: number;
  public gridHelper: THREE.GridHelper;
  public planeMesh: THREE.Mesh;
  public originLine: THREE.Line;
  public borderLines: THREE.LineSegments;
  public group: THREE.Group;
  public plane: THREE.Plane;
  public isBent: boolean = false;

  constructor(position: THREE.Vector3 = new THREE.Vector3(0, 0, 0), normal: THREE.Vector3 = new THREE.Vector3(0, 1, 0), size: number = 4) {
    this.position = position.clone();
    this.normal = normal.clone().normalize();
    this.size = size;
    this.plane = new THREE.Plane().setFromNormalAndCoplanarPoint(this.normal, this.position);

    this.group = new THREE.Group();
    this.group.name = 'PlaneGuide';

    // Visual grid on plane
    this.gridHelper = new THREE.GridHelper(size, 8, 0x3b82f6, 0x93c5fd);
    (this.gridHelper.material as THREE.Material).opacity = 0.65;
    (this.gridHelper.material as THREE.Material).transparent = true;
    this.group.add(this.gridHelper);

    // Visible translucent canvas sheet for drawing
    const quadGeo = new THREE.PlaneGeometry(size, size, 16, 16);
    const quadMat = new THREE.MeshBasicMaterial({
      color: 0x93c5fd,
      transparent: true,
      opacity: 0.35,
      side: THREE.DoubleSide,
      depthWrite: false
    });
    this.planeMesh = new THREE.Mesh(quadGeo, quadMat);
    this.planeMesh.rotation.x = Math.PI * 0.5; // align with XZ initially
    this.group.add(this.planeMesh);

    // Crisp Canvas Border Outline
    const hs = size * 0.5;
    const borderPts = [
      new THREE.Vector3(-hs, 0.002, -hs), new THREE.Vector3(hs, 0.002, -hs),
      new THREE.Vector3(hs, 0.002, -hs), new THREE.Vector3(hs, 0.002, hs),
      new THREE.Vector3(hs, 0.002, hs), new THREE.Vector3(-hs, 0.002, hs),
      new THREE.Vector3(-hs, 0.002, hs), new THREE.Vector3(-hs, 0.002, -hs)
    ];
    const borderGeo = new THREE.BufferGeometry().setFromPoints(borderPts);
    const borderMat = new THREE.LineBasicMaterial({
      color: 0x1e293b,
      transparent: true,
      opacity: 1.0,
      linewidth: 2,
      depthTest: false
    });
    this.borderLines = new THREE.LineSegments(borderGeo, borderMat);
    this.group.add(this.borderLines);

    // Crisp Cobalt Origin Anchor Line
    const originGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(-size * 0.5, 0.005, 0),
      new THREE.Vector3(size * 0.5, 0.005, 0)
    ]);
    const originMat = new THREE.LineBasicMaterial({
      color: 0x2563eb,
      linewidth: 3,
      depthTest: false
    });
    this.originLine = new THREE.Line(originGeo, originMat);
    this.group.add(this.originLine);

    this.updateTransform();
  }

  public setTransform(position: THREE.Vector3, normal: THREE.Vector3): void {
    this.position.copy(position);
    this.normal.copy(normal).normalize();
    this.plane.setFromNormalAndCoplanarPoint(this.normal, this.position);
    this.updateTransform();
  }

  public updateTransform(): void {
    this.group.position.copy(this.position);
    const defaultUp = new THREE.Vector3(0, 1, 0);
    const quat = new THREE.Quaternion().setFromUnitVectors(defaultUp, this.normal);
    this.group.quaternion.copy(quat);
    this.plane.setFromNormalAndCoplanarPoint(this.normal, this.position);
  }

  /**
   * Bends the guide mesh along an intersecting curve using the orange origin line as pivot.
   */
  public bendAlongCurve(curvePoints: THREE.Vector3[]): void {
    if (curvePoints.length < 2) return;
    this.isBent = true;

    const curve = new THREE.CatmullRomCurve3(curvePoints);
    const width = this.size;
    const lengthSegments = 32;
    const widthSegments = 8;
    const geometry = new THREE.PlaneGeometry(width, this.size, widthSegments, lengthSegments);
    const posAttr = geometry.attributes.position;

    for (let i = 0; i <= lengthSegments; i++) {
      const v = i / lengthSegments;
      const pointOnCurve = curve.getPoint(v);
      const tangent = curve.getTangent(v);
      const normal = new THREE.Vector3(0, 1, 0);
      const binormal = new THREE.Vector3().crossVectors(tangent, normal).normalize();

      for (let j = 0; j <= widthSegments; j++) {
        const u = j / widthSegments;
        const offset = (u - 0.5) * width;
        const vertexPos = pointOnCurve.clone().addScaledVector(binormal, offset);
        const idx = i * (widthSegments + 1) + j;
        posAttr.setXYZ(idx, vertexPos.x, vertexPos.y, vertexPos.z);
      }
    }

    geometry.computeVertexNormals();
    this.planeMesh.geometry.dispose();
    this.planeMesh.geometry = geometry;
    SurfaceSnapping.buildBVH({ geometry } as any);
  }

  public resetFlat(): void {
    this.isBent = false;
    this.planeMesh.geometry.dispose();
    const quadGeo = new THREE.PlaneGeometry(this.size, this.size, 16, 16);
    this.planeMesh.geometry = quadGeo;
  }

  public setVisible(visible: boolean): void {
    this.group.visible = visible;
  }
}
