import { ActionFunction, LoaderFunction } from '@remix-run/node';
import { authenticate, authenticateWithoutRedirection } from 'src/app/server/authenticate';
import { destroySession } from 'src/app/server/sessions';

const apiURL = new URL(process.env.API_BASE_URL ?? '');

export const loader: LoaderFunction = async (args) => {
  const { accessToken, newSession } = (await authenticate(args.request)) ?? {};

  const url = new URL(args.request.url);
  url.protocol = apiURL.protocol;
  url.host = apiURL.host;
  url.port = apiURL.port;

  const response = await fetch(
    url.toString(),
    new Request(args.request, {
      redirect: 'manual',
      headers: {
        ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
      },
    }),
  );

  if (newSession)
    return new Response(response.body, {
      ...response,
      headers: { ...Object.fromEntries(response.headers.entries()), 'Set-Cookie': await destroySession(newSession) },
    });

  return response;
};

export const action: ActionFunction = async (args) => {
  const { accessToken, newSession } = (await authenticateWithoutRedirection(args.request)) ?? {};

  const url = new URL(args.request.url);
  url.protocol = apiURL.protocol;
  url.host = apiURL.host;
  url.port = apiURL.port;

  const response = await fetch(
    url.toString(),
    new Request(args.request, {
      redirect: 'manual',
      headers: {
        'Content-Type': args.request.headers.get('Content-Type') ?? '',
        ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
      },
    }),
  );

  if (newSession)
    return new Response(response.body, {
      ...response,
      headers: { ...Object.fromEntries(response.headers.entries()), 'Set-Cookie': await destroySession(newSession) },
    });

  return response;
};
