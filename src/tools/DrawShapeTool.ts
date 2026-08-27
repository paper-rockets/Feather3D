import * as THREE from 'three';
import { CurvePoint, CurveMath } from '../math/CurveMath';

export type RecognizedShapeType = 'line' | 'arc' | 'circle' | 'rectangle' | 'none';

export interface ShapeFitData {
  type: RecognizedShapeType;
  confidence: number;
  points: CurvePoint[];
  startPoint: THREE.Vector3;
  endPoint: THREE.Vector3;
  midPoint: THREE.Vector3;
  center?: THREE.Vector3;
  radius?: number;
  normal?: THREE.Vector3;
  uBasis?: THREE.Vector3;
  vBasis?: THREE.Vector3;
  sweepAngle?: number;
  tension?: number;
  length?: number;
  initialApexOffset?: THREE.Vector3;
  avgPressure: number;
  avgTilt: THREE.Vector2;
}

export class DrawShapeTool {
  public isHoldActive: boolean = false;
  public isAdjusting: boolean = false;
  public currentShape: ShapeFitData | null = null;

  private rawPoints: CurvePoint[] = [];
  private dragAnchor3D: THREE.Vector3 | null = null;
  private lastFittedPoints: CurvePoint[] = [];

  public onHoldTriggered?: (fittedPoints: CurvePoint[], shape: ShapeFitData) => void;
  public onHoldAdjusted?: (adjustedPoints: CurvePoint[], shape: ShapeFitData) => void;

  constructor() {}

  // ---------------------------------------------------------------------------
  // Static Shape Fitting & Recognition Helpers
  // ---------------------------------------------------------------------------

  /**
   * Generates a regularized straight 3D line segment between startPos and endPos.
   */
  public static fitStraightLine(
    startPos: THREE.Vector3,
    endPos: THREE.Vector3,
    numSamples: number = 24,
    pressure: number = 0.5,
    tilt: THREE.Vector2 = new THREE.Vector2(0, 0)
  ): CurvePoint[] {
    const result: CurvePoint[] = [];
    const count = Math.max(2, numSamples);
    for (let i = 0; i <= count; i++) {
      const t = i / count;
      result.push({
        position: startPos.clone().lerp(endPos, t),
        pressure,
        tilt: tilt.clone(),
        time: performance.now()
      });
    }
    return result;
  }

  /**
   * Generates a circular arc passing from startPos through apexPos to endPos,
   * or tensioned quadratic bezier representation.
   */
  public static fitCircularArc(
    startPos: THREE.Vector3,
    apexPos: THREE.Vector3,
    endPos: THREE.Vector3,
    tension: number = 1.0,
    numSamples: number = 36,
    pressure: number = 0.5,
    tilt: THREE.Vector2 = new THREE.Vector2(0, 0)
  ): CurvePoint[] {
    const chordMid = startPos.clone().lerp(endPos, 0.5);
    const apexOffset = apexPos.clone().sub(chordMid).multiplyScalar(tension);
    const controlPoint = chordMid.clone().add(apexOffset.multiplyScalar(2.0));

    const quadCurve = new THREE.QuadraticBezierCurve3(startPos, controlPoint, endPos);
    const result: CurvePoint[] = [];
    const count = Math.max(4, numSamples);

    for (let i = 0; i <= count; i++) {
      const t = i / count;
      result.push({
        position: quadCurve.getPoint(t),
        pressure,
        tilt: tilt.clone(),
        time: performance.now()
      });
    }
    return result;
  }

  /**
   * Generates a regularized 3D circular ring with specified center, radius, and plane normal.
   */
  public static fitCircle(
    center: THREE.Vector3,
    radius: number,
    normal: THREE.Vector3 = new THREE.Vector3(0, 1, 0),
    numSamples: number = 48,
    pressure: number = 0.5,
    tilt: THREE.Vector2 = new THREE.Vector2(0, 0)
  ): CurvePoint[] {
    const norm = normal.clone().normalize();
    let uAxis = new THREE.Vector3(1, 0, 0);
    if (Math.abs(norm.dot(uAxis)) > 0.9) {
      uAxis = new THREE.Vector3(0, 0, 1);
    }
    uAxis.projectOnPlane(norm).normalize();
    const vAxis = new THREE.Vector3().crossVectors(norm, uAxis).normalize();

    const result: CurvePoint[] = [];
    const count = Math.max(8, numSamples);

    for (let i = 0; i <= count; i++) {
      const theta = (i / count) * Math.PI * 2;
      const pos = center.clone()
        .addScaledVector(uAxis, Math.cos(theta) * radius)
        .addScaledVector(vAxis, Math.sin(theta) * radius);

      result.push({
        position: pos,
        pressure,
        tilt: tilt.clone(),
        time: performance.now()
      });
    }
    return result;
  }

  /**
   * Analyzes a sequence of stroke points and returns fitted shape parameters and regularized points.
   */
  public static recognizeAndFit(
    points: CurvePoint[],
    tolerance: number = 0.18
  ): ShapeFitData {
    if (points.length < 3) {
      const p0 = points[0]?.position || new THREE.Vector3();
      const p1 = points[points.length - 1]?.position || p0;
      return {
        type: 'none',
        confidence: 0,
        points,
        startPoint: p0,
        endPoint: p1,
        midPoint: p0.clone().lerp(p1, 0.5),
        avgPressure: 0.5,
        avgTilt: new THREE.Vector2(0, 0)
      };
    }

    const startPos = points[0].position.clone();
    const endPos = points[points.length - 1].position.clone();
    const arcLengths = CurveMath.computeArcLengths(points.map(p => p.position));
    const totalLength = arcLengths[arcLengths.length - 1];

    const avgPressure = points.reduce((acc, p) => acc + p.pressure, 0) / points.length;
    const avgTilt = points[0].tilt.clone();

    if (totalLength < 0.005) {
      return {
        type: 'none',
        confidence: 0,
        points,
        startPoint: startPos,
        endPoint: endPos,
        midPoint: startPos.clone().lerp(endPos, 0.5),
        avgPressure,
        avgTilt
      };
    }

    const chordDist = startPos.distanceTo(endPos);
    const isClosed = chordDist < totalLength * 0.28;

    // --- 1. Check for Circle (Closed Stroke) ---
    if (isClosed) {
      const centroid = new THREE.Vector3();
      points.forEach(p => centroid.add(p.position));
      centroid.multiplyScalar(1 / points.length);

      const radii = points.map(p => p.position.distanceTo(centroid));
      const meanRadius = radii.reduce((a, b) => a + b, 0) / radii.length;
      const variance = radii.reduce((acc, r) => acc + Math.pow(r - meanRadius, 2), 0) / radii.length;
      const stdDev = Math.sqrt(variance);

      if (stdDev / meanRadius < tolerance * 1.3) {
        // Plane normal via Newell's method
        const normal = new THREE.Vector3();
        for (let i = 0; i < points.length; i++) {
          const cur = points[i].position;
          const next = points[(i + 1) % points.length].position;
          normal.x += (cur.y - next.y) * (cur.z + next.z);
          normal.y += (cur.z - next.z) * (cur.x + next.x);
          normal.z += (cur.x - next.x) * (cur.y + next.y);
        }
        if (normal.lengthSq() < 1e-6) normal.set(0, 1, 0);
        normal.normalize();

        const circlePts = DrawShapeTool.fitCircle(
          centroid,
          meanRadius,
          normal,
          48,
          avgPressure,
          avgTilt
        );

        return {
          type: 'circle',
          confidence: Math.max(0, 1.0 - (stdDev / meanRadius)),
          points: circlePts,
          startPoint: circlePts[0].position.clone(),
          endPoint: circlePts[circlePts.length - 1].position.clone(),
          midPoint: centroid.clone(),
          center: centroid,
          radius: meanRadius,
          normal,
          avgPressure,
          avgTilt
        };
      }
    }

    // --- 2. Check for Straight Line ---
    if (!isClosed) {
      const line = new THREE.Line3(startPos, endPos);
      let maxDist = 0;
      let maxDistIdx = 1;
      for (let i = 1; i < points.length - 1; i++) {
        const closest = new THREE.Vector3();
        line.closestPointToPoint(points[i].position, true, closest);
        const d = points[i].position.distanceTo(closest);
        if (d > maxDist) {
          maxDist = d;
          maxDistIdx = i;
        }
      }

      const devRatio = maxDist / totalLength;
      if (devRatio < tolerance) {
        const linePts = DrawShapeTool.fitStraightLine(
          startPos,
          endPos,
          24,
          avgPressure,
          avgTilt
        );

        return {
          type: 'line',
          confidence: Math.max(0, 1.0 - devRatio),
          points: linePts,
          startPoint: startPos,
          endPoint: endPos,
          midPoint: startPos.clone().lerp(endPos, 0.5),
          length: chordDist,
          avgPressure,
          avgTilt
        };
      }

      // --- 3. Check for Perfect Circular Arc ---
      const apexPos = points[maxDistIdx].position.clone();
      const chordMid = startPos.clone().lerp(endPos, 0.5);
      const apexDist = apexPos.distanceTo(chordMid);

      if (apexDist > totalLength * 0.05) {
        const apexOffset = apexPos.clone().sub(chordMid);
        const arcPts = DrawShapeTool.fitCircularArc(
          startPos,
          apexPos,
          endPos,
          1.0,
          36,
          avgPressure,
          avgTilt
        );

        return {
          type: 'arc',
          confidence: 0.88,
          points: arcPts,
          startPoint: startPos,
          endPoint: endPos,
          midPoint: apexPos,
          initialApexOffset: apexOffset,
          tension: 1.0,
          length: totalLength,
          avgPressure,
          avgTilt
        };
      }
    }

    return {
      type: 'none',
      confidence: 0,
      points,
      startPoint: startPos,
      endPoint: endPos,
      midPoint: startPos.clone().lerp(endPos, 0.5),
      avgPressure,
      avgTilt
    };
  }

  // ---------------------------------------------------------------------------
  // Instance Stroke Lifecycle & Hold-and-Drag State Management
  // ---------------------------------------------------------------------------

  /**
   * Begins tracking a new stroke for shape recognition and hold gestures.
   */
  public startStroke(pt: CurvePoint, worldPos: THREE.Vector3): void {
    this.isHoldActive = false;
    this.isAdjusting = false;
    this.currentShape = null;
    this.dragAnchor3D = worldPos.clone();
    this.rawPoints = [{
      position: worldPos.clone(),
      pressure: pt.pressure,
      tilt: pt.tilt.clone(),
      time: pt.time
    }];
    this.lastFittedPoints = [];
  }

  /**
   * Adds an incoming point to the live raw stroke.
   */
  public addPoint(pt: CurvePoint, worldPos: THREE.Vector3): void {
    if (this.isHoldActive) return;

    this.rawPoints.push({
      position: worldPos.clone(),
      pressure: pt.pressure,
      tilt: pt.tilt.clone(),
      time: pt.time
    });
    this.dragAnchor3D = worldPos.clone();
  }

  /**
   * Triggers the hold gesture, converting the raw stroke into a recognized regularized shape
   * and entering hold-and-drag adjustment mode.
   */
  public triggerHold(worldPos?: THREE.Vector3): CurvePoint[] | null {
    if (this.rawPoints.length < 3) return null;

    const shape = DrawShapeTool.recognizeAndFit(this.rawPoints);
    if (shape.type === 'none') {
      return null;
    }

    this.isHoldActive = true;
    this.isAdjusting = true;
    this.currentShape = shape;
    if (worldPos) {
      this.dragAnchor3D = worldPos.clone();
    }
    this.lastFittedPoints = shape.points;

    if (this.onHoldTriggered) {
      this.onHoldTriggered(shape.points, shape);
    }

    return shape.points;
  }

  /**
   * Dynamically adjusts line tension, segment length, and arc radius during hold-and-drag.
   */
  public updateHoldDrag(currentWorldPos: THREE.Vector3): CurvePoint[] | null {
    if (!this.isHoldActive || !this.currentShape || !this.dragAnchor3D) {
      return null;
    }

    const shape = this.currentShape;
    const dragDelta = currentWorldPos.clone().sub(this.dragAnchor3D);

    if (shape.type === 'line') {
      // Adjust segment length and line orientation dynamically
      const newEnd = shape.endPoint.clone().add(dragDelta);
      const updatedPts = DrawShapeTool.fitStraightLine(
        shape.startPoint,
        newEnd,
        24,
        shape.avgPressure,
        shape.avgTilt
      );
      this.lastFittedPoints = updatedPts;
      if (this.onHoldAdjusted) this.onHoldAdjusted(updatedPts, shape);
      return updatedPts;
    }

    if (shape.type === 'arc') {
      // Adjust arc tension, sagitta height, and arc radius dynamically
      const initialApex = shape.initialApexOffset
        ? shape.startPoint.clone().lerp(shape.endPoint, 0.5).add(shape.initialApexOffset)
        : shape.midPoint;

      const newApex = initialApex.clone().add(dragDelta);
      const updatedPts = DrawShapeTool.fitCircularArc(
        shape.startPoint,
        newApex,
        shape.endPoint,
        1.0,
        36,
        shape.avgPressure,
        shape.avgTilt
      );
      this.lastFittedPoints = updatedPts;
      if (this.onHoldAdjusted) this.onHoldAdjusted(updatedPts, shape);
      return updatedPts;
    }

    if (shape.type === 'circle' && shape.center) {
      // Adjust circle radius dynamically based on distance from center
      const newRadius = Math.max(0.01, currentWorldPos.distanceTo(shape.center));
      const updatedPts = DrawShapeTool.fitCircle(
        shape.center,
        newRadius,
        shape.normal || new THREE.Vector3(0, 1, 0),
        48,
        shape.avgPressure,
        shape.avgTilt
      );
      this.lastFittedPoints = updatedPts;
      if (this.onHoldAdjusted) this.onHoldAdjusted(updatedPts, shape);
      return updatedPts;
    }

    return this.lastFittedPoints;
  }

  /**
   * Commits the adjusted or fitted shape curve upon releasing pointer.
   */
  public commitShape(): CurvePoint[] | null {
    if (!this.isHoldActive && !this.currentShape) {
      this.cancel();
      return null;
    }

    const finalPts = this.lastFittedPoints.length > 0
      ? this.lastFittedPoints
      : (this.currentShape ? this.currentShape.points : null);

    this.cancel();
    return finalPts;
  }

  /**
   * Resets internal state without committing.
   */
  public cancel(): void {
    this.isHoldActive = false;
    this.isAdjusting = false;
    this.currentShape = null;
    this.dragAnchor3D = null;
    this.rawPoints = [];
    this.lastFittedPoints = [];
  }
}
