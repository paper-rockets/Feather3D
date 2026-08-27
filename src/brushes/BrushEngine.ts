import * as THREE from 'three';
import { BrushPreset, BRUSH_PRESETS } from './BrushPresets';
import { StrokeProfile } from '../geometry/StrokeGeometryBuilder';
import { MaterialType } from '../shaders/CustomShaderMaterials';
import { AnimatedMaterialType } from '../shaders/tslAnimatedMaterials';

export class BrushEngine {
  public activePreset: BrushPreset;
  public size: number;
  public opacity: number;
  public color: THREE.Color;
  public smoothingAlpha: number;
  public materialType: MaterialType;
  public animatedOverlay: AnimatedMaterialType | 'none' = 'none';
  public profile: StrokeProfile;
  public taperStart: boolean;
  public taperEnd: boolean;
  public pressureSensitivity: boolean = true;

  public onPresetChange?: (preset: BrushPreset) => void;
  public onAnimatedOverlayChange?: (overlay: AnimatedMaterialType | 'none') => void;

  constructor() {
    this.activePreset = BRUSH_PRESETS['pencil_hb'] || BRUSH_PRESETS['felt_pen'] || Object.values(BRUSH_PRESETS)[0];
    this.size = this.activePreset?.defaultSize ?? 0.015;
    this.opacity = this.activePreset?.defaultOpacity ?? 1.0;
    this.color = new THREE.Color(0x161726);
    this.smoothingAlpha = this.activePreset?.smoothingAlpha ?? 0.45;
    this.materialType = this.activePreset?.materialType ?? 'basic';
    this.profile = this.activePreset?.profile ?? 'ribbon';
    this.taperStart = this.activePreset?.taperStart ?? true;
    this.taperEnd = this.activePreset?.taperEnd ?? true;
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
      // Do NOT overwrite user's chosen color! Color remains completely independent.
      if (this.onPresetChange) {
        this.onPresetChange(this.activePreset);
      }
    }
  }

  public setAnimatedOverlay(overlay: AnimatedMaterialType | 'none'): void {
    this.animatedOverlay = overlay;
    if (this.onAnimatedOverlayChange) {
      this.onAnimatedOverlayChange(overlay);
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
