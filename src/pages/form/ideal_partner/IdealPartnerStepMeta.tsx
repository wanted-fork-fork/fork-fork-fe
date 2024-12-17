import { StepMeta } from 'src/shared/types/FormStepMeta';
import { AgeForm } from 'src/processes/ideal_partner/AgeForm/AgeForm';
import { IdealPartner, REQUIRED_OPTION_MAX_COUNT } from 'src/entities/ideal_partner/model/idealPartnerStore';
import { HeightStyleForm } from 'src/processes/ideal_partner/HeightStyleForm/HeightStyleForm';
import { LocationForm } from 'src/processes/ideal_partner/LocationForm/LocationForm';
import { HobbyForm } from 'src/processes/ideal_partner/HobbyForm/HobbyForm';
import { ReligionForm } from 'src/processes/ideal_partner/ReligionForm/ReligionForm';
import { DrinkingForm } from 'src/processes/ideal_partner/DrinkingForm/DrinkingForm';
import { SmokingForm } from 'src/processes/ideal_partner/SmokingForm/SmokingForm';
import { RequiredOptionForm } from 'src/processes/ideal_partner/RequiredOptionForm/RequiredOptionForm';
import { ToMatcherForm } from 'src/processes/ideal_partner/ToMatcherForm/ToMatcherForm';

export const IdealPartnerStepMeta = {
  IDEAL_AGE: {
    title: () => <>선호하는 연령대는 어떻게 되나요?</>,
    description: () => <></>,
    form: () => <AgeForm />,
    canGoNext: (state) => Boolean(state.ageRange?.max && state.ageRange.min),
    shortcutTitle: '선호하는 연령대',
  },
  IDEAL_HEIGHT_STYLE: {
    title: () => <>선호하는 키와 스타일을 알려주세요</>,
    description: () => <></>,
    form: () => <HeightStyleForm />,
    canGoNext: (state) => Boolean(state.heightRange?.min && state.heightRange.max && state.style),
    shortcutTitle: '선호하는 키, 스타일',
  },
  IDEAL_LOCATION: {
    title: ({ name }) => (
      <>
        상대방이 어느 지역에 있어야
        <br />
        {name}님과 만나기 좋을까요?
      </>
    ),
    description: () => <></>,
    form: () => <LocationForm />,
    canGoNext: () => true,
    shortcutTitle: '상대방이 주로 머무는 지역',
  },
  IDEAL_HOBBY: {
    title: () => (
      <>
        상대방이 어떤 취미생활을 할 때<br />좀 더 관심이 갈 것 같나요?
      </>
    ),
    description: () => <></>,
    form: () => <HobbyForm />,
    canGoNext: (state) => Boolean(state.hobbies.length > 0),
    shortcutTitle: '상대방의 취미',
  },
  IDEAL_RELIGION: {
    title: () => <>상대방이 어떤 종교이길 희망하시나요?</>,
    description: () => <></>,
    form: () => <ReligionForm />,
    canGoNext: (state) =>
      state.religion.religionCategory &&
      (state.religion.religionCategory !== 'ETC' || Boolean(state.religion.religionName)),
    shortcutTitle: '종교',
  },
  IDEAL_DRINKING: {
    title: () => (
      <>
        상대방의 음주 빈도는
        <br />
        어디까지 이해할 수 있나요?
      </>
    ),
    description: () => <></>,
    form: () => <DrinkingForm />,
    canGoNext: (state) =>
      state.drinking.drinkingCategory &&
      (state.drinking.drinkingCategory !== 'ETC' || Boolean(state.drinking.drinkingAmount)),
    shortcutTitle: '상대방의 음주 빈도',
  },
  IDEAL_SMOKING: {
    title: () => <>상대방의 흡연은 괜찮으신가요?</>,
    description: () => <></>,
    form: () => <SmokingForm />,
    canGoNext: (state) =>
      state.smoking.smokingCategory &&
      (state.smoking.smokingCategory !== 'ETC' || Boolean(state.smoking.smokingAmount)),
    shortcutTitle: '상대방의 흡연 여부',
  },
  IDEAL_REQUIRED_OPTIONS: {
    title: () => (
      <>
        지금까지 입력한 것 중에서,
        <br />
        포기할 수 없는 조건이 있나요? (최대 {REQUIRED_OPTION_MAX_COUNT}개)
      </>
    ),
    description: () => <></>,
    form: () => <RequiredOptionForm />,
    canGoNext: (state) => Boolean(state.requiredOptions.length > 0),
    shortcutTitle: '필수 항목',
  },
  IDEAL_TO_MATCHER: {
    title: () => (
      <>
        주선자에게 추가로 말하고 싶은
        <br />
        내용이 있다면 입력해주세요.
      </>
    ),
    description: () => <></>,
    form: () => <ToMatcherForm />,
    canGoNext: () => true,
    shortcutTitle: '주선자에게 하고 싶은 말',
  },
} as const satisfies Record<string, StepMeta<IdealPartner>>;
