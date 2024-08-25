import { ActionFunction, LoaderFunction } from '@remix-run/node';
import { withAuthenticated } from 'src/app/server/withAuthenticated';
//
// export const loader = withAuthenticated(async ({ request }: LoaderFunctionArgs, accessToken) => {
//   const url = new URL(request.url);
//   const newHeaders = new AxiosHeaders();
//   request.headers.forEach((v, k) => newHeaders.set(k, v));
//   request.headers.set('Authorization', `Bearer ${accessToken}`);
//   try {
//     return customInstance({
//       method: request.method,
//       url: `${url.pathname}${url.search}`,
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       },
//     });
//   } catch (e) {
//     console.error(e);
//     return null;
//   }
// });
//
// export const action = withAuthenticated(async ({ request }: ActionFunctionArgs, accessToken) => {
//   const url = new URL(request.url);
//   const newHeaders = new AxiosHeaders();
//   request.headers.forEach((v, k) => newHeaders.set(k, v));
//   request.headers.set('Authorization', `Bearer ${accessToken}`);
//
//   return customInstance({
//     method: request.method,
//     url: `${url.pathname}${url.search}`,
//     headers: {
//       Authorization: `Bearer ${accessToken}`,
//     },
//   });
// });

const apiURL = new URL(process.env.API_BASE_URL ?? '');

export const loader: LoaderFunction = withAuthenticated((args, accessToken) => {
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
});

export const action: ActionFunction = withAuthenticated((args, accessToken) => {
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
});
