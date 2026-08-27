import * as THREE from 'three';
import { USDZExporter } from 'three/addons/exporters/USDZExporter.js';

export class USDZExporterService {
  public static async exportUSDZ(object: THREE.Object3D, filename: string = 'model.usdz'): Promise<void> {
    const exporter = new USDZExporter();
    const result = await exporter.parseAsync(object);
    const blob = new Blob([result as any], { type: 'model/vnd.usdz+zip' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  }
}
