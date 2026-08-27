// @ts-nocheck
import * as THREE from 'three';
import { MeshBasicNodeMaterial } from 'three/webgpu';
import {
  Fn, vec2, vec3, vec4, uniform, uv, timerGlobal, attribute,
  dot, clamp, mix, pow, smoothstep, float, sin, cos, fract, abs, floor, step, max, min, length
} from 'three/tsl';

const hash2d = Fn(([p]) => {
  return fract(sin(dot(p, vec2(127.1, 311.7))).mul(43758.5453123));
});

const noise2d = Fn(([p]) => {
  const i = floor(p);
  const f = fract(p);
  const u = f.mul(f).mul(float(3.0).sub(f.mul(2.0)));
  return mix(
    mix(hash2d(i.add(vec2(0.0, 0.0))), hash2d(i.add(vec2(1.0, 0.0))), u.x),
    mix(hash2d(i.add(vec2(0.0, 1.0))), hash2d(i.add(vec2(1.0, 1.0))), u.x),
    u.y
  );
});

const fbm2 = Fn(([p]) => {
  let v = float(0.0).toVar();
  let amp = float(0.5).toVar();
  let coord = vec2(p).toVar();
  for (let i = 0; i < 3; i++) {
    v.addAssign(noise2d(coord).mul(amp));
    coord.mulAssign(2.03);
    amp.mulAssign(0.5);
  }
  return v;
});

export type AnimatedMaterialType =
  | 'waterfall'
  | 'caustic'
  | 'foam'
  | 'ripple'
  | 'rainbow_scroll'
  | 'sparkle'
  | 'lava'
  | 'galaxy';

export const ANIMATED_MATERIAL_PRESETS: Array<{
  name: string;
  type: AnimatedMaterialType;
  color: number;
  speed: number;
  scale: number;
}> = [
  { name: 'Waterfall', type: 'waterfall',      color: 0x1d9fd6, speed: 1.0, scale: 4.0 },
  { name: 'Caustic',   type: 'caustic',        color: 0x1ca8b8, speed: 0.8, scale: 3.0 },
  { name: 'Foam',      type: 'foam',           color: 0x2488aa, speed: 0.6, scale: 5.0 },
  { name: 'Ripple',    type: 'ripple',         color: 0x3078a0, speed: 0.7, scale: 4.0 },
  { name: 'Rainbow',   type: 'rainbow_scroll', color: 0xffffff, speed: 1.0, scale: 3.0 },
  { name: 'Sparkle',   type: 'sparkle',        color: 0xffd700, speed: 1.2, scale: 4.0 },
  { name: 'Lava',      type: 'lava',           color: 0xff4500, speed: 0.5, scale: 3.0 },
  { name: 'Galaxy',    type: 'galaxy',         color: 0x6a0dad, speed: 0.3, scale: 4.0 },
];

export function createAnimatedStrokeMaterial(
  type: AnimatedMaterialType,
  baseColor: THREE.Color | any = new THREE.Color(0x1d9fd6),
  strokeAspect: number = 10.0
): { material: MeshBasicNodeMaterial; uniforms: { uSpeed: any; uScale: any; uColor: any; uAspect: any } } {
  const preset = ANIMATED_MATERIAL_PRESETS.find(p => p.type === type);
  const defaultSpeed = preset ? preset.speed : 1.0;
  const defaultScale = preset ? preset.scale : 4.0;

  const uSpeed = uniform(defaultSpeed);
  const uScale = uniform(defaultScale);
  const uAspect = uniform(strokeAspect);
  // Accept either a THREE.Color (creates a uniform) or a TSL node (used directly)
  const uColor = (baseColor && typeof baseColor.isColor === 'boolean') ? uniform(baseColor) : baseColor;
  const time = timerGlobal();

  const material = new MeshBasicNodeMaterial({ side: THREE.DoubleSide });

  if (type === 'waterfall') {
    material.colorNode = Fn(() => {
      const vUv = uv();
      const t = time.mul(uSpeed);
      const coord = vec2(vUv.x.mul(uScale), vUv.y.mul(uAspect).mul(uScale).add(t.mul(0.5)));

      const n1 = noise2d(coord.mul(3.0));
      const n2 = noise2d(coord.mul(6.0).add(vec2(0.0, t.mul(0.3))));
      const n3 = noise2d(coord.mul(12.0).add(vec2(0.0, t.mul(0.8))));

      const flow = float(1.0).sub(vUv.y).mul(n1.mul(0.6).add(n2.mul(0.3)).add(n3.mul(0.1)));

      const shadow1 = smoothstep(0.3, 0.35, flow);
      const shadow2 = smoothstep(0.5, 0.55, flow);
      const highlight = smoothstep(0.7, 0.75, n3);

      const dark = uColor.mul(0.4);
      const mid = uColor.mul(0.7);
      let col = mix(dark, mid, shadow1);
      col = mix(col, uColor, shadow2);
      col = mix(col, vec3(1.0, 1.0, 1.0), highlight.mul(0.3));

      return vec4(col, 1.0);
    })();
  } else if (type === 'caustic') {
    material.colorNode = Fn(() => {
      const vUv = uv();
      const t = time.mul(uSpeed);
      const coord = vec2(vUv.x, vUv.y.mul(uAspect)).mul(uScale).mul(2.0).add(vec2(t.mul(0.5), t.mul(0.25)));

      const voronoiSmooth = Fn(([p, w, offset]) => {
        const n = floor(p);
        const f = fract(p);
        let m = float(8.0).toVar();
        for (let j = -2; j <= 2; j++) {
          for (let i = -2; i <= 2; i++) {
            const g = vec2(float(i), float(j));
            const o = hash2d(n.add(g));
            const animO = offset.add(sin(t.add(o.mul(6.2831)).add(p)).mul(0.3));
            const d = length(g.sub(f).add(animO));
            const h = smoothstep(-1.0, 1.0, m.sub(d).div(w));
            m.assign(mix(m, d, h).sub(h.mul(float(1.0).sub(h)).mul(w).div(float(1.0).add(w.mul(3.0)))));
          }
        }
        return m;
      });

      const vNoise = voronoiSmooth(coord, float(0.001), float(0.5));
      const sNoise = voronoiSmooth(coord, float(0.4), float(0.5));
      const fV = smoothstep(0.0, 0.01, vNoise.sub(sNoise));

      const vNoise2 = voronoiSmooth(coord, float(0.001), float(0.3));
      const sNoise2 = voronoiSmooth(coord, float(0.4), float(0.3));
      const offV = smoothstep(0.0, 0.01, vNoise2.sub(sNoise2));

      const dark = uColor.mul(0.8);
      let col = mix(uColor, dark, fV);
      col = mix(col, vec3(1.0, 1.0, 1.0), float(1.0).sub(offV).mul(0.4));

      return vec4(col, 1.0);
    })();
  } else if (type === 'foam') {
    material.colorNode = Fn(() => {
      const vUv = uv();
      const t = time.mul(uSpeed);
      const coord = vec2(vUv.x, vUv.y.mul(uAspect)).mul(uScale);

      const n1 = fbm2(coord.sub(vec2(0.0, t.mul(0.3))));
      const n2 = fbm2(coord.add(vec2(0.0, t.mul(0.3))));
      const c = n1.mul(n2);

      const limit = float(0.28);
      const border = float(0.08);
      const foamMask = step(limit.sub(border), c).sub(step(limit, c));

      const dark = uColor.mul(0.5);
      let col = mix(dark, uColor, smoothstep(0.15, 0.3, c));
      col = mix(col, vec3(1.0, 1.0, 1.0), foamMask.mul(0.6));

      return vec4(col, 1.0);
    })();
  } else if (type === 'ripple') {
    material.colorNode = Fn(() => {
      const vUv = uv();
      const t = time.mul(uSpeed);
      const coord = vec2(vUv.x, vUv.y.mul(uAspect)).mul(uScale);

      const n1 = fbm2(coord.mul(2.0).add(vec2(0.0, t.mul(0.5))));
      const n2 = noise2d(coord.add(vec2(0.0, t.mul(1.2))));
      const ripple = abs(n1.sub(n2.mul(0.8)));

      const waveCrest = smoothstep(0.0, 0.05, vUv.y.sub(sin(vUv.x.mul(10.0)).div(15.0)).sub(n1.mul(0.5)));

      const dark = uColor.mul(0.5);
      let col = mix(dark, uColor, smoothstep(0.1, 0.4, ripple));
      col = mix(col, vec3(1.0, 1.0, 1.0), float(1.0).sub(waveCrest).mul(0.35));

      return vec4(col, 1.0);
    })();
  } else if (type === 'rainbow_scroll') {
    material.colorNode = Fn(() => {
      const vUv = uv();
      const t = time.mul(uSpeed);
      const coord = vec2(vUv.x, vUv.y.mul(uAspect)).mul(uScale);

      const phase = coord.y.add(t.mul(0.4));
      const r = sin(phase).mul(0.5).add(0.5);
      const g = sin(phase.add(2.094)).mul(0.5).add(0.5);
      const b = sin(phase.add(4.189)).mul(0.5).add(0.5);
      const shimmer = noise2d(coord.mul(8.0).add(vec2(t.mul(0.6), 0.0)));
      const col = vec3(r, g, b).mul(float(0.85).add(shimmer.mul(0.15)));

      return vec4(col, 1.0);
    })();
  } else if (type === 'sparkle') {
    material.colorNode = Fn(() => {
      const vUv = uv();
      const t = time.mul(uSpeed);
      const coord = vec2(vUv.x, vUv.y.mul(uAspect)).mul(uScale).mul(3.0);

      const cellId = floor(coord);
      const cellUv = fract(coord).sub(0.5);
      const rnd = hash2d(cellId);
      const twinklePhase = t.mul(3.0).add(rnd.mul(6.2831));
      const brightness = pow(max(sin(twinklePhase), float(0.0)), float(8.0));
      const dist = length(cellUv);
      const star = smoothstep(0.3, 0.0, dist).mul(brightness);
      const ray1 = smoothstep(0.02, 0.0, abs(cellUv.x)).mul(smoothstep(0.4, 0.0, abs(cellUv.y)));
      const ray2 = smoothstep(0.02, 0.0, abs(cellUv.y)).mul(smoothstep(0.4, 0.0, abs(cellUv.x)));
      const rays = ray1.add(ray2).mul(brightness).mul(0.5);
      const col = mix(uColor, vec3(1.0, 1.0, 1.0), star.add(rays));

      return vec4(col, 1.0);
    })();
  } else if (type === 'lava') {
    material.colorNode = Fn(() => {
      const vUv = uv();
      const t = time.mul(uSpeed);
      const coord = vec2(vUv.x, vUv.y.mul(uAspect)).mul(uScale);

      const n1 = fbm2(coord.mul(2.0).add(vec2(t.mul(0.15), t.mul(0.1))));
      const n2 = fbm2(coord.mul(3.0).sub(vec2(t.mul(0.1), t.mul(0.2))));
      const blend = n1.mul(n2).mul(4.0);
      const hot = vec3(1.0, 0.9, 0.2);
      const warm = vec3(1.0, 0.35, 0.05);
      const dark = vec3(0.15, 0.02, 0.0);
      let col = mix(dark, warm, smoothstep(0.15, 0.4, blend));
      col = mix(col, hot, smoothstep(0.5, 0.7, blend));
      const glow = smoothstep(0.6, 0.8, blend).mul(0.4);
      col = col.add(vec3(glow, glow.mul(0.5), 0.0));

      return vec4(col, 1.0);
    })();
  } else if (type === 'galaxy') {
    material.colorNode = Fn(() => {
      const vUv = uv();
      const t = time.mul(uSpeed);
      const coord = vec2(vUv.x, vUv.y.mul(uAspect)).mul(uScale);

      const neb1 = fbm2(coord.mul(1.5).add(vec2(t.mul(0.05), t.mul(0.08))));
      const neb2 = fbm2(coord.mul(2.5).sub(vec2(t.mul(0.06), t.mul(0.04))));
      const nebula = neb1.add(neb2).mul(0.5);

      const deepSpace = uColor.mul(0.3);
      const nebulaMid = vec3(0.1, 0.4, 0.9);
      const nebulaHigh = vec3(0.9, 0.2, 0.6);

      let col = mix(deepSpace, nebulaMid, smoothstep(0.2, 0.6, nebula));
      col = mix(col, nebulaHigh, smoothstep(0.6, 0.85, nebula));

      const starCoord = coord.mul(6.0);
      const cellId = floor(starCoord);
      const cellUv = fract(starCoord).sub(0.5);
      const rnd = hash2d(cellId);
      const isStar = step(0.85, rnd);
      const starPhase = t.mul(2.0).add(rnd.mul(6.2831));
      const starTwinkle = pow(max(sin(starPhase), float(0.0)), float(16.0));
      const starDist = length(cellUv);
      const starPoint = smoothstep(0.2, 0.0, starDist).mul(starTwinkle).mul(isStar);

      col = col.add(vec3(starPoint, starPoint, starPoint));

      return vec4(col, 1.0);
    })();
  }

  return { material, uniforms: { uSpeed, uScale, uColor, uAspect } };
}
