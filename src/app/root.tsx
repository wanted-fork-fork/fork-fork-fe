import { Links, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react';
import { ReactNode } from 'react';

import 'src/shared/styles/global.css';
import 'src/shared/styles/variables.css';
import 'src/shared/styles/typography.css';
import { WideDeviceLayout } from 'src/pages/layout/WideDeviceLayout';
import { LinksFunction } from '@remix-run/node';

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

export function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no"
        />
        <Meta />
        <Links />
      </head>
      <body>
        <WideDeviceLayout>{children}</WideDeviceLayout>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
