import type { MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { withAuthenticated } from 'src/app/server/withAuthenticated';
import { getAllInfo, info } from 'src/types';
import { InfoListPage } from 'src/pages/main/info_list/InfoListPage';
import { useLoaderData } from '@remix-run/react';
import { GenerateFormLink } from 'src/widgets/GenerateFormLink/GenerateFormLink';

export const meta: MetaFunction = () => {
  return [{ title: '구구' }, { name: 'description', content: '내 사랑을 구해줄래? 구해줄게!' }];
};

export const loader = withAuthenticated(async (_, accessToken) => {
  const { data: profileList } = await getAllInfo({
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const { data: userInfo } = await info({
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return json({ userInfo, profileList });
});

export default function Index() {
  const { profileList, userInfo } = useLoaderData<typeof loader>();
  return (
    <>
      <InfoListPage userInfo={userInfo} profileList={profileList} />
      <GenerateFormLink />
    </>
  );
}
