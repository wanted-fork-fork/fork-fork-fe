import { Meta, StoryObj } from '@storybook/react';
import { LocationForm } from 'src/processes/my_profile/LocationForm/LocationForm';
import { locationListMock } from 'src/entities/location/api/__mock__/location.mock';

const meta: Meta<typeof LocationForm> = {
  component: LocationForm,
};

export default meta;
type Story = StoryObj<typeof LocationForm>;

export const Default: Story = {
  args: {
    locations: locationListMock,
  },
  decorators: (fn) => <div style={{ height: '100vh' }}>{fn()}</div>,
};
