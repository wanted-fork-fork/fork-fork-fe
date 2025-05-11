import { Meta, StoryObj } from '@storybook/react';
import { PersonalInfoForm } from 'src/entities/candidates/info/processes/my_profile/PersonalInfoForm/PersonalInfoForm';

const meta: Meta<typeof PersonalInfoForm> = {
  component: PersonalInfoForm,
};

export default meta;
type Story = StoryObj<typeof PersonalInfoForm>;

export const Default: Story = {
  args: {},
};
