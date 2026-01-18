import { GroupInfoResponse, GroupInfoWithDetailResponse, saveSharingWithGroup } from 'src/types';
import { FormLayout } from 'src/pages/layout/FormLayout';
import { Header } from 'src/shared/ui/layout/Header/Header';
import { Link, useFetcher, useNavigate } from '@remix-run/react';
import Flex from 'src/shared/ui/Flex/Flex';
import { IconButton } from 'src/shared/ui/IconButton/IconButton';
import { ListAlt, Setting } from 'src/shared/ui/icons';
import { Theme } from 'src/shared/styles/constants';
import { FloatingButton } from 'src/shared/ui/FloatingButton/FloatingButton';
import { InfoList } from 'src/widgets/info/InfoList';
import { createSharedGroupLink } from 'src/shared/functions/linkUtil';
import { AvatarWithComment } from 'src/entities/users/profiles/components/AvatarWithComment/AvatarWithComment';
import { useCallback, useEffect, useState } from 'react';
import { Avatar } from 'src/shared/ui/Avatar/Avatar';
import styles from './GroupMainPage.module.css';

export const GroupMainPage = ({
  filter,
  hasFilter,
  groupInfo,
}: {
  groupInfo: GroupInfoResponse;
  totalCount: number;
  hasFilter: boolean;
  filter: object;
}) => {
  const navigate = useNavigate();

  const [page, setPage] = useState(0);
  const [profileList, setProfileList] = useState<GroupInfoWithDetailResponse[]>([]);
  const fetcher = useFetcher<{ profileList: GroupInfoWithDetailResponse[]; hasMore: boolean; totalCount: number }>();

  const totalCount = fetcher?.data?.totalCount ?? 0;

  const handleIntersectBottom = useCallback(() => {
    if (!fetcher.data?.hasMore) {
      return;
    }

    setPage((prev) => prev + 1);
  }, [fetcher.data?.hasMore]);

  useEffect(() => {
    const params = Object.entries(filter)
      .map(([k, v]) => `${k}=${v}`)
      .join('&');
    fetcher.load(`/groups/${groupInfo.groupId}/infos?page=${page}&${params}`);
  }, [filter, groupInfo.groupId, page]);

  useEffect(() => {
    if (!fetcher.data) return;
    setProfileList((prev) => [...prev, ...(fetcher.data?.profileList ?? [])]);
  }, [fetcher.data]);

  return (
    <FormLayout.Container>
      <Header
        onPrev={() => navigate('/groups')}
        suffixSlot={
          <Flex direction={'horizontal'} gap={20}>
            <Link to={`/groups/${groupInfo.groupId}/history`}>
              <IconButton>
                <ListAlt color={Theme.color.neutral50} />
              </IconButton>
            </Link>
            <Link to={`/groups/${groupInfo.groupId}/info`}>
              <IconButton>
                <Setting color={Theme.color.neutral50} />
              </IconButton>
            </Link>
          </Flex>
        }
      >
        {groupInfo.groupName}
      </Header>

      <InfoList<GroupInfoWithDetailResponse>
        profileList={profileList}
        totalCount={totalCount}
        hasFilter={hasFilter}
        loading={fetcher.state === 'loading'}
        filter={filter}
        filterPathName={`/groups/${groupInfo.groupId}/filter`}
        getProfileLink={(id) => `/groups/${groupInfo.groupId}/profiles/${id}`}
        saveSharing={(infoId) => saveSharingWithGroup(groupInfo.groupId, infoId)}
        createSharedLink={(shareId) => createSharedGroupLink({ groupId: groupInfo.groupId, shareId, fullLink: true })}
        renderCardFooter={(profile) =>
          profile.comment ? (
            <AvatarWithComment
              creatorImg={profile.creatorImage ?? '/images/default_profile.png'}
              creatorName={profile.creatorName}
              comment={profile.comment ?? ''}
            />
          ) : null
        }
        renderGridImageOverlay={(profile) => (
          <div className={styles.GridImageOverlay}>
            <Avatar
              src={profile.creatorImage ?? '/images/default_profile.png'}
              alt={profile.creatorName}
              width={40}
              height={40}
              size={40}
              shape={'circle'}
              fallback={profile.creatorName}
            />
          </div>
        )}
        onIntersectBottom={handleIntersectBottom}
      />

      <Link to={`/groups/${groupInfo.groupId}/add`}>
        <FloatingButton
          text={'후보 추가'}
          onClick={() => {
            /**/
          }}
        />
      </Link>
    </FormLayout.Container>
  );
};
