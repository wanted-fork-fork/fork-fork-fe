import { Meta, StoryObj } from '@storybook/react';
import { AccountDeletePage } from 'src/pages/auth/account_delete/AccountDeletePage';

const meta: Meta<typeof AccountDeletePage> = {
  component: AccountDeletePage,
};

export default meta;
type Story = StoryObj<typeof AccountDeletePage>;

export const Default: Story = {
  args: {
    userInfo: {
      joinType: 'KAKAO',
      userId: '1',
      name: '김유저',
      profileImage: '',
      receiveEmail: false,
    },
  },
};
