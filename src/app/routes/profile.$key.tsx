import { ProfilePage } from 'src/pages/profile/ProfilePage';
import { getInfo } from 'src/types';
import { authenticate } from 'src/app/server/authenticate';
import { useLoaderData } from '@remix-run/react';
import { MyProfileProvider } from 'src/entities/profile/model/myProfileStore';
import { IdealPartnerProvider } from 'src/entities/ideal_partner/model/idealPartnerStore';
import { useMemo } from 'react';
import { convertDtoToProfile } from 'src/entities/profile/model/convertProfileToDto';
import { convertDtoToIdealPartner } from 'src/entities/ideal_partner/model/convertIdealPartnerToDto';
import { LoaderFunction } from '@remix-run/node';

export const loader: LoaderFunction = async ({ request, params }) => {
  const accessToken = await authenticate(request);

  const { key } = params;

  if (!key) {
    throw new Response('', {
      status: 404,
      statusText: 'Not Found',
    });
  }

  const { data } = await getInfo(key, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return { profile: data };
};

export default function Page() {
  const { profile } = useLoaderData<typeof loader>();
  const profileInitialState = useMemo(() => convertDtoToProfile(profile.userInfo), [profile.userInfo]);
  const idealPartnerInitialState = useMemo(
    () => (profile.idealPartner ? convertDtoToIdealPartner(profile.idealPartner) : undefined),
    [profile.idealPartner],
  );
  return (
    <MyProfileProvider initialState={profileInitialState}>
      <IdealPartnerProvider initialState={idealPartnerInitialState}>
        <ProfilePage infoId={profile.id} />
      </IdealPartnerProvider>
    </MyProfileProvider>
  );
}
