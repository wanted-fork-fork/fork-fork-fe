import { json, LoaderFunction } from '@remix-run/node';
import { authenticate } from 'src/app/server/authenticate';
import { commitSession } from 'src/app/server/sessions';
import { deleteGroupInfo, getGroupInfoDetail, saveSharingWithGroup } from 'src/types';
import { useLoaderData, useNavigate, useRevalidator } from '@remix-run/react';
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
import { useBoolean } from 'src/shared/functions/useBoolean';
import { EditCommentBottomSheet } from 'src/entities/groups/components/comment/EditCommentBottomSheet';
import { ConfirmModal } from 'src/shared/ui/ConfirmModal/ConfirmModal';

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
  const revalidator = useRevalidator();

  const { value: isCommentEditOpen, setTrue: openCommentEdit, setFalse: closeCommentEdit } = useBoolean();
  const { value: isProfileDeleteOpen, setTrue: openProfileDelete, setFalse: closeProfileDelete } = useBoolean();

  const [isShareOpen, setShareOpen] = useState(false);

  const { mutate: mutateDelete } = useMutation({
    mutationFn: () => deleteGroupInfo(groupId, infoId),
    onSuccess: () => {
      toast('정보가 삭제되었습니다.');
      navigate(`/groups/${groupId}`);
    },
  });

  const comment = useMemo(
    () =>
      profile.comment || profile.isCreatedByMe
        ? {
            creatorImg: profile.creatorImage ?? '',
            creatorName: profile.creatorName,
            comment: profile.comment ?? '',
            onClickEdit: profile.isCreatedByMe ? openCommentEdit : undefined,
          }
        : undefined,
    [openCommentEdit, profile.comment, profile.creatorImage, profile.creatorName, profile.isCreatedByMe],
  );

  const profileInitialState = useMemo(() => convertDtoToProfile(profile.userInfo), [profile.userInfo]);
  const idealPartnerInitialState = useMemo(
    () => (profile.idealPartner ? convertDtoToIdealPartner(profile.idealPartner) : getSkippedIdealPartnerState()),
    [profile.idealPartner],
  );

  const handleCloseEditComment = useCallback(() => {
    revalidator.revalidate();
    closeCommentEdit();
  }, [closeCommentEdit, revalidator]);

  return (
    <MyProfileProvider initialState={profileInitialState}>
      <IdealPartnerProvider initialState={idealPartnerInitialState}>
        <>
          <ProfilePage
            headerSuffixSlot={() => (
              <Flex gap={16}>
                {profile.isCreatedByMe && (
                  <IconButton onClick={openProfileDelete}>
                    <Delete color={Theme.color.neutral50} />
                  </IconButton>
                )}
                <IconButton onClick={() => setShareOpen(true)}>
                  <Share color={Theme.color.neutral50} />
                </IconButton>
              </Flex>
            )}
            comment={comment}
          />
          <ProfileShareBottomSheet
            isOpen={isShareOpen}
            onClose={() => setShareOpen(false)}
            infoId={infoId}
            saveSharing={(infoId) => saveSharingWithGroup(groupId, infoId)}
            createSharedLink={(shareId) => createSharedGroupLink({ groupId, shareId, fullLink: true })}
          />
          <EditCommentBottomSheet
            isOpen={isCommentEditOpen}
            groupId={groupId}
            infoId={infoId}
            initialComment={comment?.comment ?? ''}
            onClose={handleCloseEditComment}
          />
          <ConfirmModal
            show={isProfileDeleteOpen}
            title={`${profile.userInfo.name} 정보를 삭제할까요?`}
            description={'그룹에서 해당 정보가 삭제됩니다.'}
            confirmText={'삭제'}
            cancelText={'취소'}
            onConfirm={() => mutateDelete()}
            onCancel={closeProfileDelete}
          />
        </>
      </IdealPartnerProvider>
    </MyProfileProvider>
  );
}
