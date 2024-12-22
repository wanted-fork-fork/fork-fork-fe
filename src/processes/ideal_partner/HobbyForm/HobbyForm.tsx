import styles from './HobbyForm.module.css';
import { useIdealPartnerStore } from 'src/entities/ideal_partner/model/idealPartnerStore';
import { RadioList, RadioMeta } from 'src/shared/ui/RadioList/RadioList';
import { IdealPartnerRequestHobbies } from 'src/types';
import { useIdealPartnerFormProcessStore } from 'src/processes/ideal_partner/_store/idealPartnerFormProcessStore';
import { useProfileFirstName } from 'src/entities/profile/lib/useProfileFirstName';
import { useMyProfileStore } from 'src/entities/profile/model/myProfileStore';
import { Chip } from 'src/shared/ui/Chip/Chip';

const hobbyRadioMeta: RadioMeta<IdealPartnerRequestHobbies>[] = [
  { key: 'IMPORTANT', allowInput: false, name: '네, 취미 생활을 같이 하고싶어요.' },
  { key: 'NOT_IMPORTANT', allowInput: false, name: '상관없어요' },
];

export const HobbyForm = () => {
  const name = useProfileFirstName();
  const selectedHobbies = useMyProfileStore((state) => state.hobbies);

  const hobbies = useIdealPartnerStore((state) => state.hobbies);
  const setHobbies = useIdealPartnerStore((state) => state.setHobbies);
  const touchedSteps = useIdealPartnerFormProcessStore((state) => state.touchedSteps);
  const addTouchedStep = useIdealPartnerFormProcessStore((state) => state.addTouchedStep);

  const onSelect = (category: IdealPartnerRequestHobbies) => {
    setHobbies(category);
    addTouchedStep('IDEAL_HOBBY');
  };

  return (
    <>
      <section className={styles.Container}>
        <div>
          <small className={styles.Description}>{name}님이 선택하신 취미</small>
          <div className={styles.ChipWrapper}>
            {selectedHobbies.map((h) => (
              <Chip key={h.name}>{h.name}</Chip>
            ))}
          </div>
        </div>
        <div>
          <RadioList
            radioMetaList={hobbyRadioMeta}
            selected={touchedSteps.has('IDEAL_HOBBY') ? hobbies : null}
            onSelect={onSelect}
          />
        </div>
      </section>
    </>
  );
};
