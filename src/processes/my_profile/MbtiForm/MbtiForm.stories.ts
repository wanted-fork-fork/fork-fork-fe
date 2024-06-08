import { Meta, StoryObj } from '@storybook/react';
import { MbtiForm } from 'src/processes/my_profile/MbtiForm/MbtiForm';

const meta: Meta<typeof MbtiForm> = {
  component: MbtiForm,
};

export default meta;
type Story = StoryObj<typeof MbtiForm>;

export const Default: Story = {
  args: {},
};
