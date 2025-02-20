// eslint-disable-next-line import/extensions
import auto from 'eslint-config-canonical/configurations/auto.js';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

export default tseslint.config(...auto, {
  extends: [...tseslint.configs.recommended],
  files: ['**/*.{ts,tsx,js}'],
  ignores: [
    'pnpm-lock.yaml',
    '/pnpm-lock.yaml',
    '!.github',
    '!.vscode',
    'tailwind.config.ts',
    '**/.vercel/**/*',
    '**/dist/**/*',
  ],
  plugins: {
    'react-hooks': reactHooks,
    'react-refresh': reactRefresh,
  },
  rules: {
    'canonical/filename-match-exported': 0,
    'canonical/filename-match-regex': 'off',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'react/forbid-component-props': 0,
  },
});
