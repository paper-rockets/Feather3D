import { CurveMath, CurvePoint } from '../math/CurveMath';

export interface ProjectMetadata {
  id: string;
  name: string;
  modified: number;
  strokeCount: number;
  thumbnail?: string;
  folder?: string;
  data: string;
}

export class ProjectStorage {
  private static DB_NAME = 'Feather3D_DB';
  private static STORE_NAME = 'projects';
  private static DB_VERSION = 2;

  private static openDB(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.DB_NAME, this.DB_VERSION);

      request.onupgradeneeded = (e) => {
        const db = (e.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(this.STORE_NAME)) {
          db.createObjectStore(this.STORE_NAME, { keyPath: 'id' });
        }
      };

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  public static async listProjects(): Promise<ProjectMetadata[]> {
    try {
      const db = await this.openDB();
      return new Promise((resolve, reject) => {
        const tx = db.transaction(this.STORE_NAME, 'readonly');
        const store = tx.objectStore(this.STORE_NAME);
        const req = store.getAll();

        req.onsuccess = () => {
          const list: ProjectMetadata[] = req.result || [];
          list.sort((a, b) => b.modified - a.modified);
          resolve(list);
        };
        req.onerror = () => reject(req.error);
      });
    } catch (err) {
      console.warn('IndexedDB unavailable, fallback to empty list', err);
      return [];
    }
  }

  public static async saveProject(
    id: string,
    name: string,
    jsonString: string,
    strokeCount: number,
    thumbnail?: string,
    folder: string = 'Recents'
  ): Promise<void> {
    const db = await this.openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(this.STORE_NAME, 'readwrite');
      const store = tx.objectStore(this.STORE_NAME);
      const item: ProjectMetadata = {
        id,
        name,
        modified: Date.now(),
        strokeCount,
        thumbnail,
        folder,
        data: jsonString
      };
      const req = store.put(item);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  }

  public static async loadProject(id: string): Promise<string | null> {
    const db = await this.openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(this.STORE_NAME, 'readonly');
      const store = tx.objectStore(this.STORE_NAME);
      const req = store.get(id);
      req.onsuccess = () => {
        if (req.result) resolve(req.result.data);
        else resolve(null);
      };
      req.onerror = () => reject(req.error);
    });
  }

  public static async deleteProject(id: string): Promise<void> {
    const db = await this.openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(this.STORE_NAME, 'readwrite');
      const store = tx.objectStore(this.STORE_NAME);
      const req = store.delete(id);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  }

  public static async renameProject(id: string, newName: string): Promise<void> {
    const db = await this.openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(this.STORE_NAME, 'readwrite');
      const store = tx.objectStore(this.STORE_NAME);
      const getReq = store.get(id);
      getReq.onsuccess = () => {
        if (getReq.result) {
          const item = getReq.result;
          item.name = newName;
          item.modified = Date.now();
          store.put(item);
        }
        resolve();
      };
      getReq.onerror = () => reject(getReq.error);
    });
  }

  /**
   * Lighten Tool: Decimates vertex density using Douglas-Peucker point decimation to reduce file size.
   */
  public static async lightenProject(id: string, tolerance: number = 0.01, asCopy: boolean = true): Promise<string | null> {
    const dataStr = await this.loadProject(id);
    if (!dataStr) return null;

    try {
      const parsed = JSON.parse(dataStr);
      if (Array.isArray(parsed.layers)) {
        parsed.layers.forEach((layer: any) => {
          if (Array.isArray(layer.curves)) {
            layer.curves.forEach((curve: any) => {
              if (Array.isArray(curve.points) && curve.points.length > 2) {
                const formattedPts: CurvePoint[] = curve.points.map((p: any) => ({
                  position: { x: p.position[0], y: p.position[1], z: p.position[2] } as any,
                  pressure: p.pressure,
                  tilt: { x: p.tilt[0], y: p.tilt[1] } as any,
                  time: p.time
                }));
                const simplified = CurveMath.simplifyDouglasPeucker(formattedPts, tolerance);
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

      const lightenedJson = JSON.stringify(parsed);
      const targetId = asCopy ? `proj_lightened_${Date.now()}` : id;
      const targetName = asCopy ? `${parsed.name || 'Sketch'} (Lightened)` : (parsed.name || 'Sketch');

      const strokeCount = parsed.layers?.reduce((acc: number, l: any) => acc + (l.curves?.length || 0), 0) || 0;
      await this.saveProject(targetId, targetName, lightenedJson, strokeCount);
      return targetId;
    } catch (err) {
      console.error('Failed to lighten project:', err);
      return null;
    }
  }
}
