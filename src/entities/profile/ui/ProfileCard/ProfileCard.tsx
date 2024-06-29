import { ReactElement } from 'react';
import { ProfileSummary } from 'src/entities/profile/types/profileSummary';
import styles from './ProfileCard.module.css';
import { calculateAge } from 'src/shared/vo/date';

type Props = {
  profile: ProfileSummary;
  headerRightSlot?: ReactElement;
};

export const ProfileCard = ({ profile, headerRightSlot }: Props) => {
  return (
    <article className={styles.Container}>
      <div className={styles.Header}>
        <div className={styles.ProfileImageContainer}>
          <img src={profile.imageSrcList[0]} alt={`${profile.name} 대표 사진`} />
        </div>
        <div className={styles.InfoSummaryContainer}>
          <p className={styles.Name}>{profile.name}</p>
          <div className={styles.Info}>
            <span>{calculateAge(profile.birthDate)}</span>
            <span>{profile.gender === 'FEMALE' ? '여자' : '남자'}</span>
            <span>서울시 서초구</span>
          </div>
        </div>
        {headerRightSlot && <div>{headerRightSlot}</div>}
      </div>
      <div className={styles.DetailTableContainer}>
        <table className={styles.DetailTable}>
          <tbody>
            <tr>
              <th scope={'row'}>MBTI</th>
              <td>INFP</td>
              <th scope={'row'}>신장</th>
              <td>165cm</td>
            </tr>
            <tr>
              <th scope={'row'}>음주</th>
              <td>주 1-2회</td>
              <th scope={'row'}>흡연</th>
              <td>안합니다</td>
            </tr>
            <tr>
              <th scope={'row'}>종교</th>
              <td>무교</td>
            </tr>
          </tbody>
        </table>
      </div>
    </article>
  );
};
