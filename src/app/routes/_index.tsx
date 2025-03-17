import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { authenticate } from 'src/app/server/authenticate';
import { getAllInfo, getUserEnrollmentStatus, info } from 'src/types';
import { InfoListPage } from 'src/pages/main/info_list/InfoListPage';
import { useLoaderData } from '@remix-run/react';
import { GenerateFormLink } from 'src/widgets/GenerateFormLink/GenerateFormLink';
import { commitSession } from 'src/app/server/sessions';
import { useState } from 'react';
import { OnboardingPage } from 'src/pages/main/onboarding_coachmark/OnboardingPage';
import { EmailBannerBottomSheet } from 'src/features/EmailBanner/EmailBannerBottomSheet';
import { EmailConfigPage } from 'src/pages/email/EmailConfigPage';

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

  const { data: enrollmentData } = await getUserEnrollmentStatus({
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return json(
    {
      userInfo,
      profileList,
      seenOnboarding: enrollmentData.hasSeenOnboarding,
      showEmailBanner: !enrollmentData.hasEmail && !enrollmentData.inEmailOptOut,
    },
    {
      headers: {
        ...(newSession && { 'Set-Cookie': await commitSession(newSession) }),
      },
    },
  );
};

export default function Index() {
  const { profileList, userInfo, seenOnboarding, showEmailBanner } = useLoaderData<typeof loader>();

  const [seenOnboardingState, setSeenOnboardingState] = useState(seenOnboarding);
  const [showEmailForm, setShowEmailForm] = useState(!seenOnboarding && !userInfo.email);

  const [showEmailBannerState, setShowEmailBannerState] = useState(showEmailBanner);

  return seenOnboardingState ? (
    <>
      <InfoListPage userInfo={userInfo} profileList={profileList} />
      <GenerateFormLink />
      {showEmailBannerState && (
        <EmailBannerBottomSheet isOpen={showEmailBannerState} onClose={() => setShowEmailBannerState(false)} />
      )}
    </>
  ) : (
    <>
      {showEmailForm ? (
        <EmailConfigPage
          showHeader={false}
          confirmButtonText={'다음'}
          onConfirm={() => setShowEmailForm(false)}
          onClickShowLater={() => setShowEmailForm(false)}
        />
      ) : (
        <OnboardingPage userInfo={userInfo} onEndOnboarding={() => setSeenOnboardingState(true)} />
      )}
    </>
  );
}
