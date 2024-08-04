import { Plus } from 'src/shared/ui/icons';
import styles from './CopyProfileFormLinkButton.module.css';

export const CopyProfileFormLinkButton = () => {
  const onClick = () => {
    navigator.clipboard.writeText(`${location.origin}/form`).then(() => alert('복사되었습니다'));
  };

  return (
    <button className={styles.FloatingButton} onClick={onClick}>
      <Plus color={'#fff'} />
    </button>
  );
};
