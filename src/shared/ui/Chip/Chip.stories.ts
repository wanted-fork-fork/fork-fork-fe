import { Meta, StoryObj } from '@storybook/react';
import { Chip } from 'src/shared/ui/Chip/Chip';

const meta: Meta<typeof Chip> = {
  component: Chip,
};

export default meta;
type Story = StoryObj<typeof Chip>;

export const Default: Story = {
  args: { children: '태그 칩' },
};

export const SelectedChip: Story = {
  args: { children: '선택된 칩', selected: true },
};
