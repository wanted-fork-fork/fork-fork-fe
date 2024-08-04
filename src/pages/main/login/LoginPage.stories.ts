import { Meta, StoryObj } from '@storybook/react';
import { LoginPage } from 'src/pages/main/login/LoginPage';

const meta: Meta<typeof LoginPage> = {
  component: LoginPage,
};

export default meta;
type Story = StoryObj<typeof LoginPage>;

export const Default: Story = {
  args: {},
};
