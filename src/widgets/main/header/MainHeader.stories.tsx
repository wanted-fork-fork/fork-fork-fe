import { Meta, StoryObj } from '@storybook/react';
import { MainHeader } from 'src/widgets/main/header/MainHeader';

const meta: Meta<typeof MainHeader> = {
  component: MainHeader,
};

export default meta;
type Story = StoryObj<typeof MainHeader>;

export const Default: Story = {
  args: {
    selectedTab: 'MY_INFO_LIST',
    userInfo: {
      joinType: 'KAKAO',
      userId: '1',
      name: '김유저',
      profileImage: '',
      receiveEmail: false,
    },
  },
};
