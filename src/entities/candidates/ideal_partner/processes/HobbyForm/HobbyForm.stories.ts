import { Meta, StoryObj } from '@storybook/react';
import { HobbyForm } from 'src/entities/candidates/ideal_partner/processes/HobbyForm/HobbyForm';

const meta: Meta<typeof HobbyForm> = {
  component: HobbyForm,
};

export default meta;
type Story = StoryObj<typeof HobbyForm>;

export const Default: Story = {
  args: {},
};
