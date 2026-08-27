# Feather 3D - Architectural Specification & Build Plan

## 1. System & Macro-Architecture Overview
*   **Platform Target:** iPadOS (Strictly offline processing)
*   **Rendering Engine:** Airbreath (Proprietary)
*   **Upcoming Migration (v2.0):** Transition to Metal 4 API (iPadOS 26) to manage high vertex counts, real-time depth-based transparency without ray-tracing, and complex spatial operations (e.g., 3D Bucket Fill).
*   **Core File Format:** `.feather` (Encapsulates 3D curve data, spatial coordinates, material properties, and metadata).
*   **Data Management:** Requires manual data purging/caching toggles, local backup mechanisms, and optimization routines like "Lighten" (mesh decimation algorithm to reduce vertex count).

## 2. Workspace Layout & UI Matrix
The interface is strictly segregated into four immutable zones governed by mutually exclusive state logic.

| Interface Quadrant | Primary Designation | Core Functions & Modalities |
| :--- | :--- | :--- |
| **System Menu (Top-Left)** | Global Administration | Home return, File (Capture Thumbnail), View (Hide UI, AR), Control (Dark Mode, Pencil/Cursor settings). |
| **Tool Menu (Top-Right)** | Active Input State | Draw / Draw Shape, Erase / Vacuum, Select / Deselect, Mirror toggle, Clipboard deployment, Stage Panel toggle. |
| **Sidebar Menu (Left-Edge)** | Property Modification | Brush Panel (Type, Size, Opacity, Pressure, Injector, Presets), History (Undo/Redo), Color Panel (Hue/Sat/Val, Hex, Eyedropper, Materials). |
| **Context Menu (Bottom-Center)** | Environmental Mutation | **Dynamic:** Default (Draw): Draw 3D Guide, Loft, Primitives. Selection state: Duplicate, Liquify, Transform, Delete. |

## 3. Input Modalities & Hardware Integration

### A. Apple Pencil (Creation & Manipulation)
*   **Squeeze Menu (Pencil Pro):** Radial palette for Undo/Redo, modifiers, and tooltips (e.g., "Find Group" hover detection).
*   **Stamp Tool (Pencil Pro):** Drag-to-duplicate with gyroscope integration ("Barrel Roll" twists physical torque into Z-axis curve rotation).
*   **Haptics:** Programmed tactile feedback for erasing, snapping, and property injection.

### B. Multi-Touch Gestures (Spatial Navigation)
| Touch Input Gesture | Navigation Outcome | Functional Mechanics |
| :--- | :--- | :--- |
| 1-Finger Swipe | Spheroid Rotation | Rotates canvas spherically around Orbit Point. |
| 2-Finger Pinch | Zoom Translation | Adjusts camera Z-axis proximity. |
| 2-Finger Swipe | Planar Pan | Translates camera across X/Y axes of viewing plane. |
| 3-Finger Double Tap | Projection Toggle | Snaps between perspective and orthographic flat projection. |
| 3-Finger Vertical Swipe| FOV Adjustment | Adjusts lens Field of View (10mm to 500mm). |
| 1-Finger Press and Hold| Anchor Pinning | Forces camera rotational center (Orbit Point) to touched geometry. |

### C. Keyboard Mapping
| Action Category | Primary Action | Keystroke / Modifier Mapping |
| :--- | :--- | :--- |
| **Navigation & Camera** | Rotate / Perfect View Snap | Spacebar / Spacebar x2 |
| | Zoom / Pan View | D / F |
| | Switch Projection View | Tab x2 |
| **Tool Initialization** | Toggle Draw / Draw Shape | B (Press again to toggle Shape) |
| | Toggle Erase / Vacuum | E (Press again to toggle Vacuum) |
| | Toggle Selection / Mirror | W or V / Shift + X |
| | Activate Injector / Hide UI | I / U |
| **Property Modulation**| Brush Radius Adjust | `[` , `]` (Alt/Opt +1, Shift +10) |
| | Opacity Adjust | `-` , `=` (Alt/Opt +1, Shift +10) |
| **Geometry Modification**| Duplicate | Shift + D |
| | Duplicate Symmetrically | Shift + Cmd + D / Shift + Alt/Opt + D |

## 4. Rendering, Materials & Physics

### A. Brush & Tool Physics
*   **Parameters:** Physical radius bounds (1mm - 300mm), Opacity bounds (0% - 100%).
*   **Data Extraction:** "Eyedropper" (extracts Hex color data only). "Injector" (holistic cloning: type, size, opacity, color, pressure).

### B. Material Pipeline
| Material Designation | Rendering Behavior | Lighting Response | Pattern Support |
| :--- | :--- | :--- | :--- |
| **Shadeless** | Flat albedo color | Ignores environmental variables | Supported |
| **Shaded** | Volumetric gradients | Casts/receives dynamic shadows | Supported |
| **Glow** | Emissive bloom effect | Ignores scene lighting | Unsupported |
| **Cutout** | Spatial boolean (masking) | Mirrors background color/image | Unsupported |

*   **Procedural Patterns:** Dot, Line, Cross, Terrazzo, Stippled Dot (real-time sliders for intensity, angle, internal contrast).

## 5. Global Environment & Spatial Control
*   **Hierarchy:** Managed via the Stage Panel (Group, Resource, Environment tabs).
*   **Coordinate System:** 1 grid unit = 1000mm. Focal boundary limit = 100 meters.
*   **Resources (Images/OBJs):** 3 states: Active (collision mesh/"shrink-wrap"), Passive (visible reference), Hidden (purged from viewport).
*   **Global Effects:** Post-processing layers (DOF tethered to Orbit Point, Film Grain, Pixelation, Global Toon Shading for cel-shaded output).

## 6. Geometric Generation & Manipulation

### A. 3D Guides & Surfacing
1.  **Manual 3D Guide:** Spawns perpendicular to camera vector. "Bend" tool recalculates plane along an intersecting curve pivot.
2.  **Loft (NURBS):** Bridges multiple vectors with a dynamic "Tension Slider" (smooth vs. angular interpolation).
3.  **Primitives:** Algorithmic Cubes, Pyramids, Spheres, Tubes controlled by a "Segment Slider" (resolution decimation).
4.  **Draw Shape:** Algorithmic tension snapping for straight lines or arcs.

### B. Selection & The Joystick Architecture
*   **Selection:** Green highlight. Parent group highlights in desaturated green for partial selections. Context menu offers Liquify, Transform, and Symmetry Mirroring.
*   **2D Joystick:** Planar manipulation (Width/Height Scale, Translate, Rotate).
*   **3D Joystick:** Red/Green/Blue cones (Translate), Arcs (Rotate), Sphere (Trackball).
*   **Orthographic Collapse:** Depth axis (Z) UI automatically disappears when snapped to "Perfect View" (front/top) to prevent plotting errors.

## 7. Extensions & I/O Pipeline

### A. Internal Pipelines
*   **AR Viewer:** LiDAR mapping, Anchor pinning, Vertical Y-axis levitation gesture, Auto Ambient Light Color mapping.
*   **Sequence:** Keyframe timeline editor. Logs discrete "Shots" (Coordinate + FOV). Interpolation modes with Rule of Thirds grid and raw X/Y/Z data readouts.

### B. Export Formats
*   **Images:** PNG (alpha transparency disables post-processing), JPG.
*   **Video/Animation:** MP4 (manual bitrate/framerate, Turntable, Timelapse), GIF.
*   **3D Topology:** OBJ, GLTF (bakes brush colors into vertex paint). Respects Stage Panel visibility toggles.
