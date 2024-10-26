import { Meta, StoryObj } from '@storybook/react';
import { UploadLoadingPageView } from 'src/pages/form/complete/UploadLoadingPageView';

const meta: Meta<typeof UploadLoadingPageView> = {
  component: UploadLoadingPageView,
};

export default meta;
type Story = StoryObj<typeof UploadLoadingPageView>;

export const Default: Story = {
  args: {
    name: '예진',
    progress: 0.33,
  },
};
