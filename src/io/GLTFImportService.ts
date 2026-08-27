import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { MeshoptDecoder } from 'three/addons/libs/meshopt_decoder.module.js';
// @ts-ignore
import { WebGPUModelCompressor } from './WebGPUModelCompressor.js';

const loader = new GLTFLoader();
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('./draco/');
loader.setDRACOLoader(dracoLoader);
loader.setMeshoptDecoder(MeshoptDecoder);

export interface ImportResult {
  scene: THREE.Group;
  animations: THREE.AnimationClip[];
  name: string;
  compressionStats?: CompressionStats;
}

export interface CompressionStats {
  originalTriangles: number;
  compressedTriangles: number;
  originalTextures: number;
  estimatedVRAMBytes: number;
  decimationRatio: number;
}

const TARGET_MB = 2.0;

async function compressScene(scene: THREE.Group, fileSizeBytes: number): Promise<{ scene: THREE.Group; stats: CompressionStats }> {
  const metrics = WebGPUModelCompressor.inspect(scene);
  const optimalParams = WebGPUModelCompressor.solveOptimalParameters(metrics, fileSizeBytes, TARGET_MB, 'auto');

  const compressor = new WebGPUModelCompressor(optimalParams);
  const compressed = await compressor.compress(scene, optimalParams) as THREE.Group;

  const statsAfter = WebGPUModelCompressor.inspect(compressed);

  return {
    scene: compressed,
    stats: {
      originalTriangles: metrics.triangleCount,
      compressedTriangles: statsAfter.triangleCount,
      originalTextures: metrics.textureCount,
      estimatedVRAMBytes: statsAfter.estimatedVRAMBytes,
      decimationRatio: optimalParams.decimationRatio
    }
  };
}

export class GLTFImportService {
  static async loadFromURL(url: string, compress: boolean = false): Promise<ImportResult> {
    const resp = await fetch(url);
    const buffer = await resp.arrayBuffer();
    const gltf = await loader.parseAsync(buffer, '');
    const name = url.split('/').pop()?.replace(/\.(glb|gltf)$/i, '') || 'imported';
    this.cleanupEnclosingMeshes(gltf.scene, name);
    this.sanitizeModelMaterials(gltf.scene);
    if (!compress) {
      return { scene: gltf.scene, animations: gltf.animations || [], name };
    }
    try {
      const { scene, stats } = await compressScene(gltf.scene, buffer.byteLength);
      this.cleanupEnclosingMeshes(scene, name);
      this.sanitizeModelMaterials(scene);
      console.log(`[Feather3D] Compressed "${name}": ${stats.originalTriangles.toLocaleString()} -> ${stats.compressedTriangles.toLocaleString()} tris (ratio ${stats.decimationRatio.toFixed(2)})`);
      return { scene, animations: gltf.animations || [], name, compressionStats: stats };
    } catch (err) {
      console.warn('[Feather3D] Compression skipped/failed:', err);
      return { scene: gltf.scene, animations: gltf.animations || [], name };
    }
  }

  static async loadFromFile(file: File, compress: boolean = false): Promise<ImportResult> {
    const buffer = await file.arrayBuffer();
    const gltf = await loader.parseAsync(buffer, '');
    const name = file.name.replace(/\.(glb|gltf)$/i, '') || 'imported';
    this.cleanupEnclosingMeshes(gltf.scene, name);
    this.sanitizeModelMaterials(gltf.scene);
    if (!compress) {
      return { scene: gltf.scene, animations: gltf.animations || [], name };
    }
    try {
      const { scene, stats } = await compressScene(gltf.scene, file.size);
      this.cleanupEnclosingMeshes(scene, name);
      this.sanitizeModelMaterials(scene);
      console.log(`[Feather3D] Compressed "${name}": ${stats.originalTriangles.toLocaleString()} -> ${stats.compressedTriangles.toLocaleString()} tris (ratio ${stats.decimationRatio.toFixed(2)})`);
      return { scene, animations: gltf.animations || [], name, compressionStats: stats };
    } catch (err) {
      console.warn('[Feather3D] Compression skipped/failed:', err);
      return { scene: gltf.scene, animations: gltf.animations || [], name };
    }
  }

  /**
   * Strips known enclosing skybox domes, room boxes, and oversized bounding geometry
   * embedded in Sketchfab/Blender models that block the actual scene or ruin scale calculations.
   */
  static cleanupEnclosingMeshes(root: THREE.Object3D, modelName: string = ''): void {
    const toRemove: THREE.Object3D[] = [];
    const lowerModel = modelName.toLowerCase();

    root.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.geometry.computeBoundingBox();
        const bb = mesh.geometry.boundingBox;
        const size = bb ? new THREE.Vector3().subVectors(bb.max, bb.min) : new THREE.Vector3();
        const maxDim = Math.max(size.x, size.y, size.z);
        const name = (mesh.name || '').toLowerCase();
        const matName = ((mesh.material as THREE.Material)?.name || '').toLowerCase();

        const isForestEnclosure = lowerModel.includes('forest') && (mesh.name === 'Object_2' || matName === 'material__24' || maxDim > 10000);
        const isBakeryRoom = lowerModel.includes('bakery') && mesh.name === 'Object_6';
        const isTempleBackdrop = lowerModel.includes('temple') && (mesh.name.includes('Sky') || mesh.name.includes('BG') || mesh.name.includes('Green1'));
        const isSeaKeepSky = lowerModel.includes('sea_keep') && (mesh.name.includes('Sky') || matName.includes('material_4'));
        const isGenericSky = (name === 'sky' || name === 'skybox' || name === 'skydome' || name === 'sky_sky_0') && maxDim > 50;

        if (isForestEnclosure || isBakeryRoom || isTempleBackdrop || isSeaKeepSky || isGenericSky) {
          toRemove.push(mesh);
        }
      }
    });

    toRemove.forEach((mesh) => {
      if (mesh.parent) {
        mesh.parent.remove(mesh);
      }
    });
  }

  static sanitizeModelMaterials(root: THREE.Object3D): void {
    root.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        const meshName = (mesh.name || '').toLowerCase();

        if (mesh.material) {
          const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
          const updatedMaterials = materials.map((mat) => {
            if (!mat) return mat;

            const matName = (mat.name || '').toLowerCase();
            const isOutline = meshName.includes('outline') || matName.includes('outline');

            let activeMat: THREE.Material = mat;

            // Convert unlit basic materials (from KHR_materials_unlit) to MeshStandardMaterial
            // so they receive scene sunlight, ambient light, and soft shadows.
            if ((mat.type === 'MeshBasicMaterial' || mat instanceof THREE.MeshBasicMaterial) && !isOutline) {
              const basicMat = mat as THREE.MeshBasicMaterial;
              const isGold = matName.includes('gold');
              const stdMat = new THREE.MeshStandardMaterial({
                color: basicMat.color ? basicMat.color.clone() : new THREE.Color(0xffffff),
                map: basicMat.map || null,
                roughness: isGold ? 0.45 : 0.75,
                metalness: isGold ? 0.35 : 0.05,
                transparent: basicMat.transparent,
                opacity: basicMat.opacity,
                alphaTest: basicMat.alphaTest,
                side: basicMat.side
              });
              stdMat.name = basicMat.name;
              activeMat = stdMat;
            }

            // Ensure depth testing is always enabled
            activeMat.depthTest = true;

            const hasAlpha = activeMat.transparent || (typeof (activeMat as any).opacity === 'number' && (activeMat as any).opacity < 0.99) || (activeMat as any).alphaTest > 0;

            if (hasAlpha) {
              activeMat.transparent = true;
              if ((activeMat as any).alphaTest > 0 || (typeof (activeMat as any).opacity === 'number' && (activeMat as any).opacity >= 0.9 && (activeMat as any).map)) {
                activeMat.depthWrite = true;
                if (!(activeMat as any).alphaTest || (activeMat as any).alphaTest === 0) (activeMat as any).alphaTest = 0.4;
              } else {
                activeMat.depthWrite = false;
              }
            } else {
              activeMat.transparent = false;
              activeMat.depthWrite = true;
            }

            if (isOutline) {
              // Inverted outline hulls MUST be BackSide so only silhouette rims are drawn,
              // rather than solid front faces covering inner geometry in dark outline color.
              activeMat.side = THREE.BackSide;
              activeMat.depthWrite = false;
              mesh.castShadow = false;
              mesh.receiveShadow = false;
            } else {
              // Double-sided rendering so foliage and thin structures render cleanly from all angles
              activeMat.side = THREE.DoubleSide;
              mesh.castShadow = true;
              mesh.receiveShadow = true;
            }

            if ('shadowSide' in activeMat) {
              (activeMat as any).shadowSide = activeMat.side;
            }

            activeMat.needsUpdate = true;
            return activeMat;
          });

          mesh.material = Array.isArray(mesh.material) ? updatedMaterials : updatedMaterials[0];
        }
      }
    });
  }

  static fitToScene(group: THREE.Group, targetSize: number = 5): void {
    group.updateMatrixWorld(true);
    const box = new THREE.Box3().setFromObject(group);
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    if (maxDim > 0) {
      const scale = targetSize / maxDim;
      group.scale.multiplyScalar(scale);
    }
    this.snapToGround(group);
  }

  static snapToGround(object: THREE.Object3D): void {
    object.updateMatrixWorld(true);
    const box = new THREE.Box3().setFromObject(object);
    if (!box.isEmpty() && isFinite(box.min.y)) {
      const center = box.getCenter(new THREE.Vector3());
      object.position.x -= center.x;
      object.position.z -= center.z;
      object.position.y -= box.min.y;
      object.updateMatrixWorld(true);
    }
  }
}
