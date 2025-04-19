import { Meta, StoryObj } from '@storybook/react';
import { MyImageForm } from 'src/domains/candidates/info/processes/my_profile/MyImageForm/MyImageForm';

const meta: Meta<typeof MyImageForm> = {
  component: MyImageForm,
};

export default meta;
type Story = StoryObj<typeof MyImageForm>;

export const Default: Story = {
  args: {},
  decorators: [(fn) => <div style={{ height: '800px' }}>{fn()}</div>],
};
