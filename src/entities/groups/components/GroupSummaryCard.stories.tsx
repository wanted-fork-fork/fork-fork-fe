import { Meta, StoryObj } from '@storybook/react';
import { GroupSummaryCard } from 'src/entities/groups/components/GroupSummaryCard';
import { groupInfoMock } from 'src/entities/groups/mocks/groupInfoMock';

const meta: Meta<typeof GroupSummaryCard> = {
  component: GroupSummaryCard,
};

export default meta;
type Story = StoryObj<typeof GroupSummaryCard>;

export const Default: Story = {
  args: {
    ...groupInfoMock,
  },
};
