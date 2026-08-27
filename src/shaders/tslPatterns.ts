import {
  uv,
  vec2,
  vec3,
  sin,
  cos,
  fract,
  length,
  smoothstep,
  mix,
  min,
  max,
  abs,
  pow,
  mx_worley_noise_float,
  float
} from 'three/tsl';
import { ProceduralPatternType } from './ProceduralPatternsShader';

export type ExtendedPatternType =
  | ProceduralPatternType
  | 'pencil'
  | 'marker'
  | 'acrylic'
  | 'watercolor'
  | 'rainbow'
  | 'stardust'
  | 'foliage_leaf'
  | 'foliage_fir';

const TWO_PI = 6.28318530718;
const ANGLE = 0.785398; // 45 degrees
const CONTRAST = 1.5;
const INTENSITY = 1.0;

/**
 * Procedural colorNode and alphaNode graph builder using Three.js TSL nodes.
 */
export function patternColorNode(
  type: ExtendedPatternType,
  scale: number,
  vRgb: any
): any {
  const cosA = Math.cos(ANGLE);
  const sinA = Math.sin(ANGLE);

  const uvScaled = uv().mul(scale);
  const x = uvScaled.x;
  const y = uvScaled.y;

  // Rotate by ANGLE
  const rx = x.mul(cosA).sub(y.mul(sinA));
  const ry = x.mul(sinA).add(y.mul(cosA));
  const uvRot = vec2(rx, ry);

  switch (type) {
    case 'pencil': {
      // Graphite paper noise modulation
      const noise = mx_worley_noise_float(uv().mul(60.0), 1.0);
      const grain = smoothstep(0.1, 0.7, noise);
      return mix(vRgb.mul(0.3), vRgb.mul(1.1), grain);
    }

    case 'marker': {
      // Copic marker with edge bleed
      const edge = pow(abs(uv().x.sub(0.5)).mul(2.0), 3.0);
      const edgeDarken = mix(vRgb, vRgb.mul(0.7), edge);
      return edgeDarken;
    }

    case 'acrylic': {
      // Paint bristle texture along stroke length
      const streak = sin(uv().x.mul(30.0).mul(TWO_PI));
      const body = smoothstep(-0.8, 0.8, streak);
      return mix(vRgb.mul(0.85), vRgb.mul(1.15), body);
    }

    case 'watercolor': {
      // Wet edge wash with soft diffusion
      const edgeDist = abs(uv().x.sub(0.5)).mul(2.0);
      const puddle = smoothstep(0.4, 0.95, edgeDist);
      return mix(vRgb.mul(1.1), vRgb.mul(0.75), puddle);
    }

    case 'rainbow': {
      // Continuous spectrum cycling along stroke length (uv().y)
      const phase = uv().y.mul(3.0).mul(TWO_PI);
      const r = sin(phase).mul(0.5).add(0.5);
      const g = sin(phase.add(2.094)).mul(0.5).add(0.5);
      const b = sin(phase.add(4.188)).mul(0.5).add(0.5);
      return vec3(r, g, b);
    }

    case 'stardust': {
      // Glowing sparkle center with bright core
      const centered = uv().sub(0.5).mul(2.0);
      const dist = length(centered);
      const sparkle = pow(max(float(0.0), float(1.0).sub(dist)), 2.0);
      return vRgb.mul(sparkle.mul(3.0).add(0.5));
    }

    case 'foliage_leaf': {
      // Leaf vein and color variation
      const vein = abs(uv().x.sub(0.5)).mul(2.0);
      const leafGrad = mix(vRgb.mul(1.15), vRgb.mul(0.7), vein);
      return leafGrad;
    }

    case 'foliage_fir': {
      // Needle tip highlight
      const needleTip = uv().y;
      return mix(vRgb.mul(0.7), vRgb.mul(1.2), needleTip);
    }

    case 'hatch': {
      const line = sin(ry.mul(TWO_PI));
      const patternVal = smoothstep(0.0, 0.1 * CONTRAST, line.mul(INTENSITY));
      return mix(vRgb.mul(0.2), vRgb, patternVal);
    }

    case 'crosshatch': {
      const line1 = sin(ry.mul(TWO_PI));
      const r2y = x.mul(-sinA).add(y.mul(cosA));
      const line2 = sin(r2y.mul(TWO_PI));
      const patternVal = min(
        smoothstep(0.0, 0.1 * CONTRAST, line1.mul(INTENSITY)),
        smoothstep(0.0, 0.1 * CONTRAST, line2.mul(INTENSITY))
      );
      return mix(vRgb.mul(0.2), vRgb, patternVal);
    }

    case 'stipple': {
      const d = mx_worley_noise_float(uvRot, 1.0);
      const patternVal = smoothstep(0.15 * INTENSITY, 0.05, d);
      return mix(vRgb.mul(0.2), vRgb, patternVal);
    }

    case 'terrazzo': {
      const v = mx_worley_noise_float(uvRot.mul(0.5), 1.0);
      const patternVal = smoothstep(0.05, 0.15, v);
      return mix(vRgb.mul(0.2), vRgb, patternVal);
    }

    case 'halftone':
    default: {
      const grid = fract(uvRot).sub(0.5);
      const dist = length(grid);
      const radius = 0.35 * INTENSITY;
      const patternVal = smoothstep(radius, radius - 0.05 * CONTRAST, dist);
      return mix(vRgb.mul(0.2), vRgb, patternVal);
    }
  }
}

/**
 * Procedural alpha mask for shapes like particles, leaves, watercolor bleeds, etc.
 */
export function patternAlphaNode(type: ExtendedPatternType, baseAlpha: any): any {
  switch (type) {
    case 'stardust': {
      const centered = uv().sub(0.5).mul(2.0);
      const d = length(centered);
      const mask = smoothstep(1.0, 0.0, d);
      return baseAlpha.mul(mask);
    }
    case 'foliage_leaf': {
      const centered = uv().sub(0.5).mul(2.0);
      const d = length(centered);
      const leafMask = smoothstep(0.95, 0.75, d);
      return baseAlpha.mul(leafMask);
    }
    case 'watercolor': {
      const edge = abs(uv().x.sub(0.5)).mul(2.0);
      const softEdge = smoothstep(1.0, 0.7, edge);
      return baseAlpha.mul(softEdge);
    }
    default:
      return baseAlpha;
  }
}
