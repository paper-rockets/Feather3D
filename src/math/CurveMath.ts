import * as THREE from 'three';

export interface CurvePoint {
  position: THREE.Vector3;
  pressure: number;
  tilt: THREE.Vector2;
  time: number;
}

export class CurveMath {
  /**
   * Exponential Moving Average (EMA) hand stabilizer for real-time streaming points.
   * alpha in [0.05, 0.95]: lower alpha = smoother/slower, higher alpha = more responsive.
   */
  public static smoothEMA(
    current: THREE.Vector3,
    target: THREE.Vector3,
    alpha: number
  ): THREE.Vector3 {
    return current.clone().lerp(target, THREE.MathUtils.clamp(alpha, 0.01, 1.0));
  }

  /**
   * Catmull-Rom centripetal spline point calculation.
   * alpha = 0.5 gives centripetal parametrization which avoids cusps and self-intersections.
   */
  public static catmullRomPoint(
    p0: THREE.Vector3,
    p1: THREE.Vector3,
    p2: THREE.Vector3,
    p3: THREE.Vector3,
    t: number,
    alpha: number = 0.5
  ): THREE.Vector3 {
    const getT = (tVal: number, pA: THREE.Vector3, pB: THREE.Vector3): number => {
      const d = pB.distanceTo(pA);
      return tVal + Math.pow(Math.max(d, 0.00001), alpha);
    };

    const t0 = 0;
    const t1 = getT(t0, p0, p1);
    const t2 = getT(t1, p1, p2);
    const t3 = getT(t2, p2, p3);

    const tCurrent = t1 + t * (t2 - t1);

    const a1 = p0.clone().multiplyScalar((t1 - tCurrent) / (t1 - t0)).add(
      p1.clone().multiplyScalar((tCurrent - t0) / (t1 - t0))
    );
    const a2 = p1.clone().multiplyScalar((t2 - tCurrent) / (t2 - t1)).add(
      p2.clone().multiplyScalar((tCurrent - t1) / (t2 - t1))
    );
    const a3 = p2.clone().multiplyScalar((t3 - tCurrent) / (t3 - t2)).add(
      p3.clone().multiplyScalar((tCurrent - t2) / (t3 - t2))
    );

    const b1 = a1.multiplyScalar((t2 - tCurrent) / (t2 - t0)).add(
      a2.clone().multiplyScalar((tCurrent - t0) / (t2 - t0))
    );
    const b2 = a2.multiplyScalar((t3 - tCurrent) / (t3 - t1)).add(
      a3.multiplyScalar((tCurrent - t1) / (t3 - t1))
    );

    return b1.multiplyScalar((t2 - tCurrent) / (t2 - t1)).add(
      b2.multiplyScalar((tCurrent - t1) / (t2 - t1))
    );
  }

  /**
   * Resamples raw curve points into a smooth dense sequence using Catmull-Rom interpolation.
   */
  public static resampleCurve(
    points: CurvePoint[],
    subdivisionsPerSegment: number = 4
  ): CurvePoint[] {
    if (points.length < 2) return [...points];
    if (points.length === 2) {
      const pA = points[0];
      const pB = points[1];
      const result: CurvePoint[] = [];
      for (let i = 0; i <= subdivisionsPerSegment; i++) {
        const u = i / subdivisionsPerSegment;
        result.push({
          position: pA.position.clone().lerp(pB.position, u),
          pressure: THREE.MathUtils.lerp(pA.pressure, pB.pressure, u),
          tilt: pA.tilt.clone().lerp(pB.tilt, u),
          time: THREE.MathUtils.lerp(pA.time, pB.time, u)
        });
      }
      return result;
    }

    const result: CurvePoint[] = [];
    const n = points.length;

    for (let i = 0; i < n - 1; i++) {
      const p0 = i > 0 ? points[i - 1] : points[i];
      const p1 = points[i];
      const p2 = points[i + 1];
      const p3 = i + 2 < n ? points[i + 2] : p2;

      const steps = Math.max(1, subdivisionsPerSegment);
      for (let step = 0; step < steps; step++) {
        const t = step / steps;
        const pos = this.catmullRomPoint(
          p0.position,
          p1.position,
          p2.position,
          p3.position,
          t,
          0.5
        );
        const pressure = THREE.MathUtils.lerp(p1.pressure, p2.pressure, t);
        const tilt = p1.tilt.clone().lerp(p2.tilt, t);
        const time = THREE.MathUtils.lerp(p1.time, p2.time, t);

        result.push({ position: pos, pressure, tilt, time });
      }
    }

    // Append end point
    const last = points[points.length - 1];
    result.push({
      position: last.position.clone(),
      pressure: last.pressure,
      tilt: last.tilt.clone(),
      time: last.time
    });

    return result;
  }

  /**
   * Douglas-Peucker point decimation to simplify dense stroke points while preserving form.
   */
  public static simplifyDouglasPeucker(
    points: CurvePoint[],
    tolerance: number = 0.005
  ): CurvePoint[] {
    if (points.length <= 2) return points;

    let maxDist = 0;
    let index = 0;
    const start = points[0].position;
    const end = points[points.length - 1].position;
    const line = new THREE.Line3(start, end);

    for (let i = 1; i < points.length - 1; i++) {
      const pt = points[i].position;
      const closest = new THREE.Vector3();
      line.closestPointToPoint(pt, true, closest);
      const dist = pt.distanceTo(closest);

      if (dist > maxDist) {
        maxDist = dist;
        index = i;
      }
    }

    if (maxDist > tolerance) {
      const left = this.simplifyDouglasPeucker(points.slice(0, index + 1), tolerance);
      const right = this.simplifyDouglasPeucker(points.slice(index), tolerance);
      return left.slice(0, left.length - 1).concat(right);
    } else {
      return [points[0], points[points.length - 1]];
    }
  }

  /**
   * Computes cumulative arc-lengths for a sequence of points.
   */
  public static computeArcLengths(points: THREE.Vector3[]): number[] {
    const lengths: number[] = [0];
    let total = 0;
    for (let i = 1; i < points.length; i++) {
      total += points[i].distanceTo(points[i - 1]);
      lengths.push(total);
    }
    return lengths;
  }
}
