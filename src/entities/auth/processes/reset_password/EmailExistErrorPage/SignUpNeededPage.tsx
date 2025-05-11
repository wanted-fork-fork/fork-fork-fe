import { FormLayout } from 'src/pages/layout/FormLayout';
import { Link } from '@remix-run/react';
import { Button } from 'src/shared/ui/Button/Button';
import styles from 'src/entities/auth/processes/reset_password/EmailExistErrorPage/EmailExistErrorPage.module.css';

export const SignUpNeededPage = () => {
  return (
    <FormLayout.Container>
      <FormLayout.Body className={styles.Body}>
        <h2>
          가입되지 않은 사용자입니다.
          <br />
          회원 가입을 진행해주세요.
        </h2>
        <img src="/images/404.png" alt="회원 가입을 진행해주세요" />
      </FormLayout.Body>
      <FormLayout.Footer className={styles.Footer}>
        <Link to={'/signup'}>
          <Button widthType={'fill'}>회원가입하기</Button>
        </Link>
        <Link to={'/'}>
          <Button widthType={'fill'} variant={'outline'} color={'neutral'}>
            메인으로 이동
          </Button>
        </Link>
      </FormLayout.Footer>
    </FormLayout.Container>
  );
};
