// eslint-disable-next-line import/extensions
import auto from 'eslint-config-canonical/configurations/auto.js';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  ...auto,
  {
    ignores: [
      'pnpm-lock.yaml',
      '/pnpm-lock.yaml',
      '!.github',
      '!.vscode',
      'tailwind.config.ts',
      '**/.vercel/**/*',
      '**/dist/**/*',
    ],
  },
  {
    extends: [...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx,js}'],
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      'canonical/filename-match-exported': 0,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'react/forbid-component-props': 0,
    },
  },
);
