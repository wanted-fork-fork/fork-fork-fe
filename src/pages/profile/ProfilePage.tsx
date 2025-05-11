import { calculateAge, convertDateObjectToDate } from 'src/shared/functions/date';
import { ProfileTab } from 'src/entities/candidates/components/ProfileTab/ProfileTab';
import styles from './ProfilePage.module.css';
import { ScrollView } from 'src/shared/ui/ScrollView/ScrollView';
import { useInView } from 'react-intersection-observer';
import { ImageLayout } from 'src/shared/ui/ImageLayout/ImageLayout';
import { useTranslation } from 'react-i18next';
import { ProfilePageHeader } from 'src/pages/profile/components/ProfilePageHeader';
import { useMemo } from 'react';
import { ProfileHeaderActions } from 'src/pages/profile/components/ProfileHeaderActions';
import { ArrowLeft } from 'src/shared/ui/icons';
import { Theme } from 'src/shared/styles/constants';
import { Link } from '@remix-run/react';
import { IconButton } from 'src/shared/ui/IconButton/IconButton';
import { useMyProfileStore } from 'src/entities/candidates/info/models/myProfileStore';
import { useIdealPartnerStore } from 'src/entities/candidates/ideal_partner/models/idealPartnerStore';

export const ProfilePage = ({ infoId }: { infoId: string }) => {
  const { ref, inView } = useInView();

  const { t } = useTranslation();

  const profile = useMyProfileStore((state) => state);
  const idealPartner = useIdealPartnerStore((state) => state);
  const age = calculateAge(convertDateObjectToDate(profile.birthDate));

  const urls = useMemo(() => profile.imageDtoList.map((image) => image.url), [profile.imageDtoList]);

  return (
    <div className={styles.Wrapper}>
      <ProfilePageHeader
        profile={profile}
        prefix={
          <Link to={'/'}>
            <IconButton>
              <ArrowLeft color={Theme.color.neutral50} />
            </IconButton>
          </Link>
        }
        suffix={<ProfileHeaderActions infoId={infoId} name={profile.name} />}
        showTitle={!inView}
      />
      <ScrollView rootClassName={styles.Body}>
        <ImageLayout urls={urls} />
        <h1 className={styles.Name} ref={ref}>
          {profile.name}({t(profile.gender)}, {age})
        </h1>
        <ProfileTab.Root>
          <ProfileTab.TriggerList className={styles.TabTriggerList} />
          <div className={styles.TabContent}>
            <ProfileTab.Content profile={profile} idealPartner={idealPartner} initialOpen={true} />
          </div>
        </ProfileTab.Root>
      </ScrollView>
    </div>
  );
};
