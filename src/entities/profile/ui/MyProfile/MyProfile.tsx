import { Accordion } from 'src/shared/ui/Accordion/Accordion';
import styles from 'src/shared/ui/Profile/Profile.module.css';
import { Spacing } from 'src/shared/ui/Spacing/Spacing';
import { Chip } from 'src/shared/ui/Chip/Chip';
import { MyProfile } from 'src/entities/profile/model/myProfileStore';
import { calculateAge } from 'src/shared/vo/date';
import { AvatarList } from 'src/shared/ui/AvatarList/AvatarList';
import { ProfileCellHeader } from 'src/shared/ui/Profile/ProfileCellHeader';

export const MyProfileView = ({ profile }: { profile: MyProfile }) => {
  return (
    <section>
      <Accordion summary={'기본 개인정보'}>
        <Spacing size={32} />
        <div className={styles.Grid}>
          <div className={styles.GridRow}>
            <div className={styles.Cell}>
              <ProfileCellHeader title={'이름'} />
              <span>{profile.name}</span>
            </div>
            <div className={styles.Cell}>
              <ProfileCellHeader title={'성별'} />
              <span>{profile.gender}</span>
            </div>
          </div>
          <div className={styles.GridRow}>
            <div className={styles.Cell}>
              <ProfileCellHeader title={'나이'} />
              <span>
                {calculateAge(
                  new Date(`${profile.birthDate.year}-${profile.birthDate.month}-${profile.birthDate.date}`),
                )}
                세 ({profile.birthDate.year}년 {profile.birthDate.month}월)
              </span>
            </div>
            <div className={styles.Cell}>
              <ProfileCellHeader title={'키(신장)'} />
              <span>{profile.height}cm</span>
            </div>
          </div>
          <div className={styles.GridRow}>
            <div className={styles.Cell}>
              <ProfileCellHeader title={'MBTI'} />
              <span>{profile.mbti}</span>
            </div>
            <div className={styles.Cell}>
              <ProfileCellHeader title={'종교'} />
              <span>{profile.religion.religionCategory}</span>
            </div>
          </div>
          <div className={styles.GridRow}>
            <div className={styles.Cell}>
              <ProfileCellHeader title={'업로드 사진'} />
              <div className={styles.HorizontalList}>
                <AvatarList files={profile.images} />
              </div>
            </div>
          </div>
          <div className={styles.GridRow}>
            <div className={styles.Cell}>
              <ProfileCellHeader title={'신분'} />
              <span>{profile.job.jobCategory}</span>
            </div>
          </div>
          <div className={styles.GridRow}>
            <div className={styles.Cell}>
              <ProfileCellHeader title={'주로 머무는 지역'} />
              <span>{profile.location.map((loc) => `${loc.city.cityName} ${loc.town[0].townName}`).join(', ')}</span>
            </div>
          </div>
        </div>
      </Accordion>
      <Spacing size={32} />
      <Accordion summary={'개인 취향 및 선호도 관련'}>
        <Spacing size={32} />
        <div className={styles.Grid}>
          <div className={styles.GridRow}>
            <div className={styles.Cell}>
              <ProfileCellHeader title={'취미'} />
              <div className={styles.HorizontalList}>
                {profile.hobbies.map((hob) => (
                  <Chip key={hob.name}>{hob.name}</Chip>
                ))}
              </div>
            </div>
          </div>
          <div className={styles.GridRow}>
            <div className={styles.Cell}>
              <ProfileCellHeader title={'흡연여부'} />
              <span>{profile.smoking}</span>
            </div>
            <div className={styles.Cell}>
              <ProfileCellHeader title={'음주 빈도'} />
              <span>{profile.drinking}</span>
            </div>
          </div>
          <div className={styles.Cell}>
            <ProfileCellHeader title={'자기 소개'} />
            <span>{profile.introduction}</span>
          </div>
        </div>
      </Accordion>
      <Spacing size={32} />
      <Accordion summary={'선택 질문'}>
        <Spacing size={32} />
        <div className={styles.Grid}>
          <div className={styles.GridRow}>
            <div className={styles.Cell}>
              <ProfileCellHeader title={'반려동물'} />
              <span>강아지</span>
            </div>
          </div>
        </div>
      </Accordion>
    </section>
  );
};
