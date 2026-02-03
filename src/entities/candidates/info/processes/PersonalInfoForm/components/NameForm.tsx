import styles from 'src/entities/candidates/info/processes/PersonalInfoForm/PersonalInfoForm.module.css';
import { Input } from 'src/shared/ui/Input/Input';
import { useMyProfileStore } from 'src/entities/candidates/info/models/myProfileStore';
import { ChangeEvent, useCallback } from 'react';
import { useMyProfileFormProcessStore } from 'src/entities/candidates/info/processes/_store/myProfileFormProcessStore';

export const NameForm = () => {
  const addTouchedStep = useMyProfileFormProcessStore((state) => state.addTouchedStep);

  const name = useMyProfileStore((state) => state.name);
  const setName = useMyProfileStore((state) => state.setName);

  const handleChangeName = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setName(e.target.value);
      addTouchedStep('PROFILE_PERSONAL_INFO');
    },
    [addTouchedStep, setName],
  );

  return (
    <label className={styles.Label}>
      이름
      <Input placeholder={'이름을 입력해주세요.'} value={name} onChange={handleChangeName} />
    </label>
  );
};
