import type { Meta, StoryObj } from '@storybook/react';
import ResultCard from './resultCard';

const meta = {
  title: 'ResultGrid/ResultCard',
  component: ResultCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ResultCard>;

export default meta;
type Story = StoryObj<typeof ResultCard>;

export const FirstStory: Story = {
  args: {
    title: 'First Story',
    imageUrl: 'https://placehold.co/300x300/png',
    link: '#',
  },
};
