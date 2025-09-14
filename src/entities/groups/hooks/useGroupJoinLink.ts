import { createGroupInviteLink } from 'src/types';
import { useQuery } from '@tanstack/react-query';

export const useGroupJoinLink = (groupId: string) => {
  const { data, isLoading } = useQuery({
    queryFn: () => createGroupInviteLink(groupId),
    queryKey: ['group', 'join', groupId],
  });

  const link = data?.data.inviteKey ? `${location.origin}/groups/join/${data.data.inviteKey}` : '';

  return {
    link,
    isLoading,
  };
};
