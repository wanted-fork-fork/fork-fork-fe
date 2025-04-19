import styles from 'src/domains/candidates/ideal_partner/processes/ideal_partner/HobbyForm/HobbyForm.module.css';
import { IdealPartnerRequestHobbies } from 'src/types';
import { useIdealPartnerFormProcessStore } from 'src/domains/candidates/ideal_partner/processes/ideal_partner/_store/idealPartnerFormProcessStore';
import { Chip } from 'src/shared/ui/Chip/Chip';
import { Radio } from 'src/shared/ui/Radio/Radio';
import { useProfileFirstName } from 'src/domains/candidates/info/entities/libs/useProfileFirstName';
import { useMyProfileStore } from 'src/domains/candidates/info/entities/models/myProfileStore';
import { useIdealPartnerStore } from 'src/domains/candidates/ideal_partner/entities/models/idealPartnerStore';

export const HobbyForm = () => {
  const name = useProfileFirstName();
  const selectedHobbies = useMyProfileStore((state) => state.hobbies);

  const hobbies = useIdealPartnerStore((state) => state.hobbies);
  const setHobbies = useIdealPartnerStore((state) => state.setHobbies);
  const touchedSteps = useIdealPartnerFormProcessStore((state) => state.touchedSteps);
  const addTouchedStep = useIdealPartnerFormProcessStore((state) => state.addTouchedStep);

  const selectedHobby = touchedSteps.has('IDEAL_HOBBY') ? hobbies : null;

  const onSelect = (category: IdealPartnerRequestHobbies) => {
    setHobbies(category);
    addTouchedStep('IDEAL_HOBBY');
  };

  return (
    <>
      <section className={styles.Container}>
        <div>
          <Radio
            label={'네, 취미 생활을 같이 하고싶어요.'}
            checked={selectedHobby === 'IMPORTANT'}
            onChange={() => onSelect('IMPORTANT')}
          />
          {selectedHobby === 'IMPORTANT' && (
            <div>
              <small className={styles.Description}>{name}님이 선택하신 취미</small>
              <div className={styles.ChipWrapper}>
                {selectedHobbies.map((h) => (
                  <Chip key={h.name}>{h.name}</Chip>
                ))}
              </div>
            </div>
          )}
          <Radio
            label={'상관없어요'}
            checked={selectedHobby === 'NOT_IMPORTANT'}
            onChange={() => onSelect('NOT_IMPORTANT')}
          />
        </div>
      </section>
    </>
  );
};
