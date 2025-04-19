import { Button } from 'src/shared/ui/Button/Button';
import { Link } from '@remix-run/react';
import { FormLayout } from 'src/pages/layout/FormLayout';
import styles from 'src/domains/auth/processes/signup/SignUpCompletePage/SignUpCompletePage.module.css';

export const SignUpCompletePage = ({ name }: { name: string }) => {
  return (
    <FormLayout.Container>
      <FormLayout.Body className={styles.Body}>
        <h2>
          반갑습니다, {name}님!
          <br />
          <br />
          구구가 소개팅을 주선하는 <br />
          모든 과정을 간편하게 도와드릴게요.
        </h2>
        <img src="/images/signup_complete.png" alt="회원가입 완료" />
      </FormLayout.Body>
      <FormLayout.Footer>
        <Link to={'/login/email'}>
          <Button widthType={'fill'}>로그인하고 시작하기</Button>
        </Link>
      </FormLayout.Footer>
    </FormLayout.Container>
  );
};
