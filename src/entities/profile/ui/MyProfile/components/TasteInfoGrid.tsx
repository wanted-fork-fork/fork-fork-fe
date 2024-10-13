import { MyProfile } from 'src/entities/profile/model/myProfileStore';
import styles from 'src/shared/ui/Profile/Profile.module.css';
import { ProfileCellHeader } from 'src/shared/ui/Profile/ProfileCellHeader';
import { Chip } from 'src/shared/ui/Chip/Chip';
import { getSmokingText } from 'src/entities/profile/lib/getSmokingText';

export const TasteInfoGrid = ({ profile }: { profile: MyProfile }) => {
  return (
    <div className={styles.Grid}>
      <div className={styles.GridRow}>
        <div className={styles.Cell}>
          <ProfileCellHeader title={'취미'} />
          <div className={styles.ChipList}>
            {profile.hobbies.map((hob) => (
              <Chip key={hob.name}>{hob.name}</Chip>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.GridRow}>
        <div className={styles.Cell}>
          <ProfileCellHeader title={'흡연여부'} />
          <span>{getSmokingText(profile.smoking, 'INFO')}</span>
        </div>
        <div className={styles.Cell}>
          <ProfileCellHeader title={'음주 빈도'} />
          <span>{profile.drinking}</span>
        </div>
      </div>
      <div className={styles.Cell}>
        <ProfileCellHeader title={'자기 소개'} />
        <span className={styles.Introduce}>{profile.introduction}</span>
      </div>
    </div>
  );
};
