import { Meta, StoryObj } from '@storybook/react';
import { AgeForm } from 'src/entities/candidates/ideal_partner/processes/AgeForm/AgeForm';
import { useMyProfileStore } from 'src/entities/candidates/info/models/myProfileStore';

const meta: Meta<typeof AgeForm> = {
  component: AgeForm,
};

export default meta;
type Story = StoryObj<typeof AgeForm>;

export const Default: Story = {
  args: {},
  decorators: [
    (fn) => {
      const setBirthYear = useMyProfileStore((state) => state.setBirthYear);
      const setBirthMonth = useMyProfileStore((state) => state.setBirthMonth);
      const setBirthDate = useMyProfileStore((state) => state.setBirthDate);

      setBirthYear(1998);
      setBirthMonth(3);
      setBirthDate(8);

      return fn();
    },
  ],
};
