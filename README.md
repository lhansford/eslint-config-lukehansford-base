# eslint-config-lukehansford-base

Shared ESLint and Prettier configuration for personal projects.

## Requirements

- Node.js `^20.19.0 || ^22.13.0 || >=24`
- ESLint 10
- TypeScript 6.x

## Installation

```sh
npm install eslint-config-lukehansford-base
```

## Usage

### ESLint

Add to your `eslint.config.js`:

```js
import config from 'eslint-config-lukehansford-base';

export default config;
```

#### Vitest

For projects using Vitest, install the peer dependency and add the vitest config:

```sh
npm install @vitest/eslint-plugin
```

```js
import config from 'eslint-config-lukehansford-base';
import vitest from 'eslint-config-lukehansford-base/vitest';
import { defineConfig } from 'eslint/config';

export default defineConfig(config, vitest);
```

#### Svelte

For Svelte projects, install the peer dependency and add the svelte config:

```sh
npm install eslint-plugin-svelte
```

```js
import config from 'eslint-config-lukehansford-base';
import svelte from 'eslint-config-lukehansford-base/svelte';
import { defineConfig } from 'eslint/config';

export default defineConfig(config, svelte);
```

### Prettier

Use the shared Prettier config in your `.prettierrc`:

```json
"eslint-config-lukehansford-base/prettier"
```

Or in `prettier.config.js`:

```js
import config from 'eslint-config-lukehansford-base/prettier';

export default config;
```

#### Svelte (Prettier)

For Svelte projects, install the peer dependency and use the svelte-specific Prettier config:

```sh
npm install prettier-plugin-svelte
```

```json
"eslint-config-lukehansford-base/prettier-svelte"
```

Or in `prettier.config.js`:

```js
import config from 'eslint-config-lukehansford-base/prettier-svelte';

export default config;
```

## Releasing

A new release is created when a commit is pushed to `main` with an updated version number in `package.json`.
