import { FormLayout } from 'src/pages/layout/FormLayout';
import { Button } from 'src/shared/ui/Button/Button';
import { Input } from 'src/shared/ui/Input/Input';
import styles from './PasswordForm.module.css';
import { IconButton } from 'src/shared/ui/IconButton/IconButton';
import { ClosedEye, Eye } from 'src/shared/ui/icons';
import { ChangeEvent, useState } from 'react';
import { Theme } from 'src/shared/styles/constants';

const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!_~.])[A-Za-z0-9!_~.]{8,16}$/;

export const PasswordForm = ({
  password: initialPassword,
  isLoading,
  onSubmit,
}: {
  password: string;
  isLoading?: boolean;
  onSubmit: (password: string) => void;
}) => {
  const [show, setShow] = useState(false);
  const [password, setPassword] = useState(initialPassword);
  const [error, setError] = useState(false);

  const handleSubmit = () => {
    if (regex.test(password)) {
      onSubmit(password);
      return;
    }

    setError(true);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setError(false);
  };

  return (
    <>
      <FormLayout.Body className={styles.Body}>
        <div className={styles.TitleSection}>
          <h2>비밀번호를 입력해주세요.</h2>
          <small>
            영문 대·소문자, 특수문자(!,_,~..)를 포함하여 <br />
            8자 ~ 16자로 입력해주세요.
          </small>
        </div>
        <div className={styles.InputWrapper}>
          <Input
            className={styles.Input}
            value={password}
            onChange={handleChange}
            type={show ? '' : 'password'}
            placeholder={'비밀번호를 입력하세요.'}
            suffixSlot={
              <IconButton onClick={() => setShow((prev) => !prev)}>
                {show ? <Eye color={Theme.color.neutral60} /> : <ClosedEye color={Theme.color.neutral60} />}
              </IconButton>
            }
          />
          {error && <p className={styles.Error}>비밀번호를 조건에 맞게 다시 설정해주세요.</p>}
        </div>
      </FormLayout.Body>
      <FormLayout.Footer>
        <Button widthType={'fill'} onClick={handleSubmit} disabled={isLoading}>
          완료
        </Button>
      </FormLayout.Footer>
    </>
  );
};
