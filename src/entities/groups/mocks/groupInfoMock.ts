import { CreateGroupRequestIcon, GroupHistoryResponse, GroupInfoResponse, GroupMemberResponse } from 'src/types';

export const groupInfoMock = {
  candidateCount: 5,
  groupIcon: 'LOCK' as const,
  groupId: '1',
  groupName: '유부 프로젝트',
  memberCount: 2,
  myStatus: 'MEMBER' as const,
  pendingCount: 2,
} as GroupInfoResponse;

export const groupMemberMock: GroupMemberResponse = {
  status: 'MEMBER',
  userId: '123',
  userName: '구구',
};

export const groupHistoryMock: GroupHistoryResponse = {
  infoId: '123',
  infoName: '김구구',
  timestamp: Date.now().toString(),
  type: 'INFO_ADDED',
  userId: '123',
  userName: 'asdf',
};

export const iconMap: Record<CreateGroupRequestIcon, string> = {
  [CreateGroupRequestIcon.WINE_GLASS]: '/images/group/asset_1.png',
  [CreateGroupRequestIcon.LOCK]: '/images/group/asset_2.png',
  [CreateGroupRequestIcon.LETTER]: '/images/group/asset_3.png',
  [CreateGroupRequestIcon.ARROW]: '/images/group/asset_4.png',
  [CreateGroupRequestIcon.HEART]: '/images/group/asset_5.png',
  [CreateGroupRequestIcon.FOOTPRINT]: '/images/group/asset_6.png',
  [CreateGroupRequestIcon.EGG]: '/images/group/asset_7.png',
  [CreateGroupRequestIcon.BOUQUET]: '/images/group/asset_8.png',
  [CreateGroupRequestIcon.RING]: '/images/group/asset_9.png',
  [CreateGroupRequestIcon.STAR]: '/images/group/asset_10.png',
};

export const iconList = Object.entries(iconMap) as [CreateGroupRequestIcon, string][];
