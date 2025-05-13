import type { Meta, StoryObj } from '@storybook/react';
import ResultCard from './resultCard/resultCard';
import ResultGrid from './resultGrid';

const specimens = [
  {
    _id: '1',
    name: 'Specimen 1',
    numericId: 123,
    previewImage: 'https://placehold.co/300x300/png',
    slug: { current: 'specimen-1' },
  },
  {
    _id: '2',
    name: 'Specimen 2',
    numericId: 456,
    previewImage: 'https://placehold.co/300x300/png',
    slug: { current: 'specimen-2' },
  },
  {
    _id: '3',
    name: 'Specimen 3',
    numericId: 789,
    previewImage: 'https://placehold.co/300x300/png',
    slug: { current: 'specimen-3' },
  },
  {
    _id: '4',
    name: 'Specimen 4',
    numericId: 101112,
    previewImage: 'https://placehold.co/300x300/png',
    slug: { current: 'specimen-4' },
  },
  {
    _id: '5',
    name: 'Specimen 5',
    numericId: 131415,
    previewImage: 'https://placehold.co/300x300/png',
    slug: { current: 'specimen-5' },
  },
  {
    _id: '6',
    name: 'Specimen 6',
    numericId: 161718,
    previewImage: 'https://placehold.co/300x300/png',
    slug: { current: 'specimen-6' },
  },
];

const meta = {
  title: 'ResultGrid',
  component: ResultGrid,
  tags: ['autodocs'],
} satisfies Meta<typeof ResultGrid>;

export default meta;
type Story = StoryObj<typeof ResultGrid>;

export const Default: Story = {
  render: (args) => (
    <ResultGrid {...args}>
      {specimens.map((specimen) => (
        <ResultCard
          key={specimen._id}
          title={`${specimen.name} - #${specimen.numericId}`}
          imageUrl={specimen.previewImage}
          link={`/specimens/${specimen?.slug?.current}`}
        />
      ))}
    </ResultGrid>
  ),
};
