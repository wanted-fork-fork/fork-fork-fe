import { Meta, StoryObj } from '@storybook/react';
import { Shortcut } from 'src/processes/shortcut/Shortcut';

const meta: Meta<typeof Shortcut> = {
  component: Shortcut,
};

export default meta;
type Story = StoryObj<typeof Shortcut>;

export const Default: Story = {
  args: {},
};
