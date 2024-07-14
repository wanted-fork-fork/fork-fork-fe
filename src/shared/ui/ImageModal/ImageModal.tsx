import { Portal } from '@radix-ui/react-portal';
import { Button } from 'src/shared/ui/Button/Button';
import styles from './ImageModal.module.css';
import { Close } from 'src/shared/ui/icons';
import { DetailedHTMLProps, ImgHTMLAttributes } from 'react';

type ImageModalProps = DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> & {
  showModal: boolean;
  closeModal: () => void;
  closeOnClickOutside?: boolean;
};

export const ImageModal = ({ showModal, closeModal, closeOnClickOutside = true, alt, ...props }: ImageModalProps) => {
  return (
    <>
      {showModal && (
        <Portal>
          <div className={styles.ImageModal}>
            <div className={styles.ImageModalDim} onClick={closeOnClickOutside ? closeModal : undefined} />
            <div className={styles.ImageModalWrapper}>
              <img
                className={styles.ImageModalImg}
                alt={alt ?? '이미지'}
                data-loading={false}
                draggable={false}
                {...props}
              />
            </div>
            <Button
              color={'neutral'}
              variant={'ghost'}
              widthType={'hug'}
              className={styles.ImageModalCloseButton}
              onClick={closeModal}
            >
              <Close />
            </Button>
          </div>
        </Portal>
      )}
    </>
  );
};
