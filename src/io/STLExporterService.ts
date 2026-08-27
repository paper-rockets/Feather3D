import * as THREE from 'three';
import { STLExporter } from 'three/addons/exporters/STLExporter.js';

export class STLExporterService {
  public static exportSTL(object: THREE.Object3D, filename: string = 'model.stl'): void {
    const exporter = new STLExporter();
    const result = exporter.parse(object, { binary: true });
    const blob = new Blob([result as any], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  }
}
