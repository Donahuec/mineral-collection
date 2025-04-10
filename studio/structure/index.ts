import type { StructureResolver } from 'sanity/structure';
import { DiamondIcon, FolderIcon, StarIcon } from '@sanity/icons';

export const structure: StructureResolver = (S) =>
  S.list()
    .id('root')
    .title('Content')
    .items([
      S.documentTypeListItem('specimen').title('Specimens').icon(DiamondIcon),
      S.documentTypeListItem('mineral').title('Minerals').icon(FolderIcon),
      S.documentTypeListItem('rock').title('Rocks').icon(FolderIcon),
      S.listItem()
        .title('Favorites')
        .icon(StarIcon)
        .child(
          S.documentList()
            .title('Specimens')
            .filter('_type == "specimen" && favorite == true')
            .defaultOrdering([{ field: 'numericId', direction: 'asc' }])
        ),
      S.listItem()
        .title('Entry Specimens')
        .child(
          S.documentList()
            .title('Specimens')
            .filter('_type == "specimen" && !defined(previewImage)')
            .defaultOrdering([{ field: 'numericId', direction: 'asc' }])
        ),
      S.listItem()
        .title('To Edit Specimens')
        .child(
          S.documentList()
            .title('Specimens')
            .filter(
              `_type == "specimen" && 
              (!defined(previewImage
              || !defined(sizeCategory)
              || !defined(shapeCategory)
              || !defined(weight)
              )`
            )
            .defaultOrdering([{ field: 'numericId', direction: 'asc' }])
        ),
    ]);
