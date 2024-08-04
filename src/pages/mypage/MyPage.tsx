import { Button } from 'src/shared/ui/Button/Button';
import { ArrowRight, Close } from 'src/shared/ui/icons';
import { Link } from '@remix-run/react';
import { Avatar } from 'src/shared/ui/Avatar/Avatar';
import styles from './MyPage.module.css';

export const MyPage = () => {
  return (
    <>
      <div className={styles.Header}>
        <Link to={'/?login=true'}>
          <Close />
        </Link>
        <h2>마이페이지</h2>
      </div>
      <div className={styles.UserInfoWrapper}>
        <Avatar fallback={''} shape={'circle'} size={72} src={'/images/googoo_1.png'} />
        <h3>김유저</h3>
      </div>
      <p className={`label ${styles.Label}`}>약관 및 정책</p>
      <div className={styles.ButtonWrapper}>
        <Link to={'/'}>
          <Button color={'neutral'} variant={'ghost'} widthType={'fill'} suffixSlot={<ArrowRight />} textAlign={'left'}>
            개인정보처리방침
          </Button>
        </Link>
        <Link to={'/'}>
          <Button color={'neutral'} variant={'ghost'} widthType={'fill'} suffixSlot={<ArrowRight />} textAlign={'left'}>
            이용정책
          </Button>
        </Link>
      </div>
    </>
  );
};
