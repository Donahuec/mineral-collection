import {defineField, defineType} from 'sanity'
import {luster, mohsScale} from './constants'

export const mineralType = defineType({
  name: 'mineral',
  title: 'Mineral',
  type: 'document',
  groups: [
    {name: 'details', title: 'Details', default: true},
    {name: 'properties', title: 'Properties'},
    {name: 'relationships', title: 'Relationships'},
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
      options: {source: 'name'},
      validation: (rule) => rule.required().error(`Required to generate a page on the website`),
    }),
    defineField({
      name: 'previewImage',
      type: 'image',
      group: 'details',
    }),
    defineField({
      name: 'mindatUrl',
      type: 'url',
      group: 'details',
    }),
    defineField({
      name: 'tags',
      type: 'array',
      of: [{type: 'string'}],
      group: 'details',
    }),
    defineField({
      name: 'parent',
      type: 'reference',
      group: ['details', 'relationships'],
      to: [{type: 'mineral'}],
    }),
    defineField({
      name: 'parentName',
      type: 'string',
      group: ['details', 'relationships'],
    }),
    defineField({
      name: 'scientificName',
      type: 'string',
      group: 'details',
    }),
    defineField({
      name: 'altNames',
      type: 'array',
      group: 'details',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'toxicity',
      type: 'string',
      group: ['details', 'properties'],
    }),
    defineField({
      name: 'handling',
      type: 'object',
      group: 'details',
      fields: [
        defineField({
          name: 'safe',
          type: 'boolean',
        }),
        defineField({
          name: 'notes',
          type: 'array',
          of: [{type: 'block'}],
        }),
      ],
    }),
    defineField({
      name: 'care',
      type: 'string',
      group: 'details',
    }),
    defineField({
      name: 'notes',
      type: 'array',
      group: 'details',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'commonAssociations',
      type: 'array',
      group: 'relationships',
      of: [{type: 'reference', to: [{type: 'mineral'}]}],
    }),
    defineField({
      name: 'commonAssociationsString',
      type: 'string',
      group: 'relationships',
    }),
    defineField({
      name: 'accessoryTo',
      type: 'string',
      group: 'relationships',
    }),
    defineField({
      name: 'mineralClass',
      type: 'string',
      group: 'relationships',
    }),
    defineField({
      name: 'mineralGroup',
      type: 'string',
      group: 'relationships',
    }),
    defineField({
      name: 'mineralSeries',
      type: 'string',
      group: 'relationships',
    }),
    defineField({
      name: 'endMemberOf',
      type: 'string',
      group: 'relationships',
    }),
    defineField({
      name: 'manMade',
      type: 'boolean',
      group: 'properties',
    }),
    defineField({
      name: 'color',
      type: 'object',
      group: 'properties',
      fields: [
        defineField({
          name: 'colors',
          type: 'array',
          of: [{type: 'string'}],
        }),
        defineField({
          name: 'colorDescription',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'luster',
      type: 'object',
      group: 'properties',
      fields: [
        defineField({
          name: 'luster',
          type: 'array',
          of: [{type: 'string', options: {list: luster}}],
        }),
        defineField({
          name: 'description',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'cleavage',
      type: 'string',
      group: 'properties',
    }),
    defineField({
      name: 'fracture',
      type: 'string',
      group: 'properties',
    }),
    defineField({
      name: 'tenacity',
      type: 'string',
      group: 'properties',
    }),
    defineField({
      name: 'crystalHabit',
      type: 'string',
      group: 'properties',
    }),
    defineField({
      name: 'crystalSystem',
      type: 'string',
      group: 'properties',
    }),
    defineField({
      name: 'parting',
      type: 'string',
      group: 'properties',
    }),
    defineField({
      name: 'hardness',
      type: 'object',
      group: 'properties',
      fields: [
        defineField({
          name: 'text',
          type: 'string',
        }),
        defineField({
          name: 'min',
          type: 'number',
          options: {list: mohsScale},
        }),
        defineField({
          name: 'max',
          type: 'number',
          options: {list: mohsScale},
        }),
      ],
    }),
    defineField({
      name: 'specificGravity',
      type: 'object',
      group: 'properties',
      fields: [
        defineField({
          name: 'range',
          type: 'string',
        }),
        defineField({
          name: 'min',
          type: 'number',
        }),
        defineField({
          name: 'max',
          type: 'number',
        }),
      ],
    }),
    defineField({
      name: 'transparency',
      type: 'string',
      group: 'properties',
    }),
    defineField({
      name: 'streak',
      type: 'string',
      group: 'properties',
    }),
    defineField({
      name: 'fluorescence',
      type: 'string',
      group: 'properties',
    }),
    defineField({
      name: 'effervescence',
      type: 'string',
      group: 'properties',
    }),
    defineField({
      name: 'morphology',
      type: 'string',
      group: 'properties',
    }),
  ],
})
