import { profileMock } from 'src/entities/candidates/info/mocks/profile.mock';
import { ProfileSummary } from 'src/entities/candidates/info/types/profileSummary';
import { CreateGroupRequestIcon } from 'src/types';

export const groupInfoMock = {
  id: '1',
  name: '유부 프로젝트',
  icon: 'LOCK' as CreateGroupRequestIcon,
  candidateCounts: 5,
};

export type GroupSummary = typeof groupInfoMock;

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

export const groupMemberMock = {
  id: 1,
  name: '김감자',
  profileImage: '/images/default_profile.png',
  isAdmin: false,
};

export type GroupMember = typeof groupMemberMock;

export type GroupHistory = {
  id: number;
  member: GroupMember;
  contents: string;
  info: ProfileSummary;
  date: Date;
};

export const groupHistoryMock = {
  id: 1,
  member: groupMemberMock,
  contents: '외부 정보 공유',
  info: profileMock,
  date: new Date(),
} satisfies GroupHistory;
