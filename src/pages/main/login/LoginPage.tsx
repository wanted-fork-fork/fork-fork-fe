import styles from 'src/pages/main/login/LoginPage.module.css';
import { Link } from '@remix-run/react';

export const LoginPage = () => {
  return (
    <div className={styles.Wrapper}>
      <div className={styles.ImageWrapper}>
        <h1>내 사랑 구해줄래? 구해줄게!</h1>
      </div>
      <div className={styles.ButtonWrapper}>
        <Link to={import.meta.env.DEV ? '/auth/kakao' : import.meta.env.VITE_KAUTH_URL}>
          <button className={`${styles.Button} ${styles.Kakao}`}>
            <span className={styles.Icon}>
              <img src="/images/kakao.png" alt="카카오 로그인" width={29} height={29} />
            </span>
            카카오톡으로 시작하기
          </button>
        </Link>
      </div>
    </div>
  );
};
