import { Meta, StoryObj } from '@storybook/react';
import { GroupHistoryPage } from 'src/pages/groups/history/GroupHistoryPage';
import { groupHistoryMock } from 'src/entities/groups/mocks/groupInfoMock';

const meta: Meta<typeof GroupHistoryPage> = {
  component: GroupHistoryPage,
};

export default meta;
type Story = StoryObj<typeof GroupHistoryPage>;

export const Default: Story = {
  args: {
    historyList: Array.from({ length: 10 }).map((_, idx) => ({
      ...groupHistoryMock,
      id: idx,
    })),
  },
};
