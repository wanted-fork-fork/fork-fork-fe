import styles from './ProfileSmallCardV2.module.css';
import { ProfileSummary } from 'src/entities/candidates/info/types/profileSummary';
import { ReactElement } from 'react';
import { Location, Person } from 'src/shared/ui/icons';
import { calculateAge } from 'src/shared/functions/date';
import { useTranslation } from 'react-i18next';
import { convertDtoToLocation } from 'src/entities/candidates/info/models/convertProfileToDto';
import { getLocationText } from 'src/entities/candidates/info/utils/getLocationText';

type Props = {
  profile: ProfileSummary;
  topRightSlot?: ReactElement;
};

export const ProfileSmallCardV2 = ({ profile, topRightSlot }: Props) => {
  const { t } = useTranslation('common');
  const location = convertDtoToLocation(profile.location)[0];
  const totalLocationCount = profile.location.towns.length;

  return (
    <article className={styles.Container}>
      {topRightSlot && <div className={styles.TopRightSlot}>{topRightSlot}</div>}
      <img className={styles.Image} src={profile.images[0]?.url} alt={`${profile.name} 대표 사진`} />
      <p className={styles.Name}>{profile.name}</p>
      <div className={styles.InfoWrapper}>
        <div className={styles.InfoRow}>
          <Person className={styles.Icon} color={'#ccc'} fontSize={16} />
          <span>{calculateAge(new Date(profile.birthDate))}세</span>
          <span>{t(profile.gender)}자</span>
          <span>{profile.height}cm</span>
        </div>
        <div className={styles.InfoRow}>
          <Location className={styles.Icon} color={'#ccc'} fontSize={16} />
          {location && (
            <span>
              {getLocationText(location, t)}
              {totalLocationCount > 1 && ` 외 ${totalLocationCount - 1}`}
            </span>
          )}
        </div>
      </div>
    </article>
  );
};
