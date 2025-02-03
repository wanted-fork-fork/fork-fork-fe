import { ActionFunction } from '@remix-run/node';
import { authenticateWithoutRedirection } from 'src/app/server/authenticate';
import { destroySession, getAuthSession } from 'src/app/server/sessions';

const apiURL = new URL(process.env.API_BASE_URL ?? '');

export const action: ActionFunction = async (args) => {
  const { accessToken } = (await authenticateWithoutRedirection(args.request)) ?? {};
  const session = await getAuthSession(args.request);

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
        Authorization: `Bearer ${accessToken}`,
      },
    }),
  );

  return new Response(response.body, {
    ...response,
    headers: { ...Object.fromEntries(response.headers.entries()), 'Set-Cookie': await destroySession(session) },
  });
};
