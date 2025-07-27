import { Meta, StoryObj } from '@storybook/react';
import { GroupInfoPage } from 'src/pages/groups/group_info/GroupInfoPage';
import { groupInfoMock } from 'src/entities/groups/mocks/groupInfoMock';

const meta: Meta<typeof GroupInfoPage> = {
  component: GroupInfoPage,
};

export default meta;
type Story = StoryObj<typeof GroupInfoPage>;

export const Default: Story = {
  args: {
    groupInfo: groupInfoMock,
  },
};
