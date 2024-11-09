import styles from './ConfirmModal.module.css';
import { Button } from 'src/shared/ui/Button/Button';

type Props = {
  show: boolean;
  title?: string;
  description?: string;
  cancelText: string;
  confirmText: string;
  onCancel: () => void;
  onConfirm: () => void;
};

export const ConfirmModal = ({ show, title, description, cancelText, confirmText, onConfirm, onCancel }: Props) => {
  return (
    <>
      {show && (
        <div className={styles.Wrapper}>
          <div className={styles.Dim} />
          <div className={styles.Container}>
            <div className={styles.TitleWrapper}>
              <h3>{title}</h3>
              <p>{description}</p>
            </div>
            <div className={styles.ButtonWrapper}>
              <Button
                className={styles.CancelButton}
                variant={'outline'}
                widthType={'fill'}
                color={'neutral'}
                onClick={onCancel}
              >
                {cancelText}
              </Button>
              <Button variant={'filled'} widthType={'fill'} color={'primary'} onClick={onConfirm}>
                {confirmText}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
