import styles from './Profile.module.css';
import { Edit } from 'src/shared/ui/icons';

export const ProfileCellHeader = ({ title }: { title: string }) => {
  return (
    <div className={styles.CellHeader}>
      <span className={styles.CellHeaderTitle}>{title}</span>
      <Edit width={15} height={15} />
    </div>
  );
};
