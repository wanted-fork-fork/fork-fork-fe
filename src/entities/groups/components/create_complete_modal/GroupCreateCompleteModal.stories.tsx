import { Meta, StoryObj } from '@storybook/react';
import { GroupCreateCompleteModal } from 'src/entities/groups/components/create_complete_modal/GroupCreateCompleteModal';

const meta: Meta<typeof GroupCreateCompleteModal> = {
  component: GroupCreateCompleteModal,
};

export default meta;
type Story = StoryObj<typeof GroupCreateCompleteModal>;

export const Default: Story = {
  args: {
    isOpen: true,
  },
};
