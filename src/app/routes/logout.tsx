import { LoaderFunctionArgs, redirect } from '@remix-run/node';
import { destroySession, getAuthSession } from 'src/app/server/sessions';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const session = await getAuthSession(request);
  return redirect('/login', {
    headers: {
      'Set-Cookie': await destroySession(session),
    },
  });
};
