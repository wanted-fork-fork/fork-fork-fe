import { MyProfile } from 'src/entities/profile/model/myProfileStore';
import styles from 'src/shared/ui/Profile/Profile.module.css';
import { ProfileCellHeader } from 'src/shared/ui/Profile/ProfileCellHeader';
import { Chip } from 'src/shared/ui/Chip/Chip';
import { getSmokingText } from 'src/entities/profile/lib/getSmokingText';
import { EditProfileFunction } from 'src/features/EditInfo/ProfileEditContext';
import { getDrinkingText } from 'src/entities/profile/lib/getDrinkingText';

export const TasteInfoGrid = ({ profile, onClickEdit }: { profile: MyProfile; onClickEdit?: EditProfileFunction }) => {
  const showBlankValue = Boolean(onClickEdit);
  return (
    <div className={styles.Grid}>
      {(showBlankValue || profile.hobbies.length > 0) && (
        <div className={styles.GridRow}>
          <div className={styles.Cell}>
            <ProfileCellHeader title={'취미'} onClickEdit={() => onClickEdit?.('PROFILE_HOBBY')} />
            <div className={styles.ChipList}>
              {profile.hobbies.map((hob) => (
                <Chip key={hob.name}>{hob.name}</Chip>
              ))}
            </div>
          </div>
        </div>
      )}
      {(showBlankValue || profile.smoking || profile.drinking) && (
        <div className={styles.GridRow}>
          {(showBlankValue || profile.smoking) && (
            <div className={styles.Cell}>
              <ProfileCellHeader title={'흡연여부'} onClickEdit={() => onClickEdit?.('PROFILE_SMOKE_ALCOHOL')} />
              <span>{getSmokingText(profile.smoking, 'INFO')}</span>
            </div>
          )}
          {(showBlankValue || profile.drinking) && (
            <div className={styles.Cell}>
              <ProfileCellHeader title={'음주 빈도'} onClickEdit={() => onClickEdit?.('PROFILE_SMOKE_ALCOHOL')} />
              <span>{getDrinkingText(profile.drinking)}</span>
            </div>
          )}
        </div>
      )}
      {(showBlankValue || profile.introduction) && (
        <div className={styles.Cell}>
          <ProfileCellHeader title={'자기 소개'} onClickEdit={() => onClickEdit?.('PROFILE_INTRODUCE')} />
          <span className={styles.Introduce}>{profile.introduction}</span>
        </div>
      )}
    </div>
  );
};
