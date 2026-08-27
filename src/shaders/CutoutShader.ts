import * as THREE from 'three';

export const CutoutShader = {
  uniforms: {
    uCutoutThreshold: { value: 0.1 },
    uBgColor: { value: new THREE.Color(0xdcd7ec) },
    uIsHole: { value: 1.0 } // 1.0 = Paint background color to act as eraser/hole, 0.0 = alpha discard
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
    uniform float uCutoutThreshold;
    uniform vec3 uBgColor;
    uniform float uIsHole;
    varying vec4 vColor;
    varying vec2 vUv;

    void main() {
      if (uIsHole > 0.5) {
        // Paint background color directly with depth write to punch holes through scene
        gl_FragColor = vec4(uBgColor, 1.0);
      } else {
        if (vColor.a < uCutoutThreshold) discard;
        gl_FragColor = vec4(vColor.rgb, 1.0);
      }
    }
  `
};

export function createCutoutMaterial(
  bgColor: THREE.Color = new THREE.Color(0xdcd7ec)
): THREE.ShaderMaterial {
  return new THREE.ShaderMaterial({
    uniforms: {
      uCutoutThreshold: { value: 0.1 },
      uBgColor: { value: bgColor },
      uIsHole: { value: 1.0 }
    },
    vertexShader: CutoutShader.vertexShader,
    fragmentShader: CutoutShader.fragmentShader,
    transparent: false,
    depthWrite: true,
    depthTest: true,
    side: THREE.DoubleSide
  });
}
