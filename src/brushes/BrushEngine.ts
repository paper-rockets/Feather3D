import * as THREE from 'three';
import { BrushPreset, BRUSH_PRESETS } from './BrushPresets';
import { StrokeProfile } from '../geometry/StrokeGeometryBuilder';
import { MaterialType } from '../shaders/CustomShaderMaterials';

export class BrushEngine {
  public activePreset: BrushPreset;
  public size: number;
  public opacity: number;
  public color: THREE.Color;
  public smoothingAlpha: number;
  public materialType: MaterialType;
  public profile: StrokeProfile;
  public taperStart: boolean;
  public taperEnd: boolean;
  public pressureSensitivity: boolean = true;

  public onPresetChange?: (preset: BrushPreset) => void;

  constructor() {
    this.activePreset = BRUSH_PRESETS['rainbow_streak'] || BRUSH_PRESETS['pencil_hb'] || Object.values(BRUSH_PRESETS)[0];
    this.size = this.activePreset.defaultSize;
    this.opacity = this.activePreset.defaultOpacity;
    this.color = new THREE.Color(this.activePreset.colorHex || 0x1a1a2e);
    this.smoothingAlpha = this.activePreset.smoothingAlpha;
    this.materialType = this.activePreset.materialType;
    this.profile = this.activePreset.profile;
    this.taperStart = this.activePreset.taperStart;
    this.taperEnd = this.activePreset.taperEnd;
  }

  public setPreset(presetOrId: string | BrushPreset): void {
    const preset = typeof presetOrId === 'string' ? BRUSH_PRESETS[presetOrId] : presetOrId;
    if (preset) {
      this.activePreset = preset;
      this.size = preset.defaultSize;
      this.opacity = preset.defaultOpacity;
      this.smoothingAlpha = preset.smoothingAlpha;
      this.materialType = preset.materialType;
      this.profile = preset.profile;
      this.taperStart = preset.taperStart;
      this.taperEnd = preset.taperEnd;
      if (preset.colorHex) {
        this.setColor(preset.colorHex);
      }
      if (this.onPresetChange) {
        this.onPresetChange(this.activePreset);
      }
    }
  }

  public setSize(size: number): void {
    this.size = THREE.MathUtils.clamp(size, 0.002, 0.5);
  }

  public setOpacity(opacity: number): void {
    this.opacity = THREE.MathUtils.clamp(opacity, 0.05, 1.0);
  }

  public setColor(color: THREE.Color | string): void {
    if (typeof color === 'string') {
      this.color.set(color);
    } else {
      this.color.copy(color);
    }
  }

  public setMaterialType(type: MaterialType): void {
    this.materialType = type;
  }

  public setProfile(profile: StrokeProfile): void {
    this.profile = profile;
  }

  public setPressureSensitivity(enabled: boolean): void {
    this.pressureSensitivity = enabled;
  }
}
