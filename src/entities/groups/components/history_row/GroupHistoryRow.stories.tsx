import { Meta, StoryObj } from '@storybook/react';
import { GroupHistoryRow } from 'src/entities/groups/components/history_row/GroupHistoryRow';
import { groupHistoryMock } from 'src/entities/groups/mocks/groupInfoMock';

const meta: Meta<typeof GroupHistoryRow> = {
  component: GroupHistoryRow,
};

export default meta;
type Story = StoryObj<typeof GroupHistoryRow>;

export const Default: Story = {
  args: {
    history: groupHistoryMock,
    groupId: 1,
  },
};
