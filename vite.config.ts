/// <reference types="vitest" />
import { vitePlugin as remix } from '@remix-run/dev';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';
import { netlifyPlugin } from '@netlify/remix-adapter/plugin';

export default defineConfig({
  plugins: [
    remix({
      appDirectory: 'src/app',
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
      },
    }),
    tsconfigPaths(),
    svgr(),
    netlifyPlugin(),
  ],
  test: {
    environment: 'jsdom',
  },
});
