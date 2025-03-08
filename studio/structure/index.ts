import type {StructureResolver} from 'sanity/structure'
import {DiamondIcon, FolderIcon} from '@sanity/icons'

export const structure: StructureResolver = (S) =>
  S.list()
    .id('root')
    .title('Content')
    .items([
      S.documentTypeListItem('specimen').title('Specimens').icon(DiamondIcon),
      S.documentTypeListItem('mineral').title('Minerals').icon(FolderIcon),
      S.documentTypeListItem('rock').title('Rocks').icon(FolderIcon),
    ])
