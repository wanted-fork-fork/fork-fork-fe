import { Meta, StoryObj } from '@storybook/react';
import { ImageModal } from 'src/shared/ui/ImageModal/ImageModal';

const meta: Meta<typeof ImageModal> = {
  component: ImageModal,
};

export default meta;
type Story = StoryObj<typeof ImageModal>;

export const Default: Story = {
  args: {
    showModal: true,
    closeModal: () => alert('close'),
    closeOnClickOutside: true,
    imageList: [
      {
        src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/20230905_Haerin_%28NewJeans%29.jpg/250px-20230905_Haerin_%28NewJeans%29.jpg',
        alt: '해린',
      },
      {
        src: 'https://talkimg.imbc.com/TVianUpload/tvian/TViews/image/2023/09/19/def9f266-8517-453c-9c32-49b351ca0f20.jpg',
        alt: '민지',
      },
    ],
  },
};
