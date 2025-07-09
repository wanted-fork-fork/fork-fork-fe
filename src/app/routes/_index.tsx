import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { authenticate } from 'src/app/server/authenticate';
import { ArchivedInfoResponse, getUserEnrollmentStatus, info } from 'src/types';
import { InfoListPage } from 'src/pages/main/info_list/InfoListPage';
import { useFetcher, useLoaderData } from '@remix-run/react';
import { GenerateFormLink } from 'src/entities/candidates/_common/components/GenerateFormLink/GenerateFormLink';
import { commitSession } from 'src/app/server/sessions';
import { useCallback, useEffect, useState } from 'react';
import { OnboardingPage } from 'src/pages/main/onboarding_coachmark/OnboardingPage';
import { EmailBannerBottomSheet } from 'src/entities/users/profiles/components/EmailBanner/EmailBannerBottomSheet';
import { EmailConfigPage } from 'src/pages/mypage/email/EmailConfigPage';
import { filterSchema } from 'src/entities/candidates/_common/libs/filter';

export const loader: LoaderFunction = async ({ request }) => {
  const { accessToken, newSession } = await authenticate(request);

  const searchParams = new URL(request.url).searchParams;
  const param = { ...Object.fromEntries(searchParams) };
  delete param.townList;
  const { data: filterParams } = filterSchema.safeParse(param);
  const townList = searchParams.get('townList[]')?.split(',').filter(Boolean) ?? [];

  const hasFilter = townList.length > 0 || (filterParams && Object.keys(filterParams).length > 0);

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
      profileList: [],
      seenOnboarding: enrollmentData.hasSeenOnboarding,
      showEmailBanner: !enrollmentData.hasEmail && !enrollmentData.inEmailOptOut,
      hasFilter,
      filter: { ...filterParams, townList },
    },
    {
      headers: {
        ...(newSession && { 'Set-Cookie': await commitSession(newSession) }),
      },
    },
  );
};

export default function Index() {
  const { userInfo, seenOnboarding, showEmailBanner, hasFilter, filter } = useLoaderData<typeof loader>();

  const [seenOnboardingState, setSeenOnboardingState] = useState(seenOnboarding);
  const [showEmailForm, setShowEmailForm] = useState(!seenOnboarding && !userInfo.email);

  const [showEmailBannerState, setShowEmailBannerState] = useState(showEmailBanner);

  const [page, setPage] = useState(0);
  const [profileList, setProfileList] = useState<ArchivedInfoResponse[]>([]);
  const fetcher = useFetcher<{ profileList: ArchivedInfoResponse[]; hasMore: boolean; totalCount: number }>();

  const totalCount = fetcher?.data?.totalCount ?? 0;

  const handleIntersectBottom = useCallback(() => {
    if (!fetcher.data?.hasMore) {
      return;
    }

    setPage((prev) => prev + 1);
  }, [fetcher.data?.hasMore]);

  useEffect(() => {
    const params = Object.entries(filter)
      .map(([k, v]) => `${k}=${v}`)
      .join('&');
    fetcher.load(`/infos?page=${page}&${params}`);
  }, [filter, page]);

  useEffect(() => {
    if (!fetcher.data) return;
    setProfileList((prev) => [...prev, ...(fetcher.data?.profileList ?? [])]);
  }, [fetcher.data]);

  return seenOnboardingState ? (
    <>
      <InfoListPage
        userInfo={userInfo}
        profileList={profileList}
        totalCount={totalCount}
        hasFilter={hasFilter}
        filter={filter}
        loading={fetcher.state === 'loading'}
        onIntersectBottom={handleIntersectBottom}
      />
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
