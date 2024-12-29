import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { authenticate } from 'src/app/server/authenticate';
import { getAllInfo, hasSeenOnboarding, info } from 'src/types';
import { InfoListPage } from 'src/pages/main/info_list/InfoListPage';
import { useLoaderData } from '@remix-run/react';
import { GenerateFormLink } from 'src/widgets/GenerateFormLink/GenerateFormLink';
import { commitSession } from 'src/app/server/sessions';
import { OnboardingPage } from 'src/pages/main/onboarding/OnboardingPage';
import { useState } from 'react';

export const loader: LoaderFunction = async ({ request }) => {
  const { accessToken, newSession } = await authenticate(request);

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

  const { data: seenOnboarding } = await hasSeenOnboarding({
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return json(
    { userInfo, profileList, seenOnboarding },
    {
      headers: {
        ...(newSession && { 'Set-Cookie': await commitSession(newSession) }),
      },
    },
  );
};

export default function Index() {
  const { profileList, userInfo, seenOnboarding } = useLoaderData<typeof loader>();

  const [seenOnboardingState, setSeenOnboardingState] = useState(seenOnboarding);

  return seenOnboardingState ? (
    <>
      <InfoListPage userInfo={userInfo} profileList={profileList} />
      <GenerateFormLink />
    </>
  ) : (
    <OnboardingPage onClickNextPage={() => setSeenOnboardingState(true)} />
  );
}
