import type { Meta, StoryObj } from '@storybook/react';
import BackLink from './backLink';

const meta = {
  title: 'BackLink',
  component: BackLink,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof BackLink>;

export default meta;
type Story = StoryObj<typeof BackLink>;

export const Static: Story = {
  args: {
    title: 'test',
    href: '/test',
    useDynamic: false,
    currentSlug: '',
  },
};

export const Dynamic: Story = {
  args: {
    title: 'test',
    href: '/test',
    useDynamic: true,
    currentSlug: 'current',
  },
};
