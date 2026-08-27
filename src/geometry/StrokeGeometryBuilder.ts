import * as THREE from 'three';
import { CurvePoint } from '../math/CurveMath';
import { RibbonGeometry, RibbonOptions } from './RibbonGeometry';
import { TubeGeometry, TubeOptions } from './TubeGeometry';
import { BristleGeometry, BristleOptions } from './BristleGeometry';
import { CurledStrokeGeometry, CurledStrokeOptions } from './CurledStrokeGeometry';
import { ScatterParticleGeometry, ScatterParticleOptions } from './ScatterParticleGeometry';

export type StrokeProfile =
  | 'ribbon'
  | 'tube'
  | 'flat'
  | 'chisel'
  | 'bristle'
  | 'hair_coil'
  | 'hair_wave'
  | 'hair_zigzag'
  | 'foliage'
  | 'particles';

export interface StrokeBuildParams {
  profile: StrokeProfile;
  size: number;
  color: THREE.Color;
  alpha: number;
  taperStart?: boolean;
  taperEnd?: boolean;
  normal?: THREE.Vector3;
  scatterType?: import('./ScatterParticleGeometry').ScatterType;
}

export class StrokeGeometryBuilder {
  /**
   * Builds the appropriate BufferGeometry based on stroke profile.
   */
  public static buildGeometry(
    points: CurvePoint[],
    params: StrokeBuildParams
  ): THREE.BufferGeometry {
    if (points.length < 2) return new THREE.BufferGeometry();

    switch (params.profile) {
      case 'tube': {
        const tubeOpts: TubeOptions = {
          baseRadius: params.size * 0.5,
          minRadius: params.size * 0.1,
          maxRadius: params.size * 1.5,
          radialSegments: 8,
          taperStart: params.taperStart ?? true,
          taperEnd: params.taperEnd ?? true,
          color: params.color,
          alpha: params.alpha,
          normal: params.normal
        };
        return TubeGeometry.build(points, tubeOpts);
      }

      case 'chisel': {
        // Angled chisel stroke with higher max width ratio and fixed orientation aspect
        const chiselOpts: RibbonOptions = {
          baseWidth: params.size * 1.2,
          minWidth: params.size * 0.15,
          maxWidth: params.size * 2.2,
          taperStart: params.taperStart ?? true,
          taperEnd: params.taperEnd ?? true,
          color: params.color,
          alpha: params.alpha,
          normal: params.normal
        };
        return RibbonGeometry.build(points, chiselOpts);
      }

      case 'bristle': {
        const bristleOpts: BristleOptions = {
          numStrands: 5,
          baseWidth: params.size * 1.2,
          minWidth: params.size * 0.25,
          maxWidth: params.size * 2.2,
          strandWidthRatio: 0.28,
          jitter: 0.08,
          taperStart: params.taperStart ?? true,
          taperEnd: params.taperEnd ?? true,
          color: params.color,
          alpha: params.alpha,
          normal: params.normal
        };
        return BristleGeometry.build(points, bristleOpts);
      }

      case 'hair_coil': {
        const coilOpts: CurledStrokeOptions = {
          type: 'coil',
          baseWidth: params.size,
          useTube: false,
          taperStart: params.taperStart ?? true,
          taperEnd: params.taperEnd ?? true,
          color: params.color,
          alpha: params.alpha,
          normal: params.normal
        };
        return CurledStrokeGeometry.build(points, coilOpts);
      }

      case 'hair_wave': {
        const waveOpts: CurledStrokeOptions = {
          type: 'wave',
          baseWidth: params.size,
          useTube: false,
          taperStart: params.taperStart ?? true,
          taperEnd: params.taperEnd ?? true,
          color: params.color,
          alpha: params.alpha,
          normal: params.normal
        };
        return CurledStrokeGeometry.build(points, waveOpts);
      }

      case 'hair_zigzag': {
        const zigOpts: CurledStrokeOptions = {
          type: 'zigzag',
          baseWidth: params.size,
          useTube: false,
          taperStart: params.taperStart ?? true,
          taperEnd: params.taperEnd ?? true,
          color: params.color,
          alpha: params.alpha,
          normal: params.normal
        };
        return CurledStrokeGeometry.build(points, zigOpts);
      }

      case 'foliage': {
        const foliageOpts: ScatterParticleOptions = {
          scatterType: params.scatterType ?? 'foliage_maple',
          baseSize: params.size * 1.5,
          minSize: params.size * 0.5,
          maxSize: params.size * 2.2,
          spacing: 0.45,
          jitter: 0.8,
          taperStart: params.taperStart ?? true,
          taperEnd: params.taperEnd ?? true,
          color: params.color,
          alpha: params.alpha,
          normal: params.normal
        };
        return ScatterParticleGeometry.build(points, foliageOpts);
      }

      case 'particles': {
        const partOpts: ScatterParticleOptions = {
          scatterType: 'particles',
          baseSize: params.size * 1.0,
          minSize: params.size * 0.3,
          maxSize: params.size * 1.8,
          spacing: 0.4,
          jitter: 1.0,
          taperStart: params.taperStart ?? true,
          taperEnd: params.taperEnd ?? true,
          color: params.color,
          alpha: params.alpha,
          normal: params.normal
        };
        return ScatterParticleGeometry.build(points, partOpts);
      }

      case 'ribbon':
      case 'flat':
      default: {
        const ribbonOpts: RibbonOptions = {
          baseWidth: params.size,
          minWidth: params.size * 0.2,
          maxWidth: params.size * 2.0,
          taperStart: params.taperStart ?? true,
          taperEnd: params.taperEnd ?? true,
          color: params.color,
          alpha: params.alpha,
          normal: params.normal
        };
        return RibbonGeometry.build(points, ribbonOpts);
      }
    }
  }
}
