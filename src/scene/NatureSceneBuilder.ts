import * as THREE from 'three';
import { Engine } from '../core/Engine';
import { LayerGroup } from './LayerGroup';
import { GLTFImportService } from '../io/GLTFImportService';
import { createAnimatedStrokeMaterial } from '../shaders/tslAnimatedMaterials';

export interface NatureSceneOptions {
  sceneType?: 'forest' | 'temple_garden' | 'sea_cliff' | 'korean_bakery';
  skyPreset?: 'day' | 'golden_hour' | 'cherry' | 'dusk';
  includeWildlife?: boolean;
  includeWater?: boolean;
  includeSpores?: boolean;
}

export class NatureSceneBuilder {
  private static activeCleanups: Array<() => void> = [];
  private static activeNatureLayers: LayerGroup[] = [];
  private static activeNatureRoots: THREE.Group[] = [];

  public static async buildNatureScene(
    engine: Engine,
    options: NatureSceneOptions = {}
  ): Promise<THREE.Group> {
    // 1. Cleanup any previously built nature scene
    this.cleanup(engine);

    const {
      sceneType = 'forest',
      skyPreset = sceneType === 'korean_bakery' ? 'golden_hour' : (sceneType === 'temple_garden' ? 'cherry' : (sceneType === 'sea_cliff' ? 'dusk' : 'day')),
      includeWildlife = true,
      includeWater = false,
      includeSpores = true
    } = options;

    console.log(`[NatureSceneBuilder] Building nature scene: ${sceneType} with sky: ${skyPreset}...`);

    // 2. Setup Procedural Sky Shader
    engine.environment.setSkyPreset(skyPreset as any, engine.scene);

    // 3. Configure Lighting & Atmosphere in AirbreathEngine
    engine.airbreath.applyPreset('cel_shaded');
    engine.airbreath.setShadowsEnabled(true);
    engine.airbreath.setBloomEnabled(true);

    if (sceneType === 'korean_bakery') {
      engine.airbreath.shadowLight.position.set(8, 14, 7);
      engine.airbreath.shadowLight.intensity = 1.6;
      engine.airbreath.ambientLight.intensity = 0.9;
    } else if (sceneType === 'temple_garden') {
      engine.airbreath.shadowLight.position.set(7, 13, 9);
      engine.airbreath.shadowLight.intensity = 1.4;
      engine.airbreath.ambientLight.intensity = 0.85;
    } else if (sceneType === 'sea_cliff') {
      engine.airbreath.shadowLight.position.set(10, 9, 11);
      engine.airbreath.shadowLight.intensity = 1.5;
      engine.airbreath.ambientLight.intensity = 0.75;
    } else {
      engine.airbreath.shadowLight.position.set(8, 15, 8);
      engine.airbreath.shadowLight.intensity = 1.5;
      engine.airbreath.ambientLight.intensity = 0.85;
    }

    engine.airbreath.shadowPlane.visible = false;

    // 4. Create a dedicated Stage Layer for the Nature Environment
    const layer = engine.stageManager.addLayer(`Nature Scene (${sceneType})`);
    this.activeNatureLayers.push(layer);
    const rootGroup = new THREE.Group();
    rootGroup.name = 'NatureSceneRoot';
    this.activeNatureRoots.push(rootGroup);
    layer.group.add(rootGroup);

    const mixers: THREE.AnimationMixer[] = [];

    // 5. Load Base Nature Environment Model
    let modelUrl = './models/forest_scene.glb';
    let modelScale = 8.5;

    if (sceneType === 'temple_garden') {
      modelUrl = './models/inubeko_ukiyo_-_kinkakuji_temple.glb';
      modelScale = 7.5;
    } else if (sceneType === 'sea_cliff') {
      modelUrl = './models/sea_keep_lonely_watcher.glb';
      modelScale = 8.0;
    } else if (sceneType === 'korean_bakery') {
      modelUrl = './models/korean_bakery.glb';
      modelScale = 5.5;
    }

    try {
      const mainResult = await GLTFImportService.loadFromURL(modelUrl, false);
      GLTFImportService.fitToScene(mainResult.scene, modelScale);

      mainResult.scene.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          mesh.castShadow = true;
          mesh.receiveShadow = true;
        }
      });

      rootGroup.add(mainResult.scene);

      if (mainResult.animations && mainResult.animations.length > 0) {
        const mixer = new THREE.AnimationMixer(mainResult.scene);
        mainResult.animations.forEach((clip) => mixer.clipAction(clip).play());
        mixers.push(mixer);
      }
    } catch (err) {
      console.error('[NatureSceneBuilder] Failed to load main environment model:', err);
    }

    // 6. Add Procedural Animated Water Shader Surface ONLY if explicitly requested
    if (includeWater) {
      const waterSize = sceneType === 'sea_cliff' ? 24 : 14;
      const waterGeo = new THREE.PlaneGeometry(waterSize, waterSize, 32, 32);
      const waterMatObj = createAnimatedStrokeMaterial('caustic', new THREE.Color(0x1892b8));
      
      const waterMesh = new THREE.Mesh(waterGeo, waterMatObj.material);
      waterMesh.name = 'NatureAnimatedWater';
      waterMesh.rotation.x = -Math.PI / 2;
      waterMesh.position.set(0, 0.08, 0);
      waterMesh.receiveShadow = true;
      rootGroup.add(waterMesh);
    }

    // 7. Add Animated Blue Butterfly & Low-Poly Flying Bird
    if (includeWildlife) {
      // Butterfly (for forest, bakery, garden)
      if (sceneType !== 'sea_cliff') {
        try {
          const butterflyResult = await GLTFImportService.loadFromURL('./models/borboleta_azul_-_butterfly.glb', false);
          const butterfly = butterflyResult.scene;
          GLTFImportService.fitToScene(butterfly, 0.7);
          butterfly.position.set(0, 1.8, 1.0);
          rootGroup.add(butterfly);

          if (butterflyResult.animations && butterflyResult.animations.length > 0) {
            const bMixer = new THREE.AnimationMixer(butterfly);
            butterflyResult.animations.forEach((clip) => {
              const action = bMixer.clipAction(clip);
              action.timeScale = 1.4;
              action.play();
            });
            mixers.push(bMixer);
          }

          // Procedural flutter trajectory
          const unregisterButterfly = engine.addAnimationCallback((_delta, elapsed) => {
            const radius = 1.6 + Math.sin(elapsed * 0.5) * 0.35;
            const speed = 0.85;
            const x = Math.sin(elapsed * speed) * radius;
            const z = Math.cos(elapsed * speed) * radius;
            const y = 1.5 + Math.sin(elapsed * 2.2) * 0.3;
            butterfly.position.set(x, y, z);
            butterfly.rotation.y = elapsed * speed + Math.PI / 2;
            butterfly.rotation.z = Math.sin(elapsed * 2.5) * 0.15;
          });
          this.activeCleanups.push(unregisterButterfly);
        } catch (err) {
          console.warn('[NatureSceneBuilder] Butterfly loading skipped:', err);
        }
      }

      // Flying Bird
      try {
        const birdResult = await GLTFImportService.loadFromURL('./models/low_poly_bird_animated_optimized.glb', false);
        const bird = birdResult.scene;
        GLTFImportService.fitToScene(bird, 0.8);
        bird.position.set(0, 4.0, 0);
        rootGroup.add(bird);

        if (birdResult.animations && birdResult.animations.length > 0) {
          const birdMixer = new THREE.AnimationMixer(bird);
          birdResult.animations.forEach((clip) => {
            const action = birdMixer.clipAction(clip);
            action.timeScale = 1.2;
            action.play();
          });
          mixers.push(birdMixer);
        }

        // Procedural soaring flight path
        const birdHeight = sceneType === 'sea_cliff' ? 4.8 : (sceneType === 'korean_bakery' ? 3.5 : 4.0);
        const orbitRadius = sceneType === 'sea_cliff' ? 5.2 : 3.8;
        const flightSpeed = 0.45;

        const unregisterBird = engine.addAnimationCallback((_delta, elapsed) => {
          const bx = Math.sin(elapsed * flightSpeed) * orbitRadius;
          const bz = Math.cos(elapsed * flightSpeed) * orbitRadius;
          const by = birdHeight + Math.sin(elapsed * 0.8) * 0.4;
          bird.position.set(bx, by, bz);
          bird.rotation.y = elapsed * flightSpeed + Math.PI;
          bird.rotation.x = Math.sin(elapsed * 0.8) * 0.08;
        });
        this.activeCleanups.push(unregisterBird);
      } catch (err) {
        console.warn('[NatureSceneBuilder] Bird loading skipped:', err);
      }
    }

    // 8. Add Floating Glowing Spores / Forest Fireflies
    if (includeSpores && sceneType !== 'korean_bakery') {
      const sporeCount = 40;
      const sporeGeo = new THREE.BufferGeometry();
      const positions = new Float32Array(sporeCount * 3);
      const originalPositions = new Float32Array(sporeCount * 3);
      const phases = new Float32Array(sporeCount);

      for (let i = 0; i < sporeCount; i++) {
        const x = (Math.random() - 0.5) * 7.5;
        const y = 0.4 + Math.random() * 3.0;
        const z = (Math.random() - 0.5) * 7.5;
        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;
        originalPositions[i * 3] = x;
        originalPositions[i * 3 + 1] = y;
        originalPositions[i * 3 + 2] = z;
        phases[i] = Math.random() * Math.PI * 2;
      }

      sporeGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

      const sporeColor = sceneType === 'temple_garden' ? 0xffb8c8 : 0xa8f080;
      const sporeMat = new THREE.PointsMaterial({
        color: sporeColor,
        size: 0.12,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending
      });

      const sporePoints = new THREE.Points(sporeGeo, sporeMat);
      sporePoints.name = 'NatureFloatingSpores';
      rootGroup.add(sporePoints);

      const unregisterSpores = engine.addAnimationCallback((_delta, elapsed) => {
        const posAttr = sporeGeo.attributes.position as THREE.BufferAttribute;
        const posArray = posAttr.array as Float32Array;

        for (let i = 0; i < sporeCount; i++) {
          const ph = phases[i];
          const ox = originalPositions[i * 3];
          const oy = originalPositions[i * 3 + 1];
          const oz = originalPositions[i * 3 + 2];

          posArray[i * 3] = ox + Math.sin(elapsed * 0.7 + ph) * 0.3;
          posArray[i * 3 + 1] = oy + Math.sin(elapsed * 1.2 + ph) * 0.2;
          posArray[i * 3 + 2] = oz + Math.cos(elapsed * 0.6 + ph) * 0.3;
        }
        posAttr.needsUpdate = true;
      });
      this.activeCleanups.push(unregisterSpores);
    }

    // 9. Register Animation Mixers update callback
    if (mixers.length > 0) {
      const unregisterMixers = engine.addAnimationCallback((delta) => {
        mixers.forEach((m) => m.update(delta));
      });
      this.activeCleanups.push(unregisterMixers);
    }

    // 10. Frame Camera towards the Nature Landscape
    if (sceneType === 'korean_bakery') {
      engine.viewport.target.set(0, 1.0, 0);
      engine.viewport.theta = Math.PI * 0.3;
      engine.viewport.phi = Math.PI * 0.35;
      engine.viewport.radius = 6.0;
    } else if (sceneType === 'temple_garden') {
      engine.viewport.target.set(0, 1.2, 0);
      engine.viewport.theta = Math.PI * 0.32;
      engine.viewport.phi = Math.PI * 0.36;
      engine.viewport.radius = 8.5;
    } else if (sceneType === 'sea_cliff') {
      engine.viewport.target.set(0, 1.8, 0);
      engine.viewport.theta = Math.PI * 0.4;
      engine.viewport.phi = Math.PI * 0.36;
      engine.viewport.radius = 10.0;
    } else {
      engine.viewport.target.set(0, 1.1, 0);
      engine.viewport.theta = Math.PI * 0.28;
      engine.viewport.phi = Math.PI * 0.35;
      engine.viewport.radius = 8.0;
    }
    engine.viewport.updateCameraPosition();

    console.log('[NatureSceneBuilder] Nature scene successfully loaded!');
    return rootGroup;
  }

  public static cleanup(engine?: Engine): void {
    this.activeCleanups.forEach((cleanup) => {
      try {
        cleanup();
      } catch (err) {
        console.error('[NatureSceneBuilder] Cleanup error:', err);
      }
    });
    this.activeCleanups = [];

    this.activeNatureRoots.forEach((root) => {
      if (root.parent) {
        root.parent.remove(root);
      }
      root.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          mesh.geometry?.dispose();
          const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
          mats.forEach((m) => {
            if (!m) return;
            if ((m as any).map) (m as any).map.dispose();
            if ((m as any).normalMap) (m as any).normalMap.dispose();
            if ((m as any).roughnessMap) (m as any).roughnessMap.dispose();
            if ((m as any).metalnessMap) (m as any).metalnessMap.dispose();
            m.dispose();
          });
        }
      });
    });
    this.activeNatureRoots = [];

    if (engine && engine.stageManager) {
      const stage = engine.stageManager;
      for (let i = stage.layers.length - 1; i >= 0; i--) {
        const layer = stage.layers[i];
        if (layer.name.startsWith('Nature Scene') || this.activeNatureLayers.includes(layer)) {
          stage.rootGroup.remove(layer.group);
          layer.group.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
              const mesh = child as THREE.Mesh;
              mesh.geometry?.dispose();
              const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
              mats.forEach((m) => {
                if (!m) return;
                if ((m as any).map) (m as any).map.dispose();
                if ((m as any).normalMap) (m as any).normalMap.dispose();
                if ((m as any).roughnessMap) (m as any).roughnessMap.dispose();
                if ((m as any).metalnessMap) (m as any).metalnessMap.dispose();
                m.dispose();
              });
            }
          });
          layer.dispose();
          stage.layers.splice(i, 1);
        }
      }
      if (stage.layers.length === 0) {
        stage.addLayer('Layer 1');
      }
      stage.activeLayerIndex = Math.max(0, Math.min(stage.activeLayerIndex, stage.layers.length - 1));
    }
    this.activeNatureLayers = [];
  }
}

