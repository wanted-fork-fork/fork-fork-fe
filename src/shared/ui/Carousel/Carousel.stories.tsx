import { Meta, StoryObj } from '@storybook/react';
import { Carousel } from 'src/shared/ui/Carousel/Carousel';

const meta: Meta<typeof Carousel> = {
  component: Carousel,
};

export default meta;
type Story = StoryObj<typeof Carousel>;

export const Default: Story = {
  args: {
    dots: true,
    autoplay: false,
    infinite: false,
    slidesToShow: 1,
  },
  render: (args) => (
    <Carousel {...args}>
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
    </Carousel>
  ),
};
