import { Meta, StoryObj } from '@storybook/react';
import { LocationForm } from 'src/entities/candidates/ideal_partner/processes/LocationForm/LocationForm';

const meta: Meta<typeof LocationForm> = {
  component: LocationForm,
};

export default meta;
type Story = StoryObj<typeof LocationForm>;

export const Default: Story = {
  args: {
    locations: [],
  },
};
