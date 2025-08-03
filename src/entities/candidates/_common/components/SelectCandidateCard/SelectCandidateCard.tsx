import { ReactNode } from 'react';
import { CheckBox } from 'src/shared/ui/CheckBox/CheckBox';
import { Avatar } from 'src/shared/ui/Avatar/Avatar';
import { calculateAge } from 'src/shared/functions/date';
import { useTranslation } from 'react-i18next';
import { getLocationText } from 'src/entities/candidates/info/utils/getLocationText';
import { convertDtoToLocation } from 'src/entities/candidates/info/models/convertProfileToDto';
import { ProfileSummary } from 'src/entities/candidates/info/types/profileSummary';
import styles from './SelectCandidateCard.module.css';

export const SelectCandidateCard = ({
  profile,
  selected,
  onClick,
  disabled,
  footer,
}: {
  profile: ProfileSummary;
  selected: boolean;
  onClick: () => void;
  disabled?: boolean;
  footer?: ReactNode;
}) => {
  const { t } = useTranslation();
  return (
    <button className={styles.Container} role={'radio'} aria-checked={selected} disabled={disabled}>
      <div className={styles.Wrapper}>
        <CheckBox checked={selected} onChange={onClick} label={''} disabled={disabled} />
        <Avatar
          fallback={''}
          shape={'circle'}
          src={profile.images[0]?.url}
          alt={profile.name}
          width={64}
          height={64}
          size={64}
        />
        <div className={styles.ContentWrapper}>
          <p>{profile.name}</p>
          <div className={styles.InfoWrapper}>
            <span>{calculateAge(new Date(profile.birthDate))}세</span>
            <span>{t(profile.gender)}자</span>
            <span>{getLocationText(convertDtoToLocation(profile.location)[0], t)}</span>
          </div>
        </div>
      </div>
      {footer}
    </button>
  );
};
