//Filters
export const DEFAULT_PAGE_SIZE = 24;
export const ASCENDING = 'asc';
export const DESCENDING = 'desc';
export const DEFAULT_SORT_ORDER = ASCENDING;

export const specimenSizes = [
  { title: 'Medium (< 12cm)', value: 'medium' },
  { title: 'Small (< 6cm)', value: 'small' },
  { title: 'Tiny (< 3cm)', value: 'tiny' },
  { title: 'Micro (< 1cm)', value: 'micro' },
  { title: 'Thumbnail (1-3cm)', value: 'thumbnail' },
  { title: 'Small Miniature (3-4.5 cm)', value: 'smallMiniature' },
  { title: 'Miniature (4.5-7 cm)', value: 'miniature' },
  { title: 'Small Cabinet (7-10 cm)', value: 'smallCabinet' },
  { title: 'Cabinet (10-18 cm)', value: 'cabinet' },
  { title: 'Museum (> 18cm)', value: 'museum' },
];

export const specimenShapes = [
  { title: 'Tumbled', value: 'tumbled' },
  { title: 'Polished', value: 'polished' },
  { title: 'Cut', value: 'cut' },
  { title: 'Cabochon', value: 'cabochon' },
  { title: 'Faceted', value: 'faceted' },
  { title: 'Sphere', value: 'sphere' },
  { title: 'Obelisk', value: 'obelisk' },
  { title: 'Carved', value: 'carved' },
  { title: 'Rough', value: 'rough' },
  { title: 'Crystal', value: 'crystal' },
  { title: 'Cluster', value: 'cluster' },
  { title: 'Geode', value: 'geode' },
  { title: 'Natural', value: 'natural' },
  { title: 'Matrix', value: 'matrix' },
  { title: 'Chip', value: 'chip' },
  { title: 'Flake', value: 'flake' },
  { title: 'Group', value: 'group' },
];
