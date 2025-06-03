import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { authenticate } from 'src/app/server/authenticate';
import { getAllInfo, getUserEnrollmentStatus, info } from 'src/types';
import { InfoListPage } from 'src/pages/main/info_list/InfoListPage';
import { useLoaderData } from '@remix-run/react';
import { GenerateFormLink } from 'src/entities/candidates/_common/components/GenerateFormLink/GenerateFormLink';
import { commitSession } from 'src/app/server/sessions';
import { useState } from 'react';
import { OnboardingPage } from 'src/pages/main/onboarding_coachmark/OnboardingPage';
import { EmailBannerBottomSheet } from 'src/entities/users/profiles/components/EmailBanner/EmailBannerBottomSheet';
import { EmailConfigPage } from 'src/pages/mypage/email/EmailConfigPage';
import { filterSchema } from 'src/entities/candidates/_common/libs/filter';

export const loader: LoaderFunction = async ({ request, params }) => {
  const { accessToken, newSession } = await authenticate(request);

  const searchParams = new URL(request.url).searchParams;
  const { data: filterParams } = filterSchema.safeParse(Object.fromEntries(searchParams));

  const hasFilter = filterParams && Object.keys(filterParams).length > 0;

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
      hasFilter,
    },
    {
      headers: {
        ...(newSession && { 'Set-Cookie': await commitSession(newSession) }),
      },
    },
  );
};

export default function Index() {
  const { profileList, userInfo, seenOnboarding, showEmailBanner, hasFilter } = useLoaderData<typeof loader>();

  const [seenOnboardingState, setSeenOnboardingState] = useState(seenOnboarding);
  const [showEmailForm, setShowEmailForm] = useState(!seenOnboarding && !userInfo.email);

  const [showEmailBannerState, setShowEmailBannerState] = useState(showEmailBanner);

  return seenOnboardingState ? (
    <>
      <InfoListPage userInfo={userInfo} profileList={profileList} hasFilter={hasFilter} />
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
