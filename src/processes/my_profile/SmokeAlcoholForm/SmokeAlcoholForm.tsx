import { Input } from 'src/shared/ui/Input/Input';
import styles from './SmokeAlcoholForm.module.css';
import { RadioList, RadioMeta } from 'src/shared/ui/RadioList/RadioList';
import { useMyProfileStore } from 'src/entities/profile/model/myProfileStore';

const SmokeTypeList = ['NO', 'YES', 'ETC'];
type SmokeType = (typeof SmokeTypeList)[number];
const SmokeMetaList: RadioMeta<SmokeType>[] = [
  { key: 'NO', name: '안합니다', allowInput: false },
  { key: 'YES', name: '합니다', allowInput: false },
  { key: 'ETC', name: '기타', allowInput: true, placeholder: '담배는 언제 피는 편인가요?' },
];

export const SmokeAlcoholForm = () => {
  const drinking = useMyProfileStore((state) => state.drinking);
  const setDrinking = useMyProfileStore((state) => state.setDrinking);
  const smoking = useMyProfileStore((state) => state.smoking);
  const setSmoking = useMyProfileStore((state) => state.setSmoking);
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
        <RadioList radioMetaList={SmokeMetaList} selected={smoking} onSelect={setSmoking} />
      </fieldset>
    </section>
  );
};
