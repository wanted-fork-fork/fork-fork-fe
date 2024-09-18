import { Radio } from 'src/shared/ui/Radio/Radio';
import styles from './ReligionForm.module.css';
import { RadioList, RadioMeta } from 'src/shared/ui/RadioList/RadioList';
import { useMyProfileStore } from 'src/entities/profile/model/myProfileStore';
import { ReligionReligionCategory } from 'src/types';
import { DistributedOmit } from '../../../shared/types/distributedOmit';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';

const religionRadioMeta: DistributedOmit<RadioMeta<ReligionReligionCategory>, 'name'>[] = [
  { key: 'IRRELIGION', allowInput: false },
  { key: 'CHRISTIANITY', allowInput: false },
  { key: 'BUDDHISM', allowInput: false },
  { key: 'CATHOLICISM', allowInput: false },
  { key: 'ETC', allowInput: true, placeholder: '종교를 입력해주세요.' },
];

export const ReligionForm = () => {
  const { religionCategory, religionName } = useMyProfileStore((state) => state.religion);
  const setReligionCategory = useMyProfileStore((state) => state.setReligionCategory);
  const setReligionName = useMyProfileStore((state) => state.setReligionName);

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
    <section className={styles.Container} role={'radiogroup'}>
      <div>
        <p className={styles.Label}>아니오,</p>
        <Radio
          value={meta[0].key}
          label={meta[0].name}
          checked={religionCategory === meta[0].key}
          onChange={() => setReligionCategory(meta[0].key)}
        />
      </div>
      <div>
        <p className={styles.Label}>네! 저는..</p>
        <RadioList
          radioMetaList={meta.slice(1)}
          selected={religionCategory}
          onSelect={setReligionCategory}
          inputValue={religionName}
          onChangeInputValue={setReligionName}
        />
      </div>
    </section>
  );
};
