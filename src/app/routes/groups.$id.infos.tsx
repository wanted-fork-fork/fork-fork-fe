import { json, LoaderFunction } from '@remix-run/node';
import { searchGroupInfo, SearchGroupInfoParams } from 'src/types';
import { authenticate } from 'src/app/server/authenticate';
import { commitSession } from 'src/app/server/sessions';
import { searchInfoParams } from 'src/entities/candidates/_common/libs/searchInfoParams';

export const loader: LoaderFunction = async ({ params, request }) => {
  const { id: groupKey } = params;
  if (!groupKey) {
    throw new Error('No group key provided');
  }

  const { accessToken, newSession } = await authenticate(request);

  const searchParams = new URL(request.url).searchParams;
  const reqParams = searchInfoParams(searchParams);

  const { data } = await searchGroupInfo(groupKey, reqParams as unknown as SearchGroupInfoParams, {
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
};
