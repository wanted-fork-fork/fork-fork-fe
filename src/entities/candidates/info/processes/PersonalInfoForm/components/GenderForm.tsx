import styles from 'src/entities/candidates/info/processes/PersonalInfoForm/PersonalInfoForm.module.css';
import { Radio } from 'src/shared/ui/Radio/Radio';
import { useMyProfileStore } from 'src/entities/candidates/info/models/myProfileStore';

export const GenderForm = () => {
  const gender = useMyProfileStore((state) => state.gender);
  const setGender = useMyProfileStore((state) => state.setGender);
  return (
    <fieldset>
      <legend className={styles.Legend}>성별</legend>
      <div className={styles.InputGroup}>
        <Radio
          className={styles.InputItem}
          label={'남자'}
          value={'MALE'}
          checked={gender === 'MALE'}
          onChange={() => setGender('MALE')}
        />
        <Radio
          className={styles.InputItem}
          label={'여자'}
          value={'FEMALE'}
          checked={gender === 'FEMALE'}
          onChange={() => setGender('FEMALE')}
        />
      </div>
    </fieldset>
  );
};
