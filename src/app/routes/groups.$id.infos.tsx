import { json, LoaderFunction } from '@remix-run/node';
import { filterAlignList, filterSchema } from 'src/entities/candidates/_common/libs/filter';
import { calculateBirthDate, convertDateObjectToDate } from 'src/shared/functions/date';
import { searchGroupInfo, SearchGroupInfoParams, SearchInfoRequestDto } from 'src/types';
import { authenticate } from 'src/app/server/authenticate';
import { commitSession } from 'src/app/server/sessions';

export const loader: LoaderFunction = async ({ params, request }) => {
  const { id: groupKey } = params;
  if (!groupKey) {
    throw new Error('No group key provided');
  }

  const { accessToken, newSession } = await authenticate(request);

  const searchParams = new URL(request.url).searchParams;
  const param = { ...Object.fromEntries(searchParams) };
  delete param.townList;
  const { data: filterParams } = filterSchema.safeParse(param);
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
      ...(townList && townList.length > 0 ? { townList: townList.join(',') } : undefined),
      page: Number(searchParams.get('page')) || 0,
      size: 10,
      sortBy: align.sortBy,
      sortDirection: align.sortDirection,
      ageTo: ageFrom,
      ageFrom: ageTo,
    } satisfies Omit<SearchInfoRequestDto, 'townList'>;
    const { data } = await searchGroupInfo(groupKey, params as unknown as SearchGroupInfoParams, {
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
    const { data } = await searchGroupInfo(groupKey, {} as unknown as SearchGroupInfoParams, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return json(
      { profileList: data.infos, hasMore: false, totalCount: data.count },
      {
        headers: {
          ...(newSession && { 'Set-Cookie': await commitSession(newSession) }),
        },
      },
    );
  }
};
