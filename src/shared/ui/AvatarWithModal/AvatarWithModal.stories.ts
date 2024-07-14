import { Meta, StoryObj } from '@storybook/react';
import { AvatarWithModal } from 'src/shared/ui/AvatarWithModal/AvatarWithModal';

const meta: Meta<typeof AvatarWithModal> = {
  component: AvatarWithModal,
};

export default meta;
type Story = StoryObj<typeof AvatarWithModal>;

export const Default: Story = {
  args: {
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/20230905_Haerin_%28NewJeans%29.jpg/250px-20230905_Haerin_%28NewJeans%29.jpg',
    size: 72,
  },
};
