import { Radio } from 'src/shared/ui/Radio/Radio';
import { useState } from 'react';
import styles from './MbtiForm.module.css';

type MbtiKey = 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P';
export const MbtiForm = () => {
  const [eiState, setEiState] = useState<'E' | 'I' | null>(null);
  const [snState, setSnState] = useState<'S' | 'N' | null>(null);
  const [tfState, setTfState] = useState<'T' | 'F' | null>(null);
  const [jpState, setJpState] = useState<'J' | 'P' | null>(null);
  const [skipState, setSkipState] = useState<boolean>(false);

  const onClickSkip = () => {
    setSkipState(true);
    setEiState(null);
    setSnState(null);
    setTfState(null);
    setJpState(null);
  };

  const onClickMbti = (key: MbtiKey) => {
    setSkipState(false);
    switch (key) {
      case 'E':
      case 'I':
        setEiState(key);
        break;
      case 'S':
      case 'N':
        setSnState(key);
        break;
      case 'T':
      case 'F':
        setTfState(key);
        break;
      case 'J':
      case 'P':
        setJpState(key);
        break;
    }
  };

  const isBlank = !(eiState || snState || tfState || jpState);

  return (
    <section className={styles.Container}>
      <div className={styles.RadioContainer}>
        <Radio label={'입력 안 함'} checked={skipState} onChange={onClickSkip} />
      </div>
      <div className={styles.MbtiResult} data-blank={isBlank}>
        {eiState}
        {snState}
        {tfState}
        {jpState}
      </div>
      <div className={styles.MbtiGrid}>
        <div className={styles.MbtiRow} role={'listbox'}>
          <MbtiButton value={'E'} selected={eiState === 'E'} onClick={onClickMbti} />
          <MbtiButton value={'I'} selected={eiState === 'I'} onClick={onClickMbti} />
        </div>
        <div className={styles.MbtiRow} role={'listbox'}>
          <MbtiButton value={'S'} selected={snState === 'S'} onClick={onClickMbti} />
          <MbtiButton value={'N'} selected={snState === 'N'} onClick={onClickMbti} />
        </div>
        <div className={styles.MbtiRow} role={'listbox'}>
          <MbtiButton value={'T'} selected={tfState === 'T'} onClick={onClickMbti} />
          <MbtiButton value={'F'} selected={tfState === 'F'} onClick={onClickMbti} />
        </div>
        <div className={styles.MbtiRow} role={'listbox'}>
          <MbtiButton value={'J'} selected={jpState === 'J'} onClick={onClickMbti} />
          <MbtiButton value={'P'} selected={jpState === 'P'} onClick={onClickMbti} />
        </div>
      </div>
    </section>
  );
};

const MbtiButton = ({ value, selected, onClick }: { value: MbtiKey; selected: boolean; onClick: (value: MbtiKey) => void }) => {
  return (
    <button className={styles.MbtiButton} role={'option'} aria-selected={selected} onClick={() => onClick(value)}>
      {value}
    </button>
  );
};
