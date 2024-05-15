import { shareProfile } from '../lib';
import { Profile } from '@repo/entities-profile';

type Props = {
  profile: Profile;
};

export const ShareProfileIconButton = ({ profile }: Props) => <button title={'공유하기'} onClick={() => shareProfile(profile)} />;
