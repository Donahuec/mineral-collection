import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {structure} from './structure'
import {defaultDocumentNode} from './structure/defaultDocumentNode'

export default defineConfig({
  name: 'default',
  title: 'Mineral Collection',

  projectId: 'rg81x492',
  dataset: 'production',

  plugins: [structureTool({defaultDocumentNode, structure}), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
