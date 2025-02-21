import { Meta, StoryObj } from '@storybook/react';
import { OnboardingPage } from 'src/pages/main/onboarding_coachmark/OnboardingPage';

const meta: Meta<typeof OnboardingPage> = {
  component: OnboardingPage,
  title: 'OnboardingPageWithCoachMark',
};

export default meta;
type Story = StoryObj<typeof OnboardingPage>;

export const Default: Story = {
  args: {
    userInfo: {
      userId: '1',
      name: '김구구',
      profileImage: '',
    },
    onEndOnboarding: () => alert('온보딩 끝'),
  },
};
