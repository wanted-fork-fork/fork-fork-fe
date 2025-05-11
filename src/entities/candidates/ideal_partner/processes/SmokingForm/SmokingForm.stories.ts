import { Meta, StoryObj } from '@storybook/react';
import { SmokingForm } from 'src/entities/candidates/ideal_partner/processes/SmokingForm/SmokingForm';

const meta: Meta<typeof SmokingForm> = {
  component: SmokingForm,
};

export default meta;
type Story = StoryObj<typeof SmokingForm>;

export const Default: Story = {
  args: {},
};
