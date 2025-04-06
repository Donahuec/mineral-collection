import { defineConfig } from 'sanity';
import { draftReviewPluginV3 } from 'sanity-plugin-draft-review-v3';
import { GroqSnippetPlugin } from 'sanity-plugin-groq-snippet';
import { structureTool } from 'sanity/structure';

import { visionTool } from '@sanity/vision';

import { schemaTypes } from './schemaTypes';
import { structure } from './structure';
import { defaultDocumentNode } from './structure/defaultDocumentNode';

export default defineConfig({
  name: 'default',
  title: 'Mineral Collection',

  projectId: 'rg81x492',
  dataset: 'production',

  plugins: [
    structureTool({ defaultDocumentNode, structure }),
    visionTool(),
    GroqSnippetPlugin(),
    draftReviewPluginV3({}),
  ],

  schema: {
    types: schemaTypes,
  },
});
