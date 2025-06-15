import { json, LoaderFunction } from '@remix-run/node';
import { filterAlignList, filterSchema } from 'src/entities/candidates/_common/libs/filter';
import { calculateBirthDate, convertDateObjectToDate } from 'src/shared/functions/date';
import {
  getAllInfo,
  searchInfo,
  SearchInfoParams,
  SearchInfoRequestDto,
  SearchInfoRequestDtoTownListItem,
} from 'src/types';
import { authenticate } from 'src/app/server/authenticate';
import { commitSession } from 'src/app/server/sessions';

export const loader: LoaderFunction = async ({ request }) => {
  const { accessToken, newSession } = await authenticate(request);

  const searchParams = new URL(request.url).searchParams;
  const { data: filterParams } = filterSchema.safeParse(Object.fromEntries(searchParams));

  const hasFilter = filterParams && Object.keys(filterParams).length > 0;

  if (hasFilter) {
    const align = filterAlignList.find((ali) => ali.id === filterParams?.alignId) ?? filterAlignList[0];
    const { townList, ageFrom: ageFromValue, ageTo: ageToValue } = filterParams;
    const ageFrom = ageFromValue ? convertDateObjectToDate(calculateBirthDate(ageFromValue)).toISOString() : undefined;
    const ageTo = ageToValue ? convertDateObjectToDate(calculateBirthDate(ageToValue)).toISOString() : undefined;
    const params = {
      ...filterParams,
      townList: townList ? (townList as SearchInfoRequestDtoTownListItem[]) : undefined,
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
        profileList: data,
        hasMore: data.length >= 10,
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
      { profileList: data, hasMore: false },
      {
        headers: {
          ...(newSession && { 'Set-Cookie': await commitSession(newSession) }),
        },
      },
    );
  }
};
