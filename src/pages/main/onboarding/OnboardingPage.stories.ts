import { Meta, StoryObj } from '@storybook/react';
import { OnboardingPage } from 'src/pages/main/onboarding/OnboardingPage';

const meta: Meta<typeof OnboardingPage> = {
  component: OnboardingPage,
};

export default meta;
type Story = StoryObj<typeof OnboardingPage>;

export const Default: Story = {
  args: {},
};
