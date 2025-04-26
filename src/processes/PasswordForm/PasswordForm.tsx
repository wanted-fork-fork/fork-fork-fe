import { FormLayout } from 'src/pages/layout/FormLayout';
import { Button } from 'src/shared/ui/Button/Button';
import { Input } from 'src/shared/ui/Input/Input';
import styles from './PasswordForm.module.css';
import { IconButton } from 'src/shared/ui/IconButton/IconButton';
import { ClosedEye, Eye } from 'src/shared/ui/icons';
import { ChangeEvent, ReactNode, useEffect, useState } from 'react';
import { Theme } from 'src/shared/styles/constants';
import { PASSWORD_REGEX } from 'src/shared/constants/regex';

export const PasswordForm = ({
  title,
  description = (
    <>
      영문 대·소문자, 특수문자(!,_,~..)를 포함하여 <br />
      8자 ~ 16자로 입력해주세요.
    </>
  ),
  placeholder,
  checkValid = true,
  buttonText = '완료',
  errorText,
  isLoading,
  password: initialPassword,
  onSubmit,
}: {
  title: ReactNode;
  description?: ReactNode;
  checkValid?: boolean;
  errorText?: string;
  buttonText?: string;
  placeholder: string;
  isLoading?: boolean;
  password: string;
  onSubmit: (password: string) => void;
}) => {
  const [show, setShow] = useState(false);
  const [password, setPassword] = useState(initialPassword);
  const [error, setError] = useState<boolean | string>(false);

  const handleSubmit = () => {
    if (!checkValid || PASSWORD_REGEX.test(password)) {
      onSubmit(password);
      return;
    }

    setError(true);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setError(false);
  };

  useEffect(() => {
    if (errorText) {
      setError(errorText);
    }
  }, [errorText]);

  return (
    <>
      <FormLayout.Body className={styles.Body}>
        <div className={styles.TitleSection}>
          <h2>{title}</h2>
          <small>{description}</small>
        </div>
        <div className={styles.InputWrapper}>
          <Input
            className={styles.Input}
            value={password}
            onChange={handleChange}
            type={show ? '' : 'password'}
            placeholder={placeholder}
            suffixSlot={
              <IconButton onClick={() => setShow((prev) => !prev)}>
                {show ? <Eye color={Theme.color.neutral60} /> : <ClosedEye color={Theme.color.neutral60} />}
              </IconButton>
            }
          />
          {error && (
            <p className={styles.Error}>
              {typeof error === 'string' ? error : '비밀번호를 조건에 맞게 다시 설정해주세요.'}
            </p>
          )}
        </div>
      </FormLayout.Body>
      <FormLayout.Footer>
        <Button widthType={'fill'} onClick={handleSubmit} disabled={isLoading}>
          {buttonText}
        </Button>
      </FormLayout.Footer>
    </>
  );
};
