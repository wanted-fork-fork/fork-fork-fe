import { Meta, StoryObj } from '@storybook/react';
import { ProfileCard } from 'src/entities/profile/ui/ProfileCard/ProfileCard';
import { profileMock } from 'src/entities/profile/api/__mock__/profile.mock';

const meta: Meta<typeof ProfileCard> = {
  component: ProfileCard,
};

export default meta;
type Story = StoryObj<typeof ProfileCard>;

export const Default: Story = {
  args: { profile: profileMock },
};
