import { Meta, StoryObj } from '@storybook/react';
import { RangeSlider } from 'src/shared/ui/RangeSlider/RangeSlider';

const meta: Meta<typeof RangeSlider> = {
  component: RangeSlider,
};

export default meta;
type Story = StoryObj<typeof RangeSlider>;

export const Default: Story = {
  args: {
    defaultValue: [20, 50],
    minLabel: '최솟값 레이블',
    maxLabel: '최댓값 레이블',
  },
};
