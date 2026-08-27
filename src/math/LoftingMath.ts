import * as THREE from 'three';
import { CurvePoint } from './CurveMath';

export interface LoftedMeshResult {
  geometry: THREE.BufferGeometry;
  vertices: Float32Array;
  normals: Float32Array;
  uvs: Float32Array;
  indices: Uint32Array;
}

export class LoftingMath {
  /**
   * Loft a ruled parametric surface mesh between two 3D curve point sequences.
   * Samples curves along parameter u in [0, 1] and creates a triangle grid across v in [0, 1].
   */
  public static loftBetweenTwoCurves(
    curveA: CurvePoint[],
    curveB: CurvePoint[],
    uSteps: number = 32,
    vSteps: number = 8
  ): THREE.BufferGeometry {
    if (curveA.length < 2 || curveB.length < 2) {
      return new THREE.BufferGeometry();
    }

    const sampleCurveAtU = (pts: CurvePoint[], u: number): THREE.Vector3 => {
      const idxF = u * (pts.length - 1);
      const i0 = Math.floor(idxF);
      const i1 = Math.min(pts.length - 1, i0 + 1);
      const frac = idxF - i0;
      return pts[i0].position.clone().lerp(pts[i1].position, frac);
    };

    const numU = Math.max(2, uSteps);
    const numV = Math.max(2, vSteps);

    const positions: number[] = [];
    const uvs: number[] = [];
    const indices: number[] = [];

    // Generate grid vertices
    for (let j = 0; j < numV; j++) {
      const v = j / (numV - 1);
      for (let i = 0; i < numU; i++) {
        const u = i / (numU - 1);
        const pA = sampleCurveAtU(curveA, u);
        const pB = sampleCurveAtU(curveB, u);

        // Linear interpolation across v
        const pos = pA.lerp(pB, v);
        positions.push(pos.x, pos.y, pos.z);
        uvs.push(u, v);
      }
    }

    // Generate triangle strip indices
    for (let j = 0; j < numV - 1; j++) {
      for (let i = 0; i < numU - 1; i++) {
        const row1 = j * numU;
        const row2 = (j + 1) * numU;

        const iA = row1 + i;
        const iB = row1 + i + 1;
        const iC = row2 + i;
        const iD = row2 + i + 1;

        indices.push(iA, iC, iB);
        indices.push(iB, iC, iD);
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
    geometry.setIndex(indices);
    geometry.computeVertexNormals();

    return geometry;
  }

  /**
   * Lofts a multi-curve skinning across 3 or more guide curves.
   */
  public static loftMultiCurves(
    curves: CurvePoint[][],
    uSteps: number = 32,
    tension: number = 0.0
  ): THREE.BufferGeometry {
    if (curves.length < 2) return new THREE.BufferGeometry();
    if (curves.length === 2) return this.loftBetweenTwoCurves(curves[0], curves[1], uSteps, 8);

    const numCurves = curves.length;
    const numU = Math.max(2, uSteps);

    const sampleCurveAtU = (pts: CurvePoint[], u: number): THREE.Vector3 => {
      const idxF = u * (pts.length - 1);
      const i0 = Math.floor(idxF);
      const i1 = Math.min(pts.length - 1, i0 + 1);
      const frac = idxF - i0;
      return pts[i0].position.clone().lerp(pts[i1].position, frac);
    };

    const vSubdivisions = tension > 0.05 ? 8 : 1;
    const totalVSteps = (numCurves - 1) * vSubdivisions + 1;

    const positions: number[] = [];
    const uvs: number[] = [];
    const indices: number[] = [];

    // Evaluate across V
    for (let j = 0; j < totalVSteps; j++) {
      const v = j / (totalVSteps - 1);

      for (let i = 0; i < numU; i++) {
        const u = i / (numU - 1);
        const crossPts = curves.map(c => sampleCurveAtU(c, u));
        let pos: THREE.Vector3;

        if (tension > 0.05) {
          const spline = new THREE.CatmullRomCurve3(crossPts, false, 'centripetal', Math.max(0.01, 1.0 - tension * 0.8));
          pos = spline.getPoint(v);
        } else {
          const scaledV = v * (numCurves - 1);
          const c0 = Math.min(numCurves - 2, Math.floor(scaledV));
          const c1 = c0 + 1;
          const frac = scaledV - c0;
          pos = crossPts[c0].clone().lerp(crossPts[c1], frac);
        }

        positions.push(pos.x, pos.y, pos.z);
        uvs.push(u, v);
      }
    }

    for (let j = 0; j < totalVSteps - 1; j++) {
      for (let i = 0; i < numU - 1; i++) {
        const row1 = j * numU;
        const row2 = (j + 1) * numU;

        const iA = row1 + i;
        const iB = row1 + i + 1;
        const iC = row2 + i;
        const iD = row2 + i + 1;

        indices.push(iA, iC, iB);
        indices.push(iB, iC, iD);
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
    geometry.setIndex(indices);
    geometry.computeVertexNormals();

    return geometry;
  }
}
