import * as THREE from 'three';

export type ProceduralPatternType = 'halftone' | 'hatch' | 'crosshatch' | 'stipple' | 'terrazzo';

export const ProceduralPatternsShader = {
  uniforms: {
    uPatternType: { value: 0 }, // 0: Halftone, 1: Hatch, 2: Crosshatch, 3: Stipple, 4: Terrazzo
    uPatternScale: { value: 25.0 },
    uPatternAngle: { value: 0.785398 }, // 45 degrees
    uPatternContrast: { value: 1.5 },
    uPatternIntensity: { value: 1.0 },
    uOpacity: { value: 1.0 }
  },
  vertexShader: /* glsl */ `
    attribute vec4 color;
    varying vec4 vColor;
    varying vec2 vUv;
    varying vec3 vWorldPosition;

    void main() {
      vColor = color;
      vUv = uv;
      vec4 worldPos = modelMatrix * vec4(position, 1.0);
      vWorldPosition = worldPos.xyz;
      gl_Position = projectionMatrix * viewMatrix * worldPos;
    }
  `,
  fragmentShader: /* glsl */ `
    uniform int uPatternType;
    uniform float uPatternScale;
    uniform float uPatternAngle;
    uniform float uPatternContrast;
    uniform float uPatternIntensity;
    uniform float uOpacity;

    varying vec4 vColor;
    varying vec2 vUv;
    varying vec3 vWorldPosition;

    // Hash function for stippling and terrazzo
    vec2 hash2(vec2 p) {
      return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
    }

    // Voronoi distance for Terrazzo
    float voronoi(vec2 p) {
      vec2 n = floor(p);
      vec2 f = fract(p);
      float md = 8.0;
      for (int j = -1; j <= 1; j++) {
        for (int i = -1; i <= 1; i++) {
          vec2 g = vec2(float(i), float(j));
          vec2 o = hash2(n + g);
          vec2 r = g + o - f;
          float d = dot(r, r);
          if (d < md) md = d;
        }
      }
      return sqrt(md);
    }

    void main() {
      // Rotate UV coordinates by angle
      float cosA = cos(uPatternAngle);
      float sinA = sin(uPatternAngle);
      mat2 rot = mat2(cosA, -sinA, sinA, cosA);
      vec2 uvRot = rot * (vUv * uPatternScale);

      float patternVal = 1.0;

      if (uPatternType == 0) {
        // Halftone dots
        vec2 grid = fract(uvRot) - 0.5;
        float dist = length(grid);
        float radius = 0.35 * uPatternIntensity;
        patternVal = smoothstep(radius, radius - 0.05 * uPatternContrast, dist);
      } else if (uPatternType == 1) {
        // Hatch lines
        float line = sin(uvRot.y * 6.28318);
        patternVal = smoothstep(0.0, 0.1 * uPatternContrast, line * uPatternIntensity);
      } else if (uPatternType == 2) {
        // Cross-hatch
        float line1 = sin(uvRot.y * 6.28318);
        vec2 uvRot2 = mat2(cosA, sinA, -sinA, cosA) * (vUv * uPatternScale);
        float line2 = sin(uvRot2.y * 6.28318);
        patternVal = min(
          smoothstep(0.0, 0.1 * uPatternContrast, line1 * uPatternIntensity),
          smoothstep(0.0, 0.1 * uPatternContrast, line2 * uPatternIntensity)
        );
      } else if (uPatternType == 3) {
        // Stipple dots
        vec2 cell = floor(uvRot);
        vec2 h = hash2(cell);
        vec2 d = fract(uvRot) - h;
        float dist = length(d);
        patternVal = smoothstep(0.15 * uPatternIntensity, 0.05, dist);
      } else if (uPatternType == 4) {
        // Terrazzo Voronoi
        float v = voronoi(uvRot * 0.5);
        patternVal = smoothstep(0.05, 0.15, v);
      }

      vec3 finalColor = mix(vColor.rgb * 0.2, vColor.rgb, patternVal);
      float alpha = vColor.a * uOpacity;

      if (alpha < 0.001) discard;
      gl_FragColor = vec4(finalColor, alpha);
    }
  `
};

export function createProceduralPatternMaterial(
  patternType: ProceduralPatternType = 'halftone',
  scale: number = 25.0,
  opacity: number = 1.0
): THREE.ShaderMaterial {
  const typeMap: Record<ProceduralPatternType, number> = {
    halftone: 0,
    hatch: 1,
    crosshatch: 2,
    stipple: 3,
    terrazzo: 4
  };

  return new THREE.ShaderMaterial({
    uniforms: {
      uPatternType: { value: typeMap[patternType] ?? 0 },
      uPatternScale: { value: scale },
      uPatternAngle: { value: 0.785398 },
      uPatternContrast: { value: 1.5 },
      uPatternIntensity: { value: 1.0 },
      uOpacity: { value: opacity }
    },
    vertexShader: ProceduralPatternsShader.vertexShader,
    fragmentShader: ProceduralPatternsShader.fragmentShader,
    transparent: true,
    depthWrite: true,
    depthTest: true,
    side: THREE.DoubleSide
  });
}
