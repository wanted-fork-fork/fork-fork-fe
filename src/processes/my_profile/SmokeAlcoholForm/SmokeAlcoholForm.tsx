import styles from './SmokeAlcoholForm.module.css';
import { RadioList, RadioMeta } from 'src/shared/ui/RadioList/RadioList';
import { useMyProfileStore } from 'src/entities/profile/model/myProfileStore';
import { DistributedOmit } from '../../../shared/types/distributedOmit';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import { useMyProfileFormProcessStore } from '../_store/myProfileFormProcessStore';
import { UserInfoDrinkingDrinkingCategory, UserInfoSmokingSmokingCategory } from 'src/types';

const smokingRadioMeta: DistributedOmit<RadioMeta<UserInfoSmokingSmokingCategory>, 'name'>[] = [
  { key: 'SMOKER', allowInput: false },
  { key: 'NON_SMOKER', allowInput: false },
  { key: 'ETC', allowInput: true, placeholder: '기타 의견을 입력해주세요.' },
];

const drinkingRadioMeta: DistributedOmit<RadioMeta<UserInfoDrinkingDrinkingCategory>, 'name'>[] = [
  { key: 'DRINKER', allowInput: false },
  { key: 'NON_DRINKER', allowInput: false },
];

export const SmokeAlcoholForm = () => {
  const drinkingCategory = useMyProfileStore((state) => state.drinking.drinkingCategory);
  const setDrinkingCategory = useMyProfileStore((state) => state.setDrinkingCategory);
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

  const addTouchedStep = useMyProfileFormProcessStore((state) => state.addTouchedStep);
  const touchedSteps = useMyProfileFormProcessStore((state) => state.touchedSteps);

  const onSelectDrinking = (category: UserInfoDrinkingDrinkingCategory) => {
    setDrinkingCategory(category);
    addTouchedStep('PROFILE_SMOKE_ALCOHOL');
  };

  const onSelectSmoking = (category: UserInfoSmokingSmokingCategory) => {
    setSmokingCategory(category);
    addTouchedStep('PROFILE_SMOKE_ALCOHOL');
  };

  return (
    <section className={styles.Container}>
      <fieldset>
        <legend className={`strong ${styles.Legend}`}>음주 여부</legend>
        <RadioList
          radioMetaList={drinkingMeta}
          selected={touchedSteps.has('PROFILE_SMOKE_ALCOHOL') ? drinkingCategory : null}
          onSelect={onSelectDrinking}
        />
      </fieldset>{' '}
      <fieldset>
        <legend className={`strong ${styles.Legend}`}>흡연 여부</legend>
        <RadioList
          radioMetaList={meta}
          selected={touchedSteps.has('PROFILE_SMOKE_ALCOHOL') ? smokingCategory : null}
          inputValue={smokingAmount}
          onSelect={onSelectSmoking}
          onChangeInputValue={setSmokingAmount}
        />
      </fieldset>
    </section>
  );
};
