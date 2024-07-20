import { Meta, StoryObj } from '@storybook/react';
import { InputBottomSheet } from 'src/shared/ui/InputBottomSheet/InputBottomSheet';

const meta: Meta<typeof InputBottomSheet> = {
  component: InputBottomSheet,
};

export default meta;
type Story = StoryObj<typeof InputBottomSheet>;

export const Default: Story = {
  args: {
    title: '추가하실 취미를 입력해주세요.',
    placeholder: '반려동물 입력',
    submitText: '추가',
    open: true,
    onSubmit: (value) => alert(value),
    onClose: console.log,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile2',
    },
  },
};
