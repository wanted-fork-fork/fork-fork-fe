import { ProfileSummary } from 'src/entities/candidates/info/types/profileSummary';
import styles from 'src/entities/candidates/info/components/ProfileCardGrid/ProfileCardGrid.module.css';
import { Link } from '@remix-run/react';
import { ReactElement } from 'react';
import { ProfileSmallCard } from 'src/entities/candidates/info/components/ProfileSmallCard/ProfileSmallCard';

type Props<InfoType extends ProfileSummary> = {
  profileList: InfoType[];
  profileActionSlot?: (profile: InfoType) => ReactElement;
  getLink: (id: string) => string;
};

export const ProfileCardGrid = <InfoType extends ProfileSummary>({
  profileList,
  profileActionSlot,
  getLink,
}: Props<InfoType>) => {
  return (
    <ul className={styles.Container}>
      {profileList.map((profile) => (
        <li key={profile.name + profile.birthDate}>
          <Link to={getLink(profile.id!)}>
            <ProfileSmallCard profile={profile} topRightSlot={profileActionSlot?.(profile)} />
          </Link>
        </li>
      ))}
    </ul>
  );
};
