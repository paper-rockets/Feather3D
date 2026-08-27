import * as THREE from 'three';

export class ImageRenderer {
  /**
   * Captures high-res transparent PNG from renderer.
   */
  // WEBGPU-MIGRATION: PNG capture still uses the synchronous WebGL render() +
  // canvas.toDataURL() path. Under WebGPURenderer this must move to
  // renderer.renderAsync() followed by readRenderTargetPixelsAsync() (or an
  // offscreen render target). Tracked for the export phase; type widened so the
  // call site compiles against the WebGPURenderer.
  public static capturePNG(
    renderer: THREE.WebGPURenderer,
    scene: THREE.Scene,
    camera: THREE.Camera,
    multiplier: number = 2,
    filename: string = 'feather_render.png'
  ): void {
    const origSize = new THREE.Vector2();
    renderer.getSize(origSize);
    const origDpr = renderer.getPixelRatio();

    const targetWidth = origSize.x * multiplier;
    const targetHeight = origSize.y * multiplier;

    renderer.setPixelRatio(1);
    renderer.setSize(targetWidth, targetHeight, false);
    renderer.render(scene, camera);

    const dataUrl = renderer.domElement.toDataURL('image/png');

    // Restore original size
    renderer.setPixelRatio(origDpr);
    renderer.setSize(origSize.x, origSize.y, true);
    renderer.render(scene, camera);

    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = filename;
    link.click();
  }
}
