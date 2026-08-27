import * as THREE from 'three';
import { CurveMath, CurvePoint } from '../math/CurveMath';

export interface ProjectMetadata {
  id: string;
  name: string;
  created: number;
  modified: number;
  strokeCount: number;
  thumbnail?: string;
  folder?: string;
  data: string;
}

export type ProjectSortOption = 'modified' | 'created' | 'name';
export type ProjectSortOrder = 'asc' | 'desc';

export class ProjectStorage {
  private static DB_NAME = 'Feather3D_DB';
  private static STORE_PROJECTS = 'projects';
  private static STORE_FOLDERS = 'folders';
  private static DB_VERSION = 3;

  private static DEFAULT_FOLDERS: string[] = [
    'Recents',
    'Sketches',
    'Characters',
    'Architecture',
    'Templates'
  ];

  private static openDB(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.DB_NAME, this.DB_VERSION);

      request.onupgradeneeded = (e) => {
        const db = (e.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(this.STORE_PROJECTS)) {
          db.createObjectStore(this.STORE_PROJECTS, { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains(this.STORE_FOLDERS)) {
          db.createObjectStore(this.STORE_FOLDERS, { keyPath: 'name' });
        }
      };

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  public static async listProjects(
    folder?: string,
    sortBy: ProjectSortOption = 'modified',
    sortOrder: ProjectSortOrder = 'desc'
  ): Promise<ProjectMetadata[]> {
    try {
      const db = await this.openDB();
      return new Promise((resolve, reject) => {
        const tx = db.transaction(this.STORE_PROJECTS, 'readonly');
        const store = tx.objectStore(this.STORE_PROJECTS);
        const req = store.getAll();

        req.onsuccess = () => {
          let list: ProjectMetadata[] = req.result || [];

          // Normalize records
          list = list.map(item => ({
            ...item,
            created: item.created || item.modified || Date.now(),
            folder: item.folder || 'Recents'
          }));

          // Filter by folder if specified and not ALL
          if (folder && folder.toUpperCase() !== 'ALL' && folder.toUpperCase() !== 'ALL NOTES') {
            list = list.filter(item => {
              const itemFolder = item.folder || 'Recents';
              return itemFolder.toLowerCase() === folder.toLowerCase() ||
                itemFolder.toLowerCase().startsWith(folder.toLowerCase() + '/');
            });
          }

          // Sorting
          list.sort((a, b) => {
            let comparison = 0;
            if (sortBy === 'modified') {
              comparison = a.modified - b.modified;
            } else if (sortBy === 'created') {
              comparison = a.created - b.created;
            } else if (sortBy === 'name') {
              comparison = a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' });
            }

            return sortOrder === 'desc' ? -comparison : comparison;
          });

          resolve(list);
        };
        req.onerror = () => reject(req.error);
      });
    } catch (err) {
      console.warn('[ProjectStorage] IndexedDB unavailable, fallback to empty list', err);
      return [];
    }
  }

  public static async getProject(id: string): Promise<ProjectMetadata | null> {
    const db = await this.openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(this.STORE_PROJECTS, 'readonly');
      const store = tx.objectStore(this.STORE_PROJECTS);
      const req = store.get(id);
      req.onsuccess = () => {
        if (req.result) {
          const item = req.result;
          resolve({
            ...item,
            created: item.created || item.modified || Date.now(),
            folder: item.folder || 'Recents'
          });
        } else {
          resolve(null);
        }
      };
      req.onerror = () => reject(req.error);
    });
  }

  public static async saveProject(
    id: string,
    name: string,
    jsonString: string,
    strokeCount: number,
    thumbnail?: string,
    folder: string = 'Recents',
    created?: number
  ): Promise<void> {
    const db = await this.openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(this.STORE_PROJECTS, 'readwrite');
      const store = tx.objectStore(this.STORE_PROJECTS);
      const now = Date.now();
      const item: ProjectMetadata = {
        id,
        name,
        created: created || now,
        modified: now,
        strokeCount,
        thumbnail,
        folder: folder || 'Recents',
        data: jsonString
      };
      const req = store.put(item);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  }

  public static async loadProject(id: string): Promise<string | null> {
    const item = await this.getProject(id);
    return item ? item.data : null;
  }

  public static async deleteProject(id: string): Promise<void> {
    const db = await this.openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(this.STORE_PROJECTS, 'readwrite');
      const store = tx.objectStore(this.STORE_PROJECTS);
      const req = store.delete(id);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  }

  public static async renameProject(id: string, newName: string): Promise<void> {
    const db = await this.openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(this.STORE_PROJECTS, 'readwrite');
      const store = tx.objectStore(this.STORE_PROJECTS);
      const getReq = store.get(id);
      getReq.onsuccess = () => {
        if (getReq.result) {
          const item = getReq.result;
          item.name = newName.trim() || item.name;
          item.modified = Date.now();
          store.put(item);
        }
        resolve();
      };
      getReq.onerror = () => reject(getReq.error);
    });
  }

  public static async duplicateProject(id: string): Promise<string | null> {
    const original = await this.getProject(id);
    if (!original) return null;

    const newId = `proj_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const newName = `${original.name} Copy`;
    const now = Date.now();

    let duplicatedJson = original.data;
    try {
      const parsed = JSON.parse(original.data);
      parsed.name = newName;
      parsed.created = now;
      parsed.modified = now;
      duplicatedJson = JSON.stringify(parsed);
    } catch {
      // Keep original string if parse fails
    }

    await this.saveProject(
      newId,
      newName,
      duplicatedJson,
      original.strokeCount,
      original.thumbnail,
      original.folder,
      now
    );

    return newId;
  }

  public static async exportProject(id: string): Promise<boolean> {
    const project = await this.getProject(id);
    if (!project) return false;

    try {
      const blob = new Blob([project.data], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const safeName = project.name.replace(/[/\\?%*:|"<>]/g, '-').trim() || 'UntitledNote';
      const a = document.createElement('a');
      a.href = url;
      a.download = `${safeName}.feather`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      return true;
    } catch (err) {
      console.error('[ProjectStorage] Export failed:', err);
      return false;
    }
  }

  /**
   * Lighten Tool: Decimates dense procedural curve points using Ramer-Douglas-Peucker algorithm
   * to optimize storage and reduce GPU vertex memory on mobile devices.
   */
  public static async lightenProject(id: string, tolerance: number = 0.01, asCopy: boolean = true): Promise<string | null> {
    const project = await this.getProject(id);
    if (!project) return null;

    try {
      const parsed = JSON.parse(project.data);
      let totalReducedPoints = 0;
      let totalOriginalPoints = 0;

      if (Array.isArray(parsed.layers)) {
        parsed.layers.forEach((layer: any) => {
          if (Array.isArray(layer.curves)) {
            layer.curves.forEach((curve: any) => {
              if (Array.isArray(curve.points) && curve.points.length > 2) {
                totalOriginalPoints += curve.points.length;
                const formattedPts: CurvePoint[] = curve.points.map((p: any) => ({
                  position: new THREE.Vector3(p.position[0], p.position[1], p.position[2]),
                  pressure: typeof p.pressure === 'number' ? p.pressure : 1.0,
                  tilt: new THREE.Vector2(p.tilt?.[0] || 0, p.tilt?.[1] || 0),
                  time: typeof p.time === 'number' ? p.time : 0
                }));

                const simplified = CurveMath.simplifyDouglasPeucker(formattedPts, tolerance);
                totalReducedPoints += simplified.length;

                curve.points = simplified.map(p => ({
                  position: [p.position.x, p.position.y, p.position.z],
                  pressure: p.pressure,
                  tilt: [p.tilt.x, p.tilt.y],
                  time: p.time
                }));
              }
            });
          }
        });
      }

      console.log(
        `[ProjectStorage] Lightened project: ${totalOriginalPoints} points -> ${totalReducedPoints} points (tolerance ${tolerance})`
      );

      const lightenedJson = JSON.stringify(parsed);
      const targetId = asCopy ? `proj_light_${Date.now()}` : id;
      const targetName = asCopy ? `${project.name} (Lightened)` : project.name;
      const strokeCount = parsed.layers?.reduce((acc: number, l: any) => acc + (l.curves?.length || 0), 0) || project.strokeCount;

      await this.saveProject(
        targetId,
        targetName,
        lightenedJson,
        strokeCount,
        project.thumbnail,
        project.folder,
        asCopy ? Date.now() : project.created
      );

      return targetId;
    } catch (err) {
      console.error('[ProjectStorage] Failed to lighten project:', err);
      return null;
    }
  }

  public static async listFolders(): Promise<string[]> {
    try {
      const db = await this.openDB();
      const storedFolders: string[] = await new Promise((resolve) => {
        const tx = db.transaction(this.STORE_FOLDERS, 'readonly');
        const store = tx.objectStore(this.STORE_FOLDERS);
        const req = store.getAll();
        req.onsuccess = () => {
          const list: Array<{ name: string }> = req.result || [];
          resolve(list.map(f => f.name));
        };
        req.onerror = () => resolve([]);
      });

      const projects = await this.listProjects();
      const projectFolders = projects.map(p => p.folder || 'Recents');

      const all = Array.from(new Set([
        ...this.DEFAULT_FOLDERS,
        ...storedFolders,
        ...projectFolders
      ])).filter(Boolean);

      return all;
    } catch {
      return [...this.DEFAULT_FOLDERS];
    }
  }

  public static async createFolder(folderName: string): Promise<void> {
    const trimmed = folderName.trim();
    if (!trimmed) return;

    const db = await this.openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(this.STORE_FOLDERS, 'readwrite');
      const store = tx.objectStore(this.STORE_FOLDERS);
      const req = store.put({ name: trimmed, created: Date.now() });
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  }

  public static async deleteFolder(folderName: string): Promise<void> {
    const trimmed = folderName.trim();
    if (!trimmed || trimmed === 'Recents') return;

    const db = await this.openDB();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(this.STORE_FOLDERS, 'readwrite');
      const store = tx.objectStore(this.STORE_FOLDERS);
      const req = store.delete(trimmed);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });

    // Move any projects in this folder to Recents
    const projects = await this.listProjects(trimmed);
    for (const proj of projects) {
      await this.moveProjectToFolder(proj.id, 'Recents');
    }
  }

  public static async moveProjectToFolder(id: string, newFolder: string): Promise<void> {
    const db = await this.openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(this.STORE_PROJECTS, 'readwrite');
      const store = tx.objectStore(this.STORE_PROJECTS);
      const getReq = store.get(id);
      getReq.onsuccess = () => {
        if (getReq.result) {
          const item = getReq.result;
          item.folder = newFolder.trim() || 'Recents';
          item.modified = Date.now();
          store.put(item);
        }
        resolve();
      };
      getReq.onerror = () => reject(getReq.error);
    });
  }
}
