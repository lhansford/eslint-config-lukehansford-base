// @ts-check

import { defineConfig } from 'eslint/config';
import config from './index.js';

export default defineConfig(config, {
  files: ['prettier.js', 'prettier-svelte.js'],
  rules: {
    'unicorn/filename-case': 'off',
  },
});
