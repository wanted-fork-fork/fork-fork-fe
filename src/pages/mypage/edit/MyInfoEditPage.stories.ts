import { Meta, StoryObj } from '@storybook/react';
import { MyInfoEditPage } from 'src/pages/mypage/edit/MyInfoEditPage';

const meta: Meta<typeof MyInfoEditPage> = {
  component: MyInfoEditPage,
};

export default meta;
type Story = StoryObj<typeof MyInfoEditPage>;

export const Default: Story = {
  args: {
    userInfo: {
      name: '김구구',
      userId: '123',
      email: 'orobos654@gmail.com',
      receiveEmail: false,
    },
  },
};
