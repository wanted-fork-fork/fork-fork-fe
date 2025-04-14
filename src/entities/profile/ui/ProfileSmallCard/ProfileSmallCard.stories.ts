import { Meta, StoryObj } from '@storybook/react';
import { ProfileSmallCard } from 'src/entities/profile/ui/ProfileSmallCard/ProfileSmallCard';
import { profileMock } from 'src/entities/profile/api/__mock__/profile.mock';

const meta: Meta<typeof ProfileSmallCard> = {
  component: ProfileSmallCard,
};

export default meta;
type Story = StoryObj<typeof ProfileSmallCard>;

export const Default: Story = {
  args: { profile: profileMock },
};
