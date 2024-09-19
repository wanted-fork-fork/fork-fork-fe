import { Portal } from '@radix-ui/react-portal';
import styles from './Modal.module.css';
import { PropsWithChildren } from 'react';

type ModalProps = PropsWithChildren<{
  showModal: boolean;
  closeModal: () => void;
  closeOnClickOutside?: boolean;
  wrapperClassName?: string;
}>;

export const Modal = ({
  wrapperClassName = '',
  showModal,
  closeModal,
  closeOnClickOutside = true,
  children,
}: ModalProps) => {
  return (
    <>
      {showModal && (
        <Portal>
          <div className={styles.Modal}>
            <div className={styles.ModalDim} onClick={closeOnClickOutside ? closeModal : undefined} />
            <div className={`${styles.ModalWrapper} ${wrapperClassName}`}>{children}</div>
          </div>
        </Portal>
      )}
    </>
  );
};
