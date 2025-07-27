import { Meta, StoryObj } from '@storybook/react';
import { JoinRequestsPage } from 'src/pages/groups/join_requests/JoinRequestsPage';
import { groupMemberMock } from 'src/entities/groups/mocks/groupInfoMock';

const meta: Meta<typeof JoinRequestsPage> = {
  component: JoinRequestsPage,
};

export default meta;
type Story = StoryObj<typeof JoinRequestsPage>;

export const Default: Story = {
  args: {
    groupId: 1,
    requestList: Array.from({ length: 3 }).map((_, idx) => ({
      ...groupMemberMock,
      id: idx,
    })),
  },
};
