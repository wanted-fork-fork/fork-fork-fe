import { StepMeta } from 'src/shared/types/FormStepMeta';
import { AgeForm } from 'src/processes/ideal_partner/AgeForm/AgeForm';
import { IdealPartner } from 'src/entities/ideal_partner/model/idealPartnerStore';
import { HeightStyleForm } from 'src/processes/ideal_partner/HeightStyleForm/HeightStyleForm';
import { LocationForm } from 'src/processes/ideal_partner/LocationForm/LocationForm';
import { HobbyForm } from 'src/processes/ideal_partner/HobbyForm/HobbyForm';
import { ReligionForm } from 'src/processes/ideal_partner/ReligionForm/ReligionForm';
import { DrinkingForm } from 'src/processes/ideal_partner/DrinkingForm/DrinkingForm';
import { SmokingForm } from 'src/processes/ideal_partner/SmokingForm/SmokingForm';

export const IdealPartnerStepMeta: Record<string, StepMeta<IdealPartner>> = {
  AGE: {
    title: () => <>선호하는 연령대는 어떻게 되나요?</>,
    description: () => <></>,
    form: <AgeForm />,
    canGoNext: (state) => Boolean(state.ageRange.max && state.ageRange.min),
  },
  HEIGHT_STYLE: {
    title: () => <>선호하는 키와 스타일을 알려주세요</>,
    description: () => <></>,
    form: <HeightStyleForm />,
    canGoNext: (state) => Boolean(state.heightRange.min && state.heightRange.max && state.style),
  },
  LOCATION: {
    title: ({ name }) => (
      <>
        상대방이 어느 지역에 있어야
        <br />
        {name}님과 만나기 좋을까요?
      </>
    ),
    description: () => <></>,
    form: <LocationForm />,
    canGoNext: () => true,
  },
  HOBBY: {
    title: () => (
      <>
        상대방이 어떤 취미생활을 할 때<br />좀 더 관심이 갈 것 같나요?
      </>
    ),
    description: () => <></>,
    form: <HobbyForm />,
    canGoNext: (state) => Boolean(state.hobbies.length > 0),
  },
  RELIGION: {
    title: () => <>상대방이 어떤 종교이길 희망하시나요?</>,
    description: () => <></>,
    form: <ReligionForm />,
    canGoNext: (state) => Boolean(state.religion.religionCategory),
  },
  DRINKING: {
    title: () => (
      <>
        상대방의 음주 빈도는
        <br />
        어디까지 이해할 수 있나요?
      </>
    ),
    description: () => <></>,
    form: <DrinkingForm />,
    canGoNext: (state) => Boolean(state.drinking.drinkingCategory),
  },
  SMOKING: {
    title: () => <>상대방의 흡연은 괜찮으신가요?</>,
    description: () => <></>,
    form: <SmokingForm />,
    canGoNext: (state) => Boolean(state.smoking.smokingCategory),
  },
  REQUIRED_OPTIONS: {
    title: () => (
      <>
        지금까지 입력한 것 중에서,
        <br />
        포기할 수 없는 조건이 있나요? (최대 3개)
      </>
    ),
    description: () => <></>,
    form: <></>,
    canGoNext: (state) => Boolean(state.requiredOptions.length > 0),
  },
  TO_MATCHR: {
    title: () => (
      <>
        주선자에게 추가로 말하고 싶은
        <br />
        내용이 있다면 입력해주세요.
      </>
    ),
    description: () => <></>,
    form: <></>,
    canGoNext: (state) => Boolean(state.toMatchMaker),
  },
};
