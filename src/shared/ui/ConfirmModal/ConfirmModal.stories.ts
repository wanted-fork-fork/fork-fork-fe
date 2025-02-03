import { Meta, StoryObj } from '@storybook/react';
import { ConfirmModal } from 'src/shared/ui/ConfirmModal/ConfirmModal';

const meta: Meta<typeof ConfirmModal> = {
  component: ConfirmModal,
};

export default meta;
type Story = StoryObj<typeof ConfirmModal>;

export const Default: Story = {
  args: {
    show: true,
    title: '변경사항을 저장하지 않고 나가시나요?',
    description: '저장하지 않고 나가면 바뀐 정보가 사라져요.',
    cancelText: '나갈게요',
    confirmText: '저장 후 종료',
    onCancel: console.log,
  },
};
