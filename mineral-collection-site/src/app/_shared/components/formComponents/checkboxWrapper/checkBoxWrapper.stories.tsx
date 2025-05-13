import type { Meta, StoryObj } from '@storybook/react';
import CheckboxWrapper from './checkboxWrapper';

const meta = {
  title: 'FormComponents/CheckboxWrapper',
  component: CheckboxWrapper,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CheckboxWrapper>;

export default meta;
type Story = StoryObj<typeof CheckboxWrapper>;

export const Unselected: Story = {
  args: {
    children: 'Checkbox label',
    isSelected: false,
    isIndeterminate: false,
  },
};

export const Selected: Story = {
  args: {
    children: 'Checkbox label',
    isSelected: true,
    isIndeterminate: false,
  },
};
