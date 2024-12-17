import { Portal } from '@radix-ui/react-portal';
import { Button } from 'src/shared/ui/Button/Button';
import styles from './ImageModal.module.css';
import { Close } from 'src/shared/ui/icons';
import { DetailedHTMLProps, ImgHTMLAttributes, useEffect } from 'react';
import { Carousel } from 'src/shared/ui/Carousel/Carousel';
import { useStep } from 'src/shared/functions/useStep';

type ImageModalProps = DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> & {
  showModal: boolean;
  closeModal: () => void;
  closeOnClickOutside?: boolean;
  initialSlide?: number;
  imageList: { src: string; alt: string }[];
};

export const ImageModal = ({
  showModal,
  closeModal,
  closeOnClickOutside = true,
  initialSlide,
  imageList,
}: ImageModalProps) => {
  const { step, setStep } = useStep({ max: imageList.length });

  useEffect(() => {
    if (initialSlide !== undefined) {
      setStep(initialSlide);
    }
  }, [initialSlide, setStep]);

  const onBeforeChangeStep = (current: number, next: number) => {
    setStep(next);
  };

  return (
    <>
      {showModal && (
        <Portal>
          <div className={styles.ImageModal}>
            <div className={styles.ImageModalDim} onClick={closeOnClickOutside ? closeModal : undefined} />
            <div className={styles.ImageModalHeader}>
              <Button
                color={'neutral'}
                variant={'ghost'}
                widthType={'hug'}
                className={styles.ImageModalCloseButton}
                onClick={closeModal}
              >
                <Close color={'#fff'} />
              </Button>
              <p>
                {step + 1} / {imageList.length}
              </p>
              <div />
            </div>
            <div className={styles.ImageModalWrapper}>
              <div className={styles.Container}>
                <Carousel
                  className={styles.Carousel}
                  infinite={false}
                  arrows={true}
                  initialSlide={initialSlide}
                  beforeChange={onBeforeChangeStep}
                >
                  {imageList.map(({ src, alt }) => (
                    <img src={src} key={src} alt={alt} />
                  ))}
                </Carousel>
              </div>
            </div>
          </div>
        </Portal>
      )}
    </>
  );
};
