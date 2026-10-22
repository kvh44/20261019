import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';

export default [
  { ignores: ['node_modules/**', 'demo/dist/**', 'playwright-report/**', 'test-results/**', 'blob-report/**'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{js,mjs,ts}'],
    languageOptions: { globals: globals.node },
  },
  {
    files: ['demo/src/**/*.jsx'],
    ...react.configs.flat.recommended,
    languageOptions: {
      ...react.configs.flat.recommended.languageOptions,
      globals: globals.browser,
    },
    settings: { react: { version: 'detect' } },
    plugins: { react, 'react-hooks': reactHooks },
    rules: {
      ...react.configs.flat.recommended.rules,
      ...react.configs.flat['jsx-runtime'].rules,
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
  },
];
