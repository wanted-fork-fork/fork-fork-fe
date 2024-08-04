import { Meta, StoryObj } from '@storybook/react';
import { InfoListPage } from 'src/pages/main/info_list/InfoListPage';

const meta: Meta<typeof InfoListPage> = {
  component: InfoListPage,
};

export default meta;
type Story = StoryObj<typeof InfoListPage>;

export const Default: Story = {
  args: {},
};
