import * as THREE from 'three';
import { FeatherCurve } from '../src/scene/FeatherCurve';
import { StageManager } from '../src/scene/StageManager';
import { HistoryManager } from '../src/core/HistoryManager';
import { SelectionTool } from '../src/tools/SelectionTool';
import { SymmetryManager } from '../src/core/SymmetryManager';
import { SequenceManager } from '../src/animation/SequenceManager';
import { CurvePoint } from '../src/math/CurveMath';

function assert(condition: boolean, message: string) {
  if (!condition) {
    throw new Error(`Assertion failed: ${message}`);
  }
  console.log(`[PASS] ${message}`);
}

console.log('=== Running Core Engine & Scene Test Suite ===');

const sampleCurvePoints: CurvePoint[] = [
  { position: new THREE.Vector3(0, 0, 0), pressure: 0.5, tilt: new THREE.Vector2(), time: 0 },
  { position: new THREE.Vector3(1, 1, 0), pressure: 0.7, tilt: new THREE.Vector2(), time: 50 },
  { position: new THREE.Vector3(2, 0, 0), pressure: 0.4, tilt: new THREE.Vector2(), time: 100 }
];

// --- 1. FeatherCurve Entity Tests ---
console.log('\n--- 1. Testing FeatherCurve Entity ---');
const curve1 = new FeatherCurve(sampleCurvePoints, 'ribbon', 0.03, new THREE.Color(0x2288cc), 0.85, 'cel_shaded', 'curve_test_1');
assert(curve1.id === 'curve_test_1', 'FeatherCurve preserves assigned ID');
assert(curve1.profile === 'ribbon', 'FeatherCurve preserves stroke profile');
assert(curve1.points.length === sampleCurvePoints.length, 'FeatherCurve stores points array');

const curveJson = curve1.toJSON();
assert(curveJson.profile === 'ribbon', 'FeatherCurve.toJSON exports profile');
assert(curveJson.size === 0.03, 'FeatherCurve.toJSON exports size');

const restoredCurve = FeatherCurve.fromJSON(curveJson);
assert(restoredCurve.points.length === curve1.points.length, 'FeatherCurve.fromJSON restores point count');
assert(restoredCurve.color.getHexString() === '2288cc', 'FeatherCurve.fromJSON restores color');

// --- 2. StageManager & LayerGroup Tests ---
console.log('\n--- 2. Testing StageManager & LayerGroup ---');
const stage = new StageManager();
assert(stage.layers.length === 1, 'StageManager initializes with 1 default layer');
assert(stage.activeLayerIndex === 0, 'StageManager defaults activeLayerIndex to 0');

stage.addCurveToActiveLayer(curve1);
assert(stage.activeLayer.curves.length === 1, 'addCurveToActiveLayer adds curve to active layer');
assert(stage.getAllCurves().length === 1, 'getAllCurves returns 1 curve');

// Add 2 more layers
const layer2 = stage.addLayer('Sketch');
const layer3 = stage.addLayer('Inking');
assert(stage.layers.length === 3, 'addLayer increases layer count to 3');
assert(stage.activeLayerIndex === 2, 'addLayer activates newly created layer');

// Layer visibility & lock
layer2.setVisible(false);
assert(!layer2.visible, 'LayerGroup.setVisible toggles visibility');
layer2.locked = true;
assert(layer2.locked, 'LayerGroup.locked toggles lock state');

// Remove layer
stage.removeLayer(1);
assert(stage.layers.length === 2, 'removeLayer decreases layer count to 2');

// --- 3. HistoryManager Tests ---
console.log('\n--- 3. Testing HistoryManager ---');
const history = new HistoryManager();
assert(!history.canUndo(), 'HistoryManager starts with canUndo = false');
assert(!history.canRedo(), 'HistoryManager starts with canRedo = false');

let value = 10;
const testCommand = {
  execute: () => { value += 5; },
  undo: () => { value -= 5; }
};

history.execute(testCommand);
assert(value === 15, 'HistoryManager executes command forward');
assert(history.canUndo(), 'canUndo is true after command execution');

history.undo();
assert(value === 10, 'HistoryManager undoes command');
assert(history.canRedo(), 'canRedo is true after undo');

history.redo();
assert(value === 15, 'HistoryManager redoes command');

history.clear();
assert(!history.canUndo() && !history.canRedo(), 'HistoryManager.clear resets undo/redo stacks');

// --- 4. SelectionTool Tests ---
console.log('\n--- 4. Testing SelectionTool ---');
const selection = new SelectionTool(stage, history);
const testCurveA = new FeatherCurve(sampleCurvePoints, 'tube', 0.02, new THREE.Color(0xff0000));
const testCurveB = new FeatherCurve(sampleCurvePoints, 'tube', 0.02, new THREE.Color(0x00ff00));
stage.activeLayer.addCurve(testCurveA);
stage.activeLayer.addCurve(testCurveB);

selection.select(testCurveA);
assert(selection.selectedCurves.length === 1, 'SelectionTool selects single curve');
assert(selection.selectedCurves[0] === testCurveA, 'Selected curve matches target');

selection.select(testCurveB, true);
assert(selection.selectedCurves.length === 2, 'SelectionTool multiSelect adds to selection');

selection.deselect(testCurveA);
assert(selection.selectedCurves.length === 1, 'SelectionTool deselect removes curve');
assert(selection.selectedCurves[0] === testCurveB, 'Remaining curve is testCurveB');

selection.selectAll();
assert(selection.selectedCurves.length === stage.activeLayer.curves.length, 'SelectionTool.selectAll selects all active layer curves');

selection.clearSelection();
assert(selection.selectedCurves.length === 0, 'SelectionTool.clearSelection empties selection');

// Duplicate selection
selection.select(testCurveA);
const dupes = selection.duplicateSelected(new THREE.Vector3(0.5, 0.5, 0));
assert(dupes.length === 1, 'duplicateSelected creates 1 cloned curve');
assert(stage.activeLayer.curves.includes(dupes[0]), 'Duplicated curve is added to active layer');

// Undo duplication
history.undo();
assert(!stage.activeLayer.curves.includes(dupes[0]), 'Undo removes duplicated curve from active layer');

// --- 5. SymmetryManager Tests ---
console.log('\n--- 5. Testing SymmetryManager ---');
const symmetry = new SymmetryManager();
assert(symmetry.axis === 'none', 'SymmetryManager defaults to axis = none');
assert(symmetry.mirrorPoints(sampleCurvePoints).length === 0, 'mirrorPoints returns empty when axis is none');

symmetry.setAxis('x');
assert(symmetry.axis === 'x', 'SymmetryManager sets axis to x');
const mirroredX = symmetry.mirrorPoints(sampleCurvePoints);
assert(mirroredX.length === sampleCurvePoints.length, 'mirrorPoints returns matching point count');
assert(mirroredX[1].position.x === -sampleCurvePoints[1].position.x, 'mirrorPoints inverts X coordinates on X axis');

symmetry.setAxis('y');
const mirroredY = symmetry.mirrorPoints(sampleCurvePoints);
assert(mirroredY[1].position.y === -sampleCurvePoints[1].position.y, 'mirrorPoints inverts Y coordinates on Y axis');

// --- 6. SequenceManager Tests ---
console.log('\n--- 6. Testing SequenceManager ---');
const animStage = new StageManager();
animStage.addLayer('Frame 2');
animStage.addLayer('Frame 3');
const seq = new SequenceManager(animStage);
assert(seq.totalFrames === 3, 'SequenceManager detects 3 total animation frames');
assert(seq.currentFrame === 0, 'SequenceManager starts at frame 0');

seq.goToFrame(1);
assert(seq.currentFrame === 1, 'goToFrame steps to frame 1');
seq.nextFrame();
assert(seq.currentFrame === 2, 'nextFrame steps to frame 2');
seq.nextFrame();
assert(seq.currentFrame === 0, 'nextFrame loops back to frame 0');
seq.prevFrame();
assert(seq.currentFrame === 2, 'prevFrame loops back to frame 2');

console.log('\n=== ALL CORE ENGINE & SCENE TESTS PASSED SUCCESSFULLY ===');
