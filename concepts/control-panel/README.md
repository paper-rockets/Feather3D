# Concept: Floating 3D Navigation and Orientation Control Panel

## Overview

This concept introduces a unified, tablet-optimized floating dark-mode control widget for Feather3D. The panel consolidates spatial navigation, camera projection switching, zoom controls, coordinate system reference, and interactive 3D orientation gizmos into a compact, non-intrusive floating card.

## Design Specification

### Visual Styling
- Surface: Deep slate dark translucent acrylic / glassmorphism (`rgba(35, 36, 42, 0.92)`)
- Border: Subdued semi-transparent outline (`1px solid rgba(255, 255, 255, 0.12)`)
- Typography: Monospace geometric font (`DM Mono`)
- Backdrop: Native backdrop-filter blur for legibility over active 3D canvas strokes
- Layout: 2-column modular split within a draggable container

### Panel Layout and Controls

```
+----------------------------------------------------------------+
| CONTROL                      [ ==== ]             [GRID]   [X] |
+-------------------------------+--------------------------------+
| [JOY]  [ORTHO]  [ - ]  [ + ]  | [ Sc ]  [Front]  [ All ] [Pln] |
+-------------------------------+--------------------------------+
|                               | WLD                            |
|          . - ~ - .            |               +Y (Blue)        |
|      . '     |     ' .        |               / \              |
|    /         |         \      |                |               |
|   |    ----+-(O)-+----  |     |   -X (Red)     o     +Z (Grn)  |
|    \         |         /      |     \                 /        |
|      . '     |     ' .        |                                |
|          ' - ~ - '            |                                |
|                               +--------------------------------+
|                               | RST  (45 deg) FCE VW  LCL WLD  |
+-------------------------------+--------------------------------+
```

### Functional Areas

#### 1. Header Bar
- Title: CONTROL
- Drag Handle: Center rounded pill allowing repositioning across the viewport
- Actions: GRID toggle for 3D ground plane / bounding box, X to minimize or close

#### 2. Left Column: Camera Navigation
- JOY: Activates virtual joystick navigation mode (toggles between 3D orbit and 2D pan)
- ORTHO: Smoothly toggles camera projection between Perspective and Orthographic
- [ - ] / [ + ]: Discrete step zoom out / zoom in
- Virtual Joystick Canvas:
  - Outer boundary ring with maximum radius limit
  - Center draggable thumbstick with elastic return physics
  - Dashed crosshairs for precise cardinal alignment
  - Real-time continuous velocity integration for smooth viewport panning and orbiting

#### 3. Right Column: 3D Orientation Gizmo and Presets
- Preset Views:
  - Sc: Scene / default isometric viewpoint
  - Front: Front orthogonal elevation view
  - All: Frame all strokes and models in view (zoom extents)
  - Pln: Align camera perpendicular to current active drawing plane
- Interactive 3D Orientation Cube / Gizmo:
  - World / Local coordinate indicator (WLD / LCL)
  - Color-coded coordinate axes with diamond endpoints:
    - Red: X Axis
    - Blue: Y Axis (Up)
    - Green: Z Axis (Depth)
    - Gray: Negative opposing axes
  - Interactivity: Clicking any axis diamond animates the viewport camera directly to that coordinate projection
- Bottom Control Strip:
  - RST: Resets viewport camera transformation and zoom to default origin
  - (45 deg): Toggles rotational angle snapping in 45-degree increments
  - FCE: Face normal alignment mode
  - VW: View alignment lock
  - LCL: Local coordinate frame
  - WLD: World coordinate frame

## Live Demo

A standalone interactive demonstration is provided in `index.html`. It can be run locally or served statically.
