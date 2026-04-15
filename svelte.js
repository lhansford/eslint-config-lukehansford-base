import svelte from 'eslint-plugin-svelte';
import { defineConfig } from 'eslint/config';
import ts from 'typescript-eslint';
import globals from 'globals';

export default defineConfig(...svelte.configs.recommended, {
  files: ['**/*.svelte', '**/*.svelte.ts', '**/*.svelte.js'],
  languageOptions: {
    globals: globals.browser,
    parserOptions: {
      parser: ts.parser,
      extraFileExtensions: ['.svelte'],
    },
  },
});
