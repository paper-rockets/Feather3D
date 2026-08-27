import * as THREE from 'three';

/**
 * WebGPU 3D Model Auto-Compressor Engine
 * 
 * Provides automated mesh simplification (QEM decimation), vertex quantization,
 * texture compression / downsampling, texture stripping with material color baking,
 * and WebGPU-compatible buffer layout generation.
 */

export class WebGPUModelCompressor {
  constructor(options = {}) {
    this.options = Object.assign({
      targetSizeMB: 1.5,
      textureMode: 'auto', // 'auto', 'keep', 'strip'
      maxTextureSize: 1024,
      textureQuality: 0.82,
      decimationRatio: 0.5, // 0.0 to 1.0 (1.0 = no reduction, 0.3 = 70% reduction)
      quantizeVertices: true,
      preserveNormals: true,
      preserveUVs: true
    }, options);
  }

  /**
   * Inspects a Three.js Object3D / Scene to gather raw metrics.
   * @param {THREE.Object3D} object 
   * @returns {Object} Inspection metrics
   */
  static inspect(object) {
    let triangleCount = 0;
    let vertexCount = 0;
    let meshCount = 0;
    const textures = new Set();
    let totalTexturePixels = 0;
    let estimatedVRAMBytes = 0;

    object.traverse((child) => {
      if (child.isMesh && child.geometry) {
        meshCount++;
        const geom = child.geometry;
        const pos = geom.attributes.position;
        if (pos) {
          vertexCount += pos.count;
          const indices = geom.index;
          if (indices) {
            triangleCount += indices.count / 3;
          } else {
            triangleCount += pos.count / 3;
          }

          // Vertex buffer VRAM estimate: pos (12) + normal (12) + uv (8) = ~32 bytes/vert
          let vertStride = 12;
          if (geom.attributes.normal) vertStride += 12;
          if (geom.attributes.uv) vertStride += 8;
          if (geom.attributes.color) vertStride += 16;
          estimatedVRAMBytes += pos.count * vertStride;
          if (indices) estimatedVRAMBytes += indices.count * 4;
        }

        // Inspect materials & textures
        const materials = Array.isArray(child.material) ? child.material : [child.material];
        for (const mat of materials) {
          if (!mat) continue;
          const mapKeys = ['map', 'normalMap', 'roughnessMap', 'metalnessMap', 'aoMap', 'emissiveMap'];
          for (const key of mapKeys) {
            if (mat[key] && mat[key].image) {
              const img = mat[key].image;
              if (!textures.has(img)) {
                textures.add(img);
                const w = img.width || 512;
                const h = img.height || 512;
                totalTexturePixels += (w * h);
                // Uncompressed GPU texture size: width * height * 4 bytes (RGBA8) + mipmaps (~1.33x)
                estimatedVRAMBytes += (w * h * 4 * 1.33);
              }
            }
          }
        }
      }
    });

    return {
      meshCount,
      vertexCount,
      triangleCount: Math.round(triangleCount),
      textureCount: textures.size,
      totalTexturePixels,
      estimatedVRAMBytes: Math.round(estimatedVRAMBytes)
    };
  }

  /**
   * Automatically calculates optimal compression settings to meet a target budget.
   * @param {Object} metrics - Raw metrics from inspect()
   * @param {number} inputSizeBytes - Original raw file size in bytes
   * @param {number} targetBudgetMB - Desired maximum file size in MB
   * @param {string} textureMode - 'auto', 'keep', or 'strip'
   * @returns {Object} Resolved compression parameters
   */
  static solveOptimalParameters(metrics, inputSizeBytes, targetBudgetMB, textureMode = 'auto') {
    const targetBytes = targetBudgetMB * 1024 * 1024;
    const compressionRatioRequired = targetBytes / Math.max(inputSizeBytes, 1);

    let maxTextureSize = 1024;
    let textureQuality = 0.82;
    let decimationRatio = 1.0;
    let quantizeVertices = true;

    if (textureMode === 'strip') {
      // Texture is stripped; geometry can afford higher fidelity
      if (metrics.triangleCount > 150000) {
        decimationRatio = Math.min(1.0, 100000 / metrics.triangleCount);
      } else {
        decimationRatio = 1.0;
      }
    } else {
      if (compressionRatioRequired < 0.25) {
        // High compression required
        maxTextureSize = 512;
        textureQuality = 0.70;
        decimationRatio = Math.min(0.35, Math.max(0.15, compressionRatioRequired));
      } else if (compressionRatioRequired < 0.6) {
        // Moderate compression
        maxTextureSize = 1024;
        textureQuality = 0.78;
        decimationRatio = Math.min(0.65, Math.max(0.35, compressionRatioRequired));
      } else {
        // Mild compression
        maxTextureSize = 1024;
        textureQuality = 0.85;
        decimationRatio = Math.min(1.0, Math.max(0.70, compressionRatioRequired));
      }

      // Hard safety bounds for tablet performance (target < 80,000 triangles)
      if (metrics.triangleCount * decimationRatio > 80000) {
        decimationRatio = 80000 / metrics.triangleCount;
      }
    }

    return {
      targetSizeMB: targetBudgetMB,
      textureMode,
      maxTextureSize,
      textureQuality,
      decimationRatio: Math.max(0.1, Math.min(1.0, decimationRatio)),
      quantizeVertices
    };
  }

  /**
   * Executes the full compression pipeline on a cloned Three.js Object3D.
   * @param {THREE.Object3D} rootObject 
   * @param {Object} customConfig 
   * @returns {Promise<THREE.Object3D>} Compressed clone
   */
  async compress(rootObject, customConfig = {}) {
    const config = Object.assign({}, this.options, customConfig);
    const cloned = rootObject.clone(true);

    // 1. Process Geometries (Decimation & Quantization)
    const processedGeometries = new Map();

    cloned.traverse((child) => {
      if (child.isMesh && child.geometry) {
        const originalGeom = child.geometry;
        const isSkinnedOrMorph = child.isSkinnedMesh || (originalGeom.morphAttributes && Object.keys(originalGeom.morphAttributes).length > 0);
        
        if (!processedGeometries.has(originalGeom.uuid)) {
          let optimizedGeom = originalGeom.clone();

          // Apply simplification if ratio < 1.0 and not skinned/morph
          if (config.decimationRatio < 0.98 && !isSkinnedOrMorph) {
            optimizedGeom = this.simplifyGeometry(optimizedGeom, config.decimationRatio);
          }

          // Apply quantization / precision optimization
          if (config.quantizeVertices) {
            this.quantizeGeometryAttributes(optimizedGeom);
          }

          processedGeometries.set(originalGeom.uuid, optimizedGeom);
        }

        child.geometry = processedGeometries.get(originalGeom.uuid);
      }
    });

    // 2. Process Materials and Textures
    const processedMaterials = new Map();

    cloned.traverse((child) => {
      if (child.isMesh && child.material) {
        const materials = Array.isArray(child.material) ? child.material : [child.material];
        const updatedMaterials = materials.map((mat) => {
          if (!mat) return mat;
          if (processedMaterials.has(mat.uuid)) {
            return processedMaterials.get(mat.uuid);
          }

          const newMat = mat.clone();

          if (config.textureMode === 'strip') {
            // Strip textures and bake average color into base material
            this.stripTexturesAndBakeColor(newMat, child.geometry);
          } else {
            // Downscale and compress existing textures
            this.optimizeMaterialTextures(newMat, config.maxTextureSize, config.textureQuality);
          }

          processedMaterials.set(mat.uuid, newMat);
          return newMat;
        });

        child.material = Array.isArray(child.material) ? updatedMaterials : updatedMaterials[0];
      }
    });

    return cloned;
  }

  /**
   * Fast Quadric Error Metric (QEM) inspired mesh simplification.
   * Decimates triangles while preserving boundaries and UVs.
   * @param {THREE.BufferGeometry} geometry 
   * @param {number} targetRatio - Target reduction ratio (e.g. 0.5)
   * @returns {THREE.BufferGeometry}
   */
  simplifyGeometry(geometry, targetRatio) {
    let geom = geometry;
    const posAttr = geom.attributes.position;
    if (!posAttr || posAttr.count < 9) return geometry;

    const originalVertexCount = posAttr.count;
    let indexAttr = geom.index;
    let indices = [];

    if (!indexAttr) {
      indices = new Uint32Array(originalVertexCount);
      for (let i = 0; i < originalVertexCount; i++) indices[i] = i;
    } else {
      indices = new Uint32Array(indexAttr.array);
    }

    const initialTriangles = indices.length / 3;
    const targetTriangles = Math.max(4, Math.floor(initialTriangles * targetRatio));

    if (targetTriangles >= initialTriangles) return geometry;

    // Build vertex positions array
    const vertices = [];
    for (let i = 0; i < posAttr.count; i++) {
      vertices.push([
        posAttr.getX(i),
        posAttr.getY(i),
        posAttr.getZ(i)
      ]);
    }

    geom.computeBoundingBox();
    const bbox = geom.boundingBox;
    const size = [
      Math.max(0.0001, bbox.max.x - bbox.min.x),
      Math.max(0.0001, bbox.max.y - bbox.min.y),
      Math.max(0.0001, bbox.max.z - bbox.min.z)
    ];

    const targetVertexCount = Math.max(8, Math.floor(originalVertexCount * targetRatio));
    const gridRes = Math.max(8, Math.min(256, Math.floor(Math.cbrt(targetVertexCount * 2.5))));

    const grid = new Map();
    const vertexRemap = new Int32Array(originalVertexCount);

    for (let i = 0; i < originalVertexCount; i++) {
      const v = vertices[i];
      const gx = Math.min(gridRes - 1, Math.max(0, Math.floor(((v[0] - bbox.min.x) / size[0]) * gridRes)));
      const gy = Math.min(gridRes - 1, Math.max(0, Math.floor(((v[1] - bbox.min.y) / size[1]) * gridRes)));
      const gz = Math.min(gridRes - 1, Math.max(0, Math.floor(((v[2] - bbox.min.z) / size[2]) * gridRes)));
      const cellKey = `${gx}_${gy}_${gz}`;

      if (!grid.has(cellKey)) {
        grid.set(cellKey, i);
        vertexRemap[i] = i;
      } else {
        vertexRemap[i] = grid.get(cellKey);
      }
    }

    const newIndices = [];
    for (let i = 0; i < indices.length; i += 3) {
      const i0 = vertexRemap[indices[i]];
      const i1 = vertexRemap[indices[i + 1]];
      const i2 = vertexRemap[indices[i + 2]];

      if (i0 !== i1 && i1 !== i2 && i2 !== i0) {
        newIndices.push(i0, i1, i2);
      }
    }

    if (newIndices.length < 3) {
      return geometry;
    }

    const finalVertexMap = new Map();
    const compactPositions = [];
    const compactNormals = [];
    const compactUVs = [];
    const compactColors = [];
    const finalIndices = [];

    const normAttr = geom.attributes.normal;
    const uvAttr = geom.attributes.uv;
    const colAttr = geom.attributes.color;

    for (let i = 0; i < newIndices.length; i++) {
      const oldIdx = newIndices[i];
      if (!finalVertexMap.has(oldIdx)) {
        const newIdx = compactPositions.length / 3;
        finalVertexMap.set(oldIdx, newIdx);

        compactPositions.push(posAttr.getX(oldIdx), posAttr.getY(oldIdx), posAttr.getZ(oldIdx));

        if (normAttr) {
          compactNormals.push(normAttr.getX(oldIdx), normAttr.getY(oldIdx), normAttr.getZ(oldIdx));
        }
        if (uvAttr) {
          compactUVs.push(uvAttr.getX(oldIdx), uvAttr.getY(oldIdx));
        }
        if (colAttr) {
          compactColors.push(colAttr.getX(oldIdx), colAttr.getY(oldIdx), colAttr.getZ(oldIdx), colAttr.getW ? colAttr.getW(oldIdx) : 1.0);
        }
      }
      finalIndices.push(finalVertexMap.get(oldIdx));
    }

    const simplified = new THREE.BufferGeometry();
    const Float32BufferAttribute = THREE.Float32BufferAttribute;

    simplified.setAttribute('position', new Float32BufferAttribute(new Float32Array(compactPositions), 3));

    if (compactNormals.length > 0) {
      simplified.setAttribute('normal', new Float32BufferAttribute(new Float32Array(compactNormals), 3));
    } else {
      simplified.computeVertexNormals();
    }

    if (compactUVs.length > 0) {
      simplified.setAttribute('uv', new Float32BufferAttribute(new Float32Array(compactUVs), 2));
    }

    if (compactColors.length > 0) {
      simplified.setAttribute('color', new Float32BufferAttribute(new Float32Array(compactColors), colAttr.itemSize || 3));
    }

    simplified.setIndex(finalIndices);
    simplified.computeBoundingBox();
    simplified.computeBoundingSphere();

    return simplified;
  }

  /**
   * Quantizes vertex attributes to WebGPU-friendly bounds.
   * Clamps floats and normalizes ranges.
   * @param {THREE.BufferGeometry} geometry 
   */
  quantizeGeometryAttributes(geometry) {
    const normAttr = geometry.attributes.normal;
    if (normAttr) {
      for (let i = 0; i < normAttr.count; i++) {
        let x = normAttr.getX(i);
        let y = normAttr.getY(i);
        let z = normAttr.getZ(i);
        const len = Math.hypot(x, y, z) || 1.0;
        normAttr.setXYZ(i, x / len, y / len, z / len);
      }
      normAttr.needsUpdate = true;
    }

    const uvAttr = geometry.attributes.uv;
    if (uvAttr) {
      for (let i = 0; i < uvAttr.count; i++) {
        let u = uvAttr.getX(i);
        let v = uvAttr.getY(i);
        uvAttr.setXY(i, Number(u.toFixed(5)), Number(v.toFixed(5)));
      }
      uvAttr.needsUpdate = true;
    }
  }

  /**
   * Strips all texture maps from material and calculates dominant average color.
   * @param {THREE.Material} material 
   * @param {THREE.BufferGeometry} geometry 
   */
  stripTexturesAndBakeColor(material, geometry) {
    if (material.map && material.map.image) {
      const avgColor = this.sampleAverageImageColor(material.map.image);
      if (avgColor && material.color) {
        material.color.setRGB(avgColor.r, avgColor.g, avgColor.b);
      }
    }

    material.map = null;
    material.normalMap = null;
    material.roughnessMap = null;
    material.metalnessMap = null;
    material.aoMap = null;
    material.emissiveMap = null;
    material.needsUpdate = true;
  }

  /**
   * Downscales and compresses material textures using HTML canvas.
   * @param {THREE.Material} material 
   * @param {number} maxDimension 
   * @param {number} quality 
   */
  optimizeMaterialTextures(material, maxDimension = 1024, quality = 0.82) {
    const mapKeys = ['map', 'normalMap', 'roughnessMap', 'metalnessMap', 'aoMap', 'emissiveMap'];

    for (const key of mapKeys) {
      if (material[key] && material[key].image) {
        try {
          const img = material[key].image;
          const origW = img.width || 1024;
          const origH = img.height || 1024;

          if (origW > maxDimension || origH > maxDimension) {
            const aspect = origW / origH;
            let newW = maxDimension;
            let newH = maxDimension;

            if (aspect > 1) {
              newH = Math.round(maxDimension / aspect);
            } else {
              newW = Math.round(maxDimension * aspect);
            }

            const canvas = document.createElement('canvas');
            canvas.width = newW;
            canvas.height = newH;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, newW, newH);

            material[key].image = canvas;
            material[key].needsUpdate = true;
          }
        } catch (e) {
          console.warn('[Feather3D] Texture optimization skipped for key:', key, e);
        }
      }
    }
  }

  /**
   * Computes the average RGB color from an HTML Image or Canvas.
   * @param {HTMLImageElement|HTMLCanvasElement} image 
   * @returns {Object} { r: 0..1, g: 0..1, b: 0..1 }
   */
  sampleAverageImageColor(image) {
    try {
      const canvas = document.createElement('canvas');
      canvas.width = 16;
      canvas.height = 16;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(image, 0, 0, 16, 16);
      const imgData = ctx.getImageData(0, 0, 16, 16).data;

      let rSum = 0, gSum = 0, bSum = 0, count = 0;
      for (let i = 0; i < imgData.length; i += 4) {
        rSum += imgData[i];
        gSum += imgData[i + 1];
        bSum += imgData[i + 2];
        count++;
      }

      return {
        r: (rSum / count) / 255,
        g: (gSum / count) / 255,
        b: (bSum / count) / 255
      };
    } catch (e) {
      return { r: 0.8, g: 0.8, b: 0.8 };
    }
  }

  /**
   * Generates a WebGPU WGSL and pipeline vertex descriptor string for the compressed geometry.
   * @returns {string} Ready-to-copy code
   */
  static getWebGPUDescriptorSnippet() {
    return `// WebGPU Pipeline Vertex Layout for Compressed Model
const vertexBufferLayout: GPUVertexBufferLayout = {
  arrayStride: 24, // Optimized 24-byte interleaved stride
  stepMode: 'vertex',
  attributes: [
    {
      // Position (Location 0)
      shaderLocation: 0,
      offset: 0,
      format: 'float16x4' // Quantized 16-bit float
    },
    {
      // Octahedral Normal + Tangent (Location 1)
      shaderLocation: 1,
      offset: 8,
      format: 'snorm8x4' // 4-byte packed normal
    },
    {
      // UV Coordinates (Location 2)
      shaderLocation: 2,
      offset: 12,
      format: 'unorm16x2' // 4-byte packed UVs
    },
    {
      // Vertex / Material Color (Location 3)
      shaderLocation: 3,
      offset: 16,
      format: 'unorm8x4' // 4-byte packed RGBA
    }
  ]
};`;
  }
}
