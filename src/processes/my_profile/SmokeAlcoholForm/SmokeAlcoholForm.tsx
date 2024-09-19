import { Input } from 'src/shared/ui/Input/Input';
import styles from './SmokeAlcoholForm.module.css';
import { RadioList, RadioMeta } from 'src/shared/ui/RadioList/RadioList';
import { useMyProfileStore } from 'src/entities/profile/model/myProfileStore';
import { SmokingSmokingCategory } from 'src/types';
import { DistributedOmit } from '../../../shared/types/distributedOmit';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';

const smokingRadioMeta: DistributedOmit<RadioMeta<SmokingSmokingCategory>, 'name'>[] = [
  { key: 'SMOKER', allowInput: false },
  { key: 'NON_SMOKER', allowInput: false },
  { key: 'ETC', allowInput: true, placeholder: '기타 의견을 입력해주세요.' },
];

export const SmokeAlcoholForm = () => {
  const drinking = useMyProfileStore((state) => state.drinking);
  const setDrinking = useMyProfileStore((state) => state.setDrinking);
  const smokingCategory = useMyProfileStore((state) => state.smoking.smokingCategory);
  const smokingAmount = useMyProfileStore((state) => state.smoking.smokingAmount);
  const setSmokingCategory = useMyProfileStore((state) => state.setSmokingCategory);
  const setSmokingAmount = useMyProfileStore((state) => state.setSmokingAmount);

  const { t } = useTranslation();
  const meta = useMemo(
    () =>
      smokingRadioMeta.map((m) => ({
        ...m,
        name: t(`INFO_SMOKING_${m.key}`),
      })),
    [t],
  );

  return (
    <section className={styles.Container}>
      <fieldset>
        <legend className={`strong ${styles.Legend}`}>술자리 빈도</legend>
        <Input
          placeholder={'ex. 가볍게 주 2회, 친구들과 주 1회, 회식 매 달 1회...'}
          value={drinking}
          onChange={(e) => setDrinking(e.target.value)}
        />
      </fieldset>
      <fieldset>
        <legend className={`strong ${styles.Legend}`}>흡연 여부</legend>
        <RadioList
          radioMetaList={meta}
          selected={smokingCategory}
          inputValue={smokingAmount}
          onSelect={setSmokingCategory}
          onChangeInputValue={setSmokingAmount}
        />
      </fieldset>
    </section>
  );
};
