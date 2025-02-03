import { Meta, StoryObj } from '@storybook/react';
import { AccountDeletePage } from 'src/pages/account_delete/AccountDeletePage';

const meta: Meta<typeof AccountDeletePage> = {
  component: AccountDeletePage,
};

export default meta;
type Story = StoryObj<typeof AccountDeletePage>;

export const Default: Story = {
  args: {
    userInfo: {
      userId: '1',
      name: '김유저',
    },
  },
};
