import { defineField, defineType } from 'sanity';

import { luster, mohsScale } from './constants';

export const collectionType = defineType({
  name: 'collection',
  title: 'Collection',
  type: 'document',
  groups: [
    { name: 'details', title: 'Details', default: true },
    { name: 'specimens', title: 'Specimens' },
    { name: 'notes', title: 'Notes' },
    { name: 'images', title: 'Images' },
  ],
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      group: 'details',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      group: 'details',
      options: { source: 'name' },
      validation: (rule) =>
        rule.required().error(`Required to generate a page on the website`),
    }),
    defineField({
      name: 'shortDescription',
      type: 'text',
      group: 'details',
    }),
    defineField({
      name: 'previewImage',
      type: 'image',
      group: ['details', 'images'],
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'specimens',
      type: 'array',
      group: 'specimens',
      of: [{ type: 'reference', to: [{ type: 'specimen' }] }],
    }),
    defineField({
      name: 'notes',
      type: 'array',
      group: 'notes',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'source',
      type: 'string',
      group: 'details',
    }),
    defineField({
      name: 'sourceUrl',
      type: 'url',
      group: 'notes',
    }),
    defineField({
      name: 'images',
      type: 'array',
      group: 'images',
      of: [{ type: 'image' }],
    }),
  ],
});
