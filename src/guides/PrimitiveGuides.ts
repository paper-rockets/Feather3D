import * as THREE from 'three';
import { SurfaceSnapping } from '../math/SurfaceSnapping';

export type PrimitiveType = 'cube' | 'sphere' | 'cylinder' | 'pyramid' | 'tube' | 'cone' | 'torus';

export class PrimitiveGuides {
  public mesh: THREE.Mesh;
  public wireframe: THREE.LineSegments;
  public group: THREE.Group;
  public type: PrimitiveType;
  public segments: number = 24;
  public size: number = 1.5;

  constructor(type: PrimitiveType = 'sphere', size: number = 1.5, segments: number = 24) {
    this.type = type;
    this.size = size;
    this.segments = segments;
    this.group = new THREE.Group();
    this.group.name = `PrimitiveGuide_${type}`;

    const geometry = this.createGeometry(type, size, segments);
    SurfaceSnapping.buildBVH({ geometry } as any);

    const material = new THREE.MeshBasicMaterial({
      color: 0x1e52a0,
      transparent: true,
      opacity: 0.15,
      side: THREE.DoubleSide,
      depthWrite: false
    });

    this.mesh = new THREE.Mesh(geometry, material);
    this.group.add(this.mesh);

    const wireGeo = new THREE.WireframeGeometry(geometry);
    const wireMat = new THREE.LineBasicMaterial({
      color: 0x1e52a0,
      transparent: true,
      opacity: 0.35
    });
    this.wireframe = new THREE.LineSegments(wireGeo, wireMat);
    this.group.add(this.wireframe);

    this.group.position.set(0, size * 0.5, 0);
  }

  public createGeometry(type: PrimitiveType, size: number, segments: number): THREE.BufferGeometry {
    const seg = Math.max(3, segments);
    switch (type) {
      case 'cube':
        return new THREE.BoxGeometry(size, size, size, Math.min(seg, 16), Math.min(seg, 16), Math.min(seg, 16));
      case 'pyramid':
        return new THREE.ConeGeometry(size * 0.5, size, seg, 1);
      case 'tube':
      case 'cylinder':
        return new THREE.CylinderGeometry(size * 0.5, size * 0.5, size, seg, 4, false);
      case 'cone':
        return new THREE.ConeGeometry(size * 0.5, size, seg, 4);
      case 'torus':
        return new THREE.TorusGeometry(size * 0.5, size * 0.15, 12, seg);
      case 'sphere':
      default:
        return new THREE.SphereGeometry(size * 0.5, seg, Math.max(3, Math.floor(seg / 2)));
    }
  }

  public setType(type: PrimitiveType, size: number = this.size, segments: number = this.segments): void {
    this.type = type;
    this.size = size;
    this.segments = segments;
    this.updateGeometry();
  }

  public setSegments(segments: number): void {
    this.segments = Math.max(3, Math.min(64, segments));
    this.updateGeometry();
  }

  public setSize(size: number): void {
    this.size = size;
    this.updateGeometry();
  }

  private updateGeometry(): void {
    this.mesh.geometry.dispose();
    this.wireframe.geometry.dispose();

    const newGeo = this.createGeometry(this.type, this.size, this.segments);
    SurfaceSnapping.buildBVH({ geometry: newGeo } as any);
    this.mesh.geometry = newGeo;
    this.wireframe.geometry = new THREE.WireframeGeometry(newGeo);
    this.group.position.set(0, this.size * 0.5, 0);
  }

  public setVisible(visible: boolean): void {
    this.group.visible = visible;
  }
}
