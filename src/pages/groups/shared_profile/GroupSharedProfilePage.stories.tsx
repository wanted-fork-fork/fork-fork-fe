import { Meta, StoryObj } from '@storybook/react';
import { GroupSharedProfilePage } from 'src/pages/groups/shared_profile/GroupSharedProfilePage';

const meta: Meta<typeof GroupSharedProfilePage> = {
  component: GroupSharedProfilePage,
};

export default meta;
type Story = StoryObj<typeof GroupSharedProfilePage>;

export const Default: Story = {
  args: {},
};
