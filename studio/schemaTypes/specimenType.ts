import {DiamondIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const specimenType = defineType({
  name: 'specimen',
  title: 'Specimen',
  type: 'document',
  groups: [
    {name: 'details', title: 'Details'},
    {name: 'properties', title: 'Properties'},
    {name: 'purchase', title: 'Purchase'},
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
      options: {source: 'name'},
      group: 'details',
      validation: (rule) => rule.required().error(`Required to generate a page on the website`),
    }),
    defineField({
      name: 'numericId',
      type: 'number',
      group: 'details',
    }),
    defineField({
      name: 'minerals',
      type: 'array',
      group: 'details',
      of: [{type: 'reference', to: [{type: 'mineral'}]}],
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
