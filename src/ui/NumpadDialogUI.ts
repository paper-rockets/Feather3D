export class NumpadDialogUI {
  public element: HTMLElement;
  public isVisible: boolean = false;
  private displaySpan!: HTMLElement;
  private currentValue: string = '0';
  private targetProperty: 'size' | 'opacity' = 'size';
  private minVal: number = 1;
  private maxVal: number = 300;
  private unit: string = 'mm';
  public onApply?: (val: number, prop: 'size' | 'opacity') => void;

  constructor() {
    this.element = document.createElement('div');
    this.element.id = 'numpad-dialog';
    this.element.className = 'modal-overlay';
    this.element.style.display = 'none';

    this.render();
    this.bindEvents();
    document.body.appendChild(this.element);
  }

  private render(): void {
    this.element.innerHTML = `
      <div class="modal-card" style="max-width: 280px; width: 88%;">
        <div class="modal-header">
          <span id="numpad-title" class="modal-title">SET BRUSH SIZE</span>
          <button id="numpad-close" class="btn btn-sm">CLOSE</button>
        </div>

        <div style="background: var(--bg); border: 1px solid var(--bdr); border-radius: var(--radius); padding: 12px; margin: 10px 0; text-align: right;">
          <span id="numpad-display" style="font-size: 22px; font-weight: 700; color: var(--ink);">20</span>
          <span id="numpad-unit" style="font-size: 11px; color: var(--mut); margin-left: 4px;">mm</span>
        </div>

        <div class="numpad-grid" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px;">
          <button class="btn num-btn" data-val="7">7</button>
          <button class="btn num-btn" data-val="8">8</button>
          <button class="btn num-btn" data-val="9">9</button>
          <button class="btn num-btn" data-val="4">4</button>
          <button class="btn num-btn" data-val="5">5</button>
          <button class="btn num-btn" data-val="6">6</button>
          <button class="btn num-btn" data-val="1">1</button>
          <button class="btn num-btn" data-val="2">2</button>
          <button class="btn num-btn" data-val="3">3</button>
          <button class="btn num-btn btn-danger" data-val="c">C</button>
          <button class="btn num-btn" data-val="0">0</button>
          <button class="btn num-btn" data-val="del">DEL</button>
        </div>

        <button id="numpad-apply" class="btn active" style="width: 100%; margin-top: 10px; padding: 10px;">APPLY</button>
      </div>
    `;

    this.displaySpan = this.element.querySelector('#numpad-display') as HTMLElement;
  }

  private bindEvents(): void {
    this.element.querySelector('#numpad-close')?.addEventListener('click', () => this.hide());

    const numBtns = this.element.querySelectorAll<HTMLButtonElement>('.num-btn');
    numBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const val = btn.getAttribute('data-val');
        if (val === 'c') {
          this.currentValue = '0';
        } else if (val === 'del') {
          this.currentValue = this.currentValue.length > 1 ? this.currentValue.slice(0, -1) : '0';
        } else if (val !== null) {
          if (this.currentValue === '0') {
            this.currentValue = val;
          } else if (this.currentValue.length < 5) {
            this.currentValue += val;
          }
        }
        this.displaySpan.textContent = this.currentValue;
      });
    });

    this.element.querySelector('#numpad-apply')?.addEventListener('click', () => {
      let num = parseFloat(this.currentValue) || this.minVal;
      num = Math.max(this.minVal, Math.min(this.maxVal, num));
      if (this.onApply) {
        this.onApply(num, this.targetProperty);
      }
      this.hide();
    });
  }

  public open(property: 'size' | 'opacity', initialVal: number): void {
    this.targetProperty = property;
    if (property === 'size') {
      this.minVal = 1;
      this.maxVal = 300;
      this.unit = 'mm';
      (this.element.querySelector('#numpad-title') as HTMLElement).textContent = 'SET BRUSH SIZE (1 - 300mm)';
    } else {
      this.minVal = 0;
      this.maxVal = 100;
      this.unit = '%';
      (this.element.querySelector('#numpad-title') as HTMLElement).textContent = 'SET OPACITY (0 - 100%)';
    }
    (this.element.querySelector('#numpad-unit') as HTMLElement).textContent = this.unit;
    this.currentValue = `${Math.round(initialVal)}`;
    this.displaySpan.textContent = this.currentValue;

    this.isVisible = true;
    this.element.style.display = 'flex';
  }

  public hide(): void {
    this.isVisible = false;
    this.element.style.display = 'none';
  }
}
