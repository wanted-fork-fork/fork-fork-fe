import { Meta, StoryObj } from '@storybook/react';
import { CheckBox } from 'src/shared/ui/CheckBox/CheckBox';

const meta: Meta<typeof CheckBox> = {
  component: CheckBox,
};

export default meta;
type Story = StoryObj<typeof CheckBox>;

export const Default: Story = {
  args: {
    label: '키 + 선호하는 스타일',
  },
};
