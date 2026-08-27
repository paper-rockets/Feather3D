import { Engine } from '../core/Engine';
import { SequenceManager } from '../animation/SequenceManager';

export class SequenceTimelineUI {
  public element: HTMLElement;
  public sequenceManager: SequenceManager;
  private playBtn!: HTMLButtonElement;
  private onionBtn!: HTMLButtonElement;
  private frameListContainer!: HTMLElement;
  public isVisible: boolean = false;

  constructor(engine: Engine) {
    this.sequenceManager = new SequenceManager(engine.stageManager);
    this.element = document.createElement('div');
    this.element.id = 'sequence-timeline';
    this.element.style.position = 'fixed';
    this.element.style.bottom = '70px';
    this.element.style.left = '50%';
    this.element.style.transform = 'translateX(-50%)';
    this.element.style.zIndex = '95';
    this.element.style.background = 'var(--pan)';
    this.element.style.border = '1px solid var(--bdr)';
    this.element.style.borderRadius = 'var(--radius)';
    this.element.style.padding = '8px 12px';
    this.element.style.backdropFilter = 'blur(10px)';
    this.element.style.display = 'none';
    this.element.style.flexDirection = 'column';
    this.element.style.gap = '6px';
    this.element.style.maxWidth = 'calc(100vw - 32px)';

    this.render();
    this.bindEvents();
  }

  public toggle(): void {
    this.isVisible = !this.isVisible;
    this.element.style.display = this.isVisible ? 'flex' : 'none';
    if (this.isVisible) {
      this.refresh();
    } else {
      this.sequenceManager.pause();
    }
  }

  public refresh(): void {
    this.renderFrames();
  }

  private render(): void {
    this.element.innerHTML = `
      <div style="display: flex; gap: 8px; align-items: center; justify-content: space-between;">
        <div style="display: flex; gap: 6px; align-items: center;">
          <button id="btn-seq-play" class="btn btn-sm">PLAY</button>
          <button id="btn-seq-prev" class="btn btn-sm">PREV</button>
          <button id="btn-seq-next" class="btn btn-sm">NEXT</button>
          <button id="btn-seq-add" class="btn btn-sm">+ FRAME</button>
          <button id="btn-seq-onion" class="btn btn-sm">ONION: OFF</button>
          <select id="select-fps" class="btn btn-sm" style="appearance: none; -webkit-appearance: none; cursor: pointer;">
            <option value="6">6 FPS</option>
            <option value="12" selected>12 FPS</option>
            <option value="24">24 FPS</option>
          </select>
        </div>
        <button id="btn-seq-close" class="btn btn-sm">CLOSE</button>
      </div>

      <div id="timeline-frames" style="display: flex; gap: 4px; overflow-x: auto; padding: 4px 0;"></div>
    `;

    this.playBtn = this.element.querySelector('#btn-seq-play') as HTMLButtonElement;
    this.onionBtn = this.element.querySelector('#btn-seq-onion') as HTMLButtonElement;
    this.frameListContainer = this.element.querySelector('#timeline-frames') as HTMLElement;
  }

  private renderFrames(): void {
    if (!this.frameListContainer) return;
    this.frameListContainer.innerHTML = '';

    const total = this.sequenceManager.totalFrames;
    for (let i = 0; i < total; i++) {
      const pill = document.createElement('button');
      pill.className = `btn btn-sm ${i === this.sequenceManager.currentFrame ? 'active' : ''}`;
      pill.style.minWidth = '32px';
      pill.style.padding = '4px 6px';
      pill.textContent = `${i + 1}`;

      pill.addEventListener('click', () => {
        this.sequenceManager.goToFrame(i);
        this.renderFrames();
      });

      this.frameListContainer.appendChild(pill);
    }
  }

  private bindEvents(): void {
    this.playBtn.addEventListener('click', () => {
      const playing = this.sequenceManager.togglePlay();
      this.playBtn.textContent = playing ? 'PAUSE' : 'PLAY';
    });

    this.element.querySelector('#btn-seq-prev')?.addEventListener('click', () => {
      this.sequenceManager.prevFrame();
      this.renderFrames();
    });

    this.element.querySelector('#btn-seq-next')?.addEventListener('click', () => {
      this.sequenceManager.nextFrame();
      this.renderFrames();
    });

    this.element.querySelector('#btn-seq-add')?.addEventListener('click', () => {
      this.sequenceManager.addFrame();
      this.renderFrames();
    });

    this.onionBtn.addEventListener('click', () => {
      const on = this.sequenceManager.toggleOnionSkin();
      this.onionBtn.textContent = on ? 'ONION: ON' : 'ONION: OFF';
      this.onionBtn.classList.toggle('active', on);
    });

    const fpsSelect = this.element.querySelector('#select-fps') as HTMLSelectElement;
    fpsSelect.addEventListener('change', (e) => {
      const fps = parseInt((e.target as HTMLSelectElement).value, 10);
      this.sequenceManager.setFPS(fps);
    });

    this.element.querySelector('#btn-seq-close')?.addEventListener('click', () => {
      this.toggle();
    });

    this.sequenceManager.onFrameChange = (cur) => {
      this.renderFrames();
    };
  }
}
