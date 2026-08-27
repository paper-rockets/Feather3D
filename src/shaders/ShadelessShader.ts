import * as THREE from 'three';

export const ShadelessShader = {
  uniforms: {
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
    uniform float uOpacity;
    varying vec4 vColor;
    varying vec2 vUv;

    void main() {
      vec4 finalColor = vColor;
      finalColor.a *= uOpacity;
      if (finalColor.a < 0.001) discard;
      gl_FragColor = finalColor;
    }
  `
};

export function createShadelessMaterial(opacity: number = 1.0): THREE.ShaderMaterial {
  return new THREE.ShaderMaterial({
    uniforms: {
      uOpacity: { value: opacity }
    },
    vertexShader: ShadelessShader.vertexShader,
    fragmentShader: ShadelessShader.fragmentShader,
    transparent: true,
    depthWrite: true,
    depthTest: true,
    side: THREE.DoubleSide
  });
}
