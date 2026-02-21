import { filterAlignList, filterSchema } from 'src/entities/candidates/_common/libs/filter';
import { SearchInfoParams, SearchInfoRequestDto } from 'src/types';
import { calculateBirthDate, convertDateObjectToDate } from 'src/shared/functions/date';

export const parseParamsToFilter = (searchParams: URLSearchParams) => {
  const param = { ...Object.fromEntries(searchParams) };
  delete param.townList;
  const { data: filterParams } = filterSchema.safeParse(param);
  const townList = searchParams.get('townList')?.split(',').filter(Boolean) ?? [];
  const hasFilter = townList.length > 0 || (filterParams && Object.keys(filterParams).length > 0);
  return { filterParams, townList, hasFilter };
};
export const searchInfoParams = (searchParams: URLSearchParams): SearchInfoParams => {
  const { filterParams, townList, hasFilter } = parseParamsToFilter(searchParams);

  let reqParams: Omit<SearchInfoRequestDto, 'townList'> = {
    page: Number(searchParams.get('page')) || 0,
    size: 10,
  };

  if (hasFilter) {
    const align = filterAlignList.find((ali) => ali.id === filterParams?.alignId) ?? filterAlignList[0];
    const { ageFrom: ageFromValue, ageTo: ageToValue } = filterParams ?? {};
    const ageFrom = ageFromValue ? convertDateObjectToDate(calculateBirthDate(ageFromValue)).toISOString() : undefined;
    const ageTo = ageToValue ? convertDateObjectToDate(calculateBirthDate(ageToValue)).toISOString() : undefined;
    reqParams = {
      ...reqParams,
      ...filterParams,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      ...(townList && townList.length > 0 ? { townList: townList.join(',') } : undefined),
      sortBy: align.sortBy,
      sortDirection: align.sortDirection,
      ageTo: ageFrom,
      ageFrom: ageTo,
    };
  }

  return reqParams as unknown as SearchInfoParams;
};
