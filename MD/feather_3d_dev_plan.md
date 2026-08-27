# Feather 3D: Architectural & Development Specification
**Target:** Tablet Architecture (iPad ecosystem / Apple Pencil hardware integration)
**Engine:** Proprietary real-time procedural curve rendering (V1.3) -> Metal 4 API (V2.0)

---

## 1. Core Workspace Architecture
The UI is divided into four primary contextual zones, heavily relying on collapsible layers to maximize canvas space.

*   **System Menu (Top Left):** File management, settings, view states.
*   **Tool Menu (Top Right):** Primary drafting/editing instruments (dual-state architecture).
*   **Sidebar Menu (Left Edge):** Procedural brush dynamics, history, numeric inputs.
*   **Bottom Context Menu (Bottom Center):** Dynamic, contextual tool modifiers based on active selection.

**Global View States:**
*   **Hide UI:** Collapses all menus except a return icon (bottom-left).
*   **Dark Mode:** Inverts interface palette.
*   **Cursor Feedback:** Touch Cursor (color indicator), Pen Cursor (M2+ hover tracking for spatial coordinate projection).

---

## 2. File & Data Management (Notes)
*   **Data Structure:** Projects are designated as "Notes".
*   **Home Dashboard:** Grid layout. Filters: Last Modified, Last Created, Name.
*   **Operations:**
    *   `Rename`, `Duplicate` (unlinked clone), `Export` (.feather format), `Delete`.
    *   `Lighten`: Decimates/optimizes procedural curve data to reduce memory footprint.
    *   `Folder System`: Nested project directories via drag-and-drop.
*   **Settings/Caching:**
    *   `Activate rendering when opening notes`: Preserves lighting/shadow computational state across sessions.

---

## 3. Drafting & Modification Tools
Tools utilize a dual-state architecture (tap to toggle secondary function).

*   **Draw / Draw Shape:**
    *   *Draw:* Freeform 3D curves plotted relative to camera FOV/angle or projected on colliders.
    *   *Draw Shape:* Predictive algorithm conforming strokes to straight lines or perfect arcs. Hold-and-drag gesture dynamically adjusts mathematical tension, length, and radius.
*   **Erase / Vacuum:**
    *   *Erase:* Deletes specific vector points (must intersect the mathematical center of the dimensional tube).
    *   *Vacuum:* Binary deletion; intersecting any coordinate purges the entire continuous curve.
*   **Select:** Additive/subtractive selection (Highlighted via emissive green).
*   **Assistive Modes:**
    *   *Mirror:* Red (X), Green (Y), Blue (Z) axes for symmetrical generation.
    *   *Stable Strokes:* Linear slider applying real-time smoothing filter to raw input data.

---

## 4. Procedural Brush Engine
Every stroke is a volumetric 3D entity defined by shape, color, size, and opacity.

*   **Brush Dynamics:**
    *   *Size:* 1mm to 300mm radius.
    *   *Opacity:* 0% to 100% alpha transparency.
    *   *Input Method:* Sliders or expanded Numpad for exact metric precision.
    *   *Pressure Sensitivity:* Apple Pencil gram-force maps to cross-sectional size, opacity, or color blend.
*   **Color & Materials:**
    *   *Micro-gestures:* Hold+drag color icon horizontally (Saturation), vertically (Brightness).
    *   *Materials:* Shadeless, Shaded (ray-traced shadows), Glow (emissive/bloom), Cutout (boolean mask to background).
    *   *Patterns:* Procedurally generated (infinite resolution) Dot, Line, Cross, Terrazzo, Stippled Dot.
*   **Injector Tool:** Extracts comprehensive procedural DNA (brush shape, base color, metric size, opacity) from existing geometry within the Active Group.

---

## 5. Spatial Organization & Environments
*   **Group Tab (Spatial Arrays):**
    *   Functions as discrete 3D spatial arrays (not raster layers).
    *   Operations: `Active Group` targeting, Visibility toggle, `Group Isolation` (mutes all others), `Merge` (destructive mathematical collapse to minimize memory overhead).
*   **Resource Tab (External Assets):**
    *   *Images:* Hard-capped at 2 per Note. Spawns perpendicular to exact viewing angle.
    *   *OBJ Meshes:* Spawns at absolute (0,0,0) center.
    *   *States:* Active (collider/locked), Visible (reference), Hidden (culled from render).
*   **Environment Tab:**
    *   *Overlays:* Global Axis (XYZ), Grid Plane (1 unit = 1000mm).
    *   *Lighting:* Directional trackpad (azimuth/altitude), Ground Shadows, Toon Shading (stepped lighting model).
    *   *Post-Processing:* Fog (depth-buffer gradient), Glow Area bloom, DOF (F-stop slider tethered to Orbit Point), Film Grain/Pixelation.

---

## 6. Geometric Generation & Lofting
*   **3D Guides:** Planar surfaces mathematically suspended in space.
    *   `Bend`: Secondary stroke warps the grid topology.
*   **Primitives:** Cube, Pyramid, Sphere, Tube generated at (0,0,0). `Segment Slider` mathematically degenerates polygon density (e.g., Tube to Hexagonal Cylinder).
*   **Lofting Engine:** Interpolates continuous surface topology between disconnected curves. `Tension Slider` weights interpolation (smooth aerodynamic vs. sharp linear).

---

## 7. Transform & Liquify Physics Engine
*   **Joysticks:**
    *   *2D Joystick:* Screen-space translation (Move, Rotate, Scale). Locked to camera vector.
    *   *3D Joystick:* Global-axis absolute translation (X/Y/Z Move/Rotate, Trackball free rotate).
*   **Liquify Engine:** Simulated fluid dynamics model for non-rigid distortion.
    *   *Parameters:* Size, Range (inner core radius), Strength.
    *   *Profiles:* Push, Pinch, Comb (averages intersecting directional vectors).
    *   *Testing:* `Undo All` and `Compare` (A/B testing before mathematical commit).

---

## 8. Gestural Navigation & Hardware Kinematics
*   **Touch Navigation:**
    *   1-Finger: Turntable rotation.
    *   2-Finger: Pinch (zoom), Swipe (pan).
    *   Double-Tap: 1-finger (nearest ortho), 3-finger (perspective/ortho toggle).
    *   3-Finger Vertical Swipe: FOV distortion (10mm wide-angle to 500mm telephoto).
*   **Orbit Point:** Tap-and-hold to pin rotational pivot and DOF focal plane.
*   **Apple Pencil Pro Integration:**
    *   *Squeeze-drag:* Temporary tool state override.
    *   *Squeeze Menu:* Contextual radial palette spawned at cursor hover.
    *   *Barrel Roll Stamping:* Duplicates selected curves along trajectory; physical barrel rotation mathematically twists the generated array.

---

## 9. Output Pipelines
*   **Cinematography:** Lightweight sequence timeline capturing XYZ, rotation, and FOV keyframes.
*   **AR Viewer:** LiDAR tracking maps 1:1 scale to physical planes. `Automatic Light Color` adjusts digital lighting to match real-world ambient color temperature.
*   **Exports:**
    *   *3D Geometry:* OBJ, GLTF (Culls hidden groups).
    *   *Images:* PNG (transparent background disables post-processing), JPG.
    *   *Video:* MP4, GIF (Sequence, 360 Rotation, Timelapse).

---

## 10. V2.0 Architecture Roadmap (Target: Q1 2026)
*   **Core Engine Overhaul:** Complete migration to Apple's **Metal 4 API** for hardware-accelerated rendering and vastly increased geometric ceilings.
*   **Hardware Constraint:** V2.0 strictly requires **iPadOS 26+**. Legacy devices frozen on V1.3 architecture.
*   **New Computational Features:**
    *   `3D Bucket Fill`: Real-time calculation of continuous 3D volumes based on boundary curves to generate solid procedural geometry/guides.
    *   `Advanced Fluid Dynamics`: Expanded brush engine parameters for natural phenomena simulation.
