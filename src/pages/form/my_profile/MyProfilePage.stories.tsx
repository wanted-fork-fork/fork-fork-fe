import { Meta, StoryObj } from '@storybook/react';
import { MyProfilePage } from 'src/pages/form/my_profile/MyProfilePage';
import { useMyProfileStore } from 'src/domains/candidates/info/entities/models/myProfileStore';
import { useProfileFirstName } from 'src/domains/candidates/info/entities/libs/useProfileFirstName';

const meta: Meta<typeof MyProfilePage> = {
  component: MyProfilePage,
};

export default meta;
type Story = StoryObj<typeof MyProfilePage>;

export const Default: Story = {
  args: {},
  decorators: [
    (fn) => {
      const store = useMyProfileStore((state) => state);
      const firstName = useProfileFirstName();
      return (
        <div style={{ height: 'calc(100vh - 32px)', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}>
          <div>{fn()}</div>
          <div>
            <span>{firstName}</span>
            <textarea style={{ height: '100%', width: '100%' }} readOnly value={JSON.stringify(store, null, '\t')} />
          </div>
        </div>
      );
    },
  ],
};
