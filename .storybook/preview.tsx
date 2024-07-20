import type { Preview } from '@storybook/react';

import 'src/shared/styles/global.css';
import 'src/shared/styles/variables.css';
import 'src/shared/styles/typography.css';
import { MyProfileProvider } from 'src/entities/profile/model/myProfileStore';
import { IdealPartnerProvider } from 'src/entities/ideal_partner/model/idealPartnerStore';
import { MemoryRouter } from 'react-router';

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
    (Story) => (
      <MemoryRouter initialEntries={['/']}>
        <IdealPartnerProvider>
          <MyProfileProvider>
            <div style={{ height: '100vh' }}>
              <Story />
            </div>
          </MyProfileProvider>
        </IdealPartnerProvider>
      </MemoryRouter>
    ),
  ],
};

export default preview;
