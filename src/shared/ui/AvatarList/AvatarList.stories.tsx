import { Meta, StoryObj } from '@storybook/react';
import { AvatarList } from 'src/shared/ui/AvatarList/AvatarList';
import { useState } from 'react';

const meta: Meta<typeof AvatarList> = {
  component: AvatarList,
};

export default meta;
type Story = StoryObj<typeof AvatarList>;

function AvatarListStory() {
  const [, setFiles] = useState<File[]>([]);
  return <AvatarList imageDtoList={[]} setFiles={setFiles} />;
}

export const Default: Story = {
  render: AvatarListStory,
};
