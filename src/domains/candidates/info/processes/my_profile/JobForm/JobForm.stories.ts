import { Meta, StoryObj } from '@storybook/react';
import { JobForm } from 'src/domains/candidates/info/processes/my_profile/JobForm/JobForm';

const meta: Meta<typeof JobForm> = {
  component: JobForm,
};

export default meta;
type Story = StoryObj<typeof JobForm>;

export const Default: Story = {
  args: {},
};
