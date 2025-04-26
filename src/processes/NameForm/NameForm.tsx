import { FormLayout } from 'src/pages/layout/FormLayout';
import { Input } from 'src/shared/ui/Input/Input';
import { Button } from 'src/shared/ui/Button/Button';
import styles from './NameForm.module.css';
import { useState } from 'react';

export const NameForm = ({
  title,
  name: initialName = '',
  isLoading,
  onSubmit,
}: {
  title: string;
  name: string;
  isLoading: boolean;
  onSubmit: (name: string) => void;
}) => {
  const [name, setName] = useState(initialName);

  return (
    <>
      <FormLayout.Body className={styles.Body}>
        <div className={styles.TitleSection}>
          <h2>{title}</h2>
          <small>
            정보 입력 요청 시 주선자의 이름이 나와요.
            <br />
            별명보다는 실명으로 입력해주세요!
          </small>
        </div>
        <Input value={name} onChange={(e) => setName(e.target.value)} placeholder={'이름을 입력하세요.'} />
      </FormLayout.Body>
      <FormLayout.Footer>
        <Button widthType={'fill'} onClick={() => onSubmit(name)} disabled={isLoading || name.length < 2}>
          완료
        </Button>
      </FormLayout.Footer>
    </>
  );
};
