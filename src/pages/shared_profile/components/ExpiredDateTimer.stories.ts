import { Meta, StoryObj } from '@storybook/react';
import { ExpiredDateTimer } from 'src/pages/shared_profile/components/ExpiredDateTimer';
import dayjs from 'dayjs';

const meta: Meta<typeof ExpiredDateTimer> = {
  component: ExpiredDateTimer,
};

export default meta;
type Story = StoryObj<typeof ExpiredDateTimer>;

export const Default: Story = {
  args: {
    expiredDate: dayjs().add(1, 'day').toDate(),
    type: 'NUDGE',
  },
};
