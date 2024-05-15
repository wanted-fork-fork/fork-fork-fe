import { Profile } from 'entities/profile';
import { Share } from 'shared/icons';
import { shareProfile } from '../lib';

type Props = {
  profile: Profile;
};

export const ShareProfileIconButton = ({ profile }: Props) => {
  return (
    <button title={'공유하기'} onClick={() => shareProfile(profile)}>
      <Share />
    </button>
  );
};
