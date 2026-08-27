import * as THREE from 'three';
import { CurvePoint } from '../math/CurveMath';
import { ParallelTransportFrame, Frame } from '../math/ParallelTransportFrame';

export type ScatterType =
  | 'foliage_maple'
  | 'foliage_oak'
  | 'foliage_beech'
  | 'foliage_fir'
  | 'foliage_bunch'
  | 'grass'
  | 'particles'
  | 'bokeh'
  | 'cloud'
  | 'stardust';

export interface ScatterParticleOptions {
  scatterType?: ScatterType;
  baseSize?: number;
  minSize?: number;
  maxSize?: number;
  spacing?: number;
  jitter?: number;
  taperStart?: boolean;
  taperEnd?: boolean;
  taperLength?: number;
  color?: THREE.Color;
  alpha?: number;
  normal?: THREE.Vector3;
}

export class ScatterParticleGeometry {
  /**
   * Builds an indexed BufferGeometry of scattered quads/billboards along the curve
   * for foliage leaves, fir needles, stardust, bokeh bubbles, and particle effects.
   */
  public static build(
    points: CurvePoint[],
    options: ScatterParticleOptions = {}
  ): THREE.BufferGeometry {
    if (points.length < 2) return new THREE.BufferGeometry();

    const scatterType = options.scatterType ?? 'foliage_maple';
    const baseSize = options.baseSize ?? 0.04;
    const minSize = options.minSize ?? baseSize * 0.4;
    const maxSize = options.maxSize ?? baseSize * 1.8;
    const spacingFactor = options.spacing ?? (scatterType === 'foliage_fir' ? 0.35 : scatterType.startsWith('foliage') ? 0.6 : 0.5);
    const jitterFactor = options.jitter ?? 0.8;
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

    // Compute curve arc lengths
    const distances: number[] = [0];
    let totalDist = 0;
    for (let i = 0; i < points.length - 1; i++) {
      const d = points[i].position.distanceTo(points[i + 1].position);
      totalDist += d;
      distances.push(totalDist);
    }

    if (totalDist <= 0.0001) return new THREE.BufferGeometry();

    // Step distance between particle stamps
    const stepDist = Math.max(baseSize * spacingFactor, 0.004);
    const numStamps = Math.max(3, Math.floor(totalDist / stepDist));

    const totalVerts = numStamps * 4;
    const totalIndices = numStamps * 6;

    const positions = new Float32Array(totalVerts * 3);
    const normals = new Float32Array(totalVerts * 3);
    const uvs = new Float32Array(totalVerts * 2);
    const colors = new Float32Array(totalVerts * 4);
    const indices = new Uint32Array(totalIndices);

    let vIdx = 0;
    let iIdx = 0;

    for (let k = 0; k < numStamps; k++) {
      const u = numStamps > 1 ? k / (numStamps - 1) : 0;
      const targetDist = u * totalDist;

      // Find segment
      let segIdx = 0;
      while (segIdx < distances.length - 2 && distances[segIdx + 1] < targetDist) {
        segIdx++;
      }
      const segLen = Math.max(distances[segIdx + 1] - distances[segIdx], 0.0001);
      const tSub = THREE.MathUtils.clamp((targetDist - distances[segIdx]) / segLen, 0, 1);

      const pt0 = points[segIdx];
      const pt1 = points[segIdx + 1];
      const pos = new THREE.Vector3().lerpVectors(pt0.position, pt1.position, tSub);

      const frame0 = frames[segIdx];
      const frame1 = frames[segIdx + 1];
      const binormal = new THREE.Vector3().lerpVectors(frame0.binormal, frame1.binormal, tSub).normalize();
      const normal = new THREE.Vector3().lerpVectors(frame0.normal, frame1.normal, tSub).normalize();
      const tangent = new THREE.Vector3().lerpVectors(frame0.tangent, frame1.tangent, tSub).normalize();

      const pressure0 = pt0.pressure > 0 ? pt0.pressure : 0.5;
      const pressure1 = pt1.pressure > 0 ? pt1.pressure : 0.5;
      const pMod = THREE.MathUtils.lerp(pressure0, pressure1, tSub);

      // Scale envelope
      let stampSize = minSize + pMod * (maxSize - minSize);
      if (taperStart && u < taperRatio) {
        stampSize *= (u / taperRatio);
      }
      if (taperEnd && u > 1.0 - taperRatio) {
        stampSize *= ((1.0 - u) / taperRatio);
      }
      stampSize = Math.max(stampSize, 0.001);

      // Deterministic hash based on index
      const hash1 = Math.sin(k * 12.9898 + 78.233) * 43758.5453;
      const rand1 = hash1 - Math.floor(hash1); // 0 to 1
      const hash2 = Math.sin(k * 93.9898 + 67.345) * 23421.6312;
      const rand2 = hash2 - Math.floor(hash2);
      const hash3 = Math.sin(k * 45.1234 + 12.567) * 56789.1234;
      const rand3 = hash3 - Math.floor(hash3);

      // Position jitter in cross-sectional plane
      const offsetB = (rand1 - 0.5) * 2 * (stampSize * jitterFactor);
      const offsetN = (rand2 - 0.5) * 2 * (stampSize * jitterFactor * 0.6);
      const center = pos.clone()
        .add(binormal.clone().multiplyScalar(offsetB))
        .add(normal.clone().multiplyScalar(offsetN));

      // Stamp in-plane rotation
      const rotAngle = rand3 * Math.PI * 2;
      const cosR = Math.cos(rotAngle);
      const sinR = Math.sin(rotAngle);

      // Basis vectors for the quad
      const halfSize = stampSize * 0.5;
      let axisU: THREE.Vector3;
      let axisV: THREE.Vector3;

      if (scatterType === 'foliage_fir') {
        // Fir needles radiate outwards from center path
        const sideSign = (k % 2 === 0 ? 1 : -1);
        axisU = binormal.clone().multiplyScalar(sideSign * halfSize * 0.5);
        axisV = tangent.clone().multiplyScalar(halfSize * 1.5).add(binormal.clone().multiplyScalar(sideSign * halfSize));
      } else {
        axisU = binormal.clone().multiplyScalar(cosR).add(normal.clone().multiplyScalar(sinR)).multiplyScalar(halfSize);
        axisV = binormal.clone().multiplyScalar(-sinR).add(normal.clone().multiplyScalar(cosR)).multiplyScalar(halfSize);
      }

      // 4 Quad Vertices (Bottom-Left, Bottom-Right, Top-Left, Top-Right)
      const p0 = center.clone().sub(axisU).sub(axisV);
      const p1 = center.clone().add(axisU).sub(axisV);
      const p2 = center.clone().sub(axisU).add(axisV);
      const p3 = center.clone().add(axisU).add(axisV);

      const stampAlpha = alpha * (0.75 + 0.25 * rand1);

      // Vertex 0 (UV 0, 0)
      positions[vIdx] = p0.x; positions[vIdx + 1] = p0.y; positions[vIdx + 2] = p0.z;
      normals[vIdx] = normal.x; normals[vIdx + 1] = normal.y; normals[vIdx + 2] = normal.z;
      uvs[(vIdx / 3) * 2] = 0; uvs[(vIdx / 3) * 2 + 1] = 0;
      colors[(vIdx / 3) * 4] = color.r; colors[(vIdx / 3) * 4 + 1] = color.g; colors[(vIdx / 3) * 4 + 2] = color.b; colors[(vIdx / 3) * 4 + 3] = stampAlpha;
      vIdx += 3;

      // Vertex 1 (UV 1, 0)
      positions[vIdx] = p1.x; positions[vIdx + 1] = p1.y; positions[vIdx + 2] = p1.z;
      normals[vIdx] = normal.x; normals[vIdx + 1] = normal.y; normals[vIdx + 2] = normal.z;
      uvs[(vIdx / 3) * 2] = 1; uvs[(vIdx / 3) * 2 + 1] = 0;
      colors[(vIdx / 3) * 4] = color.r; colors[(vIdx / 3) * 4 + 1] = color.g; colors[(vIdx / 3) * 4 + 2] = color.b; colors[(vIdx / 3) * 4 + 3] = stampAlpha;
      vIdx += 3;

      // Vertex 2 (UV 0, 1)
      positions[vIdx] = p2.x; positions[vIdx + 1] = p2.y; positions[vIdx + 2] = p2.z;
      normals[vIdx] = normal.x; normals[vIdx + 1] = normal.y; normals[vIdx + 2] = normal.z;
      uvs[(vIdx / 3) * 2] = 0; uvs[(vIdx / 3) * 2 + 1] = 1;
      colors[(vIdx / 3) * 4] = color.r; colors[(vIdx / 3) * 4 + 1] = color.g; colors[(vIdx / 3) * 4 + 2] = color.b; colors[(vIdx / 3) * 4 + 3] = stampAlpha;
      vIdx += 3;

      // Vertex 3 (UV 1, 1)
      positions[vIdx] = p3.x; positions[vIdx + 1] = p3.y; positions[vIdx + 2] = p3.z;
      normals[vIdx] = normal.x; normals[vIdx + 1] = normal.y; normals[vIdx + 2] = normal.z;
      uvs[(vIdx / 3) * 2] = 1; uvs[(vIdx / 3) * 2 + 1] = 1;
      colors[(vIdx / 3) * 4] = color.r; colors[(vIdx / 3) * 4 + 1] = color.g; colors[(vIdx / 3) * 4 + 2] = color.b; colors[(vIdx / 3) * 4 + 3] = stampAlpha;
      vIdx += 3;

      const baseV = k * 4;
      indices[iIdx++] = baseV;
      indices[iIdx++] = baseV + 1;
      indices[iIdx++] = baseV + 2;

      indices[iIdx++] = baseV + 1;
      indices[iIdx++] = baseV + 3;
      indices[iIdx++] = baseV + 2;
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
