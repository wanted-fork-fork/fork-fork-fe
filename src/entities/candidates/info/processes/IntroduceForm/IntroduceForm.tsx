import { TextArea } from 'src/shared/ui/TextArea/TextArea';
import styles from 'src/entities/candidates/info/processes/IntroduceForm/IntroduceForm.module.css';
import { useMyProfileStore } from 'src/entities/candidates/info/models/myProfileStore';
import { useMyProfileFormProcessStore } from 'src/entities/candidates/info/processes/_store/myProfileFormProcessStore';
import { ChangeEvent } from 'react';

export const IntroduceForm = () => {
  const addTouchedStep = useMyProfileFormProcessStore((state) => state.addTouchedStep);

  const introduction = useMyProfileStore((state) => state.introduction);
  const setIntroduction = useMyProfileStore((state) => state.setIntroduction);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIntroduction(e.target.value);
    addTouchedStep('PROFILE_INTRODUCE');
  };

  return (
    <section className={styles.Container}>
      <TextArea
        placeholder={'최대 500자까지 입력할 수 있습니다.'}
        maxLength={500}
        value={introduction}
        onChange={handleChange}
      />
    </section>
  );
};
