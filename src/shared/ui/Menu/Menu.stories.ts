import { Meta, StoryObj } from '@storybook/react';
import { Menu } from 'src/shared/ui/Menu/Menu';

const meta: Meta<typeof Menu> = {
  component: Menu,
};

export default meta;
type Story = StoryObj<typeof Menu>;

export const Default: Story = {
  args: {
    name: '오래된 등록 순',
  },
};
