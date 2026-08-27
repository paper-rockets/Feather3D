import * as THREE from 'three';
import { FeatherCurve, FeatherCurveData } from './FeatherCurve';

export interface LayerGroupData {
  id: string;
  name: string;
  visible: boolean;
  locked: boolean;
  opacity: number;
  curves: FeatherCurveData[];
}

export class LayerGroup {
  public id: string;
  public name: string;
  public visible: boolean = true;
  public locked: boolean = false;
  public opacity: number = 1.0;
  public curves: FeatherCurve[] = [];
  public loftedMeshes: THREE.Mesh[] = [];
  public group: THREE.Group;

  constructor(name: string = 'Layer 1', id?: string) {
    this.id = id ?? `layer_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
    this.name = name;
    this.group = new THREE.Group();
    this.group.name = this.id;
  }

  public addCurve(curve: FeatherCurve): void {
    this.curves.push(curve);
    this.group.add(curve.mesh);
  }

  public removeCurve(curveId: string): FeatherCurve | null {
    const idx = this.curves.findIndex(c => c.id === curveId);
    if (idx !== -1) {
      const curve = this.curves[idx];
      this.curves.splice(idx, 1);
      this.group.remove(curve.mesh);
      return curve;
    }
    return null;
  }

  public addLoftedMesh(mesh: THREE.Mesh): void {
    this.loftedMeshes.push(mesh);
    this.group.add(mesh);
  }

  public setVisible(visible: boolean): void {
    this.visible = visible;
    this.group.visible = visible;
  }

  public setOpacity(opacity: number): void {
    this.opacity = opacity;
    this.curves.forEach(c => {
      if (c.mesh.material && (c.mesh.material as any).uniforms?.uOpacity) {
        (c.mesh.material as any).uniforms.uOpacity.value = c.alpha * opacity;
      }
    });
  }

  public toJSON(): LayerGroupData {
    return {
      id: this.id,
      name: this.name,
      visible: this.visible,
      locked: this.locked,
      opacity: this.opacity,
      curves: this.curves.map(c => c.toJSON())
    };
  }

  public dispose(): void {
    this.curves.forEach(c => c.dispose());
    this.loftedMeshes.forEach(m => {
      m.geometry.dispose();
      if (Array.isArray(m.material)) m.material.forEach(mat => mat.dispose());
      else m.material.dispose();
    });
    this.curves = [];
    this.loftedMeshes = [];
  }
}
