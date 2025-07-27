import { Meta, StoryObj } from '@storybook/react';
import { GroupHistoryRow } from 'src/entities/groups/components/history_row/GroupHistoryRow';
import { groupMemberMock } from 'src/entities/groups/mocks/groupInfoMock';
import { profileMock } from 'src/entities/candidates/info/mocks/profile.mock';

const meta: Meta<typeof GroupHistoryRow> = {
  component: GroupHistoryRow,
};

export default meta;
type Story = StoryObj<typeof GroupHistoryRow>;

export const Default: Story = {
  args: {
    member: groupMemberMock,
    contents: '외부 정보 공유',
    info: profileMock,
    date: new Date(),
  },
};
