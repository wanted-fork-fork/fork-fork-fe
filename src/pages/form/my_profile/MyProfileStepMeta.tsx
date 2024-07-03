import { StepMeta } from 'src/shared/types/FormStepMeta';
import { PersonalInfoForm } from 'src/processes/my_profile/PersonalInfoForm/PersonalInfoForm';
import { isValidDate } from 'src/shared/vo/date';
import { MyImageForm } from 'src/processes/my_profile/MyImageForm/MyImageForm';
import { MbtiForm } from 'src/processes/my_profile/MbtiForm/MbtiForm';
import { JobForm } from 'src/processes/my_profile/JobForm/JobForm';
import { LocationForm } from 'src/processes/my_profile/LocationForm/LocationForm';
import { ReligionForm } from 'src/processes/my_profile/ReligionForm/ReligionForm';
import { HobbyForm } from 'src/processes/my_profile/HobbyForm/HobbyForm';
import { SmokeAlcoholForm } from 'src/processes/my_profile/SmokeAlcoholForm/SmokeAlcoholForm';
import { IntroduceForm } from 'src/processes/my_profile/IntroduceForm/IntroduceForm';

export const MyProfileStepMeta: Record<string, StepMeta> = {
  PERSONAL_INFO: {
    title: () => (
      <>
        당신에 대해 알려주세요!
        <br />
        이름이 어떻게 되시나요?
      </>
    ),
    form: <PersonalInfoForm />,
    canGoNext: (state) => Boolean(state.name && state.gender && isValidDate(state.birthDate) && state.height),
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
    canGoNext: (state) => state.images.length > 0,
  },
  MBTI: {
    title: ({ name }) => <>{name}님의 MBTI를 알려주세요.</>,
    description: () => '해당하는 MBTI를 한 개씩 선택해주세요.',
    form: <MbtiForm />,
    canGoNext: (state) => Boolean(state.mbti),
  },
  JOB: {
    title: ({ name }) => <>{name}님은 현재 어떤 일을 하시나요?</>,
    form: <JobForm />,
    canGoNext: (state) => Boolean(state.job.jobCategory),
  },
  LOCATION: {
    title: ({ name }) => <>{name}님이 주로 계시는 지역은 어디인가요?</>,
    description: () => '집, 직장 등 오래 머무르는 지역 최대 5곳을 선택해주세요.',
    form: <LocationForm />,
    canGoNext: (state) => state.location.length > 0,
  },
  RELIGION: {
    title: () => <>종교는 있으신가요?</>,
    form: <ReligionForm />,
    canGoNext: (state) => Boolean(state.religion.religionCategory),
  },
  HOBBY: {
    title: ({ name }) => <>{name}님의 취미는 무엇인가요?</>,
    description: () => '선택지에 없다면 직접 추가도 가능해요.',
    form: <HobbyForm />,
    canGoNext: () => true,
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
    canGoNext: (state) => Boolean(state.drinking && state.smoking),
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
    canGoNext: (state) => Boolean(state.introduction),
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
    canGoNext: () => true,
  },
};
