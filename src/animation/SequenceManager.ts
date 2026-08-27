import { StageManager } from '../scene/StageManager';

export class SequenceManager {
  private stageManager: StageManager;
  public currentFrame: number = 0;
  public isPlaying: boolean = false;
  public fps: number = 12;
  public isLooping: boolean = true;
  public onionSkinEnabled: boolean = false;
  private timerId: number | null = null;

  public onFrameChange?: (frameIndex: number, totalFrames: number) => void;

  constructor(stageManager: StageManager) {
    this.stageManager = stageManager;
  }

  public get totalFrames(): number {
    return Math.max(1, this.stageManager.layers.length);
  }

  public goToFrame(index: number): void {
    if (this.stageManager.layers.length === 0) return;

    this.currentFrame = Math.max(0, Math.min(index, this.stageManager.layers.length - 1));
    this.stageManager.setActiveLayer(this.currentFrame);
    this.updateLayerVisibilities();

    if (this.onFrameChange) {
      this.onFrameChange(this.currentFrame, this.totalFrames);
    }
  }

  public nextFrame(): void {
    let next = this.currentFrame + 1;
    if (next >= this.stageManager.layers.length) {
      if (this.isLooping) next = 0;
      else {
        this.pause();
        return;
      }
    }
    this.goToFrame(next);
  }

  public prevFrame(): void {
    let prev = this.currentFrame - 1;
    if (prev < 0) {
      if (this.isLooping) prev = this.stageManager.layers.length - 1;
      else prev = 0;
    }
    this.goToFrame(prev);
  }

  public play(): void {
    if (this.isPlaying) return;
    this.isPlaying = true;

    const intervalMs = 1000 / this.fps;
    this.timerId = window.setInterval(() => {
      this.nextFrame();
    }, intervalMs);
  }

  public pause(): void {
    this.isPlaying = false;
    if (this.timerId !== null) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  public togglePlay(): boolean {
    if (this.isPlaying) this.pause();
    else this.play();
    return this.isPlaying;
  }

  public setFPS(fps: number): void {
    this.fps = Math.max(1, Math.min(24, fps));
    if (this.isPlaying) {
      this.pause();
      this.play();
    }
  }

  public toggleOnionSkin(): boolean {
    this.onionSkinEnabled = !this.onionSkinEnabled;
    this.updateLayerVisibilities();
    return this.onionSkinEnabled;
  }

  public addFrame(): void {
    const newLayer = this.stageManager.addLayer(`Frame ${this.totalFrames + 1}`);
    this.goToFrame(this.stageManager.layers.length - 1);
  }

  private updateLayerVisibilities(): void {
    const total = this.stageManager.layers.length;

    this.stageManager.layers.forEach((layer, idx) => {
      if (idx === this.currentFrame) {
        layer.setVisible(true);
        layer.setOpacity(1.0);
      } else if (this.onionSkinEnabled && (idx === this.currentFrame - 1 || (idx === total - 1 && this.currentFrame === 0 && this.isLooping))) {
        // Previous Frame (Onion skin red/semi-transparent)
        layer.setVisible(true);
        layer.setOpacity(0.3);
      } else if (this.onionSkinEnabled && (idx === this.currentFrame + 1 || (idx === 0 && this.currentFrame === total - 1 && this.isLooping))) {
        // Next Frame (Onion skin green/semi-transparent)
        layer.setVisible(true);
        layer.setOpacity(0.3);
      } else {
        layer.setVisible(false);
      }
    });
  }
}
