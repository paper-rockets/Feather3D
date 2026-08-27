# Feather3D → Open-Source Android Edition — Implementation Plan (WebGPU-first)

**Goal:** An open-source, Android-friendly 3D sketching app. Finger input **or** Samsung
Galaxy Tab S6 Lite S‑Pen (Wacom EMR, pressure + button + hover). Full‑featured but simple
enough for a 10‑year‑old. **WebGPU** as the primary renderer. No Apple Pencil, no
proprietary `.feather` format.

---

## 0. Headline decisions (the "best options")

| Question | Decision | Why |
| --- | --- | --- |
| Build from scratch or extend? | **Extend the existing app** | It already type-checks clean, has strokes, 3D guides, loft, liquify, selection, joysticks, materials, exporters, PWA. ~80% of the work is done. Rebuilding throws away months of working geometry code. The renderer swap can happen *behind an abstraction* without rewriting tools. |
| Renderer | **`THREE.WebGPURenderer` (WebGPU) with automatic WebGL2 fallback** | Three r174 already ships it. One API, one scene graph; it uses a WebGPU backend where available and silently falls back to WebGL2 on older Androids. We get WebGPU **and** compatibility from a single code path. |
| Shading | **TSL (Three Shading Language) node materials** | Required by WebGPURenderer. Replaces the current hand-written GLSL + `EffectComposer`. Portable to both backends. |
| Input | **Pointer Events L3 + `getCoalescedEvents()` + `getPredictedEvents()`** | Coalesced events give the full high-frequency sample stream between frames (smooth strokes on 120 Hz+ tablets); predicted events cut perceived latency. Works on Android Chrome / Samsung Internet. Already partly wired. |
| Pressure model | **S‑Pen `e.pressure` when present; velocity→width fallback for finger** | Tab S6 Lite S‑Pen reports 4096 pressure levels via `e.pressure`. A bare finger reports none, so simulate taper from stroke speed. |
| Haptics | **`navigator.vibrate()`** | Android supports it; replaces Apple Pencil haptic motor calls. |
| Radial/context menu | **Long-press (finger) or S‑Pen button → radial menu** | Replaces Apple Pencil "squeeze" menu. |
| AR | **WebXR `immersive-ar` (ARCore) + `<model-viewer>`/Scene Viewer glb fallback** | Native Android AR without USDZ. Replaces Apple Quick Look. |
| File format | **Open `.f3d` = a plain ZIP** (glTF/glb + `strokes.json` + `thumbnail.png` + `manifest.json`) | Fully open, inspectable, round-trips to Blender via glTF. Replaces proprietary `.feather`. |
| Video export | **`WebCodecs` (VideoEncoder) with MediaRecorder fallback** | Real MP4/H.264 on Android instead of only WebM. |
| Simplicity | **Two UI modes: "Simple" (default, kid-friendly) and "Pro"** | Big targets, few tools, presets up front; advanced panels hidden until asked. |
| License + name | **Apache-2.0 or MIT; rename to avoid the "Feather" trademark** | It's a clean-room open build; pick a new name (e.g. *Sketch3D / Doodle3D / Featherlight*). |

> **WebGPU note:** WebGPU shipped in Chrome for Android 121 (2024) and Samsung Internet.
> Targeting it is realistic *today*, but the WebGL2 fallback is non-negotiable for the
> long tail of Android hardware — the `WebGPURenderer` gives us both for free.

---

## Phase 1 — Real WebGPU rendering core (the big lift)

**Outcome:** the app renders through `WebGPURenderer` on WebGPU, falling back to WebGL2,
with no visual regressions.

1. **Renderer abstraction.** Introduce `IRenderBackend` and move `Viewport` off the direct
   `THREE.WebGLRenderer` construction. Instantiate `new THREE.WebGPURenderer({ antialias:true })`
   and `await renderer.init()`. Detect `navigator.gpu`; log which backend actually bound.
   Add `vite-plugin-top-level-await` (top-level `await renderer.init()`).
2. **Port materials to TSL.** Rewrite the five custom shaders
   (`ShadelessShader`, `ShadedToonShader`, `GlowShader`, `CutoutShader`,
   `ProceduralPatternsShader`) as TSL node materials
   (`MeshBasicNodeMaterial` / `MeshToonNodeMaterial` / `MeshStandardNodeMaterial`).
   Procedural patterns (dots/lines/cross/terrazzo/stipple) become `colorNode` math graphs.
3. **Port post-processing.** Replace the `EffectComposer` pipeline in `AirbreathEngine`
   with the node-based `PostProcessing` pipeline: `bloom()`, toon outline (depth+normal),
   DoF, film grain, pixelation as passes/MRT.
4. **Compatibility gate + telemetry.** On unsupported devices, show a one-line "running in
   compatibility mode" toast; keep everything working.

**Risks:** TSL is the largest single migration. Mitigate by porting one material at a time
behind a feature flag and diffing screenshots against the current WebGL build.

---

## Phase 2 — Android input & interaction (de-Apple-ify)

**Outcome:** first-class finger + Tab S6 Lite S‑Pen, no Apple assumptions anywhere.

1. **High-frequency capture.** In `InputManager`, expand each `pointermove` via
   `getCoalescedEvents()` into the raw sample stream; use `getPredictedEvents()` for the
   live stroke tip. Feed into the existing smoothing/resample path.
2. **Palm rejection & mode.** "Draw with pen, navigate with finger" toggle
   (already stubbed as `allowTouchDrawing`); add "Finger draw" mode for stylus-less kids
   where 1-finger draws and 2-finger navigates.
3. **Pressure fallback.** When `pointerType==='touch'` (no pressure), derive width from
   pointer velocity (fast = thin) so finger strokes still taper naturally.
4. **Replace Apple hardware paths:**
   - Squeeze menu → **long-press / S‑Pen-button radial menu** (`SqueezeMenuController` →
     `RadialMenuController`).
   - Barrel-roll stamp rotation → **two-finger twist** while stamping.
   - Haptics via **`navigator.vibrate()`** on erase / snap / sample.
   - Remove hover-only features gracefully (S6 Lite S‑Pen *does* hover — keep hover cursor,
     but never require it).
5. **Gestures audit.** Keep 1-finger orbit, 2-finger pan/zoom, 3-finger undo/redo; verify
   all fire correctly under Chrome/Samsung Internet touch models.

---

## Phase 3 — Open file format & interoperability

**Outcome:** proprietary format gone; open, Blender-friendly round-trip.

1. **Define `.f3d`** as a ZIP (use `fflate`): `manifest.json` (version, units, camera),
   `strokes.json` (points, pressure, brush, material — the lossless source of truth),
   `scene.glb` (baked meshes for interop/preview), `thumbnail.png`.
2. **Rework serializers.** `FeatherProjectSerializer` → `ProjectSerializer` writing/reading
   `.f3d`. Keep GLTF/GLB/OBJ/STL exporters; **drop USDZ**, add **glb-for-Scene-Viewer**.
3. **Blender add-on.** Update `feather_blender_addon.py` to import `.f3d` (read `strokes.json`
   → Bezier curves; or just consume the embedded glb). Ship under the same OSS license.
4. **Autosave** to IndexedDB (existing `ProjectStorage`) every N seconds + on `visibilitychange`
   (Android tab suspension safety).

---

## Phase 4 — "Simple enough for a 10-year-old" UX layer

**Outcome:** a friendly default; power stays one tap away.

1. **Two modes.** `Simple` (default): large icon toolbar — Draw, Erase, Color, Shapes,
   Undo, 3D-spin, Save/Share. `Pro`: current full dock (guides, loft, liquify, joysticks,
   sequence, materials, patterns).
2. **First-run.** 15-second interactive coach: "draw a line → spin with one finger → draw
   again → watch it become 3D." (The 3D-guide concept, taught by doing.)
3. **Presets over parameters.** Brush presets, one-tap aesthetic presets (already exist in
   `AirbreathEngine`: minimalist / cel / low-poly / glow / cinematic), big color swatches
   instead of numeric HSV by default.
4. **Forgiving defaults.** Auto-snap to guide, generous erase radius, always-visible Undo,
   confirm on destructive actions. No modal jargon.
5. **Accessibility & ergonomics.** Min 48dp touch targets, left/right-handed toolbar flip,
   high-contrast + dark mode, no reliance on hover or long text.

---

## Phase 5 — AR, animation & sharing (Android-native)

**Outcome:** the "and more," done the Android way.

1. **WebXR AR.** `immersive-ar` session (ARCore) for placing the sketch in the room; hit-test
   to anchor; fall back to exporting a **glb → Android Scene Viewer** intent when WebXR is absent.
2. **Sequence/animation.** Keep the existing timeline; export via **WebCodecs** to MP4
   (H.264), GIF, and 360° turntable; MediaRecorder/WebM fallback.
3. **Share.** `navigator.share()` (Web Share API) for image/video/`.f3d`; "Publish to gallery"
   optional and out of scope for v1 (needs a backend — keep local-first).

---

## Phase 6 — Packaging, PWA & store presence

**Outcome:** installable, offline, optionally in Play Store.

1. **PWA hardening.** Fix the service worker (`sw.js`) for Vite hashed assets (Workbox),
   proper offline cache, `manifest.json` for Android install & icons (already present).
2. **TWA (optional).** Wrap the PWA as a **Trusted Web Activity** (Bubblewrap) for a Play
   Store listing without rewriting in native.
3. **CI.** GitHub Actions: `tsc` + build + Playwright smoke test (WebGPU flag) + deploy to
   GitHub Pages. (A `.github/` folder already exists — extend it.)
4. **OSS hygiene.** Add `LICENSE`, `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, issue templates,
   and a rename pass to drop the "Feather" trademark.

---

## Suggested sequencing & rough effort

| Phase | Theme | Relative size | Can ship after? |
| --- | --- | --- | --- |
| 1 | WebGPU + TSL core | **L** (largest) | yes — visual parity milestone |
| 2 | Android input | M | yes — "usable on my tablet" milestone |
| 3 | Open `.f3d` format | M | yes |
| 4 | Simple UX mode | M | yes — "my kid can use it" milestone |
| 5 | AR / video / share | M | optional v1.1 |
| 6 | PWA / TWA / CI / OSS | S–M | ongoing |

**Recommended order:** 1 → 2 → 4 → 3 → 5 → 6. (Get WebGPU + Android input + Simple mode
into kids' hands first; format/AR/packaging follow.)

---

## Top risks & how we de-risk

1. **TSL migration scope (Phase 1).** Port one material at a time behind a flag; screenshot-diff
   vs the current WebGL build; keep WebGL2 fallback always green.
2. **WebGPU device coverage.** Never *require* WebGPU — `WebGPURenderer` auto-falls back;
   gate nothing behind it that WebGL2 can't do.
3. **Finger-only usability.** Velocity→width + guide auto-snap must feel good without pressure;
   test with actual finger sessions early (Phase 2).
4. **Trademark / licensing.** Confirm the "Feather" name and any reference-paper assets are
   cleared before public release; rename proactively.

---

## Immediate next steps (Phase 1 kickoff)

1. `npm i @tsl / vite-plugin-top-level-await`; switch `Viewport` to `WebGPURenderer` +
   `await renderer.init()` behind `IRenderBackend`.
2. Port `ShadelessShader` first (simplest) to a TSL `MeshBasicNodeMaterial`; verify a drawn
   stroke renders identically on both backends.
3. Stand up a WebGPU/WebGL screenshot-diff harness so every subsequent port is verified.
