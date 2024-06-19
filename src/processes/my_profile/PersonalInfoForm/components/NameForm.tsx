import styles from 'src/processes/my_profile/PersonalInfoForm/PersonalInfoForm.module.css';
import { Input } from 'src/shared/ui/Input/Input';

export const NameForm = () => {
  return (
    <label className={styles.Label}>
      이름
      <Input placeholder={'이름을 입력해주세요.'} />
    </label>
  );
};
