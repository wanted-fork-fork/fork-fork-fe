import { Meta, StoryObj } from '@storybook/react';
import { LocationForm } from 'src/entities/candidates/info/processes/my_profile/LocationForm/LocationForm';

const meta: Meta<typeof LocationForm> = {
  component: LocationForm,
};

export default meta;
type Story = StoryObj<typeof LocationForm>;

export const Default: Story = {
  args: {
    locations: [],
  },
  decorators: (fn) => <div style={{ height: '100vh' }}>{fn()}</div>,
};
