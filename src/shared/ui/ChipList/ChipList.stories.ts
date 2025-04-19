import { Meta, StoryObj } from '@storybook/react';
import { ChipList } from 'src/shared/ui/ChipList/ChipList';
import { ExampleHobbyList } from 'src/domains/candidates/vo/hobby/constants/hobbies';

const meta: Meta<typeof ChipList> = {
  component: ChipList,
};

export default meta;
type Story = StoryObj<typeof ChipList>;

export const Default: Story = {
  args: {
    defaultList: ExampleHobbyList,
    selectedList: [],
    setSelectedList: console.log,
  },
};
