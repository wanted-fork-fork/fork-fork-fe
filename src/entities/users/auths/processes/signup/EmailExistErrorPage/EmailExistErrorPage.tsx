import { FormLayout } from 'src/pages/layout/FormLayout';
import { Link } from '@remix-run/react';
import { Button } from 'src/shared/ui/Button/Button';
import styles from 'src/entities/users/auths/processes/signup/EmailExistErrorPage/EmailExistErrorPage.module.css';

export const EmailExistErrorPage = () => {
  return (
    <FormLayout.Container>
      <FormLayout.Body className={styles.Body}>
        <h2>
          이미 가입된 이메일입니다.
          <br />
          바로 로그인해주세요!
        </h2>
        <img src="/images/404.png" alt="이미 존재하는 이메일입니다" />
      </FormLayout.Body>
      <FormLayout.Footer className={styles.Footer}>
        <Link to={'/login/email'}>
          <Button widthType={'fill'}>로그인</Button>
        </Link>
        <Link to={'/auth/reset-password'}>
          <Button widthType={'fill'} variant={'outline'} color={'neutral'}>
            비밀번호 찾기
          </Button>
        </Link>
      </FormLayout.Footer>
    </FormLayout.Container>
  );
};
