import styles from 'src/processes/my_profile/PersonalInfoForm/PersonalInfoForm.module.css';
import { Input } from 'src/shared/ui/Input/Input';
import { useMyProfileStore } from 'src/entities/profile/model/myProfileStore';

export const NameForm = () => {
  const name = useMyProfileStore((state) => state.name);
  const setName = useMyProfileStore((state) => state.setName);

  return (
    <label className={styles.Label}>
      이름
      <Input placeholder={'이름을 입력해주세요.'} value={name} onChange={(e) => setName(e.target.value)} />
    </label>
  );
};
