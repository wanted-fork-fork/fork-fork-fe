import { Meta, StoryObj } from '@storybook/react';
import { MyProfileView } from 'src/entities/profile/ui/MyProfile/MyProfile';
import { fullProfileMock } from 'src/entities/profile/api/__mock__/fullProfile.mock';

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
