import { ReactElement, ReactNode, useState } from 'react';
import { Button } from 'src/shared/ui/Button/Button';
import { ArrowLeft } from 'src/shared/ui/icons';
import { PersonalInfoForm } from 'src/processes/my_profile/PersonalInfoForm/PersonalInfoForm';
import { MyImageForm } from 'src/processes/my_profile/MyImageForm/MyImageForm';
import { MbtiForm } from 'src/processes/my_profile/MbtiForm/MbtiForm';
import { JobForm } from 'src/processes/my_profile/JobForm/JobForm';
import { LocationForm } from 'src/processes/my_profile/LocationForm/LocationForm';
import { ReligionForm } from 'src/processes/my_profile/ReligionForm/ReligionForm';
import { HobbyForm } from 'src/processes/my_profile/HobbyForm/HobbyForm';
import { SmokeAlcoholForm } from 'src/processes/my_profile/SmokeAlcoholForm/SmokeAlcoholForm';
import { IntroduceForm } from 'src/processes/my_profile/IntroduceForm/IntroduceForm';
import styles from './MyProfilePage.module.css';

type StepMeta = {
  title: ({ name }: { name: string }) => ReactNode;
  description?: () => ReactNode;
  form: ReactElement;
};

const Step: Record<string, StepMeta> = {
  PERSONAL_INFO: {
    title: () => (
      <>
        당신에 대해 알려주세요!
        <br />
        이름이 어떻게 되시나요?
      </>
    ),
    form: <PersonalInfoForm />,
  },
  MY_IMAGE: {
    title: ({ name }) => (
      <>
        상대방이 {name}님에 대해 더 잘 알 수 있도록
        <br />
        참고 사진을 업로드해주세요.
      </>
    ),
    description: () => '사진은 최대 10장까지 올릴 수 있어요.',
    form: <MyImageForm />,
  },
  MBTI: {
    title: ({ name }) => <>{name}님의 MBTI를 알려주세요.</>,
    description: () => '해당하는 MBTI를 한 개씩 선택해주세요.',
    form: <MbtiForm />,
  },
  JOB: {
    title: ({ name }) => <>{name}님은 현재 어떤 일을 하시나요?</>,
    form: <JobForm />,
  },
  LOCATION: {
    title: ({ name }) => <>{name}님이 주로 계시는 지역은 어디인가요?</>,
    description: () => '집, 직장 등 오래 머무르는 지역 최대 5곳을 선택해주세요.',
    form: <LocationForm />,
  },
  RELIGION: {
    title: () => <>종교는 있으신가요?</>,
    form: <ReligionForm />,
  },
  HOBBY: {
    title: ({ name }) => <>{name}님의 취미는 무엇인가요?</>,
    description: () => '선택지에 없다면 직접 추가도 가능해요.',
    form: <HobbyForm />,
  },
  SMOKE_ALCOHOL: {
    title: ({ name }) => (
      <>
        {name}님의 술자리 빈도수와
        <br />
        흡연 여부를 알고 싶어요
      </>
    ),
    form: <SmokeAlcoholForm />,
  },
  INTRODUCE: {
    title: () => <>자기 소개가 더 필요하신가요?</>,
    description: () => (
      <>
        여기 작성된 내용은 <strong>소개 받는 분에게만 보여져요.</strong>
        <br />
        앞에 내용이 부족하다면 글로 더 어필해주세요!
      </>
    ),
    form: <IntroduceForm />,
  },
  MORE_QUESTION: {
    title: () => <>다음과 같은 질문도 있어요</>,
    description: () => (
      <>
        앞에 내용이 부족하다면 다양한 답변을 추가하여
        <br />
        본인을 좀 더 자세히 알려주세요.
      </>
    ),
    form: <></>,
  },
};

const Steps = Object.values(Step);

export const MyProfilePage = () => {
  const [currentStepIdx, setCurrentStep] = useState(0);
  const name = '예진';

  const currentStep = Steps[currentStepIdx];

  return (
    <div className={styles.Container}>
      <header className={styles.Header}>
        <div className={styles.HeaderBar}>
          <ArrowLeft type={'button'} onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))} />
          <span>
            {currentStepIdx + 1}/{Steps.length}
          </span>
        </div>
        <h2>{currentStep.title({ name })}</h2>
        {currentStep.description && <small className={styles.Description}>{currentStep.description()}</small>}
      </header>
      <main className={styles.Main}>{currentStep.form}</main>
      <footer className={styles.Footer}>
        <Button
          variant={'filled'}
          widthType={'fill'}
          color={'primary'}
          onClick={() => setCurrentStep((prev) => Math.min(prev + 1, Steps.length - 1))}
        >
          다음
        </Button>
      </footer>
    </div>
  );
};
