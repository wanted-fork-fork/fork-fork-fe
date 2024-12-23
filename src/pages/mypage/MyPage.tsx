import { Button } from 'src/shared/ui/Button/Button';
import { ArrowRight, Close } from 'src/shared/ui/icons';
import { Link } from '@remix-run/react';
import styles from './MyPage.module.css';
import { UserInfoResponse } from 'src/types';
import { UserAvatar } from 'src/entities/user/ui/UserAvatar';
import { PRIVACY_POLICY_URL, TERM_URL } from 'src/shared/constants/url';

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
        <UserAvatar size={72} imageSrc={userInfo.profileImage} />
        <h3>{userInfo.name}</h3>
      </div>
      <p className={`label ${styles.Label}`}>약관 및 정책</p>
      <div className={styles.ButtonWrapper}>
        <Link to={PRIVACY_POLICY_URL}>
          <Button color={'neutral'} variant={'ghost'} widthType={'fill'} suffixSlot={<ArrowRight />} textAlign={'left'}>
            개인정보처리방침
          </Button>
        </Link>
        <Link to={TERM_URL}>
          <Button color={'neutral'} variant={'ghost'} widthType={'fill'} suffixSlot={<ArrowRight />} textAlign={'left'}>
            이용정책
          </Button>
        </Link>
      </div>
      <Link to={'/logout'} className={styles.Logout}>
        로그아웃
      </Link>
    </>
  );
};
