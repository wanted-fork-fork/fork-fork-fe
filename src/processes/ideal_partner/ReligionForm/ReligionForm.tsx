import styles from './ReligionForm.module.css';
import { RadioList, RadioMeta } from 'src/shared/ui/RadioList/RadioList';
import { useIdlePartnerStore } from 'src/entities/ideal_partner/model/idealPartnerStore';

const religionRadioMeta: RadioMeta<string>[] = [
  { key: 'A', name: '무교', allowInput: false },
  { key: 'B', name: '기독교', allowInput: false },
  { key: 'C', name: '불교', allowInput: false },
  { key: 'D', name: '천주교', allowInput: false },
  { key: 'ETC', name: '기타(기타 선택 시 직접 입력)', allowInput: true, placeholder: '종교를 입력해주세요.' },
];

export const ReligionForm = () => {
  const religionCategory = useIdlePartnerStore((state) => state.religion.religionCategory);
  const religionName = useIdlePartnerStore((state) => state.religion.religionName);
  const setReligionCategory = useIdlePartnerStore((state) => state.setReligionCategory);
  const setReligionName = useIdlePartnerStore((state) => state.setReligionName);

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
