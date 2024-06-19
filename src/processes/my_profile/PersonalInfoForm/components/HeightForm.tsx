import styles from 'src/processes/my_profile/PersonalInfoForm/PersonalInfoForm.module.css';
import { Input } from 'src/shared/ui/Input/Input';

export const HeightForm = () => (
  <label className={styles.Label}>
    키
    <Input suffixSlot={'cm'} placeholder={'자신의 키를 입력해주세요.'} />
  </label>
);
