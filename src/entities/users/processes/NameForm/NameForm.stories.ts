import { Meta, StoryObj } from '@storybook/react';
import { NameForm } from 'src/entities/users/processes/NameForm/NameForm';

const meta: Meta<typeof NameForm> = {
  component: NameForm,
};

export default meta;
type Story = StoryObj<typeof NameForm>;

export const Default: Story = {
  args: {},
};
