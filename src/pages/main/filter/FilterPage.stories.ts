import { Meta, StoryObj } from '@storybook/react';
import { FilterPage } from 'src/pages/main/filter/FilterPage';

const meta: Meta<typeof FilterPage> = {
  component: FilterPage,
};

export default meta;
type Story = StoryObj<typeof FilterPage>;

export const Default: Story = {
  args: {},
};
