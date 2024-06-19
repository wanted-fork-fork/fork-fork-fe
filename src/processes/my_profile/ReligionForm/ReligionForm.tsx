import { Radio } from 'src/shared/ui/Radio/Radio';
import styles from './ReligionForm.module.css';
import { useState } from 'react';
import { RadioList, RadioMeta } from 'src/shared/ui/RadioList/RadioList';
import { ReligionType } from 'src/entities/profile/types/profileSummary';

const ReligionMetaList: RadioMeta<ReligionType>[] = [
  { key: 'NONE', name: '무교', allowInput: false },
  { key: 'CHRISTIAN', name: '기독교', allowInput: false },
  { key: 'BUDDHISM', name: '불교', allowInput: false },
  { key: 'CATHOLIC', name: '천주교', allowInput: false },
  { key: 'WON_BUDDHISM', name: '원불교', allowInput: false },
  { key: 'ETC', name: '기타(기타 선택 시 직접 입력)', allowInput: true, placeholder: '종교를 입력해주세요.' },
];

export const ReligionForm = () => {
  const [selected, setSelected] = useState<ReligionType | null>(null);
  const [inputValue, setInputValue] = useState<string>('');

  return (
    <section className={styles.Container} role={'radiogroup'}>
      <div>
        <p className={styles.Label}>아니오,</p>
        <Radio
          value={ReligionMetaList[0].key}
          label={ReligionMetaList[0].name}
          checked={selected === ReligionMetaList[0].key}
          onChange={() => setSelected(ReligionMetaList[0].key)}
        />
      </div>
      <div>
        <p className={styles.Label}>네! 저는..</p>
        <RadioList
          radioMetaList={ReligionMetaList.slice(1)}
          selected={selected}
          onSelect={setSelected}
          inputValue={inputValue}
          onChangeInputValue={setInputValue}
        />
      </div>
    </section>
  );
};
