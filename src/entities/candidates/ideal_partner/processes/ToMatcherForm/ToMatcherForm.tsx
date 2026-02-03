import { TextArea } from 'src/shared/ui/TextArea/TextArea';
import styles from 'src/entities/candidates/ideal_partner/processes/ToMatcherForm/ToMatcherForm.module.css';
import { useIdealPartnerStore } from 'src/entities/candidates/ideal_partner/models/idealPartnerStore';
import { useIdealPartnerFormProcessStore } from 'src/entities/candidates/ideal_partner/processes/_store/idealPartnerFormProcessStore';
import { ChangeEvent } from 'react';

export const ToMatcherForm = () => {
  const addTouchedStep = useIdealPartnerFormProcessStore((state) => state.addTouchedStep);

  const value = useIdealPartnerStore((state) => state.toMatchMaker) ?? '';
  const setValue = useIdealPartnerStore((state) => state.setToMatchMaker);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    addTouchedStep('IDEAL_TO_MATCHER');
  };

  return (
    <section className={styles.Container}>
      <TextArea
        value={value}
        onChange={handleChange}
        placeholder={'이상형 참고 사항, 주선자에게 부탁하는 말 등 최대 500자까지 입력할 수 있습니다.'}
        maxLength={500}
      />
    </section>
  );
};
