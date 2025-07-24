import { Meta, StoryObj } from '@storybook/react';
import { profileMock } from 'src/entities/candidates/info/mocks/profile.mock';
import { ProfileCardV2 } from 'src/entities/candidates/info/components/ProfileCardV2/ProfileCardV2';

const meta: Meta<typeof ProfileCardV2> = {
  component: ProfileCardV2,
};

export default meta;
type Story = StoryObj<typeof ProfileCardV2>;

export const Default: Story = {
  args: { profile: profileMock },
};
