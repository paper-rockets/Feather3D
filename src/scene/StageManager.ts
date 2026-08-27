import * as THREE from 'three';
import { LayerGroup, LayerGroupData } from './LayerGroup';
import { FeatherCurve } from './FeatherCurve';

export class StageManager {
  public rootGroup: THREE.Group;
  public layers: LayerGroup[] = [];
  public activeLayerIndex: number = 0;
  public selectedCurveId: string | null = null;

  constructor() {
    this.rootGroup = new THREE.Group();
    this.rootGroup.name = 'Stage';

    // Create default initial layer
    const defaultLayer = new LayerGroup('Layer 1');
    this.layers.push(defaultLayer);
    this.rootGroup.add(defaultLayer.group);
  }

  public get activeLayer(): LayerGroup {
    return this.layers[this.activeLayerIndex] || this.layers[0];
  }

  public addLayer(name?: string): LayerGroup {
    const layerName = name || `Layer ${this.layers.length + 1}`;
    const newLayer = new LayerGroup(layerName);
    this.layers.push(newLayer);
    this.rootGroup.add(newLayer.group);
    this.activeLayerIndex = this.layers.length - 1;
    return newLayer;
  }

  public removeLayer(index: number): boolean {
    if (this.layers.length <= 1) return false; // Prevent removing the only remaining layer
    if (index >= 0 && index < this.layers.length) {
      const removed = this.layers[index];
      this.rootGroup.remove(removed.group);
      removed.dispose();
      this.layers.splice(index, 1);
      this.activeLayerIndex = Math.min(this.activeLayerIndex, this.layers.length - 1);
      return true;
    }
    return false;
  }

  public setActiveLayer(index: number): void {
    if (index >= 0 && index < this.layers.length) {
      this.activeLayerIndex = index;
    }
  }

  public addCurveToActiveLayer(curve: FeatherCurve): void {
    this.activeLayer.addCurve(curve);
  }

  public removeCurve(curveId: string): FeatherCurve | null {
    for (const layer of this.layers) {
      const removed = layer.removeCurve(curveId);
      if (removed) return removed;
    }
    return null;
  }

  public findCurveById(curveId: string): FeatherCurve | null {
    for (const layer of this.layers) {
      const found = layer.curves.find(c => c.id === curveId);
      if (found) return found;
    }
    return null;
  }

  public getAllCurves(): FeatherCurve[] {
    const all: FeatherCurve[] = [];
    this.layers.forEach(l => all.push(...l.curves));
    return all;
  }

  public toJSON(): LayerGroupData[] {
    return this.layers.map(l => l.toJSON());
  }

  public clear(): void {
    this.layers.forEach(l => {
      this.rootGroup.remove(l.group);
      l.dispose();
    });
    this.layers = [];
    const defaultLayer = new LayerGroup('Layer 1');
    this.layers.push(defaultLayer);
    this.rootGroup.add(defaultLayer.group);
    this.activeLayerIndex = 0;
    this.selectedCurveId = null;
  }
}
