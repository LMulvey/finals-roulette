import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import vike from 'vike/plugin'
import tsconfigPaths from 'vite-tsconfig-paths';
import vercel from 'vite-plugin-vercel';

// https://vite.dev/config/
export default defineConfig({
  plugins: [tsconfigPaths(), react(), vike({prerender: true}), vercel({
      source: '/.*'
    })],
});
