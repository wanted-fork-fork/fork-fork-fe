import { Button } from 'src/shared/ui/Button/Button';
import { PropsWithChildren, useState } from 'react';
import { ArrowLeft, Menu, Share } from 'src/shared/ui/icons';
import { calculateAge, convertDateObjectToDate } from 'src/shared/vo/date';
import { ProfileTab } from 'src/widgets/ProfileTab/ProfileTab';
import styles from './ProfilePage.module.css';
import { ScrollView } from 'src/shared/ui/ScrollView/ScrollView';
import { useInView } from 'react-intersection-observer';
import { useMyProfileStore } from 'src/entities/profile/model/myProfileStore';
import { useIdealPartnerStore } from 'src/entities/ideal_partner/model/idealPartnerStore';
import { Link } from '@remix-run/react';
import { Header } from 'src/shared/ui/layout/Header/Header';
import { Theme } from 'src/shared/styles/constants';
import { ImageLayout } from '../../shared/ui/ImageLayout/ImageLayout';
import { ProfileShareBottomSheet } from 'src/features/ProfileShare/ProfileShareBottomSheet';
import { useTranslation } from 'react-i18next';

export const ProfilePage = ({ infoId }: { infoId: string }) => {
  const { ref, inView } = useInView();

  const { t } = useTranslation();

  const profile = useMyProfileStore((state) => state);
  const idealPartner = useIdealPartnerStore((state) => state);
  const age = calculateAge(convertDateObjectToDate(profile.birthDate));

  const [isShareOpen, setShareOpen] = useState(false);

  const urls = [
    '/images/googoo_1.png',
    '/images/googoo_2.gif',
    '/images/googoo_3.png',
    '/images/googoo_4.png',
    '/images/logo.png',
  ]; // useDataUrlListFromFiles(profile.images);

  return (
    <>
      <div className={styles.Wrapper}>
        <Header
          prefixSlot={
            <Link to={'/'}>
              <IconButton>
                <ArrowLeft color={Theme.color.neutral50} />
              </IconButton>
            </Link>
          }
          suffixSlot={
            <div className={styles.HeaderIconSection}>
              <IconButton onClick={() => setShareOpen(true)}>
                <Share color={Theme.color.neutral50} />
              </IconButton>
              <IconButton>
                <Menu color={Theme.color.neutral50} />
              </IconButton>
            </div>
          }
        >
          {inView ? (
            <span />
          ) : (
            <p>
              {profile.name}({t(profile.gender)}, {age})
            </p>
          )}
        </Header>
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
      <ProfileShareBottomSheet isOpen={isShareOpen} onClose={() => setShareOpen(false)} infoId={infoId} />
    </>
  );
};

const IconButton = ({ children, onClick }: PropsWithChildren<{ onClick?: () => void }>) => (
  <Button variant={'ghost'} widthType={'hug'} size={'fit'} color={'neutral'} onClick={onClick}>
    {children}
  </Button>
);
