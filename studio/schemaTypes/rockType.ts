import { defineField, defineType } from 'sanity';

export const rockType = defineType({
  name: 'rock',
  title: 'Rock',
  type: 'document',
  groups: [
    { name: 'details', title: 'Details' },
    { name: 'properties', title: 'Properties' },
    { name: 'relationships', title: 'Relationships' },
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
      name: 'previewImage',
      type: 'image',
      group: 'details',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'tags',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'details',
    }),
    defineField({
      name: 'parent',
      type: 'reference',
      group: ['details', 'relationships'],
      to: [{ type: 'rock' }],
    }),
    defineField({
      name: 'parentName',
      type: 'string',
      group: ['details', 'relationships'],
    }),
    defineField({
      name: 'classification',
      type: 'string',
      group: 'details',
    }),
    defineField({
      name: 'componentMineralsString',
      type: 'string',
      group: 'details',
    }),
    defineField({
      name: 'componentMinerals',
      type: 'array',
      group: 'details',
      of: [{ type: 'reference', to: [{ type: 'mineral' }] }],
    }),
    defineField({
      name: 'notes',
      type: 'array',
      group: 'details',
      of: [{ type: 'block' }],
    }),
  ],
});
