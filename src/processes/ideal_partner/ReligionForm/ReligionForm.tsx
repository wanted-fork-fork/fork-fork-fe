import styles from './ReligionForm.module.css';
import { RadioList, RadioMeta } from 'src/shared/ui/RadioList/RadioList';
import { useIdealPartnerStore } from 'src/entities/ideal_partner/model/idealPartnerStore';
import { ReligionReligionCategory } from 'src/types';

const religionRadioMeta: RadioMeta<ReligionReligionCategory>[] = [
  // { key: '', name: '무교', allowInput: false },
  { key: 'CHRISTIANITY', name: '기독교', allowInput: false },
  { key: 'BUDDHISM', name: '불교', allowInput: false },
  { key: 'CATHOLICISM', name: '천주교', allowInput: false },
  { key: 'ETC', name: '기타(기타 선택 시 직접 입력)', allowInput: true, placeholder: '종교를 입력해주세요.' },
];

export const ReligionForm = () => {
  const religionCategory = useIdealPartnerStore((state) => state.religion.religionCategory);
  const religionName = useIdealPartnerStore((state) => state.religion.religionName);
  const setReligionCategory = useIdealPartnerStore((state) => state.setReligionCategory);
  const setReligionName = useIdealPartnerStore((state) => state.setReligionName);

  return (
    <section className={styles.Container}>
      <RadioList
        radioMetaList={religionRadioMeta}
        selected={religionCategory}
        onSelect={setReligionCategory}
        inputValue={religionName}
        onChangeInputValue={setReligionName}
      />
    </section>
  );
};
