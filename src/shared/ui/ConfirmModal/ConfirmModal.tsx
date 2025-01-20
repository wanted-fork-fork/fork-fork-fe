import styles from './ConfirmModal.module.css';
import { Button } from 'src/shared/ui/Button/Button';
import { IconButton } from 'src/shared/ui/IconButton/IconButton';
import { Close } from 'src/shared/ui/icons';
import { Theme } from 'src/shared/styles/constants';

type Props = {
  show: boolean;
  title?: string;
  description?: string;
  cancelText: string;
  confirmText: string;
  onCancel: () => void;
  onConfirm: () => void;
  onClose?: () => void;
};

export const ConfirmModal = ({
  show,
  title,
  description,
  cancelText,
  confirmText,
  onConfirm,
  onCancel,
  onClose,
}: Props) => {
  return (
    <>
      {show && (
        <div className={styles.Wrapper}>
          <div className={styles.Dim} />
          <div className={styles.Container}>
            {onClose && (
              <div className={styles.ActionWrapper}>
                <IconButton onClick={onClose}>
                  <Close color={Theme.color.neutral50} />
                </IconButton>
              </div>
            )}
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
