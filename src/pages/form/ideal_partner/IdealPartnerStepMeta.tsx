import { StepMeta } from 'src/shared/types/FormStepMeta';
import { AgeForm } from 'src/entities/candidates/ideal_partner/processes/ideal_partner/AgeForm/AgeForm';
import { HeightStyleForm } from 'src/entities/candidates/ideal_partner/processes/ideal_partner/HeightStyleForm/HeightStyleForm';
import { LocationForm } from 'src/entities/candidates/ideal_partner/processes/ideal_partner/LocationForm/LocationForm';
import { HobbyForm } from 'src/entities/candidates/ideal_partner/processes/ideal_partner/HobbyForm/HobbyForm';
import { ReligionForm } from 'src/entities/candidates/ideal_partner/processes/ideal_partner/ReligionForm/ReligionForm';
import { DrinkingForm } from 'src/entities/candidates/ideal_partner/processes/ideal_partner/DrinkingForm/DrinkingForm';
import { SmokingForm } from 'src/entities/candidates/ideal_partner/processes/ideal_partner/SmokingForm/SmokingForm';
import { RequiredOptionForm } from 'src/entities/candidates/ideal_partner/processes/ideal_partner/RequiredOptionForm/RequiredOptionForm';
import { ToMatcherForm } from 'src/entities/candidates/ideal_partner/processes/ideal_partner/ToMatcherForm/ToMatcherForm';
import {
  IdealPartner,
  REQUIRED_OPTION_MAX_COUNT,
} from 'src/entities/candidates/ideal_partner/entities/models/idealPartnerStore';

export const IdealPartnerStepMeta = {
  IDEAL_AGE: {
    title: () => <>선호하는 연령대가 있나요?</>,
    description: () => <></>,
    form: () => <AgeForm />,
    canGoNext: (state) => (state.ageRange ? Boolean(state.ageRange.max && state.ageRange.min) : true),
    shortcutTitle: '선호하는 연령대',
  },
  IDEAL_HEIGHT_STYLE: {
    title: () => <>이상형을 볼 때 외모가 중요한가요?</>,
    description: () => <></>,
    form: () => <HeightStyleForm />,
    canGoNext: (state) => (state.heightRange ? Boolean(state.heightRange.min && state.heightRange.max) : true),
    shortcutTitle: '선호하는 키, 스타일',
  },
  IDEAL_LOCATION: {
    title: ({ name }) => (
      <>
        {name}님의 주 활동 지역과
        <br />
        가까이 계신 분을 선호하시나요?
      </>
    ),
    description: () => <></>,
    form: () => <LocationForm />,
    canGoNext: (_, checkTouched) => checkTouched?.('IDEAL_LOCATION') ?? true,
    shortcutTitle: '상대방이 주로 머무는 지역',
  },
  IDEAL_HOBBY: {
    title: () => (
      <>
        상대방과 취미생활이
        <br />
        비슷한 것을 선호하시나요?
      </>
    ),
    description: () => <></>,
    form: () => <HobbyForm />,
    canGoNext: (_, checkTouched) => checkTouched?.('IDEAL_HOBBY') ?? true,
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
