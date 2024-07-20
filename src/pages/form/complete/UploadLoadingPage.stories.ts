import { Meta, StoryObj } from '@storybook/react';
import { UploadLoadingPage } from 'src/pages/form/complete/UploadLoadingPage';

const meta: Meta<typeof UploadLoadingPage> = {
  component: UploadLoadingPage,
};

export default meta;
type Story = StoryObj<typeof UploadLoadingPage>;

export const Default: Story = {
  args: {},
};
