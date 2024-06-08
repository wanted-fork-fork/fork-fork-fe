import { Meta, StoryObj } from '@storybook/react';
import { SmokeAlcoholForm } from 'src/processes/my_profile/SmokeAlcoholForm/SmokeAlcoholForm';

const meta: Meta<typeof SmokeAlcoholForm> = {
  component: SmokeAlcoholForm,
};

export default meta;
type Story = StoryObj<typeof SmokeAlcoholForm>;

export const Default: Story = {
  args: {},
};
