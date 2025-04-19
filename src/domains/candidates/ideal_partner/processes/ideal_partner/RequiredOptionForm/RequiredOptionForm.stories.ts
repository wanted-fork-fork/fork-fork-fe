import { Meta, StoryObj } from '@storybook/react';
import { RequiredOptionForm } from 'src/domains/candidates/ideal_partner/processes/ideal_partner/RequiredOptionForm/RequiredOptionForm';

const meta: Meta<typeof RequiredOptionForm> = {
  component: RequiredOptionForm,
};

export default meta;
type Story = StoryObj<typeof RequiredOptionForm>;

export const Default: Story = {
  args: {},
};
