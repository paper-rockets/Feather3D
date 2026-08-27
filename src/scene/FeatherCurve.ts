import * as THREE from 'three';
import { CurvePoint } from '../math/CurveMath';
import { StrokeGeometryBuilder, StrokeProfile } from '../geometry/StrokeGeometryBuilder';
import { CustomShaderMaterials, MaterialType } from '../shaders/CustomShaderMaterials';
import { AnimatedMaterialType } from '../shaders/tslAnimatedMaterials';

export interface FeatherCurveData {
  id: string;
  name: string;
  points: Array<{
    x: number;
    y: number;
    z: number;
    pressure: number;
    tiltX: number;
    tiltY: number;
    time: number;
  }>;
  profile: StrokeProfile;
  size: number;
  color: string; // hex string e.g. "#1a1a2e"
  alpha: number;
  materialType: MaterialType;
  animatedOverlay?: AnimatedMaterialType | 'none';
  taperStart: boolean;
  taperEnd: boolean;
  visible: boolean;
  locked: boolean;
}

export class FeatherCurve {
  public id: string;
  public name: string;
  public points: CurvePoint[];
  public profile: StrokeProfile;
  public size: number;
  public color: THREE.Color;
  public alpha: number;
  public materialType: MaterialType;
  public animatedOverlay: AnimatedMaterialType | 'none';
  public taperStart: boolean;
  public taperEnd: boolean;
  public visible: boolean = true;
  public locked: boolean = false;
  public mesh: THREE.Mesh;

  constructor(
    points: CurvePoint[],
    profile: StrokeProfile = 'ribbon',
    size: number = 0.02,
    color: THREE.Color = new THREE.Color(0x161726),
    alpha: number = 1.0,
    materialType: MaterialType = 'shadeless',
    id?: string,
    name?: string,
    animatedOverlay: AnimatedMaterialType | 'none' = 'none'
  ) {
    this.id = id ?? `curve_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
    this.name = name ?? `Stroke ${this.id.substr(-4)}`;
    this.points = points;
    this.profile = profile;
    this.size = size;
    this.color = color.clone();
    this.alpha = alpha;
    this.materialType = materialType;
    this.animatedOverlay = animatedOverlay;
    this.taperStart = true;
    this.taperEnd = true;

    const geometry = this.generateGeometry();
    const material = this.createCurveMaterial();

    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;
    this.mesh.userData = { curveId: this.id };
  }

  private createCurveMaterial(): THREE.Material {
    const hasOverlay = this.animatedOverlay && this.animatedOverlay !== 'none';
    return CustomShaderMaterials.createMaterial({
      type: this.materialType,
      opacity: this.alpha,
      strokeAspect: this.computeAspect(),
      animatedOverlay: hasOverlay ? (this.animatedOverlay as AnimatedMaterialType) : undefined,
      overlayBlend: 0.55
    });
  }

  public computeAspect(): number {
    if (this.points.length < 2) return 10.0;
    let length = 0;
    for (let i = 1; i < this.points.length; i++) {
      length += this.points[i].position.distanceTo(this.points[i - 1].position);
    }
    const width = this.size || 0.02;
    return Math.max(length / width, 1.0);
  }

  public generateGeometry(): THREE.BufferGeometry {
    return StrokeGeometryBuilder.buildGeometry(this.points, {
      profile: this.profile,
      size: this.size,
      color: this.color,
      alpha: this.alpha,
      taperStart: this.taperStart,
      taperEnd: this.taperEnd
    });
  }

  public updateGeometry(): void {
    if (this.mesh.geometry) {
      this.mesh.geometry.dispose();
    }
    this.mesh.geometry = this.generateGeometry();
  }

  public setMaterialType(type: MaterialType): void {
    this.materialType = type;
    if (this.mesh.material) {
      (this.mesh.material as THREE.Material).dispose();
    }
    this.mesh.material = this.createCurveMaterial();
  }

  public setAnimatedOverlay(overlay: AnimatedMaterialType | 'none'): void {
    this.animatedOverlay = overlay;
    if (this.mesh.material) {
      (this.mesh.material as THREE.Material).dispose();
    }
    this.mesh.material = this.createCurveMaterial();
  }

  public setColor(color: THREE.Color | string): void {
    if (typeof color === 'string') {
      this.color.set(color);
    } else {
      this.color.copy(color);
    }
    this.updateGeometry();
  }

  public setAlpha(alpha: number): void {
    this.alpha = alpha;
    if (this.mesh.material) {
      (this.mesh.material as any).opacity = alpha;
      (this.mesh.material as any).transparent = alpha < 1.0;
    }
    this.updateGeometry();
  }

  public setSize(size: number): void {
    this.size = size;
    this.updateGeometry();
  }

  public toJSON(): FeatherCurveData {
    return {
      id: this.id,
      name: this.name,
      points: this.points.map(p => ({
        x: p.position.x,
        y: p.position.y,
        z: p.position.z,
        pressure: p.pressure,
        tiltX: p.tilt.x,
        tiltY: p.tilt.y,
        time: p.time
      })),
      profile: this.profile,
      size: this.size,
      color: `#${this.color.getHexString()}`,
      alpha: this.alpha,
      materialType: this.materialType,
      animatedOverlay: this.animatedOverlay,
      taperStart: this.taperStart,
      taperEnd: this.taperEnd,
      visible: this.visible,
      locked: this.locked
    };
  }

  public static fromJSON(data: FeatherCurveData): FeatherCurve {
    const pts: CurvePoint[] = data.points.map(p => ({
      position: new THREE.Vector3(p.x, p.y, p.z),
      pressure: p.pressure,
      tilt: new THREE.Vector2(p.tiltX, p.tiltY),
      time: p.time
    }));

    const color = new THREE.Color(data.color);
    const curve = new FeatherCurve(
      pts,
      data.profile,
      data.size,
      color,
      data.alpha,
      data.materialType,
      data.id,
      data.name,
      data.animatedOverlay ?? 'none'
    );
    curve.taperStart = data.taperStart ?? true;
    curve.taperEnd = data.taperEnd ?? true;
    curve.visible = data.visible ?? true;
    curve.locked = data.locked ?? false;
    curve.mesh.visible = curve.visible;
    return curve;
  }

  public dispose(): void {
    if (this.mesh.geometry) {
      this.mesh.geometry.dispose();
    }
    if (this.mesh.material) {
      (this.mesh.material as THREE.Material).dispose();
    }
  }
}
