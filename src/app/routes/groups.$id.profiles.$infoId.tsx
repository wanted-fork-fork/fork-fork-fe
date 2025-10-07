import { json, LoaderFunction } from '@remix-run/node';
import { authenticate } from 'src/app/server/authenticate';
import { commitSession } from 'src/app/server/sessions';
import { deleteGroupInfo, getGroupInfoDetail, saveSharingWithGroup } from 'src/types';
import { useLoaderData, useNavigate } from '@remix-run/react';
import { MyProfileProvider } from 'src/entities/candidates/info/models/myProfileStore';
import { IdealPartnerProvider } from 'src/entities/candidates/ideal_partner/models/idealPartnerStore';
import { ProfilePage } from 'src/pages/profile/ProfilePage';
import { useCallback, useMemo, useState } from 'react';
import { convertDtoToProfile } from 'src/entities/candidates/info/models/convertProfileToDto';
import {
  convertDtoToIdealPartner,
  getSkippedIdealPartnerState,
} from 'src/entities/candidates/ideal_partner/models/convertIdealPartnerToDto';
import { IconButton } from 'src/shared/ui/IconButton/IconButton';
import { Delete, Share } from 'src/shared/ui/icons';
import Flex from 'src/shared/ui/Flex/Flex';
import { Theme } from 'src/shared/styles/constants';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { ProfileShareBottomSheet } from 'src/entities/candidates/_common/components/ProfileShare/ProfileShareBottomSheet';
import { createSharedGroupLink } from 'src/shared/functions/linkUtil';

export const loader: LoaderFunction = async ({ request, params }) => {
  const { id, infoId } = params;
  const { accessToken, newSession } = await authenticate(request);

  if (!id || !infoId) return null;

  const { data: profile } = await getGroupInfoDetail(id, infoId, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return json(
    {
      profile,
      groupId: id,
      infoId,
    },
    {
      headers: {
        ...(newSession && { 'Set-Cookie': await commitSession(newSession) }),
      },
    },
  );
};

export default function GroupDetailPage() {
  const { profile, groupId, infoId } = useLoaderData<typeof loader>();
  const navigate = useNavigate();

  const [isShareOpen, setShareOpen] = useState(false);

  const { mutate: mutateDelete } = useMutation({
    mutationFn: () => deleteGroupInfo(groupId, infoId),
    onSuccess: () => {
      toast('정보가 삭제되었습니다.');
      navigate(`/groups/${groupId}`);
    },
  });

  const profileInitialState = useMemo(() => convertDtoToProfile(profile.userInfo), [profile.userInfo]);
  const idealPartnerInitialState = useMemo(
    () => (profile.idealPartner ? convertDtoToIdealPartner(profile.idealPartner) : getSkippedIdealPartnerState()),
    [profile.idealPartner],
  );

  const handleClickDelete = useCallback(() => {
    mutateDelete();
  }, [mutateDelete]);

  return (
    <MyProfileProvider initialState={profileInitialState}>
      <IdealPartnerProvider initialState={idealPartnerInitialState}>
        <>
        <ProfilePage
          headerSuffixSlot={() => (
            <Flex gap={16}>
              <IconButton onClick={handleClickDelete}>
                <Delete color={Theme.color.neutral50} />
              </IconButton>
              <IconButton onClick={() => setShareOpen(true)}>
                <Share color={Theme.color.neutral50} />
              </IconButton>
            </Flex>
          )}
          comment={profile.comment ? {
            creatorImg: profile.creatorImage ?? '',
            creatorName: profile.creatorName,
            comment: profile.comment ?? '',
          } : undefined}
        />
        <ProfileShareBottomSheet
          isOpen={isShareOpen}
          onClose={() => setShareOpen(false)}
          infoId={infoId}
          saveSharing={(infoId) => saveSharingWithGroup(groupId, infoId)}
          createSharedLink={(shareId) => createSharedGroupLink({ groupId, shareId, fullLink: true })}
        />
        </>
      </IdealPartnerProvider>
    </MyProfileProvider>
  );
}
