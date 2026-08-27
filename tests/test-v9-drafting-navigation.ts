import * as THREE from 'three';
import { EraserTool } from '../src/brushes/EraserTool';
import { StageManager } from '../src/scene/StageManager';
import { FeatherCurve } from '../src/scene/FeatherCurve';
import { HistoryManager } from '../src/core/HistoryManager';
import { DrawShapeTool } from '../src/tools/DrawShapeTool';
import { TouchGestureManager } from '../src/core/TouchGestureManager';
import { InputManager } from '../src/core/InputManager';
import { CurvePoint } from '../src/math/CurveMath';

function assert(condition: boolean, msg: string) {
  if (!condition) {
    console.error(`[FAIL] ${msg}`);
    throw new Error(`Assertion failed: ${msg}`);
  }
  console.log(`[PASS] ${msg}`);
}

async function runTests() {
  console.log('=== RUNNING V9 DRAFTING, DUAL-STATE & GESTURAL NAVIGATION TESTS ===\n');

  // ---------------------------------------------------------------------------
  // 1. EraserTool Tests
  // ---------------------------------------------------------------------------
  console.log('--- 1. Testing EraserTool Dual Modes ---');
  const stageManager = new StageManager();
  const historyManager = new HistoryManager();
  const eraser = new EraserTool(stageManager, historyManager);

  assert(eraser.mode === 'erase', 'Default eraser mode is "erase"');
  eraser.setMode('vacuum');
  assert(eraser.mode === 'vacuum', 'setMode("vacuum") correctly updates mode');
  eraser.toggleMode();
  assert(eraser.mode === 'erase', 'toggleMode() toggles to "erase"');
  eraser.toggleMode();
  assert(eraser.mode === 'vacuum', 'toggleMode() toggles back to "vacuum"');

  // Setup test curves
  const pts1: CurvePoint[] = [
    { position: new THREE.Vector3(0, 0, 0), pressure: 0.5, tilt: new THREE.Vector2(0, 0), time: 0 },
    { position: new THREE.Vector3(1, 0, 0), pressure: 0.5, tilt: new THREE.Vector2(0, 0), time: 10 },
    { position: new THREE.Vector3(2, 0, 0), pressure: 0.5, tilt: new THREE.Vector2(0, 0), time: 20 },
    { position: new THREE.Vector3(3, 0, 0), pressure: 0.5, tilt: new THREE.Vector2(0, 0), time: 30 },
    { position: new THREE.Vector3(4, 0, 0), pressure: 0.5, tilt: new THREE.Vector2(0, 0), time: 40 }
  ];

  const curve1 = new FeatherCurve(pts1, 'ribbon', 0.05, new THREE.Color(0xff0000), 1.0, 'shadeless', 'test_curve_1');
  stageManager.addCurveToActiveLayer(curve1);
  assert(stageManager.getAllCurves().length === 1, 'Test curve added to active layer');

  // Test Vacuum Mode (purges entire continuous curve)
  eraser.setMode('vacuum');
  const vacuumResult = eraser.eraseSphere(new THREE.Vector3(2, 0, 0), 0.5);
  assert(vacuumResult === true, 'Vacuum mode erased the intersecting curve');
  assert(stageManager.getAllCurves().length === 0, 'Curve completely removed in vacuum mode');

  // Undo vacuum
  historyManager.undo();
  assert(stageManager.getAllCurves().length === 1, 'Undo restored the deleted curve');

  // Test Vector Point Erase Mode (removes point in sphere, splits curve)
  eraser.setMode('erase');
  eraser.radius = 0.6;
  const pointEraseResult = eraser.eraseSphere(new THREE.Vector3(2, 0, 0), 0.6);
  assert(pointEraseResult === true, 'Point erase mode succeeded');
  const remainingCurves = stageManager.getAllCurves();
  assert(remainingCurves.length === 2, 'Point erase split curve into 2 separate segments');
  assert(remainingCurves[0].points.length === 2, 'First split segment has 2 points');
  assert(remainingCurves[1].points.length === 2, 'Second split segment has 2 points');

  // ---------------------------------------------------------------------------
  // 2. DrawShapeTool Tests
  // ---------------------------------------------------------------------------
  console.log('\n--- 2. Testing DrawShapeTool Shape Fitting & Hold-and-Drag ---');
  const drawShape = new DrawShapeTool();

  // Test Straight Line Fitting
  const rawLinePts: CurvePoint[] = [];
  for (let i = 0; i <= 10; i++) {
    const t = i / 10;
    // Add minor hand jitter
    const jitterY = (Math.random() - 0.5) * 0.005;
    rawLinePts.push({
      position: new THREE.Vector3(t * 2, jitterY, 0),
      pressure: 0.6,
      tilt: new THREE.Vector2(0, 0),
      time: i * 16
    });
  }

  const lineFit = DrawShapeTool.recognizeAndFit(rawLinePts);
  assert(lineFit.type === 'line', 'Straight line successfully recognized');
  assert(lineFit.confidence > 0.85, 'Straight line confidence is high');
  assert(lineFit.points.length > 2, 'Fitted straight line has generated points');

  // Test Circular Arc Fitting
  const rawArcPts: CurvePoint[] = [];
  for (let i = 0; i <= 16; i++) {
    const theta = (i / 16) * Math.PI; // semicircle
    const r = 1.0;
    const jitter = (Math.random() - 0.5) * 0.01;
    rawArcPts.push({
      position: new THREE.Vector3(Math.cos(theta) * (r + jitter), Math.sin(theta) * (r + jitter), 0),
      pressure: 0.5,
      tilt: new THREE.Vector2(0, 0),
      time: i * 16
    });
  }

  const arcFit = DrawShapeTool.recognizeAndFit(rawArcPts);
  assert(arcFit.type === 'arc', 'Circular arc successfully recognized');
  assert(arcFit.points.length >= 24, 'Fitted circular arc has high-density points');

  // Test Circle Fitting
  const rawCirclePts: CurvePoint[] = [];
  for (let i = 0; i <= 24; i++) {
    const theta = (i / 24) * Math.PI * 2;
    const r = 0.8;
    rawCirclePts.push({
      position: new THREE.Vector3(Math.cos(theta) * r, 0, Math.sin(theta) * r),
      pressure: 0.5,
      tilt: new THREE.Vector2(0, 0),
      time: i * 16
    });
  }

  const circleFit = DrawShapeTool.recognizeAndFit(rawCirclePts);
  assert(circleFit.type === 'circle', 'Closed loop recognized as perfect circle');
  assert(circleFit.radius !== undefined && Math.abs(circleFit.radius - 0.8) < 0.05, 'Circle radius matched expected radius');

  // Test Hold-and-Drag dynamic adjustments
  drawShape.startStroke(rawLinePts[0], rawLinePts[0].position);
  for (let i = 1; i < rawLinePts.length; i++) {
    drawShape.addPoint(rawLinePts[i], rawLinePts[i].position);
  }

  const heldPoints = drawShape.triggerHold(rawLinePts[rawLinePts.length - 1].position);
  assert(heldPoints !== null && drawShape.isHoldActive === true, 'Hold gesture triggered regularized shape');
  assert(drawShape.currentShape?.type === 'line', 'Hold mode identified straight line');

  // Drag along line to adjust length
  const dragPos = new THREE.Vector3(4.0, 0, 0); // extend line from 2.0 to 4.0
  const adjustedLine = drawShape.updateHoldDrag(dragPos);
  assert(adjustedLine !== null && adjustedLine.length > 0, 'Hold-drag dynamically adjusted line');
  const committedLine = drawShape.commitShape();
  assert(committedLine !== null && committedLine.length > 0, 'Committed shape successfully returns adjusted points');
  assert(drawShape.isHoldActive === false, 'Hold state reset after committing shape');

  // ---------------------------------------------------------------------------
  // 3. Gestural Navigation & InputManager Tests
  // ---------------------------------------------------------------------------
  console.log('\n--- 3. Testing Gestural Navigation & S Pen Input ---');

  // Dummy HTML element mock
  const dummyElement = {
    addEventListener: () => {},
    removeEventListener: () => {},
    style: {},
    getBoundingClientRect: () => ({ left: 0, top: 0, width: 800, height: 600 })
  } as any;

  let barrelButtonPressed = false;
  let penActive = false;

  const inputManager = new InputManager(dummyElement, {
    onPointerDrawStart: () => {},
    onPointerDrawMove: () => {},
    onPointerDrawEnd: () => {},
    onStylusBarrelButton: () => {
      barrelButtonPressed = true;
    },
    onPenActiveChange: (active) => {
      penActive = active;
    }
  });

  assert(inputManager.isFingerPenMode === false, 'Finger-pen mode is disabled by default');
  inputManager.setFingerPenMode(true);
  assert(inputManager.isFingerPenMode === true, 'Finger-pen mode enabled');

  let orbitDeltaX = 0;
  let orbitDeltaY = 0;
  let doubleTapFired = false;
  let projectionToggled = false;
  let fovSwipeDelta = 0;
  let orbitPinned = false;

  const touchGestures = new TouchGestureManager(dummyElement, {
    onOneFingerOrbit: (dx, dy) => {
      orbitDeltaX = dx;
      orbitDeltaY = dy;
    },
    onOneFingerDoubleTap: () => {
      doubleTapFired = true;
    },
    onThreeFingerDoubleTap: () => {
      projectionToggled = true;
    },
    onThreeFingerSwipeVertical: (deltaY) => {
      fovSwipeDelta = deltaY;
    },
    onOneFingerHoldPinOrbit: () => {
      orbitPinned = true;
    }
  });

  assert(typeof touchGestures.setPenActive === 'function', 'TouchGestureManager exposes setPenActive');
  assert(typeof touchGestures.setFingerPenMode === 'function', 'TouchGestureManager exposes setFingerPenMode');

  console.log('\n=== ALL V9 DRAFTING & NAVIGATION TESTS PASSED SUCCESSFULLY ===');
}

runTests().catch(err => {
  console.error(err);
  process.exit(1);
});
