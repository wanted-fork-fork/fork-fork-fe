import { IdealPartner } from 'src/entities/ideal_partner/model/idealPartnerStore';
import { AvatarList } from 'src/shared/ui/AvatarList/AvatarList';
import { Chip } from 'src/shared/ui/Chip/Chip';
import { ProfileCellHeader } from 'src/shared/ui/Profile/ProfileCellHeader';
import styles from 'src/shared/ui/Profile/Profile.module.css';
import { getSmokingText } from '../../../profile/lib/getSmokingText';
import { getDrinkingText } from '../../../profile/lib/getDrinkingText';
import { getReligionText } from '../../../profile/lib/getReligionText';
import { getLocationText } from '../../../profile/lib/getLocationText';
import { useProfileEditContext } from 'src/features/EditInfo/ProfileEditContext';

export const IdealPartnerProfile = ({ profile }: { profile: IdealPartner }) => {
  const value = useProfileEditContext();
  const onClickEdit = value.canEdit ? value.onEdit : undefined;

  return (
    <section className={styles.Grid}>
      <div className={styles.Cell}>
        <ProfileCellHeader title={'선호하는 연령대'} onClickEdit={() => onClickEdit?.('IDEAL_AGE')} />
        <span>
          {profile.ageRange?.min}-{profile.ageRange?.max}
        </span>
      </div>
      <div className={styles.Cell}>
        <ProfileCellHeader title={'선호하는 키'} onClickEdit={() => onClickEdit?.('IDEAL_HEIGHT_STYLE')} />
        <span>
          {profile.heightRange?.min}cm-{profile.heightRange?.max}cm
        </span>
      </div>
      <div className={styles.Cell}>
        <ProfileCellHeader title={'선호하는 스타일'} onClickEdit={() => onClickEdit?.('IDEAL_HEIGHT_STYLE')} />
        <span>{profile.style}</span>
      </div>
      <div className={styles.Cell}>
        <ProfileCellHeader title={'이상형 참고 사진'} onClickEdit={() => onClickEdit?.('IDEAL_HEIGHT_STYLE')} />
        <span>
          <AvatarList files={profile.images} />
        </span>
      </div>
      <div className={styles.Cell}>
        <ProfileCellHeader title={'희망 지역'} onClickEdit={() => onClickEdit?.('IDEAL_LOCATION')} />
        <span>{profile.locations.map(getLocationText).join(', ')}</span>
      </div>
      <div className={styles.Cell}>
        <ProfileCellHeader title={'취미'} onClickEdit={() => onClickEdit?.('IDEAL_HOBBY')} />
        <div className={styles.ChipList}>
          {profile.hobbies.map((hobby) => (
            <Chip key={hobby.name}>{hobby.name}</Chip>
          ))}
        </div>
      </div>
      <div className={styles.Cell}>
        <ProfileCellHeader title={'종교'} onClickEdit={() => onClickEdit?.('IDEAL_RELIGION')} />
        <span>{getReligionText(profile.religion)}</span>
      </div>
      <div className={styles.Cell}>
        <ProfileCellHeader title={'음주 빈도'} onClickEdit={() => onClickEdit?.('IDEAL_DRINKING')} />
        <span>{getDrinkingText(profile.drinking)}</span>
      </div>
      <div className={styles.Cell}>
        <ProfileCellHeader title={'흡연여부'} onClickEdit={() => onClickEdit?.('IDEAL_SMOKING')} />
        <span>{getSmokingText(profile.smoking, 'IDEAL')}</span>
      </div>
      <div className={styles.Cell}>
        <ProfileCellHeader
          title={'주선자에게 전달하고 싶은 말'}
          onClickEdit={() => onClickEdit?.('IDEAL_TO_MATCHER')}
        />
        <span>{profile.toMatchMaker}</span>
      </div>
    </section>
  );
};
