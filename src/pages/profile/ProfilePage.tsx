import { calculateAge, convertDateObjectToDate } from 'src/shared/vo/date';
import { ProfileTab } from 'src/widgets/ProfileTab/ProfileTab';
import styles from './ProfilePage.module.css';
import { ScrollView } from 'src/shared/ui/ScrollView/ScrollView';
import { useInView } from 'react-intersection-observer';
import { useMyProfileStore } from 'src/entities/profile/model/myProfileStore';
import { useIdealPartnerStore } from 'src/entities/ideal_partner/model/idealPartnerStore';
import { ImageLayout } from 'src/shared/ui/ImageLayout/ImageLayout';
import { useTranslation } from 'react-i18next';
import { ProfilePageHeader } from 'src/pages/profile/components/ProfilePageHeader';
import { useMemo } from 'react';

export const ProfilePage = ({ infoId }: { infoId: string }) => {
  const { ref, inView } = useInView();

  const { t } = useTranslation();

  const profile = useMyProfileStore((state) => state);
  const idealPartner = useIdealPartnerStore((state) => state);
  const age = calculateAge(convertDateObjectToDate(profile.birthDate));

  const urls = useMemo(() => profile.imageDtoList.map((image) => image.url), [profile.imageDtoList]);

  return (
    <>
      <div className={styles.Wrapper}>
        <ProfilePageHeader profile={profile} infoId={infoId} showTitle={!inView} />
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
    </>
  );
};
