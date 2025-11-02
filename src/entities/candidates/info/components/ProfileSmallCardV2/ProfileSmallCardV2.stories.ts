import { Meta, StoryObj } from '@storybook/react';
import { profileMock } from 'src/entities/candidates/info/mocks/profile.mock';
import { ProfileSmallCardV2 } from './ProfileSmallCardV2';

const meta: Meta<typeof ProfileSmallCardV2> = {
  component: ProfileSmallCardV2,
};

export default meta;
type Story = StoryObj<typeof ProfileSmallCardV2>;

export const Default: Story = {
  args: { profile: profileMock },
};
