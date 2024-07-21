import { Meta, StoryObj } from '@storybook/react';
import { HobbyForm } from 'src/processes/my_profile/HobbyForm/HobbyForm';

const meta: Meta<typeof HobbyForm> = {
  component: HobbyForm,
};

export default meta;
type Story = StoryObj<typeof HobbyForm>;

export const Default: Story = {
  args: {},
};
