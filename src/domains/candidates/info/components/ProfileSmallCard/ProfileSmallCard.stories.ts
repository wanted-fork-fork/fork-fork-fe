import { Meta, StoryObj } from '@storybook/react';
import { ProfileSmallCard } from 'src/domains/candidates/info/components/ProfileSmallCard/ProfileSmallCard';
import { profileMock } from 'src/domains/candidates/info/entities/mocks/profile.mock';

const meta: Meta<typeof ProfileSmallCard> = {
  component: ProfileSmallCard,
};

export default meta;
type Story = StoryObj<typeof ProfileSmallCard>;

export const Default: Story = {
  args: { profile: profileMock },
};
