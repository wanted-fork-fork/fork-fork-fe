import type { Preview, StoryFn } from '@storybook/react';

import 'src/shared/styles/global.css';
import 'src/shared/styles/variables.css';
import 'src/shared/styles/typography.css';
import { MemoryRouter } from 'react-router';
import { Suspense } from 'react';
import { ToastOption } from 'src/shared/ui/Toast/toastOption';
import { Toaster } from 'react-hot-toast';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import i18next from 'i18next';
import Backend from 'i18next-http-backend';
import i18n from '../src/app/i18n';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { IdealPartnerProvider } from 'src/entities/candidates/ideal_partner/entities/models/idealPartnerStore';
import { MyProfileProvider } from 'src/entities/candidates/info/entities/models/myProfileStore';
import { fullProfileMock } from 'src/entities/candidates/info/entities/mocks/fullProfile.mock';

const withI18next = (Story: StoryFn) => {
  i18next
    .use(initReactI18next)
    .use(Backend)
    .init({
      ...i18n,
      backend: { loadPath: '../public/locales/{{lng}}/{{ns}}.json' },
      detection: {
        order: ['htmlTag'],
        caches: [],
      },
    });
  return (
    <Suspense fallback={<div>loading translations...</div>}>
      <I18nextProvider i18n={i18next}>
        <Story />
      </I18nextProvider>
    </Suspense>
  );
};

const queryClient = new QueryClient();

const preview: Preview = {
  parameters: {
    layout: 'fullscreen',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        order: ['shared', 'entities', 'features', 'widgets', 'processes', 'pages'],
      },
    },
  },
  decorators: [
    withI18next,
    (Story) => (
      <MemoryRouter initialEntries={['/']}>
        <QueryClientProvider client={queryClient}>
          <IdealPartnerProvider>
            <MyProfileProvider initialState={fullProfileMock}>
              <div style={{ height: '100vh' }}>
                <Story />
                <Suspense fallback={<></>}>
                  <Toaster position={'bottom-center'} toastOptions={ToastOption} />
                </Suspense>
              </div>
            </MyProfileProvider>
          </IdealPartnerProvider>
        </QueryClientProvider>
      </MemoryRouter>
    ),
  ],
};

export default preview;
