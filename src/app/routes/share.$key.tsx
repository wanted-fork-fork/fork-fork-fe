import { LoaderFunction } from '@remix-run/node';
import { authenticate } from '../server/authenticate';
import { getInfoBySharingId } from '../../types';
import { useLoaderData } from '@remix-run/react';
import { useMemo } from 'react';
import { convertDtoToProfile } from '../../entities/profile/model/convertProfileToDto';
import { MyProfileProvider } from '../../entities/profile/model/myProfileStore';
import { ProfilePage } from '../../pages/profile/ProfilePage';

export const loader: LoaderFunction = async ({ request, params }) => {
  const accessToken = await authenticate(request);

  const { key } = params;

  if (!key) {
    throw new Response('', {
      status: 404,
      statusText: 'Not Found',
    });
  }

  const { data } = await getInfoBySharingId(key, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return { profile: data };
};

export default function Page() {
  const { profile } = useLoaderData<typeof loader>();
  const profileInitialState = useMemo(() => convertDtoToProfile(profile.userInfo), [profile.userInfo]);

  return (
    <MyProfileProvider initialState={profileInitialState}>
      <ProfilePage />
    </MyProfileProvider>
  );
}
