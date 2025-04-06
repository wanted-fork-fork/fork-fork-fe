import { FormLayout } from 'src/pages/layout/FormLayout';
import { Link, useNavigate } from '@remix-run/react';
import { Input } from 'src/shared/ui/Input/Input';
import { Button } from 'src/shared/ui/Button/Button';
import styles from './EmailLoginPage.module.css';
import { useRemixForm } from 'remix-hook-form';
import { LoginFormData, loginResolver } from 'src/app/routes/login.email';

export const EmailLoginPage = () => {
  const navigate = useNavigate();

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useRemixForm<LoginFormData>({
    resolver: loginResolver,
  });

  return (
    <FormLayout.Container>
      <FormLayout.Header onPrev={() => navigate('/login')}>로그인</FormLayout.Header>
      <FormLayout.Body>
        <form className={styles.Form} onSubmit={handleSubmit}>
          <div className={styles.InputRow}>
            <label>
              아이디(E-mail)
              <Input
                className={styles.Input}
                placeholder={'아이디로 사용하는 이메일을 입력하세요.'}
                {...register('email')}
              />
            </label>
            {errors.email && <p className={styles.Error}>가입되지 않은 이메일입니다.</p>}
          </div>
          <div className={styles.InputRow}>
            <label>
              비밀번호
              <Input
                className={styles.Input}
                placeholder={'비밀번호를 입력하세요.'}
                type={'password'}
                {...register('password')}
              />
            </label>
            {errors.password && <p className={styles.Error}>비밀번호를 확인해주세요.</p>}
            {errors.root && <p className={styles.Error}>로그인에 실패했습니다.</p>}
          </div>
        </form>
        <Link to={'/auth/reset-password'}>
          <Button className={styles.FindPasswordButton} variant={'ghost'} color={'neutral'} size={'fit'}>
            비밀번호 찾기
          </Button>
        </Link>
      </FormLayout.Body>
      <FormLayout.Footer className={styles.Footer}>
        <Button widthType={'fill'} onClick={() => handleSubmit()}>
          로그인
        </Button>
        <Link to={'/signup'}>
          <Button className={styles.SignUpButton} widthType={'fill'} color={'neutral'} variant={'outline'}>
            회원가입
          </Button>
        </Link>
      </FormLayout.Footer>
    </FormLayout.Container>
  );
};
