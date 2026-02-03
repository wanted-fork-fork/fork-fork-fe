import styles from 'src/entities/candidates/info/processes/PersonalInfoForm/PersonalInfoForm.module.css';
import { Radio } from 'src/shared/ui/Radio/Radio';
import { useMyProfileStore } from 'src/entities/candidates/info/models/myProfileStore';
import { useMyProfileFormProcessStore } from 'src/entities/candidates/info/processes/_store/myProfileFormProcessStore';
import { Gender } from 'src/entities/candidates/info/types/profileSummary';

export const GenderForm = () => {
  const addTouchedStep = useMyProfileFormProcessStore((state) => state.addTouchedStep);

  const gender = useMyProfileStore((state) => state.gender);
  const setGender = useMyProfileStore((state) => state.setGender);

  const handleGenderChange = (g: Gender) => {
    setGender(g);
    addTouchedStep('PROFILE_PERSONAL_INFO');
  };

  return (
    <fieldset>
      <legend className={styles.Legend}>성별</legend>
      <div className={styles.InputGroup}>
        <Radio
          className={styles.InputItem}
          label={'남자'}
          value={'MALE'}
          checked={gender === 'MALE'}
          onChange={() => handleGenderChange('MALE')}
        />
        <Radio
          className={styles.InputItem}
          label={'여자'}
          value={'FEMALE'}
          checked={gender === 'FEMALE'}
          onChange={() => handleGenderChange('FEMALE')}
        />
      </div>
    </fieldset>
  );
};
