import { Meta, StoryObj } from '@storybook/react';
import { ProfileCardGrid } from 'src/entities/candidates/_common/components/ProfileCardGrid/ProfileCardGrid';
import { profileMock } from 'src/entities/candidates/info/mocks/profile.mock';

const meta: Meta<typeof ProfileCardGrid> = {
  component: ProfileCardGrid,
};

export default meta;
type Story = StoryObj<typeof ProfileCardGrid>;

export const Default: Story = {
  args: { profileList: Array.from({ length: 10 }).map(() => profileMock) },
};
