import { Meta, StoryObj } from '@storybook/react';
import { MemberRow } from 'src/entities/groups/components/member_row/MemberRow';
import { groupMemberMock } from 'src/entities/groups/mocks/groupInfoMock';

const meta: Meta<typeof MemberRow> = {
  component: MemberRow,
};

export default meta;
type Story = StoryObj<typeof MemberRow>;

export const Default: Story = {
  args: { member: groupMemberMock },
};
