import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
  useRouteLoaderData,
} from '@remix-run/react';
import { ReactNode } from 'react';

import 'src/shared/styles/global.css';
import 'src/shared/styles/variables.css';
import 'src/shared/styles/typography.css';
import { WideDeviceLayout } from 'src/pages/layout/WideDeviceLayout';
import { json, LinksFunction, LoaderFunction } from '@remix-run/node';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import i18next from 'src/app/i18next.server';
import { useTranslation } from 'react-i18next';
import { Toaster } from 'react-hot-toast';
import { ToastOption } from 'src/shared/ui/Toast/toastOption';

export const links: LinksFunction = () => {
  return [
    {
      rel: 'icon',
      href: '/favicon-32x32.png',
      sizes: '32x32',
      type: 'image/png',
    },
    {
      rel: 'icon',
      href: '/favicon-16x16.png',
      sizes: '16x16',
      type: 'image/png',
    },
    {
      rel: 'apple-touch-icon',
      href: '/apple-touch-icon.png',
      sizes: '180x180',
    },
  ];
};

export const loader: LoaderFunction = async ({ request }) => {
  const locale = await i18next.getLocale(request);
  return json({ locale });
};

export function ErrorBoundary() {
  const error = useRouteError();

  // when true, this is what used to go to `CatchBoundary`
  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>Oops</h1>
        <p>Status: {error.status}</p>
        <p>{error.data.message}</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Uh oh ...</h1>
      <p>Something went wrong.</p>
    </div>
  );
}

const queryClient = new QueryClient();

export function Layout({ children }: { children: ReactNode }) {
  // Get the locale from the loader
  const { locale } = useRouteLoaderData<typeof loader>('root');

  const { i18n } = useTranslation();

  return (
    <html lang={locale} dir={i18n.dir()}>
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no"
        />
        <Meta />
        <Links />
        {process.env.NODE_ENV === 'development' ? null : (
          <>
            <script async src="https://www.googletagmanager.com/gtag/js?id=G-X4J2WVTTK5" />
            <script
              async
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
        
                  gtag('config', 'G-X4J2WVTTK5');
                `,
              }}
            />
          </>
        )}
      </head>
      <body>
        <QueryClientProvider client={queryClient}>
          <WideDeviceLayout>{children}</WideDeviceLayout>
          {typeof window !== 'undefined' && <Toaster position={'bottom-center'} toastOptions={ToastOption} />}
        </QueryClientProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
