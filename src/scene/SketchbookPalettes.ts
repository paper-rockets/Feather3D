export interface ColorPaletteGroup {
  name: string;
  palettes: Array<{
    name: string;
    colors: string[];
  }>;
}

export const SKETCHBOOK_COLOR_SETS: ColorPaletteGroup[] = [
  {
    name: 'Basic Collection',
    palettes: [
      {
        name: 'Yellows',
        colors: ['#fffdd0', '#fff34a', '#faff0d', '#eeff41', '#f8de7e', '#ffd700', '#ffbf00', '#f4c430', '#c2b280', '#e4d00a']
      },
      {
        name: 'Oranges',
        colors: ['#efb261', '#ffa500', '#ea983e', '#c78023', '#ff8040', '#ff6600', '#e65100', '#dd6b20', '#c05621', '#9c4221']
      },
      {
        name: 'Reds',
        colors: ['#fc8eac', '#fa7b72', '#da3832', '#da345d', '#ff3301', '#e53e3e', '#c53030', '#9b2c2c', '#800020', '#5a0010']
      },
      {
        name: 'Violets',
        colors: ['#dda0dd', '#ba55d3', '#9932cc', '#8a2be2', '#7b1fa2', '#6a1b9a', '#4a148c', '#512da8', '#311b92', '#2e1534']
      },
      {
        name: 'Blues',
        colors: ['#b3e5fc', '#81d4fa', '#4fc3f7', '#29b6f6', '#03a9f4', '#0288d1', '#01579b', '#1e3a8a', '#172554', '#0a192f']
      },
      {
        name: 'Greens',
        colors: ['#c8e6c9', '#a5d6a7', '#81c784', '#66bb6a', '#4caf50', '#388e3c', '#2e7d32', '#1b5e20', '#14532d', '#052e16']
      },
      {
        name: 'Skin Tones',
        colors: ['#ffe0bd', '#ffd1aa', '#ffb07c', '#e0ac69', '#c68642', '#8d5524', '#65371e', '#3c1e0e', '#f5deb3', '#d2b48c']
      }
    ]
  },
  {
    name: 'Greys & Neutrals',
    palettes: [
      {
        name: 'Neutral Greys',
        colors: ['#ffffff', '#dedede', '#d8d8d8', '#d2d2d2', '#cccccc', '#999999', '#666666', '#333333', '#1a1a1a', '#000000']
      },
      {
        name: 'Cool Greys',
        colors: ['#cad1d3', '#c4ccce', '#bdc6c9', '#b7c1c3', '#b1bbbe', '#88989b', '#627376', '#435154', '#283335', '#161d1e']
      },
      {
        name: 'Warm Greys',
        colors: ['#d8dbd7', '#d2d5d1', '#ccd0ca', '#c5cac4', '#bfc4be', '#9aa099', '#757c74', '#535952', '#333932', '#1a1e19']
      },
      {
        name: 'Toner Greys',
        colors: ['#e3dedb', '#ded9d5', '#d8d3cf', '#d2cdc8', '#ccc7c2', '#a39d98', '#7b7570', '#56504b', '#342f2b', '#181512']
      }
    ]
  },
  {
    name: 'Variety & Artists',
    palettes: [
      {
        name: 'Yellow-Orange',
        colors: ['#ffd900', '#ffe800', '#ffff00', '#ffeb80', '#ccb900', '#ff9900', '#ffaa33', '#e68a00', '#cc7a00', '#995c00']
      },
      {
        name: 'Orange-Red',
        colors: ['#ff5900', '#ff8000', '#ffaa00', '#cc6933', '#cc8033', '#ff4433', '#ff5f33', '#ff7033', '#cc1100', '#b23b00']
      },
      {
        name: 'Red-Violet',
        colors: ['#ff0055', '#e6004c', '#cc0044', '#b3003b', '#990033', '#c71585', '#d02090', '#b0177b', '#8b1062', '#660a45']
      },
      {
        name: 'Blue-Violet',
        colors: ['#7b68ee', '#6a5acd', '#483d8b', '#3b2f70', '#2e2456', '#4169e1', '#3352b2', '#263d84', '#192956', '#0d1428']
      },
      {
        name: 'Blue-Green',
        colors: ['#00ffff', '#00e5e5', '#00cccc', '#00b2b2', '#009999', '#20b2aa', '#1a8f88', '#146c67', '#0e4945', '#082624']
      },
      {
        name: 'Earth Tones',
        colors: ['#8b4513', '#a0522d', '#cd853f', '#d2691e', '#b8860b', '#bc8f8f', '#a52a2a', '#704214', '#5c3317', '#3d2314']
      }
    ]
  }
];
