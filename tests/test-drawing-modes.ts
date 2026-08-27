import * as THREE from 'three';
import { StageManager } from '../src/scene/StageManager';
import { ResourceManager } from '../src/scene/ResourceManager';
import { DrawingModeManager, DrawMethod } from '../src/guides/DrawingModeManager';
import { InteractivePaperSheet } from '../src/guides/InteractivePaperSheet';
import { FeatherCurve } from '../src/scene/FeatherCurve';

function assert(condition: boolean, message: string) {
  if (!condition) {
    console.error(`[FAIL] ${message}`);
    process.exit(1);
  } else {
    console.log(`[PASS] ${message}`);
  }
}

function runDrawingModesTestSuite() {
  console.log('=== Running Drawing Modes Test Suite ===\n');

  const stageManager = new StageManager();
  const resourceManager = new ResourceManager();
  const rootGroup = new THREE.Group();
  const drawingModeManager = new DrawingModeManager(stageManager, resourceManager, rootGroup);

  const camera = new THREE.PerspectiveCamera(45, 800 / 600, 0.1, 1000);
  camera.position.set(0, 5, 10);
  camera.lookAt(0, 0, 0);
  camera.updateMatrixWorld();

  const sceneTarget = new THREE.Vector3(0, 0, 0);

  // --- 1. Testing Default Spatial Mode & Switches ---
  console.log('--- 1. Testing Spatial Mode & Switching ---');
  assert(drawingModeManager.getDrawMethod() === 'spatial', 'Default drawing method is spatial');
  assert(drawingModeManager.spatialCursorMesh.visible, 'Spatial 3D cursor mesh is visible');

  let notifiedMethod: DrawMethod | null = null;
  drawingModeManager.onMethodChange = (m) => { notifiedMethod = m; };

  drawingModeManager.setDrawMethod('touch');
  assert(drawingModeManager.getDrawMethod() === 'touch', 'setDrawMethod updates to touch');
  assert(notifiedMethod === 'touch', 'onMethodChange fires for touch');
  assert(!drawingModeManager.spatialCursorMesh.visible, 'Spatial 3D cursor mesh is hidden in touch mode');

  drawingModeManager.setDrawMethod('spatial');
  assert(drawingModeManager.getDrawMethod() === 'spatial', 'setDrawMethod updates back to spatial');
  assert(drawingModeManager.spatialCursorMesh.visible, 'Spatial 3D cursor mesh is visible again');

  // --- 2. Testing Spatial Stroke Snap Math & Depth Adjustment ---
  console.log('\n--- 2. Testing Spatial Stroke Snap Math ---');
  drawingModeManager.spatialDepth = 5.0;

  const centerNDC = new THREE.Vector2(0, 0);
  const spatialSnap = drawingModeManager.snap(centerNDC, camera, sceneTarget);
  assert(spatialSnap !== null, 'Spatial snap returns valid result');
  assert(spatialSnap?.hitTarget === 'spatial', 'Hit target is spatial');

  // Verify snapped point is exactly at spatialDepth along camera ray
  const ray = new THREE.Raycaster();
  ray.setFromCamera(centerNDC, camera);
  const expectedPoint = ray.ray.origin.clone().addScaledVector(ray.ray.direction, 5.0);
  assert(spatialSnap!.point.distanceTo(expectedPoint) < 0.001, 'Snapped point matches exact camera ray at spatialDepth');

  // Adjust depth
  drawingModeManager.adjustDepth(100.0); // deltaY = +100
  assert(drawingModeManager.spatialDepth > 5.0, 'adjustDepth increases spatialDepth on positive delta');

  drawingModeManager.adjustDepth(-200.0); // deltaY = -200
  assert(drawingModeManager.spatialDepth < 5.0, 'adjustDepth decreases spatialDepth on negative delta');

  // --- 3. Mode 1: "Draw on Touch" (Surface / Ground / Stroke Snapping) ---
  console.log('\n--- 3. Testing Mode 1: Draw on Touch ---');
  drawingModeManager.setDrawMethod('touch');

  // A. Empty scene -> Ground plane Y=0 fallback
  const groundSnap = drawingModeManager.snap(new THREE.Vector2(0, -0.2), camera, sceneTarget);
  assert(groundSnap !== null, 'Ground snap returns valid result on empty ground');
  assert(groundSnap?.hitTarget === 'ground', 'Hit target is ground');
  assert(Math.abs(groundSnap!.point.y) < 0.001, 'Ground hit Y coordinate is ~0');

  // B. Existing Curve Stroke Snapping
  const curvePoints = [
    { position: new THREE.Vector3(0, 1, 0), pressure: 0.5, tilt: new THREE.Vector2(0, 0), time: 0 },
    { position: new THREE.Vector3(0, 2, 0), pressure: 0.5, tilt: new THREE.Vector2(0, 0), time: 10 }
  ];
  const testCurve = new FeatherCurve(curvePoints, 'ribbon', 0.2);
  stageManager.activeLayer.addCurve(testCurve);
  testCurve.mesh.updateMatrixWorld(true);

  // Project curve center to NDC
  const curveCenter = new THREE.Vector3(0, 1.5, 0);
  const curveNDC3 = curveCenter.clone().project(camera);
  const curveNDC = new THREE.Vector2(curveNDC3.x, curveNDC3.y);

  const curveSnap = drawingModeManager.snap(curveNDC, camera, sceneTarget);
  assert(curveSnap !== null, 'Snaps successfully to curve stroke mesh');
  assert(curveSnap?.hitTarget === 'curve' || curveSnap?.hitTarget === 'mesh', 'Hit target is curve/mesh');
  assert(curveSnap!.point.distanceTo(curveCenter) < 0.5, 'Snapped point is close to curve geometry');

  // --- 4. Mode 2: "Paper Always Faces You" (Screen-Facing Planar Canvas) ---
  console.log('\n--- 4. Testing Mode 2: Paper Always Faces You ---');
  drawingModeManager.setDrawMethod('screen_facing');

  drawingModeManager.startStroke(new THREE.Vector2(0, 0), camera, sceneTarget);
  const screenSnap = drawingModeManager.snap(new THREE.Vector2(0, 0), camera, sceneTarget);
  assert(screenSnap !== null, 'Screen facing mode snaps to plane');
  assert(screenSnap?.hitTarget === 'screen_plane', 'Hit target is screen_plane');

  // Verify plane normal is parallel to camera view direction
  const camDir = camera.getWorldDirection(new THREE.Vector3()).normalize();
  const hitNormal = screenSnap!.normal.clone().normalize();
  assert(Math.abs(Math.abs(hitNormal.dot(camDir)) - 1.0) < 0.01, 'Screen plane normal aligns with camera view direction');

  // Orbit camera and verify plane normal updates
  camera.position.set(10, 0, 0);
  camera.lookAt(0, 0, 0);
  camera.updateMatrixWorld();
  drawingModeManager.startStroke(new THREE.Vector2(0, 0), camera, sceneTarget);

  const newCamDir = camera.getWorldDirection(new THREE.Vector3()).normalize();
  const orbitSnap = drawingModeManager.snap(new THREE.Vector2(0, 0), camera, sceneTarget);
  assert(orbitSnap !== null, 'Snap works after camera orbit');
  const newHitNormal = orbitSnap!.normal.clone().normalize();
  assert(Math.abs(Math.abs(newHitNormal.dot(newCamDir)) - 1.0) < 0.01, 'Screen plane dynamically updates with camera view angle');

  // --- 5. Mode 3: "Grab the Actual Paper" (Interactive Paper Sheet) ---
  console.log('\n--- 5. Testing Mode 3: Grab the Actual Paper ---');
  drawingModeManager.setDrawMethod('interactive_sheet');

  const paperSheet = drawingModeManager.paperSheet;
  assert(paperSheet.group.visible, 'Paper sheet is visible');

  // Reset camera to front view
  camera.position.set(0, 1.2, 5);
  camera.lookAt(0, 1.2, 0);
  camera.updateMatrixWorld();

  // Test snap onto paper sheet
  const sheetSnap = drawingModeManager.snap(new THREE.Vector2(0, 0), camera, sceneTarget);
  assert(sheetSnap !== null, 'Snap on paper sheet succeeds');
  assert(sheetSnap?.hitTarget === 'paper_sheet', 'Hit target is paper_sheet');
  assert(Math.abs(sheetSnap!.point.z - paperSheet.position.z) < 0.05, 'Point lands on paper sheet Z plane');

  // Test handle interaction
  const cornerWorldPos = new THREE.Vector3();
  paperSheet.cornerHandle.getWorldPosition(cornerWorldPos);
  const cornerNDC3 = cornerWorldPos.clone().project(camera);
  const cornerNDC = new THREE.Vector2(cornerNDC3.x, cornerNDC3.y);

  const isHovered = paperSheet.checkHandleHover(cornerNDC, camera);
  assert(isHovered, 'Paper corner handle detects hover correctly');

  const dragStarted = paperSheet.startHandleDrag(cornerNDC, camera);
  assert(dragStarted, 'Paper corner handle drag starts successfully');
  assert(paperSheet.isInteracting, 'isInteracting is true during drag');

  // Drag handle to a new position to swing the sheet
  paperSheet.updateHandleDrag(new THREE.Vector2(0.5, 0.5), camera);
  paperSheet.endHandleDrag();
  assert(!paperSheet.isInteracting, 'isInteracting is false after ending drag');

  console.log('\n=== ALL DRAWING MODES TESTS PASSED SUCCESSFULLY ===');
}

runDrawingModesTestSuite();
