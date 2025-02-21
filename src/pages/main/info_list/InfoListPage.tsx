import { ProfileCardList } from 'src/widgets/ProfileCardList/ProfileCardList';
import styles from './InfoListPage.module.css';
import { ScrollView } from 'src/shared/ui/ScrollView/ScrollView';
import { Link } from '@remix-run/react';
import { ArchivedInfoResponse, UserInfoResponse } from 'src/types';
import { Button } from '../../../shared/ui/Button/Button';
import { Share } from '../../../shared/ui/icons';
import { Theme } from '../../../shared/styles/constants';
import { MouseEvent, useState } from 'react';
import { ProfileShareBottomSheet } from '../../../features/ProfileShare/ProfileShareBottomSheet';
import { UserAvatar } from 'src/entities/user/ui/UserAvatar';

export const InfoListPage = ({
  userInfo,
  profileList,
}: {
  userInfo: UserInfoResponse;
  profileList: ArchivedInfoResponse[];
}) => {
  const [shareTargetId, setShareTargetId] = useState<string | null>(null);

  return (
    <div className={styles.Wrapper}>
      <div className={styles.Header}>
        <h2>소개 후보</h2>
        <Link to={'/mypage'}>
          <UserAvatar size={32} imageSrc={userInfo.profileImage} />
        </Link>
      </div>
      <p className={styles.ListInfo}>총 {profileList?.length}명</p>
      {profileList?.length ? (
        <ScrollView viewportClassName={styles.Viewport}>
          <ProfileCardList
            profileList={profileList}
            profileActionSlot={(profile) => (
              <ProfileShareTrigger onClick={() => profile.id && setShareTargetId(profile.id)} />
            )}
          />
        </ScrollView>
      ) : (
        <div className={styles.EmptyView}>
          <img src="/images/empty.png" alt="정보 목록이 비어있음" />
          <p>
            등록된 정보가 없습니다.
            <br />
            지인의 정보를 등록하여 인연을 이어주세요!
          </p>
        </div>
      )}
      <ProfileShareBottomSheet
        infoId={shareTargetId}
        isOpen={Boolean(shareTargetId)}
        onClose={() => setShareTargetId(null)}
      />
    </div>
  );
};

export const ProfileShareTrigger = ({ onClick }: { onClick: () => void }) => {
  const handleClick = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    onClick();
  };

  return (
    <>
      <Button
        className={'profile-share-button'}
        variant={'ghost'}
        widthType={'hug'}
        color={'neutral'}
        size={'fit'}
        onClick={handleClick}
      >
        <Share color={Theme.color.neutral50} />
      </Button>
    </>
  );
};
