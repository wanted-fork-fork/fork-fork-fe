import { Button } from 'src/shared/ui/Button/Button';
import { ArrowRight, Close, EmailFilled } from 'src/shared/ui/icons';
import { Link } from '@remix-run/react';
import styles from './MyPage.module.css';
import { UserInfoResponse } from 'src/types';
import { UserAvatar } from 'src/entities/users/profiles/components/UserAvatar';
import { FAQ_URL, INQUIRY_URL, NOTICE_URL } from 'src/shared/constants/url';
import { Theme } from 'src/shared/styles/constants';
import { useState } from 'react';
import { OnboardingPage } from 'src/pages/main/onboarding_coachmark/OnboardingPage';
import { IconButton } from 'src/shared/ui/IconButton/IconButton';
import { SwitchCase } from 'src/shared/ui/SwitchCase';

const ArrowIcon = () => <ArrowRight color={Theme.color.neutral40} />;

export const MyPage = ({ userInfo }: { userInfo: UserInfoResponse }) => {
  const [showTutorial, setShowTutorial] = useState(false);

  return showTutorial ? (
    <OnboardingPage
      userInfo={{ userId: '', name: '김구구', profileImage: '/images/default_profile.png', receiveEmail: true }}
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
      <Link to={'/mypage/edit'}>
        <div className={styles.UserInfoWrapper}>
          <div>
            <UserAvatar size={72} imageSrc={userInfo.profileImage} />
            <SwitchCase
              value={userInfo.email ? 'EMAIL' : 'KAKAO'}
              caseBy={{
                KAKAO: (
                  <div className={styles.LoginMethod} style={{ backgroundColor: Theme.color.kakao }}>
                    <img src={'/images/kakao.png'} alt={'카카오 계정으로 로그인한 계정입니다'} />
                  </div>
                ),
                EMAIL: (
                  <div className={styles.LoginMethod} style={{ backgroundColor: Theme.color.neutral90 }}>
                    <EmailFilled color={Theme.color.primary} />
                  </div>
                ),
              }}
            />
          </div>
          <div className={styles.UserInfoNameWrapper}>
            <h3>{userInfo.name}</h3>
            {userInfo.email && <p className={styles.Email}>{userInfo.email}</p>}
          </div>
          <IconButton className={styles.UserInfoMoreButton}>
            <ArrowRight width={24} height={24} />
          </IconButton>
        </div>
      </Link>
      <hr className={styles.Divider} />
      <div className={styles.MenuList}>
        <div>
          <p className={`label ${styles.Label}`}>구구 소식</p>
          <div className={styles.ButtonWrapper}>
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
          </div>
        </div>
        <div>
          <p className={`label ${styles.Label}`}>설정</p>
          <div className={styles.ButtonWrapper}>
            <Link to={'/mypage/notification'}>
              <Button
                color={'neutral'}
                variant={'ghost'}
                widthType={'fill'}
                suffixSlot={<ArrowIcon />}
                textAlign={'left'}
              >
                후보자 추가 알림 받기
              </Button>
            </Link>
          </div>
        </div>
        <div>
          <p className={`label ${styles.Label}`}>고객 지원</p>
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
            </Link>
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
            <Link to={'/mypage/term'}>
              <Button
                color={'neutral'}
                variant={'ghost'}
                widthType={'fill'}
                suffixSlot={<ArrowIcon />}
                textAlign={'left'}
              >
                약관 및 정책
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
