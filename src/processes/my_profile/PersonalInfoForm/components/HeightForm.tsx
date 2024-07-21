import styles from 'src/processes/my_profile/PersonalInfoForm/PersonalInfoForm.module.css';
import { Input } from 'src/shared/ui/Input/Input';
import { useMyProfileStore } from 'src/entities/profile/model/myProfileStore';

export const HeightForm = () => {
  const height = useMyProfileStore((state) => state.height);
  const setHeight = useMyProfileStore((state) => state.setHeight);

  return (
    <label className={styles.Label}>
      키
      <Input
        suffixSlot={'cm'}
        placeholder={'자신의 키를 입력해주세요.'}
        value={height ?? ''}
        type={'number'}
        onChange={(e) => setHeight(Number(e.target.value) ?? '')}
      />
    </label>
  );
};
