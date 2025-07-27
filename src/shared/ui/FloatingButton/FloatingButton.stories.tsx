import { Meta, StoryObj } from '@storybook/react';
import { FloatingButton } from 'src/shared/ui/FloatingButton/FloatingButton';

const meta: Meta<typeof FloatingButton> = {
  component: FloatingButton,
};

export default meta;
type Story = StoryObj<typeof FloatingButton>;

export const Default: Story = {
  args: {},
};
