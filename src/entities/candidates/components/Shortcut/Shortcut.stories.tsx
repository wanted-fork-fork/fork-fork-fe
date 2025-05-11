import { Meta, StoryObj } from '@storybook/react';
import { Shortcut } from 'src/entities/candidates/components/Shortcut/Shortcut';
import { MyProfileProvider } from 'src/entities/candidates/info/entities/models/myProfileStore';
import { fullProfileMock } from 'src/entities/candidates/info/entities/mocks/fullProfile.mock';

const meta: Meta<typeof Shortcut> = {
  component: Shortcut,
};

export default meta;
type Story = StoryObj<typeof Shortcut>;

export const Default: Story = {
  decorators: (fn) => <MyProfileProvider initialState={fullProfileMock}>{fn()}</MyProfileProvider>,
  args: {},
};
