import { Meta, StoryObj } from '@storybook/react';
import { ProfileFormIntroPage } from 'src/pages/form/intro/ProfileFormIntroPage';

const meta: Meta<typeof ProfileFormIntroPage> = {
  component: ProfileFormIntroPage,
};

export default meta;
type Story = StoryObj<typeof ProfileFormIntroPage>;

export const Default: Story = {
  args: {
    matchMakerName: '조예진',
  },
};
