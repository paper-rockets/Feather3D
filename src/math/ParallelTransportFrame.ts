import * as THREE from 'three';

export interface Frame {
  position: THREE.Vector3;
  tangent: THREE.Vector3;
  normal: THREE.Vector3;
  binormal: THREE.Vector3;
}

export class ParallelTransportFrame {
  /**
   * Computes Rotation Minimizing Frames (RMF) using the double reflection method (Wang et al. 2008).
   * Generates continuous, twist-free coordinate frames along arbitrary 3D curve trajectories.
   */
  public static computeFrames(
    positions: THREE.Vector3[],
    initialNormal?: THREE.Vector3
  ): Frame[] {
    const n = positions.length;
    if (n < 2) {
      const pos = n === 1 ? positions[0].clone() : new THREE.Vector3();
      const tan = new THREE.Vector3(0, 0, 1);
      const norm = new THREE.Vector3(0, 1, 0);
      const binorm = new THREE.Vector3(1, 0, 0);
      return [{ position: pos, tangent: tan, normal: norm, binormal: binorm }];
    }

    const frames: Frame[] = new Array(n);

    // Compute tangent vectors
    const tangents: THREE.Vector3[] = new Array(n);
    for (let i = 0; i < n - 1; i++) {
      const t = new THREE.Vector3().subVectors(positions[i + 1], positions[i]);
      if (t.lengthSq() < 1e-10) {
        tangents[i] = i > 0 ? tangents[i - 1].clone() : new THREE.Vector3(0, 0, 1);
      } else {
        tangents[i] = t.normalize();
      }
    }
    tangents[n - 1] = tangents[n - 2].clone();

    // Initial frame at index 0
    const t0 = tangents[0];
    let n0: THREE.Vector3;

    if (initialNormal && Math.abs(initialNormal.dot(t0)) < 0.999) {
      n0 = initialNormal.clone().projectOnPlane(t0).normalize();
    } else {
      // Find arbitrary perpendicular vector
      const absX = Math.abs(t0.x);
      const absY = Math.abs(t0.y);
      const absZ = Math.abs(t0.z);

      let up: THREE.Vector3;
      if (absX <= absY && absX <= absZ) {
        up = new THREE.Vector3(1, 0, 0);
      } else if (absY <= absX && absY <= absZ) {
        up = new THREE.Vector3(0, 1, 0);
      } else {
        up = new THREE.Vector3(0, 0, 1);
      }
      n0 = new THREE.Vector3().crossVectors(t0, up).normalize();
    }

    let b0 = new THREE.Vector3().crossVectors(t0, n0).normalize();

    frames[0] = {
      position: positions[0].clone(),
      tangent: t0.clone(),
      normal: n0.clone(),
      binormal: b0.clone()
    };

    // Propagate frames using Wang et al. double reflection
    for (let i = 0; i < n - 1; i++) {
      const xi = positions[i];
      const xNext = positions[i + 1];
      const ti = tangents[i];
      const tNext = tangents[i + 1];
      const ri = frames[i].normal;

      const v1 = new THREE.Vector3().subVectors(xNext, xi);
      const c1 = v1.dot(v1);

      let rNext: THREE.Vector3;

      if (c1 < 1e-10) {
        rNext = ri.clone();
      } else {
        // First reflection
        const tiL = ti.clone().addScaledVector(v1, -(2 / c1) * v1.dot(ti));
        const riL = ri.clone().addScaledVector(v1, -(2 / c1) * v1.dot(ri));

        // Second reflection
        const v2 = new THREE.Vector3().subVectors(tNext, tiL);
        const c2 = v2.dot(v2);

        if (c2 < 1e-10) {
          rNext = riL.clone();
        } else {
          rNext = riL.clone().addScaledVector(v2, -(2 / c2) * v2.dot(riL));
        }
      }

      rNext.projectOnPlane(tNext).normalize();
      const bNext = new THREE.Vector3().crossVectors(tNext, rNext).normalize();

      frames[i + 1] = {
        position: xNext.clone(),
        tangent: tNext.clone(),
        normal: rNext.clone(),
        binormal: bNext.clone()
      };
    }

    return frames;
  }
}
