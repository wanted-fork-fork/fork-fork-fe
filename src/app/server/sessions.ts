import { createCookieSessionStorage, Session } from '@remix-run/node';

type AuthSessionData = {
  accessToken: string;
  refreshToken: string;
};

type SessionFlashData = {
  error: string;
};

export type AuthSession = Session<AuthSessionData, SessionFlashData>;

const { getSession, commitSession, destroySession } = createCookieSessionStorage<AuthSessionData, SessionFlashData>({
  cookie: {
    name: '__session',
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 10,
    path: '/',
    sameSite: 'lax',
    secrets: ['s3cret1'],
    secure: process.env.NODE_ENV !== 'development',
  },
});

const getAuthSession = async (request: Request) => {
  const foundSession = await getSession(request.headers.get('Cookie'));
  if (process.env.NODE_ENV === 'development') {
    foundSession.set('accessToken', process.env.VITE_DEV_JWT_TOKEN ?? '');
  }
  return foundSession;
};

export { getAuthSession, commitSession, destroySession };
