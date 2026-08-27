import * as THREE from 'three';

export class TransformGizmo {
  public group: THREE.Group;
  public centralSphere: THREE.Mesh;
  public coneX: THREE.Group;
  public coneY: THREE.Group;
  public coneZ: THREE.Group;
  public arcX: THREE.Line;
  public arcY: THREE.Line;
  public arcZ: THREE.Line;
  public snapAngleDeg: number = 15;
  public snapGridUnits: number = 0.1;

  private collapsedAxis: 'x' | 'y' | 'z' | null = null;

  constructor() {
    this.group = new THREE.Group();
    this.group.name = 'TransformGizmo';

    const origin = new THREE.Vector3(0, 0, 0);
    const length = 1.2;

    // 1. Central Trackball Sphere
    const sphereGeo = new THREE.SphereGeometry(0.18, 16, 16);
    const sphereMat = new THREE.MeshBasicMaterial({
      color: 0xeeeeee,
      transparent: true,
      opacity: 0.6,
      depthTest: false
    });
    this.centralSphere = new THREE.Mesh(sphereGeo, sphereMat);
    this.centralSphere.renderOrder = 999;
    this.group.add(this.centralSphere);

    // 2. Cardinal Translation Cones (X: Red, Y: Green, Z: Blue)
    this.coneX = this.createArrowGroup(new THREE.Vector3(1, 0, 0), length, 0xb03020);
    this.coneY = this.createArrowGroup(new THREE.Vector3(0, 1, 0), length, 0x1a9940);
    this.coneZ = this.createArrowGroup(new THREE.Vector3(0, 0, 1), length, 0x1e52a0);

    this.group.add(this.coneX);
    this.group.add(this.coneY);
    this.group.add(this.coneZ);

    // 3. Cardinal Rotation Arcs
    this.arcX = this.createArc(new THREE.Vector3(1, 0, 0), 0.9, 0xb03020);
    this.arcY = this.createArc(new THREE.Vector3(0, 1, 0), 0.9, 0x1a9940);
    this.arcZ = this.createArc(new THREE.Vector3(0, 0, 1), 0.9, 0x1e52a0);

    this.group.add(this.arcX);
    this.group.add(this.arcY);
    this.group.add(this.arcZ);

    this.group.visible = false;
  }

  private createArrowGroup(dir: THREE.Vector3, length: number, color: number): THREE.Group {
    const grp = new THREE.Group();
    const shaftGeo = new THREE.CylinderGeometry(0.02, 0.02, length - 0.25, 8);
    const headGeo = new THREE.ConeGeometry(0.08, 0.25, 12);
    const mat = new THREE.MeshBasicMaterial({ color, depthTest: false });

    const shaft = new THREE.Mesh(shaftGeo, mat);
    shaft.position.y = (length - 0.25) * 0.5;
    shaft.renderOrder = 999;

    const head = new THREE.Mesh(headGeo, mat);
    head.position.y = length - 0.125;
    head.renderOrder = 999;

    grp.add(shaft);
    grp.add(head);

    const quat = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.clone().normalize());
    grp.quaternion.copy(quat);
    return grp;
  }

  private createArc(axis: THREE.Vector3, radius: number, color: number): THREE.Line {
    const pts: THREE.Vector3[] = [];
    const segments = 32;
    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 0.75;
      pts.push(new THREE.Vector3(Math.cos(angle) * radius, Math.sin(angle) * radius, 0));
    }
    const geo = new THREE.BufferGeometry().setFromPoints(pts);
    const mat = new THREE.LineBasicMaterial({ color, linewidth: 2, depthTest: false });
    const line = new THREE.Line(geo, mat);
    line.renderOrder = 999;

    const quat = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), axis.clone().normalize());
    line.quaternion.copy(quat);
    return line;
  }

  public setCollapsedAxis(axis: 'x' | 'y' | 'z' | null): void {
    this.collapsedAxis = axis;
    this.coneX.visible = axis !== 'x';
    this.arcX.visible = axis !== 'x';
    this.coneY.visible = axis !== 'y';
    this.arcY.visible = axis !== 'y';
    this.coneZ.visible = axis !== 'z';
    this.arcZ.visible = axis !== 'z';
  }

  public setPosition(pos: THREE.Vector3): void {
    this.group.position.copy(pos);
  }

  public setVisible(visible: boolean): void {
    this.group.visible = visible;
  }

  public snapAngle(angleRad: number): number {
    const snapRad = THREE.MathUtils.degToRad(this.snapAngleDeg);
    return Math.round(angleRad / snapRad) * snapRad;
  }

  public snapPosition(pos: THREE.Vector3): THREE.Vector3 {
    return new THREE.Vector3(
      Math.round(pos.x / this.snapGridUnits) * this.snapGridUnits,
      Math.round(pos.y / this.snapGridUnits) * this.snapGridUnits,
      Math.round(pos.z / this.snapGridUnits) * this.snapGridUnits
    );
  }
}
