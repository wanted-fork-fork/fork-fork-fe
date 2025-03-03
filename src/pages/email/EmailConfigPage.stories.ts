import { Meta, StoryObj } from '@storybook/react';
import { EmailConfigPage } from 'src/pages/email/EmailConfigPage';

const meta: Meta<typeof EmailConfigPage> = {
  component: EmailConfigPage,
};

export default meta;
type Story = StoryObj<typeof EmailConfigPage>;

export const Default: Story = {
  args: {},
};
