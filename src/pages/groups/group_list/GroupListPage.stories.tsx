import { Meta, StoryObj } from '@storybook/react';
import { GroupListPage } from 'src/pages/groups/group_list/GroupListPage';
import { groupInfoMock, iconList } from 'src/entities/groups/mocks/groupInfoMock';

const meta: Meta<typeof GroupListPage> = {
  component: GroupListPage,
};

export default meta;
type Story = StoryObj<typeof GroupListPage>;

export const Default: Story = {
  args: {
    userInfo: {
      joinType: 'KAKAO',
      userId: '1',
      name: '김유저',
      profileImage: '',
      receiveEmail: false,
    },
    groupList: Array.from(Array(20).keys()).map((_, index) => ({
      ...groupInfoMock,
      icon: { url: iconList[Math.floor(Math.random() * iconList.length)] },
      id: index,
    })),
  },
};
