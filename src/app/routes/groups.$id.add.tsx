import { json, LoaderFunction } from '@remix-run/node';
import { authenticate } from 'src/app/server/authenticate';
import { commitSession } from 'src/app/server/sessions';
import { useLoaderData } from '@remix-run/react';
import { getAvailableCandidates } from 'src/types';
import { AddCandidatePage } from 'src/pages/groups/add_candidate/AddCandidatePage';

export const loader: LoaderFunction = async ({ request, params }) => {
  const { id } = params;
  const { accessToken, newSession } = await authenticate(request);

  if (!id) return null;

  const { data } = await getAvailableCandidates(id, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  return json(
    { groupId: id, infoList: data },
    {
      headers: {
        ...(newSession && { 'Set-Cookie': await commitSession(newSession) }),
      },
    },
  );
};

export default function GroupJoinRequestsPage() {
  const { groupId, infoList } = useLoaderData<typeof loader>();

  return <AddCandidatePage groupId={groupId} candidates={infoList} />;
}
