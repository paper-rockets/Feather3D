import * as THREE from 'three';

export type TransformAxis = 'x' | 'y' | 'z' | 'all';
export type TransformSpace = 'world' | 'local';

export class Joystick3D {
  public static applyTranslation(
    object: THREE.Object3D,
    axis: TransformAxis,
    amount: number,
    space: TransformSpace = 'world'
  ): void {
    const dir = new THREE.Vector3();
    if (axis === 'x') dir.set(1, 0, 0);
    else if (axis === 'y') dir.set(0, 1, 0);
    else if (axis === 'z') dir.set(0, 0, 1);

    if (space === 'local') {
      dir.applyQuaternion(object.quaternion);
    }

    object.position.addScaledVector(dir, amount);
  }

  public static applyRotation(
    object: THREE.Object3D,
    axis: TransformAxis,
    angleRad: number,
    space: TransformSpace = 'world'
  ): void {
    const axisVec = new THREE.Vector3();
    if (axis === 'x') axisVec.set(1, 0, 0);
    else if (axis === 'y') axisVec.set(0, 1, 0);
    else if (axis === 'z') axisVec.set(0, 0, 1);

    if (space === 'local') {
      object.rotateOnAxis(axisVec, angleRad);
    } else {
      object.rotateOnWorldAxis(axisVec, angleRad);
    }
  }

  public static applyScale(
    object: THREE.Object3D,
    axis: TransformAxis,
    scaleDelta: number
  ): void {
    if (axis === 'all') {
      object.scale.multiplyScalar(scaleDelta);
    } else if (axis === 'x') {
      object.scale.x *= scaleDelta;
    } else if (axis === 'y') {
      object.scale.y *= scaleDelta;
    } else if (axis === 'z') {
      object.scale.z *= scaleDelta;
    }
  }
}
