import * as THREE from 'three';
import { SurfaceSnapping } from '../math/SurfaceSnapping';
import { GLTFImportService } from '../io/GLTFImportService';

export type ResourceState = 'active' | 'passive' | 'hidden';
export type ResourceType = 'image' | 'mesh' | 'video';

export interface ResourceItem {
  id: string;
  name: string;
  type: ResourceType;
  object: THREE.Object3D;
  mesh: THREE.Mesh;
  opacity: number;
  state: ResourceState;
  videoEl?: HTMLVideoElement;
}

export class ResourceManager {
  public resources: ResourceItem[] = [];
  public resourceGroup: THREE.Group;

  constructor() {
    this.resourceGroup = new THREE.Group();
    this.resourceGroup.name = 'Resources';
  }

  /**
   * Adds a reference image spawned perpendicular to camera or default plane.
   */
  public addReferenceImage(
    url: string,
    name: string = 'Reference Image',
    aspectRatio: number = 1.0,
    camera?: THREE.Camera
  ): ResourceItem {
    const loader = new THREE.TextureLoader();
    const texture = loader.load(url);

    const width = 2.0;
    const height = width / aspectRatio;

    const geometry = new THREE.PlaneGeometry(width, height);
    const material = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      opacity: 0.8,
      side: THREE.DoubleSide
    });

    const mesh = new THREE.Mesh(geometry, material);
    if (camera) {
      // Spawn perpendicular to camera view vector
      mesh.position.copy(camera.position).add(camera.getWorldDirection(new THREE.Vector3()).multiplyScalar(3.0));
      mesh.quaternion.copy(camera.quaternion);
    } else {
      mesh.position.set(0, height * 0.5, 0);
    }

    SurfaceSnapping.buildBVH({ geometry } as any);

    const item: ResourceItem = {
      id: `res_${Date.now()}`,
      name,
      type: 'image',
      object: mesh,
      mesh,
      opacity: 0.8,
      state: 'active'
    };

    this.resources.push(item);
    this.resourceGroup.add(mesh);
    return item;
  }

  /**
   * Adds a 3D reference mesh spawned at origin (0, 0, 0).
   */
  public add3DMesh(
    mesh: THREE.Mesh,
    name: string = '3D Model'
  ): ResourceItem {
    mesh.position.set(0, 0, 0);
    GLTFImportService.sanitizeModelMaterials(mesh);
    SurfaceSnapping.buildBVH(mesh as any);

    const item: ResourceItem = {
      id: `res_${Date.now()}`,
      name,
      type: 'mesh',
      object: mesh,
      mesh,
      opacity: 1.0,
      state: 'active'
    };

    this.resources.push(item);
    this.resourceGroup.add(mesh);
    return item;
  }

  public setState(id: string, state: ResourceState): void {
    const res = this.resources.find(r => r.id === id);
    if (res) {
      res.state = state;
      res.object.visible = state !== 'hidden';
    }
  }

  public cycleState(id: string): ResourceState {
    const res = this.resources.find(r => r.id === id);
    if (res) {
      const nextState: Record<ResourceState, ResourceState> = {
        active: 'passive',
        passive: 'hidden',
        hidden: 'active'
      };
      this.setState(id, nextState[res.state]);
      return res.state;
    }
    return 'active';
  }

  public setOpacity(id: string, opacity: number): void {
    const res = this.resources.find(r => r.id === id);
    if (res && res.mesh.material) {
      res.opacity = opacity;
      const mats = Array.isArray(res.mesh.material) ? res.mesh.material : [res.mesh.material];
      mats.forEach(m => {
        m.opacity = opacity;
        m.transparent = opacity < 0.99;
        m.depthWrite = opacity >= 0.99;
        m.needsUpdate = true;
      });
    }
  }

  public getActiveSnapMeshes(): THREE.Mesh[] {
    return this.resources
      .filter(r => r.state === 'active' && r.mesh)
      .map(r => r.mesh);
  }

  /**
   * Adds an animated video texture on a plane in the scene.
   * The plane faces the camera by default and loops automatically.
   */
  public addVideoTexture(
    file: File,
    camera?: THREE.Camera
  ): ResourceItem {
    const videoEl = document.createElement('video');
    videoEl.src = URL.createObjectURL(file);
    videoEl.loop = true;
    videoEl.muted = true;
    videoEl.playsInline = true;
    videoEl.autoplay = true;
    videoEl.play().catch(() => {});

    const texture = new THREE.VideoTexture(videoEl);
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.format = THREE.RGBAFormat;

    const width = 4.0;
    const height = 2.25; // 16:9 default; updated on metadata load
    videoEl.addEventListener('loadedmetadata', () => {
      const aspect = videoEl.videoWidth / Math.max(videoEl.videoHeight, 1);
      mesh.scale.set(aspect, 1, 1);
    });

    const geometry = new THREE.PlaneGeometry(width, height);
    const material = new THREE.MeshBasicMaterial({
      map: texture,
      side: THREE.DoubleSide,
      transparent: false
    });

    const mesh = new THREE.Mesh(geometry, material);
    if (camera) {
      mesh.position.copy(camera.position).add(camera.getWorldDirection(new THREE.Vector3()).multiplyScalar(4.0));
      mesh.quaternion.copy(camera.quaternion);
    } else {
      mesh.position.set(0, height * 0.5, -2);
    }

    const item: ResourceItem = {
      id: `res_${Date.now()}`,
      name: file.name.replace(/\.[^.]+$/, ''),
      type: 'video',
      object: mesh,
      mesh,
      opacity: 1.0,
      state: 'active',
      videoEl
    };

    this.resources.push(item);
    this.resourceGroup.add(mesh);
    return item;
  }

  public removeResource(id: string): void {
    const idx = this.resources.findIndex(r => r.id === id);
    if (idx !== -1) {
      const res = this.resources[idx];
      this.resourceGroup.remove(res.object);
      res.mesh.geometry?.dispose();
      if (Array.isArray(res.mesh.material)) {
        res.mesh.material.forEach(m => m.dispose());
      } else {
        res.mesh.material?.dispose();
      }
      if (res.videoEl) {
        res.videoEl.pause();
        URL.revokeObjectURL(res.videoEl.src);
      }
      this.resources.splice(idx, 1);
    }
  }
}
