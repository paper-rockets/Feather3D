# Feather 3D: Development Build Requirements

## 1. Core Architecture & Platform Requirements
*   **Target Platform:** iOS-exclusive (iPadOS).
*   **Engine Update (v2.0 Roadmap - Q1 2026):** Migration to Apple Metal 4 API.
*   **Hardware Threshold (v2.0):** Requires iPadOS 26 and above.

## 2. 3D Guide Framework (Scaffolding System)
*   **Function:** User-generated translucent, grid-lined planar surfaces for spatial stroke projection.
*   **Generation Modalities:**
    *   **Draw 3D Guide:** Stylus-drawn plane perpendicular to camera view; scale/curvature linked to FOV.
    *   **Bend 3D Guide:** Deform existing guides via secondary drawn trajectory (allows wrapping/tubes).
    *   **Loft Tool:** Mathematical surface interpolation between 2 or more selected curves. Includes a "Tension Slider" for interpolation curvature (smooth vs. rigid).
    *   **Primitives:** Cube, Pyramid, Sphere, Tube instantiated at (0,0,0). Includes topological segment density slider and localized joystick for scaling/positioning before confirmation.
*   **Guide UI & Management:**
    *   Orange origin/trajectory indicator line on edges.
    *   Bi-directional drawing (front and back faces).
    *   Opacity control via horizontal slide on the 'close' button.
    *   Archival functionality (swipe up on 'close') to save as a distinct "Surface" in the Resource Tab.

## 3. Brush Engine & Stroke Mechanics
*   **Stroke Rendering:** 3D tubes/ribbons responsive to spatial perspective and lighting.
*   **Brush Parameters:**
    *   Size: 1mm to 300mm.
    *   Opacity: 0% to 100%.
    *   Input: Vertical sidebar sliders or tap for direct-input numpad.
*   **Color Dragging Gesture:** Tap, hold, and drag color icon (Horizontal = Saturation, Vertical = Brightness).
*   **Hardware Mapping:** Apple Pencil pressure dictates thickness, opacity, and color density.
*   **Stable Strokes:** Real-time smoothing algorithm with a dedicated preview testing panel.
*   **Spatial Injector (Eyedropper):** Extracts brush type, hex color, exact size (mm), opacity, and pressure profile from existing spatial curves. Includes on-screen magnifier.

## 4. Materials, Textures & Environment
*   **Material Shaders:**
    *   **Shaded:** Dynamic interaction with directional light, casts shadows.
    *   **Shadeless:** Flat, unlit rendering, no shadows.
    *   **Glow:** Emissive material, no shadows.
    *   **Cutout:** Alpha/Masked Boolean subtraction.
*   **Procedural Patterns (For Shaded/Shadeless):** Dots, Lines, Crosses, Terrazzo, Stippled Dots. Real-time sliders for global scale, projection angle, and contrast intensity.
*   **Environmental Lighting Engine:**
    *   Customizable global directional light (azimuth/altitude via touch-drag), light color, specular intensity, and ground shadows.
    *   **Toon Shading Toggle:** Hard light-dark threshold for cel-shaded rendering.
*   **Volumetric Physics:**
    *   Depth-based fog density.
    *   Depth of Field (DoF) linked to pinned user "Orbit Point".
    *   Post-processing: Procedural film grain, emissive Bloom (Glow Area settings).

## 5. Selection, Transformation & Liquify Utilities
*   **Selection Mechanics:**
    *   Stylus drag-to-select lasso (Highlights neon green + haptic feedback).
    *   **Isolation by 3D Guide:** Active guide acts as a spatial mask; Select/Eraser tools ignore occluded geometry.
*   **Transformation Dual-Joystick:**
    *   **2D Joystick (Screen Space):** Planar movement, rotation, free scaling, disproportionate parallel scaling, proportional lock.
    *   **3D Joystick (World/Local Space):** X/Y/Z translation and rotation, trackball "Free Rotate" around geometric center.
    *   **Symmetry Tool:** "Symmetrically by View" (camera perspective) and "Symmetrically by Mirror" (X, Y, Z global axes).
*   **Mathematical Liquify Engine (Real-time vertex shifting):**
    *   **Push:** Warps curves along stylus drag vector.
    *   **Pinch:** Condenses/expands vertices radially.
    *   **Comb:** Localized spatial smoothing along a unified vector.
    *   **Safety Pipeline:** Requires "Compare and Apply" hold-button state before committing to history.

## 6. Stage Orchestration & Asset Management
*   **Hierarchy Panel (Groups, Resources, Environments):**
    *   **Groups:** Object-oriented nested strokes (active group highlighted dark gray). Supports visibility toggles, isolation, merging, and "Import to Group" specific curve migration.
*   **Resource Repository:**
    *   Imports external .OBJ, .feather files, and 2D imagery (max 2 images per note, perpendicular projection).
    *   **Drawable Meshes:** Toggling the "visibility cube" to black converts imported .OBJ files into drawable, multi-faceted 3D Guides.
    *   **Clipboard Extension:** Independent floating 2D canvas for pin-able reference image color sampling.

## 7. Interaction Heuristics (Multi-Touch & Apple Pencil Pro)
*   **Multi-Touch Navigation:**
    *   1-finger swipe: Orbit around pinned target.
    *   2-finger swipe: Pan translation.
    *   2-finger pinch: Zoom/dolly.
    *   3-finger vertical swipe: FOV lens alteration (10mm wide-angle to 500mm telephoto).
    *   3-finger double-tap: Toggle orthographic isometric vs. perspective matrix.
*   **Apple Pencil Pro Integration:**
    *   **Squeeze Menu:** Context radial menu (Undo/Redo, Group Creation, Brush params, "Find Group").
    *   **Squeeze-drag to Switch:** Temporary tool override (e.g., instant erase/select).
    *   **Hover:** Visual cursor preview of geometric brush size and color on the 3D guide.
    *   **Haptics:** Physical motor feedback on erase, select, or geometric guide snapping.
    *   **Barrel Roll:** Physically twist the pencil to rotate 3D assets in real-time while using the Stamp duplication tool.
    *   **Accessibility:** "Finger-Pen" mode (locks camera, interprets touch as pressure-sensitive drawing).

## 8. Sequences, Animation & Augmented Reality
*   **Sequence Engine:** Timeline-based keyframing of Camera X/Y/Z, rotation, and FOV.
*   **Playback Controls:** Speeds (0.5x, 1x, 2x), Loop architecture (Play Once, Loop, Swing), "Thirds Grid" overlay for composition.
*   **AR Viewer:** LiDAR spatial anchoring, Automatic Light Color (matches physical room lux/temperature to digital asset), AR turntable/levitation/time-lapse playback.

## 9. Export & Interoperability Pipelines
*   **Native Exports:** PNG (alpha channel), JPG, MP4, GIF (captures manual nav, Sequences, turntables, or procedural time-lapses).
*   **3D Exports:** .OBJ, .GLTF (bakes brush properties/color/material into vertex paint).

## 10. V2.0 Metal 4 Exclusive Features (Q1 2026 Build)
*   **3D Bucket Fill:** Volumetric triangulation across topological gaps to generate fluid 3D planes (convertible into new 3D Guides).
*   **Advanced Brush Physics:** Fluid/particle dynamic simulation (e.g., water droplets) replacing static mathematical ribbons. Includes flow, dispersion, and chaotic attribute sliders.
