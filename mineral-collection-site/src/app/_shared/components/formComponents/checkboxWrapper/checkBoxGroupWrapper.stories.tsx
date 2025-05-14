import type { Meta, StoryObj } from '@storybook/react';
import { JSX, useState } from 'react';

import { expect, userEvent, within } from '@storybook/test';

import CheckboxWrapper, { CheckboxGroupWrapper } from './checkboxWrapper';

const meta = {
  title: 'FormComponents/Checkbox/CheckboxGroupWrapper',
  component: CheckboxGroupWrapper,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CheckboxGroupWrapper>;

export default meta;
type Story = StoryObj<typeof CheckboxGroupWrapper>;

function CheckboxWithHooks({
  defaultState = true,
}: {
  defaultState?: boolean;
}) {
  const [checked, setChecked] = useState(defaultState);
  return (
    <CheckboxWrapper isSelected={checked} onChange={setChecked}>
      Checkbox Label
    </CheckboxWrapper>
  );
}

export const Default: Story = {
  render: () => (
    <CheckboxGroupWrapper label='Checkbox Group Label'>
      <CheckboxWithHooks defaultState={false} />
      <CheckboxWithHooks defaultState={false} />
      <CheckboxWithHooks defaultState={false} />
    </CheckboxGroupWrapper>
  ),
};
