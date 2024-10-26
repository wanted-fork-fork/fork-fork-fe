import { createCookieSessionStorage } from '@remix-run/node';
import dayjs from 'dayjs';

type AuthSessionData = {
  accessToken: string;
  refreshToken: string;
  expiredAt: string;
};

type SessionFlashData = {
  error: string;
};

export const generateExpiredDate = () => dayjs().add(1, 'day').toString();
export const isDateExpired = (date: string) => dayjs(date).isBefore(dayjs());

const { getSession, commitSession, destroySession } = createCookieSessionStorage<AuthSessionData, SessionFlashData>({
  cookie: {
    name: '__session',
    httpOnly: true,
    maxAge: 60 * 60 * 24,
    path: '/',
    sameSite: 'lax',
    secrets: ['s3cret1'],
    secure: process.env.NODE_ENV !== 'development',
  },
});

const getAuthSession = async (request: Request) => {
  return await getSession(request.headers.get('Cookie'));
};

const getAuthSessionFromHeaders = async (headers: Headers) => {
  return await getSession(headers.get('Cookie'));
};

export { getAuthSession, getAuthSessionFromHeaders, commitSession, destroySession };
