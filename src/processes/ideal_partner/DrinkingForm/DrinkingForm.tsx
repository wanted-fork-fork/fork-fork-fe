import styles from './DrinkingForm.module.css';
import { RadioList, RadioMeta } from 'src/shared/ui/RadioList/RadioList';
import { useIdlePartnerStore } from 'src/entities/ideal_partner/model/idealPartnerStore';

const drinkingRadioMeta: RadioMeta<string>[] = [
  { key: 'A', name: '상관 없어요', allowInput: false },
  { key: 'B', name: '주 1-2회 가볍게는 괜찮아요', allowInput: false },
  { key: 'C', name: '달 1-2회 정도 괜찮아요', allowInput: false },
  { key: 'D', name: '되도록 안하면 좋겠어요', allowInput: false },
  { key: 'ETC', name: '기타', allowInput: true, placeholder: '기타 의견을 입력해주세요.' },
];

export const DrinkingForm = () => {
  const drinkingCategory = useIdlePartnerStore((state) => state.drinking.drinkingCategory);
  const drinkingAmount = useIdlePartnerStore((state) => state.drinking.drinkingAmount);
  const setDrinkingCategory = useIdlePartnerStore((state) => state.setDrinkingCategory);
  const setDrinkingAmount = useIdlePartnerStore((state) => state.setDrinkingAmount);

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
