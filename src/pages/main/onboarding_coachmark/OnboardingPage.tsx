import styles from 'src/pages/main/info_list/InfoListPage.module.css';
import { Link } from '@remix-run/react';
import { UserAvatar } from 'src/entities/user/ui/UserAvatar';
import { ArchivedInfoResponse, UserInfoResponse } from 'src/types';
import { Driver, driver } from 'driver.js';
import { useEffect, useRef, useState } from 'react';
import 'driver.js/dist/driver.css';
import 'src/shared/ui/CoachMark/CoachMark.css';
import { ProfileAddFloatingButton } from 'src/widgets/GenerateFormLink/ProfileAddFloatingButton';
import { GenerateFormBottomSheetContentView } from 'src/widgets/GenerateFormLink/GenerateFormBottomSheetContentView';
import { BottomSheet } from 'src/shared/ui/BottomSheet/BottomSheet';
import { ProfileCardList } from 'src/widgets/ProfileCardList/ProfileCardList';
import { ProfileShareTrigger } from 'src/pages/main/info_list/InfoListPage';

const createDriverOjb = ({
  onChangeState,
  onClickNext,
}: {
  onChangeState: (state: { activeIndex: number }) => void;
  onClickNext: (activeIndex: number) => void;
}) =>
  driver({
    onPopoverRender: (_, { state }) => {
      if (state.activeIndex) onChangeState({ activeIndex: state.activeIndex });
    },
    onNextClick: (_, __, { state }) => {
      if (state.activeIndex === undefined) return;
      onClickNext(state.activeIndex);
    },
    showProgress: false,
    allowClose: false,
    stagePadding: 8,
    stageRadius: 24,
    disableActiveInteraction: true,
    popoverClass: 'coach-mark-popover',
    showButtons: ['next'],

    steps: [
      {
        popover: {
          title: '',
          description: '지금까지 소개팅 주선이 어려우셨나요?\n이제 걱정하지 마세요.\n구구가 도와드릴게요!',
          nextBtnText: '좋아!',
          side: 'top',
          align: 'center',
        },
      },
      {
        element: '.profile-add-button',
        popover: {
          title: 'Step 1',
          description: '먼저 소개팅 후보 추가를 위해\n아래 + 후보추가 버튼을 눌러보세요.',
          side: 'top',
          showButtons: [],
        },
        disableActiveInteraction: false,
      },
      {
        element: '.share-link-wrapper',
        popover: {
          title: 'Step 2',
          description: '소개팅을 희망하는 분에게 링크 혹은 카카오톡으로\n본인 정보 입력 폼을 공유하세요.',
          side: 'bottom',
          nextBtnText: '다음',
        },
      },
      {
        element: '.profile-card',
        popover: {
          title: 'Step 3',
          description: '소개팅을 희망하는 분이 정보 입력을 마치면\n메인에 등록되어 확인할 수 있어요!',
          side: 'bottom',
          nextBtnText: '다음',
        },
      },
      {
        element: '.profile-share-button',
        popover: {
          title: 'Step 4',
          description:
            '좋은 짝을 찾아주기 위한 첫 걸음이죠!\n딱 맞는 사람이 나타났다면,\n공유하기 버튼을 눌러 정보를 공유해주세요!',
          side: 'bottom',
          nextBtnText: '이해했어!',
        },
      },
      {
        popover: {
          title: '',
          description:
            '구구와 함께 똑똑한 소개팅을 주선할\n준비가 되었나요?\n\n이 튜토리얼은 마이페이지에서\n언제든지 확인할 수 있어요!',
          nextBtnText: '구구 시작하기',
          side: 'top',
          align: 'center',
        },
      },
    ],
  });

const noop = () => {
  /**/
};

const profileMock: ArchivedInfoResponse = {
  birthDate: new Date('1998-03-08').toDateString(),
  drinking: {
    drinkingCategory: 'NON_DRINKER',
  },
  gender: 'MALE',
  height: 35,
  hobbies: ['📖 독서', '🎹 악기연주'],
  id: '1',
  images: [{ imageId: '', url: '/images/default_profile.png' }],
  job: { jobCategory: 'EMPLOYEE', jobName: '박사' },
  location: {
    cities: ['SEOUL'],
    towns: ['SEOCHO'],
  },
  mbti: 'ENFJ',
  name: '김구구',
  religion: { religionCategory: 'IRRELIGION' },
  smoking: { smokingCategory: 'NON_SMOKER' },
};

export const OnboardingPage = ({
  userInfo,
  onEndOnboarding,
}: {
  userInfo: UserInfoResponse;
  onEndOnboarding: () => void;
}) => {
  const [openModal, setOpenModal] = useState(false);

  const driveRef = useRef<Driver | null>(null);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const obj = createDriverOjb({
      onChangeState: ({ activeIndex }) => {
        setStep(activeIndex);

        document.documentElement.style.setProperty(
          '--onboarding-show-googoo',
          [0, 5].includes(activeIndex) ? 'block' : 'none',
        );
        document.documentElement.style.setProperty(
          '--onboarding-text-align',
          [0, 5].includes(activeIndex) ? 'center' : 'left',
        );
      },
      onClickNext: (activeIndex) => {
        obj.moveNext();
        if (activeIndex === 5) {
          onEndOnboarding();
        }
      },
    });

    obj.drive();
    driveRef.current = obj;

    document.documentElement.style.setProperty('--onboarding-show-googoo', 'block');
    document.documentElement.style.setProperty('--onboarding-text-align', 'center');

    return () => obj.destroy();
  }, []);

  useEffect(() => {
    if (openModal) driveRef.current?.moveTo(2);
  }, [openModal]);

  useEffect(() => {
    if (step === 3) setOpenModal(false);
  }, [step]);

  return (
    <>
      <div className={styles.Wrapper}>
        <div className={styles.Header}>
          <h2>소개 후보</h2>
          <Link to={'/mypage'}>
            <UserAvatar size={32} imageSrc={userInfo.profileImage} />
          </Link>
        </div>
        <p className={styles.ListInfo}>총 {step < 3 ? 0 : 1}명</p>
        {step < 2 ? (
          <div className={styles.EmptyView}>
            <img src="/images/empty.png" alt="정보 목록이 비어있음" />
            <p>
              등록된 정보가 없습니다.
              <br />
              지인의 정보를 등록하여 인연을 이어주세요!
            </p>
          </div>
        ) : (
          <div className={styles.ListWrapper}>
            <ProfileCardList
              profileList={[profileMock]}
              profileActionSlot={() => <ProfileShareTrigger onClick={noop} />}
            />
          </div>
        )}
        <ProfileAddFloatingButton
          className={'profile-add-button'}
          onClick={() => {
            setOpenModal(true);
          }}
        />
        {openModal && (
          <BottomSheet isOpen={true} onClose={noop} detent={'content-height'} animate={false}>
            <BottomSheet.Header onClose={noop} />
            <BottomSheet.Content>
              <GenerateFormBottomSheetContentView
                isOpen={true}
                onClickShareKakao={noop}
                onClickCopyLink={noop}
                onClickRegenerate={noop}
                onToggleLinkOpen={noop}
              />
            </BottomSheet.Content>
          </BottomSheet>
        )}
      </div>
    </>
  );
};
