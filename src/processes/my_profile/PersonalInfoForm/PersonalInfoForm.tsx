import styles from './PersonalInfoForm.module.css';
import { HeightForm } from 'src/processes/my_profile/PersonalInfoForm/components/HeightForm';
import { BirthDateForm } from 'src/processes/my_profile/PersonalInfoForm/components/BirthDateForm';
import { GenderForm } from 'src/processes/my_profile/PersonalInfoForm/components/GenderForm';
import { NameForm } from 'src/processes/my_profile/PersonalInfoForm/components/NameForm';
import { useMyProfileStore } from 'src/entities/profile/model/myProfileStore';
import { Button } from 'src/shared/ui/Button/Button';
import { Gender } from 'src/entities/profile/types/profileSummary';
import { DateObj } from 'src/shared/vo/date';
import { useMemo, useState } from 'react';

type PersonalInfoData = {
  name: string;
  gender: Gender;
  birthDate: Partial<DateObj>;
  height: number;
};

enum PersonalInfoStepEnum {
  'NAME',
  'GENDER',
  'BIRTHDATE',
  'HEIGHT',
}

const PersonalInfoStepMap = {
  [PersonalInfoStepEnum.NAME]: {
    title: () => (
      <>
        당신에 대해 알려주세요!
        <br />
        이름이 어떻게 되시나요?
      </>
    ),
    description: () => '',
    canGoNext: (data: PersonalInfoData) => data.name.trim().length > 0,
  },
  [PersonalInfoStepEnum.GENDER]: {
    title: () => (
      <>
        당신에 대해 알려주세요!
        <br />
        성별은요?
      </>
    ),
    description: () => '',
    canGoNext: (data: PersonalInfoData) => Boolean(data.gender),
  },
  [PersonalInfoStepEnum.BIRTHDATE]: {
    title: () => (
      <>
        당신에 대해 알려주세요!
        <br />
        나이는 어떻게 되시나요?
      </>
    ),
    description: () => '* 정확한 나이 계산을 위해 생년월일을 입력받고 있습니다.',
    canGoNext: (data: PersonalInfoData) => Object.values(data.birthDate).every(Boolean),
  },
  [PersonalInfoStepEnum.HEIGHT]: {
    title: () => (
      <>
        당신에 대해 알려주세요!
        <br />
        키는 몇인가요?
      </>
    ),
    description: () => '',
    canGoNext: (data: PersonalInfoData) => data.height.toString().length > 0,
  },
} as const;

/**
 * 내 프로필 입력 > 기본 인적사항
 */
export const PersonalInfoForm = ({ onClickNextForm }: { onClickNextForm?: () => void }) => {
  const [step, setStep] = useState(PersonalInfoStepEnum.NAME);
  const personalInfoData = useMyProfileStore(({ name, gender, birthDate, height }) => ({
    name,
    gender,
    birthDate,
    height,
  }));

  const currentStep = useMemo(() => PersonalInfoStepMap[step], [step]);
  const canShowNext = useMemo(() => step < PersonalInfoStepEnum.HEIGHT || onClickNextForm, [onClickNextForm, step]);

  const canClickNext = useMemo(
    () => (step < PersonalInfoStepEnum.HEIGHT || onClickNextForm) && currentStep?.canGoNext(personalInfoData),
    [onClickNextForm, personalInfoData, step],
  );

  const onClickNext = () => {
    step < PersonalInfoStepEnum.HEIGHT ? setStep((prev) => prev + 1) : onClickNextForm?.();
  };

  return (
    <>
      <section className={styles.Wrapper}>
        <div className={styles.TitleSection}>
          <h2>{currentStep.title()}</h2>
          {currentStep.description && <small className={styles.Description}>{currentStep.description()}</small>}
        </div>
        <div className={styles.Container}>
          {step >= PersonalInfoStepEnum.HEIGHT && <HeightForm />}
          {step >= PersonalInfoStepEnum.BIRTHDATE && <BirthDateForm />}
          {step >= PersonalInfoStepEnum.GENDER && <GenderForm />}
          {step >= PersonalInfoStepEnum.NAME && <NameForm />}
        </div>
        {canShowNext && (
          <Button
            className={styles.FooterButton}
            variant={'filled'}
            widthType={'fill'}
            color={'primary'}
            onClick={onClickNext}
            disabled={!canClickNext}
          >
            확인
          </Button>
        )}
      </section>
    </>
  );
};
