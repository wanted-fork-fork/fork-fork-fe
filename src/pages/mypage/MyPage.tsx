import { Button } from 'src/shared/ui/Button/Button';
import { ArrowRight, Close } from 'src/shared/ui/icons';
import { Link } from '@remix-run/react';
import styles from './MyPage.module.css';
import { UserInfoResponse } from 'src/types';
import { UserAvatar } from 'src/entities/user/ui/UserAvatar';
import { FAQ_URL, INQUIRY_URL, NOTICE_URL, PRIVACY_POLICY_URL, TERM_URL } from 'src/shared/constants/url';
import { Theme } from 'src/shared/styles/constants';
import { useState } from 'react';
import { OnboardingPage } from 'src/pages/main/onboarding_coachmark/OnboardingPage';

const ArrowIcon = () => <ArrowRight color={Theme.color.neutral40} />;

export const MyPage = ({ userInfo }: { userInfo: UserInfoResponse }) => {
  const [showTutorial, setShowTutorial] = useState(false);

  return showTutorial ? (
    <OnboardingPage
      userInfo={{ userId: '', name: '김구구', profileImage: '/images/default_profile.png' }}
      onEndOnboarding={() => setShowTutorial(false)}
    />
  ) : (
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
      <div className={styles.MenuList}>
        <div>
          <p className={`label ${styles.Label}`}>고객지원</p>
          <div className={styles.ButtonWrapper}>
            <Link to={FAQ_URL}>
              <Button
                color={'neutral'}
                variant={'ghost'}
                widthType={'fill'}
                suffixSlot={<ArrowIcon />}
                textAlign={'left'}
              >
                자주 묻는 질문
              </Button>
            </Link>{' '}
            <Link to={INQUIRY_URL}>
              <Button
                color={'neutral'}
                variant={'ghost'}
                widthType={'fill'}
                suffixSlot={<ArrowIcon />}
                textAlign={'left'}
              >
                문의하기
              </Button>
            </Link>
            <Link to={NOTICE_URL}>
              <Button
                color={'neutral'}
                variant={'ghost'}
                widthType={'fill'}
                suffixSlot={<ArrowIcon />}
                textAlign={'left'}
              >
                공지사항
              </Button>
            </Link>
            <Button
              color={'neutral'}
              variant={'ghost'}
              widthType={'fill'}
              suffixSlot={<ArrowIcon />}
              textAlign={'left'}
              onClick={() => setShowTutorial(true)}
            >
              튜토리얼 다시보기
            </Button>
          </div>
        </div>
        <div>
          <p className={`label ${styles.Label}`}>약관 및 정책</p>
          <div className={styles.ButtonWrapper}>
            <Link to={PRIVACY_POLICY_URL}>
              <Button
                color={'neutral'}
                variant={'ghost'}
                widthType={'fill'}
                suffixSlot={<ArrowIcon />}
                textAlign={'left'}
              >
                개인정보처리방침
              </Button>
            </Link>
            <Link to={TERM_URL}>
              <Button
                color={'neutral'}
                variant={'ghost'}
                widthType={'fill'}
                suffixSlot={<ArrowIcon />}
                textAlign={'left'}
              >
                이용정책
              </Button>
            </Link>
          </div>
        </div>
        <div className={styles.SmallButtonsWrapper}>
          <Link to={'/logout'} className={styles.SmallButton}>
            로그아웃
          </Link>
          <Link to={'/account/delete'} className={styles.SmallButton}>
            회원 탈퇴
          </Link>
        </div>
      </div>
    </>
  );
};
