import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { expect, userEvent, within } from '@storybook/test';

import CheckboxWrapper, { CheckboxGroupWrapper } from './checkboxWrapper';

const meta = {
  title: 'FormComponents/Checkbox/CheckboxWrapper',
  component: CheckboxWrapper,
  subcomponents: { CheckboxGroupWrapper },
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CheckboxWrapper>;

export default meta;
type Story = StoryObj<typeof CheckboxWrapper>;

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

export const Unselected: Story = {
  render: () => <CheckboxWithHooks defaultState={false} />,
};

export const Selected: Story = {
  render: () => <CheckboxWithHooks defaultState={true} />,
};

export const ClickUnselected: Story = {
  render: () => <CheckboxWithHooks defaultState={false} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByLabelText('Checkbox Label'), {
      delay: 100,
    });

    await expect(
      (canvas.getByLabelText('Checkbox Label') as HTMLInputElement).checked
    ).toBeTruthy();
  },
};

export const ClickSelected: Story = {
  render: () => <CheckboxWithHooks defaultState={true} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByLabelText('Checkbox Label'), {
      delay: 100,
    });

    await expect(
      (canvas.getByLabelText('Checkbox Label') as HTMLInputElement).checked
    ).toBeFalsy();
  },
};

export const Group: Story = {
  render: () => (
    <CheckboxGroupWrapper label='Checkbox Group Label'>
      <CheckboxWithHooks defaultState={false} />
      <CheckboxWithHooks defaultState={false} />
      <CheckboxWithHooks defaultState={false} />
    </CheckboxGroupWrapper>
  ),
};
