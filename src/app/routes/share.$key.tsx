import { json, LoaderFunction, MetaFunction } from '@remix-run/node';
import { getInfoBySharingId } from '../../types';
import { useLoaderData } from '@remix-run/react';
import { useMemo } from 'react';
import { convertDtoToProfile } from '../../entities/profile/model/convertProfileToDto';
import { MyProfileProvider } from '../../entities/profile/model/myProfileStore';
import { SharedProfilePage } from 'src/pages/shared_profile/SharedProfilePage';
import { getNickname } from 'src/entities/profile/lib/getNickname';

export const meta: MetaFunction = () => {
  return [
    { title: '[구구] 이 분 어떠신가요?' },
    { name: 'description', content: '좋은 분인 것 같아서 소개드려요.' },
    { property: 'og:image', content: 'https://www.meetgoogoo.com/images/meta_share.png' },
    { property: 'og:image:width', content: '800' },
    { property: 'og:image:height', content: '400' },
  ];
};

export const loader: LoaderFunction = async ({ params }) => {
  const { key } = params;

  if (!key) {
    throw new Response('', {
      status: 404,
      statusText: 'Not Found',
    });
  }

  const { data } = await getInfoBySharingId(key);

  return json({ profile: data, key, expiredDate: data.expiredDate });
};

export default function Page() {
  const { profile, key, expiredDate: rawExpiredDate } = useLoaderData<typeof loader>();
  const profileInitialState = useMemo(
    () => convertDtoToProfile({ ...profile.userInfo, name: getNickname(key) }),
    [key, profile.userInfo],
  );

  const expiredDate = useMemo(() => new Date(rawExpiredDate), [rawExpiredDate]);

  return (
    <MyProfileProvider initialState={profileInitialState}>
      <SharedProfilePage expiredDate={expiredDate} />
    </MyProfileProvider>
  );
}
