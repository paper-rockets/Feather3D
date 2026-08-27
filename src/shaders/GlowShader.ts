import * as THREE from 'three';

export const GlowShader = {
  uniforms: {
    uGlowIntensity: { value: 2.5 },
    uOpacity: { value: 1.0 }
  },
  vertexShader: /* glsl */ `
    attribute vec4 color;
    varying vec4 vColor;
    varying vec2 vUv;

    void main() {
      vColor = color;
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: /* glsl */ `
    uniform float uGlowIntensity;
    uniform float uOpacity;
    varying vec4 vColor;
    varying vec2 vUv;

    void main() {
      // Glow core with edge brightening
      float edgeGlow = 1.0 + pow(abs(vUv.x - 0.5) * 2.0, 2.0) * 0.5;
      vec3 emissive = vColor.rgb * uGlowIntensity * edgeGlow;
      float alpha = vColor.a * uOpacity;

      if (alpha < 0.001) discard;
      gl_FragColor = vec4(emissive, alpha);
    }
  `
};

export function createGlowMaterial(
  glowIntensity: number = 2.5,
  opacity: number = 1.0
): THREE.ShaderMaterial {
  return new THREE.ShaderMaterial({
    uniforms: {
      uGlowIntensity: { value: glowIntensity },
      uOpacity: { value: opacity }
    },
    vertexShader: GlowShader.vertexShader,
    fragmentShader: GlowShader.fragmentShader,
    transparent: true,
    depthWrite: true,
    depthTest: true,
    side: THREE.DoubleSide
  });
}
