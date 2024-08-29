import { ActionFunction, LoaderFunction } from '@remix-run/node';
import { authenticate } from 'src/app/server/authenticate';

const apiURL = new URL(process.env.API_BASE_URL ?? '');

export const loader: LoaderFunction = async (args) => {
  const accessToken = await authenticate(args.request);

  const url = new URL(args.request.url);
  url.protocol = apiURL.protocol;
  url.host = apiURL.host;
  url.port = apiURL.port;

  return fetch(
    url.toString(),
    new Request(args.request, {
      redirect: 'manual',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }),
  );
};

export const action: ActionFunction = async (args) => {
  const accessToken = await authenticate(args.request);

  const url = new URL(args.request.url);
  url.protocol = apiURL.protocol;
  url.host = apiURL.host;
  url.port = apiURL.port;

  return fetch(
    url.toString(),
    new Request(args.request, {
      redirect: 'manual',
      headers: {
        'Content-Type': args.request.headers.get('Content-Type') ?? '',
        Authorization: `Bearer ${accessToken}`,
      },
    }),
  );
};
