import { Meta, StoryObj } from '@storybook/react';
import { ReligionForm } from 'src/processes/ideal_partner/ReligionForm/ReligionForm';

const meta: Meta<typeof ReligionForm> = {
  component: ReligionForm,
};

export default meta;
type Story = StoryObj<typeof ReligionForm>;

export const Default: Story = {
  args: {},
};
