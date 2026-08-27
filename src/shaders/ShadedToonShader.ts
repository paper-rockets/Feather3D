import * as THREE from 'three';

export const ShadedToonShader = {
  uniforms: {
    uLightDirection: { value: new THREE.Vector3(0.5, 1.0, 0.75).normalize() },
    uLightColor: { value: new THREE.Color(1.0, 0.98, 0.95) },
    uAmbientColor: { value: new THREE.Color(0.35, 0.35, 0.4) },
    uIsCelShaded: { value: 1.0 }, // 1.0 = Cel-shade, 0.0 = Smooth Lambert
    uCelBands: { value: 3.0 },
    uOpacity: { value: 1.0 }
  },
  vertexShader: /* glsl */ `
    attribute vec4 color;
    varying vec4 vColor;
    varying vec3 vNormal;
    varying vec3 vWorldPosition;
    varying vec2 vUv;

    void main() {
      vColor = color;
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);
      vec4 worldPos = modelMatrix * vec4(position, 1.0);
      vWorldPosition = worldPos.xyz;
      gl_Position = projectionMatrix * viewMatrix * worldPos;
    }
  `,
  fragmentShader: /* glsl */ `
    uniform vec3 uLightDirection;
    uniform vec3 uLightColor;
    uniform vec3 uAmbientColor;
    uniform float uIsCelShaded;
    uniform float uCelBands;
    uniform float uOpacity;

    varying vec4 vColor;
    varying vec3 vNormal;
    varying vec3 vWorldPosition;
    varying vec2 vUv;

    void main() {
      vec3 N = normalize(vNormal);
      vec3 L = normalize(uLightDirection);
      float NdotL = max(dot(N, L), 0.0);

      float diffuse = NdotL;
      if (uIsCelShaded > 0.5) {
        // Quantize NdotL into discrete toon cel steps
        diffuse = floor(NdotL * uCelBands) / uCelBands;
        diffuse = smoothstep(0.0, 1.0, diffuse * 1.2);
      }

      vec3 lighting = uAmbientColor + uLightColor * diffuse;
      vec3 finalRgb = vColor.rgb * lighting;
      float alpha = vColor.a * uOpacity;

      if (alpha < 0.001) discard;
      gl_FragColor = vec4(finalRgb, alpha);
    }
  `
};

export function createShadedToonMaterial(
  isCelShaded: boolean = true,
  opacity: number = 1.0
): THREE.ShaderMaterial {
  return new THREE.ShaderMaterial({
    uniforms: {
      uLightDirection: { value: new THREE.Vector3(0.5, 1.0, 0.75).normalize() },
      uLightColor: { value: new THREE.Color(1.0, 0.98, 0.95) },
      uAmbientColor: { value: new THREE.Color(0.35, 0.35, 0.4) },
      uIsCelShaded: { value: isCelShaded ? 1.0 : 0.0 },
      uCelBands: { value: 3.0 },
      uOpacity: { value: opacity }
    },
    vertexShader: ShadedToonShader.vertexShader,
    fragmentShader: ShadedToonShader.fragmentShader,
    transparent: true,
    depthWrite: true,
    depthTest: true,
    side: THREE.DoubleSide
  });
}
