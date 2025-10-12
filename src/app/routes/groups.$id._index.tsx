import { GroupMainPage } from 'src/pages/groups/group_main/GroupMainPage';
import { json, LoaderFunction } from '@remix-run/node';
import { authenticate } from 'src/app/server/authenticate';
import { commitSession } from 'src/app/server/sessions';
import { getGroupInfo, searchGroupInfo } from 'src/types';
import { useLoaderData } from '@remix-run/react';
import { filterSchema } from 'src/entities/candidates/_common/libs/filter';

export const loader: LoaderFunction = async ({ request, params }) => {
  const { id } = params;
  const { accessToken, newSession } = await authenticate(request);

  if (!id) return null;

  const searchParams = new URL(request.url).searchParams;
  const param = { ...Object.fromEntries(searchParams) };
  delete param.townList;
  const { data: filterParams } = filterSchema.safeParse(param);
  const townList = searchParams.get('townList[]')?.split(',').filter(Boolean) ?? [];

  const hasFilter = townList.length > 0 || (filterParams && Object.keys(filterParams).length > 0);

  const { data } = await getGroupInfo(id, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  const { data: searchInfo } = await searchGroupInfo(
    id,
    {
      searchGroupInfoRequestDto: {},
    },
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    },
  );

  return json(
    {
      groupInfo: data,
      totalCount: searchInfo.count,
      infos: searchInfo.infos,
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

export default function GroupDetailPage() {
  const { groupInfo, totalCount, hasFilter, filter } = useLoaderData<typeof loader>();
  return <GroupMainPage groupInfo={groupInfo} totalCount={totalCount} hasFilter={hasFilter} filter={filter} />;
}
