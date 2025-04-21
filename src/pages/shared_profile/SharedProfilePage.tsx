import { calculateAge, convertDateObjectToDate } from 'src/shared/functions/date';
import styles from './SharedProfilePage.module.css';
import { ScrollView } from 'src/shared/ui/ScrollView/ScrollView';
import { useInView } from 'react-intersection-observer';
import { Header } from '../../shared/ui/layout/Header/Header';
import { useTranslation } from 'react-i18next';
import { ImageLayout } from '../../shared/ui/ImageLayout/ImageLayout';
import { PersonalInfoGrid } from 'src/domains/candidates/info/components/MyProfile/components/PersonalInfoGrid';
import { TasteInfoGrid } from 'src/domains/candidates/info/components/MyProfile/components/TasteInfoGrid';
import { QuestionInfoGrid } from 'src/domains/candidates/info/components/MyProfile/components/QuestionInfoGrid';
import { Spacing } from 'src/shared/ui/Spacing/Spacing';
import { useMemo } from 'react';
import { ExpiredDateTimer } from 'src/pages/shared_profile/components/ExpiredDateTimer';
import { useMyProfileStore } from 'src/domains/candidates/info/entities/models/myProfileStore';

type Props = {
  expiredDate: Date;
};

export const SharedProfilePage = ({ expiredDate }: Props) => {
  const { t } = useTranslation();
  const { ref: titleRef, inView: isTitleInView } = useInView();
  const { ref: timerRef, inView: isTimerInView } = useInView();

  const profile = useMyProfileStore((state) => state);
  const age = calculateAge(convertDateObjectToDate(profile.birthDate));
  const urls = useMemo(() => profile.imageDtoList.map((dto) => dto.url), [profile]);

  return (
    <div className={styles.Wrapper}>
      {isTitleInView ? (
        <span />
      ) : (
        <Header className={styles.Header} prefixSlot={<></>} suffixSlot={<div className={styles.HeaderSuffix}>.</div>}>
          {profile.name}({t(profile.gender)}, {age})
        </Header>
      )}
      <ScrollView rootClassName={styles.Body}>
        <ImageLayout urls={urls} />
        <ExpiredDateTimer ref={timerRef} expiredDate={expiredDate} type={'BOX'} />
        {!isTimerInView && <ExpiredDateTimer expiredDate={expiredDate} type={'NUDGE'} />}
        <h1 className={styles.Name} ref={titleRef}>
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
