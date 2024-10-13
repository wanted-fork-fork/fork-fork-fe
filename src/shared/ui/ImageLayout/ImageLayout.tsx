import { Carousel } from 'src/shared/ui/Carousel/Carousel';
import { useStep } from 'src/shared/functions/useStep';
import { useRef } from 'react';
import Slider from 'react-slick';
import styles from './ImageLayout.module.css';

export const ImageLayout = ({ urls }: { urls: string[] }) => {
  const sliderRef = useRef<Slider>(null);
  const { step, setStep } = useStep({ max: urls.length });
  return (
    <div className={styles.Container}>
      <Carousel
        className={styles.Carousel}
        infinite={false}
        arrows={false}
        beforeChange={(_, next) => setStep(next)}
        ref={sliderRef}
      >
        {urls.map((url) => (
          <img src={url} key={url} alt={'프로필 이미지'} />
        ))}
      </Carousel>
      <div className={styles.Step}>
        {step + 1}/{urls.length}
      </div>
    </div>
  );
};
