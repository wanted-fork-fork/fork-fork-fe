import { Meta, StoryObj } from '@storybook/react';
import { ProfileAddFloatingButton } from 'src/entities/candidates/_common/components/GenerateFormLink/ProfileAddFloatingButton';

const meta: Meta<typeof ProfileAddFloatingButton> = {
  component: ProfileAddFloatingButton,
};

export default meta;
type Story = StoryObj<typeof ProfileAddFloatingButton>;

export const Default: Story = {
  args: {},
};
