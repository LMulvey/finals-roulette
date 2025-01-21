/* eslint-disable canonical/filename-match-exported */
import typography from '@tailwindcss/typography';
import { type Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  plugins: [typography],
  theme: {
    extend: {
      colors: {
        'finals-black': '#1D1A20',
        'finals-red': '#D21F3C',
        'finals-white': '#F1F2FA',
      },
    },
  },
};
export default config;
