import styles from './SmokingForm.module.css';
import { RadioList, RadioMeta } from 'src/shared/ui/RadioList/RadioList';
import { useIdlePartnerStore } from 'src/entities/ideal_partner/model/idealPartnerStore';

const smokingRadioMeta: RadioMeta<string>[] = [
  { key: 'A', name: '상관 없어요', allowInput: false },
  { key: 'B', name: '절대 안돼!', allowInput: false },
  { key: 'ETC', name: '기타', allowInput: true, placeholder: '기타 의견을 입력해주세요.' },
];

export const SmokingForm = () => {
  const smokingCategory = useIdlePartnerStore((state) => state.smoking.smokingCategory);
  const smokingAmount = useIdlePartnerStore((state) => state.smoking.smokingAmount);
  const setSmokingCategory = useIdlePartnerStore((state) => state.setSmokingCategory);
  const setSmokingAmount = useIdlePartnerStore((state) => state.setSmokingAmount);

  return (
    <section className={styles.Container}>
      <RadioList
        radioMetaList={smokingRadioMeta}
        selected={smokingCategory}
        onSelect={setSmokingCategory}
        inputValue={smokingAmount}
        onChangeInputValue={setSmokingAmount}
      />
    </section>
  );
};
