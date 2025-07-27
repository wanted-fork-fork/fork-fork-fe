import { Meta, StoryObj } from '@storybook/react';
import { GroupCreateModal } from 'src/entities/groups/components/create_modal/GroupCreateModal';

const meta: Meta<typeof GroupCreateModal> = {
  component: GroupCreateModal,
};

export default meta;
type Story = StoryObj<typeof GroupCreateModal>;

export const Default: Story = {
  args: {
    isOpen: true,
  },
};
