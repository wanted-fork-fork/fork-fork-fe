import { Meta, StoryObj } from '@storybook/react';
import { GuestPage } from 'src/pages/main/guest/GuestPage';

const meta: Meta<typeof GuestPage> = {
  component: GuestPage,
};

export default meta;
type Story = StoryObj<typeof GuestPage>;

export const Default: Story = {
  args: {},
};
