import * as THREE from 'three';
import { OBJExporter } from 'three/addons/exporters/OBJExporter.js';

export class OBJExporterService {
  public static exportOBJ(object: THREE.Object3D, filename: string = 'model.obj'): void {
    const exporter = new OBJExporter();
    const result = exporter.parse(object);
    const blob = new Blob([result], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  }
}
