import { Meta, StoryObj } from '@storybook/react';
import { MyProfileView } from 'src/domains/candidates/info/components/MyProfile/MyProfile';
import { fullProfileMock } from 'src/domains/candidates/info/entities/mocks/fullProfile.mock';

const meta: Meta<typeof MyProfileView> = {
  component: MyProfileView,
};

export default meta;
type Story = StoryObj<typeof MyProfileView>;

export const Default: Story = {
  args: {
    profile: fullProfileMock,
  },
};
