import { Meta, StoryObj } from '@storybook/react';
import { MyProfilePage } from 'src/pages/my_profile/MyProfilePage';

const meta: Meta<typeof MyProfilePage> = {
  component: MyProfilePage,
};

export default meta;
type Story = StoryObj<typeof MyProfilePage>;

export const Default: Story = {
  args: {},
  decorators: [(fn) => <div style={{ height: 'calc(100vh - 32px)' }}>{fn()}</div>],
};
