import { ProfileSummary } from 'src/entities/candidates/info/types/profileSummary';
import styles from 'src/entities/candidates/info/components/ProfileCardGrid/ProfileCardGrid.module.css';
import { Link } from '@remix-run/react';
import { ReactElement } from 'react';
import { ProfileSmallCardV2 } from 'src/entities/candidates/info/components/ProfileSmallCardV2/ProfileSmallCardV2';

type Props<InfoType extends ProfileSummary> = {
  profileList: InfoType[];
  profileActionSlot?: (profile: InfoType) => ReactElement;
  getLink: (id: string) => string;
  onClickEmptyCard?: () => void;
};

export const ProfileCardGrid = <InfoType extends ProfileSummary>({
  profileList,
  profileActionSlot,
  getLink,
  onClickEmptyCard,
}: Props<InfoType>) => {
  return (
    <ul className={styles.Container}>
      {profileList.map((profile) => (
        <li key={profile.name + profile.birthDate}>
          <Link to={getLink(profile.id!)}>
            <ProfileSmallCardV2 profile={profile} topRightSlot={profileActionSlot?.(profile)} />
          </Link>
        </li>
      ))}
      {onClickEmptyCard && (
        <li className={styles.EmptyCardWrapper}>
          <button className={styles.EmptyCard} onClick={onClickEmptyCard}>
            <img src="/images/empty_card.png" alt="새 후보를 추가해주세요" width={48} height={48} />
            <p className={styles.Description}>새 후보를 추가해주세요</p>
          </button>
        </li>
      )}
    </ul>
  );
};
