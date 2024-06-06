import { Meta, StoryObj } from '@storybook/react';
import { Input } from 'src/shared/ui/Input/Input';

const meta: Meta<typeof Input> = {
  component: Input,
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: '자신의 키를 입력해주세요',
    suffixSlot: 'cm',
  },
};
