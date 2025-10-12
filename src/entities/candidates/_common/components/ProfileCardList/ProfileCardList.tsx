import { ProfileSummary } from 'src/entities/candidates/info/types/profileSummary';
import styles from 'src/entities/candidates/_common/components/ProfileCardList/ProfileCardList.module.css';
import { Link } from '@remix-run/react';
import { ReactElement, ReactNode } from 'react';
import { ProfileCardV2 } from 'src/entities/candidates/info/components/ProfileCardV2/ProfileCardV2';

type Props<InfoType extends ProfileSummary> = {
  profileList: InfoType[];
  profileActionSlot?: (profile: InfoType) => ReactElement;
  getLink: (id: string) => string;
  footerSlot?: (profile: InfoType) => ReactNode;
};

export const ProfileCardList = <InfoType extends ProfileSummary>({
  profileList,
  profileActionSlot,
  getLink,
  footerSlot,
}: Props<InfoType>) => {
  return (
    <ul className={styles.Container}>
      {profileList.map((profile) => (
        <li key={profile.name + profile.birthDate}>
          <Link to={getLink(profile.id!)}>
            <ProfileCardV2
              profile={profile}
              headerRightSlot={profileActionSlot?.(profile)}
              footerSlot={footerSlot?.(profile)}
            />
          </Link>
        </li>
      ))}
    </ul>
  );
};
