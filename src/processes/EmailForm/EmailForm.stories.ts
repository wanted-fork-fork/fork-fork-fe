import { Meta, StoryObj } from '@storybook/react';
import { EmailForm } from 'src/processes/EmailForm/EmailForm';

const meta: Meta<typeof EmailForm> = {
  component: EmailForm,
};

export default meta;
type Story = StoryObj<typeof EmailForm>;

export const Default: Story = {
  args: {},
};
