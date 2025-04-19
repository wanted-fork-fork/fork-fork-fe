import { Meta, StoryObj } from '@storybook/react';
import { Shortcut } from 'src/domains/candidates/components/Shortcut/Shortcut';
import { MyProfileProvider } from 'src/domains/candidates/info/entities/models/myProfileStore';
import { fullProfileMock } from 'src/domains/candidates/info/entities/mocks/fullProfile.mock';

const meta: Meta<typeof Shortcut> = {
  component: Shortcut,
};

export default meta;
type Story = StoryObj<typeof Shortcut>;

export const Default: Story = {
  decorators: (fn) => <MyProfileProvider initialState={fullProfileMock}>{fn()}</MyProfileProvider>,
  args: {},
};
