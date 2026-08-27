import * as THREE from 'three';
import { Joystick2D } from './Joystick2D';
import { Joystick3D, TransformAxis, TransformSpace } from './Joystick3D';
import { TransformGizmo } from './TransformGizmo';

export type JoystickMode = '2d' | '3d';

export class JoystickController {
  public mode: JoystickMode = '2d';
  public targetObject: THREE.Object3D | null = null;
  public gizmo: TransformGizmo;
  public space: TransformSpace = 'world';
  public isEnabled: boolean = false;

  constructor() {
    this.gizmo = new TransformGizmo();
  }

  public setTarget(object: THREE.Object3D | null): void {
    this.targetObject = object;
    if (object && this.isEnabled) {
      this.gizmo.setPosition(object.position);
      this.gizmo.setVisible(true);
    } else {
      this.gizmo.setVisible(false);
    }
  }

  public setEnabled(enabled: boolean): void {
    this.isEnabled = enabled;
    if (this.targetObject && enabled) {
      this.gizmo.setPosition(this.targetObject.position);
      this.gizmo.setVisible(true);
    } else {
      this.gizmo.setVisible(false);
    }
  }

  public handle2DDrag(deltaX: number, deltaY: number, camera: THREE.Camera): void {
    if (!this.targetObject) return;
    Joystick2D.applyScreenTranslation(this.targetObject, deltaX, deltaY, camera);
    this.gizmo.setPosition(this.targetObject.position);
  }

  public handle2DRotate(deltaAngle: number, camera: THREE.Camera): void {
    if (!this.targetObject) return;
    Joystick2D.applyScreenRotation(this.targetObject, deltaAngle, camera);
  }

  public handle3DTranslate(axis: TransformAxis, amount: number): void {
    if (!this.targetObject) return;
    Joystick3D.applyTranslation(this.targetObject, axis, amount, this.space);
    this.gizmo.setPosition(this.targetObject.position);
  }

  public handle3DRotate(axis: TransformAxis, angleDeg: number): void {
    if (!this.targetObject) return;
    const rad = THREE.MathUtils.degToRad(angleDeg);
    Joystick3D.applyRotation(this.targetObject, axis, rad, this.space);
  }

  public collapseAxis(axis: 'x' | 'y' | 'z' | null): void {
    this.gizmo.setCollapsedAxis(axis);
  }

  public handleTrackballRotate(deltaX: number, deltaY: number, camera: THREE.Camera): void {
    if (!this.targetObject) return;
    const forward = new THREE.Vector3().subVectors(this.targetObject.position, camera.position).normalize();
    const right = new THREE.Vector3().crossVectors(forward, camera.up).normalize();
    const up = new THREE.Vector3().crossVectors(right, forward).normalize();

    const rotQuat = new THREE.Quaternion()
      .setFromAxisAngle(up, deltaX * 0.02)
      .multiply(new THREE.Quaternion().setFromAxisAngle(right, deltaY * 0.02));

    this.targetObject.quaternion.premultiply(rotQuat);
  }

  public handleNonUniformScale(axis: 'width' | 'height', scaleFactor: number): void {
    if (!this.targetObject) return;
    if (axis === 'width') {
      this.targetObject.scale.x *= scaleFactor;
      this.targetObject.scale.z *= scaleFactor;
    } else {
      this.targetObject.scale.y *= scaleFactor;
    }
  }

  public handleScale(scaleFactor: number): void {
    if (!this.targetObject) return;
    Joystick2D.applyScale(this.targetObject, scaleFactor);
  }
}
