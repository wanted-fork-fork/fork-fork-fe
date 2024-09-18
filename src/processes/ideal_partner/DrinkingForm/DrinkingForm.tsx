import styles from './DrinkingForm.module.css';
import { RadioList, RadioMeta } from 'src/shared/ui/RadioList/RadioList';
import { useIdealPartnerStore } from 'src/entities/ideal_partner/model/idealPartnerStore';
import { DrinkingDrinkingCategory } from 'src/types';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import { DistributedOmit } from '../../../shared/types/distributedOmit';

const drinkingRadioMeta: DistributedOmit<RadioMeta<DrinkingDrinkingCategory>, 'name'>[] = [
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
        selected={drinkingCategory}
        onSelect={setDrinkingCategory}
        inputValue={drinkingAmount}
        onChangeInputValue={setDrinkingAmount}
      />
    </section>
  );
};
