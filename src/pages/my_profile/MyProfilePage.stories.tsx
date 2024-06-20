import { Meta, StoryObj } from '@storybook/react';
import { MyProfilePage } from 'src/pages/my_profile/MyProfilePage';
import { useMyProfileStore } from 'src/entities/profile/model/myProfileStore';

const meta: Meta<typeof MyProfilePage> = {
  component: MyProfilePage,
};

export default meta;
type Story = StoryObj<typeof MyProfilePage>;

export const Default: Story = {
  args: {},
  decorators: [
    (fn) => {
      const store = useMyProfileStore();
      return (
        <div style={{ height: 'calc(100vh - 32px)', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}>
          <div>{fn()}</div>
          <textarea readOnly value={JSON.stringify(store, null, '\t')} />
        </div>
      );
    },
  ],
};
