import { Meta, StoryObj } from '@storybook/react';
import { ProfileSmallCard } from 'src/entities/candidates/info/components/ProfileSmallCard/ProfileSmallCard';
import { profileMock } from 'src/entities/candidates/info/mocks/profile.mock';

const meta: Meta<typeof ProfileSmallCard> = {
  component: ProfileSmallCard,
};

export default meta;
type Story = StoryObj<typeof ProfileSmallCard>;

export const Default: Story = {
  args: { profile: profileMock },
};
