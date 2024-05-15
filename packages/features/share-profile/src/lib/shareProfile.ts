import { Profile } from '@repo/entities-profile';

export const shareProfile = (profile: Profile) => {
  alert(`프로필 공유 ${profile.name}`);
};
