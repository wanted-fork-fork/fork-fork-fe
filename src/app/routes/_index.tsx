import type { LoaderFunction, MetaFunction } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { InfoListPage } from 'src/pages/main/info_list/InfoListPage';
import { CopyProfileFormLinkButton } from 'src/features/copy_profile_link/CopyProfileFormLinkButton';

export const meta: MetaFunction = () => {
  return [{ title: '구구' }, { name: 'description', content: '내 사랑을 구해줄래? 구해줄게!' }];
};

export const loader: LoaderFunction = ({ request }) => {
  const url = new URL(request.url);
  const val = url.searchParams.get('login');

  if (!val) {
    return redirect('/login');
  }

  return {};
};

export default function Index() {
  return (
    <>
      <InfoListPage />
      <CopyProfileFormLinkButton />
    </>
  );
}
