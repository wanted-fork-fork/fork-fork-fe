export const groupInfoMock = {
  id: 1,
  name: '유부 프로젝트',
  icon: {
    url: '/images/group/asset_1.png',
  },
  candidateCounts: 5,
};

export type GroupSummary = typeof groupInfoMock;

export const iconList = [
  '/images/group/asset_1.png',
  '/images/group/asset_2.png',
  '/images/group/asset_3.png',
  '/images/group/asset_4.png',
  '/images/group/asset_5.png',
  '/images/group/asset_6.png',
  '/images/group/asset_7.png',
  '/images/group/asset_8.png',
  '/images/group/asset_9.png',
  '/images/group/asset_10.png',
];

export const groupMemberMock = {
  id: 1,
  name: '김감자',
  profileImage: '/images/default_profile.png',
  isAdmin: false,
};

export type GroupMember = typeof groupMemberMock;
