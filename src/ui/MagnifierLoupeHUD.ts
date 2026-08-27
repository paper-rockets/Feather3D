import { Engine } from '../core/Engine';

export class MagnifierLoupeHUD {
  public element: HTMLElement;
  private engine: Engine;
  public isVisible: boolean = false;
  private canvas!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;
  private infoLabel!: HTMLElement;

  constructor(engine: Engine) {
    this.engine = engine;
    this.element = document.createElement('div');
    this.element.id = 'magnifier-loupe-hud';
    this.element.className = 'magnifier-loupe';
    this.element.style.display = 'none';

    this.render();
    document.body.appendChild(this.element);
  }

  private render(): void {
    this.element.innerHTML = `
      <div class="loupe-reticle">
        <canvas id="loupe-canvas" width="100" height="100"></canvas>
        <div class="loupe-crosshair"></div>
      </div>
      <div id="loupe-info" class="loupe-info">INJECTOR LOUPE</div>
    `;

    this.canvas = this.element.querySelector('#loupe-canvas') as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d')!;
    this.infoLabel = this.element.querySelector('#loupe-info') as HTMLElement;
  }

  public updatePosition(screenX: number, screenY: number, label: string = 'SAMPLING'): void {
    this.element.style.left = `${screenX + 25}px`;
    this.element.style.top = `${screenY - 110}px`;
    this.infoLabel.textContent = label;

    // Draw magnified viewport snapshot
    if (this.engine.viewport.canvas) {
      const srcCanvas = this.engine.viewport.canvas;
      const srcX = (screenX * window.devicePixelRatio) - 15;
      const srcY = (screenY * window.devicePixelRatio) - 15;
      const srcW = 30;
      const srcH = 30;

      try {
        this.ctx.clearRect(0, 0, 100, 100);
        this.ctx.imageSmoothingEnabled = false;
        this.ctx.drawImage(srcCanvas, srcX, srcY, srcW, srcH, 0, 0, 100, 100);
      } catch (err) {
        // Ignore cross-origin issues if any
      }
    }
  }

  public show(): void {
    this.isVisible = true;
    this.element.style.display = 'flex';
  }

  public hide(): void {
    this.isVisible = false;
    this.element.style.display = 'none';
  }
}
