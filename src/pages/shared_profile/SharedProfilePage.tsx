import { calculateAge, convertDateObjectToDate } from 'src/shared/vo/date';
import styles from './SharedProfilePage.module.css';
import { ScrollView } from 'src/shared/ui/ScrollView/ScrollView';
import { useInView } from 'react-intersection-observer';
import { useMyProfileStore } from 'src/entities/profile/model/myProfileStore';
import { Header } from '../../shared/ui/layout/Header/Header';
import { useTranslation } from 'react-i18next';
import { ImageLayout } from '../../shared/ui/ImageLayout/ImageLayout';
import { PersonalInfoGrid } from 'src/entities/profile/ui/MyProfile/components/PersonalInfoGrid';
import { TasteInfoGrid } from 'src/entities/profile/ui/MyProfile/components/TasteInfoGrid';
import { QuestionInfoGrid } from 'src/entities/profile/ui/MyProfile/components/QuestionInfoGrid';
import { Spacing } from 'src/shared/ui/Spacing/Spacing';
import { useMemo } from 'react';
import { ExpiredDateTimer } from 'src/pages/shared_profile/components/ExpiredDateTimer';

type Props = {
  expiredDate: Date;
};

export const SharedProfilePage = ({ expiredDate }: Props) => {
  const { t } = useTranslation();
  const { ref, inView } = useInView();

  const profile = useMyProfileStore((state) => state);
  const age = calculateAge(convertDateObjectToDate(profile.birthDate));
  const urls = useMemo(() => profile.imageDtoList.map((dto) => dto.url), [profile]);

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
        <ExpiredDateTimer expiredDate={expiredDate} type={inView ? 'BOX' : 'NUDGE'} />
        <h1 className={styles.Name} ref={ref}>
          {profile.name}({t(profile.gender)}, {age})
        </h1>
        <div className={styles.ContentWrapper}>
          <PersonalInfoGrid profile={profile} />
          <Spacing size={24} />
          <TasteInfoGrid profile={profile} />
          <Spacing size={24} />
          <QuestionInfoGrid profile={profile} />
        </div>
      </ScrollView>
    </div>
  );
};
