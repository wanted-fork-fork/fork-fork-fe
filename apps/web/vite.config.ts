import { vitePlugin as remix } from '@remix-run/dev';
import { installGlobals } from '@remix-run/node';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import svgr from 'vite-plugin-svgr';

installGlobals();

export default defineConfig({
  plugins: [svgr(), remix(), vanillaExtractPlugin(), tsconfigPaths()],
});
