import styles from 'src/pages/main/info_list/InfoListPage.module.css';
import Flex from 'src/shared/ui/Flex/Flex';
import { Link } from '@remix-run/react';
import { Chip } from 'src/shared/ui/Chip/Chip';
import { IconButton } from 'src/shared/ui/IconButton/IconButton';
import { GridView, ListView } from 'src/shared/ui/icons';
import { Theme } from 'src/shared/styles/constants';
import { ScrollView } from 'src/shared/ui/ScrollView/ScrollView';
import { ProfileCardGrid } from 'src/entities/candidates/_common/components/ProfileCardGrid/ProfileCardGrid';
import { ProfileCardList } from 'src/entities/candidates/_common/components/ProfileCardList/ProfileCardList';
import { ProfileShareBottomSheet } from 'src/entities/candidates/_common/components/ProfileShare/ProfileShareBottomSheet';
import { ProfileShareTrigger } from 'src/pages/main/info_list/InfoListPage';
import { useEffect, useMemo, useState } from 'react';
import { useIntersectionObserver } from 'src/shared/functions/useIntersectionObserver';
import useLocalStorageState from 'src/shared/functions/useLocalStorageState';
import { ArchivedInfoResponse, SaveSharingResult } from 'src/types';
import { filterSchema } from 'src/entities/candidates/_common/libs/filter';
import { z } from 'zod';

export const InfoList = ({
  // userInfo,
  profileList,
  totalCount,
  hasFilter,
  filter,
  loading = false,
  getProfileLink,
  saveSharing,
  onIntersectBottom,
}: {
  // userInfo: UserInfoResponse;
  profileList: ArchivedInfoResponse[];
  totalCount: number;
  hasFilter: boolean;
  filter: z.infer<typeof filterSchema>;
  loading?: boolean;
  getProfileLink: (id: string) => string;
  saveSharing: (infoId: string) => Promise<SaveSharingResult>;
  onIntersectBottom?: () => void;
}) => {
  const { ref, isIntersecting } = useIntersectionObserver();

  const [viewType, setViewType] = useLocalStorageState<'GRID' | 'LIST'>('info-list-type', 'LIST');
  const [shareTargetId, setShareTargetId] = useState<string | null>(null);

  const filterUrl = useMemo(() => {
    if (!hasFilter) return '/filter';
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
    <>
      <div className={styles.ListHeader}>
        <p className={styles.ListInfo}>총 {totalCount}명</p>
        <Flex gap={12}>
          <Link to={filterUrl}>
            <Chip
              className={styles.FilterButton}
              selected={hasFilter}
              onClick={() => {
                /**/
              }}
            >
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
              getLink={getProfileLink}
            />
          ) : (
            <ProfileCardList
              profileList={profileList}
              profileActionSlot={(profile) => (
                <ProfileShareTrigger onClick={() => profile.id && setShareTargetId(profile.id)} />
              )}
              getLink={getProfileLink}
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
        saveSharing={saveSharing}
      />
    </>
  );
};
