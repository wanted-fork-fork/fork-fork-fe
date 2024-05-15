import { shareProfile } from '../lib';
import { Profile } from '../../../entities';
import { Share } from '../../../shared/icons';

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
