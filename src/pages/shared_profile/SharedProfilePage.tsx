import { calculateAge, convertDateObjectToDate } from 'src/shared/vo/date';
import styles from './SharedProfilePage.module.css';
import { ScrollView } from 'src/shared/ui/ScrollView/ScrollView';
import { useInView } from 'react-intersection-observer';
import { useMyProfileStore } from 'src/entities/profile/model/myProfileStore';
import { MyProfileView } from '../../entities/profile/ui/MyProfile/MyProfile';
import { Header } from '../../shared/ui/layout/Header/Header';
import { useTranslation } from 'react-i18next';
import { ImageLayout } from '../../shared/ui/ImageLayout/ImageLayout';

export const SharedProfilePage = () => {
  const { t } = useTranslation();
  const { ref, inView } = useInView();

  const profile = useMyProfileStore((state) => state);
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
      {inView ? (
        <span />
      ) : (
        <Header prefixSlot={<></>} suffixSlot={<></>}>
          {profile.name}({t(profile.gender)}, {age})
        </Header>
      )}
      <ScrollView rootClassName={styles.Body}>
        <ImageLayout urls={urls} />
        <h1 className={styles.Name} ref={ref}>
          {profile.name}({profile.gender}, {age})
        </h1>
        <div className={styles.ContentWrapper}>
          <MyProfileView profile={profile} initialOpen={true} />
        </div>
      </ScrollView>
    </div>
  );
};
