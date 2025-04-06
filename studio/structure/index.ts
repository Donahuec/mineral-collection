import type { StructureResolver } from 'sanity/structure';
import { DiamondIcon, FolderIcon } from '@sanity/icons';

export const structure: StructureResolver = (S) =>
  S.list()
    .id('root')
    .title('Content')
    .items([
      S.documentTypeListItem('specimen').title('Specimens').icon(DiamondIcon),
      S.documentTypeListItem('mineral').title('Minerals').icon(FolderIcon),
      S.documentTypeListItem('rock').title('Rocks').icon(FolderIcon),
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
  (!defined(previewImage)
  || sizeCategory == 'tiny'
  || sizeCategory == 'small'
  || sizeCategory == 'medium'
  || !defined(sizeCategory)
  || !defined(shapeCategory)
   )`
            )
            .defaultOrdering([{ field: 'numericId', direction: 'asc' }])
        ),
    ]);
