# Feather3D — Current State

## Architecture

- **Renderer**: THREE.WebGPURenderer with WebGL2 fallback
- **Materials**: TSL (Three.js Shading Language) node materials — all GLSL replaced
- **Dev server**: Vite on port 3001
- **Debug handle**: `window.__feather` → `{ engine, uiManager, container, diagnostics, ready }`

---

## Brush Library

8 categories, 50+ presets defined in `src/brushes/BrushPresets.ts`:

| Category | Key Brushes |
|---|---|
| Pencils & Pens | HB Sketch, 4B Soft, Technical Pen, Fountain, Ballpoint, Calligraphy, Charcoal, Fine Art Ink |
| Acrylics & Oils | Round Acrylic, Flat Acrylic, Loaded Square, Wet Acrylic, Rake Bristle, Watercolor Wash, Salty Watercolor, Bleeding Watercolor, Synthetic Round, Oil Impasto |
| Markers & Inks | Copic Art Marker, Neon Highlighter, Felt Marker, Fine Liner 0.5mm |
| Hair & Curls | Tight Afro Coils, Loose Wavy Curls, Zig-Zag Crimped, Multi-Strand Rake, Braided Strand |
| FX & Textures | Neon Glow, Glow Wispy, Rainbow Spectrum, Stardust, Cloud Nebula, Bokeh Orbs, Fire Magic, Paint Splatter, Dream Brush, Halftone, Crosshatch, Stipple |
| Nature & Leaves | Maple, Oak, Beech, Fir Needles, Leaf Bunch, Grass & Vines |
| Smudge & Blend | Soft Smear, Fan Smear, Square Smear, Coarse Angular |
| **Animated Water** | Waterfall Stream, Caustic Light, Foam Lattice, Ripple Strand |

### Stroke Profiles

All implemented in `src/geometry/StrokeGeometryBuilder.ts`:
`ribbon` | `tube` | `chisel` | `bristle` | `hair_coil` | `hair_wave` | `hair_zigzag` | `foliage` | `particles`

Foliage scatter type now threads through from materialType: `foliage_fir` preset correctly uses needle geometry.

---

## Material Types

All in `src/shaders/CustomShaderMaterials.ts` as TSL node materials:

**Static**: `shadeless` | `shaded` | `cel_shaded` | `glow` | `cutout` | `pencil` | `marker` | `acrylic` | `watercolor` | `rainbow` | `stardust` | `foliage_leaf` | `foliage_fir` | `halftone` | `hatch` | `crosshatch` | `stipple` | `terrazzo`

**Animated** (TSL, time-driven): `waterfall` | `caustic` | `foam` | `ripple`
- Defined in `src/shaders/tslAnimatedMaterials.ts`
- Accept a TSL vec3 color node (vertex color) — tinted by per-vertex brush color
- All use `timerGlobal()` — no manual uTime update needed

---

## Procedural Sky

**File**: `src/shaders/tslSkyShaders.ts`  
**Bug fixed**: Shader now uses `positionLocal` (not `positionWorld`) — sphere follows camera so local space = directional. Previously rendered transparent.

### Presets
| Preset | Description |
|---|---|
| `day` | Blue Ghibli sky, white clouds |
| `golden_hour` | Warm orange-yellow horizon glow |
| `cherry` | Soft pink/lavender cherry blossom sky |
| `dusk` | Deep blue-purple with magenta horizon |
| `night` | Starfield + Milky Way galaxy band |
| `storm` | Dark overcast with fast heavy cloud coverage |

### Wiring
- `EnvironmentSettings.setSkyPreset(preset, scene)` — creates dome, applies preset
- `EnvironmentSettings.updateSkyTime(delta)` — increments `uTime` each frame
- `EnvironmentSettings.updateSkyPosition(cameraPos)` — dome follows camera
- Both called in `Engine.ts` render loop
- UI: Environment tab → **PROCEDURAL SKY** section

---

## Environment Tab (StagePanelUI)

Sections in order:
1. **Wandrlust Aesthetic Presets** — Minimalist / Cel-Shaded / Low-Poly / Glow Neon / Cinematic DOF
2. **Lighting & Shadows** — Shadows toggle, Sun to Camera, Toon Ink Outlines
3. **Post-Processing FX** — Glow Bloom, Depth of Field, Film Grain, Retro Pixels
4. **3D Guide** — Off / Plane / Sphere / Cube / Cylinder
5. **Grid & Axes** — Grid on/off, Axis RGB on/off
6. **World Background** — Color picker + Sage Green / Lavender / Dark Canvas / Light Grey / Pure White
7. **Background Skybox Image** — File upload + clear
8. **Procedural Sky** — OFF / DAY / GOLDEN HOUR / CHERRY / DUSK / NIGHT / STORM
9. **Living Nature Scene Showcase** — Forest Sanctuary / Simple Water Garden / Sea Cliff Isle / Korean Bakery Cafe

---

## Living Nature Scene Showcase

**File**: `src/scene/NatureSceneBuilder.ts`

Each preset loads a GLB + configures sky + lighting:

| Button | Scene Type | Sky | GLB |
|---|---|---|---|
| Forest Sanctuary | `forest` | `day` | `forest_scene.glb` |
| Simple Water Garden | `temple_garden` | `cherry` | `inubeko_ukiyo_-_kinkakuji_temple.glb` |
| Sea Cliff Isle | `sea_cliff` | `dusk` | `sea_keep_lonely_watcher.glb` |
| Korean Bakery Cafe | `korean_bakery` | `golden_hour` | `korean_bakery.glb` |

All GLBs exist in `public/models/`. Also loads butterfly + bird animated GLBs.
Optional caustic water plane when `includeWater: true`.

---

## Resources Tab

- **Image import** — reference image on 3D plane
- **Video texture (MP4/WebM)** — `ResourceManager.addVideoTexture()` → `THREE.VideoTexture` on plane, with play/pause control
- **GLB import** — auto-compressed via `WebGPUModelCompressor.js` targeting 2MB budget

---

## Tools

| Tool | Key |
|---|---|
| Draw | Triangle icon |
| Erase | Rectangle icon |
| Select (lasso) | Cursor icon |
| Mirror Symmetry | Phi icon |
| Navigate | (finger/pen mode) |
| Loft | (selected curves → surface patch) |
| Liquify | (deform existing strokes) |
| Inject | Eyedropper icon |

Bottom context bar (`ContextMenuUI`) is context-sensitive per tool.

---

## Known Gaps / Limitations

- `foliage_fir` uses correct needle geometry now, but `foliage_maple` / `foliage_beech` / `foliage_oak` all produce the same maple leaf shape (only color differs) — ScatterParticleGeometry only has 2 leaf types
- Animated water brushes (waterfall/caustic/foam/ripple) exist and compile but are new — not battle-tested with full stroke pipeline
- Night sky Milky Way relies on `If()` TSL node — verify renders on first use
- PWA service worker error in console is harmless (broken SW registration, not a render issue)

---

## Files Changed This Session

| File | Change |
|---|---|
| `src/shaders/tslAnimatedMaterials.ts` | NEW — Waterfall, Caustic, Foam, Ripple TSL animated stroke materials |
| `src/shaders/tslSkyShaders.ts` | Fixed `positionWorld` → `positionLocal`; added `golden_hour` + `cherry` presets |
| `src/scene/EnvironmentSettings.ts` | Added `setSkyPreset`, `updateSkyTime`, `updateSkyPosition`, `skyPreset` config |
| `src/shaders/CustomShaderMaterials.ts` | Added `waterfall`, `caustic`, `foam`, `ripple` to `MaterialType` |
| `src/brushes/BrushPresets.ts` | Added `animated` category + 4 animated water brush presets |
| `src/geometry/StrokeGeometryBuilder.ts` | Added `scatterType` param to thread foliage_fir needle geometry through |
| `src/core/Engine.ts` | Added `updateSkyTime` + `updateSkyPosition` calls in render loop; foliage scatterType pass-through |
| `src/ui/StagePanelUI.ts` | Added Procedural Sky buttons (OFF/DAY/GOLDEN HOUR/CHERRY/DUSK/NIGHT/STORM) + event handlers |
| `src/io/WebGPUModelCompressor.js` | NEW — QEM mesh decimation + vertex quantization + texture downscaling |
| `src/io/GLTFImportService.ts` | Auto-compress GLBs to 2MB target on import |
| `src/scene/ResourceManager.ts` | Added `addVideoTexture()` with `THREE.VideoTexture` + play/pause |
