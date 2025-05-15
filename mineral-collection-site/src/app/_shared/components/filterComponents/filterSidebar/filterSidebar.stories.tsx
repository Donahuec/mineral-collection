import type { Meta, StoryObj } from '@storybook/react';

import { userEvent, within } from '@storybook/test';

import FilterSidebar, { FilterDivider, FilterFooter, FilterGroup } from './filterSidebar';

const meta = {
  title: 'FilterComponents/FilterSidebar',
  component: FilterSidebar,
  subcomponents: { FilterGroup, FilterDivider, FilterFooter },
  tags: ['autodocs'],
} satisfies Meta<typeof FilterSidebar>;

export default meta;
type Story = StoryObj<typeof FilterSidebar>;

export const Default: Story = {
  args: {
    children: 'Content',
  },
};

export const Open: Story = {
  args: {
    children: 'Content',
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const button = await canvas.findByTestId('open-filters');
    await step('Open Sidebar', async () => {
      await userEvent.click(button);
    });
  },
};

export const Subcomponents: Story = {
  render: () => (
    <FilterSidebar>
      <FilterGroup>
        <div>Group 1</div>
        <FilterDivider />
        <div>Group 2</div>
      </FilterGroup>
      <FilterFooter>
        <div>Footer</div>
      </FilterFooter>
    </FilterSidebar>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const button = await canvas.findByTestId('open-filters');
    await step('Open Sidebar', async () => {
      await userEvent.click(button);
    });
  },
};
