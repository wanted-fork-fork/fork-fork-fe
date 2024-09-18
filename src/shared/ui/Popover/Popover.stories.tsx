import { Meta, StoryObj } from '@storybook/react';
import { Popover } from './Popover';
import { Button } from 'src/shared/ui/Button/Button';
import { Menu } from 'src/shared/ui/icons';

const meta: Meta<typeof Popover> = {
  component: Popover,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    anchorElement: (
      <Button variant={'ghost'} widthType={'hug'} size={'fit'} color={'neutral'}>
        <Menu />
      </Button>
    ),
    contentElement: <div>content!!!</div>,
  },
};
