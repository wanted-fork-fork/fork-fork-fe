import { EmailLoginPage } from 'src/pages/auth/email-login/EmailLoginPage';
import { ActionFunction, json, LoaderFunctionArgs, redirect } from '@remix-run/node';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { getValidatedFormData } from 'remix-hook-form';
import { login } from 'src/types';
import { commitSession, generateExpiredDate, getAuthSession } from 'src/app/server/sessions';
import { AxiosError } from 'axios';

const loginSchema = z.object({
  email: z.string().email().min(1),
  password: z.string(),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const loginResolver = zodResolver(loginSchema);

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getAuthSession(request);
  if (session.has('accessToken')) {
    const searchParams = new URL(request.url).searchParams;
    const path = decodeURIComponent(searchParams.get('path') ?? '/');

    return redirect(path);
  }

  const data = { error: session.get('error') };

  return json(data, {
    headers: {
      'Set-Cookie': await commitSession(session),
    },
  });
}

export const action: ActionFunction = async ({ request }) => {
  const { errors, data } = await getValidatedFormData<LoginFormData>(request, loginResolver);

  if (errors) {
    return { errors };
  }

  try {
    const searchParams = new URL(request.url).searchParams;
    const response = await login({ ...data });

    if (response instanceof AxiosError) {
      const status = response.response?.status ?? 0;
      if (status < 500)
        return {
          errors: {
            root: {
              message: `등록되지 않은 계정이거나\n아이디 또는 비밀번호를 다시 확인해주세요.`,
            },
          },
        };
      else
        return {
          errors: {
            root: {
              message: `일시적인 오류로 로그인을 할 수 없습니다.\n잠시 후 다시 로그인해주세요.`,
            },
          },
        };
    }

    const { data: loginResult } = response;

    const session = await getAuthSession(request);
    session.set('accessToken', loginResult.accessToken);
    session.set('refreshToken', loginResult.refreshToken);
    session.set('expiredAt', generateExpiredDate());

    const path = decodeURIComponent(searchParams.get('path') ?? '');

    return redirect(path, {
      headers: {
        'Set-Cookie': await commitSession(session),
      },
    });
  } catch (e) {
    return { errors: { root: { message: `일시적인 오류로 로그인을 할 수 없습니다.\n잠시 후 다시 로그인해주세요.` } } };
  }
};

export default function EmailLogin() {
  return <EmailLoginPage />;
}
