import { PropsWithChildren } from 'react';
import { Link } from '@remix-run/react';
import styles from './WideDeviceLayout.module.css';

export const WideDeviceLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className={styles.Wrapper}>
      <div className={styles.SideSection}>
        <Link className={styles.Logo} to={'/'}>
          <img src={'/images/logo.png'} alt={'로고'} width={48} />
          <span>Goo Goo</span>
        </Link>
        <div className={styles.ImageWrapper}>
          <p className={styles.Description}>
            내 사랑을 <span className={styles.Highlight}>구</span>해줄래?
            <br />
            <span className={styles.Highlight}>구</span>해줄게!
          </p>
          <img className={styles.Image} src={'/images/googoo_4.png'} alt={'구구 이미지'} />
          <img className={styles.QrImage} src={'/images/qrcode.png'} alt={'구구 서비스 QR코드'} width={90} />
        </div>
      </div>
      <div className={styles.Main}>{children}</div>
      <div className={styles.SideSection} />
    </div>
  );
};
