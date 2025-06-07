import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { authenticate } from 'src/app/server/authenticate';
import {
  getAllInfo,
  getUserEnrollmentStatus,
  info,
  searchInfo,
  SearchInfoParams,
  SearchInfoRequestDto,
  SearchInfoRequestDtoTownListItem,
} from 'src/types';
import { InfoListPage } from 'src/pages/main/info_list/InfoListPage';
import { useLoaderData } from '@remix-run/react';
import { GenerateFormLink } from 'src/entities/candidates/_common/components/GenerateFormLink/GenerateFormLink';
import { commitSession } from 'src/app/server/sessions';
import { useState } from 'react';
import { OnboardingPage } from 'src/pages/main/onboarding_coachmark/OnboardingPage';
import { EmailBannerBottomSheet } from 'src/entities/users/profiles/components/EmailBanner/EmailBannerBottomSheet';
import { EmailConfigPage } from 'src/pages/mypage/email/EmailConfigPage';
import { filterAlignList, filterSchema } from 'src/entities/candidates/_common/libs/filter';
import { calculateBirthDate, convertDateObjectToDate } from 'src/shared/functions/date';

export const loader: LoaderFunction = async ({ request }) => {
  const { accessToken, newSession } = await authenticate(request);

  const searchParams = new URL(request.url).searchParams;
  const { data: filterParams } = filterSchema.safeParse(Object.fromEntries(searchParams));

  const hasFilter = filterParams && Object.keys(filterParams).length > 0;

  let profileList;

  if (hasFilter) {
    const align = filterAlignList.find((ali) => ali.id === filterParams?.alignId) ?? filterAlignList[0];
    const { townList, ageFrom: ageFromValue, ageTo: ageToValue } = filterParams;
    const ageFrom = ageFromValue ? convertDateObjectToDate(calculateBirthDate(ageFromValue)).toISOString() : undefined;
    const ageTo = ageToValue ? convertDateObjectToDate(calculateBirthDate(ageToValue)).toISOString() : undefined;
    const params = {
      ...filterParams,
      townList: townList ? (townList as SearchInfoRequestDtoTownListItem[]) : undefined,
      page: 0,
      size: 10,
      sortBy: align.sortBy,
      sortDirection: align.sortDirection,
      ageTo,
      ageFrom,
    } satisfies SearchInfoRequestDto;
    const { data } = await searchInfo(params as unknown as SearchInfoParams, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    profileList = data;
  } else {
    const { data } = await getAllInfo({
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    profileList = data;
  }

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
      filter: filterParams,
    },
    {
      headers: {
        ...(newSession && { 'Set-Cookie': await commitSession(newSession) }),
      },
    },
  );
};

export default function Index() {
  const { profileList, userInfo, seenOnboarding, showEmailBanner, hasFilter, filter } = useLoaderData<typeof loader>();

  const [seenOnboardingState, setSeenOnboardingState] = useState(seenOnboarding);
  const [showEmailForm, setShowEmailForm] = useState(!seenOnboarding && !userInfo.email);

  const [showEmailBannerState, setShowEmailBannerState] = useState(showEmailBanner);

  return seenOnboardingState ? (
    <>
      <InfoListPage userInfo={userInfo} profileList={profileList} hasFilter={hasFilter} filter={filter} />
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
