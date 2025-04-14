import { Button } from 'src/shared/ui/Button/Button';
import { Link } from '@remix-run/react';
import { FormLayout } from 'src/pages/layout/FormLayout';
import styles from './SignUpCompletePage.module.css';

export const PasswordResetCompletePage = () => {
  return (
    <FormLayout.Container>
      <FormLayout.Body className={styles.Body}>
        <h2>
          비밀번호를 변경하였습니다.
          <br />
          다시 로그인 해주세요!
        </h2>
        <img src="/images/signup_complete.png" alt="비밀번호 재설정 완료" />
      </FormLayout.Body>
      <FormLayout.Footer>
        <Link to={'/login/email'}>
          <Button widthType={'fill'}>로그인하고 시작하기</Button>
        </Link>
      </FormLayout.Footer>
    </FormLayout.Container>
  );
};
