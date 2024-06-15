import { Meta, StoryObj } from '@storybook/react';
import { InputTriggerChip } from 'src/shared/ui/Chip/InputTriggerChip/InputTriggerChip';

const meta: Meta<typeof InputTriggerChip> = {
  component: InputTriggerChip,
};

export default meta;
type Story = StoryObj<typeof InputTriggerChip>;

export const Default: Story = {
  args: {},
};
