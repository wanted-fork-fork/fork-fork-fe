import { Meta, StoryObj } from '@storybook/react';
import { ReligionForm } from 'src/entities/candidates/info/processes/my_profile/ReligionForm/ReligionForm';

const meta: Meta<typeof ReligionForm> = {
  component: ReligionForm,
};

export default meta;
type Story = StoryObj<typeof ReligionForm>;

export const Default: Story = {
  args: {},
};
