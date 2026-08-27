import { Engine } from '../core/Engine';
import { ProjectStorage, ProjectMetadata } from '../io/ProjectStorage';
import { FeatherProjectSerializer } from '../io/FeatherProjectSerializer';

export class HomeScreenUI {
  public element: HTMLElement;
  private engine: Engine;
  public isVisible: boolean = false;
  private activeFilter: 'recents' | 'folders' | 'gallery' = 'recents';

  constructor(engine: Engine) {
    this.engine = engine;
    this.element = document.createElement('div');
    this.element.className = 'modal-overlay';
    this.element.style.display = 'none';

    this.render();
  }

  public async show(): Promise<void> {
    this.isVisible = true;
    this.element.style.display = 'flex';
    await this.refresh();
  }

  public hide(): void {
    this.isVisible = false;
    this.element.style.display = 'none';
  }

  public async refresh(): Promise<void> {
    const projects = await ProjectStorage.listProjects();
    this.renderProjects(projects);
  }

  private render(): void {
    this.element.innerHTML = `
      <div class="modal-card" style="max-width: 780px; width: 94%; max-height: 90vh;">
        <div class="modal-header">
          <span class="modal-title">WANDRLUST NOTES & PROJECTS</span>
          <div style="display: flex; gap: 6px;">
            <button id="btn-home-new" class="btn btn-sm active">+ NEW NOTE</button>
            <label class="btn btn-sm" style="cursor: pointer;">
              IMPORT PROJECT
              <input id="home-file-input" type="file" accept=".json,.wandrlust,.feather" style="display: none;">
            </label>
            <button id="btn-home-close" class="btn btn-sm">CLOSE</button>
          </div>
        </div>

        <div style="display: flex; gap: 12px; margin-top: 10px; min-height: 400px; max-height: 65vh;">
          <!-- Left Sidebar Navigation -->
          <div style="width: 140px; display: flex; flex-direction: column; gap: 4px; border-right: 1px solid var(--bdr); padding-right: 8px;">
            <button id="nav-recents" class="btn btn-sm ${this.activeFilter === 'recents' ? 'active' : ''}" style="width: 100%; text-align: left;">RECENTS</button>
            <button id="nav-folders" class="btn btn-sm ${this.activeFilter === 'folders' ? 'active' : ''}" style="width: 100%; text-align: left;">FOLDERS</button>
            <button id="nav-gallery" class="btn btn-sm ${this.activeFilter === 'gallery' ? 'active' : ''}" style="width: 100%; text-align: left;">GALLERY</button>
            <div style="flex: 1;"></div>
            <span style="font-size: 8px; color: var(--mut); line-height: 1.3;">WANDRLUST 2.0 ENGINE</span>
          </div>

          <!-- Main Grid Area -->
          <div style="flex: 1; overflow-y: auto; padding: 2px;">
            <div id="project-card-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(210px, 1fr)); gap: 10px;"></div>
          </div>
        </div>
      </div>
    `;

    this.element.querySelector('#btn-home-close')?.addEventListener('click', () => this.hide());
    this.element.querySelector('#btn-home-new')?.addEventListener('click', () => {
      this.engine.newSketch();
      this.hide();
    });

    this.element.querySelector('#nav-recents')?.addEventListener('click', () => {
      this.activeFilter = 'recents';
      this.refresh();
    });

    this.element.querySelector('#nav-folders')?.addEventListener('click', () => {
      this.activeFilter = 'folders';
      this.refresh();
    });

    this.element.querySelector('#nav-gallery')?.addEventListener('click', () => {
      this.activeFilter = 'gallery';
      this.refresh();
    });

    const fileInput = this.element.querySelector('#home-file-input') as HTMLInputElement;
    fileInput?.addEventListener('change', (e) => {
      const files = (e.target as HTMLInputElement).files;
      if (files && files.length > 0) {
        const reader = new FileReader();
        reader.onload = async (event) => {
          const content = event.target?.result as string;
          if (content) {
            FeatherProjectSerializer.deserialize(
              content,
              this.engine.stageManager,
              this.engine.environment,
              this.engine.viewport
            );
            const projectId = `proj_${Date.now()}`;
            await ProjectStorage.saveProject(
              projectId,
              files[0].name.replace(/\.(json|wandrlust|feather)$/i, ''),
              content,
              this.engine.stageManager.getAllCurves().length
            );
            this.hide();
          }
        };
        reader.readAsText(files[0]);
      }
    });
  }

  private renderProjects(projects: ProjectMetadata[]): void {
    const grid = this.element.querySelector('#project-card-grid') as HTMLElement;
    if (!grid) return;
    grid.innerHTML = '';

    if (this.activeFilter === 'gallery') {
      const galleryItems = [
        {
          id: 'nature_forest',
          name: 'Forest Sanctuary',
          desc: '3D Forest Scene with Animated Blue Butterfly, Soaring Bird, Procedural Day Sky, and Floating Forest Spores.',
          sceneType: 'forest',
          skyPreset: 'day'
        },
        {
          id: 'nature_temple',
          name: 'Temple Water Garden',
          desc: '3D Kinkakuji Temple with Sakura Cherry Sky Preset, Floating Petal Spores, and Soft Cel Shading.',
          sceneType: 'temple_garden',
          skyPreset: 'cherry'
        },
        {
          id: 'nature_cliff',
          name: 'Sea Cliff Isle',
          desc: '3D Sea Keep Watcher on Cliff with Dusk Atmospheric Scattering, Ocean Waves, and Soaring Sea Wildlife.',
          sceneType: 'sea_cliff',
          skyPreset: 'dusk'
        },
        {
          id: 'korean_bakery',
          name: 'Korean Bakery Cafe',
          desc: '3D Isometric Korean Bakery Diorama with Golden Hour Sunlight, Stylized Architecture, and Guide Snapping.',
          sceneType: 'korean_bakery',
          skyPreset: 'golden_hour'
        }
      ];

      galleryItems.forEach(item => {
        const card = document.createElement('div');
        card.className = 'layer-item';
        card.style.flexDirection = 'column';
        card.style.alignItems = 'stretch';
        card.style.padding = '12px';
        card.style.gap = '8px';

        card.innerHTML = `
          <div style="font-weight: 700; font-size: 12px; color: var(--fg);">${item.name}</div>
          <div style="font-size: 9px; color: var(--mut); line-height: 1.4;">${item.desc}</div>
          <div style="margin-top: 4px;">
            <button class="btn btn-sm btn-load-scene" style="width: 100%;">LOAD NATURE SCENE</button>
          </div>
        `;

        const loadBtn = card.querySelector('.btn-load-scene') as HTMLButtonElement;
        loadBtn?.addEventListener('click', async () => {
          loadBtn.disabled = true;
          loadBtn.textContent = 'LOADING SCENE...';
          try {
            await this.engine.loadNatureScene({
              sceneType: item.sceneType as any,
              skyPreset: item.skyPreset as any
            });
          } catch (err) {
            console.error('[HomeScreenUI] Failed to load nature scene:', err);
          } finally {
            loadBtn.disabled = false;
            loadBtn.textContent = 'LOAD NATURE SCENE';
            this.hide();
          }
        });

        grid.appendChild(card);
      });
      return;
    }

    if (projects.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 40px 0; color: var(--mut); font-size: 11px;">
          NO SAVED NOTES FOUND. CLICK "+ NEW NOTE" TO START DRAWING.
        </div>
      `;
      return;
    }

    projects.forEach(proj => {
      const card = document.createElement('div');
      card.className = 'layer-item';
      card.style.flexDirection = 'column';
      card.style.alignItems = 'stretch';
      card.style.padding = '10px';
      card.style.gap = '6px';

      const dateStr = new Date(proj.modified).toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });

      const thumbHtml = proj.thumbnail
        ? `<img src="${proj.thumbnail}" style="width: 100%; height: 75px; object-fit: cover; border-radius: 4px; border: 1px solid var(--bdr); margin-bottom: 4px;" />`
        : `<div style="width: 100%; height: 50px; background: rgba(0,0,0,0.05); border-radius: 4px; display: flex; align-items: center; justify-content: center; font-size: 8px; color: var(--mut);">3D SKETCH</div>`;

      card.innerHTML = `
        ${thumbHtml}
        <div style="display: flex; justify-content: space-between; align-items: flex-start;">
          <span style="font-weight: 700; font-size: 11px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${proj.name}</span>
          <span style="font-size: 9px; color: var(--mut);">${proj.strokeCount} strk</span>
        </div>
        <span style="font-size: 8px; color: var(--mut);">${dateStr}</span>
        
        <div style="display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 4px; margin-top: 4px;">
          <button class="btn btn-sm btn-open">OPEN</button>
          <button class="btn btn-sm btn-lighten" title="Decimate vertices to reduce file size">LIGHTEN</button>
          <button class="btn btn-sm btn-danger btn-del">DEL</button>
        </div>
      `;

      card.querySelector('.btn-open')?.addEventListener('click', async () => {
        const data = await ProjectStorage.loadProject(proj.id);
        if (data) {
          FeatherProjectSerializer.deserialize(
            data,
            this.engine.stageManager,
            this.engine.environment,
            this.engine.viewport
          );
        }
        this.hide();
      });

      card.querySelector('.btn-lighten')?.addEventListener('click', async () => {
        await ProjectStorage.lightenProject(proj.id, 0.01, true);
        await this.refresh();
      });

      card.querySelector('.btn-del')?.addEventListener('click', async () => {
        await ProjectStorage.deleteProject(proj.id);
        await this.refresh();
      });

      grid.appendChild(card);
    });
  }
}

