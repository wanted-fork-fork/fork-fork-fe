import styles from 'src/pages/main/login/LoginPage.module.css';
import { Link } from '@remix-run/react';
import { PRIVACY_POLICY_URL, TERM_URL } from 'src/shared/constants/url';

export const LoginPage = () => {
  return (
    <div className={styles.Wrapper}>
      <div className={styles.ImageWrapper}>
        <h1>내 사랑 구해줄래? 구해줄게!</h1>
      </div>
      <div className={styles.ButtonWrapper}>
        <Link to={import.meta.env.VITE_KAUTH_URL}>
          <button className={`${styles.Button} ${styles.Kakao}`}>
            <span className={styles.Icon}>
              <img src="/images/kakao.png" alt="카카오 로그인" width={29} height={29} />
            </span>
            카카오톡으로 시작하기
          </button>
        </Link>
        <p className={styles.TermDescription}>
          로그인 시 <a href={TERM_URL}>이용약관</a>, <a href={PRIVACY_POLICY_URL}>개인정보처리방침,</a>
          <br />
          <a href={PRIVACY_POLICY_URL}>개인정보제3자제공및활용</a>에 동의하는 것으로 간주합니다.
        </p>
      </div>
    </div>
  );
};
