import styles from './DrinkingForm.module.css';
import { RadioList, RadioMeta } from 'src/shared/ui/RadioList/RadioList';
import { useIdealPartnerStore } from 'src/entities/ideal_partner/model/idealPartnerStore';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import { DistributedOmit } from '../../../shared/types/distributedOmit';
import { useIdealPartnerFormProcessStore } from '../_store/idealPartnerFormProcessStore';
import { IdealPartnerDrinkingDrinkingCategory } from 'src/types';

const drinkingRadioMeta: DistributedOmit<RadioMeta<IdealPartnerDrinkingDrinkingCategory>, 'name'>[] = [
  { key: 'NO_PROBLEM', allowInput: false },
  { key: 'ONE_TWO_TIMES_A_WEEK', allowInput: false },
  { key: 'ONE_TWO_TIMES_A_MONTH', allowInput: false },
  { key: 'NEVER', allowInput: false },
  { key: 'ETC', allowInput: true, placeholder: '기타 의견을 입력해주세요.' },
];

export const DrinkingForm = () => {
  const drinkingCategory = useIdealPartnerStore((state) => state.drinking.drinkingCategory);
  const drinkingAmount = useIdealPartnerStore((state) => state.drinking.drinkingAmount);
  const setDrinkingCategory = useIdealPartnerStore((state) => state.setDrinkingCategory);
  const setDrinkingAmount = useIdealPartnerStore((state) => state.setDrinkingAmount);

  const addTouchedStep = useIdealPartnerFormProcessStore((state) => state.addTouchedStep);
  const touchedSteps = useIdealPartnerFormProcessStore((state) => state.touchedSteps);

  const onSelect = (category: IdealPartnerDrinkingDrinkingCategory) => {
    setDrinkingCategory(category);
    addTouchedStep('IDEAL_DRINKING');
  };

  const { t } = useTranslation();
  const meta = useMemo(
    () =>
      drinkingRadioMeta.map((meta) => ({
        ...meta,
        name: t(`DRINKING_${meta.key}`),
      })),
    [t],
  );

  return (
    <section className={styles.Container}>
      <RadioList
        radioMetaList={meta}
        selected={touchedSteps.has('IDEAL_DRINKING') ? drinkingCategory : null}
        onSelect={onSelect}
        inputValue={drinkingAmount}
        onChangeInputValue={setDrinkingAmount}
      />
    </section>
  );
};
