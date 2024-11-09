import { getInfo, updateInfo } from 'src/types';
import { authenticate } from 'src/app/server/authenticate';
import { useLoaderData } from '@remix-run/react';
import { MyProfileProvider } from 'src/entities/profile/model/myProfileStore';
import { IdealPartnerProvider } from 'src/entities/ideal_partner/model/idealPartnerStore';
import { useMemo } from 'react';
import { convertDtoToProfile } from 'src/entities/profile/model/convertProfileToDto';
import { convertDtoToIdealPartner } from 'src/entities/ideal_partner/model/convertIdealPartnerToDto';
import { ActionFunctionArgs, json, LoaderFunction, redirect } from '@remix-run/node';
import { commitSession } from 'src/app/server/sessions';
import { EditInfoPage } from 'src/pages/edit_info/EditInfoPage';

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
    { profile: data },
    {
      headers: {
        ...(newSession && { 'Set-Cookie': await commitSession(newSession) }),
      },
    },
  );
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const { accessToken, newSession } = await authenticate(request);
  const body = await request.formData();

  const id = body.get('id') as string;

  try {
    await updateInfo(
      // TODO: zod로 타입 체크
      {
        id,
        userInfo: JSON.parse(body.get('userInfo') as string),
        idealPartner: JSON.parse(body.get('idealPartner') as string),
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return redirect(`/profile/${id}`, {
      headers: {
        ...(newSession && { 'Set-Cookie': await commitSession(newSession) }),
      },
    });
  } catch (e) {
    console.error(e, {
      userInfo: JSON.parse(body.get('userInfo') as string),
      idealPartner: JSON.parse(body.get('idealPartner') as string),
    });
    return { status: 500 };
  }
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
        <EditInfoPage infoId={profile.id} />
      </IdealPartnerProvider>
    </MyProfileProvider>
  );
}
