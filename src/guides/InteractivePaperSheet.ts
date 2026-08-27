import * as THREE from 'three';

export interface PaperSheetTransform {
  position: THREE.Vector3;
  rotation: THREE.Euler;
  size: THREE.Vector2;
}

export class InteractivePaperSheet {
  public group: THREE.Group;
  public planeMesh: THREE.Mesh;
  public borderLines: THREE.LineSegments;
  public gridLines: THREE.LineSegments;
  public cornerHandle: THREE.Mesh;
  public centerHandle: THREE.Mesh;
  public plane: THREE.Plane;

  public size: THREE.Vector2;
  public position: THREE.Vector3;
  public normal: THREE.Vector3;

  private isDraggingHandle: boolean = false;
  private isDraggingCenter: boolean = false;
  private isHoveredHandle: boolean = false;

  private dragStartRay: THREE.Ray = new THREE.Ray();
  private dragStartCornerPos: THREE.Vector3 = new THREE.Vector3();
  private dragStartSheetQuat: THREE.Quaternion = new THREE.Quaternion();
  private dragCornerDist: number = 1.0;

  private handleMatDefault: THREE.MeshBasicMaterial;
  private handleMatActive: THREE.MeshBasicMaterial;

  public onTransformChange?: (transform: PaperSheetTransform) => void;

  constructor(
    position: THREE.Vector3 = new THREE.Vector3(0, 1.2, 0),
    size: THREE.Vector2 = new THREE.Vector2(3.6, 2.7)
  ) {
    this.position = position.clone();
    this.size = size.clone();
    this.normal = new THREE.Vector3(0, 0, 1);
    this.plane = new THREE.Plane(this.normal, 0);

    this.group = new THREE.Group();
    this.group.name = 'InteractivePaperSheet';
    this.group.position.copy(this.position);

    // 1. Translucent Paper Sheet Surface
    const planeGeo = new THREE.PlaneGeometry(this.size.x, this.size.y);
    const planeMat = new THREE.MeshBasicMaterial({
      color: 0xf8f9fa,
      transparent: true,
      opacity: 0.18,
      side: THREE.DoubleSide,
      depthWrite: false
    });
    this.planeMesh = new THREE.Mesh(planeGeo, planeMat);
    this.planeMesh.userData = { isPaperSurface: true };
    this.group.add(this.planeMesh);

    // 2. Subtle Grid Lines on Paper
    this.gridLines = this.createGridLines(this.size.x, this.size.y, 8, 6);
    this.group.add(this.gridLines);

    // 3. Crisp Paper Border
    this.borderLines = this.createBorder(this.size.x, this.size.y);
    this.group.add(this.borderLines);

    // 4. Corner Grab Handle (Top-Right corner)
    const handleGeo = new THREE.SphereGeometry(0.12, 16, 16);
    this.handleMatDefault = new THREE.MeshBasicMaterial({
      color: 0x3a82f6,
      depthTest: false
    });
    this.handleMatActive = new THREE.MeshBasicMaterial({
      color: 0xf59e0b,
      depthTest: false
    });
    this.cornerHandle = new THREE.Mesh(handleGeo, this.handleMatDefault);
    this.cornerHandle.position.set(this.size.x * 0.5, this.size.y * 0.5, 0.01);
    this.cornerHandle.renderOrder = 999;
    this.cornerHandle.userData = { isPaperCornerHandle: true };
    this.group.add(this.cornerHandle);

    // Corner handle visual ring / indicator
    const ringGeo = new THREE.RingGeometry(0.14, 0.18, 24);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x3a82f6,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.7,
      depthTest: false
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.renderOrder = 999;
    this.cornerHandle.add(ringMesh);

    // 5. Center Translation Handle (Subtle pivot indicator)
    const centerGeo = new THREE.SphereGeometry(0.06, 12, 12);
    const centerMat = new THREE.MeshBasicMaterial({
      color: 0x64748b,
      transparent: true,
      opacity: 0.6,
      depthTest: false
    });
    this.centerHandle = new THREE.Mesh(centerGeo, centerMat);
    this.centerHandle.position.set(0, 0, 0.01);
    this.centerHandle.renderOrder = 999;
    this.centerHandle.userData = { isPaperCenterHandle: true };
    this.group.add(this.centerHandle);

    this.dragCornerDist = Math.hypot(this.size.x * 0.5, this.size.y * 0.5);
    this.updatePlane();
  }

  private createBorder(w: number, h: number): THREE.LineSegments {
    const hw = w * 0.5;
    const hh = h * 0.5;
    const pts = [
      new THREE.Vector3(-hw, -hh, 0.002),
      new THREE.Vector3(hw, -hh, 0.002),
      new THREE.Vector3(hw, -hh, 0.002),
      new THREE.Vector3(hw, hh, 0.002),
      new THREE.Vector3(hw, hh, 0.002),
      new THREE.Vector3(-hw, hh, 0.002),
      new THREE.Vector3(-hw, hh, 0.002),
      new THREE.Vector3(-hw, -hh, 0.002)
    ];
    const geo = new THREE.BufferGeometry().setFromPoints(pts);
    const mat = new THREE.LineBasicMaterial({
      color: 0x94a3b8,
      transparent: true,
      opacity: 0.75,
      linewidth: 2,
      depthTest: false
    });
    const lines = new THREE.LineSegments(geo, mat);
    lines.renderOrder = 998;
    return lines;
  }

  private createGridLines(w: number, h: number, cols: number, rows: number): THREE.LineSegments {
    const hw = w * 0.5;
    const hh = h * 0.5;
    const pts: THREE.Vector3[] = [];

    // Vertical lines
    for (let c = 1; c < cols; c++) {
      const x = -hw + (w / cols) * c;
      pts.push(new THREE.Vector3(x, -hh, 0.001), new THREE.Vector3(x, hh, 0.001));
    }
    // Horizontal lines
    for (let r = 1; r < rows; r++) {
      const y = -hh + (h / rows) * r;
      pts.push(new THREE.Vector3(-hw, y, 0.001), new THREE.Vector3(hw, y, 0.001));
    }

    const geo = new THREE.BufferGeometry().setFromPoints(pts);
    const mat = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.25,
      depthTest: false
    });
    return new THREE.LineSegments(geo, mat);
  }

  public updatePlane(): void {
    this.group.getWorldPosition(this.position);
    this.group.getWorldDirection(this.normal);
    this.plane.setFromNormalAndCoplanarPoint(this.normal, this.position);
  }

  public setVisible(visible: boolean): void {
    this.group.visible = visible;
  }

  public setOrientation(position: THREE.Vector3, quaternion: THREE.Quaternion): void {
    this.group.position.copy(position);
    this.group.quaternion.copy(quaternion);
    this.updatePlane();
    this.notifyTransformChange();
  }

  public setLookAtCamera(camera: THREE.Camera, targetPoint?: THREE.Vector3): void {
    if (targetPoint) {
      this.group.position.copy(targetPoint);
    }
    this.group.quaternion.copy(camera.quaternion);
    this.updatePlane();
    this.notifyTransformChange();
  }

  public checkHandleHover(ndc: THREE.Vector2, camera: THREE.Camera): boolean {
    if (!this.group.visible) return false;
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(ndc, camera);
    const hits = raycaster.intersectObjects([this.cornerHandle, this.centerHandle], true);
    const isHover = hits.length > 0;
    if (isHover !== this.isHoveredHandle) {
      this.isHoveredHandle = isHover;
      this.cornerHandle.material = isHover ? this.handleMatActive : this.handleMatDefault;
    }
    return isHover;
  }

  public startHandleDrag(ndc: THREE.Vector2, camera: THREE.Camera): boolean {
    if (!this.group.visible) return false;
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(ndc, camera);
    const hits = raycaster.intersectObjects([this.cornerHandle, this.centerHandle], true);

    if (hits.length > 0) {
      const hitObj = hits[0].object;
      if (hitObj === this.centerHandle || hitObj.userData.isPaperCenterHandle) {
        this.isDraggingCenter = true;
        this.isDraggingHandle = false;
      } else {
        this.isDraggingHandle = true;
        this.isDraggingCenter = false;
      }

      this.dragStartRay.copy(raycaster.ray);
      this.cornerHandle.getWorldPosition(this.dragStartCornerPos);
      this.dragStartSheetQuat.copy(this.group.quaternion);
      this.dragCornerDist = this.dragStartCornerPos.distanceTo(this.group.position);
      this.cornerHandle.material = this.handleMatActive;
      return true;
    }
    return false;
  }

  public updateHandleDrag(ndc: THREE.Vector2, camera: THREE.Camera): void {
    if (!this.isDraggingHandle && !this.isDraggingCenter) return;

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(ndc, camera);

    if (this.isDraggingCenter) {
      // Dragging the center handle translates the paper sheet across camera view plane
      const camDir = camera.getWorldDirection(new THREE.Vector3());
      const dragPlane = new THREE.Plane().setFromNormalAndCoplanarPoint(camDir, this.group.position);
      const hit = new THREE.Vector3();
      if (raycaster.ray.intersectPlane(dragPlane, hit)) {
        this.group.position.copy(hit);
        this.updatePlane();
        this.notifyTransformChange();
      }
      return;
    }

    if (this.isDraggingHandle) {
      // Dragging corner handle swings / rotates the paper sheet in 3D
      const center = this.group.position;
      const radius = Math.max(0.2, this.dragCornerDist);

      const ray = raycaster.ray;
      const rayToCenter = new THREE.Vector3().subVectors(center, ray.origin);
      const projection = rayToCenter.dot(ray.direction);
      const closestPointOnRay = new THREE.Vector3().copy(ray.origin).addScaledVector(ray.direction, Math.max(0.1, projection));

      const newCornerDir = new THREE.Vector3().subVectors(closestPointOnRay, center).normalize();
      const localCornerDir = new THREE.Vector3(this.size.x * 0.5, this.size.y * 0.5, 0).normalize();

      const quat = new THREE.Quaternion().setFromUnitVectors(localCornerDir, newCornerDir);
      this.group.quaternion.copy(quat);

      this.updatePlane();
      this.notifyTransformChange();
    }
  }

  public endHandleDrag(): void {
    this.isDraggingHandle = false;
    this.isDraggingCenter = false;
    this.cornerHandle.material = this.isHoveredHandle ? this.handleMatActive : this.handleMatDefault;
  }

  public get isInteracting(): boolean {
    return this.isDraggingHandle || this.isDraggingCenter;
  }

  /**
   * Snaps pointer NDC to the interactive paper sheet plane.
   */
  public snap(
    ndc: THREE.Vector2,
    camera: THREE.Camera
  ): { point: THREE.Vector3; normal: THREE.Vector3 } | null {
    if (!this.group.visible) return null;

    this.updatePlane();
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(ndc, camera);

    const hit = new THREE.Vector3();
    const res = raycaster.ray.intersectPlane(this.plane, hit);
    if (res) {
      const normal = this.normal.clone();
      const point = hit.clone().addScaledVector(normal, 0.002);
      return { point, normal };
    }

    return null;
  }

  private notifyTransformChange(): void {
    if (this.onTransformChange) {
      this.onTransformChange({
        position: this.group.position.clone(),
        rotation: this.group.rotation.clone(),
        size: this.size.clone()
      });
    }
  }

  public dispose(): void {
    this.planeMesh.geometry.dispose();
    (this.planeMesh.material as THREE.Material).dispose();
    this.borderLines.geometry.dispose();
    (this.borderLines.material as THREE.Material).dispose();
    this.gridLines.geometry.dispose();
    (this.gridLines.material as THREE.Material).dispose();
    this.cornerHandle.geometry.dispose();
    this.handleMatDefault.dispose();
    this.handleMatActive.dispose();
    this.centerHandle.geometry.dispose();
    (this.centerHandle.material as THREE.Material).dispose();
  }
}
