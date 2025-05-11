import { Meta, StoryObj } from '@storybook/react';
import { SharedProfilePage } from './SharedProfilePage';
import { MyProfileProvider } from 'src/entities/candidates/info/entities/models/myProfileStore';
import { fullProfileMock } from 'src/entities/candidates/info/entities/mocks/fullProfile.mock';

const meta: Meta<typeof SharedProfilePage> = {
  component: SharedProfilePage,
};

export default meta;
type Story = StoryObj<typeof SharedProfilePage>;

export const Default: Story = {
  args: {},
  decorators: [(fn) => <MyProfileProvider initialState={fullProfileMock}>{fn()}</MyProfileProvider>],
};
