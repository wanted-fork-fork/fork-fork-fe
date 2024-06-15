import { TextArea } from 'src/shared/ui/TextArea/TextArea';
import styles from './IntroduceForm.module.css';

export const IntroduceForm = () => {
  return (
    <section className={styles.Container}>
      <TextArea placeholder={'최대 500자까지 입력할 수 있습니다.'} maxLength={500} />
    </section>
  );
};
