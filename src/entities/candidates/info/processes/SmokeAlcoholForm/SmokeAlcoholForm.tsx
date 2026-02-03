import styles from 'src/entities/candidates/info/processes/SmokeAlcoholForm/SmokeAlcoholForm.module.css';
import { RadioList, RadioMeta } from 'src/shared/ui/RadioList/RadioList';
import { DistributedOmit } from 'src/shared/types/distributedOmit';
import { useTranslation } from 'react-i18next';
import { useMemo, useState } from 'react';
import { useMyProfileFormProcessStore } from 'src/entities/candidates/info/processes/_store/myProfileFormProcessStore';
import { UserInfoDrinkingDrinkingCategory, UserInfoSmokingSmokingCategory } from 'src/types';
import { useMyProfileStore } from 'src/entities/candidates/info/models/myProfileStore';

const smokingRadioMeta: DistributedOmit<RadioMeta<UserInfoSmokingSmokingCategory>, 'name'>[] = [
  { key: 'NON_SMOKER', allowInput: false },
  { key: 'SMOKER', allowInput: false },
  { key: 'ETC', allowInput: true, placeholder: '기타 의견을 입력해주세요.' },
];

const drinkingRadioMeta: DistributedOmit<RadioMeta<UserInfoDrinkingDrinkingCategory>, 'name'>[] = [
  { key: 'NON_DRINKER', allowInput: false },
  { key: 'DRINKER', allowInput: true, placeholder: '빈도는 어떻게 되시나요?' },
];

export const SmokeAlcoholForm = () => {
  const touchedSteps = useMyProfileFormProcessStore((state) => state.touchedSteps);
  const addTouchedStep = useMyProfileFormProcessStore((state) => state.addTouchedStep);

  const [touchedDrinking, setTouchedDrinking] = useState(() => touchedSteps.has('PROFILE_SMOKE_ALCOHOL'));
  const [touchedSmoking, setTouchedSmoking] = useState(() => touchedSteps.has('PROFILE_SMOKE_ALCOHOL'));

  const drinkingCategory = useMyProfileStore((state) => state.drinking.drinkingCategory);
  const drinkingAmount = useMyProfileStore((state) => state.drinking.drinkingAmount);
  const setDrinkingCategory = useMyProfileStore((state) => state.setDrinkingCategory);
  const setDrinkingAmount = useMyProfileStore((state) => state.setDrinkingAmount);

  const smokingCategory = useMyProfileStore((state) => state.smoking.smokingCategory);
  const smokingAmount = useMyProfileStore((state) => state.smoking.smokingAmount);
  const setSmokingCategory = useMyProfileStore((state) => state.setSmokingCategory);
  const setSmokingAmount = useMyProfileStore((state) => state.setSmokingAmount);

  const { t } = useTranslation();
  const meta = useMemo(
    () =>
      smokingRadioMeta.map((m) => ({
        ...m,
        name: t(`INFO_SMOKING_${m.key}`),
      })),
    [t],
  );
  const drinkingMeta = useMemo(
    () =>
      drinkingRadioMeta.map((m) => ({
        ...m,
        name: t(`INFO_DRINKING_${m.key}`),
      })),
    [t],
  );

  const onSelectDrinking = (category: UserInfoDrinkingDrinkingCategory) => {
    setDrinkingCategory(category);
    setTouchedDrinking(true);
    addTouchedStep('PROFILE_SMOKE_ALCOHOL');
  };

  const onSelectSmoking = (category: UserInfoSmokingSmokingCategory) => {
    setSmokingCategory(category);
    setTouchedSmoking(true);
    addTouchedStep('PROFILE_SMOKE_ALCOHOL');
  };

  return (
    <section className={styles.Container}>
      <fieldset>
        <legend className={`strong ${styles.Legend}`}>음주 여부</legend>
        <RadioList
          radioMetaList={drinkingMeta}
          selected={touchedDrinking ? drinkingCategory : null}
          onSelect={onSelectDrinking}
          inputValue={drinkingAmount}
          onChangeInputValue={setDrinkingAmount}
        />
      </fieldset>
      <fieldset>
        <legend className={`strong ${styles.Legend}`}>흡연 여부</legend>
        <RadioList
          radioMetaList={meta}
          selected={touchedSmoking ? smokingCategory : null}
          inputValue={smokingAmount}
          onSelect={onSelectSmoking}
          onChangeInputValue={setSmokingAmount}
        />
      </fieldset>
    </section>
  );
};
