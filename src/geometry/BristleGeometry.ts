import * as THREE from 'three';
import { CurvePoint } from '../math/CurveMath';
import { ParallelTransportFrame, Frame } from '../math/ParallelTransportFrame';

export interface BristleOptions {
  numStrands?: number;
  baseWidth?: number;
  minWidth?: number;
  maxWidth?: number;
  strandWidthRatio?: number;
  jitter?: number;
  taperStart?: boolean;
  taperEnd?: boolean;
  taperLength?: number;
  color?: THREE.Color;
  alpha?: number;
  normal?: THREE.Vector3;
}

export class BristleGeometry {
  /**
   * Builds an indexed BufferGeometry containing multiple parallel sub-strands
   * along the curve path to simulate acrylic bristles, rake brushes, and multi-fiber strokes.
   */
  public static build(
    points: CurvePoint[],
    options: BristleOptions = {}
  ): THREE.BufferGeometry {
    if (points.length < 2) return new THREE.BufferGeometry();

    const numStrands = Math.max(2, Math.min(8, options.numStrands ?? 5));
    const baseWidth = options.baseWidth ?? 0.03;
    const minWidth = options.minWidth ?? baseWidth * 0.2;
    const maxWidth = options.maxWidth ?? baseWidth * 2.0;
    const strandWidthRatio = options.strandWidthRatio ?? 0.25;
    const jitterAmount = options.jitter ?? 0.08;
    const taperStart = options.taperStart ?? true;
    const taperEnd = options.taperEnd ?? true;
    const taperRatio = options.taperLength ?? 0.12;
    const color = options.color ?? new THREE.Color(0x1a1a2e);
    const alpha = options.alpha ?? 1.0;

    const positionsVec = points.map(p => p.position);
    const frames: Frame[] = ParallelTransportFrame.computeFrames(
      positionsVec,
      options.normal
    );

    const numPoints = points.length;
    const vertsPerStrand = numPoints * 2;
    const trisPerStrand = (numPoints - 1) * 2;
    const totalVerts = vertsPerStrand * numStrands;
    const totalIndices = trisPerStrand * numStrands * 3;

    const positions = new Float32Array(totalVerts * 3);
    const normals = new Float32Array(totalVerts * 3);
    const uvs = new Float32Array(totalVerts * 2);
    const colors = new Float32Array(totalVerts * 4);
    const indices = new Uint32Array(totalIndices);

    let vOffset = 0;
    let iOffset = 0;

    // Deterministic pseudo-random offset generator per strand
    for (let s = 0; s < numStrands; s++) {
      const strandT = numStrands > 1 ? (s / (numStrands - 1)) * 2 - 1 : 0; // -1 to 1
      const strandPhase = (s * 1.6180339887) % 1.0;
      const strandStartVert = vOffset / 3;

      for (let i = 0; i < numPoints; i++) {
        const pt = points[i];
        const frame = frames[i];
        const u = i / (numPoints - 1);

        const pMod = THREE.MathUtils.clamp(pt.pressure > 0 ? pt.pressure : 0.5, 0.05, 1.0);
        let totalWidth = minWidth + pMod * (maxWidth - minWidth);

        // Tapering
        if (taperStart && u < taperRatio) {
          totalWidth *= (u / taperRatio);
        }
        if (taperEnd && u > 1.0 - taperRatio) {
          totalWidth *= ((1.0 - u) / taperRatio);
        }

        const halfStrandWidth = Math.max((totalWidth * strandWidthRatio / numStrands) * 0.5, 0.0003);
        const strandOffset = strandT * (totalWidth * 0.45);
        const wobble = Math.sin(u * 15.0 + strandPhase * Math.PI * 2) * (totalWidth * jitterAmount);

        const centerOffset = frame.binormal.clone().multiplyScalar(strandOffset + wobble);
        const sideVec = frame.binormal.clone().multiplyScalar(halfStrandWidth);

        const strandCenter = pt.position.clone().add(centerOffset);
        const leftPos = strandCenter.clone().sub(sideVec);
        const rightPos = strandCenter.clone().add(sideVec);

        // Strand alpha modulation: outer strands slightly lighter
        const strandAlpha = alpha * pMod * (0.7 + 0.3 * (1 - Math.abs(strandT) * 0.3));

        // Left vertex
        positions[vOffset] = leftPos.x;
        positions[vOffset + 1] = leftPos.y;
        positions[vOffset + 2] = leftPos.z;
        normals[vOffset] = frame.normal.x;
        normals[vOffset + 1] = frame.normal.y;
        normals[vOffset + 2] = frame.normal.z;
        uvs[(vOffset / 3) * 2] = 0;
        uvs[(vOffset / 3) * 2 + 1] = u;
        colors[(vOffset / 3) * 4] = color.r;
        colors[(vOffset / 3) * 4 + 1] = color.g;
        colors[(vOffset / 3) * 4 + 2] = color.b;
        colors[(vOffset / 3) * 4 + 3] = strandAlpha;
        vOffset += 3;

        // Right vertex
        positions[vOffset] = rightPos.x;
        positions[vOffset + 1] = rightPos.y;
        positions[vOffset + 2] = rightPos.z;
        normals[vOffset] = frame.normal.x;
        normals[vOffset + 1] = frame.normal.y;
        normals[vOffset + 2] = frame.normal.z;
        uvs[(vOffset / 3) * 2] = 1;
        uvs[(vOffset / 3) * 2 + 1] = u;
        colors[(vOffset / 3) * 4] = color.r;
        colors[(vOffset / 3) * 4 + 1] = color.g;
        colors[(vOffset / 3) * 4 + 2] = color.b;
        colors[(vOffset / 3) * 4 + 3] = strandAlpha;
        vOffset += 3;
      }

      // Triangles for this strand
      for (let i = 0; i < numPoints - 1; i++) {
        const a = strandStartVert + i * 2;
        const b = strandStartVert + i * 2 + 1;
        const c = strandStartVert + (i + 1) * 2;
        const d = strandStartVert + (i + 1) * 2 + 1;

        indices[iOffset++] = a;
        indices[iOffset++] = c;
        indices[iOffset++] = b;

        indices[iOffset++] = b;
        indices[iOffset++] = c;
        indices[iOffset++] = d;
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('normal', new THREE.BufferAttribute(normals, 3));
    geometry.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 4));
    geometry.setIndex(new THREE.BufferAttribute(indices, 1));

    return geometry;
  }
}
