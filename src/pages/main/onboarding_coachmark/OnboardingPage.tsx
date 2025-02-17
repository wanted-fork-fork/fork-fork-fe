import styles from 'src/pages/main/info_list/InfoListPage.module.css';
import { Link } from '@remix-run/react';
import { UserAvatar } from 'src/entities/user/ui/UserAvatar';
import { UserInfoResponse } from 'src/types';
import { driver } from 'driver.js';
import { useEffect, useState } from 'react';
import 'driver.js/dist/driver.css';
import 'src/shared/ui/CoachMark/CoachMark.css';
import onboardingStyles from './OnboardingPage.module.css';

const createDriverOjb = ({ onNextClick }: { onNextClick: () => void }) =>
  driver({
    showProgress: false,
    allowClose: false,
    stagePadding: 8,
    stageRadius: 24,
    disableActiveInteraction: true,
    popoverClass: 'coach-mark-popover',
    showButtons: ['next'],
    // onNextClick: onNextClick,
    onNextClick: (hook, step, opts) => {
      onNextClick();
      opts.driver.moveNext();
    },

    steps: [
      {
        element: '.googoo',
        popover: {
          title: '',
          description: '지금까지 소개팅 주선이 어려우셨나요?\n이제 걱정하지 마세요.\n구구가 도와드릴게요!',
          nextBtnText: '좋아!',
          side: 'top',
          align: 'center',
        },
      },
      {
        element: '.googoo',
        popover: {
          title: 'Step 1',
          description: '먼저 소개팅 후보 추가를 위해\n아래 + 후보추가 버튼을 눌러보세요.',
          side: 'top',
          // showButtons: [],
        },
        disableActiveInteraction: false,
      },
      {
        element: '.googoo',
        popover: {
          title: 'Step 2',
          description: '소개팅을 희망하는 분에게 링크 혹은 카카오톡으로\n본인 정보 입력 폼을 공유하세요.',
          side: 'bottom',
          nextBtnText: '다음',
        },
      },
      {
        element: '.googoo',
        popover: {
          title: 'Step 3',
          description: '소개팅을 희망하는 분이 정보 입력을 마치면\n메인에 등록되어 확인할 수 있어요!',
          side: 'bottom',
          nextBtnText: '다음',
        },
      },
      {
        element: '.googoo',
        popover: {
          title: 'Step 4',
          description:
            '좋은 짝을 찾아주기 위한 첫 걸음이죠!\n딱 맞는 사람이 나타났다면,\n공유하기 버튼을 눌러 정보를 공유해주세요!',
          side: 'bottom',
          nextBtnText: '이해했어!',
        },
      },
      {
        element: '.googoo',
        popover: {
          title: '',
          description:
            '구구와 함께 똑똑한 소개팅을 주선할\n준비가 되었나요?\n\n이 튜토리얼은 마이페이지에서\n언제든지 확인할 수 있어요!',
          nextBtnText: '구구 시작하기',
        },
      },
    ],
  });

export const OnboardingPage = ({
  userInfo,
  onEndOnboarding,
}: {
  userInfo: UserInfoResponse;
  onEndOnboarding: () => void;
}) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const obj = createDriverOjb({
      onNextClick: () => setStep((prev) => prev + 1),
    });
    obj.drive();
  }, []);

  return (
    <>
      <div className={styles.Wrapper}>
        <div className={styles.Header}>
          <h2>소개 후보</h2>
          <Link to={'/mypage'}>
            <UserAvatar size={32} imageSrc={userInfo.profileImage} />
          </Link>
        </div>
        <p className={styles.ListInfo}>총 0명</p>
        <div className={styles.EmptyView}>
          <img src="/images/empty.png" alt="정보 목록이 비어있음" />
          <p>
            등록된 정보가 없습니다.
            <br />
            지인의 정보를 등록하여 인연을 이어주세요!
          </p>
        </div>
      </div>
      <div className={`googoo ${onboardingStyles.GoogooImage}`}>
        <img src={'/images/googoo_onboarding.png'} alt={'구구'} />
      </div>
    </>
  );
};
