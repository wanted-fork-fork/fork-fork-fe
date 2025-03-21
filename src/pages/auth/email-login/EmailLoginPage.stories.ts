import { Meta, StoryObj } from '@storybook/react';
import { EmailLoginPage } from './EmailLoginPage';

const meta: Meta<typeof EmailLoginPage> = {
  component: EmailLoginPage,
};

export default meta;
type Story = StoryObj<typeof EmailLoginPage>;

export const Default: Story = {
  args: {},
};
