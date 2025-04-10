import { defineField, defineType } from 'sanity';

import { createClient } from '@sanity/client';
import { DiamondIcon } from '@sanity/icons';

import { crystalForms, specimenShapes, specimenSizes } from './constants';

const client = createClient({
  projectId: 'rg81x492',
  dataset: 'production',
  apiVersion: '2025-03-11',
  useCdn: false,
});

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
      initialValue: async () => {
        const response = await client.fetch(
          '*[_type == "specimen"]{numericId}|order(numericId desc)[0]'
        );
        const lastId = response.numericId || 0;
        const newId = lastId + 1;
        return newId;
      },
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
      name: 'size',
      type: 'number',
      group: ['properties', 'size'],
      description: 'Measured in cm, along the longest axis',
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
      name: 'form',
      type: 'array',
      of: [
        {
          type: 'string',
          options: {
            list: crystalForms,
          },
        },
      ],
      group: ['properties', 'size'],
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
      options: {
        layout: 'tags',
      },
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
      sizeCategory: 'sizeCategory',
      weight: 'weight',
      favorite: 'favorite',
      lowInterest: 'lowInterest',
    },
    prepare({ name, id, image, sizeCategory, weight, favorite, lowInterest }) {
      const nameFormatted = name || 'Untitled Specimen';
      const idFormatted = id ? `${id}` : '';
      const ratingFormatted = `${favorite ? '★ ' : ''}${lowInterest ? '▼ ' : ''}`;
      const weightFormatted = weight ? `${weight} g` : 'NA';
      const sizeFormatted = sizeCategory
        ? specimenSizes.find((size) => size.value === sizeCategory)?.title
        : 'NA';
      return {
        title: `${idFormatted} - ${nameFormatted}`,
        subtitle: `${ratingFormatted}${sizeFormatted} - ${weightFormatted}`,
        media: image || DiamondIcon,
      };
    },
  },
});
