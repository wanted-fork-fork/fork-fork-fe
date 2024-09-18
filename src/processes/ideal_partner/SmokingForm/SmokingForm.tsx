import styles from './SmokingForm.module.css';
import { RadioList, RadioMeta } from 'src/shared/ui/RadioList/RadioList';
import { useIdealPartnerStore } from 'src/entities/ideal_partner/model/idealPartnerStore';
import { SmokingSmokingCategory } from 'src/types';
import { DistributedOmit } from '../../../shared/types/distributedOmit';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';

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

  const { t } = useTranslation();
  const meta = useMemo(
    () =>
      smokingRadioMeta.map((m) => ({
        ...m,
        name: t(`SMOKING_${m.key}`),
      })),
    [t],
  );

  return (
    <section className={styles.Container}>
      <RadioList
        radioMetaList={meta}
        selected={smokingCategory}
        onSelect={setSmokingCategory}
        inputValue={smokingAmount}
        onChangeInputValue={setSmokingAmount}
      />
    </section>
  );
};
