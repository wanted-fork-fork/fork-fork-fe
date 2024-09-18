import styles from './ReligionForm.module.css';
import { RadioList, RadioMeta } from 'src/shared/ui/RadioList/RadioList';
import { useIdealPartnerStore } from 'src/entities/ideal_partner/model/idealPartnerStore';
import { ReligionReligionCategory } from 'src/types';
import { DistributedOmit } from '../../../shared/types/distributedOmit';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

const religionRadioMeta: DistributedOmit<RadioMeta<ReligionReligionCategory>, 'name'>[] = [
  { key: 'IRRELIGION', allowInput: false },
  { key: 'CHRISTIANITY', allowInput: false },
  { key: 'BUDDHISM', allowInput: false },
  { key: 'CATHOLICISM', allowInput: false },
  { key: 'ETC', allowInput: true, placeholder: '종교를 입력해주세요.' },
];

export const ReligionForm = () => {
  const religionCategory = useIdealPartnerStore((state) => state.religion.religionCategory);
  const religionName = useIdealPartnerStore((state) => state.religion.religionName);
  const setReligionCategory = useIdealPartnerStore((state) => state.setReligionCategory);
  const setReligionName = useIdealPartnerStore((state) => state.setReligionName);

  const { t } = useTranslation();
  const meta = useMemo(
    () =>
      religionRadioMeta.map((m) => ({
        ...m,
        name: t(`RELIGION_${m.key}`),
      })),
    [t],
  );

  return (
    <section className={styles.Container}>
      <RadioList
        radioMetaList={meta}
        selected={religionCategory}
        onSelect={setReligionCategory}
        inputValue={religionName}
        onChangeInputValue={setReligionName}
      />
    </section>
  );
};
