import { Radio } from 'src/shared/ui/Radio/Radio';
import { RadioWithInput } from 'src/shared/ui/RadioWithInput/RadioWithInput';
import styles from './ReligionForm.module.css';
import { useState } from 'react';

const ReligionTypeList = ['NONE', 'CHRISTIAN', 'BUDDHISM', 'CATHOLIC', 'WON_BUDDHISM', 'ETC'];
type ReligionType = (typeof ReligionTypeList)[number];
const ReligionMetaMap: Record<ReligionType, { name: string; allowInput: boolean; placeholder?: string }> = {
  NONE: { name: '무교', allowInput: false },
  CHRISTIAN: { name: '기독교', allowInput: false },
  BUDDHISM: { name: '불교', allowInput: false },
  CATHOLIC: { name: '천주교', allowInput: false },
  WON_BUDDHISM: { name: '원불교', allowInput: false },
  ETC: { name: '기타(기타 선택 시 직접 입력)', allowInput: true, placeholder: '종교를 입력해주세요.' },
} as const;

export const ReligionForm = () => {
  const [selected, setSelected] = useState<ReligionType | null>(null);
  return (
    <section className={styles.Container} role={'radiogroup'}>
      <div>
        <p className={styles.Label}>아니오,</p>
        <Radio label={'무교'} checked={selected === 'NONE'} onChange={() => setSelected('NONE')} />
      </div>
      <div>
        <p className={styles.Label}>네! 저는..</p>
        {ReligionTypeList.slice(1).map((type) =>
          ReligionMetaMap[type].allowInput ? (
            <RadioWithInput
              key={type}
              value={type}
              checked={selected === type}
              label={ReligionMetaMap[type].name}
              inputPlaceholder={ReligionMetaMap[type].placeholder}
              onChange={() => setSelected(type)}
            />
          ) : (
            <Radio
              key={type}
              value={type}
              checked={selected === type}
              label={ReligionMetaMap[type].name}
              onChange={() => setSelected(type)}
            />
          ),
        )}
      </div>
    </section>
  );
};
