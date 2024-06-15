import { Meta, StoryObj } from '@storybook/react';
import { Hobby, HobbyForm } from 'src/processes/my_profile/HobbyForm/HobbyForm';

const meta: Meta<typeof HobbyForm> = {
  component: HobbyForm,
};

export default meta;
type Story = StoryObj<typeof HobbyForm>;

const MockHobbyList: Hobby[] = [
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
];

export const Default: Story = {
  args: {
    hobbyList: MockHobbyList,
  },
};
