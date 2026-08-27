import * as THREE from 'three';
import { attribute, uv, float, abs, pow } from 'three/tsl';
import { patternColorNode, patternAlphaNode, ExtendedPatternType } from './tslPatterns';
import { createAnimatedStrokeMaterial, AnimatedMaterialType } from './tslAnimatedMaterials';

export type MaterialType =
  | 'shadeless'
  | 'shaded'
  | 'cel_shaded'
  | 'glow'
  | 'cutout'
  | 'halftone'
  | 'hatch'
  | 'crosshatch'
  | 'stipple'
  | 'terrazzo'
  | 'pencil'
  | 'marker'
  | 'acrylic'
  | 'watercolor'
  | 'rainbow'
  | 'stardust'
  | 'foliage_leaf'
  | 'foliage_fir'
  | 'waterfall'
  | 'caustic'
  | 'foam'
  | 'ripple';

export interface MaterialOptions {
  type: MaterialType;
  opacity?: number;
  glowIntensity?: number;
  patternScale?: number;
  bgColor?: THREE.Color;
}

/**
 * WEBGPU-MIGRATION: stroke materials are TSL NODE materials (required by
 * WebGPURenderer). Every stroke geometry carries a vec4 `color` vertex attribute
 * (rgb + per-vertex alpha), so all materials read `attribute('color', 'vec4')`
 * and fold in the brush opacity via `opacityNode`.
 */
export class CustomShaderMaterials {
  public static createMaterial(options: MaterialOptions): THREE.Material {
    const opacity = options.opacity ?? 1.0;
    // vec4 per-vertex color (rgb + alpha) baked into the stroke geometry.
    const vColor = attribute('color', 'vec4');
    const vRgb = vColor.xyz;
    const vAlpha = vColor.w.mul(opacity);

    switch (options.type) {
      case 'shaded': {
        // Lit by the scene's directional + ambient lights
        const m = new THREE.MeshStandardNodeMaterial();
        m.colorNode = vRgb;
        m.opacityNode = vAlpha;
        m.roughness = 0.65;
        m.metalness = 0.0;
        m.transparent = true;
        m.depthWrite = true;
        m.depthTest = true;
        m.alphaTest = 0.005;
        m.side = THREE.DoubleSide;
        return m;
      }

      case 'cel_shaded': {
        // Banded toon shading driven by scene lights
        const m = new THREE.MeshToonNodeMaterial();
        m.colorNode = vRgb;
        m.opacityNode = vAlpha;
        m.transparent = true;
        m.depthWrite = true;
        m.depthTest = true;
        m.alphaTest = 0.005;
        m.side = THREE.DoubleSide;
        return m;
      }

      case 'glow': {
        // Unlit, brightened emissive-style fill with edge brightening
        const intensity = options.glowIntensity ?? 2.5;
        const edge = float(1.0).add(pow(abs(uv().x.sub(0.5)).mul(2.0), 2.0).mul(0.5));
        const m = new THREE.MeshBasicNodeMaterial();
        m.colorNode = vRgb.mul(intensity).mul(edge);
        m.opacityNode = vAlpha;
        m.transparent = true;
        m.depthWrite = true;
        m.depthTest = true;
        m.alphaTest = 0.005;
        m.side = THREE.DoubleSide;
        return m;
      }

      case 'cutout': {
        // Opaque fill in the background color with depth write
        const m = new THREE.MeshBasicNodeMaterial();
        m.color = (options.bgColor ?? new THREE.Color(0xdcd7ec)).clone();
        m.transparent = false;
        m.depthWrite = true;
        m.depthTest = true;
        m.side = THREE.DoubleSide;
        return m;
      }

      case 'pencil':
      case 'marker':
      case 'acrylic':
      case 'watercolor':
      case 'rainbow':
      case 'stardust':
      case 'foliage_leaf':
      case 'foliage_fir':
      case 'halftone':
      case 'hatch':
      case 'crosshatch':
      case 'stipple':
      case 'terrazzo': {
        const m = new THREE.MeshBasicNodeMaterial();
        m.colorNode = patternColorNode(options.type as ExtendedPatternType, options.patternScale ?? 25.0, vRgb);
        m.opacityNode = patternAlphaNode(options.type as ExtendedPatternType, vAlpha);
        m.transparent = true;
        m.depthWrite = true;
        m.depthTest = true;
        m.alphaTest = 0.005;
        m.side = THREE.DoubleSide;
        return m;
      }

      case 'waterfall':
      case 'caustic':
      case 'foam':
      case 'ripple': {
        const { material } = createAnimatedStrokeMaterial(options.type as AnimatedMaterialType, vRgb);
        material.opacityNode = vAlpha;
        material.transparent = true;
        material.depthWrite = true;
        material.depthTest = true;
        material.alphaTest = 0.005;
        return material;
      }

      case 'shadeless':
      default: {
        const m = new THREE.MeshBasicNodeMaterial();
        m.colorNode = vRgb;
        m.opacityNode = vAlpha;
        m.transparent = true;
        m.depthWrite = true;
        m.depthTest = true;
        m.alphaTest = 0.005;
        m.side = THREE.DoubleSide;
        return m;
      }
    }
  }
}
