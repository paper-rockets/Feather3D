import * as THREE from 'three';
import { CurvePoint } from '../math/CurveMath';

export class MeshPatchGeometry {
  /**
   * Generates a filled polygon patch from a closed or near-closed curve.
   */
  public static buildPatch(
    points: CurvePoint[],
    color: THREE.Color = new THREE.Color(0x1a1a2e),
    alpha: number = 0.8
  ): THREE.BufferGeometry {
    if (points.length < 3) return new THREE.BufferGeometry();

    // Compute centroid and average normal
    const centroid = new THREE.Vector3();
    points.forEach(p => centroid.add(p.position));
    centroid.multiplyScalar(1 / points.length);

    // Compute best-fit normal via Newell's method
    const normal = new THREE.Vector3();
    const n = points.length;
    for (let i = 0; i < n; i++) {
      const cur = points[i].position;
      const next = points[(i + 1) % n].position;
      normal.x += (cur.y - next.y) * (cur.z + next.z);
      normal.y += (cur.z - next.z) * (cur.x + next.x);
      normal.z += (cur.x - next.x) * (cur.y + next.y);
    }
    normal.normalize();

    // Create fan triangulation from centroid
    const positions: number[] = [];
    const normals: number[] = [];
    const colors: number[] = [];
    const indices: number[] = [];

    // Centroid vertex at index 0
    positions.push(centroid.x, centroid.y, centroid.z);
    normals.push(normal.x, normal.y, normal.z);
    colors.push(color.r, color.g, color.b, alpha);

    for (let i = 0; i < n; i++) {
      const pos = points[i].position;
      positions.push(pos.x, pos.y, pos.z);
      normals.push(normal.x, normal.y, normal.z);
      colors.push(color.r, color.g, color.b, alpha);
    }

    for (let i = 0; i < n; i++) {
      const next = (i + 1) % n;
      indices.push(0, i + 1, next + 1);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 4));
    geometry.setIndex(indices);

    return geometry;
  }
}
