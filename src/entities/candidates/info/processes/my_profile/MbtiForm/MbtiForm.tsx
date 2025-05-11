import { Radio } from 'src/shared/ui/Radio/Radio';
import { useEffect, useState } from 'react';
import styles from 'src/entities/candidates/info/processes/my_profile/MbtiForm/MbtiForm.module.css';
import {
  isValidMbti,
  MbtiFirstWord,
  MbtiFourthWord,
  MbtiKey,
  MbtiSecondWord,
  MbtiThirdWord,
} from 'src/entities/candidates/vo/mbti/mbti';
import { useMyProfileFormProcessStore } from 'src/entities/candidates/info/processes/my_profile/_store/myProfileFormProcessStore';
import { useMyProfileStore } from 'src/entities/candidates/info/entities/models/myProfileStore';

export const MbtiForm = () => {
  const mbti = useMyProfileStore((state) => state.mbti);
  const setMbti = useMyProfileStore((state) => state.setMbti);
  const addTouchedStep = useMyProfileFormProcessStore((state) => state.addTouchedStep);
  const hasTouchedStep = useMyProfileFormProcessStore((state) => state.hasTouchedStep);

  const [eiState, setEiState] = useState<MbtiFirstWord | null>(mbti?.[0] ?? null);
  const [snState, setSnState] = useState<MbtiSecondWord | null>(mbti?.[1] ?? null);
  const [tfState, setTfState] = useState<MbtiThirdWord | null>(mbti?.[2] ?? null);
  const [jpState, setJpState] = useState<MbtiFourthWord | null>(mbti?.[3] ?? null);
  const [skipState, setSkipState] = useState<boolean>(mbti === null);

  const isSkipChecked = skipState && hasTouchedStep('PROFILE_MBTI');

  const mbtiState = `${eiState ?? ''}${snState ?? ''}${tfState ?? ''}${jpState ?? ''}`;
  useEffect(() => {
    isValidMbti(mbtiState) ? setMbti(mbtiState) : setMbti(null);
  }, [mbtiState, setMbti]);

  const onClickSkip = () => {
    setSkipState(true);
    setEiState(null);
    setSnState(null);
    setTfState(null);
    setJpState(null);
    setMbti(null);
    addTouchedStep('PROFILE_MBTI');
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
        <Radio label={'입력 안 함'} checked={isSkipChecked} onChange={onClickSkip} />
      </div>
      <div className={styles.MbtiResult} data-blank={isBlank}>
        {mbtiState}
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

const MbtiButton = ({
  value,
  selected,
  onClick,
}: {
  value: MbtiKey;
  selected: boolean;
  onClick: (value: MbtiKey) => void;
}) => {
  return (
    <button className={styles.MbtiButton} role={'option'} aria-selected={selected} onClick={() => onClick(value)}>
      {value}
    </button>
  );
};
