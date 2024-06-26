import { Accordion } from 'src/shared/ui/Accordion/Accordion';
import { Edit } from 'src/shared/ui/icons';
import styles from './MyProfile.module.css';
import { calculateAge } from 'src/entities/profile/lib/calculateAge';
import { Avatar } from 'src/shared/ui/Avatar/Avatar';
import { Spacing } from 'src/shared/ui/Spacing/Spacing';
import { Chip } from 'src/shared/ui/Chip/Chip';
import { MyProfile } from 'src/entities/profile/model/myProfileStore';

export const MyProfileView = ({ profile }: { profile: MyProfile }) => {
  return (
    <>
      <Accordion summary={'기본 개인정보'} initialOpen>
        <Spacing size={32} />
        <div className={styles.Grid}>
          <div className={styles.GridRow}>
            <div className={styles.Cell}>
              <Header title={'이름'} />
              <span>{profile.name}</span>
            </div>
            <div className={styles.Cell}>
              <Header title={'성별'} />
              <span>{profile.gender}</span>
            </div>
          </div>
          <div className={styles.GridRow}>
            <div className={styles.Cell}>
              <Header title={'나이'} />
              <span>
                {calculateAge(
                  new Date(`${profile.birthDate.year}-${profile.birthDate.month}-${profile.birthDate.date}`),
                )}
                세 ({profile.birthDate.year}년 {profile.birthDate.month}월)
              </span>
            </div>
            <div className={styles.Cell}>
              <Header title={'키(신장)'} />
              <span>{profile.height}cm</span>
            </div>
          </div>
          <div className={styles.GridRow}>
            <div className={styles.Cell}>
              <Header title={'MBTI'} />
              <span>{profile.mbti}</span>
            </div>
            <div className={styles.Cell}>
              <Header title={'종교'} />
              <span>{profile.religion.type}</span>
            </div>
          </div>
          <div className={styles.GridRow}>
            <div className={styles.Cell}>
              <Header title={'업로드 사진'} />
              <div className={styles.HorizontalList}>
                {Array.from({ length: 8 }).map((_, idx) => (
                  <Avatar key={idx.toString()} fallback={''} shape={'roundedSquare'} size={72} src={''} />
                ))}
              </div>
            </div>
          </div>
          <div className={styles.GridRow}>
            <div className={styles.Cell}>
              <Header title={'신분'} />
              <span>{profile.job.type}</span>
            </div>
          </div>
          <div className={styles.GridRow}>
            <div className={styles.Cell}>
              <Header title={'주로 머무는 지역'} />
              <span>{profile.location.map((loc) => loc.name).join(', ')}</span>
            </div>
          </div>
        </div>
      </Accordion>
      <Spacing size={32} />
      <Accordion summary={'개인 취향 및 선호도 관련'} initialOpen>
        <Spacing size={32} />
        <div className={styles.Grid}>
          <div className={styles.GridRow}>
            <div className={styles.Cell}>
              <Header title={'취미'} />
              <div className={styles.HorizontalList}>
                {profile.hobby.map((hob) => (
                  <Chip key={hob.name}>{hob.name}</Chip>
                ))}
              </div>
            </div>
          </div>
          <div className={styles.GridRow}>
            <div className={styles.Cell}>
              <Header title={'흡연여부'} />
              <span>{profile.smoking}</span>
            </div>
            <div className={styles.Cell}>
              <Header title={'음주 빈도'} />
              <span>{profile.alcohol}</span>
            </div>
          </div>
          <div className={styles.Cell}>
            <Header title={'자기 소개'} />
            <span>{profile.introduce}</span>
          </div>
        </div>
      </Accordion>
      <Spacing size={32} />
      <Accordion summary={'선택 질문'} initialOpen>
        <Spacing size={32} />
        <div className={styles.Grid}>
          <div className={styles.GridRow}>
            <div className={styles.Cell}>
              <Header title={'반려동물'} />
              <span>강아지</span>
            </div>
          </div>
        </div>
      </Accordion>
    </>
  );
};

const Header = ({ title }: { title: string }) => {
  return (
    <div className={styles.CellHeader}>
      <span className={styles.CellHeaderTitle}>{title}</span>
      <Edit width={15} height={15} />
    </div>
  );
};
