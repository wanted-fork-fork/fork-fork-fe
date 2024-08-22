import { ProfilePage } from 'src/pages/profile/ProfilePage';
import { getInfo } from 'src/types';
import { withAuthenticated } from 'src/app/server/withAuthenticated';
import { useLoaderData } from '@remix-run/react';
import { MyProfileProvider } from 'src/entities/profile/model/myProfileStore';
import { IdealPartnerProvider } from 'src/entities/ideal_partner/model/idealPartnerStore';
import { useMemo } from 'react';
import { convertDtoToProfile } from 'src/entities/profile/model/convertProfileToDto';
import { convertDtoToIdealPartner } from 'src/entities/ideal_partner/model/convertIdealPartnerToDto';

export const loader = withAuthenticated(async ({ params }, accessToken) => {
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
});

export default function Page() {
  const { profile } = useLoaderData<typeof loader>();
  const profileInitialState = useMemo(() => convertDtoToProfile(profile.userInfo), [profile.userInfo]);
  const idealPartnerInitialState = useMemo(
    () => convertDtoToIdealPartner(profile.idealPartner),
    [profile.idealPartner],
  );
  return (
    <MyProfileProvider initialState={profileInitialState}>
      <IdealPartnerProvider initialState={idealPartnerInitialState}>
        <ProfilePage />
      </IdealPartnerProvider>
    </MyProfileProvider>
  );
}
