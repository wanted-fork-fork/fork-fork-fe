import { ProfileCardList } from 'src/entities/candidates/_common/components/ProfileCardList/ProfileCardList';
import styles from './InfoListPage.module.css';
import { ScrollView } from 'src/shared/ui/ScrollView/ScrollView';
import { Link } from '@remix-run/react';
import { ArchivedInfoResponse, UserInfoResponse } from 'src/types';
import { Button } from '../../../shared/ui/Button/Button';
import { GridView, ListView, Share } from '../../../shared/ui/icons';
import { Theme } from '../../../shared/styles/constants';
import { MouseEvent, useEffect, useMemo, useState } from 'react';
import { ProfileShareBottomSheet } from 'src/entities/candidates/_common/components/ProfileShare/ProfileShareBottomSheet';
import { UserAvatar } from 'src/entities/users/profiles/components/UserAvatar';
import { ProfileCardGrid } from 'src/entities/candidates/_common/components/ProfileCardGrid/ProfileCardGrid';
import { IconButton } from 'src/shared/ui/IconButton/IconButton';
import useLocalStorageState from 'src/shared/functions/useLocalStorageState';
import Flex from 'src/shared/ui/Flex/Flex';
import { Chip } from 'src/shared/ui/Chip/Chip';
import { z } from 'zod';
import { filterSchema } from 'src/entities/candidates/_common/libs/filter';
import { useIntersectionObserver } from 'src/shared/functions/useIntersectionObserver';

const noop = () => {
  /**/
};

export const InfoListPage = ({
  userInfo,
  profileList,
  hasFilter,
  filter,
  loading = false,
  onIntersectBottom,
}: {
  userInfo: UserInfoResponse;
  profileList: ArchivedInfoResponse[];
  hasFilter: boolean;
  filter: z.infer<typeof filterSchema>;
  loading?: boolean;
  onIntersectBottom?: () => void;
}) => {
  const { ref, isIntersecting } = useIntersectionObserver();

  const [viewType, setViewType] = useLocalStorageState<'GRID' | 'LIST'>('info-list-type', 'LIST');
  const [shareTargetId, setShareTargetId] = useState<string | null>(null);

  const filterUrl = useMemo(() => {
    const params = Object.entries(filter)
      .filter(([, value]) => Boolean(value))
      .map((kv) => kv.join('='))
      .join('&');
    return `/filter?${params}`;
  }, [filter]);

  useEffect(() => {
    if (isIntersecting) onIntersectBottom?.();
  }, [isIntersecting, onIntersectBottom]);

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
      {profileList?.length > 0 && (
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
          <div ref={ref} style={{ margin: 'auto', height: '20px' }} />
        </ScrollView>
      )}
      {!loading && (!profileList || profileList.length === 0) && (
        <div className={styles.EmptyView}>
          <img src="/images/empty.png" alt="정보 목록이 비어있음" />
          {hasFilter ? (
            <p>
              조건에 맞는 후보를 찾을 수 없습니다.
              <br />
              필터 조건을 변경하여 다시 검색해보세요.
            </p>
          ) : (
            <p>
              등록된 정보가 없습니다.
              <br />
              지인의 정보를 등록하여 인연을 이어주세요!
            </p>
          )}
        </div>
      )}
      {loading && <p>불러오는중..</p>}
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
