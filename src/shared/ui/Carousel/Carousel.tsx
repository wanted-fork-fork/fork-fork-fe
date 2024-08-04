import { PropsWithChildren } from 'react';
import Slider, { Settings } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export const Carousel = ({ children, ...options }: PropsWithChildren<Settings>) => {
  return <Slider {...options}>{children}</Slider>;
};
