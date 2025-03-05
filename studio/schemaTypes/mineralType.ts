import {defineField, defineType} from 'sanity'

export const mineralType = defineType({
  name: 'mineral',
  title: 'Mineral',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'name'},
      validation: (rule) => rule.required().error(`Required to generate a page on the website`),
    }),
    defineField({
      name: 'parent',
      type: 'reference',
      to: [{type: 'mineral'}],
    }),
    defineField({
      name: 'scientificName',
      type: 'string',
    }),
    defineField({
      name: 'altNames',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'manMade',
      type: 'boolean',
    }),
    defineField({
      name: 'colors',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'colorDescription',
      type: 'string',
    }),
    defineField({
      name: 'commonAssociations',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'mineral'}]}],
    }),
    defineField({
      name: 'notes',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'previewImage',
      type: 'image',
    }),
  ],
})
