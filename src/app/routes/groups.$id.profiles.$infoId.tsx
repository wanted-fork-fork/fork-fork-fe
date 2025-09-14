import { json, LoaderFunction } from '@remix-run/node';
import { authenticate } from 'src/app/server/authenticate';
import { commitSession } from 'src/app/server/sessions';

export const loader: LoaderFunction = async ({ request, params }) => {
  const { id } = params;
  const { newSession } = await authenticate(request);

  if (!id) return null;

  return json(
    {},
    {
      headers: {
        ...(newSession && { 'Set-Cookie': await commitSession(newSession) }),
      },
    },
  );
};

export default function GroupDetailPage() {
  return <div>하이</div>;
}
