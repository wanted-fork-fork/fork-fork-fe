import { Meta, StoryObj } from '@storybook/react';
import { LocationForm } from 'src/processes/my_profile/LocationForm/LocationForm';

const meta: Meta<typeof LocationForm> = {
  component: LocationForm,
};

export default meta;
type Story = StoryObj<typeof LocationForm>;

const MockSeoulData = {
  name: '서울',
  subLocations: [
    { name: '강남구' },
    { name: '서초구' },
    { name: '송파구' },
    { name: '강남구' },
    { name: '강남구' },
    { name: '강남구' },
    { name: '강남구' },
    { name: '강남구' },
    { name: '강남구' },
  ],
};
const MockLocationData = Array.from({ length: 10 }).map(() => Object.assign({}, MockSeoulData));

export const Default: Story = {
  args: {
    locations: MockLocationData,
  },
};
