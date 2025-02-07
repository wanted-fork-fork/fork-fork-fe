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
import { lazy, ReactNode, Suspense } from 'react';

import 'src/shared/styles/global.css';
import 'src/shared/styles/variables.css';
import 'src/shared/styles/typography.css';
import { WideDeviceLayout } from 'src/pages/layout/WideDeviceLayout';
import { json, LinksFunction, LoaderFunction, MetaFunction } from '@remix-run/node';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import i18next from 'src/app/i18next.server';
import { useTranslation } from 'react-i18next';
import { ToastOption } from 'src/shared/ui/Toast/toastOption';
import { ErrorPage } from 'src/pages/error/ErrorPage';

const Toaster = lazy(async () => {
  const module = await import('react-hot-toast');
  return { default: module.Toaster };
});

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

export const meta: MetaFunction = () => {
  return [
    { title: '구구(GooGoo)' },
    { name: 'description', content: '내 사랑을 구해줄래? 구해줄게!' },
    { property: 'og:image', content: 'https://www.meetgoogoo.com/images/meta_default.png' },
    { property: 'og:image:width', content: '800' },
    { property: 'og:image:height', content: '400' },
    { name: 'naver-site-verification', content: 'c284118740fd0197a6923574cd8099d58057adf0' },
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
      <ErrorPage
        title={'페이지를 찾을 수 없습니다.'}
        description={'메인으로 이동해주세요.'}
        buttonText={'메인으로 이동'}
        buttonLink={'/'}
      />
    );
  }

  return (
    <ErrorPage
      title={'알 수 없는 에러가 발생했습니다.'}
      description={'메인으로 이동해주세요.'}
      buttonText={'메인으로 이동'}
      buttonLink={'/'}
    />
  );
}

const queryClient = new QueryClient();

export function Layout({ children }: { children: ReactNode }) {
  // Get the locale from the loader
  const data = useRouteLoaderData<typeof loader>('root');

  const { i18n } = useTranslation();

  return (
    <html lang={data?.locale ?? 'ko'} dir={i18n.dir()}>
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
          <WideDeviceLayout>
            {children}
            <Suspense fallback={<></>}>
              <Toaster position={'bottom-center'} toastOptions={ToastOption} />
            </Suspense>
          </WideDeviceLayout>
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
