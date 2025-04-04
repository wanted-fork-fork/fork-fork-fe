import { FormLayout } from 'src/pages/layout/FormLayout';
import { Button } from 'src/shared/ui/Button/Button';
import { Input } from 'src/shared/ui/Input/Input';
import styles from './PasswordForm.module.css';
import { IconButton } from 'src/shared/ui/IconButton/IconButton';
import { ClosedEye, Eye } from 'src/shared/ui/icons';
import { useState } from 'react';
import { Theme } from 'src/shared/styles/constants';

export const PasswordForm = () => {
  const [show, setShow] = useState(false);
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
        <Input
          className={styles.Input}
          type={show ? '' : 'password'}
          placeholder={'비밀번호를 입력하세요.'}
          suffixSlot={
            <IconButton onClick={() => setShow((prev) => !prev)}>
              {show ? <Eye color={Theme.color.neutral60} /> : <ClosedEye color={Theme.color.neutral60} />}
            </IconButton>
          }
        />
      </FormLayout.Body>
      <FormLayout.Footer>
        <Button widthType={'fill'}>완료</Button>
      </FormLayout.Footer>
    </>
  );
};
