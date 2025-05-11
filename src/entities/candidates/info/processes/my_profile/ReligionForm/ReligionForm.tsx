import { Radio } from 'src/shared/ui/Radio/Radio';
import styles from 'src/entities/candidates/info/processes/my_profile/ReligionForm/ReligionForm.module.css';
import { RadioList, RadioMeta } from 'src/shared/ui/RadioList/RadioList';
import { ReligionReligionCategory } from 'src/types';
import { DistributedOmit } from 'src/shared/types/distributedOmit';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import { useMyProfileFormProcessStore } from 'src/entities/candidates/info/processes/my_profile/_store/myProfileFormProcessStore';
import { useMyProfileStore } from 'src/entities/candidates/info/entities/models/myProfileStore';

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

  const addTouchedStep = useMyProfileFormProcessStore((state) => state.addTouchedStep);
  const touchedSteps = useMyProfileFormProcessStore((state) => state.touchedSteps);

  const onSelect = (category: ReligionReligionCategory) => {
    setReligionCategory(category);
    addTouchedStep('PROFILE_RELIGION');
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
          selected={touchedSteps.has('PROFILE_RELIGION') ? religionCategory : null}
          onSelect={onSelect}
          inputValue={religionName}
          onChangeInputValue={setReligionName}
        />
      </div>
    </section>
  );
};
