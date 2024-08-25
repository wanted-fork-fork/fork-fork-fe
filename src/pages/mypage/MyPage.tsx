import { Button } from 'src/shared/ui/Button/Button';
import { ArrowRight, Close } from 'src/shared/ui/icons';
import { Link } from '@remix-run/react';
import { Avatar } from 'src/shared/ui/Avatar/Avatar';
import styles from './MyPage.module.css';
import { UserInfoResponse } from 'src/types';

export const MyPage = ({ userInfo }: { userInfo: UserInfoResponse }) => {
  return (
    <>
      <div className={styles.Header}>
        <Link to={'/'}>
          <Close />
        </Link>
        <h2>마이페이지</h2>
      </div>
      <div className={styles.UserInfoWrapper}>
        <Avatar fallback={''} shape={'circle'} size={72} src={userInfo.profileImage} />
        <h3>{userInfo.name}</h3>
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
