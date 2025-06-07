import { ProfileCardList } from 'src/entities/candidates/_common/components/ProfileCardList/ProfileCardList';
import styles from './InfoListPage.module.css';
import { ScrollView } from 'src/shared/ui/ScrollView/ScrollView';
import { Link } from '@remix-run/react';
import { ArchivedInfoResponse, UserInfoResponse } from 'src/types';
import { Button } from '../../../shared/ui/Button/Button';
import { GridView, ListView, Share } from '../../../shared/ui/icons';
import { Theme } from '../../../shared/styles/constants';
import { MouseEvent, useMemo, useState } from 'react';
import { ProfileShareBottomSheet } from 'src/entities/candidates/_common/components/ProfileShare/ProfileShareBottomSheet';
import { UserAvatar } from 'src/entities/users/profiles/components/UserAvatar';
import { ProfileCardGrid } from 'src/entities/candidates/_common/components/ProfileCardGrid/ProfileCardGrid';
import { IconButton } from 'src/shared/ui/IconButton/IconButton';
import useLocalStorageState from 'src/shared/functions/useLocalStorageState';
import Flex from 'src/shared/ui/Flex/Flex';
import { Chip } from 'src/shared/ui/Chip/Chip';
import { z } from 'zod';
import { filterSchema } from 'src/entities/candidates/_common/libs/filter';

const noop = () => {
  /**/
};

export const InfoListPage = ({
  userInfo,
  profileList,
  hasFilter,
  filter,
}: {
  userInfo: UserInfoResponse;
  profileList: ArchivedInfoResponse[];
  hasFilter: boolean;
  filter: z.infer<typeof filterSchema>;
}) => {
  const [viewType, setViewType] = useLocalStorageState<'GRID' | 'LIST'>('info-list-type', 'LIST');
  const [shareTargetId, setShareTargetId] = useState<string | null>(null);

  const filterUrl = useMemo(() => {
    const params = Object.entries(filter)
      .filter(([, value]) => Boolean(value))
      .map((kv) => kv.join('='))
      .join('&');
    return `/filter?${params}`;
  }, [filter]);

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
        <Flex gap={12}>
          <Link to={filterUrl}>
            <Chip selected={hasFilter} onClick={noop}>
              <span>필터 및 정렬 조건</span>
              {hasFilter && <span className={styles.Dot} />}
            </Chip>
          </Link>
          <IconButton onClick={() => setViewType((prev) => (prev === 'GRID' ? 'LIST' : 'GRID'))}>
            {viewType === 'GRID' ? (
              <GridView color={Theme.color.neutral50} />
            ) : (
              <ListView color={Theme.color.neutral50} />
            )}
          </IconButton>
        </Flex>
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
        <Share color={Theme.color.neutral50} width={20} height={21} />
      </Button>
    </>
  );
};
