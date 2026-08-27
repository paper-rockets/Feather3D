import { Engine } from '../core/Engine';

export class JoystickWidgetUI {
  public element: HTMLElement;
  private engine: Engine;

  constructor(engine: Engine) {
    this.engine = engine;
    this.element = document.createElement('div');
    this.element.id = 'joystick-widget';
    this.element.style.display = 'none'; // Shown when tool is 'transform'

    this.render();
    this.bindEvents();
  }

  public setVisible(visible: boolean): void {
    this.element.style.display = visible ? 'flex' : 'none';
  }

  private render(): void {
    this.element.innerHTML = `
      <div style="font-size: 9px; font-weight: 700; text-align: center; color: var(--mut);">JOYSTICK 2D/3D</div>
      <div class="joystick-pad">
        <button id="j-rot-ccw" class="btn btn-sm">CCW</button>
        <button id="j-up" class="btn btn-sm">UP</button>
        <button id="j-rot-cw" class="btn btn-sm">CW</button>
        <button id="j-left" class="btn btn-sm">LEFT</button>
        <button id="j-z-in" class="btn btn-sm">Z+</button>
        <button id="j-right" class="btn btn-sm">RIGHT</button>
        <button id="j-scale-down" class="btn btn-sm">-SZ</button>
        <button id="j-down" class="btn btn-sm">DOWN</button>
        <button id="j-scale-up" class="btn btn-sm">+SZ</button>
      </div>
    `;
  }

  private bindEvents(): void {
    const cam = this.engine.viewport.camera;

    this.element.querySelector('#j-up')?.addEventListener('click', () => {
      this.engine.joystickController.handle2DDrag(0, -10, cam);
    });
    this.element.querySelector('#j-down')?.addEventListener('click', () => {
      this.engine.joystickController.handle2DDrag(0, 10, cam);
    });
    this.element.querySelector('#j-left')?.addEventListener('click', () => {
      this.engine.joystickController.handle2DDrag(-10, 0, cam);
    });
    this.element.querySelector('#j-right')?.addEventListener('click', () => {
      this.engine.joystickController.handle2DDrag(10, 0, cam);
    });
    this.element.querySelector('#j-rot-cw')?.addEventListener('click', () => {
      this.engine.joystickController.handle2DRotate(0.15, cam);
    });
    this.element.querySelector('#j-rot-ccw')?.addEventListener('click', () => {
      this.engine.joystickController.handle2DRotate(-0.15, cam);
    });
    this.element.querySelector('#j-z-in')?.addEventListener('click', () => {
      this.engine.joystickController.handle3DTranslate('z', 0.1);
    });
    this.element.querySelector('#j-scale-up')?.addEventListener('click', () => {
      this.engine.joystickController.handleScale(1.1);
    });
    this.element.querySelector('#j-scale-down')?.addEventListener('click', () => {
      this.engine.joystickController.handleScale(0.9);
    });
  }
}
