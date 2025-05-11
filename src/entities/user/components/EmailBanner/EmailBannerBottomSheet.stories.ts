import { Meta, StoryObj } from '@storybook/react';
import { EmailBannerBottomSheet } from 'src/entities/user/components/EmailBanner/EmailBannerBottomSheet';

const meta: Meta<typeof EmailBannerBottomSheet> = {
  component: EmailBannerBottomSheet,
};

export default meta;
type Story = StoryObj<typeof EmailBannerBottomSheet>;

export const Default: Story = {
  args: {
    onClose: console.log,
  },
};
