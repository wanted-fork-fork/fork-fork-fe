import { Meta, StoryObj } from '@storybook/react';
import { InfoListPage } from 'src/pages/main/info_list/InfoListPage';
import { profileMock } from 'src/entities/candidates/info/mocks/profile.mock';

const meta: Meta<typeof InfoListPage> = {
  component: InfoListPage,
};

export default meta;
type Story = StoryObj<typeof InfoListPage>;

export const Default: Story = {
  args: {
    userInfo: {
      name: '김구구',
      userId: '123',
      email: 'orobos654@gmail.com',
      receiveEmail: false,
    },
    profileList: Array.from({ length: 10 }).map(() => profileMock),
  },
};
