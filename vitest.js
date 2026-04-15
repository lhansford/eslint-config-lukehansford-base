import vitest from '@vitest/eslint-plugin';
import { defineConfig } from 'eslint/config';

const TEST_FILE_PATTERNS = [
  '**/*.test.{ts,tsx,js,jsx}',
  '**/*.spec.{ts,tsx,js,jsx}',
  '**/__tests__/**/*.{ts,tsx,js,jsx}',
];

export default defineConfig({
  files: TEST_FILE_PATTERNS,
  plugins: { vitest },
  rules: {
    ...vitest.configs.recommended.rules,
    'vitest/valid-title': [
      'error',
      {
        allowArguments: true,
        mustMatch: {
          describe: ['^[A-Z.]'],
          it: ['^[A-Z.]'],
        },
      },
    ],
    'vitest/prefer-describe-function-title': 'error',
    'vitest/consistent-test-it': ['error', { fn: 'it', withinDescribe: 'it' }],
  },
  languageOptions: {
    globals: {
      ...vitest.environments.env.globals,
    },
  },
});
