import { IdealPartner } from 'src/entities/ideal_partner/model/idealPartnerStore';
import { AvatarList } from 'src/shared/ui/AvatarList/AvatarList';
import { Chip } from 'src/shared/ui/Chip/Chip';
import { ProfileCellHeader } from 'src/shared/ui/Profile/ProfileCellHeader';
import styles from 'src/shared/ui/Profile/Profile.module.css';
import { useTranslation } from 'react-i18next';
import { getSmokingText } from '../../../profile/lib/getSmokingText';
import { getDrinkingText } from '../../../profile/lib/getDrinkingText';
import { getReligionText } from '../../../profile/lib/getReligionText';
import { getLocationText } from '../../../profile/lib/getLocationText';

export const IdealPartnerProfile = ({ profile }: { profile: IdealPartner }) => {
  const { t } = useTranslation();

  return (
    <section className={styles.Grid}>
      <div className={styles.Cell}>
        <ProfileCellHeader title={'선호하는 연령대'} />
        <span>
          {profile.ageRange?.min}-{profile.ageRange?.max}
        </span>
      </div>
      <div className={styles.Cell}>
        <ProfileCellHeader title={'선호하는 키'} />
        <span>
          {profile.heightRange?.min}cm-{profile.heightRange?.max}cm
        </span>
      </div>
      <div className={styles.Cell}>
        <ProfileCellHeader title={'선호하는 스타일'} />
        <span>{profile.style}</span>
      </div>
      <div className={styles.Cell}>
        <ProfileCellHeader title={'이상형 참고 사진'} />
        <span>
          <AvatarList files={profile.images} />
        </span>
      </div>
      <div className={styles.Cell}>
        <ProfileCellHeader title={'희망 지역'} />
        <span>{profile.locations.map(getLocationText).join(', ')}</span>
      </div>
      <div className={styles.Cell}>
        <ProfileCellHeader title={'취미'} />
        <div className={styles.ChipList}>
          {profile.hobbies.map((hobby) => (
            <Chip key={hobby.name}>{hobby.name}</Chip>
          ))}
        </div>
      </div>
      <div className={styles.Cell}>
        <ProfileCellHeader title={'종교'} />
        <span>{getReligionText(profile.religion)}</span>
      </div>
      <div className={styles.Cell}>
        <ProfileCellHeader title={'음주 빈도'} />
        <span>{getDrinkingText(profile.drinking)}</span>
      </div>
      <div className={styles.Cell}>
        <ProfileCellHeader title={'흡연여부'} />
        <span>{getSmokingText(profile.smoking, 'IDEAL')}</span>
      </div>
      <div className={styles.Cell}>
        <ProfileCellHeader title={'주선자에게 전달하고 싶은 말'} />
        <span>{profile.toMatchMaker}</span>
      </div>
    </section>
  );
};
