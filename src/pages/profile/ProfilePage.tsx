import { Button } from 'src/shared/ui/Button/Button';
import { PropsWithChildren } from 'react';
import { ArrowLeft, Edit, Share } from 'src/shared/ui/icons';
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

export const ProfilePage = () => {
  const { ref, inView } = useInView();

  const profile = useMyProfileStore((state) => state);
  const idealPartner = useIdealPartnerStore((state) => state);
  const age = calculateAge(convertDateObjectToDate(profile.birthDate));

  const urls = [
    '/images/googoo_1.png',
    '/images/googoo_2.gif',
    '/images/googoo_3.png',
    '/images/googoo_4.png',
    '/images/logo.png',
  ]; // useDataUrlListFromFiles(profile.images);

  return (
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
            <IconButton>
              <Edit color={Theme.color.neutral50} />
            </IconButton>
            <IconButton>
              <Share color={Theme.color.neutral50} />
            </IconButton>
          </div>
        }
      >
        {inView ? (
          <span />
        ) : (
          <p>
            {profile.name}({profile.gender}, {age})
          </p>
        )}
      </Header>
      <ScrollView rootClassName={styles.Body}>
        <ImageLayout urls={urls} />
        <h1 className={styles.Name} ref={ref}>
          {profile.name}({profile.gender}, {age})
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

const IconButton = ({ children }: PropsWithChildren) => (
  <Button variant={'ghost'} widthType={'hug'} size={'fit'} color={'neutral'}>
    {children}
  </Button>
);
