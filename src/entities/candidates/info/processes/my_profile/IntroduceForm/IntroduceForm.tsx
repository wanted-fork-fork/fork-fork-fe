import { TextArea } from 'src/shared/ui/TextArea/TextArea';
import styles from 'src/entities/candidates/info/processes/my_profile/IntroduceForm/IntroduceForm.module.css';
import { useMyProfileStore } from 'src/entities/candidates/info/entities/models/myProfileStore';

export const IntroduceForm = () => {
  const introduction = useMyProfileStore((state) => state.introduction);
  const setIntroduction = useMyProfileStore((state) => state.setIntroduction);
  return (
    <section className={styles.Container}>
      <TextArea
        placeholder={'최대 500자까지 입력할 수 있습니다.'}
        maxLength={500}
        value={introduction}
        onChange={(e) => setIntroduction(e.target.value)}
      />
    </section>
  );
};
