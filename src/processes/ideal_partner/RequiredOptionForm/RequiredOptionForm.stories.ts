import { Meta, StoryObj } from '@storybook/react';
import { RequiredOptionForm } from 'src/processes/ideal_partner/RequiredOptionForm/RequiredOptionForm';

const meta: Meta<typeof RequiredOptionForm> = {
  component: RequiredOptionForm,
};

export default meta;
type Story = StoryObj<typeof RequiredOptionForm>;

export const Default: Story = {
  args: {},
};
