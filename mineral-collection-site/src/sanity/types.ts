/**
 * ---------------------------------------------------------------------------------
 * This file has been generated by Sanity TypeGen.
 * Command: `sanity typegen generate`
 *
 * Any modifications made directly to this file will be overwritten the next time
 * the TypeScript definitions are generated. Please make changes to the Sanity
 * schema definitions and/or GROQ queries if you need to update these types.
 *
 * For more information on how to use Sanity TypeGen, visit the official documentation:
 * https://www.sanity.io/docs/sanity-typegen
 * ---------------------------------------------------------------------------------
 */

// Source: schema.json
export type SanityImagePaletteSwatch = {
  _type: "sanity.imagePaletteSwatch";
  background?: string;
  foreground?: string;
  population?: number;
  title?: string;
};

export type SanityImagePalette = {
  _type: "sanity.imagePalette";
  darkMuted?: SanityImagePaletteSwatch;
  lightVibrant?: SanityImagePaletteSwatch;
  darkVibrant?: SanityImagePaletteSwatch;
  vibrant?: SanityImagePaletteSwatch;
  dominant?: SanityImagePaletteSwatch;
  lightMuted?: SanityImagePaletteSwatch;
  muted?: SanityImagePaletteSwatch;
};

export type SanityImageDimensions = {
  _type: "sanity.imageDimensions";
  height?: number;
  width?: number;
  aspectRatio?: number;
};

export type SanityFileAsset = {
  _id: string;
  _type: "sanity.fileAsset";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  originalFilename?: string;
  label?: string;
  title?: string;
  description?: string;
  altText?: string;
  sha1hash?: string;
  extension?: string;
  mimeType?: string;
  size?: number;
  assetId?: string;
  uploadId?: string;
  path?: string;
  url?: string;
  source?: SanityAssetSourceData;
};

export type Geopoint = {
  _type: "geopoint";
  lat?: number;
  lng?: number;
  alt?: number;
};

export type Rock = {
  _id: string;
  _type: "rock";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  name?: string;
  slug?: Slug;
  previewImage?: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    _type: "image";
  };
  tags?: Array<string>;
  parent?: {
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    [internalGroqTypeReferenceTo]?: "rock";
  };
  parentName?: string;
  classification?: string;
  componentMineralsString?: string;
  componentMinerals?: Array<{
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    _key: string;
    [internalGroqTypeReferenceTo]?: "mineral";
  }>;
  notes?: Array<{
    children?: Array<{
      marks?: Array<string>;
      text?: string;
      _type: "span";
      _key: string;
    }>;
    style?: "normal" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "blockquote";
    listItem?: "bullet" | "number";
    markDefs?: Array<{
      href?: string;
      _type: "link";
      _key: string;
    }>;
    level?: number;
    _type: "block";
    _key: string;
  }>;
};

export type Mineral = {
  _id: string;
  _type: "mineral";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  name?: string;
  slug?: Slug;
  previewImage?: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    _type: "image";
  };
  mindatUrl?: string;
  tags?: Array<string>;
  parent?: {
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    [internalGroqTypeReferenceTo]?: "mineral";
  };
  parentName?: string;
  scientificName?: string;
  altNames?: Array<string>;
  toxicity?: string;
  handling?: {
    safe?: boolean;
    notes?: Array<{
      children?: Array<{
        marks?: Array<string>;
        text?: string;
        _type: "span";
        _key: string;
      }>;
      style?: "normal" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "blockquote";
      listItem?: "bullet" | "number";
      markDefs?: Array<{
        href?: string;
        _type: "link";
        _key: string;
      }>;
      level?: number;
      _type: "block";
      _key: string;
    }>;
  };
  care?: string;
  notes?: Array<{
    children?: Array<{
      marks?: Array<string>;
      text?: string;
      _type: "span";
      _key: string;
    }>;
    style?: "normal" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "blockquote";
    listItem?: "bullet" | "number";
    markDefs?: Array<{
      href?: string;
      _type: "link";
      _key: string;
    }>;
    level?: number;
    _type: "block";
    _key: string;
  }>;
  commonAssociations?: Array<{
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    _key: string;
    [internalGroqTypeReferenceTo]?: "mineral";
  }>;
  commonAssociationsString?: string;
  accessoryTo?: string;
  mineralClass?: string;
  mineralGroup?: string;
  mineralSeries?: string;
  endMemberOf?: string;
  manMade?: boolean;
  color?: {
    colors?: Array<string>;
    colorDescription?: string;
  };
  luster?: {
    luster?: Array<"adamantine" | "dull-earthy" | "greasy-oily" | "iridescent" | "metallic" | "pearly" | "resinous" | "silky" | "subadamantine" | "submetallic" | "vitreous" | "waxy">;
    description?: string;
  };
  cleavage?: string;
  fracture?: string;
  tenacity?: string;
  crystalHabit?: string;
  crystalSystem?: string;
  parting?: string;
  hardness?: {
    text?: string;
    min?: 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5 | 5.5 | 6 | 6.5 | 7 | 7.5 | 8 | 8.5 | 9 | 9.5 | 10;
    max?: 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5 | 5.5 | 6 | 6.5 | 7 | 7.5 | 8 | 8.5 | 9 | 9.5 | 10;
  };
  specificGravity?: {
    range?: string;
    min?: number;
    max?: number;
  };
  transparency?: string;
  streak?: string;
  fluorescence?: string;
  effervescence?: string;
  morphology?: string;
};

export type Specimen = {
  _id: string;
  _type: "specimen";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  name?: string;
  numericId?: number;
  favorite?: boolean;
  slug?: Slug;
  shortDescription?: string;
  description?: Array<{
    children?: Array<{
      marks?: Array<string>;
      text?: string;
      _type: "span";
      _key: string;
    }>;
    style?: "normal" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "blockquote";
    listItem?: "bullet" | "number";
    markDefs?: Array<{
      href?: string;
      _type: "link";
      _key: string;
    }>;
    level?: number;
    _type: "block";
    _key: string;
  }>;
  images?: Array<{
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    _type: "image";
    _key: string;
  }>;
  previewImage?: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    _type: "image";
  };
  minerals?: Array<{
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    _key: string;
    [internalGroqTypeReferenceTo]?: "mineral";
  }>;
  rocks?: Array<{
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    _key: string;
    [internalGroqTypeReferenceTo]?: "rock";
  }>;
  hesitantId?: boolean;
  shape?: string;
  shapeCategory?: Array<"tumbled" | "polished" | "cut" | "rough" | "crystal" | "cluster" | "geode" | "natural" | "matrix">;
  sizeCategory?: "large" | "medium" | "small" | "tiny" | "chip" | "tinyChip" | "micro" | "thumbnail" | "smallMiniature" | "miniature" | "smallCabinet" | "cabinet" | "museum";
  size?: number;
  sizeDescription?: Array<string>;
  weight?: number;
  colors?: Array<string>;
  origin?: string;
  artificiallyModified?: boolean;
  manMade?: boolean;
  price?: number;
  exactPrice?: boolean;
  purchaseDate?: string;
  purchaseSource?: string;
  purchaseListing?: string;
  notes?: Array<{
    children?: Array<{
      marks?: Array<string>;
      text?: string;
      _type: "span";
      _key: string;
    }>;
    style?: "normal" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "blockquote";
    listItem?: "bullet" | "number";
    markDefs?: Array<{
      href?: string;
      _type: "link";
      _key: string;
    }>;
    level?: number;
    _type: "block";
    _key: string;
  }>;
  provenance?: Array<{
    children?: Array<{
      marks?: Array<string>;
      text?: string;
      _type: "span";
      _key: string;
    }>;
    style?: "normal" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "blockquote";
    listItem?: "bullet" | "number";
    markDefs?: Array<{
      href?: string;
      _type: "link";
      _key: string;
    }>;
    level?: number;
    _type: "block";
    _key: string;
  }>;
  tags?: Array<string>;
  lowInterest?: boolean;
};

export type SanityImageCrop = {
  _type: "sanity.imageCrop";
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
};

export type SanityImageHotspot = {
  _type: "sanity.imageHotspot";
  x?: number;
  y?: number;
  height?: number;
  width?: number;
};

export type SanityImageAsset = {
  _id: string;
  _type: "sanity.imageAsset";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  originalFilename?: string;
  label?: string;
  title?: string;
  description?: string;
  altText?: string;
  sha1hash?: string;
  extension?: string;
  mimeType?: string;
  size?: number;
  assetId?: string;
  uploadId?: string;
  path?: string;
  url?: string;
  metadata?: SanityImageMetadata;
  source?: SanityAssetSourceData;
};

export type SanityAssetSourceData = {
  _type: "sanity.assetSourceData";
  name?: string;
  id?: string;
  url?: string;
};

export type SanityImageMetadata = {
  _type: "sanity.imageMetadata";
  location?: Geopoint;
  dimensions?: SanityImageDimensions;
  palette?: SanityImagePalette;
  lqip?: string;
  blurHash?: string;
  hasAlpha?: boolean;
  isOpaque?: boolean;
};

export type Slug = {
  _type: "slug";
  current?: string;
  source?: string;
};

export type AllSanitySchemaTypes = SanityImagePaletteSwatch | SanityImagePalette | SanityImageDimensions | SanityFileAsset | Geopoint | Rock | Mineral | Specimen | SanityImageCrop | SanityImageHotspot | SanityImageAsset | SanityAssetSourceData | SanityImageMetadata | Slug;
export declare const internalGroqTypeReferenceTo: unique symbol;
// Source: ../mineral-collection-site/src/app/_shared/services/mineralService.ts
// Variable: MINERALS_QUERY
// Query: *[  _type == "mineral"  && defined(slug.current)   && count(*[_type == "specimen" && references(^._id)]) > 0]{_id, name, slug, previewImage}|order(name asc)
export type MINERALS_QUERYResult = Array<{
  _id: string;
  name: string | null;
  slug: Slug | null;
  previewImage: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    _type: "image";
  } | null;
}>;

// Source: ../mineral-collection-site/src/app/_shared/services/rockService.ts
// Variable: ROCKS_QUERY
// Query: *[  _type == "rock"  && defined(slug.current)   && count(*[_type == "specimen" && references(^._id)]) > 0]{_id, name, slug, previewImage}|order(name asc)
export type ROCKS_QUERYResult = Array<{
  _id: string;
  name: string | null;
  slug: Slug | null;
  previewImage: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    _type: "image";
  } | null;
}>;

// Source: ../mineral-collection-site/src/app/_shared/services/specimenService.ts
// Variable: SPECIMENS_QUERY
// Query: *[  _type == "specimen"  && defined(slug.current) && defined(previewImage)]{_id,  name, numericId, slug, previewImage}|order(numericId asc)[0...3]
export type SPECIMENS_QUERYResult = Array<{
  _id: string;
  name: string | null;
  numericId: number | null;
  slug: Slug | null;
  previewImage: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    _type: "image";
  } | null;
}>;

// Source: ../mineral-collection-site/src/app/minerals/[slug]/page.tsx
// Variable: MINERAL_QUERY
// Query: *[    _type == "mineral" &&    slug.current == $slug  ][0]{  ...,  'specimens': *[_type == "specimen" && references(^._id)]{    _id,    name,    slug,    previewImage}}
export type MINERAL_QUERYResult = {
  _id: string;
  _type: "mineral";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  name?: string;
  slug?: Slug;
  previewImage?: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    _type: "image";
  };
  mindatUrl?: string;
  tags?: Array<string>;
  parent?: {
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    [internalGroqTypeReferenceTo]?: "mineral";
  };
  parentName?: string;
  scientificName?: string;
  altNames?: Array<string>;
  toxicity?: string;
  handling?: {
    safe?: boolean;
    notes?: Array<{
      children?: Array<{
        marks?: Array<string>;
        text?: string;
        _type: "span";
        _key: string;
      }>;
      style?: "blockquote" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "normal";
      listItem?: "bullet" | "number";
      markDefs?: Array<{
        href?: string;
        _type: "link";
        _key: string;
      }>;
      level?: number;
      _type: "block";
      _key: string;
    }>;
  };
  care?: string;
  notes?: Array<{
    children?: Array<{
      marks?: Array<string>;
      text?: string;
      _type: "span";
      _key: string;
    }>;
    style?: "blockquote" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "normal";
    listItem?: "bullet" | "number";
    markDefs?: Array<{
      href?: string;
      _type: "link";
      _key: string;
    }>;
    level?: number;
    _type: "block";
    _key: string;
  }>;
  commonAssociations?: Array<{
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    _key: string;
    [internalGroqTypeReferenceTo]?: "mineral";
  }>;
  commonAssociationsString?: string;
  accessoryTo?: string;
  mineralClass?: string;
  mineralGroup?: string;
  mineralSeries?: string;
  endMemberOf?: string;
  manMade?: boolean;
  color?: {
    colors?: Array<string>;
    colorDescription?: string;
  };
  luster?: {
    luster?: Array<"adamantine" | "dull-earthy" | "greasy-oily" | "iridescent" | "metallic" | "pearly" | "resinous" | "silky" | "subadamantine" | "submetallic" | "vitreous" | "waxy">;
    description?: string;
  };
  cleavage?: string;
  fracture?: string;
  tenacity?: string;
  crystalHabit?: string;
  crystalSystem?: string;
  parting?: string;
  hardness?: {
    text?: string;
    min?: 1.5 | 1 | 10 | 2.5 | 2 | 3.5 | 3 | 4.5 | 4 | 5.5 | 5 | 6.5 | 6 | 7.5 | 7 | 8.5 | 8 | 9.5 | 9;
    max?: 1.5 | 1 | 10 | 2.5 | 2 | 3.5 | 3 | 4.5 | 4 | 5.5 | 5 | 6.5 | 6 | 7.5 | 7 | 8.5 | 8 | 9.5 | 9;
  };
  specificGravity?: {
    range?: string;
    min?: number;
    max?: number;
  };
  transparency?: string;
  streak?: string;
  fluorescence?: string;
  effervescence?: string;
  morphology?: string;
  specimens: Array<{
    _id: string;
    name: string | null;
    slug: Slug | null;
    previewImage: {
      asset?: {
        _ref: string;
        _type: "reference";
        _weak?: boolean;
        [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
      };
      hotspot?: SanityImageHotspot;
      crop?: SanityImageCrop;
      _type: "image";
    } | null;
  }>;
} | null;

// Source: ../mineral-collection-site/src/app/rocks/[slug]/page.tsx
// Variable: ROCK_QUERY
// Query: *[    _type == "rock" &&    slug.current == $slug  ][0]{  ...,  'specimens': *[_type == "specimen" && references(^._id)]{    _id,    name,    slug,    previewImage}}
export type ROCK_QUERYResult = {
  _id: string;
  _type: "rock";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  name?: string;
  slug?: Slug;
  previewImage?: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    _type: "image";
  };
  tags?: Array<string>;
  parent?: {
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    [internalGroqTypeReferenceTo]?: "rock";
  };
  parentName?: string;
  classification?: string;
  componentMineralsString?: string;
  componentMinerals?: Array<{
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    _key: string;
    [internalGroqTypeReferenceTo]?: "mineral";
  }>;
  notes?: Array<{
    children?: Array<{
      marks?: Array<string>;
      text?: string;
      _type: "span";
      _key: string;
    }>;
    style?: "blockquote" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "normal";
    listItem?: "bullet" | "number";
    markDefs?: Array<{
      href?: string;
      _type: "link";
      _key: string;
    }>;
    level?: number;
    _type: "block";
    _key: string;
  }>;
  specimens: Array<{
    _id: string;
    name: string | null;
    slug: Slug | null;
    previewImage: {
      asset?: {
        _ref: string;
        _type: "reference";
        _weak?: boolean;
        [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
      };
      hotspot?: SanityImageHotspot;
      crop?: SanityImageCrop;
      _type: "image";
    } | null;
  }>;
} | null;

// Source: ../mineral-collection-site/src/app/specimens/[slug]/page.tsx
// Variable: SPECIMEN_QUERY
// Query: *[    _type == "specimen" &&    slug.current == $slug  ][0]{  ...,  minerals[]->{name, _id, slug, previewImage},  rocks[]->{name, _id, slug, previewImage}}
export type SPECIMEN_QUERYResult = {
  _id: string;
  _type: "specimen";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  name?: string;
  numericId?: number;
  favorite?: boolean;
  slug?: Slug;
  shortDescription?: string;
  description?: Array<{
    children?: Array<{
      marks?: Array<string>;
      text?: string;
      _type: "span";
      _key: string;
    }>;
    style?: "blockquote" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "normal";
    listItem?: "bullet" | "number";
    markDefs?: Array<{
      href?: string;
      _type: "link";
      _key: string;
    }>;
    level?: number;
    _type: "block";
    _key: string;
  }>;
  images?: Array<{
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    _type: "image";
    _key: string;
  }>;
  previewImage?: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    _type: "image";
  };
  minerals: Array<{
    name: string | null;
    _id: string;
    slug: Slug | null;
    previewImage: {
      asset?: {
        _ref: string;
        _type: "reference";
        _weak?: boolean;
        [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
      };
      hotspot?: SanityImageHotspot;
      crop?: SanityImageCrop;
      _type: "image";
    } | null;
  }> | null;
  rocks: Array<{
    name: string | null;
    _id: string;
    slug: Slug | null;
    previewImage: {
      asset?: {
        _ref: string;
        _type: "reference";
        _weak?: boolean;
        [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
      };
      hotspot?: SanityImageHotspot;
      crop?: SanityImageCrop;
      _type: "image";
    } | null;
  }> | null;
  hesitantId?: boolean;
  shape?: string;
  shapeCategory?: Array<"cluster" | "crystal" | "cut" | "geode" | "matrix" | "natural" | "polished" | "rough" | "tumbled">;
  sizeCategory?: "cabinet" | "chip" | "large" | "medium" | "micro" | "miniature" | "museum" | "small" | "smallCabinet" | "smallMiniature" | "thumbnail" | "tiny" | "tinyChip";
  size?: number;
  sizeDescription?: Array<string>;
  weight?: number;
  colors?: Array<string>;
  origin?: string;
  artificiallyModified?: boolean;
  manMade?: boolean;
  price?: number;
  exactPrice?: boolean;
  purchaseDate?: string;
  purchaseSource?: string;
  purchaseListing?: string;
  notes?: Array<{
    children?: Array<{
      marks?: Array<string>;
      text?: string;
      _type: "span";
      _key: string;
    }>;
    style?: "blockquote" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "normal";
    listItem?: "bullet" | "number";
    markDefs?: Array<{
      href?: string;
      _type: "link";
      _key: string;
    }>;
    level?: number;
    _type: "block";
    _key: string;
  }>;
  provenance?: Array<{
    children?: Array<{
      marks?: Array<string>;
      text?: string;
      _type: "span";
      _key: string;
    }>;
    style?: "blockquote" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "normal";
    listItem?: "bullet" | "number";
    markDefs?: Array<{
      href?: string;
      _type: "link";
      _key: string;
    }>;
    level?: number;
    _type: "block";
    _key: string;
  }>;
  tags?: Array<string>;
  lowInterest?: boolean;
} | null;

// Query TypeMap
import "@sanity/client";
declare module "@sanity/client" {
  interface SanityQueries {
    "*[\n  _type == \"mineral\"\n  && defined(slug.current) \n  && count(*[_type == \"specimen\" && references(^._id)]) > 0\n]{_id, name, slug, previewImage}|order(name asc)": MINERALS_QUERYResult;
    "*[\n  _type == \"rock\"\n  && defined(slug.current) \n  && count(*[_type == \"specimen\" && references(^._id)]) > 0\n]{_id, name, slug, previewImage}|order(name asc)": ROCKS_QUERYResult;
    "*[\n  _type == \"specimen\"\n  && defined(slug.current) && defined(previewImage)\n]{_id,  name, numericId, slug, previewImage}|order(numericId asc)[0...3]": SPECIMENS_QUERYResult;
    "*[\n    _type == \"mineral\" &&\n    slug.current == $slug\n  ][0]{\n  ...,\n  'specimens': *[_type == \"specimen\" && references(^._id)]{\n    _id,\n    name,\n    slug,\n    previewImage\n}\n}": MINERAL_QUERYResult;
    "*[\n    _type == \"rock\" &&\n    slug.current == $slug\n  ][0]{\n  ...,\n  'specimens': *[_type == \"specimen\" && references(^._id)]{\n    _id,\n    name,\n    slug,\n    previewImage\n}\n}": ROCK_QUERYResult;
    "*[\n    _type == \"specimen\" &&\n    slug.current == $slug\n  ][0]{\n  ...,\n  minerals[]->{name, _id, slug, previewImage},\n  rocks[]->{name, _id, slug, previewImage}\n}": SPECIMEN_QUERYResult;
  }
}
