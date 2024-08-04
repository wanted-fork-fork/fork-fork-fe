import { Meta, StoryObj } from '@storybook/react';
import { MyPage } from 'src/pages/mypage/MyPage';

const meta: Meta<typeof MyPage> = {
  component: MyPage,
};

export default meta;
type Story = StoryObj<typeof MyPage>;

export const Default: Story = {
  args: {},
};
