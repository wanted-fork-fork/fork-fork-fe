import { Meta, StoryObj } from '@storybook/react';
import { RequiredOptionForm } from 'src/entities/candidates/ideal_partner/processes/RequiredOptionForm/RequiredOptionForm';

const meta: Meta<typeof RequiredOptionForm> = {
  component: RequiredOptionForm,
};

export default meta;
type Story = StoryObj<typeof RequiredOptionForm>;

export const Default: Story = {
  args: {},
};
