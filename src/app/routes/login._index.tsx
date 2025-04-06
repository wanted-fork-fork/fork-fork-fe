import { LoginPage } from 'src/pages/main/login/LoginPage';
import { json, LoaderFunctionArgs, redirect } from '@remix-run/node';
import { commitSession, getAuthSession } from 'src/app/server/sessions';

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getAuthSession(request);
  if (session.has('accessToken')) {
    return redirect('/');
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
