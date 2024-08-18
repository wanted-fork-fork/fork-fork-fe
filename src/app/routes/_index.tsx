import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { GenerateFormLink } from 'src/widgets/GenerateFormLink/GenerateFormLink';
import { authenticate } from 'src/app/server/authenticate';
import { getAuthSession } from 'src/app/server/sessions';
import { getAllInfo } from 'src/types';
import { InfoListPage } from 'src/pages/main/info_list/InfoListPage';
import { useLoaderData } from '@remix-run/react';

export const meta: MetaFunction = () => {
  return [{ title: '구구' }, { name: 'description', content: '내 사랑을 구해줄래? 구해줄게!' }];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const session = await getAuthSession(request);
  const accessToken = await authenticate(request, session);
  const { data } = await getAllInfo({
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return json({ profileList: data });
};

export default function Index() {
  const { profileList } = useLoaderData<typeof loader>();
  return (
    <>
      <InfoListPage profileList={profileList} />
      <GenerateFormLink />
    </>
  );
}
