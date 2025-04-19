import { Meta, StoryObj } from '@storybook/react';
import { EmailExistErrorPage } from 'src/domains/auth/processes/signup/EmailExistErrorPage/EmailExistErrorPage';

const meta: Meta<typeof EmailExistErrorPage> = {
  component: EmailExistErrorPage,
};

export default meta;
type Story = StoryObj<typeof EmailExistErrorPage>;

export const Default: Story = {
  args: {},
};
