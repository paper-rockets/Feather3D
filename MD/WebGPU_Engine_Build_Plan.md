# WebGPU Spatial Drawing Engine: Development Plan

## Architectural Foundations
* **3D Guide System:** Resolves depth ambiguity by raycasting strokes onto dynamically generated continuous 3D surfaces, rigid geometric primitives (spheres, cylinders, planes), or custom topologies generated via a "Loft" system.
* **Volumetric Stroke Meshing:** Captures point curve data (coordinates, normal vectors, stylus pressure) at high polling rates and processes them into 3D volumetric meshes (tubes/ribbons) with real-time smoothing (Stable Stroke algorithm).
* **GPU-Accelerated Deformation (3D Liquify):** Offloads spatial deformation mathematics directly to the GPU using compute shaders, bypassing CPU main thread bottlenecks during real-time vertex manipulation.
* **Rendering Pipeline:** Utilizes a stylized Physically Based Rendering (PBR) model optimized for mobile/cross-platform performance, supporting Non-Photorealistic Rendering (NPR), dynamic directional lighting, and real-time shadow casting.

## Technology Stack
* **Core API:** WebGPU (with WebGL 2 fallback).
* **Engine:** Three.js with `WebGPURenderer`.
* **Shading:** Three Shading Language (TSL) for modular, node-based shader composition.
* **Build Tooling:** Modern bundler (e.g., Vite) with top-level await support (e.g., `vite-plugin-top-level-await`).

## Implementation Phases

### Phase 1: Engine Initialization
* **Asynchronous Setup:** Instantiate the renderer with `THREE.WebGPURenderer({ antialias: true, forceWebGL: false })`.
* **Context Acquisition:** Execute `await renderer.init()` to query host device capabilities and secure a graphics context asynchronously.

### Phase 2: Spatial Input and Raycasting
* **Input Handling:** Utilize the Web Pointer Events API to capture device type and `e.pressure`.
* **Intersection Testing:** Implement `THREE.Raycaster` to project vectors from the perspective camera through normalized device coordinates against active 3D guides.
* **Data Smoothing:** Apply Catmull-Rom spline interpolation to raw intersection buffer points to generate mathematically smooth curves.
* **Interaction Routing:** Differentiate inputs—map stylus/single-finger drags to drawing operations, and multi-touch/UI interactions to camera transforms (orbit, pan, zoom).

### Phase 3: Volumetric Stroke Generation (Instancing)
* **Geometry Strategy:** Employ TSL-powered line instancing (e.g., Makio MeshLine or native `Line2NodeMaterial`) rather than standard `GL_LINES` or unique `TubeGeometry` generation.
* **Dynamic Width Calculation:** Populate an `InstancedBufferAttribute` with pressure data. Inject a custom TSL node function into the geometry pipeline to multiply the base stroke width by the pressure attribute on a per-vertex basis.

### Phase 4: Compute Shaders (3D Liquify Architecture)
* **Data Allocation:** Upload stroke coordinates via bidirectional `StorageBufferAttribute` (storage buffers).
* **Uniforms:** Pass the Liquify brush cursor's 3D position and radius as dynamic `uniform()` nodes.
* **Parallel Logic:** Author a TSL `compute_update` function for parallel vertex execution. Use math nodes (`length()`, `sub()`) for distance calculation and `step()` for spatial thresholding. Apply displacement vectors based on tool mode (push, pinch, expand).
* **Dispatch Routing:** Execute `renderer.computeAsync(compute_update)` in the main animation loop immediately prior to the visual rendering pass.

### Phase 5: Material Formulation and NPR
* **Core Materials:** Deploy `MeshPhysicalNodeMaterial` or `MeshStandardNodeMaterial` for PBR lighting, and `MeshToonNodeMaterial` for cel-shaded aesthetics.
* **Stylization:** Inject custom gradient maps to dictate shadow steps. Link procedural math nodes to the `colorNode` property to simulate natural media textures directly on the GPU without texture coordinate lookups.

### Phase 6: Post-Processing Render Pipeline
* **Architecture:** Utilize the WebGPU `RenderPipeline` with Multiple Render Targets (MRT) and node-based compositing instead of the legacy `EffectComposer`.
* **Effects Nodes:**
  * `toonOutlinePass()`: Analyzes depth and normal buffers for stylized ink borders around stroke meshes.
  * `bloom()`: Isolates, blurs, and composites pixels exceeding a defined luminance threshold.
  * `viewportLinearDepth()` + `mx_noise_vec3`: Combines procedural noise with depth data to dynamically simulate depth of field and film grain.

### Phase 7: Ecosystem Integration & Data Interoperability
* **Serialization:** Manage stroke arrays (position, normal, pressure) via `Float32Array` buffers for efficient JSON or binary serialization.
* **Export Tooling:** Integrate Three.js `GLTFExporter` to parse the scene graph and output lofted guides and volumetric strokes to standard `.gltf` or `.glb` files.
* **Spatial Integration:** Enable WebXR native support for Augmented Reality (AR) viewing contexts.
