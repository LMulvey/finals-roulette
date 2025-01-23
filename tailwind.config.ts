/* eslint-disable canonical/filename-match-exported */
import typography from '@tailwindcss/typography';
import { type Config } from 'tailwindcss';

const config: Config = {
    darkMode: ['class'],
    content: ['./src/**/*.{ts,tsx}'],
  plugins: [typography, require("tailwindcss-animate")],
  theme: {
  	extend: {
  		colors: {
  			'finals-black': '#1D1A20',
  			'finals-red': '#D21F3C',
  			'finals-white': '#F1F2FA'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
};
export default config;
