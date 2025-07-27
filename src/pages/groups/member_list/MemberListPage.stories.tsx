import { Meta, StoryObj } from '@storybook/react';
import { MemberListPage } from 'src/pages/groups/member_list/MemberListPage';
import { groupInfoMock, groupMemberMock } from 'src/entities/groups/mocks/groupInfoMock';

const meta: Meta<typeof MemberListPage> = {
  component: MemberListPage,
};

export default meta;
type Story = StoryObj<typeof MemberListPage>;

export const Default: Story = {
  args: {
    memberList: Array.from({ length: 5 }).map((_, idx) => ({
      ...groupMemberMock,
      id: idx,
      isAdmin: idx === 0,
    })),
    group: groupInfoMock,
  },
};
