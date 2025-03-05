import type {DefaultDocumentNodeResolver} from 'sanity/structure'
import DocumentsPane from 'sanity-plugin-documents-pane'

export const defaultDocumentNode: DefaultDocumentNodeResolver = (S, {schemaType}) => {
  switch (schemaType) {
    case `mineral`:
      return S.document().views([
        S.view.form(),
        S.view
          .component(DocumentsPane)
          .options({
            query: `*[_type == "specimen" && references($id)]`,
            params: {id: `_id`},
            options: {perspective: 'previewDrafts'},
          })
          .title('Specimens'),
        S.view
          .component(DocumentsPane)
          .options({
            query: `*[_type=='mineral' && parent._ref == $id]`,
            params: {id: `_id`},
            options: {perspective: 'previewDrafts'},
          })
          .title('Children'),
        S.view
          .component(DocumentsPane)
          .options({
            query: `*[_type == "mineral" && references($id)]`,
            params: {id: `_id`},
            options: {perspective: 'previewDrafts'},
          })
          .title('Related Minerals'),
      ])
    default:
      return S.document().views([S.view.form()])
  }
}
