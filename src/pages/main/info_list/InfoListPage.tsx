import { ProfileCardList } from 'src/widgets/ProfileCardList/ProfileCardList';
import styles from './InfoListPage.module.css';
import { ScrollView } from 'src/shared/ui/ScrollView/ScrollView';
import { Link } from '@remix-run/react';
import { ArchivedInfoResponse, UserInfoResponse } from 'src/types';
import { Button } from '../../../shared/ui/Button/Button';
import { GridView, ListView, Share } from '../../../shared/ui/icons';
import { Theme } from '../../../shared/styles/constants';
import { MouseEvent, useState } from 'react';
import { ProfileShareBottomSheet } from '../../../features/ProfileShare/ProfileShareBottomSheet';
import { UserAvatar } from 'src/entities/user/ui/UserAvatar';
import { ProfileCardGrid } from 'src/widgets/ProfileCardGrid/ProfileCardGrid';
import { IconButton } from 'src/shared/ui/IconButton/IconButton';
import useLocalStorageState from 'src/shared/functions/useLocalStorageState';

export const InfoListPage = ({
  userInfo,
  profileList,
}: {
  userInfo: UserInfoResponse;
  profileList: ArchivedInfoResponse[];
}) => {
  const [viewType, setViewType] = useLocalStorageState<'GRID' | 'LIST'>('info-list-type', 'LIST');
  const [shareTargetId, setShareTargetId] = useState<string | null>(null);

  return (
    <div className={styles.Wrapper}>
      <div className={styles.Header}>
        <h2>소개 후보</h2>
        <Link to={'/mypage'}>
          <UserAvatar size={32} imageSrc={userInfo.profileImage} />
        </Link>
      </div>
      <div className={styles.ListHeader}>
        <p className={styles.ListInfo}>총 {profileList?.length}명</p>
        <IconButton onClick={() => setViewType((prev) => (prev === 'GRID' ? 'LIST' : 'GRID'))}>
          {viewType === 'GRID' ? (
            <GridView color={Theme.color.neutral50} />
          ) : (
            <ListView color={Theme.color.neutral50} />
          )}
        </IconButton>
      </div>
      {profileList?.length ? (
        <ScrollView viewportClassName={styles.Viewport}>
          {viewType === 'GRID' ? (
            <ProfileCardGrid
              profileList={profileList}
              profileActionSlot={(profile) => (
                <ProfileShareTrigger onClick={() => profile.id && setShareTargetId(profile.id)} />
              )}
            />
          ) : (
            <ProfileCardList
              profileList={profileList}
              profileActionSlot={(profile) => (
                <ProfileShareTrigger onClick={() => profile.id && setShareTargetId(profile.id)} />
              )}
            />
          )}
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
