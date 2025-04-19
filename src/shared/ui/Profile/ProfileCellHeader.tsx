import styles from './Profile.module.css';
import { Edit } from 'src/shared/ui/icons';
import { Theme } from 'src/shared/styles/constants';
import { Button } from 'src/shared/ui/Button/Button';
import { useProfileEditContext } from 'src/domains/candidates/components/EditInfo/ProfileEditContext';
import { ReactElement } from 'react';

export const ProfileCellHeader = ({
  title,
  suffix,
  onClickEdit,
}: {
  title: string;
  suffix?: ReactElement;
  onClickEdit?: () => void;
}) => {
  const { canEdit } = useProfileEditContext();
  return (
    <div className={styles.CellHeader}>
      <span className={styles.CellHeaderTitle}>{title}</span>
      {suffix}
      {canEdit && onClickEdit && (
        <Button size={'fit'} color={'neutral'} variant={'ghost'} onClick={onClickEdit} widthType={'hug'}>
          <Edit width={15} height={15} color={Theme.color.neutral50} />
        </Button>
      )}
    </div>
  );
};
