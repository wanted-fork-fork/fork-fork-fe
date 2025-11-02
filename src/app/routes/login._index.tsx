import { LoginPage } from 'src/pages/main/login/LoginPage';
import { json, LoaderFunctionArgs, redirect } from '@remix-run/node';
import { commitSession, getAuthSession } from 'src/app/server/sessions';

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getAuthSession(request);
  if (session.has('accessToken')) {
    const searchParams = new URL(request.url).searchParams;
    const path = decodeURIComponent(searchParams.get('path') ?? '');

    return redirect(path);
  }

  const data = { error: session.get('error') };

  return json(data, {
    headers: {
      'Set-Cookie': await commitSession(session),
    },
  });
}

export default function Login() {
  return <LoginPage />;
}
