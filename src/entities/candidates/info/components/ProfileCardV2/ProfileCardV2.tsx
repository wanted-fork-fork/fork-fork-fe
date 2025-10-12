import { ReactElement, ReactNode } from 'react';
import { ProfileSummary } from 'src/entities/candidates/info/types/profileSummary';
import styles from 'src/entities/candidates/info/components/ProfileCard/ProfileCard.module.css';
import { calculateAge } from 'src/shared/functions/date';
import { useTranslation } from 'react-i18next';
import { Chip } from 'src/shared/ui/Chip/Chip';
import { Avatar } from 'src/shared/ui/Avatar/Avatar';
import { convertDtoToLocation } from 'src/entities/candidates/info/models/convertProfileToDto';
import { getLocationText } from 'src/entities/candidates/info/utils/getLocationText';
import { getReligionText } from 'src/entities/candidates/info/utils/getReligionText';
import { getJobText } from 'src/entities/candidates/info/utils/getJobText';
import { getDrinkingText } from 'src/entities/candidates/info/utils/getDrinkingText';
import { getSmokingText } from 'src/entities/candidates/info/utils/getSmokingText';
import {
  Accessibility,
  Drinking,
  FoldedHands,
  Mindfulness,
  MusicNote,
  ShoppingBag,
  Smoking,
} from 'src/shared/ui/icons';

type Props = {
  profile: ProfileSummary;
  headerRightSlot?: ReactElement;
  footerSlot?: ReactNode;
};

const iconProps = {
  width: 20,
  height: 20,
  color: '#ccc',
};

export const ProfileCardV2 = ({ profile, headerRightSlot, footerSlot }: Props) => {
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
            size={56}
            shape={'roundedSquare'}
          />
        </div>
        <div className={styles.InfoSummaryContainer}>
          <p className={styles.Name}>{profile.name}</p>
          <div className={styles.Info}>
            <span>{calculateAge(new Date(profile.birthDate))}세</span>
            <span>{t(profile.gender)}자</span>
            {location && <span>{getLocationText(location, t)}</span>}
          </div>
        </div>
      </div>
      <div className={styles.DetailTableContainer}>
        <table className={styles.DetailTable}>
          <tbody>
            <tr>
              <th scope={'row'}>
                <Accessibility {...iconProps} />
              </th>
              <td>{profile.height}cm</td>
              {profile.mbti && (
                <>
                  <th scope={'row'}>
                    <Mindfulness {...iconProps} />
                  </th>
                  <td>{profile.mbti}</td>
                </>
              )}
              <th scope={'row'}>
                <FoldedHands {...iconProps} />
              </th>
              <td colSpan={3}>{getReligionText(profile.religion, t)}</td>
            </tr>
            <tr>
              <th scope={'row'}>
                <ShoppingBag {...iconProps} />
              </th>
              <td colSpan={3}>{getJobText(profile.job, t)}</td>
            </tr>
            <tr>
              <th scope={'row'}>
                <Drinking {...iconProps} />
              </th>
              <td>{getDrinkingText(profile.drinking, t)}</td>
              <th scope={'row'}>
                <Smoking {...iconProps} />
              </th>
              <td>{getSmokingText(profile.smoking, 'INFO', t)}</td>
            </tr>
            <tr>
              <th scope={'row'}>
                <MusicNote {...iconProps} />
              </th>
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
      {footerSlot}
    </article>
  );
};
