import { forwardRef, PropsWithChildren } from 'react';
import Slider, { Settings } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './Carousel.module.css';
import './Carousel.css';

export const Carousel = forwardRef<Slider, PropsWithChildren<Settings>>(function Carousel(
  { children, ...options },
  ref,
) {
  return (
    <Slider dotsClass={`slick-dots ${styles.Dots}`} {...options} ref={ref}>
      {children}
    </Slider>
  );
});
