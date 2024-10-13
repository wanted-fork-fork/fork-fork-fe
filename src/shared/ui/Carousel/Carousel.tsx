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
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const SliderComponent = typeof window === 'undefined' ? Slider.default : Slider;
  return (
    <SliderComponent dotsClass={`slick-dots ${styles.Dots}`} {...options} ref={ref}>
      {children}
    </SliderComponent>
  );
});
