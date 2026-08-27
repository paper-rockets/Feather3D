import * as THREE from 'three';
import { createProceduralSky, applySkyPreset, SkyPreset } from '../shaders/tslSkyShaders';

export interface EnvironmentConfig {
  bgColor: string;
  bgImageUrl?: string;
  showGroundGrid: boolean;
  showAxes: boolean;
  gridSize: number;
  gridDivisions: number;
  gridColorCenter: string;
  gridColorGrid: string;
  ambientIntensity: number;
  directionalIntensity: number;
  sunPosition: THREE.Vector3;
  skyPreset: SkyPreset | 'off';
}

export class EnvironmentSettings {
  public config: EnvironmentConfig;
  public groundGrid: THREE.GridHelper;
  public axesHelper: THREE.AxesHelper;
  public ambientLight: THREE.AmbientLight;
  public dirLight: THREE.DirectionalLight;
  public environmentGroup: THREE.Group;
  private currentBgTexture: THREE.Texture | null = null;

  private skyMesh: THREE.Mesh | null = null;
  private skyUniforms: any = null;

  public axisLinesGroup: THREE.Group;

  constructor(config?: Partial<EnvironmentConfig>) {
    this.config = {
      bgColor: '#f5f4f0',
      showGroundGrid: true,
      showAxes: false,
      gridSize: 12,
      gridDivisions: 24,
      gridColorCenter: '#555555',
      gridColorGrid: '#999999',
      ambientIntensity: 0.8,
      directionalIntensity: 1.2,
      sunPosition: new THREE.Vector3(5, 10, 7),
      skyPreset: 'off',
      ...config
    };

    this.environmentGroup = new THREE.Group();
    this.environmentGroup.name = 'Environment';

    // High-Contrast Ground Grid
    this.groundGrid = new THREE.GridHelper(
      this.config.gridSize,
      this.config.gridDivisions,
      new THREE.Color(this.config.gridColorCenter),
      new THREE.Color(this.config.gridColorGrid)
    );
    (this.groundGrid.material as THREE.Material).opacity = 0.65;
    (this.groundGrid.material as THREE.Material).transparent = true;
    this.groundGrid.position.y = 0;
    this.groundGrid.visible = this.config.showGroundGrid;
    this.environmentGroup.add(this.groundGrid);

    // Colored 3D Center Axes (X=Red, Y=Green, Z=Blue)
    this.axisLinesGroup = new THREE.Group();
    const axisLength = 6;
    const axisConfigs: Array<[THREE.Vector3, string]> = [
      [new THREE.Vector3(axisLength, 0, 0), '#e03040'],
      [new THREE.Vector3(0, axisLength, 0), '#22bb55'],
      [new THREE.Vector3(0, 0, axisLength), '#3377ee']
    ];
    axisConfigs.forEach(([tip, col]) => {
      const gPos = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), tip]);
      this.axisLinesGroup.add(new THREE.Line(gPos, new THREE.LineBasicMaterial({ color: col, transparent: true, opacity: 0.7 })));
      const gNeg = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), tip.clone().negate()]);
      this.axisLinesGroup.add(new THREE.Line(gNeg, new THREE.LineBasicMaterial({ color: col, transparent: true, opacity: 0.25 })));
    });
    this.environmentGroup.add(this.axisLinesGroup);

    // Axes Helper
    this.axesHelper = new THREE.AxesHelper(1.5);
    this.axesHelper.visible = this.config.showAxes;
    this.environmentGroup.add(this.axesHelper);

    // Ambient Light & Directional Light are managed directly by AirbreathEngine to prevent double-lighting
    this.ambientLight = new THREE.AmbientLight(0xffffff, 0);
    this.dirLight = new THREE.DirectionalLight(0xffffff, 0);
    this.dirLight.position.copy(this.config.sunPosition);
  }

  public setBgColor(hex: string, scene: THREE.Scene): void {
    this.config.bgColor = hex;
    this.clearBgTexture(scene);
    scene.background = new THREE.Color(hex);
  }

  public setBgTexture(url: string, scene: THREE.Scene): void {
    const loader = new THREE.TextureLoader();
    loader.load(url, (texture) => {
      if (this.currentBgTexture) {
        this.currentBgTexture.dispose();
      }
      this.currentBgTexture = texture;
      this.config.bgImageUrl = url;
      scene.background = texture;
    });
  }

  public clearBgTexture(scene: THREE.Scene): void {
    if (this.currentBgTexture) {
      this.currentBgTexture.dispose();
      this.currentBgTexture = null;
    }
    this.config.bgImageUrl = undefined;
    scene.background = new THREE.Color(this.config.bgColor);
  }

  public toggleGroundGrid(visible?: boolean): boolean {
    this.config.showGroundGrid = visible ?? !this.groundGrid.visible;
    this.groundGrid.visible = this.config.showGroundGrid;
    return this.config.showGroundGrid;
  }

  public toggleAxes(visible?: boolean): boolean {
    this.config.showAxes = visible ?? !this.axesHelper.visible;
    this.axesHelper.visible = this.config.showAxes;
    return this.config.showAxes;
  }

  public setGridSize(size: number, divisions: number): void {
    this.config.gridSize = size;
    this.config.gridDivisions = divisions;
    this.environmentGroup.remove(this.groundGrid);
    this.groundGrid.geometry.dispose();
    this.groundGrid = new THREE.GridHelper(
      size,
      divisions,
      new THREE.Color(this.config.gridColorCenter),
      new THREE.Color(this.config.gridColorGrid)
    );
    this.groundGrid.visible = this.config.showGroundGrid;
    this.environmentGroup.add(this.groundGrid);
  }

  public setSkyPreset(preset: SkyPreset | 'off', scene: THREE.Scene): void {
    this.config.skyPreset = preset;

    if (preset === 'off') {
      this.removeSky(scene);
      scene.background = new THREE.Color(this.config.bgColor);
      return;
    }

    if (!this.skyMesh) {
      const sky = createProceduralSky();
      this.skyMesh = sky.mesh;
      this.skyUniforms = sky.uniforms;
      scene.add(this.skyMesh);
    }

    applySkyPreset(this.skyUniforms, preset);
    scene.background = null;
  }

  public removeSky(scene: THREE.Scene): void {
    if (this.skyMesh) {
      scene.remove(this.skyMesh);
      this.skyMesh.geometry.dispose();
      (this.skyMesh.material as THREE.Material).dispose();
      this.skyMesh = null;
      this.skyUniforms = null;
    }
  }

  public updateSkyPosition(cameraPos: THREE.Vector3): void {
    if (this.skyMesh) {
      this.skyMesh.position.copy(cameraPos);
    }
  }

  public updateSkyTime(delta: number): void {
    if (this.skyUniforms) {
      this.skyUniforms.uTime.value += delta;
    }
  }

  public get isSkyActive(): boolean {
    return this.skyMesh !== null;
  }
}
