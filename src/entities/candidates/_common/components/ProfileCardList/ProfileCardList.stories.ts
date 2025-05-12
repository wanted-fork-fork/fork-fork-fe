import { Meta, StoryObj } from '@storybook/react';
import { ProfileCardList } from 'src/entities/candidates/_common/components/ProfileCardList/ProfileCardList';
import { profileMock } from 'src/entities/candidates/info/mocks/profile.mock';

const meta: Meta<typeof ProfileCardList> = {
  component: ProfileCardList,
};

export default meta;
type Story = StoryObj<typeof ProfileCardList>;

export const Default: Story = {
  args: { profileList: Array.from({ length: 10 }).map(() => profileMock) },
};
