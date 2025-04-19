import { UserInfoResponse } from 'src/types';
import { Header } from 'src/shared/ui/layout/Header/Header';
import { Link, useNavigate } from '@remix-run/react';
import { Avatar } from 'src/shared/ui/Avatar/Avatar';
import { ArrowRight, Camera } from 'src/shared/ui/icons';
import styles from './MyInfoEditPage.module.css';
import { Theme } from 'src/shared/styles/constants';

export const MyInfoEditPage = ({ userInfo }: { userInfo: UserInfoResponse }) => {
  const navigate = useNavigate();

  const isChangePasswordDisabled = Boolean(userInfo.email);

  return (
    <>
      <Header onPrev={() => navigate('/mypage')}>회원 정보</Header>
      <div className={styles.Container}>
        <div className={styles.UserAvatar}>
          <Avatar
            src={userInfo.profileImage ?? '/images/default_profile.png'}
            fallback={''}
            shape={'circle'}
            size={88}
          />
          <div className={styles.ImageUploadTrigger}>
            <Camera color={Theme.color.neutral30} />
          </div>
        </div>
        <div className={styles.UserInfo}>
          <div className={styles.InfoRow}>
            <p className={styles.Label}>이름</p>
            <Link to={'/profile/edit/name'}>
              <div className={styles.Value}>
                <span>{userInfo.name}</span>
                <ArrowRight width={16} color={Theme.color.neutral50} />
              </div>
            </Link>
          </div>
          <div className={styles.InfoRow}>
            <p className={styles.Label}>아이디(E-Mail)</p>
            <div className={styles.Value}>
              <span className={styles.Gray}>{userInfo.email}</span>
              <span className={styles.Primary}>인증 완료</span>
            </div>
          </div>
          <div className={styles.InfoRow}>
            <p className={styles.Label}>비밀번호</p>
            <Link to={'/auth/change-password'}>
              <div className={styles.Value}>
                <span className={isChangePasswordDisabled ? styles.Gray : undefined}>
                  {isChangePasswordDisabled ? '비밀번호 재설정 불가능' : '비밀번호 재설정 가능'}
                </span>
                <ArrowRight
                  width={16}
                  color={isChangePasswordDisabled ? Theme.color.neutral40 : Theme.color.neutral50}
                />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
