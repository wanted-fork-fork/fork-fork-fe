import { Meta, StoryObj } from '@storybook/react';
import { ProfileCardList } from 'src/domains/candidates/components/ProfileCardList/ProfileCardList';
import { profileMock } from 'src/domains/candidates/info/entities/mocks/profile.mock';

const meta: Meta<typeof ProfileCardList> = {
  component: ProfileCardList,
};

export default meta;
type Story = StoryObj<typeof ProfileCardList>;

export const Default: Story = {
  args: { profileList: Array.from({ length: 10 }).map(() => profileMock) },
};
