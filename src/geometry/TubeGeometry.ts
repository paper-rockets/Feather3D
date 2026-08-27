import * as THREE from 'three';
import { CurvePoint } from '../math/CurveMath';
import { ParallelTransportFrame, Frame } from '../math/ParallelTransportFrame';

export interface TubeOptions {
  baseRadius?: number;
  minRadius?: number;
  maxRadius?: number;
  radialSegments?: number;
  taperStart?: boolean;
  taperEnd?: boolean;
  taperLength?: number;
  color?: THREE.Color;
  alpha?: number;
  normal?: THREE.Vector3;
}

export class TubeGeometry {
  /**
   * Builds an indexed cylindrical BufferGeometry along curve points with variable radius.
   */
  public static build(
    points: CurvePoint[],
    options: TubeOptions = {}
  ): THREE.BufferGeometry {
    if (points.length < 2) return new THREE.BufferGeometry();

    const baseRadius = options.baseRadius ?? 0.01;
    const minRadius = options.minRadius ?? baseRadius * 0.2;
    const maxRadius = options.maxRadius ?? baseRadius * 2.0;
    const radialSegs = Math.max(3, options.radialSegments ?? 8);
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
    // Radial vertices per ring (radialSegs + 1 for UV seam)
    const vertsPerRing = radialSegs + 1;
    const vertexCount = numPoints * vertsPerRing;
    const triangleCount = (numPoints - 1) * radialSegs * 2;

    const positions = new Float32Array(vertexCount * 3);
    const normals = new Float32Array(vertexCount * 3);
    const uvs = new Float32Array(vertexCount * 2);
    const colors = new Float32Array(vertexCount * 4);
    const indices = new Uint32Array(triangleCount * 3);

    for (let i = 0; i < numPoints; i++) {
      const pt = points[i];
      const frame = frames[i];
      const u = i / (numPoints - 1);

      // Pressure modulation
      const pMod = THREE.MathUtils.clamp(pt.pressure > 0 ? pt.pressure : 0.5, 0.05, 1.0);
      let radius = minRadius + pMod * (maxRadius - minRadius);

      // Tapering
      if (taperStart && u < taperRatio) {
        radius *= (u / taperRatio);
      }
      if (taperEnd && u > 1.0 - taperRatio) {
        radius *= ((1.0 - u) / taperRatio);
      }

      radius = Math.max(radius, 0.0002);

      for (let j = 0; j <= radialSegs; j++) {
        const theta = (j / radialSegs) * Math.PI * 2;
        const cosT = Math.cos(theta);
        const sinT = Math.sin(theta);

        // Compute radial normal vector in the frame's cross-sectional plane
        const nX = frame.binormal.x * cosT + frame.normal.x * sinT;
        const nY = frame.binormal.y * cosT + frame.normal.y * sinT;
        const nZ = frame.binormal.z * cosT + frame.normal.z * sinT;

        const vIdx = i * vertsPerRing + j;

        positions[vIdx * 3] = pt.position.x + nX * radius;
        positions[vIdx * 3 + 1] = pt.position.y + nY * radius;
        positions[vIdx * 3 + 2] = pt.position.z + nZ * radius;

        normals[vIdx * 3] = nX;
        normals[vIdx * 3 + 1] = nY;
        normals[vIdx * 3 + 2] = nZ;

        uvs[vIdx * 2] = j / radialSegs;
        uvs[vIdx * 2 + 1] = u;

        colors[vIdx * 4] = color.r;
        colors[vIdx * 4 + 1] = color.g;
        colors[vIdx * 4 + 2] = color.b;
        colors[vIdx * 4 + 3] = alpha;
      }
    }

    // Generate indices
    let idxCounter = 0;
    for (let i = 0; i < numPoints - 1; i++) {
      for (let j = 0; j < radialSegs; j++) {
        const a = i * vertsPerRing + j;
        const b = (i + 1) * vertsPerRing + j;
        const c = (i + 1) * vertsPerRing + j + 1;
        const d = i * vertsPerRing + j + 1;

        indices[idxCounter++] = a;
        indices[idxCounter++] = b;
        indices[idxCounter++] = d;

        indices[idxCounter++] = b;
        indices[idxCounter++] = c;
        indices[idxCounter++] = d;
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
