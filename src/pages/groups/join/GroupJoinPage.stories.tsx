import { Meta, StoryObj } from '@storybook/react';
import { GroupJoinPage } from 'src/pages/groups/join/GroupJoinPage';

const meta: Meta<typeof GroupJoinPage> = {
  component: GroupJoinPage,
};

export default meta;
type Story = StoryObj<typeof GroupJoinPage>;

export const Default: Story = {
  args: {},
};
