import { ReactElement } from 'react';
import { ProfileSummary } from 'src/entities/candidates/info/entities/types/profileSummary';
import styles from 'src/entities/candidates/info/components/ProfileCard/ProfileCard.module.css';
import { calculateAge } from 'src/shared/functions/date';
import { useTranslation } from 'react-i18next';
import { Chip } from 'src/shared/ui/Chip/Chip';
import { Avatar } from 'src/shared/ui/Avatar/Avatar';
import { convertDtoToLocation } from 'src/entities/candidates/info/entities/models/convertProfileToDto';
import { getLocationText } from 'src/entities/candidates/info/entities/libs/getLocationText';
import { getReligionText } from 'src/entities/candidates/info/entities/libs/getReligionText';
import { getJobText } from 'src/entities/candidates/info/entities/libs/getJobText';
import { getDrinkingText } from 'src/entities/candidates/info/entities/libs/getDrinkingText';
import { getSmokingText } from 'src/entities/candidates/info/entities/libs/getSmokingText';

type Props = {
  profile: ProfileSummary;
  headerRightSlot?: ReactElement;
};

export const ProfileCard = ({ profile, headerRightSlot }: Props) => {
  const { t } = useTranslation('common');

  const location = convertDtoToLocation(profile.location)[0];

  return (
    <article className={`${styles.Container} profile-card`}>
      {headerRightSlot && <div className={styles.HeaderRightSlot}>{headerRightSlot}</div>}
      <div className={styles.Header}>
        <div className={styles.ProfileImageContainer}>
          <Avatar
            fallback={profile.name[0]}
            src={profile.images[0]?.url}
            alt={`${profile.name} 대표 사진`}
            size={80}
            shape={'circle'}
          />
        </div>
        <div className={styles.InfoSummaryContainer}>
          <p className={styles.Name}>{profile.name}</p>
          <div className={styles.Info}>
            <span>{calculateAge(new Date(profile.birthDate))}세</span>
            <span>{t(profile.gender)}</span>
            {location && <span>{getLocationText(location, t)}</span>}
          </div>
        </div>
      </div>
      <div className={styles.DetailTableContainer}>
        <table className={styles.DetailTable}>
          <tbody>
            <tr>
              <th scope={'row'}>신장</th>
              <td>{profile.height}cm</td>
              {profile.mbti && (
                <>
                  <th scope={'row'}>MBTI</th>
                  <td>{profile.mbti}</td>
                </>
              )}
            </tr>
            <tr>
              <th scope={'row'}>종교</th>
              <td colSpan={3}>{getReligionText(profile.religion, t)}</td>
            </tr>
            <tr>
              <th scope={'row'}>신분</th>
              <td colSpan={3}>{getJobText(profile.job, t)}</td>
            </tr>
            <tr>
              <th scope={'row'}>음주</th>
              <td>{getDrinkingText(profile.drinking, t)}</td>
              <th scope={'row'}>흡연</th>
              <td>{getSmokingText(profile.smoking, 'INFO', t)}</td>
            </tr>
            <tr>
              <th scope={'row'}>취미</th>
              <td colSpan={3}>
                <div className={styles.HobbyList}>
                  {profile.hobbies.slice(0, 2).map((hobby) => (
                    <Chip key={hobby}>{hobby}</Chip>
                  ))}
                  {profile.hobbies.length > 2 && <span>+{profile.hobbies.length - 2}</span>}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </article>
  );
};
