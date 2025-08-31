import { GroupInfoPage } from 'src/pages/groups/group_info/GroupInfoPage';
import { groupInfoMock } from 'src/entities/groups/mocks/groupInfoMock';
import { json, LoaderFunction } from '@remix-run/node';
import { authenticate } from 'src/app/server/authenticate';
import { commitSession } from 'src/app/server/sessions';
import { useLoaderData } from '@remix-run/react';

export const loader: LoaderFunction = async ({ request, params }) => {
  const { id } = params;
  const { newSession } = await authenticate(request);

  if (!id) return null;
  return json(
    {
      groupInfo: { ...groupInfoMock, id },
    },
    {
      headers: {
        ...(newSession && { 'Set-Cookie': await commitSession(newSession) }),
      },
    },
  );
};

export default function GroupDetailPage() {
  const { groupInfo } = useLoaderData<typeof loader>();

  return <GroupInfoPage groupInfo={groupInfo} />;
}
