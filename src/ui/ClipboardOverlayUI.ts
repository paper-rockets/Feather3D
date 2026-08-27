import { Engine } from '../core/Engine';

export class ClipboardOverlayUI {
  public element: HTMLElement;
  private engine: Engine;
  public isVisible: boolean = false;
  public isLocked: boolean = false;
  public opacity: number = 0.85;
  public zoomFactor: number = 1.0;
  private panOffset: { x: number; y: number } = { x: 0, y: 0 };
  private isDragging: boolean = false;
  private dragStart: { x: number; y: number } = { x: 0, y: 0 };

  private imgElement!: HTMLImageElement;
  private containerInner!: HTMLElement;

  constructor(engine: Engine) {
    this.engine = engine;
    this.element = document.createElement('div');
    this.element.id = 'clipboard-floating-overlay';
    this.element.className = 'clipboard-overlay-window';
    this.element.style.display = 'none';

    this.render();
    this.bindEvents();
    document.body.appendChild(this.element);
  }

  private render(): void {
    this.element.innerHTML = `
      <div class="clipboard-header" id="clip-header">
        <span class="clipboard-title">REFERENCE CLIPBOARD</span>
        <div style="display: flex; gap: 4px;">
          <label class="btn btn-sm" style="cursor: pointer;">
            LOAD
            <input id="clip-img-input" type="file" accept="image/*" style="display: none;">
          </label>
          <button id="clip-lock-btn" class="btn btn-sm">LOCK</button>
          <button id="clip-close-btn" class="btn btn-sm">CLOSE</button>
        </div>
      </div>

      <div class="clipboard-body" id="clip-body">
        <div id="clip-inner" style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; overflow: hidden; position: relative;">
          <div id="clip-placeholder" style="color: var(--mut); font-size: 10px; text-align: center; padding: 20px;">
            NO REFERENCE IMAGE LOADED.<br>CLICK "LOAD" TO IMPORT 2D REFERENCE.
          </div>
          <img id="clip-img" style="display: none; max-width: 100%; max-height: 100%; object-fit: contain; transform-origin: center center; user-select: none; pointer-events: none;" />
        </div>
      </div>

      <div class="clipboard-footer">
        <div style="display: flex; align-items: center; gap: 6px;">
          <span style="font-size: 9px; font-weight: 700; color: var(--mut);">ZOOM</span>
          <button id="clip-zoom-out" class="btn btn-sm">-</button>
          <span id="clip-zoom-val" style="font-size: 9px; min-width: 32px; text-align: center;">100%</span>
          <button id="clip-zoom-in" class="btn btn-sm">+</button>
        </div>

        <div style="display: flex; align-items: center; gap: 6px;">
          <span style="font-size: 9px; font-weight: 700; color: var(--mut);">OPACITY</span>
          <input id="clip-opacity-slider" type="range" min="10" max="100" value="85" style="width: 70px;">
        </div>

        <button id="clip-stamp-3d" class="btn btn-sm">SPAWN IN 3D</button>
      </div>
    `;

    this.imgElement = this.element.querySelector('#clip-img') as HTMLImageElement;
    this.containerInner = this.element.querySelector('#clip-inner') as HTMLElement;
  }

  private bindEvents(): void {
    const header = this.element.querySelector('#clip-header') as HTMLElement;
    const lockBtn = this.element.querySelector('#clip-lock-btn') as HTMLButtonElement;
    const closeBtn = this.element.querySelector('#clip-close-btn') as HTMLButtonElement;
    const fileInput = this.element.querySelector('#clip-img-input') as HTMLInputElement;
    const zoomInBtn = this.element.querySelector('#clip-zoom-in') as HTMLButtonElement;
    const zoomOutBtn = this.element.querySelector('#clip-zoom-out') as HTMLButtonElement;
    const zoomValSpan = this.element.querySelector('#clip-zoom-val') as HTMLElement;
    const opacitySlider = this.element.querySelector('#clip-opacity-slider') as HTMLInputElement;
    const stamp3dBtn = this.element.querySelector('#clip-stamp-3d') as HTMLButtonElement;
    const placeholder = this.element.querySelector('#clip-placeholder') as HTMLElement;

    // Window Draggable Header
    header.addEventListener('mousedown', (e) => {
      if ((e.target as HTMLElement).tagName === 'BUTTON' || (e.target as HTMLElement).tagName === 'INPUT' || (e.target as HTMLElement).tagName === 'LABEL') return;
      this.isDragging = true;
      this.dragStart = {
        x: e.clientX - this.element.offsetLeft,
        y: e.clientY - this.element.offsetTop
      };
    });

    window.addEventListener('mousemove', (e) => {
      if (this.isDragging && !this.isLocked) {
        this.element.style.left = `${Math.max(10, e.clientX - this.dragStart.x)}px`;
        this.element.style.top = `${Math.max(10, e.clientY - this.dragStart.y)}px`;
      }
    });

    window.addEventListener('mouseup', () => {
      this.isDragging = false;
    });

    // File Input
    fileInput.addEventListener('change', (e) => {
      const files = (e.target as HTMLInputElement).files;
      if (files && files.length > 0) {
        const url = URL.createObjectURL(files[0]);
        this.imgElement.src = url;
        this.imgElement.style.display = 'block';
        placeholder.style.display = 'none';
      }
    });

    // Lock toggle
    lockBtn.addEventListener('click', () => {
      this.isLocked = !this.isLocked;
      lockBtn.textContent = this.isLocked ? 'UNLK' : 'LOCK';
      lockBtn.classList.toggle('active', this.isLocked);
    });

    closeBtn.addEventListener('click', () => this.hide());

    // Zoom
    zoomInBtn.addEventListener('click', () => {
      this.zoomFactor = Math.min(3.0, this.zoomFactor + 0.2);
      this.updateTransform();
      zoomValSpan.textContent = `${Math.round(this.zoomFactor * 100)}%`;
    });

    zoomOutBtn.addEventListener('click', () => {
      this.zoomFactor = Math.max(0.3, this.zoomFactor - 0.2);
      this.updateTransform();
      zoomValSpan.textContent = `${Math.round(this.zoomFactor * 100)}%`;
    });

    // Opacity
    opacitySlider.addEventListener('input', (e) => {
      const val = parseInt((e.target as HTMLInputElement).value, 10);
      this.opacity = val / 100;
      this.imgElement.style.opacity = `${this.opacity}`;
    });

    // Spawn In 3D Space
    stamp3dBtn.addEventListener('click', () => {
      if (this.imgElement.src) {
        const aspect = (this.imgElement.naturalWidth || 1) / (this.imgElement.naturalHeight || 1);
        this.engine.resourceManager.addReferenceImage(
          this.imgElement.src,
          'Clipboard Image',
          aspect,
          this.engine.viewport.activeCamera
        );
      }
    });
  }

  private updateTransform(): void {
    this.imgElement.style.transform = `scale(${this.zoomFactor}) translate(${this.panOffset.x}px, ${this.panOffset.y}px)`;
  }

  public show(): void {
    this.isVisible = true;
    this.element.style.display = 'flex';
  }

  public hide(): void {
    this.isVisible = false;
    this.element.style.display = 'none';
  }

  public toggle(): void {
    if (this.isVisible) this.hide();
    else this.show();
  }
}
