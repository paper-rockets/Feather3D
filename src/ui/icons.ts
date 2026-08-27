/**
 * Lightweight inline-SVG icon set matching the official Feather 3D iPad design.
 * All icons are 24x24, stroke = currentColor, inheriting active/hover styles.
 */
const P = (d: string, extra = '') =>
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ${extra}>${d}</svg>`;

const ICONS: Record<string, string> = {
  // Top Dock Tools
  draw: P('<path d="M12 3l8 16H4z"/>'),
  erase: P('<rect x="5" y="6" width="14" height="12" rx="3"/><path d="M5 12h14"/>'),
  select: P('<path d="M6 3l12 12-5.5 1.5-2.5 5.5-4-19z"/>'),
  mirror: P('<path d="M12 3v18"/><path d="M12 7c-4-4-9 0-9 5s5 9 9 5"/><path d="M12 7c4-4 9 0 9 5s-5 9-9 5"/>'),
  guide: P('<rect x="4" y="4" width="16" height="16" rx="3"/><path d="M4 12h16"/><path d="M12 4v16"/>'),
  layers: P('<path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/>'),

  // Brush Rail & Presets
  brush: P('<path d="M4 16 C 8 6, 16 2, 32 4"/>'),
  tube: P('<path d="M4 16 C 8 6, 16 2, 32 4" stroke-width="4"/>'),
  pressure: P('<rect x="7" y="3" width="10" height="18" rx="5"/><line x1="12" y1="7" x2="12" y2="13" stroke-width="3"/>'),
  syringe: P('<path d="M18 2l4 4"/><path d="M14 6l4 4"/><path d="M19 5l-8 8"/><path d="M11 9L6 14l4 4 5-5"/><path d="M6 14l-4 4"/><path d="M2 18h4"/>'),
  dropper: P('<path d="M18 2l4 4"/><path d="M14 6l4 4"/><path d="M19 5l-8 8"/><path d="M11 9L6 14l4 4 5-5"/><path d="M6 14l-4 4"/><path d="M2 18h4"/>'),
  undo: P('<path d="M9 14l-5-5 5-5"/><path d="M4 9h11a5 5 0 0 1 5 5v2"/>'),
  redo: P('<path d="M15 14l5-5-5-5"/><path d="M20 9H9a5 5 0 0 0-5 5v2"/>'),
  plus: P('<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>'),
  chevronLeft: P('<polyline points="15 18 9 12 15 6"/>'),

  // Stage Panel & Navigation
  home: P('<path d="M3 11l9-8 9 8"/><path d="M5 10v10h5v-6h4v6h5V10"/>'),
  menu: P('<path d="M4 7h16"/><path d="M4 12h16"/><path d="M4 17h16"/>'),
  trash: P('<path d="M4 7h16"/><path d="M9 7V4h6v3"/><path d="M6 7l1 13h10l1-13"/>'),
  duplicate: P('<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>'),
  cubeCenter: P('<path d="M12 3l8 4.5v9L12 21l-8-4.5v-9z"/><path d="M12 12v9"/><path d="M4 7.5l8 4.5 8-4.5"/>'),
  tabLayers: P('<path d="M4 7h16"/><path d="M4 12h16"/><path d="M4 18h16"/>'),
  tabResources: P('<path d="M12 3C7 9 5 13 5 16a7 7 0 0 0 14 0c0-3-2-7-7-13z"/>'),
  tabEnv: P('<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>'),
  eye: P('<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>'),
  arrowRight: P('<circle cx="12" cy="12" r="9"/><polyline points="10 8 14 12 10 16"/>'),

  // Context Actions
  duplicatePlus: P('<rect x="7" y="7" width="10" height="10" rx="1.5"/><path d="M4 13H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v1"/><line x1="12" y1="10" x2="12" y2="14"/><line x1="10" y1="12" x2="14" y2="12"/>'),
  mirrorPlus: P('<path d="M12 4v16" stroke-dasharray="2 2"/><path d="M6 8l-3 4 3 4z"/><path d="M18 8l3 4-3 4z"/><line x1="12" y1="9" x2="12" y2="15"/>'),
  flipHourglass: P('<path d="M4 4l16 16H4V4z"/><path d="M20 20L4 4h16v16z"/>'),
  reset: P('<path d="M3 12a9 9 0 1 1 2.6 6.4"/><path d="M3 17V12h5"/>'),
  check: P('<polyline points="20 6 9 17 4 12"/>')
};

export function icon(name: string): string {
  return ICONS[name] || '';
}
