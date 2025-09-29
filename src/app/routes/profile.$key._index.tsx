import { ProfilePage } from 'src/pages/profile/ProfilePage';
import { getInfo } from 'src/types';
import { authenticate } from 'src/app/server/authenticate';
import { useLoaderData } from '@remix-run/react';
import { json, LoaderFunction } from '@remix-run/node';
import { commitSession } from 'src/app/server/sessions';
import { MyProfileProvider } from 'src/entities/candidates/info/models/myProfileStore';
import { useMemo } from 'react';
import { convertDtoToProfile } from 'src/entities/candidates/info/models/convertProfileToDto';
import {
  convertDtoToIdealPartner,
  getSkippedIdealPartnerState,
} from 'src/entities/candidates/ideal_partner/models/convertIdealPartnerToDto';
import { IdealPartnerProvider } from 'src/entities/candidates/ideal_partner/models/idealPartnerStore';
import { ProfileHeaderActions } from 'src/pages/profile/components/ProfileHeaderActions';

export const loader: LoaderFunction = async ({ request, params }) => {
  const { accessToken, newSession } = await authenticate(request);

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

  return json(
    { id: key, profile: { ...data, userInfo: { ...data.userInfo, introduction: undefined } } },
    {
      headers: {
        ...(newSession && { 'Set-Cookie': await commitSession(newSession) }),
      },
    },
  );
};

export default function Page() {
  const { id, profile } = useLoaderData<typeof loader>();
  const profileInitialState = useMemo(() => convertDtoToProfile(profile.userInfo), [profile.userInfo]);
  const idealPartnerInitialState = useMemo(
    () => (profile.idealPartner ? convertDtoToIdealPartner(profile.idealPartner) : getSkippedIdealPartnerState()),
    [profile.idealPartner],
  );
  return (
    <MyProfileProvider initialState={profileInitialState}>
      <IdealPartnerProvider initialState={idealPartnerInitialState}>
        <ProfilePage headerSuffixSlot={(profile) => <ProfileHeaderActions infoId={id} name={profile.name} />} />
      </IdealPartnerProvider>
    </MyProfileProvider>
  );
}
