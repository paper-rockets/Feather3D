import * as THREE from 'three';
import { CurvePoint } from '../math/CurveMath';
import { ParallelTransportFrame, Frame } from '../math/ParallelTransportFrame';
import { RibbonGeometry, RibbonOptions } from './RibbonGeometry';
import { TubeGeometry, TubeOptions } from './TubeGeometry';

export type CurlType = 'coil' | 'curl' | 'wave' | 'zigzag';

export interface CurledStrokeOptions {
  type?: CurlType;
  frequency?: number;
  radiusRatio?: number;
  useTube?: boolean;
  baseWidth?: number;
  minWidth?: number;
  maxWidth?: number;
  taperStart?: boolean;
  taperEnd?: boolean;
  taperLength?: number;
  color?: THREE.Color;
  alpha?: number;
  normal?: THREE.Vector3;
}

export class CurledStrokeGeometry {
  /**
   * Builds curly, coiled, undulating, or crimped hair/strand stroke geometry in 3D.
   */
  public static build(
    points: CurvePoint[],
    options: CurledStrokeOptions = {}
  ): THREE.BufferGeometry {
    if (points.length < 2) return new THREE.BufferGeometry();

    const type = options.type ?? 'coil';
    const baseWidth = options.baseWidth ?? 0.03;
    const radiusRatio = options.radiusRatio ?? (type === 'coil' ? 1.5 : type === 'curl' ? 2.5 : 1.8);
    const useTube = options.useTube ?? false;

    // Estimate curve length to determine frequency
    let totalDist = 0;
    for (let i = 0; i < points.length - 1; i++) {
      totalDist += points[i].position.distanceTo(points[i + 1].position);
    }

    const defaultFreq = type === 'coil' ? Math.max(8, Math.round(totalDist * 80))
                      : type === 'curl' ? Math.max(4, Math.round(totalDist * 40))
                      : type === 'zigzag' ? Math.max(6, Math.round(totalDist * 60))
                      : Math.max(5, Math.round(totalDist * 50));

    const freq = options.frequency ?? defaultFreq;

    const positionsVec = points.map(p => p.position);
    const frames: Frame[] = ParallelTransportFrame.computeFrames(
      positionsVec,
      options.normal
    );

    // Generate higher-density modulated points along the curly path
    const sampleMultiplier = 6;
    const targetCount = Math.max(points.length * sampleMultiplier, Math.round(freq * 12));
    const modulatedPoints: CurvePoint[] = [];

    for (let s = 0; s < targetCount; s++) {
      const u = s / (targetCount - 1);
      const originalIdxFloat = u * (points.length - 1);
      const idx0 = Math.floor(originalIdxFloat);
      const idx1 = Math.min(idx0 + 1, points.length - 1);
      const tSub = originalIdxFloat - idx0;

      // Linear interpolation of position & frame
      const pos0 = points[idx0].position;
      const pos1 = points[idx1].position;
      const spinePos = new THREE.Vector3().lerpVectors(pos0, pos1, tSub);

      const frame0 = frames[idx0];
      const frame1 = frames[idx1];
      const binormal = new THREE.Vector3().lerpVectors(frame0.binormal, frame1.binormal, tSub).normalize();
      const normal = new THREE.Vector3().lerpVectors(frame0.normal, frame1.normal, tSub).normalize();

      // Interpolate pressure & tilt
      const pressure0 = points[idx0].pressure > 0 ? points[idx0].pressure : 0.5;
      const pressure1 = points[idx1].pressure > 0 ? points[idx1].pressure : 0.5;
      const pMod = THREE.MathUtils.lerp(pressure0, pressure1, tSub);

      const time0 = points[idx0].time;
      const time1 = points[idx1].time;
      const interpTime = THREE.MathUtils.lerp(time0, time1, tSub);

      // Taper envelope for the coil radius
      let radius = baseWidth * radiusRatio * (0.6 + 0.4 * pMod);
      const taperRatio = options.taperLength ?? 0.1;
      if ((options.taperStart ?? true) && u < taperRatio) {
        radius *= (u / taperRatio);
      }
      if ((options.taperEnd ?? true) && u > 1.0 - taperRatio) {
        radius *= ((1.0 - u) / taperRatio);
      }

      const theta = u * freq * Math.PI * 2;
      let offsetX = 0;
      let offsetY = 0;

      if (type === 'coil' || type === 'curl') {
        offsetX = Math.cos(theta) * radius;
        offsetY = Math.sin(theta) * radius;
      } else if (type === 'zigzag') {
        // Triangle wave
        const tri = Math.abs(((u * freq * 2) % 2) - 1) * 2 - 1;
        offsetX = tri * radius;
        offsetY = 0;
      } else {
        // Wave
        offsetX = Math.sin(theta) * radius;
        offsetY = 0;
      }

      const finalPos = spinePos
        .clone()
        .add(binormal.clone().multiplyScalar(offsetX))
        .add(normal.clone().multiplyScalar(offsetY));

      modulatedPoints.push({
        position: finalPos,
        pressure: pMod,
        tilt: points[idx0].tilt.clone(),
        time: interpTime
      });
    }

    if (useTube) {
      const tubeOpts: TubeOptions = {
        baseRadius: baseWidth * 0.35,
        minRadius: baseWidth * 0.1,
        maxRadius: baseWidth * 0.8,
        radialSegments: 6,
        taperStart: options.taperStart ?? true,
        taperEnd: options.taperEnd ?? true,
        color: options.color,
        alpha: options.alpha,
        normal: options.normal
      };
      return TubeGeometry.build(modulatedPoints, tubeOpts);
    } else {
      const ribbonOpts: RibbonOptions = {
        baseWidth: baseWidth * 0.6,
        minWidth: baseWidth * 0.15,
        maxWidth: baseWidth * 1.2,
        taperStart: options.taperStart ?? true,
        taperEnd: options.taperEnd ?? true,
        color: options.color,
        alpha: options.alpha,
        normal: options.normal
      };
      return RibbonGeometry.build(modulatedPoints, ribbonOpts);
    }
  }
}
