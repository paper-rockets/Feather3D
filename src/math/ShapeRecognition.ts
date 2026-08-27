import * as THREE from 'three';
import { CurvePoint, CurveMath } from './CurveMath';

export type RecognizedShapeType = 'line' | 'circle' | 'rectangle' | 'polygon' | 'none';

export interface ShapeRecognitionResult {
  type: RecognizedShapeType;
  points: CurvePoint[];
  confidence: number;
}

export class ShapeRecognition {
  /**
   * Analyzes a stroke point sequence and returns a regularized geometric shape if recognized.
   */
  public static recognizeAndRegularize(
    points: CurvePoint[],
    tolerance: number = 0.15
  ): ShapeRecognitionResult {
    if (points.length < 3) {
      return { type: 'none', points, confidence: 0 };
    }

    const startPos = points[0].position;
    const endPos = points[points.length - 1].position;
    const arcLengths = CurveMath.computeArcLengths(points.map(p => p.position));
    const totalLength = arcLengths[arcLengths.length - 1];

    if (totalLength < 0.01) {
      return { type: 'none', points, confidence: 0 };
    }

    const startEndDist = startPos.distanceTo(endPos);
    const isClosed = startEndDist < totalLength * 0.25;

    const avgPressure = points.reduce((acc, p) => acc + p.pressure, 0) / points.length;
    const avgTilt = points[0].tilt.clone();

    // ── 1. Check for Straight Line ──
    if (!isClosed) {
      const line = new THREE.Line3(startPos, endPos);
      let maxDist = 0;
      for (let i = 1; i < points.length - 1; i++) {
        const closest = new THREE.Vector3();
        line.closestPointToPoint(points[i].position, true, closest);
        const d = points[i].position.distanceTo(closest);
        if (d > maxDist) maxDist = d;
      }

      if (maxDist / totalLength < tolerance) {
        // Generate clean straight line
        const numPts = 16;
        const linePts: CurvePoint[] = [];
        for (let i = 0; i <= numPts; i++) {
          const t = i / numPts;
          linePts.push({
            position: startPos.clone().lerp(endPos, t),
            pressure: avgPressure,
            tilt: avgTilt.clone(),
            time: performance.now()
          });
        }
        return { type: 'line', points: linePts, confidence: 1.0 - (maxDist / totalLength) };
      }
    }

    // ── 2. Check for Circle / Ellipse ──
    if (isClosed) {
      // Compute centroid
      const centroid = new THREE.Vector3();
      points.forEach(p => centroid.add(p.position));
      centroid.multiplyScalar(1 / points.length);

      // Compute radii from centroid
      const radii = points.map(p => p.position.distanceTo(centroid));
      const meanRadius = radii.reduce((a, b) => a + b, 0) / radii.length;
      const variance = radii.reduce((acc, r) => acc + Math.pow(r - meanRadius, 2), 0) / radii.length;
      const stdDev = Math.sqrt(variance);

      if (stdDev / meanRadius < tolerance * 1.2) {
        // Estimate best-fit plane normal using Newell's method
        const normal = new THREE.Vector3();
        for (let i = 0; i < points.length; i++) {
          const cur = points[i].position;
          const next = points[(i + 1) % points.length].position;
          normal.x += (cur.y - next.y) * (cur.z + next.z);
          normal.y += (cur.z - next.z) * (cur.x + next.x);
          normal.z += (cur.x - next.x) * (cur.y + next.y);
        }
        normal.normalize();

        // Construct orthonormal basis in circle plane
        const uVec = new THREE.Vector3().subVectors(startPos, centroid).projectOnPlane(normal).normalize();
        const vVec = new THREE.Vector3().crossVectors(normal, uVec).normalize();

        const numCirclePts = 48;
        const circlePts: CurvePoint[] = [];
        for (let i = 0; i <= numCirclePts; i++) {
          const theta = (i / numCirclePts) * Math.PI * 2;
          const pos = centroid.clone()
            .addScaledVector(uVec, Math.cos(theta) * meanRadius)
            .addScaledVector(vVec, Math.sin(theta) * meanRadius);

          circlePts.push({
            position: pos,
            pressure: avgPressure,
            tilt: avgTilt.clone(),
            time: performance.now()
          });
        }
        return { type: 'circle', points: circlePts, confidence: 1.0 - (stdDev / meanRadius) };
      }

      // ── 3. Check for Rectangle / Polygon ──
      const simplified = CurveMath.simplifyDouglasPeucker(points, totalLength * 0.08);
      if (simplified.length >= 4 && simplified.length <= 6) {
        // Form regularized polygon
        const polyPts: CurvePoint[] = [];
        const corners = simplified.map(p => p.position);
        corners[corners.length - 1] = corners[0].clone(); // close loop

        for (let i = 0; i < corners.length - 1; i++) {
          const pA = corners[i];
          const pB = corners[i + 1];
          const segSteps = 8;
          for (let s = 0; s < segSteps; s++) {
            const t = s / segSteps;
            polyPts.push({
              position: pA.clone().lerp(pB, t),
              pressure: avgPressure,
              tilt: avgTilt.clone(),
              time: performance.now()
            });
          }
        }
        polyPts.push({
          position: corners[0].clone(),
          pressure: avgPressure,
          tilt: avgTilt.clone(),
          time: performance.now()
        });

        const type: RecognizedShapeType = simplified.length === 5 ? 'rectangle' : 'polygon';
        return { type, points: polyPts, confidence: 0.85 };
      }
    }

    return { type: 'none', points, confidence: 0 };
  }

  /**
   * Generates a tensioned 3D arc between start and end vectors passing through or bowing toward an apex point.
   */
  public static createTensionArc(
    startPos: THREE.Vector3,
    endPos: THREE.Vector3,
    apexOffset: THREE.Vector3,
    tension: number = 0.5,
    pressure: number = 0.5,
    tilt: THREE.Vector2 = new THREE.Vector2(0, 0)
  ): CurvePoint[] {
    const numPts = 32;
    const result: CurvePoint[] = [];
    const mid = startPos.clone().lerp(endPos, 0.5);
    const controlPt = mid.clone().addScaledVector(apexOffset, tension);

    const quadCurve = new THREE.QuadraticBezierCurve3(startPos, controlPt, endPos);
    for (let i = 0; i <= numPts; i++) {
      const t = i / numPts;
      result.push({
        position: quadCurve.getPoint(t),
        pressure,
        tilt: tilt.clone(),
        time: performance.now()
      });
    }

    return result;
  }
}
