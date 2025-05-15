import type { Meta, StoryObj } from '@storybook/react';
import { JSX, useState } from 'react';

import { expect, userEvent, within } from '@storybook/test';

import NumberFieldWrapper, { NumberFieldWrapperProps } from './numberFieldWrapper';

const meta = {
  title: 'FormComponents/NumberFieldWrapper',
  component: NumberFieldWrapper,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof NumberFieldWrapper>;

export default meta;
type Story = StoryObj<typeof NumberFieldWrapper>;

// label='Page Size'
//       minValue={1}
//       step={1}
//       value={pageSize}
//       onChange={updatePageSize}

interface NumberFieldWithHooksProps extends NumberFieldWrapperProps {
  startValue?: number;
}

function NumberFieldWithHooks({
  startValue = 0,
  ...props
}: NumberFieldWithHooksProps) {
  const [value, setValue] = useState(startValue);
  return (
    <NumberFieldWrapper {...props} value={value} onChange={setValue}>
      Checkbox Label
    </NumberFieldWrapper>
  );
}

export const Default: Story = {
  render: () => <NumberFieldWithHooks />,
};

export const Label: Story = {
  render: () => <NumberFieldWithHooks label='Numbers' />,
};

export const StartValue: Story = {
  render: () => <NumberFieldWithHooks startValue={24} />,
};

export const MinValue: Story = {
  render: () => <NumberFieldWithHooks minValue={0} />,
};

export const Step: Story = {
  render: () => <NumberFieldWithHooks step={5} />,
};

export const Type: Story = {
  render: () => <NumberFieldWithHooks />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const input = canvas.getByTestId('number-input');
    await userEvent.clear(input);
    await userEvent.type(input, '24', {
      delay: 200,
    });
  },
};

export const Increment: Story = {
  render: () => <NumberFieldWithHooks />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const button = canvas.getByTestId('increment-button');
    await userEvent.click(button, {
      delay: 100,
    });
    await userEvent.click(button, {
      delay: 100,
    });
  },
};

export const Decrement: Story = {
  render: () => <NumberFieldWithHooks startValue={10} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const button = canvas.getByTestId('decrement-button');
    await userEvent.click(button, {
      delay: 100,
    });
    await userEvent.click(button, {
      delay: 100,
    });
  },
};
