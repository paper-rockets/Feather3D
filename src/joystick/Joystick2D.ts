import * as THREE from 'three';

export class Joystick2D {
  /**
   * Applies screen-space 2D translation relative to camera viewport orientation.
   */
  public static applyScreenTranslation(
    object: THREE.Object3D,
    deltaScreenX: number,
    deltaScreenY: number,
    camera: THREE.Camera,
    sensitivity: number = 0.005
  ): void {
    const cameraRight = new THREE.Vector3(1, 0, 0).applyQuaternion(camera.quaternion);
    const cameraUp = new THREE.Vector3(0, 1, 0).applyQuaternion(camera.quaternion);

    const move = cameraRight.clone().multiplyScalar(deltaScreenX * sensitivity)
      .add(cameraUp.clone().multiplyScalar(-deltaScreenY * sensitivity));

    object.position.add(move);
  }

  /**
   * Applies screen-space roll rotation around camera view axis.
   */
  public static applyScreenRotation(
    object: THREE.Object3D,
    deltaAngle: number,
    camera: THREE.Camera
  ): void {
    const cameraDir = new THREE.Vector3(0, 0, -1).applyQuaternion(camera.quaternion);
    const quat = new THREE.Quaternion().setFromAxisAngle(cameraDir, deltaAngle);
    object.quaternion.premultiply(quat);
  }

  /**
   * Applies scaling factor.
   */
  public static applyScale(object: THREE.Object3D, scaleFactor: number): void {
    object.scale.multiplyScalar(scaleFactor);
  }
}
