import * as THREE from 'three';
import { GLTFExporter } from 'three/addons/exporters/GLTFExporter.js';

export class GLTFExporterService {
  /**
   * Exports an object or group to GLB binary.
   */
  public static exportGLB(object: THREE.Object3D, filename: string = 'model.glb'): Promise<void> {
    return new Promise((resolve, reject) => {
      const exporter = new GLTFExporter();
      exporter.parse(
        object,
        (gltf) => {
          const blob = new Blob([gltf as ArrayBuffer], { type: 'model/gltf-binary' });
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = filename;
          link.click();
          URL.revokeObjectURL(url);
          resolve();
        },
        (error) => reject(error),
        { binary: true }
      );
    });
  }
}
