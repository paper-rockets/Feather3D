import * as THREE from 'three';
import { MeshGuide } from './MeshGuide';
import { SurfaceSnapping } from '../math/SurfaceSnapping';

export type TemplateCategory = 'beginner' | 'intermediate' | 'advanced';

export interface MeshTemplateDefinition {
  id: string;
  name: string;
  category: TemplateCategory;
  difficulty: string;
  description: string;
  createMesh: () => THREE.Group;
}

export class MeshCanvasTemplates {
  private static createMatteMaterial(color: number = 0xf5f3ed, roughness: number = 0.75): THREE.MeshStandardMaterial {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color(color),
      roughness: roughness,
      metalness: 0.08,
      side: THREE.DoubleSide
    });
  }

  private static createAccentMaterial(color: number = 0xe0dbd1, roughness: number = 0.65): THREE.MeshStandardMaterial {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color(color),
      roughness: roughness,
      metalness: 0.12,
      side: THREE.DoubleSide
    });
  }

  private static createDarkMaterial(color: number = 0x54504a, roughness: number = 0.85): THREE.MeshStandardMaterial {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color(color),
      roughness: roughness,
      metalness: 0.05,
      side: THREE.DoubleSide
    });
  }

  private static createGlassMaterial(color: number = 0xb4c8de, opacity: number = 0.6): THREE.MeshStandardMaterial {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color(color),
      roughness: 0.2,
      metalness: 0.3,
      transparent: true,
      opacity: opacity,
      side: THREE.DoubleSide
    });
  }

  private static buildCartoonHouse(): THREE.Group {
    const group = new THREE.Group();
    group.name = 'CartoonHouse';

    const wallMat = MeshCanvasTemplates.createMatteMaterial(0xf7f5f0);
    const roofMat = MeshCanvasTemplates.createAccentMaterial(0xdf8453);
    const trimMat = MeshCanvasTemplates.createAccentMaterial(0x7da4c7);
    const doorMat = MeshCanvasTemplates.createAccentMaterial(0x8a6240);
    const chimneyMat = MeshCanvasTemplates.createDarkMaterial(0x6e6862);
    const glassMat = MeshCanvasTemplates.createGlassMaterial(0xc2e2fa, 0.7);

    // Foundation & Main Walls
    const walls = new THREE.Mesh(new THREE.BoxGeometry(3.0, 2.2, 3.0), wallMat);
    walls.position.set(0, 1.1, 0);
    walls.castShadow = true;
    walls.receiveShadow = true;
    group.add(walls);

    // Pyramidal Roof
    const roof = new THREE.Mesh(new THREE.ConeGeometry(2.7, 1.6, 4), roofMat);
    roof.position.set(0, 3.0, 0);
    roof.rotation.y = Math.PI / 4;
    roof.castShadow = true;
    roof.receiveShadow = true;
    group.add(roof);

    // Chimney & Cap
    const chimney = new THREE.Mesh(new THREE.BoxGeometry(0.5, 1.4, 0.5), chimneyMat);
    chimney.position.set(0.8, 3.1, 0.6);
    chimney.castShadow = true;
    group.add(chimney);

    const chimneyCap = new THREE.Mesh(new THREE.BoxGeometry(0.66, 0.16, 0.66), chimneyMat);
    chimneyCap.position.set(0.8, 3.85, 0.6);
    group.add(chimneyCap);

    // Front Door & Handle
    const door = new THREE.Mesh(new THREE.BoxGeometry(0.8, 1.3, 0.08), doorMat);
    door.position.set(0, 0.65, 1.54);
    group.add(door);

    const doorHandle = new THREE.Mesh(new THREE.SphereGeometry(0.06, 8, 8), trimMat);
    doorHandle.position.set(0.28, 0.65, 1.6);
    group.add(doorHandle);

    // Windows
    const frontWindowL = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.55, 0.06), glassMat);
    frontWindowL.position.set(-0.85, 1.45, 1.53);
    group.add(frontWindowL);

    const frontWindowR = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.55, 0.06), glassMat);
    frontWindowR.position.set(0.85, 1.45, 1.53);
    group.add(frontWindowR);

    const sideWindow = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.65, 0.65), glassMat);
    sideWindow.position.set(1.53, 1.2, 0);
    group.add(sideWindow);

    // Entrance Step
    const step = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.16, 0.5), trimMat);
    step.position.set(0, 0.08, 1.75);
    group.add(step);

    return group;
  }

  private static buildRocket(): THREE.Group {
    const group = new THREE.Group();
    group.name = 'RocketShip';

    const bodyMat = MeshCanvasTemplates.createMatteMaterial(0xf4f3ee);
    const accentMat = MeshCanvasTemplates.createAccentMaterial(0xd94e34);
    const darkMat = MeshCanvasTemplates.createDarkMaterial(0x3a3d45);
    const windowMat = MeshCanvasTemplates.createGlassMaterial(0x64b5f6, 0.8);

    // Fuselage Core
    const fuselage = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 1.05, 3.8, 16), bodyMat);
    fuselage.position.set(0, 2.5, 0);
    fuselage.castShadow = true;
    fuselage.receiveShadow = true;
    group.add(fuselage);

    // Nosecone
    const nose = new THREE.Mesh(new THREE.ConeGeometry(0.8, 1.8, 16), accentMat);
    nose.position.set(0, 5.3, 0);
    nose.castShadow = true;
    group.add(nose);

    // Thruster Engine Nozzle
    const nozzle = new THREE.Mesh(new THREE.CylinderGeometry(0.65, 0.95, 0.7, 16), darkMat);
    nozzle.position.set(0, 0.35, 0);
    group.add(nozzle);

    // 4 Aerodynamic Tail Fins
    for (let i = 0; i < 4; i++) {
      const angle = (i * Math.PI) / 2;
      const fin = new THREE.Mesh(new THREE.BoxGeometry(0.12, 1.3, 0.9), accentMat);
      fin.position.set(Math.cos(angle) * 1.05, 1.2, Math.sin(angle) * 1.05);
      fin.rotation.y = -angle;
      fin.castShadow = true;
      group.add(fin);
    }

    // Porthole Window
    const portholeFrame = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.38, 0.12, 16), darkMat);
    portholeFrame.position.set(0, 3.2, 0.92);
    portholeFrame.rotation.x = Math.PI / 2;
    group.add(portholeFrame);

    const portholeGlass = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.14, 16), windowMat);
    portholeGlass.position.set(0, 3.2, 0.93);
    portholeGlass.rotation.x = Math.PI / 2;
    group.add(portholeGlass);

    return group;
  }

  private static buildDinosaur(): THREE.Group {
    const group = new THREE.Group();
    group.name = 'Dinosaur';

    const bodyMat = MeshCanvasTemplates.createMatteMaterial(0x8cb369);
    const bellyMat = MeshCanvasTemplates.createAccentMaterial(0xe8d28a);
    const spikeMat = MeshCanvasTemplates.createAccentMaterial(0xd77a61);
    const eyeMat = MeshCanvasTemplates.createDarkMaterial(0x2b2d42);

    // Main Body
    const body = new THREE.Mesh(new THREE.SphereGeometry(1.3, 16, 14), bodyMat);
    body.position.set(0, 1.8, 0);
    body.scale.set(1.0, 1.15, 1.45);
    body.castShadow = true;
    body.receiveShadow = true;
    group.add(body);

    // Soft Belly Underneath
    const belly = new THREE.Mesh(new THREE.SphereGeometry(1.15, 14, 12), bellyMat);
    belly.position.set(0, 1.6, 0.25);
    belly.scale.set(0.9, 0.95, 1.2);
    group.add(belly);

    // Neck
    const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.75, 1.2, 12), bodyMat);
    neck.position.set(0, 2.7, 0.9);
    neck.rotation.x = -Math.PI / 6;
    neck.castShadow = true;
    group.add(neck);

    // Head
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.75, 14, 12), bodyMat);
    head.position.set(0, 3.4, 1.45);
    head.scale.set(0.9, 0.95, 1.25);
    head.castShadow = true;
    group.add(head);

    // Snout / Jaw
    const snout = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.4, 0.75), bodyMat);
    snout.position.set(0, 3.2, 1.95);
    group.add(snout);

    // Eyes
    const eyeL = new THREE.Mesh(new THREE.SphereGeometry(0.1, 8, 8), eyeMat);
    eyeL.position.set(0.55, 3.55, 1.7);
    group.add(eyeL);

    const eyeR = new THREE.Mesh(new THREE.SphereGeometry(0.1, 8, 8), eyeMat);
    eyeR.position.set(-0.55, 3.55, 1.7);
    group.add(eyeR);

    // 4 Pillar Legs
    const legPositions = [
      [-0.7, 0.7, 0.7],
      [0.7, 0.7, 0.7],
      [-0.75, 0.7, -0.7],
      [0.75, 0.7, -0.7]
    ];
    legPositions.forEach(pos => {
      const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.38, 1.4, 12), bodyMat);
      leg.position.set(pos[0], pos[1], pos[2]);
      leg.castShadow = true;
      group.add(leg);

      const foot = new THREE.Mesh(new THREE.SphereGeometry(0.38, 10, 8), bodyMat);
      foot.position.set(pos[0], 0.18, pos[2] + 0.1);
      foot.scale.set(1.0, 0.5, 1.25);
      group.add(foot);
    });

    // Tail
    const tail = new THREE.Mesh(new THREE.ConeGeometry(0.65, 2.5, 12), bodyMat);
    tail.position.set(0, 1.6, -1.9);
    tail.rotation.x = -Math.PI / 3.2;
    tail.castShadow = true;
    group.add(tail);

    // Spine Plates
    for (let i = 0; i < 6; i++) {
      const spike = new THREE.Mesh(new THREE.ConeGeometry(0.2, 0.45, 4), spikeMat);
      const zPos = 1.6 - i * 0.6;
      spike.position.set(0, 2.7 - Math.abs(zPos) * 0.35, zPos);
      spike.rotation.y = Math.PI / 4;
      group.add(spike);
    }

    return group;
  }

  private static buildRobot(): THREE.Group {
    const group = new THREE.Group();
    group.name = 'Robot';

    const bodyMat = MeshCanvasTemplates.createMatteMaterial(0x94a3b8);
    const accentMat = MeshCanvasTemplates.createAccentMaterial(0x38bdf8);
    const jointMat = MeshCanvasTemplates.createDarkMaterial(0x334155);
    const chestMat = MeshCanvasTemplates.createAccentMaterial(0xfef08a);

    // Head
    const head = new THREE.Mesh(new THREE.BoxGeometry(1.2, 1.1, 1.1), bodyMat);
    head.position.set(0, 3.8, 0);
    head.castShadow = true;
    group.add(head);

    // Antenna
    const antPole = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.6, 8), jointMat);
    antPole.position.set(0, 4.65, 0);
    group.add(antPole);

    const antBall = new THREE.Mesh(new THREE.SphereGeometry(0.15, 10, 10), accentMat);
    antBall.position.set(0, 4.95, 0);
    group.add(antBall);

    // Eyes
    const eyeL = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 0.1, 12), accentMat);
    eyeL.position.set(0.32, 3.85, 0.58);
    eyeL.rotation.x = Math.PI / 2;
    group.add(eyeL);

    const eyeR = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 0.1, 12), accentMat);
    eyeR.position.set(-0.32, 3.85, 0.58);
    eyeR.rotation.x = Math.PI / 2;
    group.add(eyeR);

    // Neck
    const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.28, 0.3, 12), jointMat);
    neck.position.set(0, 3.15, 0);
    group.add(neck);

    // Torso Body
    const torso = new THREE.Mesh(new THREE.BoxGeometry(1.9, 2.0, 1.3), bodyMat);
    torso.position.set(0, 2.0, 0);
    torso.castShadow = true;
    torso.receiveShadow = true;
    group.add(torso);

    // Chest Screen
    const chestScreen = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.9, 0.08), chestMat);
    chestScreen.position.set(0, 2.1, 0.68);
    group.add(chestScreen);

    // Arms
    [-1.25, 1.25].forEach(sideX => {
      const shoulder = new THREE.Mesh(new THREE.SphereGeometry(0.25, 10, 10), jointMat);
      shoulder.position.set(sideX, 2.6, 0);
      group.add(shoulder);

      const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 1.3, 10), bodyMat);
      arm.position.set(sideX, 1.8, 0);
      arm.castShadow = true;
      group.add(arm);

      const hand = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.28, 0.3), jointMat);
      hand.position.set(sideX, 1.05, 0);
      group.add(hand);
    });

    // Legs
    [-0.55, 0.55].forEach(sideX => {
      const hip = new THREE.Mesh(new THREE.SphereGeometry(0.22, 10, 10), jointMat);
      hip.position.set(sideX, 0.95, 0);
      group.add(hip);

      const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 1.1, 10), bodyMat);
      leg.position.set(sideX, 0.45, 0);
      leg.castShadow = true;
      group.add(leg);

      const foot = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.24, 0.75), jointMat);
      foot.position.set(sideX, 0.1, 0.15);
      group.add(foot);
    });

    return group;
  }

  private static buildAnimal(): THREE.Group {
    const group = new THREE.Group();
    group.name = 'TeddyAnimal';

    const furMat = MeshCanvasTemplates.createMatteMaterial(0xc49a6c);
    const snoutMat = MeshCanvasTemplates.createAccentMaterial(0xf3e5ab);
    const noseMat = MeshCanvasTemplates.createDarkMaterial(0x2f1b0c);

    // Body
    const body = new THREE.Mesh(new THREE.SphereGeometry(1.35, 16, 14), furMat);
    body.position.set(0, 1.5, 0);
    body.scale.set(1.05, 1.25, 1.1);
    body.castShadow = true;
    body.receiveShadow = true;
    group.add(body);

    // Head
    const head = new THREE.Mesh(new THREE.SphereGeometry(1.05, 16, 14), furMat);
    head.position.set(0, 3.1, 0.2);
    head.castShadow = true;
    group.add(head);

    // Ears
    [-0.8, 0.8].forEach(sideX => {
      const ear = new THREE.Mesh(new THREE.SphereGeometry(0.38, 12, 10), furMat);
      ear.position.set(sideX, 3.95, 0.1);
      group.add(ear);

      const earInner = new THREE.Mesh(new THREE.SphereGeometry(0.24, 10, 8), snoutMat);
      earInner.position.set(sideX, 3.95, 0.22);
      group.add(earInner);
    });

    // Snout / Muzzle
    const snout = new THREE.Mesh(new THREE.SphereGeometry(0.46, 12, 10), snoutMat);
    snout.position.set(0, 2.9, 1.05);
    snout.scale.set(1.0, 0.78, 0.95);
    group.add(snout);

    // Nose
    const nose = new THREE.Mesh(new THREE.SphereGeometry(0.13, 8, 8), noseMat);
    nose.position.set(0, 3.05, 1.45);
    group.add(nose);

    // Eyes
    [-0.32, 0.32].forEach(sideX => {
      const eye = new THREE.Mesh(new THREE.SphereGeometry(0.09, 8, 8), noseMat);
      eye.position.set(sideX, 3.25, 1.15);
      group.add(eye);
    });

    // Paws / Limbs
    [-0.85, 0.85].forEach(sideX => {
      const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.28, 1.0, 10), furMat);
      arm.position.set(sideX, 2.1, 0.35);
      arm.rotation.x = Math.PI / 4;
      group.add(arm);

      const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.34, 0.85, 10), furMat);
      leg.position.set(sideX * 0.85, 0.45, 0.5);
      leg.rotation.x = Math.PI / 2.2;
      group.add(leg);

      const footPad = new THREE.Mesh(new THREE.SphereGeometry(0.3, 10, 8), snoutMat);
      footPad.position.set(sideX * 0.85, 0.45, 0.95);
      footPad.scale.set(1.0, 1.0, 0.4);
      group.add(footPad);
    });

    return group;
  }

  private static buildMannequin(): THREE.Group {
    const group = new THREE.Group();
    group.name = 'ArtMannequin';

    const woodMat = MeshCanvasTemplates.createMatteMaterial(0xdfcbb5);
    const jointMat = MeshCanvasTemplates.createAccentMaterial(0xbba38a);

    // Head
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.55, 16, 14), woodMat);
    head.position.set(0, 4.4, 0);
    head.scale.set(0.85, 1.15, 0.95);
    head.castShadow = true;
    group.add(head);

    // Neck
    const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.22, 0.38, 12), jointMat);
    neck.position.set(0, 3.75, 0);
    group.add(neck);

    // Torso Chest
    const chest = new THREE.Mesh(new THREE.BoxGeometry(1.35, 0.9, 0.8), woodMat);
    chest.position.set(0, 3.15, 0);
    chest.castShadow = true;
    group.add(chest);

    // Abdomen Joint
    const waist = new THREE.Mesh(new THREE.SphereGeometry(0.35, 12, 12), jointMat);
    waist.position.set(0, 2.45, 0);
    group.add(waist);

    // Pelvis
    const pelvis = new THREE.Mesh(new THREE.BoxGeometry(1.15, 0.65, 0.75), woodMat);
    pelvis.position.set(0, 1.95, 0);
    pelvis.castShadow = true;
    group.add(pelvis);

    // Arms
    [-0.9, 0.9].forEach(sideX => {
      const shoulder = new THREE.Mesh(new THREE.SphereGeometry(0.2, 10, 10), jointMat);
      shoulder.position.set(sideX, 3.35, 0);
      group.add(shoulder);

      const upperArm = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.14, 0.85, 10), woodMat);
      upperArm.position.set(sideX, 2.7, 0);
      group.add(upperArm);

      const elbow = new THREE.Mesh(new THREE.SphereGeometry(0.15, 10, 10), jointMat);
      elbow.position.set(sideX, 2.15, 0);
      group.add(elbow);

      const forearm = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.12, 0.8, 10), woodMat);
      forearm.position.set(sideX, 1.65, 0);
      group.add(forearm);

      const hand = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.32, 0.22), woodMat);
      hand.position.set(sideX, 1.1, 0);
      group.add(hand);
    });

    // Legs
    [-0.45, 0.45].forEach(sideX => {
      const hip = new THREE.Mesh(new THREE.SphereGeometry(0.22, 10, 10), jointMat);
      hip.position.set(sideX, 1.55, 0);
      group.add(hip);

      const thigh = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.18, 1.05, 10), woodMat);
      thigh.position.set(sideX, 0.95, 0);
      group.add(thigh);

      const knee = new THREE.Mesh(new THREE.SphereGeometry(0.18, 10, 10), jointMat);
      knee.position.set(sideX, 0.35, 0);
      group.add(knee);

      const calf = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.14, 0.95, 10), woodMat);
      calf.position.set(sideX, -0.2, 0);
      group.add(calf);

      const foot = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.16, 0.65), woodMat);
      foot.position.set(sideX, -0.75, 0.18);
      group.add(foot);
    });

    group.position.y += 0.85;
    return group;
  }

  private static buildVehicleChassis(): THREE.Group {
    const group = new THREE.Group();
    group.name = 'VehicleChassis';

    const bodyMat = MeshCanvasTemplates.createMatteMaterial(0x3b82f6);
    const cabinMat = MeshCanvasTemplates.createGlassMaterial(0x1e293b, 0.75);
    const tireMat = MeshCanvasTemplates.createDarkMaterial(0x1f242d);
    const rimMat = MeshCanvasTemplates.createAccentMaterial(0xd1d5db);

    // Main Chassis Tub
    const chassis = new THREE.Mesh(new THREE.BoxGeometry(2.3, 0.55, 4.6), bodyMat);
    chassis.position.set(0, 0.75, 0);
    chassis.castShadow = true;
    chassis.receiveShadow = true;
    group.add(chassis);

    // Hood & Trunk
    const hood = new THREE.Mesh(new THREE.BoxGeometry(2.1, 0.32, 1.4), bodyMat);
    hood.position.set(0, 0.95, 1.4);
    group.add(hood);

    const trunk = new THREE.Mesh(new THREE.BoxGeometry(2.1, 0.38, 0.9), bodyMat);
    trunk.position.set(0, 0.98, -1.65);
    group.add(trunk);

    // Cabin Greenhouse
    const cabin = new THREE.Mesh(new THREE.BoxGeometry(1.7, 0.75, 2.0), cabinMat);
    cabin.position.set(0, 1.35, -0.2);
    cabin.castShadow = true;
    group.add(cabin);

    // 4 Wheels & Rims
    const wheelOffsets = [
      [-1.2, 0.5, 1.4],
      [1.2, 0.5, 1.4],
      [-1.2, 0.5, -1.4],
      [1.2, 0.5, -1.4]
    ];
    wheelOffsets.forEach(pos => {
      const tire = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 0.38, 16), tireMat);
      tire.position.set(pos[0], pos[1], pos[2]);
      tire.rotation.z = Math.PI / 2;
      tire.castShadow = true;
      group.add(tire);

      const rim = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.4, 12), rimMat);
      rim.position.set(pos[0], pos[1], pos[2]);
      rim.rotation.z = Math.PI / 2;
      group.add(rim);
    });

    return group;
  }

  private static buildFurniture(): THREE.Group {
    const group = new THREE.Group();
    group.name = 'DesignerFurniture';

    const woodMat = MeshCanvasTemplates.createMatteMaterial(0x854d0e);
    const cushionMat = MeshCanvasTemplates.createAccentMaterial(0x334155);
    const tableMat = MeshCanvasTemplates.createMatteMaterial(0xd6d3d1);

    // Armchair Seat Cushion
    const seat = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.28, 1.5), cushionMat);
    seat.position.set(-1.0, 0.8, 0);
    seat.castShadow = true;
    group.add(seat);

    // Backrest
    const backrest = new THREE.Mesh(new THREE.BoxGeometry(1.6, 1.25, 0.24), cushionMat);
    backrest.position.set(-1.0, 1.45, -0.65);
    backrest.rotation.x = -Math.PI / 16;
    backrest.castShadow = true;
    group.add(backrest);

    // Armrests
    [-1.75, -0.25].forEach(sideX => {
      const arm = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.45, 1.4), woodMat);
      arm.position.set(sideX, 1.1, 0);
      group.add(arm);
    });

    // Chair Legs
    const chairLegs = [
      [-1.7, 0.35, 0.6],
      [-0.3, 0.35, 0.6],
      [-1.7, 0.35, -0.6],
      [-0.3, 0.35, -0.6]
    ];
    chairLegs.forEach(pos => {
      const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.035, 0.7, 8), woodMat);
      leg.position.set(pos[0], pos[1], pos[2]);
      group.add(leg);
    });

    // Coffee Table Top
    const tableTop = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 0.9, 0.08, 24), tableMat);
    tableTop.position.set(1.5, 0.75, 0);
    tableTop.castShadow = true;
    group.add(tableTop);

    // Table Tripod Legs
    for (let i = 0; i < 3; i++) {
      const ang = (i * Math.PI * 2) / 3;
      const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.03, 0.72, 8), woodMat);
      leg.position.set(1.5 + Math.cos(ang) * 0.6, 0.36, Math.sin(ang) * 0.6);
      group.add(leg);
    }

    return group;
  }

  private static buildInstruments(): THREE.Group {
    const group = new THREE.Group();
    group.name = 'AcousticGuitar';

    const bodyMat = MeshCanvasTemplates.createMatteMaterial(0xca8a04);
    const soundboardMat = MeshCanvasTemplates.createAccentMaterial(0xfef08a);
    const neckMat = MeshCanvasTemplates.createMatteMaterial(0x713f12);
    const darkMat = MeshCanvasTemplates.createDarkMaterial(0x1c1917);

    // Lower Bout Body
    const lowerBout = new THREE.Mesh(new THREE.CylinderGeometry(1.35, 1.35, 0.45, 24), bodyMat);
    lowerBout.position.set(0, 1.2, 0);
    lowerBout.scale.set(1.0, 1.0, 0.8);
    lowerBout.castShadow = true;
    group.add(lowerBout);

    // Upper Bout Body
    const upperBout = new THREE.Mesh(new THREE.CylinderGeometry(1.05, 1.05, 0.43, 24), bodyMat);
    upperBout.position.set(0, 2.5, 0);
    upperBout.scale.set(1.0, 1.0, 0.8);
    upperBout.castShadow = true;
    group.add(upperBout);

    // Waist Connector
    const waist = new THREE.Mesh(new THREE.BoxGeometry(1.65, 0.44, 0.5), soundboardMat);
    waist.position.set(0, 1.85, 0);
    group.add(waist);

    // Soundhole
    const soundhole = new THREE.Mesh(new THREE.CylinderGeometry(0.36, 0.36, 0.48, 20), darkMat);
    soundhole.position.set(0, 2.2, 0);
    group.add(soundhole);

    // Bridge
    const bridge = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.08, 0.8), darkMat);
    bridge.position.set(0, 1.1, 0.22);
    group.add(bridge);

    // Neck
    const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.18, 2.3, 12), neckMat);
    neck.position.set(0, 4.2, 0);
    group.add(neck);

    // Fretboard
    const fretboard = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.04, 2.1), darkMat);
    fretboard.position.set(0, 4.2, 0.12);
    group.add(fretboard);

    // Headstock
    const headstock = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.09, 0.65), neckMat);
    headstock.position.set(0, 5.55, 0.05);
    headstock.rotation.x = -Math.PI / 14;
    group.add(headstock);

    return group;
  }

  private static buildArchitecture(): THREE.Group {
    const group = new THREE.Group();
    group.name = 'CantileverPavilion';

    const concreteMat = MeshCanvasTemplates.createMatteMaterial(0xe2e8f0);
    const glassMat = MeshCanvasTemplates.createGlassMaterial(0x93c5fd, 0.6);
    const columnMat = MeshCanvasTemplates.createDarkMaterial(0x334155);
    const woodMat = MeshCanvasTemplates.createAccentMaterial(0x92400e);

    // Tiered Foundation
    const plinth1 = new THREE.Mesh(new THREE.BoxGeometry(6.2, 0.25, 6.2), concreteMat);
    plinth1.position.set(0, 0.125, 0);
    plinth1.receiveShadow = true;
    group.add(plinth1);

    const plinth2 = new THREE.Mesh(new THREE.BoxGeometry(5.2, 0.25, 5.2), woodMat);
    plinth2.position.set(0, 0.375, 0);
    group.add(plinth2);

    // Central Glass Atrium
    const glassAtrium = new THREE.Mesh(new THREE.BoxGeometry(2.8, 2.2, 2.8), glassMat);
    glassAtrium.position.set(0, 1.6, 0);
    glassAtrium.castShadow = true;
    group.add(glassAtrium);

    // Perimeter Columns
    const colOffsets = [
      [-2.2, 1.5, -2.2],
      [2.2, 1.5, -2.2],
      [-2.2, 1.5, 2.2],
      [2.2, 1.5, 2.2],
      [-2.2, 1.5, 0],
      [2.2, 1.5, 0]
    ];
    colOffsets.forEach(pos => {
      const col = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 2.2, 12), columnMat);
      col.position.set(pos[0], pos[1], pos[2]);
      col.castShadow = true;
      group.add(col);
    });

    // Cantilever Roof Slab
    const roofSlab = new THREE.Mesh(new THREE.BoxGeometry(5.6, 0.32, 5.6), concreteMat);
    roofSlab.position.set(0, 2.85, 0);
    roofSlab.castShadow = true;
    roofSlab.receiveShadow = true;
    group.add(roofSlab);

    // Floating Upper Pavilion
    const upperPavilion = new THREE.Mesh(new THREE.BoxGeometry(2.5, 1.5, 3.6), concreteMat);
    upperPavilion.position.set(0.6, 3.8, 0.5);
    upperPavilion.castShadow = true;
    group.add(upperPavilion);

    // Upper Balcony Window
    const upperGlass = new THREE.Mesh(new THREE.BoxGeometry(2.3, 1.2, 0.1), glassMat);
    upperGlass.position.set(0.6, 3.8, 2.31);
    group.add(upperGlass);

    return group;
  }

  private static buildMechanical(): THREE.Group {
    const group = new THREE.Group();
    group.name = 'TurbofanEngine';

    const cowlMat = MeshCanvasTemplates.createMatteMaterial(0x94a3b8);
    const metalMat = MeshCanvasTemplates.createAccentMaterial(0x64748b);
    const coreMat = MeshCanvasTemplates.createDarkMaterial(0x1e293b);
    const glowMat = MeshCanvasTemplates.createAccentMaterial(0xf97316);

    // Outer Nacelle Cowl
    const nacelle = new THREE.Mesh(new THREE.CylinderGeometry(1.7, 1.5, 3.8, 24, 1, true), cowlMat);
    nacelle.position.set(0, 2.0, 0);
    nacelle.rotation.x = Math.PI / 2;
    nacelle.castShadow = true;
    group.add(nacelle);

    // Cowl Lip Rings
    const intakeRing = new THREE.Mesh(new THREE.TorusGeometry(1.68, 0.12, 12, 24), metalMat);
    intakeRing.position.set(0, 2.0, 1.9);
    group.add(intakeRing);

    const exhaustRing = new THREE.Mesh(new THREE.TorusGeometry(1.48, 0.1, 12, 24), metalMat);
    exhaustRing.position.set(0, 2.0, -1.9);
    group.add(exhaustRing);

    // Central Spinner Cone
    const spinner = new THREE.Mesh(new THREE.ConeGeometry(0.55, 1.2, 16), metalMat);
    spinner.position.set(0, 2.0, 1.5);
    spinner.rotation.x = Math.PI / 2;
    group.add(spinner);

    // 12 Fan Rotor Blades
    for (let i = 0; i < 12; i++) {
      const ang = (i * Math.PI * 2) / 12;
      const blade = new THREE.Mesh(new THREE.BoxGeometry(0.06, 1.1, 0.25), metalMat);
      blade.position.set(Math.cos(ang) * 0.8, 2.0 + Math.sin(ang) * 0.8, 1.2);
      blade.rotation.z = ang + Math.PI / 6;
      group.add(blade);
    }

    // Core Compressor & Exhaust Cone
    const coreHousing = new THREE.Mesh(new THREE.CylinderGeometry(0.85, 0.75, 2.0, 16), coreMat);
    coreHousing.position.set(0, 2.0, 0);
    coreHousing.rotation.x = Math.PI / 2;
    group.add(coreHousing);

    const exhaustCone = new THREE.Mesh(new THREE.ConeGeometry(0.65, 1.5, 16), glowMat);
    exhaustCone.position.set(0, 2.0, -1.6);
    exhaustCone.rotation.x = -Math.PI / 2;
    group.add(exhaustCone);

    // 4 Hydraulic Actuators
    for (let i = 0; i < 4; i++) {
      const ang = (i * Math.PI) / 2 + Math.PI / 4;
      const actuator = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 3.2, 8), metalMat);
      actuator.position.set(Math.cos(ang) * 1.6, 2.0 + Math.sin(ang) * 1.6, 0);
      actuator.rotation.x = Math.PI / 2;
      group.add(actuator);
    }

    return group;
  }

  private static buildOrganic(): THREE.Group {
    const group = new THREE.Group();
    group.name = 'DragonBeast';

    const scaleMat = MeshCanvasTemplates.createMatteMaterial(0x047857);
    const bellyMat = MeshCanvasTemplates.createAccentMaterial(0xa7f3d0);
    const hornMat = MeshCanvasTemplates.createAccentMaterial(0xfde047);
    const clawMat = MeshCanvasTemplates.createDarkMaterial(0x1e293b);

    // Muscular Torso Chest
    const torso = new THREE.Mesh(new THREE.SphereGeometry(1.25, 16, 14), scaleMat);
    torso.position.set(0, 2.1, 0);
    torso.scale.set(1.0, 1.35, 1.6);
    torso.castShadow = true;
    torso.receiveShadow = true;
    group.add(torso);

    // Underbelly Plates
    const belly = new THREE.Mesh(new THREE.SphereGeometry(1.1, 14, 12), bellyMat);
    belly.position.set(0, 1.9, 0.3);
    belly.scale.set(0.85, 1.15, 1.4);
    group.add(belly);

    // Pelvis
    const pelvis = new THREE.Mesh(new THREE.SphereGeometry(0.95, 14, 12), scaleMat);
    pelvis.position.set(0, 2.0, -1.5);
    group.add(pelvis);

    // Arched Neck
    const neck1 = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.6, 0.8, 10), scaleMat);
    neck1.position.set(0, 2.8, 1.0);
    neck1.rotation.x = -Math.PI / 5;
    group.add(neck1);

    const neck2 = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.45, 0.8, 10), scaleMat);
    neck2.position.set(0, 3.4, 1.5);
    neck2.rotation.x = -Math.PI / 10;
    group.add(neck2);

    // Head Skull
    const head = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.65, 1.1), scaleMat);
    head.position.set(0, 3.8, 2.1);
    head.castShadow = true;
    group.add(head);

    const snout = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.38, 0.65), scaleMat);
    snout.position.set(0, 3.65, 2.8);
    group.add(snout);

    // Curved Horns
    [-0.35, 0.35].forEach(sideX => {
      const horn = new THREE.Mesh(new THREE.ConeGeometry(0.18, 1.4, 10), hornMat);
      horn.position.set(sideX, 4.4, 1.8);
      horn.rotation.x = -Math.PI / 3;
      horn.rotation.z = sideX * -Math.PI / 8;
      group.add(horn);
    });

    // Wings Armature
    [-1.2, 1.2].forEach(sideX => {
      const wingArm = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.18, 1.6, 8), scaleMat);
      wingArm.position.set(sideX * 1.5, 3.0, -0.2);
      wingArm.rotation.z = sideX * -Math.PI / 3.5;
      group.add(wingArm);

      const wingMembrane = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.04, 1.2), bellyMat);
      wingMembrane.position.set(sideX * 2.1, 2.8, -0.6);
      wingMembrane.rotation.z = sideX * -Math.PI / 4;
      group.add(wingMembrane);
    });

    // 4 Beast Legs & Claws
    const beastLegs = [
      [-0.9, 1.1, 0.8],
      [0.9, 1.1, 0.8],
      [-0.85, 1.0, -1.6],
      [0.85, 1.0, -1.6]
    ];
    beastLegs.forEach(pos => {
      const thigh = new THREE.Mesh(new THREE.SphereGeometry(0.42, 10, 10), scaleMat);
      thigh.position.set(pos[0], pos[1] + 0.3, pos[2]);
      group.add(thigh);

      const shin = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.28, 1.1, 10), scaleMat);
      shin.position.set(pos[0], pos[1] - 0.4, pos[2]);
      group.add(shin);

      const foot = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.22, 0.65), clawMat);
      foot.position.set(pos[0], pos[1] - 0.95, pos[2] + 0.15);
      group.add(foot);
    });

    // Tail Segments
    for (let i = 0; i < 4; i++) {
      const r = 0.5 - i * 0.1;
      const seg = new THREE.Mesh(new THREE.ConeGeometry(r, 1.0, 8), scaleMat);
      seg.position.set(0, 1.8 - i * 0.25, -2.4 - i * 0.8);
      seg.rotation.x = -Math.PI / 2.5;
      group.add(seg);
    }

    return group;
  }

  public static readonly TEMPLATES: MeshTemplateDefinition[] = [
    // Beginner / Kids
    {
      id: 'beginner_house',
      name: 'Cartoon House',
      category: 'beginner',
      difficulty: 'Beginner',
      description: 'Cozy cartoon cottage with pitched roof, chimney, doors, windows, and entrance steps.',
      createMesh: MeshCanvasTemplates.buildCartoonHouse
    },
    {
      id: 'beginner_rocket',
      name: 'Rocket Ship',
      category: 'beginner',
      difficulty: 'Beginner',
      description: 'Streamlined space rocket with aerodynamic fins, nosecone, thruster nozzle, and circular porthole.',
      createMesh: MeshCanvasTemplates.buildRocket
    },
    {
      id: 'beginner_dinosaur',
      name: 'Friendly Dinosaur',
      category: 'beginner',
      difficulty: 'Beginner',
      description: 'Rounded low-poly dinosaur with neck, snout, back plates, sturdy pillar legs, and tail.',
      createMesh: MeshCanvasTemplates.buildDinosaur
    },
    {
      id: 'beginner_robot',
      name: 'Retro Robot',
      category: 'beginner',
      difficulty: 'Beginner',
      description: 'Classic mechanical robot with box head, antenna, chest display, articulate arms, and boots.',
      createMesh: MeshCanvasTemplates.buildRobot
    },
    {
      id: 'beginner_animal',
      name: 'Teddy Bear',
      category: 'beginner',
      difficulty: 'Beginner',
      description: 'Adorable bear figure with round ears, muzzle, plump torso, paws, and soft proportions.',
      createMesh: MeshCanvasTemplates.buildAnimal
    },

    // Intermediate
    {
      id: 'intermediate_mannequin',
      name: 'Art Mannequin',
      category: 'intermediate',
      difficulty: 'Intermediate',
      description: 'Anatomical artist figure with articulated ball joints, torso, pelvis, arms, and legs.',
      createMesh: MeshCanvasTemplates.buildMannequin
    },
    {
      id: 'intermediate_vehicle',
      name: 'Sports Vehicle',
      category: 'intermediate',
      difficulty: 'Intermediate',
      description: 'Aerodynamic car chassis with cabin greenhouse canopy, hood, trunk, wheels, and rims.',
      createMesh: MeshCanvasTemplates.buildVehicleChassis
    },
    {
      id: 'intermediate_furniture',
      name: 'Lounge Chair & Table',
      category: 'intermediate',
      difficulty: 'Intermediate',
      description: 'Modern armchair with cushions, armrests, tapered legs, and round tripod coffee table.',
      createMesh: MeshCanvasTemplates.buildFurniture
    },
    {
      id: 'intermediate_instruments',
      name: 'Acoustic Guitar',
      category: 'intermediate',
      difficulty: 'Intermediate',
      description: 'Classical guitar featuring lower/upper bouts, waist soundhole, bridge, neck, and headstock.',
      createMesh: MeshCanvasTemplates.buildInstruments
    },

    // Advanced
    {
      id: 'advanced_architecture',
      name: 'Cantilever Pavilion',
      category: 'advanced',
      difficulty: 'Advanced',
      description: 'Modern architectural structure with tiered plinth, columns, glass atrium, and roof canopy.',
      createMesh: MeshCanvasTemplates.buildArchitecture
    },
    {
      id: 'advanced_mechanical',
      name: 'Turbofan Jet Engine',
      category: 'advanced',
      difficulty: 'Advanced',
      description: 'Aviation turbofan with intake nacelle, rotor blades, compressor housing, and exhaust nozzle.',
      createMesh: MeshCanvasTemplates.buildMechanical
    },
    {
      id: 'advanced_organic',
      name: 'Dragon Beast',
      category: 'advanced',
      difficulty: 'Advanced',
      description: 'Sculpting base mesh of a winged dragon with horns, segmented spine, limbs, and tail.',
      createMesh: MeshCanvasTemplates.buildOrganic
    }
  ];

  public static getTemplates(): MeshTemplateDefinition[] {
    return this.TEMPLATES;
  }

  public static getTemplatesByCategory(category: TemplateCategory): MeshTemplateDefinition[] {
    return this.TEMPLATES.filter(t => t.category === category);
  }

  public static getTemplateById(id: string): MeshTemplateDefinition | undefined {
    return this.TEMPLATES.find(t => t.id === id);
  }

  /**
   * Instantiates a template group, prepares all submesh vertex normals and BVH bounds trees,
   * and wraps everything in a MeshGuide ready for surface drawing.
   */
  public static loadTemplate(templateId: string): { group: THREE.Group; meshes: THREE.Mesh[]; guide: MeshGuide } | null {
    const def = this.getTemplateById(templateId);
    if (!def) {
      console.warn(`[MeshCanvasTemplates] Template not found: ${templateId}`);
      return null;
    }

    const group = def.createMesh();
    const meshes: THREE.Mesh[] = [];

    group.traverse(child => {
      if ((child as THREE.Mesh).isMesh) {
        const m = child as THREE.Mesh;
        if (m.geometry) {
          m.geometry.computeVertexNormals();
          SurfaceSnapping.buildBVH(m);
        }
        meshes.push(m);
      }
    });

    const guide = new MeshGuide(group);

    return {
      group,
      meshes,
      guide
    };
  }
}
