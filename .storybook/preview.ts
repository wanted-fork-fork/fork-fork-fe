import type { Preview } from '@storybook/react';

import 'src/shared/styles/global.css';
import 'src/shared/styles/variables.css';
import 'src/shared/styles/typography.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
