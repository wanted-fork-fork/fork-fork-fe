import { json, LoaderFunction } from '@remix-run/node';
import { filterAlignList, filterSchema } from 'src/entities/candidates/_common/libs/filter';
import { calculateBirthDate, convertDateObjectToDate } from 'src/shared/functions/date';
import { getAllInfo, searchInfo, SearchInfoParams, SearchInfoRequestDto } from 'src/types';
import { authenticate } from 'src/app/server/authenticate';
import { commitSession } from 'src/app/server/sessions';

export const loader: LoaderFunction = async ({ request }) => {
  const { accessToken, newSession } = await authenticate(request);

  const searchParams = new URL(request.url).searchParams;
  const { data: filterParams } = filterSchema.safeParse(Object.fromEntries(searchParams));
  const townList = searchParams.get('townList')?.split(',').filter(Boolean) ?? [];

  const hasFilter = townList.length > 0 || (filterParams && Object.keys(filterParams).length > 0);

  if (hasFilter) {
    const align = filterAlignList.find((ali) => ali.id === filterParams?.alignId) ?? filterAlignList[0];
    const { ageFrom: ageFromValue, ageTo: ageToValue } = filterParams ?? {};
    const ageFrom = ageFromValue ? convertDateObjectToDate(calculateBirthDate(ageFromValue)).toISOString() : undefined;
    const ageTo = ageToValue ? convertDateObjectToDate(calculateBirthDate(ageToValue)).toISOString() : undefined;
    const params = {
      ...filterParams,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      townList: townList ? townList.join(',') : undefined,
      page: Number(searchParams.get('page')) || 0,
      size: 10,
      sortBy: align.sortBy,
      sortDirection: align.sortDirection,
      ageTo: ageFrom,
      ageFrom: ageTo,
    } satisfies SearchInfoRequestDto;
    const { data } = await searchInfo(params as unknown as SearchInfoParams, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return json(
      {
        profileList: data?.infos ?? [],
        totalCount: data?.count ?? 0,
        hasMore: data?.infos.length >= 10,
      },
      {
        headers: {
          ...(newSession && { 'Set-Cookie': await commitSession(newSession) }),
        },
      },
    );
  } else {
    const { data } = await getAllInfo({
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return json(
      { profileList: data, hasMore: false, totalCount: data.length },
      {
        headers: {
          ...(newSession && { 'Set-Cookie': await commitSession(newSession) }),
        },
      },
    );
  }
};
