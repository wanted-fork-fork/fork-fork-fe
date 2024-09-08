import styles from './Profile.module.css';
import { Edit } from 'src/shared/ui/icons';
import { Theme } from 'src/shared/styles/constants';

export const ProfileCellHeader = ({ title }: { title: string }) => {
  return (
    <div className={styles.CellHeader}>
      <span className={styles.CellHeaderTitle}>{title}</span>
      <Edit width={15} height={15} color={Theme.color.neutral50} />
    </div>
  );
};
