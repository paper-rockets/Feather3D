import * as THREE from 'three';
import { CurvePoint } from '../math/CurveMath';
import { ParallelTransportFrame, Frame } from '../math/ParallelTransportFrame';

export interface RibbonOptions {
  baseWidth?: number;
  minWidth?: number;
  maxWidth?: number;
  taperStart?: boolean;
  taperEnd?: boolean;
  taperLength?: number; // ratio of curve length, e.g. 0.1
  color?: THREE.Color;
  alpha?: number;
  orientToNormal?: boolean;
  normal?: THREE.Vector3;
}

export class RibbonGeometry {
  /**
   * Builds an indexed BufferGeometry for a flat or camera-oriented ribbon curve.
   */
  public static build(
    points: CurvePoint[],
    options: RibbonOptions = {}
  ): THREE.BufferGeometry {
    if (points.length < 2) return new THREE.BufferGeometry();

    const baseWidth = options.baseWidth ?? 0.02;
    const minWidth = options.minWidth ?? baseWidth * 0.2;
    const maxWidth = options.maxWidth ?? baseWidth * 2.0;
    const taperStart = options.taperStart ?? true;
    const taperEnd = options.taperEnd ?? true;
    const taperRatio = options.taperLength ?? 0.1;
    const color = options.color ?? new THREE.Color(0x1a1a2e);
    const alpha = options.alpha ?? 1.0;

    const positionsVec = points.map(p => p.position);
    const frames: Frame[] = ParallelTransportFrame.computeFrames(
      positionsVec,
      options.normal
    );

    const numPoints = points.length;
    const vertexCount = numPoints * 2;
    const triangleCount = (numPoints - 1) * 2;

    const positions = new Float32Array(vertexCount * 3);
    const normals = new Float32Array(vertexCount * 3);
    const uvs = new Float32Array(vertexCount * 2);
    const colors = new Float32Array(vertexCount * 4); // RGBA
    const indices = new Uint32Array(triangleCount * 3);

    for (let i = 0; i < numPoints; i++) {
      const pt = points[i];
      const frame = frames[i];
      const u = i / (numPoints - 1);

      // Pressure modulation
      const pMod = THREE.MathUtils.clamp(pt.pressure > 0 ? pt.pressure : 0.5, 0.05, 1.0);
      let width = minWidth + pMod * (maxWidth - minWidth);

      // Tapering
      if (taperStart && u < taperRatio) {
        width *= (u / taperRatio);
      }
      if (taperEnd && u > 1.0 - taperRatio) {
        width *= ((1.0 - u) / taperRatio);
      }

      const halfWidth = Math.max(width * 0.5, 0.0005);
      const sideVec = frame.binormal.clone().multiplyScalar(halfWidth);

      // Left vertex
      const leftPos = pt.position.clone().sub(sideVec);
      const idxL = i * 2;
      positions[idxL * 3] = leftPos.x;
      positions[idxL * 3 + 1] = leftPos.y;
      positions[idxL * 3 + 2] = leftPos.z;

      normals[idxL * 3] = frame.normal.x;
      normals[idxL * 3 + 1] = frame.normal.y;
      normals[idxL * 3 + 2] = frame.normal.z;

      uvs[idxL * 2] = 0;
      uvs[idxL * 2 + 1] = u;

      colors[idxL * 4] = color.r;
      colors[idxL * 4 + 1] = color.g;
      colors[idxL * 4 + 2] = color.b;
      colors[idxL * 4 + 3] = alpha * pMod;

      // Right vertex
      const rightPos = pt.position.clone().add(sideVec);
      const idxR = i * 2 + 1;
      positions[idxR * 3] = rightPos.x;
      positions[idxR * 3 + 1] = rightPos.y;
      positions[idxR * 3 + 2] = rightPos.z;

      normals[idxR * 3] = frame.normal.x;
      normals[idxR * 3 + 1] = frame.normal.y;
      normals[idxR * 3 + 2] = frame.normal.z;

      uvs[idxR * 2] = 1;
      uvs[idxR * 2 + 1] = u;

      colors[idxR * 4] = color.r;
      colors[idxR * 4 + 1] = color.g;
      colors[idxR * 4 + 2] = color.b;
      colors[idxR * 4 + 3] = alpha * pMod;

      // Index assignment
      if (i < numPoints - 1) {
        const triIdx = i * 6;
        const a = idxL;
        const b = idxR;
        const c = idxL + 2;
        const d = idxR + 2;

        indices[triIdx] = a;
        indices[triIdx + 1] = c;
        indices[triIdx + 2] = b;

        indices[triIdx + 3] = b;
        indices[triIdx + 4] = c;
        indices[triIdx + 5] = d;
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
