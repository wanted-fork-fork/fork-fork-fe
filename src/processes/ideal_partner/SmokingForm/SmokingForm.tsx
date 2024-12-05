import styles from './SmokingForm.module.css';
import { RadioList, RadioMeta } from 'src/shared/ui/RadioList/RadioList';
import { useIdealPartnerStore } from 'src/entities/ideal_partner/model/idealPartnerStore';
import { SmokingSmokingCategory } from 'src/types';
import { DistributedOmit } from '../../../shared/types/distributedOmit';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import { useIdealPartnerFormProcessStore } from '../_store/idealPartnerFormProcessStore';

const smokingRadioMeta: DistributedOmit<RadioMeta<SmokingSmokingCategory>, 'name'>[] = [
  { key: 'SMOKER', allowInput: false },
  { key: 'NON_SMOKER', allowInput: false },
  { key: 'ETC', allowInput: true, placeholder: '기타 의견을 입력해주세요.' },
];

export const SmokingForm = () => {
  const smokingCategory = useIdealPartnerStore((state) => state.smoking.smokingCategory);
  const smokingAmount = useIdealPartnerStore((state) => state.smoking.smokingAmount);
  const setSmokingCategory = useIdealPartnerStore((state) => state.setSmokingCategory);
  const setSmokingAmount = useIdealPartnerStore((state) => state.setSmokingAmount);

  const addTouchedStep = useIdealPartnerFormProcessStore((state) => state.addTouchedStep);
  const touchedSteps = useIdealPartnerFormProcessStore((state) => state.touchedSteps);

  const onSelect = (category: SmokingSmokingCategory) => {
    setSmokingCategory(category);
    addTouchedStep('IDEAL_SMOKING');
  };

  const { t } = useTranslation();
  const meta = useMemo(
    () =>
      smokingRadioMeta.map((m) => ({
        ...m,
        name: t(`IDEAL_SMOKING_${m.key}`),
      })),
    [t],
  );

  return (
    <section className={styles.Container}>
      <RadioList
        radioMetaList={meta}
        selected={touchedSteps.has('IDEAL_SMOKING') ? smokingCategory : null}
        onSelect={onSelect}
        inputValue={smokingAmount}
        onChangeInputValue={setSmokingAmount}
      />
    </section>
  );
};
