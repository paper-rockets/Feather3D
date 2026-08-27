import * as THREE from 'three';
import { CurveMath, CurvePoint } from '../src/math/CurveMath';
import { ParallelTransportFrame } from '../src/math/ParallelTransportFrame';
import { LoftingMath } from '../src/math/LoftingMath';
import { ShapeRecognition } from '../src/math/ShapeRecognition';
import { RibbonGeometry } from '../src/geometry/RibbonGeometry';
import { TubeGeometry } from '../src/geometry/TubeGeometry';

function assert(condition: boolean, message: string) {
  if (!condition) {
    throw new Error(`Assertion failed: ${message}`);
  }
  console.log(`[PASS] ${message}`);
}

console.log('=== Running Math & Geometry Test Suite ===');

// --- 1. CurveMath Tests ---
console.log('\n--- 1. Testing CurveMath ---');
const pStart = new THREE.Vector3(0, 0, 0);
const pEnd = new THREE.Vector3(10, 20, 30);

// EMA
const smoothHalf = CurveMath.smoothEMA(pStart, pEnd, 0.5);
assert(smoothHalf.x === 5 && smoothHalf.y === 10 && smoothHalf.z === 15, 'CurveMath.smoothEMA computes correct linear interpolation');

const smoothClamp = CurveMath.smoothEMA(pStart, pEnd, 0.0);
assert(smoothClamp.x > 0, 'CurveMath.smoothEMA clamps minimum alpha to avoid freeze');

// CatmullRom Point
const c0 = new THREE.Vector3(0, 0, 0);
const c1 = new THREE.Vector3(1, 1, 0);
const c2 = new THREE.Vector3(2, 1, 0);
const c3 = new THREE.Vector3(3, 0, 0);
const midPoint = CurveMath.catmullRomPoint(c0, c1, c2, c3, 0.5);
assert(!isNaN(midPoint.x) && !isNaN(midPoint.y) && !isNaN(midPoint.z), 'CurveMath.catmullRomPoint returns valid non-NaN coordinates');

// Resample Curve
const samplePoints: CurvePoint[] = [
  { position: new THREE.Vector3(0, 0, 0), pressure: 0.2, tilt: new THREE.Vector2(), time: 0 },
  { position: new THREE.Vector3(1, 2, 0), pressure: 0.6, tilt: new THREE.Vector2(), time: 50 },
  { position: new THREE.Vector3(3, 1, 0), pressure: 0.8, tilt: new THREE.Vector2(), time: 100 },
  { position: new THREE.Vector3(4, 0, 0), pressure: 0.4, tilt: new THREE.Vector2(), time: 150 }
];
const resampled = CurveMath.resampleCurve(samplePoints, 4);
assert(resampled.length >= samplePoints.length * 3, 'CurveMath.resampleCurve subdivides and expands point array');
assert(resampled[0].position.distanceTo(samplePoints[0].position) < 1e-4, 'CurveMath.resampleCurve preserves initial point');
assert(resampled[resampled.length - 1].position.distanceTo(samplePoints[samplePoints.length - 1].position) < 1e-4, 'CurveMath.resampleCurve preserves endpoint');

// Douglas-Peucker Simplification
const denseCollinear: CurvePoint[] = [];
for (let i = 0; i <= 20; i++) {
  denseCollinear.push({
    position: new THREE.Vector3(i, 0, 0),
    pressure: 0.5,
    tilt: new THREE.Vector2(),
    time: i * 10
  });
}
const simplified = CurveMath.simplifyDouglasPeucker(denseCollinear, 0.01);
assert(simplified.length === 2, 'CurveMath.simplifyDouglasPeucker collapses collinear points to endpoints');

// Arc Lengths
const arcVectors = [
  new THREE.Vector3(0, 0, 0),
  new THREE.Vector3(3, 4, 0), // distance 5
  new THREE.Vector3(3, 4, 10) // distance 10
];
const arcLengths = CurveMath.computeArcLengths(arcVectors);
assert(arcLengths.length === 3, 'CurveMath.computeArcLengths returns array of same length');
assert(Math.abs(arcLengths[1] - 5) < 1e-4, 'CurveMath.computeArcLengths correctly computes first segment length');
assert(Math.abs(arcLengths[2] - 15) < 1e-4, 'CurveMath.computeArcLengths correctly computes cumulative length');

// --- 2. Parallel Transport Frame (RMF) Tests ---
console.log('\n--- 2. Testing ParallelTransportFrame ---');
const rmfPositions = [
  new THREE.Vector3(0, 0, 0),
  new THREE.Vector3(1, 0.5, 0),
  new THREE.Vector3(2, 0.5, 0.5),
  new THREE.Vector3(3, 0, 1)
];
const frames = ParallelTransportFrame.computeFrames(rmfPositions);
assert(frames.length === rmfPositions.length, 'ParallelTransportFrame produces one frame per point');

frames.forEach((frame, idx) => {
  const tDotN = Math.abs(frame.tangent.dot(frame.normal));
  const tDotB = Math.abs(frame.tangent.dot(frame.binormal));
  const nDotB = Math.abs(frame.normal.dot(frame.binormal));
  assert(tDotN < 1e-4, `Frame ${idx} Tangent and Normal are orthogonal`);
  assert(tDotB < 1e-4, `Frame ${idx} Tangent and Binormal are orthogonal`);
  assert(nDotB < 1e-4, `Frame ${idx} Normal and Binormal are orthogonal`);
  assert(Math.abs(frame.tangent.length() - 1) < 1e-4, `Frame ${idx} Tangent is unit length`);
  assert(Math.abs(frame.normal.length() - 1) < 1e-4, `Frame ${idx} Normal is unit length`);
  assert(Math.abs(frame.binormal.length() - 1) < 1e-4, `Frame ${idx} Binormal is unit length`);
});

// --- 3. LoftingMath Tests ---
console.log('\n--- 3. Testing LoftingMath ---');
const curve1: CurvePoint[] = [
  { position: new THREE.Vector3(0, 0, 0), pressure: 0.5, tilt: new THREE.Vector2(), time: 0 },
  { position: new THREE.Vector3(1, 0, 0), pressure: 0.5, tilt: new THREE.Vector2(), time: 50 },
  { position: new THREE.Vector3(2, 0, 0), pressure: 0.5, tilt: new THREE.Vector2(), time: 100 }
];
const curve2: CurvePoint[] = [
  { position: new THREE.Vector3(0, 2, 0), pressure: 0.5, tilt: new THREE.Vector2(), time: 0 },
  { position: new THREE.Vector3(1, 2, 0), pressure: 0.5, tilt: new THREE.Vector2(), time: 50 },
  { position: new THREE.Vector3(2, 2, 0), pressure: 0.5, tilt: new THREE.Vector2(), time: 100 }
];
const loftGeo = LoftingMath.loftBetweenTwoCurves(curve1, curve2, 6, 4);
const expectedVertexCount = 6 * 4;
assert(loftGeo.getAttribute('position').count === expectedVertexCount, 'LoftingMath produces expected vertex count');
assert(loftGeo.getIndex() !== null, 'LoftingMath generates indexed BufferGeometry');
const expectedTriIndices = (6 - 1) * (4 - 1) * 6;
assert(loftGeo.getIndex()!.count === expectedTriIndices, 'LoftingMath generates matching index count');

// --- 4. ShapeRecognition Tests ---
console.log('\n--- 4. Testing ShapeRecognition ---');
// Line recognition
const linePts: CurvePoint[] = [];
for (let i = 0; i <= 10; i++) {
  linePts.push({
    position: new THREE.Vector3(i * 0.5, 0, 0),
    pressure: 0.5,
    tilt: new THREE.Vector2(),
    time: i * 10
  });
}
const lineRec = ShapeRecognition.recognizeAndRegularize(linePts);
assert(lineRec.type === 'line', 'ShapeRecognition correctly detects linear stroke');

// Circle recognition
const circlePts: CurvePoint[] = [];
for (let i = 0; i <= 24; i++) {
  const theta = (i / 24) * Math.PI * 2;
  circlePts.push({
    position: new THREE.Vector3(Math.cos(theta) * 2, Math.sin(theta) * 2, 0),
    pressure: 0.5,
    tilt: new THREE.Vector2(),
    time: i * 10
  });
}
const circleRec = ShapeRecognition.recognizeAndRegularize(circlePts);
assert(circleRec.type === 'circle', 'ShapeRecognition correctly detects circular stroke');
assert(circleRec.confidence >= 0.75, 'ShapeRecognition confidence is high for circle');

import { BristleGeometry } from '../src/geometry/BristleGeometry';
import { CurledStrokeGeometry } from '../src/geometry/CurledStrokeGeometry';
import { ScatterParticleGeometry } from '../src/geometry/ScatterParticleGeometry';
import { StrokeGeometryBuilder } from '../src/geometry/StrokeGeometryBuilder';

// --- 5. Geometry Builders Tests ---
console.log('\n--- 5. Testing Geometry Builders ---');
// Ribbon Geometry
const ribbonGeo = RibbonGeometry.build(samplePoints, {
  baseWidth: 0.04,
  taperStart: true,
  taperEnd: true,
  color: new THREE.Color(0x336699),
  alpha: 0.9
});
assert(ribbonGeo.getAttribute('position') !== undefined, 'RibbonGeometry sets position attribute');
assert(ribbonGeo.getAttribute('normal') !== undefined, 'RibbonGeometry sets normal attribute');
assert(ribbonGeo.getAttribute('uv') !== undefined, 'RibbonGeometry sets UV attribute');
assert(ribbonGeo.getAttribute('color') !== undefined, 'RibbonGeometry sets vertex color attribute');
assert(ribbonGeo.getAttribute('position').count === samplePoints.length * 2, 'RibbonGeometry vertex count matches 2 per curve point');

// Tube Geometry
const tubeGeo = TubeGeometry.build(samplePoints, {
  baseRadius: 0.02,
  radialSegments: 8,
  color: new THREE.Color(0xff4422)
});
const expectedTubeVerts = samplePoints.length * (8 + 1);
assert(tubeGeo.getAttribute('position').count === expectedTubeVerts, 'TubeGeometry produces expected radial vertex ring count');
assert(tubeGeo.getIndex() !== null, 'TubeGeometry produces valid triangle index buffer');

// Bristle Geometry
const bristleGeo = BristleGeometry.build(samplePoints, {
  numStrands: 4,
  baseWidth: 0.05,
  color: new THREE.Color(0x228844)
});
assert(bristleGeo.getAttribute('position') !== undefined, 'BristleGeometry generates positions');
assert(bristleGeo.getAttribute('position').count === samplePoints.length * 2 * 4, 'BristleGeometry generates 4 parallel strands');
assert(bristleGeo.getIndex() !== null, 'BristleGeometry generates valid indices');

// Curled Stroke Geometry (Coil & Wave)
const coilGeo = CurledStrokeGeometry.build(samplePoints, {
  type: 'coil',
  baseWidth: 0.03,
  color: new THREE.Color(0x884422)
});
assert(coilGeo.getAttribute('position') !== undefined, 'CurledStrokeGeometry coil produces geometry');
assert(coilGeo.getAttribute('position').count > samplePoints.length * 2, 'CurledStrokeGeometry subdivides points along helical spiral');

const waveGeo = CurledStrokeGeometry.build(samplePoints, {
  type: 'wave',
  baseWidth: 0.03,
  color: new THREE.Color(0x442288)
});
assert(waveGeo.getAttribute('position') !== undefined, 'CurledStrokeGeometry wave produces geometry');

// Scatter Particle Geometry (Foliage & Particles)
const foliageGeo = ScatterParticleGeometry.build(samplePoints, {
  scatterType: 'foliage_maple',
  baseSize: 0.04,
  color: new THREE.Color(0xdd6611)
});
assert(foliageGeo.getAttribute('position') !== undefined, 'ScatterParticleGeometry foliage produces geometry');
assert(foliageGeo.getAttribute('position').count % 4 === 0, 'ScatterParticleGeometry vertices are multiples of 4 (quad billboards)');
assert(foliageGeo.getIndex() !== null, 'ScatterParticleGeometry indices are generated');

// StrokeGeometryBuilder Comprehensive Test
const profiles = ['ribbon', 'tube', 'chisel', 'bristle', 'hair_coil', 'hair_wave', 'hair_zigzag', 'foliage', 'particles'] as const;
profiles.forEach(prof => {
  const geo = StrokeGeometryBuilder.buildGeometry(samplePoints, {
    profile: prof,
    size: 0.03,
    color: new THREE.Color(0x1a1a2e),
    alpha: 1.0
  });
  assert(geo.getAttribute('position') !== undefined && geo.getAttribute('position').count > 0, `StrokeGeometryBuilder successfully builds geometry for profile: ${prof}`);
});

console.log('\n=== ALL MATH & GEOMETRY TESTS PASSED SUCCESSFULLY ===');

