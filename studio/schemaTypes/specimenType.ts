import { defineField, defineType } from 'sanity';

import { DiamondIcon } from '@sanity/icons';

import { specimenShapes, specimenSizes } from './constants';

export const specimenType = defineType({
  name: 'specimen',
  title: 'Specimen',
  type: 'document',
  groups: [
    { name: 'details', title: 'Details', default: true },
    { name: 'size', title: 'Size/Shape' },
    { name: 'properties', title: 'Properties' },
    { name: 'purchase', title: 'Purchase' },
  ],
  orderings: [
    {
      title: 'Name, Asc',
      name: 'nameAsc',
      by: [{ field: 'name', direction: 'asc' }],
    },
    {
      title: 'Name, Desc',
      name: 'nameDesc',
      by: [{ field: 'name', direction: 'desc' }],
    },
    {
      title: 'numericId, Asc',
      name: 'numericIdAsc',
      by: [{ field: 'numericId', direction: 'asc' }],
    },
    {
      title: 'numericId, Desc',
      name: 'numericIdDesc',
      by: [{ field: 'numericId', direction: 'desc' }],
    },
    {
      title: 'Weight, Asc',
      name: 'weightAsc',
      by: [{ field: 'weight', direction: 'asc' }],
    },
    {
      title: 'Weight, Desc',
      name: 'weightDesc',
      by: [{ field: 'weight', direction: 'desc' }],
    },
    {
      title: 'Size, Asc',
      name: 'sizeAsc',
      by: [{ field: 'size', direction: 'asc' }],
    },
    {
      title: 'Size, Desc',
      name: 'sizeDesc',
      by: [{ field: 'size', direction: 'desc' }],
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
      options: { source: (doc, options) => `${doc.name}-${doc.numericId}` },
      group: 'details',
      validation: (rule) => rule.required().error(`Required to generate a page on the website`),
    }),
    defineField({
      name: 'shortDescription',
      type: 'text',
      group: 'details',
    }),
    defineField({
      name: 'description',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'images',
      type: 'array',
      of: [{ type: 'image' }],
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
      of: [{ type: 'reference', to: [{ type: 'mineral' }] }],
    }),
    defineField({
      name: 'rocks',
      type: 'array',
      group: 'details',
      of: [{ type: 'reference', to: [{ type: 'rock' }] }],
    }),
    defineField({
      name: 'hesitantId',
      type: 'boolean',
      group: 'properties',
    }),
    defineField({
      name: 'shape',
      type: 'string',
      group: ['properties', 'size'],
    }),
    defineField({
      name: 'shapeCategory',
      type: 'array',
      group: ['properties', 'size'],
      of: [
        {
          type: 'string',
          options: {
            list: specimenShapes,
          },
        },
      ],
    }),
    defineField({
      name: 'sizeCategory',
      type: 'string',
      group: ['properties', 'size'],
      options: {
        list: specimenSizes,
      },
    }),
    defineField({
      name: 'size',
      type: 'number',
      group: ['properties', 'size'],
      description: 'Measured in cm, along the longest axis',
    }),
    defineField({
      name: 'sizeDescription',
      type: 'array',
      group: ['properties', 'size'],
      of: [{ type: 'string' }],
      description: 'Measured in cm, along notable axes',
    }),
    defineField({
      name: 'weight',
      type: 'number',
      group: ['properties', 'size'],
      description: 'Measured in grams',
    }),
    defineField({
      name: 'colors',
      type: 'array',
      group: 'properties',
      of: [{ type: 'string' }],
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
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'provenance',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'tags',
      type: 'array',
      group: 'details',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'lowInterest',
      type: 'boolean',
      group: ['details', 'size'],
    }),
  ],
  preview: {
    select: {
      name: 'name',
      id: 'numericId',
      image: 'previewImage',
      shapeCategory: 'shapeCategory',
      sizeCategory: 'sizeCategory',
      weight: 'weight',
    },
    prepare({ name, id, image, shapeCategory, sizeCategory, weight }) {
      const nameFormatted = name || 'Untitled Specimen';
      const idFormatted = id ? `#${id}` : '';
      return {
        title: `${nameFormatted} - ${idFormatted}`,
        subtitle: `${weight ? `${weight} g` : 'NA'} - ${sizeCategory || 'NA'} - ${shapeCategory ? shapeCategory.join(', ') : 'NA'}`,
        media: image || DiamondIcon,
      };
    },
  },
});
