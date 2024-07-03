import { Meta, StoryObj } from '@storybook/react';
import { DrinkingForm } from 'src/processes/ideal_partner/DrinkingForm/DrinkingForm';

const meta: Meta<typeof DrinkingForm> = {
  component: DrinkingForm,
};

export default meta;
type Story = StoryObj<typeof DrinkingForm>;

export const Default: Story = {
  args: {},
};
