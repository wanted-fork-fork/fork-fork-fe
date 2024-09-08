import { Meta, StoryObj } from '@storybook/react';
import { Shortcut } from 'src/processes/shortcut/Shortcut';
import { MyProfileProvider } from 'src/entities/profile/model/myProfileStore';
import { fullProfileMock } from 'src/entities/profile/api/__mock__/fullProfile.mock';

const meta: Meta<typeof Shortcut> = {
  component: Shortcut,
};

export default meta;
type Story = StoryObj<typeof Shortcut>;

export const Default: Story = {
  decorators: (fn) => <MyProfileProvider initialState={fullProfileMock}>{fn()}</MyProfileProvider>,
  args: {},
};
