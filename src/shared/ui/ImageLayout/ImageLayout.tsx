import { Carousel } from 'src/shared/ui/Carousel/Carousel';
import { useStep } from 'src/shared/functions/useStep';
import { useRef, useState } from 'react';
import styles from './ImageLayout.module.css';
import { ImageModal } from 'src/shared/ui/ImageModal/ImageModal';

export const ImageLayout = ({ urls }: { urls: string[] }) => {
  const isSlidingRef = useRef(false);
  const { step, setStep } = useStep({ max: urls.length });
  const [selectedUrl, setSelectedUrl] = useState<string | null>(null);

  const onBeforeChangeStep = (current: number, next: number) => {
    setStep(next);
    isSlidingRef.current = true;
  };

  const onAfterChangeStep = () => {
    isSlidingRef.current = false;
  };

  const onClickImage = (url: string) => {
    if (!isSlidingRef.current) {
      setSelectedUrl(url);
    }
  };

  return (
    <>
      <div className={styles.Container}>
        <Carousel
          className={styles.Carousel}
          infinite={false}
          arrows={false}
          beforeChange={onBeforeChangeStep}
          afterChange={onAfterChangeStep}
        >
          {urls.map((url) => (
            <img src={url} key={url} alt={'프로필 이미지'} onClick={() => onClickImage(url)} />
          ))}
        </Carousel>
        <div className={styles.Step}>
          {step + 1}/{urls.length}
        </div>
      </div>
      <ImageModal showModal={Boolean(selectedUrl)} closeModal={() => setSelectedUrl(null)} src={selectedUrl ?? ''} />
    </>
  );
};
