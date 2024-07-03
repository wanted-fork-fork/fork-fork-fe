import { Meta, StoryObj } from '@storybook/react';
import { ChipList } from 'src/shared/ui/ChipList/ChipList';

const meta: Meta<typeof ChipList> = {
  component: ChipList,
};

export default meta;
type Story = StoryObj<typeof ChipList>;

export const Default: Story = {
  args: {
    defaultList: [
      { name: '🧗 클라이밍' },
      { name: '🥐 맛집탐방' },
      { name: '🎬 영화보기' },
      { name: '👟 운동' },
      { name: '🧶 뜨개질' },
      { name: '🧑‍💻 개발공부' },
      { name: '📖 독서' },
      { name: '🍷 와인' },
      { name: '🏊 수영' },
      { name: '🏌️ 골프' },
      { name: '🎹 악기연주' },
    ],
    selectedList: [],
    setSelectedList: console.log,
  },
};
