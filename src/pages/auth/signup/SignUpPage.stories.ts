import { Meta, StoryObj } from '@storybook/react';
import { SignUpPage } from 'src/pages/auth/signup/SignUpPage';

const meta: Meta<typeof SignUpPage> = {
  component: SignUpPage,
};

export default meta;
type Story = StoryObj<typeof SignUpPage>;

export const Default: Story = {
  args: {},
};
