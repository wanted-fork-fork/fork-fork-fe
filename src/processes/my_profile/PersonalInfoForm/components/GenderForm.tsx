import styles from 'src/processes/my_profile/PersonalInfoForm/PersonalInfoForm.module.css';
import { Radio } from 'src/shared/ui/Radio/Radio';

export const GenderForm = () => {
  return (
    <fieldset>
      <legend className={styles.Legend}>성별</legend>
      <div className={styles.InputGroup}>
        <Radio className={styles.InputItem} label={'남자'} value={'MALE'} />
        <Radio className={styles.InputItem} label={'여자'} value={'FEMALE'} />
      </div>
    </fieldset>
  );
};
