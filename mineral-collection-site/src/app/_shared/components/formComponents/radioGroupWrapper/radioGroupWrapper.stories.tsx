import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import RadioGroupWrapper, { RadioGroupWrapperProps, RadioWrapper } from './radioGroupWrapper';

const meta = {
  title: 'FormComponents/RadioGroupWrapper',
  component: RadioGroupWrapper,
  subcomponents: { RadioWrapper },
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof RadioGroupWrapper>;

export default meta;
type Story = StoryObj<typeof RadioGroupWrapper>;

interface RadioGroupWithHooksProps extends RadioGroupWrapperProps {
  startValue?: string;
}

function RadioGroupWithHooks({ ...props }: RadioGroupWithHooksProps) {
  const [value, setValue] = useState(props.startValue || '');
  return (
    <RadioGroupWrapper {...props} value={value} onChange={setValue}>
      {props.children}
    </RadioGroupWrapper>
  );
}

export const Default: Story = {
  args: {
    label: 'Radio Group',
    name: 'radioGroup',
  },
  render: (args) => (
    <RadioGroupWithHooks label={args.label} name={args.name}>
      <RadioWrapper value='1'>Option 1</RadioWrapper>
      <RadioWrapper value='2'>Option 2</RadioWrapper>
      <RadioWrapper value='3'>Option 3</RadioWrapper>
    </RadioGroupWithHooks>
  ),
};

export const Selected: Story = {
  render: () => (
    <RadioGroupWithHooks label='Radio Group' name='radioGroup' startValue={'1'}>
      <RadioWrapper value='1'>Option 1</RadioWrapper>
      <RadioWrapper value='2'>Option 2</RadioWrapper>
      <RadioWrapper value='3'>Option 3</RadioWrapper>
    </RadioGroupWithHooks>
  ),
};
