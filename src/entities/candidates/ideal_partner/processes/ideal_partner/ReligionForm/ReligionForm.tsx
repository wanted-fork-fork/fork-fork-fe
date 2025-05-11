import styles from 'src/entities/candidates/ideal_partner/processes/ideal_partner/ReligionForm/ReligionForm.module.css';
import { RadioList, RadioMeta } from 'src/shared/ui/RadioList/RadioList';
import { ReligionReligionCategory } from 'src/types';
import { DistributedOmit } from 'src/shared/types/distributedOmit';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useIdealPartnerFormProcessStore } from 'src/entities/candidates/ideal_partner/processes/ideal_partner/_store/idealPartnerFormProcessStore';
import { useIdealPartnerStore } from 'src/entities/candidates/ideal_partner/entities/models/idealPartnerStore';

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

  const addTouchedStep = useIdealPartnerFormProcessStore((state) => state.addTouchedStep);
  const touchedSteps = useIdealPartnerFormProcessStore((state) => state.touchedSteps);

  const onSelect = (category: ReligionReligionCategory) => {
    setReligionCategory(category);
    addTouchedStep('IDEAL_RELIGION');
  };

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
        selected={touchedSteps.has('IDEAL_RELIGION') ? religionCategory : null}
        onSelect={onSelect}
        inputValue={religionName}
        onChangeInputValue={setReligionName}
      />
    </section>
  );
};
