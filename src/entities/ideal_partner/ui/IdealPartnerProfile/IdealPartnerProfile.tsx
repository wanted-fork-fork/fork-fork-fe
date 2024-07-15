import { IdealPartner } from 'src/entities/ideal_partner/model/idealPartnerStore';
import { AvatarList } from 'src/shared/ui/AvatarList/AvatarList';
import { Chip } from 'src/shared/ui/Chip/Chip';
import { ProfileCellHeader } from 'src/shared/ui/Profile/ProfileCellHeader';
import styles from 'src/shared/ui/Profile/Profile.module.css';

export const IdealPartnerProfile = ({ profile }: { profile: IdealPartner }) => {
  return (
    <section className={styles.Grid}>
      <div className={styles.Cell}>
        <ProfileCellHeader title={'선호하는 연령대'} />
        <span>
          {profile.ageRange.min}-{profile.ageRange.max}
        </span>
      </div>
      <div className={styles.Cell}>
        <ProfileCellHeader title={'선호하는 키'} />
        <span>
          {profile.heightRange.min}-{profile.heightRange.max}
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
        <span>
          {profile.locations.map(({ city, town }) => town.map((t) => `${city.cityName} ${t.townName}`)).join(', ')}
        </span>
      </div>
      <div className={styles.Cell}>
        <ProfileCellHeader title={'취미'} />
        <div className={styles.HorizontalList}>
          {profile.hobbies.map((hobby) => (
            <Chip key={hobby.name}>{hobby.name}</Chip>
          ))}
        </div>
      </div>
      <div className={styles.Cell}>
        <ProfileCellHeader title={'종교'} />
        <span>{profile.religion.religionCategory}</span>
      </div>
      <div className={styles.Cell}>
        <ProfileCellHeader title={'음주 빈도'} />
        <span>{profile.drinking.drinkingCategory}</span>
      </div>
      <div className={styles.Cell}>
        <ProfileCellHeader title={'흡연여부'} />
        <span>{profile.smoking.smokingCategory}</span>
      </div>
      <div className={styles.Cell}>
        <ProfileCellHeader title={'주선자에게 전달하고 싶은 말'} />
        <span>{profile.toMatchMaker}</span>
      </div>
    </section>
  );
};
