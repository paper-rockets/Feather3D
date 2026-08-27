import { StageManager } from '../scene/StageManager';
import { LayerGroup, LayerGroupData } from '../scene/LayerGroup';
import { FeatherCurve, FeatherCurveData } from '../scene/FeatherCurve';
import { EnvironmentSettings, EnvironmentConfig } from '../scene/EnvironmentSettings';
import { Viewport } from '../core/Viewport';

export interface FeatherProjectFile {
  format: 'wandrlust3d' | 'feather3d';
  version: '1.0.0';
  name: string;
  created: number;
  modified: number;
  environment: EnvironmentConfig;
  camera: {
    target: { x: number; y: number; z: number };
    theta: number;
    phi: number;
    radius: number;
  };
  layers: LayerGroupData[];
}

export class FeatherProjectSerializer {
  private static DB_NAME = 'Feather3D_DB';
  private static STORE_NAME = 'projects';

  /**
   * Serializes the current scene to a JSON string.
   */
  public static serialize(
    stageManager: StageManager,
    environment: EnvironmentSettings,
    viewport: Viewport,
    projectName: string = 'Untitled Project'
  ): string {
    const project: FeatherProjectFile = {
      format: 'wandrlust3d',
      version: '1.0.0',
      name: projectName,
      created: Date.now(),
      modified: Date.now(),
      environment: { ...environment.config },
      camera: {
        target: { x: viewport.target.x, y: viewport.target.y, z: viewport.target.z },
        theta: viewport.theta,
        phi: viewport.phi,
        radius: viewport.radius
      },
      layers: stageManager.toJSON()
    };

    return JSON.stringify(project, null, 2);
  }

  /**
   * Deserializes a JSON project file and reconstructs the scene.
   */
  public static deserialize(
    jsonString: string,
    stageManager: StageManager,
    environment: EnvironmentSettings,
    viewport: Viewport
  ): void {
    const project: FeatherProjectFile = JSON.parse(jsonString);
    if (project.format !== 'wandrlust3d' && project.format !== 'feather3d' && !project.layers) {
      throw new Error('Invalid Wandrlust 3D project file');
    }

    stageManager.clear();

    // Rebuild layers and curves
    if (project.layers && project.layers.length > 0) {
      project.layers.forEach((layerData, idx) => {
        const layer = idx === 0 ? stageManager.layers[0] : stageManager.addLayer(layerData.name);
        layer.name = layerData.name;
        layer.setVisible(layerData.visible ?? true);
        layer.locked = layerData.locked ?? false;
        layer.setOpacity(layerData.opacity ?? 1.0);

        if (layerData.curves) {
          layerData.curves.forEach((cData: FeatherCurveData) => {
            const curve = FeatherCurve.fromJSON(cData);
            layer.addCurve(curve);
          });
        }
      });
    }

    // Restore Camera
    if (project.camera) {
      viewport.target.set(
        project.camera.target.x,
        project.camera.target.y,
        project.camera.target.z
      );
      viewport.theta = project.camera.theta;
      viewport.phi = project.camera.phi;
      viewport.radius = project.camera.radius;
      viewport.updateCameraPosition();
    }
  }

  /**
   * Triggers browser download of `.feather` project file.
   */
  public static downloadFile(jsonString: string, filename: string = 'project.feather'): void {
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  }
}
