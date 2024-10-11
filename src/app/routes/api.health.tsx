import { LoaderFunction } from '@remix-run/node';

const apiURL = new URL(process.env.API_BASE_URL ?? '');

export const loader: LoaderFunction = async (args) => {
  const url = new URL(args.request.url);
  url.protocol = apiURL.protocol;
  url.host = apiURL.host;
  url.port = apiURL.port;
  url.pathname = '/health';

  return fetch(url.toString(), new Request(args.request));
};
