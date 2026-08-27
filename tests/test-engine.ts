import * as THREE from 'three';
import { CurveMath, CurvePoint } from '../src/math/CurveMath';
import { ParallelTransportFrame } from '../src/math/ParallelTransportFrame';
import { LoftingMath } from '../src/math/LoftingMath';
import { FeatherCurve } from '../src/scene/FeatherCurve';
import { ShapeRecognition } from '../src/math/ShapeRecognition';
import { StageManager } from '../src/scene/StageManager';
import { HistoryManager } from '../src/core/HistoryManager';
import { SelectionTool } from '../src/tools/SelectionTool';
import { SequenceManager } from '../src/animation/SequenceManager';

function assert(condition: boolean, message: string) {
  if (!condition) {
    throw new Error(`Assertion failed: ${message}`);
  }
  console.log(`PASS: ${message}`);
}

console.log('--- Running Feather3D Mathematical & Engine Unit Tests ---');

// Test 1: CurveMath EMA smoothing
const p1 = new THREE.Vector3(0, 0, 0);
const p2 = new THREE.Vector3(10, 0, 0);
const smoothed = CurveMath.smoothEMA(p1, p2, 0.5);
assert(smoothed.x === 5 && smoothed.y === 0 && smoothed.z === 0, 'EMA smoothing calculates correct linear interpolation');

// Test 2: Catmull-Rom interpolation
const rawPoints: CurvePoint[] = [
  { position: new THREE.Vector3(0, 0, 0), pressure: 0.5, tilt: new THREE.Vector2(), time: 0 },
  { position: new THREE.Vector3(1, 2, 0), pressure: 0.8, tilt: new THREE.Vector2(), time: 100 },
  { position: new THREE.Vector3(2, 0, 0), pressure: 0.5, tilt: new THREE.Vector2(), time: 200 }
];
const resampled = CurveMath.resampleCurve(rawPoints, 4);
assert(resampled.length > rawPoints.length, `Resampling increases point density (points: ${resampled.length})`);
assert(resampled[0].position.distanceTo(rawPoints[0].position) < 1e-4, 'Curve start position is preserved');
assert(resampled[resampled.length - 1].position.distanceTo(rawPoints[2].position) < 1e-4, 'Curve end position is preserved');

// Test 3: Parallel Transport Frames (RMF)
const positions = [
  new THREE.Vector3(0, 0, 0),
  new THREE.Vector3(1, 1, 0),
  new THREE.Vector3(2, 1, 1),
  new THREE.Vector3(3, 0, 2)
];
const frames = ParallelTransportFrame.computeFrames(positions);
assert(frames.length === positions.length, 'Generates matching frame count for positions');

for (let i = 0; i < frames.length; i++) {
  const f = frames[i];
  const tDotN = Math.abs(f.tangent.dot(f.normal));
  const tDotB = Math.abs(f.tangent.dot(f.binormal));
  const nDotB = Math.abs(f.normal.dot(f.binormal));
  assert(tDotN < 1e-4, `Frame ${i} Tangent and Normal are orthogonal`);
  assert(tDotB < 1e-4, `Frame ${i} Tangent and Binormal are orthogonal`);
  assert(nDotB < 1e-4, `Frame ${i} Normal and Binormal are orthogonal`);
}

// Test 4: Lofting Math
const curveA: CurvePoint[] = [
  { position: new THREE.Vector3(0, 0, 0), pressure: 0.5, tilt: new THREE.Vector2(), time: 0 },
  { position: new THREE.Vector3(2, 0, 0), pressure: 0.5, tilt: new THREE.Vector2(), time: 100 }
];
const curveB: CurvePoint[] = [
  { position: new THREE.Vector3(0, 2, 0), pressure: 0.5, tilt: new THREE.Vector2(), time: 0 },
  { position: new THREE.Vector3(2, 2, 0), pressure: 0.5, tilt: new THREE.Vector2(), time: 100 }
];
const loftGeo = LoftingMath.loftBetweenTwoCurves(curveA, curveB, 8, 4);
assert(loftGeo.getAttribute('position').count === 8 * 4, 'Lofting generates correct grid vertex count');
assert(loftGeo.getIndex() !== null && loftGeo.getIndex()!.count === (8 - 1) * (4 - 1) * 6, 'Lofting generates correct triangle index count');

// Test 5: FeatherCurve Serialization / Deserialization
const curve = new FeatherCurve(rawPoints, 'ribbon', 0.04, new THREE.Color(0xb03020), 0.9, 'glow');
const json = curve.toJSON();
assert(json.profile === 'ribbon', 'Serialization captures stroke profile');
assert(json.color === '#b03020', 'Serialization captures stroke color');
assert(json.materialType === 'glow', 'Serialization captures material type');

const restored = FeatherCurve.fromJSON(json);
assert(restored.points.length === rawPoints.length, 'Deserialization restores exact point count');
assert(restored.color.getHexString() === 'b03020', 'Deserialization restores color hex');
assert(restored.materialType === 'glow', 'Deserialization restores material type');

// Test 6: Shape Recognition (Circle Detection)
const circlePoints: CurvePoint[] = [];
const numCirclePts = 32;
for (let i = 0; i <= numCirclePts; i++) {
  const angle = (i / numCirclePts) * Math.PI * 2;
  circlePoints.push({
    position: new THREE.Vector3(Math.cos(angle) * 1.5, Math.sin(angle) * 1.5, 0),
    pressure: 0.5,
    tilt: new THREE.Vector2(),
    time: i * 10
  });
}
const circleRec = ShapeRecognition.recognizeAndRegularize(circlePoints);
assert(circleRec.type === 'circle', 'ShapeRecognition correctly detects circular strokes');
assert(circleRec.confidence > 0.8, 'Circle detection confidence is above 0.8');

// Test 7: Shape Recognition (Straight Line Detection)
const linePoints: CurvePoint[] = [
  { position: new THREE.Vector3(0, 0, 0), pressure: 0.5, tilt: new THREE.Vector2(), time: 0 },
  { position: new THREE.Vector3(1, 0.01, 0), pressure: 0.5, tilt: new THREE.Vector2(), time: 50 },
  { position: new THREE.Vector3(2, -0.01, 0), pressure: 0.5, tilt: new THREE.Vector2(), time: 100 },
  { position: new THREE.Vector3(3, 0, 0), pressure: 0.5, tilt: new THREE.Vector2(), time: 150 }
];
const lineRec = ShapeRecognition.recognizeAndRegularize(linePoints);
assert(lineRec.type === 'line', 'ShapeRecognition correctly detects straight lines');

// Test 8: Selection Tool & Duplication
const stage = new StageManager();
const history = new HistoryManager();
const c1 = new FeatherCurve(rawPoints, 'ribbon', 0.02, new THREE.Color(0x1a1a2e));
stage.addCurveToActiveLayer(c1);

const selection = new SelectionTool(stage, history);
selection.select(c1);
assert(selection.selectedCurves.length === 1, 'Selection tool selects curve');

const duplicated = selection.duplicateSelected(new THREE.Vector3(1, 1, 0));
assert(duplicated.length === 1, 'Duplicate creates 1 cloned curve');
assert(stage.getAllCurves().length === 2, 'Stage manager contains original and duplicated curve');

history.undo();
assert(stage.getAllCurves().length === 1, 'HistoryManager undoes duplication');

// Test 9: Sequence Animation Flipbook
stage.addLayer('Frame 2');
stage.addLayer('Frame 3');
const seq = new SequenceManager(stage);
assert(seq.totalFrames === 3, 'SequenceManager detects 3 animation frames');

seq.goToFrame(1);
assert(seq.currentFrame === 1, 'SequenceManager steps to Frame 1');
seq.nextFrame();
assert(seq.currentFrame === 2, 'SequenceManager steps to Frame 2');
seq.nextFrame();
assert(seq.currentFrame === 0, 'SequenceManager loops back to Frame 0');

console.log('--- ALL 9 MATHEMATICAL, SHAPE, SELECTION, AND ANIMATION TESTS PASSED ---');
