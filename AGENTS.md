# AGENTS.md

## Project Overview

Shared ESLint configuration package (`eslint-config-lukehansford-base`) for personal projects. Published to npm. Built on ESLint 9 flat config with TypeScript support.

## Commands

| Command | Description |
|---------|-------------|
| `npm install` | Install dependencies |
| `npm run lint` | Lint `index.js`, `vitest.js`, and `svelte.js` with ESLint (the only validation — no tests) |

There is **no test suite**. The `lint` script is the sole CI check.

## Project Structure

```
index.js          — Main config export (ESLint flat config using typescript-eslint)
vitest.js         — Vitest-specific ESLint config (imported separately via "eslint-config-lukehansford-base/vitest")
svelte.js         — Svelte-specific ESLint config (imported separately via "eslint-config-lukehansford-base/svelte")
eslint.config.js  — Local ESLint config (imports from index.js, used for self-linting)
package.json      — Package manifest (type: module, ESM only)
.prettierrc       — Prettier settings (singleQuote, trailingComma: all, printWidth: 100)
.nvmrc            — Node version: 22
```

## Key Technical Details

- **ESM module** — `"type": "module"` in package.json; use `import`/`export`, not `require`.
- **ESLint 9 flat config** — Uses `tseslint.config()` composition pattern, not legacy `.eslintrc` extends.
- **Config composition** — Combines `@eslint/js` recommended, `typescript-eslint` recommended, `eslint-config-prettier`, and `eslint-plugin-import` (for `.ts`/`.tsx` files only).
- **Vitest config** — Separate export (`./vitest`) using `@vitest/eslint-plugin`. Applies to test files (`*.test.*`, `*.spec.*`, `__tests__/**`). Enforces `vitest/recommended` rules plus capitalised test titles, `describe` function titles, and `it` over `test`.
- **Svelte config** — Separate export (`./svelte`) using `eslint-plugin-svelte`. Applies `svelte/recommended` rules to `*.svelte`, `*.svelte.ts`, and `*.svelte.js` files.
- **Package exports** — Uses `exports` field to expose `"."` (main config), `"./vitest"` (vitest config), and `"./svelte"` (svelte config) as separate entry points.
- **Peer dependency** — TypeScript 5.x is a peer dependency; consumers must install it.

## Code Style

- Single quotes
- Trailing commas everywhere (`"all"`)
- 100 character print width
- Prettier handles formatting; ESLint handles logic rules (prettier config disables conflicting ESLint rules)

## Releasing

A new release is created automatically when a commit is pushed to `main` with an updated `version` in `package.json`. The GitHub Action `publish.yml` handles npm publishing.

## CI

- Runs on every push (all branches)
- Single job: `npm install && npm run lint`

## Gotchas

- `eslint.config.js` just re-exports `index.js` — all config logic lives in `index.js`.
- No tests exist. Linting `index.js` against itself is the only validation.
- The `eslint-plugin-import` rules only apply to `**/*.{ts,tsx}` files, not plain JS.
- `vitest.js` is a standalone config — it is not included in the main `index.js` export. Consumers must import it separately (e.g., `import vitest from 'eslint-config-lukehansford-base/vitest'`).
- `svelte.js` is a standalone config — it is not included in the main `index.js` export. Consumers must import it separately (e.g., `import svelte from 'eslint-config-lukehansford-base/svelte'`).
