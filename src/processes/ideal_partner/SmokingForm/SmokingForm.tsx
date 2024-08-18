import styles from './SmokingForm.module.css';
import { RadioList, RadioMeta } from 'src/shared/ui/RadioList/RadioList';
import { useIdealPartnerStore } from 'src/entities/ideal_partner/model/idealPartnerStore';
import { SmokingSmokingCategory } from 'src/types';

const smokingRadioMeta: RadioMeta<SmokingSmokingCategory>[] = [
  { key: 'SMOKER', name: '상관 없어요', allowInput: false },
  { key: 'NON_SMOKER', name: '절대 안돼!', allowInput: false },
  { key: 'ETC', name: '기타', allowInput: true, placeholder: '기타 의견을 입력해주세요.' },
];

export const SmokingForm = () => {
  const smokingCategory = useIdealPartnerStore((state) => state.smoking.smokingCategory);
  const smokingAmount = useIdealPartnerStore((state) => state.smoking.smokingAmount);
  const setSmokingCategory = useIdealPartnerStore((state) => state.setSmokingCategory);
  const setSmokingAmount = useIdealPartnerStore((state) => state.setSmokingAmount);

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
