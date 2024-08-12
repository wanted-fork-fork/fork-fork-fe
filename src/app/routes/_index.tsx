import type { MetaFunction } from '@remix-run/node';
import { InfoListPage } from 'src/pages/main/info_list/InfoListPage';
import { CopyProfileFormLinkButton } from 'src/features/copy_profile_link/CopyProfileFormLinkButton';
import { withLogin } from 'src/entities/auth/withLogin';

export const meta: MetaFunction = () => {
  return [{ title: '구구' }, { name: 'description', content: '내 사랑을 구해줄래? 구해줄게!' }];
};

export default withLogin(function Index() {
  return (
    <>
      <InfoListPage />
      <CopyProfileFormLinkButton />
    </>
  );
});
