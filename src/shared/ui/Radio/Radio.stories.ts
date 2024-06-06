import { Meta, StoryObj } from '@storybook/react';
import { Radio } from 'src/shared/ui/Radio/Radio';

const meta: Meta<typeof Radio> = {
  component: Radio,
};

export default meta;
type Story = StoryObj<typeof Radio>;

export const Default: Story = {
  args: {
    label: '학생(대학원생)',
  },
};
