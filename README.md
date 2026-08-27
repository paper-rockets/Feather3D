# Feather3D Web

A web-based, tablet-first 3D drawing and sketching application inspired by Feather 3D, built on Three.js, WebGL2, and modern Web APIs.

## Live Demo URL
* GitHub Pages Live Demo: https://paper-rockets.github.io/Feather3D/

---

## Core Features

* 3D Curve Drawing with Stylus Dynamics: W3C Pointer Events Level 3 capturing high-frequency pressure, tilt, and palm rejection.
* Bishop Rotation Minimizing Frames (RMF): Twist-free and normal-continuous 3D ribbon and tube stroke extrusions.
* 3D Guide Surfaces & BVH Snapping: Real-time raycasting and normal projection against planes, cubes, spheres, cylinders, and imported reference 3D meshes using `three-mesh-bvh`.
* Multi-Touch Navigation: 1-finger orbit, 2-finger pan/zoom/rotate, 3-finger undo/redo.
* Custom GLSL Shaders:
  * Shadeless (unlit vertex colors)
  * Shaded & Cel-Shaded Toon (Ghibli anime quantization)
  * Glow (emissive bloom boost with UnrealBloomPass)
  * Cutout (stencil negative space carving)
  * Procedural Patterns (Halftone dots, hatch lines, cross-hatch, stipple, and terrazzo Voronoi)
* Selection & Transformation: Lasso selection, Box selection, Click selection, Invert Selection, Select-All, and 3D Duplication (`Ctrl+D`).
* 2D & 3D Joysticks: Screen-space viewport transformations and 3D cardinal axis manipulation with angle and grid snapping.
* 3D Sculpting & Liquify: Real-time curve control point deformation with smoothstep falloff.
* Sequence Animation: Frame-by-frame 3D flipbook animation with FPS controls and real-time Onion Skinning.
* Multi-Format Exporters:
  * Native `.feather` Project JSON (lossless non-destructive format)
  * GLTF / GLB Binary
  * Wavefront OBJ
  * USDZ (Apple ARKit / Quick Look)
  * STL (3D Printing)
  * High-Res PNG (2X/4X)
  * 360 Turntable Video (WebM/MP4)
* Blender Add-on: `feather_blender_addon.py` for importing `.feather` sketches into Blender 3.x/4.x as 3D Bezier curves with Multi Material Master shader node graphs.
* PWA Ready: Installable as a standalone app on iPadOS, Android, Windows, and macOS with full offline caching via service workers.

---

## Getting Started

### Local Development
```bash
npm install
npm run dev
```

### Production Build & Preview
```bash
npm run build
npm run preview
```

### Blender Add-on Installation
1. In Blender, go to Edit > Preferences > Add-ons > Install.
2. Select `feather_blender_addon.py`.
3. Enable "Import-Export: Feather 3D Importer & Multi Material Master".
4. Go to File > Import > Feather 3D (.feather).
