import { EmailLoginPage } from 'src/pages/auth/email-login/EmailLoginPage';
import { ActionFunction, redirect } from '@remix-run/node';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { getValidatedFormData } from 'remix-hook-form';
import { login } from 'src/types';
import { commitSession, generateExpiredDate, getAuthSession } from 'src/app/server/sessions';

const loginSchema = z.object({
  email: z.string().email().min(1),
  password: z.string(),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const loginResolver = zodResolver(loginSchema);

export const action: ActionFunction = async ({ request }) => {
  const { errors, data, receivedValues } = await getValidatedFormData<LoginFormData>(request, loginResolver);

  if (errors) {
    return { errors };
  }

  try {
    const searchParams = new URL(request.url).searchParams;
    const { data: loginResult } = await login({ ...data });

    const session = await getAuthSession(request);
    session.set('accessToken', loginResult.accessToken);
    session.set('refreshToken', loginResult.refreshToken);
    session.set('expiredAt', generateExpiredDate());

    let path = '/';

    const authState = searchParams.get('state');
    if (authState) {
      path = decodeURIComponent(authState).replace('path:', '');
    }

    return redirect(path, {
      headers: {
        'Set-Cookie': await commitSession(session),
      },
    });
  } catch (e) {
    return { errors: { root: '로그인 실패' } };
  }
};

export default function EmailLogin() {
  return <EmailLoginPage />;
}
