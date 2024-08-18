import styles from './DrinkingForm.module.css';
import { RadioList, RadioMeta } from 'src/shared/ui/RadioList/RadioList';
import { useIdealPartnerStore } from 'src/entities/ideal_partner/model/idealPartnerStore';
import { DrinkingDrinkingCategory } from 'src/types';

const drinkingRadioMeta: RadioMeta<DrinkingDrinkingCategory>[] = [
  { key: 'NO_PROBLEM', name: '상관 없어요', allowInput: false },
  { key: 'ONE_TWO_TIMES_A_WEEK', name: '주 1-2회 가볍게는 괜찮아요', allowInput: false },
  { key: 'ONE_TWO_TIMES_A_MONTH', name: '달 1-2회 정도 괜찮아요', allowInput: false },
  { key: 'NEVER', name: '되도록 안하면 좋겠어요', allowInput: false },
  { key: 'ETC', name: '기타', allowInput: true, placeholder: '기타 의견을 입력해주세요.' },
];

export const DrinkingForm = () => {
  const drinkingCategory = useIdealPartnerStore((state) => state.drinking.drinkingCategory);
  const drinkingAmount = useIdealPartnerStore((state) => state.drinking.drinkingAmount);
  const setDrinkingCategory = useIdealPartnerStore((state) => state.setDrinkingCategory);
  const setDrinkingAmount = useIdealPartnerStore((state) => state.setDrinkingAmount);

  return (
    <section className={styles.Container}>
      <RadioList
        radioMetaList={drinkingRadioMeta}
        selected={drinkingCategory}
        onSelect={setDrinkingCategory}
        inputValue={drinkingAmount}
        onChangeInputValue={setDrinkingAmount}
      />
    </section>
  );
};
