import { Engine } from '../core/Engine';

export class GuideTutorialModal {
  public element: HTMLElement;
  private engine: Engine;
  private isVisible: boolean = false;
  private activeTab: 'vertical' | 'primitives' | 'bending' | 'transform' | 'shortcuts' = 'vertical';

  constructor(engine: Engine) {
    this.engine = engine;
    this.element = document.createElement('div');
    this.element.className = 'modal-overlay';
    this.element.id = 'guide-tutorial-modal';
    this.element.style.display = 'none';

    this.render();
    this.bindEvents();
  }

  public show(initialTab?: 'vertical' | 'primitives' | 'bending' | 'transform' | 'shortcuts'): void {
    if (initialTab) {
      this.activeTab = initialTab;
    }
    this.isVisible = true;
    this.element.style.display = 'flex';
    this.render();
    this.bindEvents();
  }

  public hide(): void {
    this.isVisible = false;
    this.element.style.display = 'none';
  }

  public toggle(): void {
    if (this.isVisible) {
      this.hide();
    } else {
      this.show();
    }
  }

  private render(): void {
    this.element.innerHTML = `
      <div class="modal-card guide-tutorial-card" style="max-width: 600px; width: 92%; max-height: 88vh; display: flex; flex-direction: column;">
        <div class="modal-header" style="display: flex; justify-content: space-between; align-items: center; padding-bottom: 12px; margin-bottom: 12px; border-bottom: 1px solid var(--bdr);">
          <div>
            <div class="modal-title" style="font-size: 15px; font-weight: 800; letter-spacing: 0.5px;">3D GUIDE & DRAWING TUTORIAL</div>
            <div style="font-size: 11px; color: var(--mut); margin-top: 2px;">Mastering 3D sketching, vertical drawing, and guide surfaces</div>
          </div>
          <button id="btn-close-tutorial" class="btn btn-sm">CLOSE</button>
        </div>

        <!-- Navigation Tabs -->
        <div class="tutorial-tabs" style="display: flex; gap: 4px; overflow-x: auto; padding-bottom: 8px; margin-bottom: 12px; border-bottom: 1px solid var(--bdr);">
          <button data-tab="vertical" class="btn btn-sm ${this.activeTab === 'vertical' ? 'active' : ''}">VERTICAL DRAWING</button>
          <button data-tab="primitives" class="btn btn-sm ${this.activeTab === 'primitives' ? 'active' : ''}">GUIDE PRIMITIVES</button>
          <button data-tab="bending" class="btn btn-sm ${this.activeTab === 'bending' ? 'active' : ''}">BEND GUIDES</button>
          <button data-tab="transform" class="btn btn-sm ${this.activeTab === 'transform' ? 'active' : ''}">ROTATE & TRANSFORM</button>
          <button data-tab="shortcuts" class="btn btn-sm ${this.activeTab === 'shortcuts' ? 'active' : ''}">SHORTCUTS</button>
        </div>

        <!-- Content Area -->
        <div id="tutorial-content-body" style="flex: 1; overflow-y: auto; padding-right: 4px;">
          ${this.renderTabContent()}
        </div>

        <!-- Bottom Quick Actions Bar -->
        <div style="margin-top: 14px; padding-top: 10px; border-top: 1px solid var(--bdr); display: flex; flex-direction: column; gap: 8px;">
          <div style="font-size: 10px; font-weight: 700; color: var(--mut); text-transform: uppercase;">Quick Actions: Set Active Guide Now</div>
          <div style="display: flex; gap: 6px; flex-wrap: wrap;">
            <button id="qa-guide-cube" class="btn btn-sm" style="flex: 1;">USE CUBE (VERTICAL WALLS)</button>
            <button id="qa-guide-cylinder" class="btn btn-sm" style="flex: 1;">USE CYLINDER</button>
            <button id="qa-guide-plane" class="btn btn-sm" style="flex: 1;">USE PLANE</button>
            <button id="qa-guide-off" class="btn btn-sm" style="flex: 1;">GUIDE OFF</button>
          </div>
        </div>
      </div>
    `;
  }

  private renderTabContent(): string {
    switch (this.activeTab) {
      case 'vertical':
        return `
          <div class="tutorial-section">
            <h3 style="font-size: 14px; font-weight: 700; margin: 0 0 8px 0; color: var(--text);">How To Draw Vertically in 3D</h3>
            <p style="font-size: 12px; line-height: 1.6; color: var(--text); margin-bottom: 12px;">
              By default, freehand strokes attach to the horizontal ground plane (XZ grid). To sketch vertically (rising up along the Y-axis), you use 3D Guide surfaces.
            </p>

            <div style="background: rgba(0,0,0,0.03); border-left: 3px solid var(--accent, #3ab24a); padding: 10px 12px; border-radius: 4px; margin-bottom: 12px;">
              <div style="font-size: 12px; font-weight: 700; margin-bottom: 4px;">Method 1: Cube or Cylinder Guide (Recommended)</div>
              <ol style="font-size: 12px; line-height: 1.6; margin: 0; padding-left: 18px;">
                <li>Click the <strong>USE CUBE</strong> or <strong>USE CYLINDER</strong> button below.</li>
                <li>A 3D guide shape will appear in the middle of your scene.</li>
                <li>Select the <strong>Draw</strong> tool (press <code>1</code> or <code>B</code>).</li>
                <li>Draw directly onto the vertical walls of the cube or cylinder. Your strokes will instantly snap upright along the vertical surface.</li>
              </ol>
            </div>

            <div style="background: rgba(0,0,0,0.03); border-left: 3px solid var(--accent, #3ab24a); padding: 10px 12px; border-radius: 4px; margin-bottom: 12px;">
              <div style="font-size: 12px; font-weight: 700; margin-bottom: 4px;">Method 2: Draw Flat and Rotate Upright</div>
              <ol style="font-size: 12px; line-height: 1.6; margin: 0; padding-left: 18px;">
                <li>Draw your shapes flat on the ground plane.</li>
                <li>Select the <strong>Select</strong> tool (press <code>3</code> or <code>W</code>).</li>
                <li>Click or lasso your strokes, then switch to <strong>Transform</strong> (press <code>7</code>).</li>
                <li>Rotate the red or blue axis ring by 90 degrees to stand the strokes upright.</li>
              </ol>
            </div>

            <div style="background: rgba(0,0,0,0.03); border-left: 3px solid var(--accent, #3ab24a); padding: 10px 12px; border-radius: 4px;">
              <div style="font-size: 12px; font-weight: 700; margin-bottom: 4px;">Method 3: Reference Image Plane</div>
              <p style="font-size: 12px; line-height: 1.5; margin: 0;">
                Open the Stage Panel, switch to the Resources tab, and import an image. Images spawn perpendicular to your camera viewing angle, giving you a custom vertical canvas.
              </p>
            </div>
          </div>
        `;

      case 'primitives':
        return `
          <div class="tutorial-section">
            <h3 style="font-size: 14px; font-weight: 700; margin: 0 0 8px 0; color: var(--text);">3D Guide Primitives</h3>
            <p style="font-size: 12px; line-height: 1.6; color: var(--text); margin-bottom: 12px;">
              3D Guides act as invisible scaffolding. Raycasting attaches your pen strokes precisely to the exterior shell of the geometry.
            </p>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 12px;">
              <div style="border: 1px solid var(--bdr); border-radius: 6px; padding: 10px;">
                <div style="font-weight: 700; font-size: 12px; margin-bottom: 4px;">CUBE GUIDE</div>
                <div style="font-size: 11px; color: var(--mut); line-height: 1.4;">
                  Provides 4 flat vertical walls and 2 horizontal caps. Ideal for architecture, upright panels, boxes, and vertical sketching.
                </div>
              </div>

              <div style="border: 1px solid var(--bdr); border-radius: 6px; padding: 10px;">
                <div style="font-weight: 700; font-size: 12px; margin-bottom: 4px;">CYLINDER GUIDE</div>
                <div style="font-size: 11px; color: var(--mut); line-height: 1.4;">
                  Provides continuous curved vertical walls. Ideal for sketching cups, trees, pillars, pipes, and rotational symmetry.
                </div>
              </div>

              <div style="border: 1px solid var(--bdr); border-radius: 6px; padding: 10px;">
                <div style="font-weight: 700; font-size: 12px; margin-bottom: 4px;">SPHERE GUIDE</div>
                <div style="font-size: 11px; color: var(--mut); line-height: 1.4;">
                  Provides a complete 360-degree spherical hull. Ideal for heads, globes, planets, rounded bodies, and curved paths.
                </div>
              </div>

              <div style="border: 1px solid var(--bdr); border-radius: 6px; padding: 10px;">
                <div style="font-weight: 700; font-size: 12px; margin-bottom: 4px;">PLANE GUIDE</div>
                <div style="font-size: 11px; color: var(--mut); line-height: 1.4;">
                  A flexible flat sheet with an orange origin anchor line that can be bent along custom curves into organic surfaces.
                </div>
              </div>
            </div>

            <div style="font-size: 11px; color: var(--mut); line-height: 1.5;">
              Tip: You can switch between guide modes anytime in Stage Panel -> Environment Tab -> 3D GUIDE.
            </div>
          </div>
        `;

      case 'bending':
        return `
          <div class="tutorial-section">
            <h3 style="font-size: 14px; font-weight: 700; margin: 0 0 8px 0; color: var(--text);">Bending 3D Guides</h3>
            <p style="font-size: 12px; line-height: 1.6; color: var(--text); margin-bottom: 12px;">
              Plane Guides can be folded and bent into ribbons, curved ramps, or organic shells.
            </p>

            <div style="background: rgba(0,0,0,0.03); border-left: 3px solid var(--accent, #3ab24a); padding: 10px 12px; border-radius: 4px; margin-bottom: 12px;">
              <div style="font-size: 12px; font-weight: 700; margin-bottom: 4px;">How Bending Works:</div>
              <ol style="font-size: 12px; line-height: 1.6; margin: 0; padding-left: 18px;">
                <li>Activate the <strong>Plane Guide</strong>. Notice the orange anchor line on the grid.</li>
                <li>When the guide is active, secondary trajectories bend the guide geometry along the drawn path using the orange line as pivot.</li>
                <li>Once bent, strokes drawn with the brush snap to the newly curved surface.</li>
                <li>You can repeat the bend operation to create complex organic ribbons and curved topologies.</li>
              </ol>
            </div>
          </div>
        `;

      case 'transform':
        return `
          <div class="tutorial-section">
            <h3 style="font-size: 14px; font-weight: 700; margin: 0 0 8px 0; color: var(--text);">Transform, Move & Rotate in 3D</h3>
            <p style="font-size: 12px; line-height: 1.6; color: var(--text); margin-bottom: 12px;">
              Easily reposition, scale, or rotate your strokes in full 3D space after drawing them.
            </p>

            <div style="border: 1px solid var(--bdr); border-radius: 6px; padding: 10px; margin-bottom: 10px;">
              <div style="font-weight: 700; font-size: 12px; margin-bottom: 4px;">Selection Tool (Key: 3 or W)</div>
              <div style="font-size: 11px; color: var(--mut); line-height: 1.4;">
                Draw a lasso loop around any strokes to select them. Selected strokes glow with a green outline.
              </div>
            </div>

            <div style="border: 1px solid var(--bdr); border-radius: 6px; padding: 10px; margin-bottom: 10px;">
              <div style="font-weight: 700; font-size: 12px; margin-bottom: 4px;">Transform Gizmo & Joystick (Key: 7)</div>
              <div style="font-size: 11px; color: var(--mut); line-height: 1.4;">
                Use the on-screen 3D gizmo or the joystick widget at the bottom right to translate along X, Y, Z axes, rotate around orientation rings, and scale uniformly or non-uniformly.
              </div>
            </div>

            <div style="border: 1px solid var(--bdr); border-radius: 6px; padding: 10px;">
              <div style="font-weight: 700; font-size: 12px; margin-bottom: 4px;">Mirror & Symmetry (Key: Shift + X)</div>
              <div style="font-size: 11px; color: var(--mut); line-height: 1.4;">
                Toggle live mirror planes (X red, Y green, Z blue) or use the bottom context menu to duplicate symmetrically.
              </div>
            </div>
          </div>
        `;

      case 'shortcuts':
        return `
          <div class="tutorial-section">
            <h3 style="font-size: 14px; font-weight: 700; margin: 0 0 8px 0; color: var(--text);">Keyboard & Touch Shortcuts</h3>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 11px;">
              <div style="border: 1px solid var(--bdr); border-radius: 4px; padding: 8px;">
                <div style="font-weight: 700; color: var(--text); margin-bottom: 4px;">TOOLS</div>
                <div><code>1</code> or <code>B</code>: Draw / Shape Assist</div>
                <div><code>2</code> or <code>E</code>: Erase / Vacuum</div>
                <div><code>3</code> or <code>W</code>: Select Lasso</div>
                <div><code>4</code>: Loft Bridge</div>
                <div><code>5</code>: Liquify Deform</div>
                <div><code>6</code> or <code>I</code>: Injector / Dropper</div>
                <div><code>7</code>: Transform Tool</div>
              </div>

              <div style="border: 1px solid var(--bdr); border-radius: 4px; padding: 8px;">
                <div style="font-weight: 700; color: var(--text); margin-bottom: 4px;">NAVIGATION & VIEW</div>
                <div><code>Space (x2)</code>: Snap Front View</div>
                <div><code>Tab (x2)</code>: Toggle Perspective / Ortho</div>
                <div><code>D</code> / <code>F</code>: Zoom / Pan</div>
                <div><code>U</code>: Hide UI (Focus Mode)</div>
                <div><code>H</code>: Open Tutorial & Help</div>
              </div>

              <div style="border: 1px solid var(--bdr); border-radius: 4px; padding: 8px;">
                <div style="font-weight: 700; color: var(--text); margin-bottom: 4px;">BRUSH CONTROLS</div>
                <div><code>[</code> / <code>]</code>: Brush Size - / +</div>
                <div><code>-</code> / <code>=</code>: Opacity - / +</div>
                <div><code>Shift + X</code>: Cycle Mirror Axis</div>
              </div>

              <div style="border: 1px solid var(--bdr); border-radius: 4px; padding: 8px;">
                <div style="font-weight: 700; color: var(--text); margin-bottom: 4px;">TOUCH GESTURES</div>
                <div><code>1-Finger Drag</code>: Orbit Camera</div>
                <div><code>2-Finger Drag</code>: Pan Camera</div>
                <div><code>Pinch</code>: Zoom Camera</div>
                <div><code>3-Finger Tap</code>: Undo</div>
                <div><code>3-Finger Swipe</code>: Undo / Redo</div>
              </div>
            </div>
          </div>
        `;
    }
  }

  private bindEvents(): void {
    // Close button
    this.element.querySelector('#btn-close-tutorial')?.addEventListener('click', () => this.hide());

    // Click outside to dismiss
    this.element.addEventListener('click', (e) => {
      if (e.target === this.element) this.hide();
    });

    // Tab buttons
    this.element.querySelectorAll<HTMLButtonElement>('.tutorial-tabs button[data-tab]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const tab = btn.getAttribute('data-tab') as any;
        if (tab) {
          this.activeTab = tab;
          this.render();
          this.bindEvents();
        }
      });
    });

    // Quick Action: Cube Guide
    this.element.querySelector('#qa-guide-cube')?.addEventListener('click', () => {
      this.engine.guideManager.setMode('primitive');
      this.engine.guideManager.setPrimitiveType('cube');
      this.engine.setTool('draw');
      this.hide();
    });

    // Quick Action: Cylinder Guide
    this.element.querySelector('#qa-guide-cylinder')?.addEventListener('click', () => {
      this.engine.guideManager.setMode('primitive');
      this.engine.guideManager.setPrimitiveType('cylinder');
      this.engine.setTool('draw');
      this.hide();
    });

    // Quick Action: Plane Guide
    this.element.querySelector('#qa-guide-plane')?.addEventListener('click', () => {
      this.engine.guideManager.setMode('plane');
      this.engine.setTool('draw');
      this.hide();
    });

    // Quick Action: Guide Off
    this.element.querySelector('#qa-guide-off')?.addEventListener('click', () => {
      this.engine.guideManager.setMode('none');
      this.engine.setTool('draw');
      this.hide();
    });
  }
}
