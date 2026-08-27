// @ts-nocheck
import * as THREE from 'three';
import { MeshBasicNodeMaterial } from 'three/webgpu';
import {
  Fn, If, vec2, vec3, vec4, uniform, positionLocal, normalize,
  dot, cross, clamp, mix, pow, smoothstep, float, sin, fract, abs, max, floor, step, exp
} from 'three/tsl';

const SKY_OCTAVES = 3;

const hash = Fn(([p]) => {
  return fract(sin(dot(p, vec2(12.9898, 78.233))).mul(43758.5453123));
});

const noise = Fn(([p]) => {
  const i = floor(p);
  const f = fract(p);
  const u = f.mul(f).mul(float(3.0).sub(f.mul(2.0)));
  return mix(
    mix(hash(i.add(vec2(0.0, 0.0))), hash(i.add(vec2(1.0, 0.0))), u.x),
    mix(hash(i.add(vec2(0.0, 1.0))), hash(i.add(vec2(1.0, 1.0))), u.x),
    u.y
  );
});

const makeFbm = (octaves: number) => {
  const amps = [0.5, 0.25, 0.125, 0.0625].slice(0, octaves);
  const norm = 0.9375 / amps.reduce((a, b) => a + b, 0);
  const lac = [2.02, 2.03, 2.01];
  return Fn(([p]) => {
    let f = float(0.0).toVar();
    let currP = vec2(p).toVar();
    for (let i = 0; i < octaves; i++) {
      f.addAssign(noise(currP).mul(amps[i] * norm));
      if (i < octaves - 1) currP.mulAssign(lac[i % lac.length]);
    }
    return f;
  });
};

const fbm = makeFbm(SKY_OCTAVES);

const hash3 = Fn(([p]) => {
  return fract(sin(dot(p, vec3(12.9898, 78.233, 37.719))).mul(43758.5453123));
});

const starLayer = Fn(([dir, uTime, density, twinkleAmt, cellScale]) => {
  const p = dir.mul(cellScale);
  const cell = floor(p);
  const f = p.sub(cell);
  const h = hash3(cell);
  const isStar = step(float(1.0).sub(density), h);
  const jitter = vec3(hash3(cell.add(vec3(1.7, 9.2, 3.3))), hash3(cell.add(vec3(4.1, 2.8, 7.6))), hash3(cell.add(vec3(8.3, 5.5, 1.9))));
  const d = f.sub(jitter).length();
  const core = smoothstep(0.14, 0.0, d);
  const magnitude = pow(hash3(cell.add(vec3(6.4, 1.1, 8.8))), 2.2).mul(0.85).add(0.15);
  const phase = hash3(cell.add(vec3(3.9, 7.1, 2.2))).mul(6.2831);
  const twinkle = sin(uTime.mul(1.4).add(phase)).mul(0.5).add(0.5).mul(twinkleAmt).add(float(1.0).sub(twinkleAmt));
  return core.mul(isStar).mul(magnitude).mul(twinkle);
});

export function createProceduralSky() {
  const uTime = uniform(0.0);
  const uSunPosition = uniform(new THREE.Vector3(0.0, 0.5, -0.866).normalize());
  const uSkyColorZenith = uniform(new THREE.Color(0x3a88d6));
  const uSkyColorMid = uniform(new THREE.Color(0x6ab0e8));
  const uSkyColorHorizon = uniform(new THREE.Color(0xb8daf2));
  const uSunColor = uniform(new THREE.Color(0xffaa00));
  const uGradientPower = uniform(1.2);
  const uGradientMidOffset = uniform(0.22);
  const uGradientSkyEnabled = uniform(1.0);
  const uSunCoronaIntensity = uniform(0.7);
  const uCloudColor = uniform(new THREE.Color(0xfffcf5));
  const uCloudShadowColor = uniform(new THREE.Color(0x8ca4c8));
  const uCloudCoverage = uniform(0.45);
  const uCloudEdge = uniform(0.06);
  const uCloudSpeed = uniform(0.018);
  const uCloudTurbulence = uniform(0.0);
  const uCloudOpacity = uniform(1.0);
  const uStormDarken = uniform(0.0);
  const uNightFactor = uniform(0.0);
  const uDuskFactor = uniform(0.0);
  const uHorizonGlow = uniform(0.45);
  const uEnableProceduralClouds = uniform(1.0);
  const uStarDensity = uniform(0.055);
  const uStarBrightness = uniform(1.35);
  const uStarTwinkle = uniform(0.45);
  const uMilkyWay = uniform(0.1);
  const uMilkyDust = uniform(0.85);
  const uMilkyArmColor = uniform(new THREE.Color(0.55, 0.68, 1.15));
  const uMilkyCoreColor = uniform(new THREE.Color(1.35, 1.10, 0.85));
  const uNightSkyLift = uniform(1.0);
  const uNightColor = uniform(new THREE.Color(0.008, 0.012, 0.025));

  const material = new MeshBasicNodeMaterial({
    side: THREE.BackSide,
    depthWrite: false,
    depthTest: true,
    fog: false
  });

  material.colorNode = Fn(() => {
    const dir = normalize(positionLocal);
    const sunDir = normalize(uSunPosition);
    const sunDot = dot(dir, sunDir);

    const alt = clamp(dir.y, 0.0, 1.0);
    const tLower = clamp(alt.div(max(uGradientMidOffset, float(0.01))), 0.0, 1.0);
    const tUpper = clamp(alt.sub(uGradientMidOffset).div(max(float(1.0).sub(uGradientMidOffset), float(0.01))), 0.0, 1.0);
    const curveLower = pow(tLower, uGradientPower);
    const curveUpper = pow(tUpper, uGradientPower);
    const lowerSky = mix(uSkyColorHorizon, uSkyColorMid, curveLower);
    const gradientSky = mix(lowerSky, uSkyColorZenith, curveUpper);
    const h = clamp(dir.y.mul(1.5), 0.0, 1.0);
    const twoStopSky = mix(uSkyColorHorizon, uSkyColorZenith, pow(h, 0.6));
    const baseAtmosphere = mix(twoStopSky, gradientSky, uGradientSkyEnabled);

    const sunDisc = smoothstep(0.9985, 0.9997, sunDot).mul(uSunColor).mul(3.0);
    const sunCorona = pow(clamp(sunDot, 0.0, 1.0), 32.0).mul(uSunColor).mul(uSunCoronaIntensity);
    const sunHaze = pow(clamp(sunDot, 0.0, 1.0), 8.0).mul(uSkyColorHorizon).mul(0.18);
    const horizonBand = pow(clamp(float(1.0).sub(abs(dir.y)), 0.0, 1.0), 3.0);
    const duskGlow = horizonBand.mul(uSkyColorHorizon).mul(uHorizonGlow).mul(uDuskFactor);

    const nightSky = vec3(0.0).toVar();
    If(uNightFactor.greaterThan(0.001), () => {
      const bandAxis = normalize(vec3(0.45, 0.62, -0.64));
      const t1 = normalize(cross(bandAxis, vec3(0.0, 1.0, 0.0)));
      const t2 = cross(bandAxis, t1);
      const across = dot(dir, bandAxis);
      const a = dot(dir, t1);
      const b = dot(dir, t2);
      const inPlane = vec2(a, b);
      const a2 = across.mul(across);
      const bandCore = exp(a2.mul(-28.0));
      const bandWide = exp(a2.mul(-4.5));
      const large = fbm(inPlane.mul(2.1));
      const fila = fbm(inPlane.mul(7.5).add(across.mul(5.0)));
      const fine = fbm(inPlane.mul(18.0).add(across.mul(9.0)));
      let glow = bandWide.mul(large.mul(1.1).add(0.40)).add(bandCore.mul(fila.mul(1.2).add(0.60))).toVar();
      const dust = fbm(inPlane.mul(3.4).add(vec2(31.7, 11.3)));
      const dustMask = smoothstep(0.40, 0.66, dust).mul(bandCore).mul(uMilkyDust);
      glow.mulAssign(float(1.0).sub(dustMask.mul(0.8)));
      glow.mulAssign(fine.mul(0.55).add(0.72));
      const coreDir = normalize(vec3(0.78, 0.30, 0.55));
      const coreProx = pow(clamp(dot(dir, coreDir), 0.0, 1.0), 6.0);
      const coreGlow = coreProx.mul(bandWide).mul(2.6);
      const armCol = uMilkyArmColor;
      const coreCol = uMilkyCoreColor;
      const milkyCol = mix(armCol, coreCol, clamp(coreProx.mul(1.3), 0.0, 1.0));
      const starHorizonFade = smoothstep(-0.02, 0.30, dir.y);
      const milkyWay = glow.add(coreGlow).mul(starHorizonFade).mul(uMilkyWay).mul(milkyCol);
      const bandStarBoost = float(1.0).add(bandWide.mul(2.5).mul(uMilkyWay));
      const densCoarse = clamp(uStarDensity.mul(bandStarBoost), 0.0, 0.6);
      const densFine = clamp(uStarDensity.mul(0.7).mul(bandStarBoost), 0.0, 0.6);
      const starsCoarse = starLayer(dir, uTime, densCoarse, uStarTwinkle, float(140.0));
      const starsFine = starLayer(dir, uTime, densFine, uStarTwinkle.mul(0.6), float(340.0)).mul(0.45);
      const starTotal = starsCoarse.add(starsFine).mul(starHorizonFade).mul(uStarBrightness);
      const starTint = mix(vec3(0.86, 0.91, 1.0), milkyCol.mul(1.6).add(0.55), bandWide.mul(0.5));
      const starColor = starTint.mul(starTotal);
      nightSky.assign(uNightColor.mul(uNightSkyLift).add(starColor).add(milkyWay));
    });

    let sky = baseAtmosphere.add(sunCorona).add(sunHaze).add(sunDisc).add(duskGlow);
    sky = mix(sky, nightSky, uNightFactor);
    sky = mix(sky, vec3(0.12, 0.14, 0.18), uStormDarken);

    const skyDomeDist = float(1.0).div(max(dir.y.add(0.15), float(0.08)));
    const cloudUV = dir.xz.mul(skyDomeDist).mul(0.45);
    const windOffset = vec2(uTime.mul(uCloudSpeed).mul(0.15), uTime.mul(uCloudSpeed).mul(0.08));
    const uvSample = cloudUV.add(windOffset).add(vec2(14.8, 32.4));
    const q = vec2(fbm(uvSample), fbm(uvSample.add(vec2(5.2, 1.3))));
    const warpedUV = uvSample.add(q.mul(0.8).add(q.mul(uCloudTurbulence)));
    const cloudNoise = fbm(warpedUV);
    const lowThreshold = float(1.0).sub(uCloudCoverage);
    const highThreshold = lowThreshold.add(max(uCloudEdge, float(0.02)));
    const cloudAlpha = smoothstep(lowThreshold, highThreshold, cloudNoise);
    const sunProximity = clamp(sunDot, 0.0, 1.0);
    const sunClearMask = float(1.0).sub(smoothstep(float(0.82), float(0.995), sunProximity).mul(0.94));
    const horizonFade = smoothstep(0.02, 0.22, dir.y);
    const finalAlpha = cloudAlpha.mul(horizonFade).mul(sunClearMask).mul(uCloudOpacity);
    const sunDiffuse = clamp(sunDot.mul(0.5).add(0.5), 0.0, 1.0);
    const silverLining = pow(clamp(sunDot, 0.0, 1.0), 4.0).mul(0.4);
    const dayCloudCol = mix(uCloudShadowColor, uCloudColor, sunDiffuse.add(silverLining));
    const sunsetCloudCol = mix(dayCloudCol, vec3(1.0, 0.6, 0.45), uDuskFactor.mul(0.7));
    const nightCloudCol = mix(sunsetCloudCol, vec3(0.04, 0.05, 0.1), uNightFactor.mul(0.85));
    const finalCloudCol = mix(nightCloudCol, vec3(0.1, 0.12, 0.15), uStormDarken.mul(0.8));
    const cloudContribution = finalAlpha.mul(uEnableProceduralClouds);
    const compositeSky = mix(sky, finalCloudCol, cloudContribution);

    return vec4(compositeSky, 1.0);
  })();

  const geometry = new THREE.SphereGeometry(600, 48, 24);
  const mesh = new THREE.Mesh(geometry, material);
  mesh.renderOrder = -1000;
  mesh.frustumCulled = false;

  return {
    mesh,
    material,
    uniforms: {
      uTime, uSunPosition, uSkyColorZenith, uSkyColorMid, uSkyColorHorizon, uSunColor,
      uGradientPower, uGradientMidOffset, uGradientSkyEnabled, uSunCoronaIntensity, uHorizonGlow,
      uCloudColor, uCloudShadowColor, uCloudCoverage, uCloudEdge, uCloudSpeed,
      uCloudTurbulence, uCloudOpacity, uStormDarken, uNightFactor, uDuskFactor, uEnableProceduralClouds,
      uStarDensity, uStarBrightness, uStarTwinkle, uMilkyWay, uNightSkyLift, uNightColor,
      uMilkyDust, uMilkyArmColor, uMilkyCoreColor
    }
  };
}

export type SkyPreset = 'day' | 'golden_hour' | 'cherry' | 'dusk' | 'night' | 'storm';

export function applySkyPreset(uniforms: any, preset: SkyPreset): void {
  // Default values
  uniforms.uCloudEdge.value = 0.06;
  uniforms.uCloudSpeed.value = 0.018;

  switch (preset) {
    case 'day':
      uniforms.uNightFactor.value = 0.0;
      uniforms.uDuskFactor.value = 0.0;
      uniforms.uStormDarken.value = 0.0;
      uniforms.uSkyColorZenith.value.set(0x3a88d6);
      uniforms.uSkyColorMid.value.set(0x6ab0e8);
      uniforms.uSkyColorHorizon.value.set(0xb8daf2);
      uniforms.uSunColor.value.set(0xfff0cc);
      uniforms.uSunPosition.value.set(0.2, 0.7, -0.68).normalize();
      uniforms.uCloudCoverage.value = 0.45;
      uniforms.uCloudColor.value.set(0xfffcf5);
      uniforms.uCloudShadowColor.value.set(0x8ca4c8);
      break;
    case 'golden_hour':
      uniforms.uNightFactor.value = 0.0;
      uniforms.uDuskFactor.value = 0.85;
      uniforms.uStormDarken.value = 0.0;
      uniforms.uSkyColorZenith.value.set(0x3566a8);
      uniforms.uSkyColorMid.value.set(0xdf7c38);
      uniforms.uSkyColorHorizon.value.set(0xffbe60);
      uniforms.uSunColor.value.set(0xffa834);
      uniforms.uSunPosition.value.set(0.6, 0.22, -0.75).normalize();
      uniforms.uCloudCoverage.value = 0.4;
      uniforms.uCloudColor.value.set(0xffe8c8);
      uniforms.uCloudShadowColor.value.set(0x8a5568);
      break;
    case 'cherry':
      uniforms.uNightFactor.value = 0.0;
      uniforms.uDuskFactor.value = 0.55;
      uniforms.uStormDarken.value = 0.0;
      uniforms.uSkyColorZenith.value.set(0x5a60a0);
      uniforms.uSkyColorMid.value.set(0xda82a6);
      uniforms.uSkyColorHorizon.value.set(0xffd5dc);
      uniforms.uSunColor.value.set(0xffecc8);
      uniforms.uSunPosition.value.set(-0.4, 0.4, -0.82).normalize();
      uniforms.uCloudCoverage.value = 0.38;
      uniforms.uCloudColor.value.set(0xfff0f5);
      uniforms.uCloudShadowColor.value.set(0x9a7590);
      break;
    case 'dusk':
      uniforms.uNightFactor.value = 0.0;
      uniforms.uDuskFactor.value = 1.0;
      uniforms.uStormDarken.value = 0.0;
      uniforms.uSkyColorZenith.value.set(0x2a5090);
      uniforms.uSkyColorMid.value.set(0xc85078);
      uniforms.uSkyColorHorizon.value.set(0xffa07a);
      uniforms.uSunColor.value.set(0xff7744);
      uniforms.uSunPosition.value.set(0.8, 0.12, -0.58).normalize();
      uniforms.uCloudCoverage.value = 0.35;
      uniforms.uCloudColor.value.set(0xffd4b8);
      uniforms.uCloudShadowColor.value.set(0x6e4860);
      break;
    case 'night':
      uniforms.uNightFactor.value = 1.0;
      uniforms.uDuskFactor.value = 0.0;
      uniforms.uStormDarken.value = 0.0;
      uniforms.uSkyColorZenith.value.set(0x050814);
      uniforms.uSkyColorMid.value.set(0x0c1228);
      uniforms.uSkyColorHorizon.value.set(0x182040);
      uniforms.uSunColor.value.set(0x334466);
      uniforms.uSunPosition.value.set(0.0, -0.8, -0.6).normalize();
      uniforms.uCloudCoverage.value = 0.25;
      uniforms.uCloudColor.value.set(0x1e2438);
      uniforms.uCloudShadowColor.value.set(0x0a0e1a);
      uniforms.uCloudSpeed.value = 0.012;
      break;
    case 'storm':
      uniforms.uNightFactor.value = 0.0;
      uniforms.uDuskFactor.value = 0.0;
      uniforms.uStormDarken.value = 0.65;
      uniforms.uSkyColorZenith.value.set(0x202834);
      uniforms.uSkyColorMid.value.set(0x384452);
      uniforms.uSkyColorHorizon.value.set(0x546270);
      uniforms.uSunColor.value.set(0x8899aa);
      uniforms.uSunPosition.value.set(0.3, 0.5, -0.6).normalize();
      uniforms.uCloudCoverage.value = 0.78;
      uniforms.uCloudEdge.value = 0.15;
      uniforms.uCloudSpeed.value = 0.08;
      uniforms.uCloudColor.value.set(0x485260);
      uniforms.uCloudShadowColor.value.set(0x1e242c);
      break;
  }
}
