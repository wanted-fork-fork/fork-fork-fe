import styles from './Profile.module.css';
import { Edit } from 'src/shared/ui/icons';
import { Theme } from 'src/shared/styles/constants';
import { Button } from 'src/shared/ui/Button/Button';
import { useProfileEditContext } from 'src/features/EditInfo/ProfileEditContext';

export const ProfileCellHeader = ({ title, onClickEdit }: { title: string; onClickEdit?: () => void }) => {
  const { canEdit } = useProfileEditContext();
  return (
    <div className={styles.CellHeader}>
      <span className={styles.CellHeaderTitle}>{title}</span>
      {canEdit && onClickEdit && (
        <Button size={'fit'} color={'neutral'} variant={'ghost'} onClick={onClickEdit} widthType={'hug'}>
          <Edit width={15} height={15} color={Theme.color.neutral50} />
        </Button>
      )}
    </div>
  );
};
