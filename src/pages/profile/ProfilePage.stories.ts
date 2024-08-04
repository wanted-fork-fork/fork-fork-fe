import { Meta, StoryObj } from '@storybook/react';
import { ProfilePage } from 'src/pages/profile/ProfilePage';

const meta: Meta<typeof ProfilePage> = {
  component: ProfilePage,
};

export default meta;
type Story = StoryObj<typeof ProfilePage>;

export const Default: Story = {
  args: {},
};
