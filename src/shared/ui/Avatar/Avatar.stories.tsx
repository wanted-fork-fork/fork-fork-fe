import { Meta, StoryObj } from '@storybook/react';
import { Avatar } from 'src/shared/ui/Avatar/Avatar';
import { Close } from 'src/shared/ui/icons';

const meta: Meta<typeof Avatar> = {
  component: Avatar,
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  args: {
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/20230905_Haerin_%28NewJeans%29.jpg/250px-20230905_Haerin_%28NewJeans%29.jpg',
    size: 72,
    // shape: 'circle',
    onClick: () => alert('hi'),
    actionSlot: <Close onClick={() => alert('close')} />,
  },
};
export const Profile: Story = {
  args: {
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/20230905_Haerin_%28NewJeans%29.jpg/250px-20230905_Haerin_%28NewJeans%29.jpg',
    size: 80,
    shape: 'circle',
  },
};
export const Fallback: Story = {
  args: {
    src: '',
    size: 80,
    shape: 'circle',
    fallback: '강',
  },
};
