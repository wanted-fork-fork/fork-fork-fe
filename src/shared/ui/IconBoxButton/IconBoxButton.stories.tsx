import { Meta, StoryObj } from '@storybook/react';
import { IconBoxButton } from './IconBoxButton';
import { Link } from '../icons';

const meta: Meta<typeof IconBoxButton> = {
  component: IconBoxButton,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: <Link />,
    text: '공유하기',
  },
};
