import { Engine } from '../core/Engine';
import { ProjectStorage, ProjectMetadata, ProjectSortOption, ProjectSortOrder } from '../io/ProjectStorage';
import { FeatherProjectSerializer } from '../io/FeatherProjectSerializer';
import { MeshCanvasTemplates, TemplateCategory } from '../guides/MeshCanvasTemplates';

type HomeNavTab = 'notes' | 'templates' | 'gallery';

export class HomeScreenUI {
  public element: HTMLElement;
  private engine: Engine;
  public isVisible: boolean = false;

  private activeTab: HomeNavTab = 'notes';
  private selectedFolder: string = 'ALL';
  private sortBy: ProjectSortOption = 'modified';
  private sortOrder: ProjectSortOrder = 'desc';
  private searchQuery: string = '';
  private selectedTemplateCategory: string = 'all';

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
    if (this.activeTab === 'notes') {
      const projects = await ProjectStorage.listProjects(
        this.selectedFolder,
        this.sortBy,
        this.sortOrder
      );
      const folders = await ProjectStorage.listFolders();
      this.renderNotesDashboard(projects, folders);
    } else if (this.activeTab === 'templates') {
      this.renderTemplatesDashboard();
    } else if (this.activeTab === 'gallery') {
      this.renderGalleryDashboard();
    }
  }

  private render(): void {
    this.element.innerHTML = `
      <div class="modal-card" style="max-width: 960px; width: 95%; max-height: 90vh; display: flex; flex-direction: column; background: rgba(20, 22, 30, 0.95); backdrop-filter: blur(14px); border: 1px solid rgba(255, 255, 255, 0.15); border-radius: 12px; box-shadow: 0 16px 40px rgba(0,0,0,0.6); overflow: hidden; padding: 0;">
        
        <!-- Header -->
        <div class="modal-header" style="display: flex; justify-content: space-between; align-items: center; padding: 14px 20px; border-bottom: 1px solid rgba(255, 255, 255, 0.1); background: rgba(255, 255, 255, 0.03);">
          <div style="display: flex; align-items: center; gap: 12px;">
            <span class="modal-title" style="font-weight: 800; font-size: 14px; letter-spacing: 0.08em; color: var(--fg, #ffffff);">FEATHER STUDIO NOTES & PROJECTS</span>
          </div>
          <div style="display: flex; gap: 8px; align-items: center;">
            <button id="btn-home-new" class="btn btn-sm active" style="font-weight: 700; padding: 6px 12px;">+ NEW NOTE</button>
            <label class="btn btn-sm" style="cursor: pointer; padding: 6px 12px; margin: 0;">
              IMPORT NOTE (.FEATHER)
              <input id="home-file-input" type="file" accept=".json,.wandrlust,.feather" style="display: none;">
            </label>
            <button id="btn-home-close" class="btn btn-sm" style="padding: 6px 12px;">CLOSE</button>
          </div>
        </div>

        <!-- Main Body Area -->
        <div style="display: flex; flex: 1; min-height: 500px; max-height: calc(90vh - 65px); overflow: hidden;">
          
          <!-- Left Navigation Sidebar -->
          <div style="width: 190px; display: flex; flex-direction: column; gap: 6px; border-right: 1px solid rgba(255, 255, 255, 0.1); padding: 16px 12px; background: rgba(0, 0, 0, 0.2);">
            
            <span style="font-size: 9px; font-weight: 800; color: var(--mut, #888); letter-spacing: 0.1em; margin-bottom: 4px; padding-left: 4px;">WORKSPACE</span>
            
            <button id="nav-notes" class="btn btn-sm ${this.activeTab === 'notes' ? 'active' : ''}" style="width: 100%; text-align: left; padding: 8px 10px;">ALL NOTES</button>
            <button id="nav-templates" class="btn btn-sm ${this.activeTab === 'templates' ? 'active' : ''}" style="width: 100%; text-align: left; padding: 8px 10px;">3D TEMPLATES</button>
            <button id="nav-gallery" class="btn btn-sm ${this.activeTab === 'gallery' ? 'active' : ''}" style="width: 100%; text-align: left; padding: 8px 10px;">NATURE GALLERY</button>

            <!-- Folders List Container (when on notes tab) -->
            <div id="sidebar-folder-section" style="margin-top: 14px; display: flex; flex-direction: column; gap: 4px; flex: 1; overflow-y: auto;">
              <div style="display: flex; justify-content: space-between; align-items: center; padding-left: 4px;">
                <span style="font-size: 9px; font-weight: 800; color: var(--mut, #888); letter-spacing: 0.1em;">FOLDERS</span>
                <button id="btn-add-folder" class="btn btn-sm" style="font-size: 8px; padding: 2px 6px;">+ NEW</button>
              </div>
              <div id="sidebar-folders-list" style="display: flex; flex-direction: column; gap: 2px; margin-top: 4px;"></div>
            </div>

            <div style="border-top: 1px solid rgba(255, 255, 255, 0.1); padding-top: 10px; margin-top: auto;">
              <div style="font-size: 8px; color: var(--mut, #888); line-height: 1.4; font-family: monospace;">FEATHER 3D V9 ENGINE<br>S-PEN & WEBGPU READY</div>
            </div>
          </div>

          <!-- Main Content Container -->
          <div id="home-main-content" style="flex: 1; display: flex; flex-direction: column; overflow: hidden; padding: 16px 20px; background: rgba(0, 0, 0, 0.1);">
            <!-- Content dynamically rendered here -->
          </div>
        </div>
      </div>
    `;

    this.bindEvents();
  }

  private bindEvents(): void {
    this.element.querySelector('#btn-home-close')?.addEventListener('click', () => this.hide());
    
    this.element.querySelector('#btn-home-new')?.addEventListener('click', () => {
      this.engine.newSketch();
      this.hide();
    });

    this.element.querySelector('#nav-notes')?.addEventListener('click', () => {
      this.activeTab = 'notes';
      this.updateNavButtons();
      this.refresh();
    });

    this.element.querySelector('#nav-templates')?.addEventListener('click', () => {
      this.activeTab = 'templates';
      this.updateNavButtons();
      this.refresh();
    });

    this.element.querySelector('#nav-gallery')?.addEventListener('click', () => {
      this.activeTab = 'gallery';
      this.updateNavButtons();
      this.refresh();
    });

    this.element.querySelector('#btn-add-folder')?.addEventListener('click', async () => {
      const name = prompt('Enter new folder name:');
      if (name && name.trim()) {
        await ProjectStorage.createFolder(name.trim());
        this.selectedFolder = name.trim();
        await this.refresh();
      }
    });

    const fileInput = this.element.querySelector('#home-file-input') as HTMLInputElement;
    fileInput?.addEventListener('change', (e) => {
      const files = (e.target as HTMLInputElement).files;
      if (files && files.length > 0) {
        const file = files[0];
        const reader = new FileReader();
        reader.onload = async (event) => {
          const content = event.target?.result as string;
          if (content) {
            try {
              FeatherProjectSerializer.deserialize(
                content,
                this.engine.stageManager,
                this.engine.environment,
                this.engine.viewport
              );
              const projectId = `proj_${Date.now()}`;
              const noteName = file.name.replace(/\.(json|wandrlust|feather)$/i, '');
              await ProjectStorage.saveProject(
                projectId,
                noteName,
                content,
                this.engine.stageManager.getAllCurves().length,
                undefined,
                this.selectedFolder === 'ALL' ? 'Recents' : this.selectedFolder
              );
              this.hide();
            } catch (err) {
              console.error('[HomeScreenUI] Import failed:', err);
              alert('Failed to import project note. Please check the file format.');
            }
          }
        };
        reader.readAsText(file);
      }
    });
  }

  private updateNavButtons(): void {
    const notesBtn = this.element.querySelector('#nav-notes');
    const templatesBtn = this.element.querySelector('#nav-templates');
    const galleryBtn = this.element.querySelector('#nav-gallery');
    const folderSec = this.element.querySelector('#sidebar-folder-section') as HTMLElement;

    if (notesBtn) notesBtn.className = `btn btn-sm ${this.activeTab === 'notes' ? 'active' : ''}`;
    if (templatesBtn) templatesBtn.className = `btn btn-sm ${this.activeTab === 'templates' ? 'active' : ''}`;
    if (galleryBtn) galleryBtn.className = `btn btn-sm ${this.activeTab === 'gallery' ? 'active' : ''}`;

    if (folderSec) {
      folderSec.style.display = this.activeTab === 'notes' ? 'flex' : 'none';
    }
  }

  private renderNotesDashboard(projects: ProjectMetadata[], folders: string[]): void {
    const content = this.element.querySelector('#home-main-content') as HTMLElement;
    if (!content) return;

    // Render Folder Sidebar Buttons
    const foldersList = this.element.querySelector('#sidebar-folders-list') as HTMLElement;
    if (foldersList) {
      foldersList.innerHTML = '';
      
      const allBtn = document.createElement('button');
      allBtn.className = `btn btn-sm ${this.selectedFolder === 'ALL' ? 'active' : ''}`;
      allBtn.style.width = '100%';
      allBtn.style.textAlign = 'left';
      allBtn.style.fontSize = '9px';
      allBtn.textContent = 'ALL NOTES';
      allBtn.addEventListener('click', () => {
        this.selectedFolder = 'ALL';
        this.refresh();
      });
      foldersList.appendChild(allBtn);

      folders.forEach(f => {
        const item = document.createElement('div');
        item.style.display = 'flex';
        item.style.gap = '2px';
        item.style.alignItems = 'center';

        const btn = document.createElement('button');
        btn.className = `btn btn-sm ${this.selectedFolder === f ? 'active' : ''}`;
        btn.style.flex = '1';
        btn.style.textAlign = 'left';
        btn.style.fontSize = '9px';
        btn.style.overflow = 'hidden';
        btn.style.textOverflow = 'ellipsis';
        btn.style.whiteSpace = 'nowrap';
        btn.textContent = f.toUpperCase();
        btn.addEventListener('click', () => {
          this.selectedFolder = f;
          this.refresh();
        });
        item.appendChild(btn);

        if (f !== 'Recents' && f !== 'Sketches' && f !== 'Characters' && f !== 'Architecture' && f !== 'Templates') {
          const delFolderBtn = document.createElement('button');
          delFolderBtn.className = 'btn btn-sm btn-danger';
          delFolderBtn.style.padding = '2px 5px';
          delFolderBtn.style.fontSize = '8px';
          delFolderBtn.textContent = 'DEL';
          delFolderBtn.title = 'Delete folder and move notes to Recents';
          delFolderBtn.addEventListener('click', async (e) => {
            e.stopPropagation();
            if (confirm(`Delete folder "${f}"? Notes will be moved to Recents.`)) {
              await ProjectStorage.deleteFolder(f);
              if (this.selectedFolder === f) this.selectedFolder = 'ALL';
              await this.refresh();
            }
          });
          item.appendChild(delFolderBtn);
        }

        foldersList.appendChild(item);
      });
    }

    // Filter projects by search query
    let filtered = projects;
    if (this.searchQuery.trim()) {
      const q = this.searchQuery.trim().toLowerCase();
      filtered = filtered.filter(p => p.name.toLowerCase().includes(q));
    }

    content.innerHTML = `
      <!-- Toolbar Filter / Sort -->
      <div style="display: flex; justify-content: space-between; align-items: center; gap: 10px; margin-bottom: 14px; flex-wrap: wrap;">
        <div style="display: flex; align-items: center; gap: 8px; flex: 1; min-width: 200px;">
          <input id="note-search-input" type="text" placeholder="Search notes by name..." value="${this.searchQuery}" style="flex: 1; max-width: 260px; padding: 6px 10px; font-size: 11px; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.15); border-radius: 6px; color: var(--fg, #ffffff); outline: none;">
          <span style="font-size: 10px; color: var(--mut, #888); font-weight: 700;">FOLDER: ${this.selectedFolder.toUpperCase()}</span>
        </div>

        <div style="display: flex; align-items: center; gap: 6px;">
          <span style="font-size: 10px; color: var(--mut, #888); font-weight: 700;">SORT BY:</span>
          <select id="note-sort-select" style="padding: 5px 8px; font-size: 10px; font-weight: 700; background: rgba(30, 34, 45, 0.9); border: 1px solid rgba(255,255,255,0.2); border-radius: 6px; color: var(--fg, #ffffff); cursor: pointer; outline: none;">
            <option value="modified" ${this.sortBy === 'modified' ? 'selected' : ''}>LAST MODIFIED</option>
            <option value="created" ${this.sortBy === 'created' ? 'selected' : ''}>LAST CREATED</option>
            <option value="name" ${this.sortBy === 'name' ? 'selected' : ''}>NAME</option>
          </select>
          <button id="btn-sort-order" class="btn btn-sm" style="font-weight: 700; padding: 5px 8px;">${this.sortOrder === 'desc' ? 'DESC' : 'ASC'}</button>
        </div>
      </div>

      <!-- Notes Grid -->
      <div style="flex: 1; overflow-y: auto; padding-right: 4px;">
        <div id="notes-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(230px, 1fr)); gap: 12px;"></div>
      </div>
    `;

    // Bind toolbar listeners
    const searchInput = content.querySelector('#note-search-input') as HTMLInputElement;
    searchInput?.addEventListener('input', () => {
      this.searchQuery = searchInput.value;
      this.refresh();
    });

    const sortSelect = content.querySelector('#note-sort-select') as HTMLSelectElement;
    sortSelect?.addEventListener('change', () => {
      this.sortBy = sortSelect.value as ProjectSortOption;
      this.refresh();
    });

    const sortOrderBtn = content.querySelector('#btn-sort-order') as HTMLButtonElement;
    sortOrderBtn?.addEventListener('click', () => {
      this.sortOrder = this.sortOrder === 'desc' ? 'asc' : 'desc';
      this.refresh();
    });

    const grid = content.querySelector('#notes-grid') as HTMLElement;
    if (!grid) return;

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 60px 0; color: var(--mut, #888); font-size: 11px;">
          NO SAVED NOTES FOUND IN THIS VIEW.<br><br>
          CLICK "+ NEW NOTE" TO START A NEW 3D SKETCH OR IMPORT A .FEATHER FILE.
        </div>
      `;
      return;
    }

    filtered.forEach(proj => {
      const card = document.createElement('div');
      card.className = 'layer-item';
      card.style.flexDirection = 'column';
      card.style.alignItems = 'stretch';
      card.style.padding = '12px';
      card.style.gap = '8px';
      card.style.background = 'rgba(255, 255, 255, 0.04)';
      card.style.border = '1px solid rgba(255, 255, 255, 0.08)';
      card.style.borderRadius = '8px';

      const modDate = new Date(proj.modified).toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });

      const thumbHtml = proj.thumbnail
        ? `<img src="${proj.thumbnail}" style="width: 100%; height: 85px; object-fit: cover; border-radius: 6px; border: 1px solid rgba(255,255,255,0.1); margin-bottom: 2px;" />`
        : `<div style="width: 100%; height: 60px; background: rgba(0,0,0,0.3); border-radius: 6px; border: 1px dashed rgba(255,255,255,0.1); display: flex; align-items: center; justify-content: center; font-size: 9px; color: var(--mut, #888); font-weight: 700; letter-spacing: 0.05em;">3D NOTE CANVAS</div>`;

      card.innerHTML = `
        ${thumbHtml}
        
        <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 6px;">
          <span style="font-weight: 800; font-size: 12px; color: var(--fg, #ffffff); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; flex: 1;">${proj.name}</span>
          <span style="font-size: 9px; color: var(--mut, #888); white-space: nowrap;">${proj.strokeCount} strk</span>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; font-size: 8px; color: var(--mut, #888);">
          <span>${modDate}</span>
          <span style="padding: 2px 5px; background: rgba(255,255,255,0.06); border-radius: 4px;">${(proj.folder || 'Recents').toUpperCase()}</span>
        </div>

        <!-- Primary Action -->
        <button class="btn btn-sm btn-open" style="width: 100%; font-weight: 800; padding: 6px 0; background: var(--accent, #3b82f6); color: #ffffff;">OPEN NOTE</button>

        <!-- Secondary Operations Grid -->
        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 4px; margin-top: 2px;">
          <button class="btn btn-sm btn-rename" title="Rename note" style="padding: 4px 2px; font-size: 8px;">RENAME</button>
          <button class="btn btn-sm btn-duplicate" title="Duplicate note (unlinked clone)" style="padding: 4px 2px; font-size: 8px;">DUPLICATE</button>
          <button class="btn btn-sm btn-export" title="Export .feather file" style="padding: 4px 2px; font-size: 8px;">EXPORT</button>
          <button class="btn btn-sm btn-lighten" title="Decimate curve points with RDP to reduce memory footprint" style="padding: 4px 2px; font-size: 8px;">LIGHTEN</button>
        </div>

        <div style="display: flex; gap: 4px; margin-top: 2px;">
          <button class="btn btn-sm btn-move" style="flex: 1; padding: 4px 0; font-size: 8px;">MOVE TO FOLDER</button>
          <button class="btn btn-sm btn-danger btn-del" style="padding: 4px 8px; font-size: 8px;">DELETE</button>
        </div>
      `;

      // Open Note
      card.querySelector('.btn-open')?.addEventListener('click', async () => {
        const data = await ProjectStorage.loadProject(proj.id);
        if (data) {
          try {
            FeatherProjectSerializer.deserialize(
              data,
              this.engine.stageManager,
              this.engine.environment,
              this.engine.viewport
            );
          } catch (err) {
            console.error('[HomeScreenUI] Load note failed:', err);
          }
        }
        this.hide();
      });

      // Rename
      card.querySelector('.btn-rename')?.addEventListener('click', async () => {
        const newName = prompt('Enter new note name:', proj.name);
        if (newName && newName.trim() && newName.trim() !== proj.name) {
          await ProjectStorage.renameProject(proj.id, newName.trim());
          await this.refresh();
        }
      });

      // Duplicate
      card.querySelector('.btn-duplicate')?.addEventListener('click', async () => {
        await ProjectStorage.duplicateProject(proj.id);
        await this.refresh();
      });

      // Export
      card.querySelector('.btn-export')?.addEventListener('click', async () => {
        await ProjectStorage.exportProject(proj.id);
      });

      // Lighten
      card.querySelector('.btn-lighten')?.addEventListener('click', async () => {
        const lightenBtn = card.querySelector('.btn-lighten') as HTMLButtonElement;
        if (lightenBtn) lightenBtn.textContent = 'OPTIMIZING...';
        await ProjectStorage.lightenProject(proj.id, 0.01, true);
        await this.refresh();
      });

      // Move to folder
      card.querySelector('.btn-move')?.addEventListener('click', async () => {
        const target = prompt(`Move "${proj.name}" to folder:\n(e.g., Sketches, Characters, Architecture, or enter a new folder name)`, proj.folder || 'Recents');
        if (target && target.trim()) {
          await ProjectStorage.moveProjectToFolder(proj.id, target.trim());
          await this.refresh();
        }
      });

      // Delete
      card.querySelector('.btn-del')?.addEventListener('click', async () => {
        if (confirm(`Delete note "${proj.name}" permanently?`)) {
          await ProjectStorage.deleteProject(proj.id);
          await this.refresh();
        }
      });

      grid.appendChild(card);
    });
  }

  private renderTemplatesDashboard(): void {
    const content = this.element.querySelector('#home-main-content') as HTMLElement;
    if (!content) return;

    const templates = this.selectedTemplateCategory === 'all'
      ? MeshCanvasTemplates.getTemplates()
      : MeshCanvasTemplates.getTemplatesByCategory(this.selectedTemplateCategory as TemplateCategory);

    content.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; flex-wrap: wrap; gap: 8px;">
        <div>
          <span style="font-weight: 800; font-size: 13px; color: var(--fg, #ffffff);">3D MESH CANVAS COLORING TEMPLATES</span>
          <div style="font-size: 9px; color: var(--mut, #888); margin-top: 2px;">Blank 3D models with surface face snapping -- rotate and draw directly on any side.</div>
        </div>

        <div style="display: flex; gap: 4px;">
          <button data-cat="all" class="btn btn-sm ${this.selectedTemplateCategory === 'all' ? 'active' : ''}">ALL</button>
          <button data-cat="beginner" class="btn btn-sm ${this.selectedTemplateCategory === 'beginner' ? 'active' : ''}">BEGINNER / KIDS</button>
          <button data-cat="intermediate" class="btn btn-sm ${this.selectedTemplateCategory === 'intermediate' ? 'active' : ''}">INTERMEDIATE</button>
          <button data-cat="advanced" class="btn btn-sm ${this.selectedTemplateCategory === 'advanced' ? 'active' : ''}">ADVANCED</button>
        </div>
      </div>

      <div style="flex: 1; overflow-y: auto; padding-right: 4px;">
        <div id="template-card-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 12px;"></div>
      </div>
    `;

    // Category button clicks
    content.querySelectorAll('button[data-cat]').forEach(btn => {
      btn.addEventListener('click', () => {
        this.selectedTemplateCategory = btn.getAttribute('data-cat') || 'all';
        this.renderTemplatesDashboard();
      });
    });

    const grid = content.querySelector('#template-card-grid') as HTMLElement;
    if (!grid) return;

    templates.forEach(t => {
      const card = document.createElement('div');
      card.className = 'layer-item';
      card.style.flexDirection = 'column';
      card.style.alignItems = 'stretch';
      card.style.padding = '14px';
      card.style.gap = '8px';
      card.style.background = 'rgba(255, 255, 255, 0.04)';
      card.style.border = '1px solid rgba(255, 255, 255, 0.08)';
      card.style.borderRadius = '8px';

      card.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span style="font-weight: 800; font-size: 12px; color: var(--fg, #ffffff);">${t.name.toUpperCase()}</span>
          <span style="font-size: 8px; font-weight: 700; padding: 2px 6px; border-radius: 4px; background: rgba(59, 130, 246, 0.2); color: #60a5fa;">${t.difficulty.toUpperCase()}</span>
        </div>

        <div style="font-size: 9px; color: var(--mut, #888); line-height: 1.4; min-height: 36px;">
          ${t.description}
        </div>

        <button class="btn btn-sm btn-load-template" style="width: 100%; font-weight: 800; padding: 7px 0; margin-top: 4px; background: var(--accent, #3b82f6); color: #ffffff;">
          START 3D COLORING
        </button>
      `;

      card.querySelector('.btn-load-template')?.addEventListener('click', () => {
        this.engine.loadCanvasTemplate(t.id);
        this.hide();
      });

      grid.appendChild(card);
    });
  }

  private renderGalleryDashboard(): void {
    const content = this.element.querySelector('#home-main-content') as HTMLElement;
    if (!content) return;

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

    content.innerHTML = `
      <div style="margin-bottom: 12px;">
        <span style="font-weight: 800; font-size: 13px; color: var(--fg, #ffffff);">LIVING NATURE SCENES</span>
        <div style="font-size: 9px; color: var(--mut, #888); margin-top: 2px;">Interactive procedural 3D environments with dynamic lighting, wildlife, and procedural skies.</div>
      </div>

      <div style="flex: 1; overflow-y: auto; padding-right: 4px;">
        <div id="gallery-card-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 12px;"></div>
      </div>
    `;

    const grid = content.querySelector('#gallery-card-grid') as HTMLElement;
    if (!grid) return;

    galleryItems.forEach(item => {
      const card = document.createElement('div');
      card.className = 'layer-item';
      card.style.flexDirection = 'column';
      card.style.alignItems = 'stretch';
      card.style.padding = '14px';
      card.style.gap = '8px';
      card.style.background = 'rgba(255, 255, 255, 0.04)';
      card.style.border = '1px solid rgba(255, 255, 255, 0.08)';
      card.style.borderRadius = '8px';

      card.innerHTML = `
        <div style="font-weight: 800; font-size: 12px; color: var(--fg, #ffffff);">${item.name.toUpperCase()}</div>
        <div style="font-size: 9px; color: var(--mut, #888); line-height: 1.4; min-height: 36px;">${item.desc}</div>
        <div style="margin-top: 4px;">
          <button class="btn btn-sm btn-load-scene" style="width: 100%; font-weight: 800; padding: 7px 0; background: var(--accent, #3b82f6); color: #ffffff;">LOAD NATURE SCENE</button>
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
  }
}
