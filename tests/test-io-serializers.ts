import * as THREE from 'three';
import { FeatherProjectSerializer, FeatherProjectFile } from '../src/io/FeatherProjectSerializer';
import { StageManager } from '../src/scene/StageManager';
import { EnvironmentSettings } from '../src/scene/EnvironmentSettings';
import { Viewport } from '../src/core/Viewport';
import { FeatherCurve } from '../src/scene/FeatherCurve';
import { CurvePoint } from '../src/math/CurveMath';

function assert(condition: boolean, message: string) {
  if (!condition) {
    throw new Error(`Assertion failed: ${message}`);
  }
  console.log(`[PASS] ${message}`);
}

console.log('=== Running IO & Serializers Test Suite ===');

// Setup mock dummy scene components
const stage = new StageManager();
const env = new EnvironmentSettings();
const dummyDom = { clientWidth: 800, clientHeight: 600, appendChild: () => {}, removeChild: () => {}, addEventListener: () => {} } as any;
const viewport = new Viewport(dummyDom);

const pointsA: CurvePoint[] = [
  { position: new THREE.Vector3(0, 0, 0), pressure: 0.3, tilt: new THREE.Vector2(), time: 0 },
  { position: new THREE.Vector3(1, 2, 3), pressure: 0.8, tilt: new THREE.Vector2(), time: 100 }
];
const curveA = new FeatherCurve(pointsA, 'ribbon', 0.05, new THREE.Color(0xee4433), 1.0, 'shaded', 'c_test_a');
stage.addCurveToActiveLayer(curveA);

const layerB = stage.addLayer('Secondary Layer');
const pointsB: CurvePoint[] = [
  { position: new THREE.Vector3(5, 5, 5), pressure: 0.5, tilt: new THREE.Vector2(), time: 0 },
  { position: new THREE.Vector3(6, 7, 8), pressure: 0.9, tilt: new THREE.Vector2(), time: 100 }
];
const curveB = new FeatherCurve(pointsB, 'tube', 0.02, new THREE.Color(0x33aaee), 0.9, 'glow', 'c_test_b');
layerB.addCurve(curveB);

// --- 1. Serialize Project Tests ---
console.log('\n--- 1. Testing FeatherProjectSerializer.serialize ---');
const serializedJson = FeatherProjectSerializer.serialize(stage, env, viewport, 'Test Diagnostics Project');
assert(typeof serializedJson === 'string', 'serialize produces string output');

const parsed: FeatherProjectFile = JSON.parse(serializedJson);
assert(parsed.format === 'wandrlust3d' || parsed.format === 'feather3d', 'Project file contains valid format identifier');
assert(parsed.version === '1.0.0', 'Project file contains version 1.0.0');
assert(parsed.name === 'Test Diagnostics Project', 'Project file captures project name');
assert(parsed.layers.length === 2, 'Project file captures all 2 layers');
assert(parsed.layers[0].curves?.length === 1, 'Layer 1 captures 1 curve');
assert(parsed.layers[1].curves?.length === 1, 'Layer 2 captures 1 curve');

// --- 2. Deserialize Project Roundtrip Tests ---
console.log('\n--- 2. Testing FeatherProjectSerializer.deserialize ---');
const newStage = new StageManager();
const newEnv = new EnvironmentSettings();
const newViewport = new Viewport(dummyDom);

FeatherProjectSerializer.deserialize(serializedJson, newStage, newEnv, newViewport);
assert(newStage.layers.length === 2, 'deserialize restores all 2 layers');
assert(newStage.layers[0].curves.length === 1, 'Layer 0 contains 1 restored curve');
assert(newStage.layers[1].curves.length === 1, 'Layer 1 contains 1 restored curve');

const restoredCurveA = newStage.layers[0].curves[0];
assert(restoredCurveA.profile === 'ribbon', 'Restored curve preserves ribbon profile');
assert(restoredCurveA.points.length === 2, 'Restored curve preserves 2 points');
assert(restoredCurveA.points[1].position.x === 1, 'Restored point position X matches original');
assert(restoredCurveA.points[1].position.y === 2, 'Restored point position Y matches original');
assert(restoredCurveA.points[1].position.z === 3, 'Restored point position Z matches original');

console.log('\n=== ALL IO & SERIALIZER TESTS PASSED SUCCESSFULLY ===');
