import tsParser from '@typescript-eslint/parser';
import tsLintPlugin from '@typescript-eslint/eslint-plugin';
import js from "@eslint/js";
import { configs as importConfigs } from 'eslint-plugin-import'
// import {} from 'eslint-config-prettier'; // TODO:

export default [
  js.configs.recommended,
  tsLintPlugin.configs.recommended,
  tsLintPlugin.configs.stylistic,
  importConfigs.recommended,
  importConfigs.typescript,
  // // 'prettier', // TODO:
  {
    languageOptions: {
      parser: tsParser,
    },
    plugins: { '@typescript-eslint': tsLintPlugin },
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        { varsIgnorePattern: '^_', argsIgnorePattern: '^_' },
      ],
      curly: 'error',
      'import/first': 'error',
      'import/order': ['error', { 'newlines-between': 'always' }],
      'no-alert': 'error',
      semi: 'error',
    },
  },
];
