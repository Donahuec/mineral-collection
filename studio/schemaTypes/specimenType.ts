import { defineField, defineType } from 'sanity';

import { DiamondIcon } from '@sanity/icons';

import { specimenSizes } from './constants';

export const specimenType = defineType({
  name: 'specimen',
  title: 'Specimen',
  type: 'document',
  liveEdit: true,
  groups: [
    {name: 'details', title: 'Details', default: true},
    {name: 'properties', title: 'Properties'},
    {name: 'purchase', title: 'Purchase'},
  ],
  orderings: [
    {
      title: 'Name, Asc',
      name: 'nameAsc',
      by: [{field: 'name', direction: 'asc'}],
    },
    {
      title: 'Name, Desc',
      name: 'nameDesc',
      by: [{field: 'name', direction: 'desc'}],
    },
    {
      title: 'numericId, Asc',
      name: 'numericIdAsc',
      by: [{field: 'numericId', direction: 'asc'}],
    },
    {
      title: 'numericId, Desc',
      name: 'numericIdDesc',
      by: [{field: 'numericId', direction: 'desc'}],
    },
  ],
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      group: 'details',
    }),
    defineField({
      name: 'numericId',
      type: 'number',
      group: 'details',
    }),
    defineField({
      name: 'favorite',
      type: 'boolean',
      group: 'details',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: (doc, options) => `${doc.name}-${doc.numericId}`},
      group: 'details',
      validation: (rule) => rule.required().error(`Required to generate a page on the website`),
    }),
    defineField({
      name: 'images',
      type: 'array',
      of: [{type: 'image'}],
      group: 'details',
    }),
    defineField({
      name: 'previewImage',
      type: 'image',
      group: 'details',
    }),
    defineField({
      name: 'minerals',
      type: 'array',
      group: 'details',
      of: [{type: 'reference', to: [{type: 'mineral'}]}],
    }),
    defineField({
      name: 'mineralsText',
      type: 'array',
      group: 'details',
      of: [{type: 'string'}],
      readOnly: true,
      hidden: ({document}) => {
        return (
          !document?.mineralsText ||
          (!!document?.minerals &&
            (document.minerals as any[]).length >= (document.mineralsText as any[]).length)
        )
      },
    }),
    defineField({
      name: 'rocks',
      type: 'array',
      group: 'details',
      of: [{type: 'reference', to: [{type: 'rock'}]}],
    }),
    defineField({
      name: 'rocksText',
      type: 'array',
      group: 'details',
      of: [{type: 'string'}],
      readOnly: true,
      hidden: ({document}) => {
        return (
          !document?.rocksText ||
          (!!document?.rocks &&
            (document.rocks as any[]).length >= (document.rocksText as any[]).length)
        )
      },
    }),
    defineField({
      name: 'hesitantId',
      type: 'boolean',
      group: 'properties',
    }),
    defineField({
      name: 'shape',
      type: 'string',
      group: 'properties',
    }),
    defineField({
      name: 'sizeCategory',
      type: 'string',
      group: 'properties',
      options: {
        list: specimenSizes,
      },
    }),
    defineField({
      name: 'size',
      type: 'number',
      group: 'properties',
      description: 'Measured in cm',
    }),
    defineField({
      name: 'weight',
      type: 'number',
      group: 'properties',
      description: 'Measured in grams',
    }),
    defineField({
      name: 'colors',
      type: 'array',
      group: 'properties',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'origin',
      type: 'string',
      group: 'properties',
    }),
    defineField({
      name: 'artificiallyModified',
      type: 'boolean',
      group: 'properties',
    }),
    defineField({
      name: 'manMade',
      type: 'boolean',
      group: 'properties',
    }),
    defineField({
      name: 'price',
      type: 'number',
      group: 'purchase',
    }),
    defineField({
      name: 'exactPrice',
      type: 'boolean',
      group: 'purchase',
      description: 'Whether the price is exact or an estimate',
    }),
    defineField({
      name: 'purchaseDate',
      type: 'date',
      group: 'purchase',
    }),
    defineField({
      name: 'purchaseSource',
      type: 'string',
      group: 'purchase',
    }),
    defineField({
      name: 'purchaseListing',
      type: 'url',
      group: 'purchase',
    }),
    defineField({
      name: 'notes',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'tags',
      type: 'array',
      group: 'details',
      of: [{type: 'string'}],
    }),
  ],
  preview: {
    select: {
      name: 'name',
      id: 'numericId',
      image: 'previewImage',
    },
    prepare({name, id, image}) {
      const nameFormatted = name || 'Untitled Specimen'
      const idFormatted = id ? `#${id}` : ''
      return {
        title: `${nameFormatted} - ${idFormatted}`,
        media: image || DiamondIcon,
      }
    },
  },
})
