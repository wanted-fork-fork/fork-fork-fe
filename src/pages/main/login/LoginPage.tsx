import styles from 'src/pages/main/login/LoginPage.module.css';
import { Link, useSearchParams } from '@remix-run/react';
import { PRIVACY_POLICY_URL, TERM_URL } from 'src/shared/constants/url';
import { Button } from 'src/shared/ui/Button/Button';
import { Email } from 'src/shared/ui/icons';

export const LoginPage = () => {
  const [searchParam] = useSearchParams();

  const stateParam = `&state=path:${encodeURIComponent(searchParam.get('path') ?? '/')}`;

  return (
    <div className={styles.Wrapper}>
      <div className={styles.ImageWrapper}>
        <h1>내 사랑 구해줄래? 구해줄게!</h1>
      </div>
      <div className={styles.Footer}>
        <div className={styles.ButtonWrapper}>
          <Link to={`${import.meta.env.VITE_KAUTH_URL}${stateParam}`}>
            <button className={`${styles.Button} ${styles.Kakao}`}>
              <span className={styles.Icon}>
                <img src="/images/kakao.png" alt="카카오 로그인" width={29} height={29} />
              </span>
              카카오톡으로 시작하기
            </button>
          </Link>
          <Link to={`/login/email?${searchParam}`}>
            <Button widthType={'fill'} prefixSlot={<Email />} suffixSlot={<Email color={'transparent'} />}>
              이메일로 시작하기
            </Button>
          </Link>
        </div>
        <p className={styles.TermDescription}>
          로그인 시 <a href={TERM_URL}>이용약관</a>, <a href={PRIVACY_POLICY_URL}>개인정보처리방침,</a>
          <br />
          <a href={PRIVACY_POLICY_URL}>개인정보제3자제공및활용</a>에 동의하는 것으로 간주합니다.
        </p>
      </div>
    </div>
  );
};
