import { Engine } from '../core/Engine';

interface Vec3 { x: number; y: number; z: number; }
interface Quat { x: number; y: number; z: number; w: number; }
interface Point2D { x: number; y: number; }

const VERTICES: Vec3[] = [
  { x: -1, y: -1, z: -1 }, // 0
  { x:  1, y: -1, z: -1 }, // 1
  { x:  1, y:  1, z: -1 }, // 2
  { x: -1, y:  1, z: -1 }, // 3
  { x: -1, y: -1, z:  1 }, // 4
  { x:  1, y: -1, z:  1 }, // 5
  { x:  1, y:  1, z:  1 }, // 6
  { x: -1, y:  1, z:  1 }, // 7
];

const FACES = [
  { id: 'back',   label: 'BACK',   indices: [1, 0, 3, 2], normal: { x: 0, y: 0, z: -1 } },
  { id: 'front',  label: 'FRONT',  indices: [4, 5, 6, 7], normal: { x: 0, y: 0, z: 1 } },
  { id: 'left',   label: 'LEFT',   indices: [0, 4, 7, 3], normal: { x: -1, y: 0, z: 0 } },
  { id: 'right',  label: 'RIGHT',  indices: [5, 1, 2, 6], normal: { x: 1, y: 0, z: 0 } },
  { id: 'bottom', label: 'BOTTOM', indices: [0, 1, 5, 4], normal: { x: 0, y: -1, z: 0 } },
  { id: 'top',    label: 'TOP',    indices: [3, 2, 6, 7], normal: { x: 0, y: 1, z: 0 } },
];

const AXES = [
  { color: '#e0483a', end: { x: 1.5, y: 0, z: 0 } }, // X - Red
  { color: '#3ab24a', end: { x: 0, y: 1.5, z: 0 } }, // Y - Green
  { color: '#3a6be0', end: { x: 0, y: 0, z: 1.5 } }, // Z - Blue
];

export class NavCubeWidget {
  public element!: HTMLElement;
  private engine: Engine;
  private canvas!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;
  private isDragging: boolean = false;
  private lastX: number = 0;
  private lastY: number = 0;
  private dragDistance: number = 0;
  private size: number = 110;
  private hoveredFace: string | null = null;
  private facePolygons: Map<string, Point2D[]> = new Map();

  constructor(engine: Engine) {
    this.engine = engine;
    this.injectStyles();
    this.render();
    this.bindEvents();
    
    // Initial draw
    requestAnimationFrame(() => this.update());
  }

  private injectStyles(): void {
    if (document.getElementById('navcube-styles')) return;
    const style = document.createElement('style');
    style.id = 'navcube-styles';
    style.textContent = `
      .navcube-container {
        position: fixed;
        top: 56px;
        left: 12px;
        z-index: 110;
        background: var(--pan);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        border: 1px solid var(--bdr);
        border-radius: var(--radius-sm);
        width: 110px;
        height: 110px;
        cursor: grab;
        overflow: hidden;
        user-select: none;
      }
      .navcube-container:active {
        cursor: grabbing;
      }
      .navcube-canvas {
        display: block;
        width: 100%;
        height: 100%;
        outline: none;
      }
    `;
    document.head.appendChild(style);
  }

  public update(): void {
    this.draw();
  }

  private render(): void {
    this.element = document.createElement('div');
    this.element.id = 'navcube-widget';
    this.element.className = 'navcube-container';

    this.canvas = document.createElement('canvas');
    this.canvas.className = 'navcube-canvas';
    
    // Handle high DPI displays
    const dpr = window.devicePixelRatio || 1;
    this.canvas.width = this.size * dpr;
    this.canvas.height = this.size * dpr;
    
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
    this.ctx.scale(dpr, dpr);
    
    this.element.appendChild(this.canvas);
    document.body.appendChild(this.element);
  }

  private rotateByQuat(v: Vec3, q: Quat): Vec3 {
    // q * v * q^-1
    const qx = q.x, qy = q.y, qz = q.z, qw = q.w;
    const x = v.x, y = v.y, z = v.z;
    
    const ix = qw * x + qy * z - qz * y;
    const iy = qw * y + qz * x - qx * z;
    const iz = qw * z + qx * y - qy * x;
    const iw = -qx * x - qy * y - qz * z;
    
    return {
      x: ix * qw + iw * -qx + iy * -qz - iz * -qy,
      y: iy * qw + iw * -qy + iz * -qx - ix * -qz,
      z: iz * qw + iw * -qz + ix * -qy - iy * -qx
    };
  }

  private draw(): void {
    if (!this.engine.viewport || !this.engine.viewport.activeCamera) return;

    this.ctx.clearRect(0, 0, this.size, this.size);
    
    const camQuat = this.engine.viewport.activeCamera.quaternion;
    // Inverse quaternion to go from world to view space
    const invQuat = { x: -camQuat.x, y: -camQuat.y, z: -camQuat.z, w: camQuat.w };

    const scale = this.size * 0.25;
    const cx = this.size / 2;
    const cy = this.size / 2;

    const project = (v: Vec3): Point2D => ({
      x: cx + v.x * scale,
      y: cy - v.y * scale // Canvas Y is down, 3D Y is up
    });

    // 1. Draw Axes behind or within the cube (we draw them first)
    this.ctx.lineWidth = 2;
    for (const axis of AXES) {
      const rotatedEnd = this.rotateByQuat(axis.end, invQuat);
      const p1 = project({ x: 0, y: 0, z: 0 });
      const p2 = project(rotatedEnd);

      this.ctx.beginPath();
      this.ctx.moveTo(p1.x, p1.y);
      this.ctx.lineTo(p2.x, p2.y);
      this.ctx.strokeStyle = axis.color;
      this.ctx.stroke();
    }

    // 2. Prepare Faces
    const rotatedVertices = VERTICES.map(v => this.rotateByQuat(v, invQuat));
    
    const facesData = FACES.map(face => {
      const v0 = rotatedVertices[face.indices[0]];
      const v1 = rotatedVertices[face.indices[1]];
      const v2 = rotatedVertices[face.indices[2]];
      const v3 = rotatedVertices[face.indices[3]];
      
      const centerZ = (v0.z + v1.z + v2.z + v3.z) / 4;
      const rotatedNormal = this.rotateByQuat(face.normal, invQuat);
      
      return {
        ...face,
        centerZ,
        normalZ: rotatedNormal.z,
        points: face.indices.map(idx => project(rotatedVertices[idx]))
      };
    });

    // Sort by Z (painter's algorithm) - smaller Z drawn first
    facesData.sort((a, b) => a.centerZ - b.centerZ);
    this.facePolygons.clear();

    // Fetch CSS variables for colors
    const computedStyle = getComputedStyle(document.body);
    const panHoverColor = computedStyle.getPropertyValue('--pan-hover').trim() || 'rgba(255, 255, 255, 0.1)';
    const activeBorderColor = computedStyle.getPropertyValue('--active').trim() || '#3a6be0';
    const textColor = computedStyle.getPropertyValue('--ink').trim() || '#ffffff';
    const bdrColor = computedStyle.getPropertyValue('--bdr').trim() || 'rgba(255, 255, 255, 0.2)';

    // 3. Draw Faces
    for (const face of facesData) {
      // Only draw faces that are facing the camera or just draw all to keep the cube solid
      // We will draw all since we Z-sort, but backfaces could be culled
      if (face.normalZ < 0 && face.centerZ < 0) {
          // It's a backface, drawing it with low opacity creates a cool wireframe/glass effect
          this.ctx.fillStyle = 'rgba(128, 128, 128, 0.1)';
      } else {
          this.ctx.fillStyle = 'rgba(128, 128, 128, 0.3)'; 
      }
      
      const pts = face.points;
      
      this.ctx.beginPath();
      this.ctx.moveTo(pts[0].x, pts[0].y);
      for (let i = 1; i < pts.length; i++) {
        this.ctx.lineTo(pts[i].x, pts[i].y);
      }
      this.ctx.closePath();

      // Only store polygons for hit testing if they are front-facing
      if (face.normalZ >= 0) {
        this.facePolygons.set(face.id, pts);
      }

      const isHovered = this.hoveredFace === face.id;
      
      if (isHovered) {
        this.ctx.fillStyle = panHoverColor;
      }
      
      this.ctx.fill();
      
      this.ctx.lineWidth = isHovered ? 2 : 1;
      this.ctx.strokeStyle = isHovered ? activeBorderColor : bdrColor;
      this.ctx.stroke();

      // Draw Text for front-facing faces
      if (face.normalZ > 0) {
        const cx = (pts[0].x + pts[1].x + pts[2].x + pts[3].x) / 4;
        const cy = (pts[0].y + pts[1].y + pts[2].y + pts[3].y) / 4;
        
        this.ctx.fillStyle = textColor;
        this.ctx.font = 'bold 10px monospace';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        
        // Simple text projection (could apply affine transform for true perspective, but 2D is fine for now)
        this.ctx.fillText(face.label, cx, cy);
      }
    }
  }

  private bindEvents(): void {
    this.canvas.addEventListener('mousedown', (e: MouseEvent) => {
      this.isDragging = true;
      this.dragDistance = 0;
      this.lastX = e.clientX;
      this.lastY = e.clientY;
    });

    window.addEventListener('mousemove', (e: MouseEvent) => {
      if (this.isDragging) {
        const dx = e.clientX - this.lastX;
        const dy = e.clientY - this.lastY;
        this.dragDistance += Math.abs(dx) + Math.abs(dy);
        this.lastX = e.clientX;
        this.lastY = e.clientY;
        
        if (this.engine.viewport && this.engine.viewport.orbit) {
          this.engine.viewport.orbit(dx, dy);
        }
      } else {
        // Hit testing for hover
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const face = this.hitTestFace(x, y);
        if (face !== this.hoveredFace) {
          this.hoveredFace = face;
          this.draw(); // Redraw for hover state
        }
      }
    });

    window.addEventListener('mouseup', (e: MouseEvent) => {
      if (this.isDragging) {
        this.isDragging = false;
        
        // If it was a click (not a drag), snap to view
        if (this.dragDistance < 5) {
          const rect = this.canvas.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          
          const face = this.hitTestFace(x, y);
          if (face && this.engine.viewport && this.engine.viewport.setViewPreset) {
            this.engine.viewport.setViewPreset(face as any);
          }
        }
      }
    });
    
    this.canvas.addEventListener('mouseleave', () => {
      if (this.hoveredFace !== null) {
        this.hoveredFace = null;
        this.draw();
      }
    });
  }

  private hitTestFace(x: number, y: number): string | null {
    // Check polygons in reverse order (top-most first)
    // Since Map iterates in insertion order and we inserted based on Z-sort (lowest to highest Z),
    // the last inserted ones are the ones on top (closest to camera).
    const entries = Array.from(this.facePolygons.entries()).reverse();
    
    for (const [id, points] of entries) {
      if (this.pointInPolygon({ x, y }, points)) {
        return id;
      }
    }
    return null;
  }

  private pointInPolygon(point: Point2D, vs: Point2D[]): boolean {
    const x = point.x, y = point.y;
    let inside = false;
    for (let i = 0, j = vs.length - 1; i < vs.length; j = i++) {
      const xi = vs[i].x, yi = vs[i].y;
      const xj = vs[j].x, yj = vs[j].y;
      
      const intersect = ((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
      if (intersect) inside = !inside;
    }
    return inside;
  }
}
