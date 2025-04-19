import { Meta, StoryObj } from '@storybook/react';
import { ProfileCardGrid } from 'src/domains/candidates/components/ProfileCardGrid/ProfileCardGrid';
import { profileMock } from 'src/domains/candidates/info/entities/mocks/profile.mock';

const meta: Meta<typeof ProfileCardGrid> = {
  component: ProfileCardGrid,
};

export default meta;
type Story = StoryObj<typeof ProfileCardGrid>;

export const Default: Story = {
  args: { profileList: Array.from({ length: 10 }).map(() => profileMock) },
};
