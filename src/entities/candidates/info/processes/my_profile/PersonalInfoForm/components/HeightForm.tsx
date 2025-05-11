import styles from 'src/entities/candidates/info/processes/my_profile/PersonalInfoForm/PersonalInfoForm.module.css';
import { Input } from 'src/shared/ui/Input/Input';
import { ChangeEvent } from 'react';
import { useMyProfileStore } from 'src/entities/candidates/info/entities/models/myProfileStore';

export const HeightForm = () => {
  const height = useMyProfileStore((state) => state.height);
  const setHeight = useMyProfileStore((state) => state.setHeight);

  const onChangeHeight = (e: ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const value = Number(rawValue);
    if (rawValue !== '' && (isNaN(value) || value < 0)) {
      return;
    }
    setHeight(value);
  };

  return (
    <label className={styles.Label}>
      키
      <Input
        inputMode={'numeric'}
        suffixSlot={'cm'}
        placeholder={'자신의 키를 입력해주세요.'}
        value={height || ''}
        onChange={onChangeHeight}
      />
    </label>
  );
};
