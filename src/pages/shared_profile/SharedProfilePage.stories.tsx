import { Meta, StoryObj } from '@storybook/react';
import { SharedProfilePage } from './SharedProfilePage';
import { MyProfileProvider } from 'src/entities/profile/model/myProfileStore';
import { fullProfileMock } from '../../entities/profile/api/__mock__/fullProfile.mock';

const meta: Meta<typeof SharedProfilePage> = {
  component: SharedProfilePage,
};

export default meta;
type Story = StoryObj<typeof SharedProfilePage>;

export const Default: Story = {
  args: {},
  decorators: [(fn) => <MyProfileProvider initialState={fullProfileMock}>{fn()}</MyProfileProvider>],
};
