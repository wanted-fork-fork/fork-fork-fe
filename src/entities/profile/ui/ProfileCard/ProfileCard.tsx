import { ReactElement } from 'react';
import { ProfileSummary } from 'src/entities/profile/types/profileSummary';
import styles from './ProfileCard.module.css';
import { calculateAge } from 'src/shared/vo/date';
import { useTranslation } from 'react-i18next';
import { getSmokingText } from 'src/entities/profile/lib/getSmokingText';
import { getReligionText } from 'src/entities/profile/lib/getReligionText';
import { Chip } from 'src/shared/ui/Chip/Chip';
import { getJobText } from 'src/entities/profile/lib/getJobText';

type Props = {
  profile: ProfileSummary;
  headerRightSlot?: ReactElement;
};

export const ProfileCard = ({ profile, headerRightSlot }: Props) => {
  const { t } = useTranslation();
  return (
    <article className={styles.Container}>
      {headerRightSlot && <div className={styles.HeaderRightSlot}>{headerRightSlot}</div>}
      <div className={styles.Header}>
        <div className={styles.ProfileImageContainer}>
          <img src={''} alt={`${profile.name} 대표 사진`} />
        </div>
        <div className={styles.InfoSummaryContainer}>
          <p className={styles.Name}>{profile.name}</p>
          <div className={styles.Info}>
            <span>{calculateAge(new Date(profile.birthDate))}세</span>
            <span>{t(profile.gender)}</span>
            <span>서울시 서초구</span>
          </div>
        </div>
      </div>
      <div className={styles.DetailTableContainer}>
        <table className={styles.DetailTable}>
          <tbody>
            <tr>
              <th scope={'row'}>신장</th>
              <td>{profile.height}cm</td>
              <th scope={'row'}>MBTI</th>
              <td>{profile.mbti}</td>
            </tr>
            <tr>
              <th scope={'row'}>종교</th>
              <td>{getReligionText(profile.religion)}</td>
            </tr>
            <tr>
              <th scope={'row'}>신분</th>
              <td>{getJobText(profile.job)}</td>
            </tr>
            <tr>
              <th scope={'row'}>음주</th>
              <td>{profile.drinking}</td>
              <th scope={'row'}>흡연</th>
              <td>{getSmokingText(profile.smoking)}</td>
            </tr>
            <tr>
              <th scope={'row'}>취미</th>
              <td colSpan={3}>
                <div className={styles.HobbyList}>
                  {profile.hobbies.map((hobby) => (
                    <Chip key={hobby}>{hobby}</Chip>
                  ))}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </article>
  );
};
