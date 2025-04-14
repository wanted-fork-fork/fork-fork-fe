import { Meta, StoryObj } from '@storybook/react';
import { ResetPasswordPage } from 'src/pages/auth/reset_password/ResetPasswordPage';

const meta: Meta<typeof ResetPasswordPage> = {
  component: ResetPasswordPage,
};

export default meta;
type Story = StoryObj<typeof ResetPasswordPage>;

export const Default: Story = {
  args: {},
};
