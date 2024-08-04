import { Button } from 'src/shared/ui/Button/Button';
import { PropsWithChildren, useRef } from 'react';
import { ArrowLeft, Edit, Share } from 'src/shared/ui/icons';
import { fullProfileMock } from 'src/entities/profile/api/__mock__/fullProfile.mock';
import { calculateAge, convertDateObjectToDate } from 'src/shared/vo/date';
import { ProfileTab } from 'src/widgets/ProfileTab/ProfileTab';
import { MockIdealPartner } from 'src/entities/ideal_partner/api/__mock__/idealPartner.mock';
import styles from './ProfilePage.module.css';
import { ScrollView } from 'src/shared/ui/ScrollView/ScrollView';
import { useVisible } from 'src/shared/functions/useVisible';

export const ProfilePage = () => {
  const nameRef = useRef(null);
  const isNameVisible = useVisible(nameRef);

  const profile = fullProfileMock;
  const age = calculateAge(convertDateObjectToDate(profile.birthDate));

  const urls = [
    '/images/googoo_1.png',
    '/images/googoo_1.png',
    '/images/googoo_1.png',
    '/images/googoo_1.png',
    '/images/googoo_1.png',
  ]; // useDataUrlListFromFiles(profile.images);

  return (
    <div className={styles.Wrapper}>
      <div className={styles.Header}>
        <IconButton>
          <ArrowLeft />
        </IconButton>
        {isNameVisible ? (
          <span />
        ) : (
          <p>
            {profile.name}({profile.gender}, {age})
          </p>
        )}
        <div className={styles.HeaderIconSection}>
          <IconButton>
            <Edit />
          </IconButton>
          <IconButton>
            <Share />
          </IconButton>
        </div>
      </div>
      <ScrollView rootClassName={styles.Body}>
        <div className={styles.ImageLayout} data-itemcount={Math.min(urls.length, 5)}>
          {urls.map((url) => (
            <img key={url} src={url} alt={'프로필 이미지'} />
          ))}
        </div>
        <h1 className={styles.Name} ref={nameRef}>
          {profile.name}({profile.gender}, {age})
        </h1>
        <ProfileTab.Root>
          <ProfileTab.TriggerList className={styles.TabTriggerList} />
          <div className={styles.TabContent}>
            <ProfileTab.Content profile={profile} idealPartner={MockIdealPartner} initialOpen={true} />
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
