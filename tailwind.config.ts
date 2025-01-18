import typography from '@tailwindcss/typography';
import { type Config } from 'tailwindcss';

const config: Config = {
  content: [
    '**/*.{ts,tsx}',
  ],
  plugins: [typography],
};
export default config;