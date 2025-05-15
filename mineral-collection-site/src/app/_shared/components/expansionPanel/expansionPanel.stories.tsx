import type { Meta, StoryObj } from '@storybook/react';
import ExpansionPanel from './expansionPanel';

const meta = {
  title: 'ExpansionPanel',
  component: ExpansionPanel,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ExpansionPanel>;

export default meta;
type Story = StoryObj<typeof ExpansionPanel>;

export const Default: Story = {
  args: {
    title: 'Title',
    children: <div>This is some expansion Content</div>,
  },
  render: (args) => (
    <div style={{ width: '300px' }}>
      <ExpansionPanel {...args} />
    </div>
  ),
};
