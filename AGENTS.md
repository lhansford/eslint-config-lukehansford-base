# AGENTS.md

## Project Overview

Shared ESLint and Prettier configuration package (`eslint-config-lukehansford-base`) for personal projects. Published to npm. Built on ESLint 10 flat config with TypeScript support.

## Commands

| Command | Description |
|---------|-------------|
| `npm install` | Install dependencies |
| `npm run lint` | Lint `index.js`, `vitest.js`, `svelte.js`, `prettier.js`, and `prettier-svelte.js` with ESLint (the only validation — no tests) |

There is **no test suite**. The `lint` script is the sole CI check.

## Project Structure

```
index.js            — Main config export (ESLint flat config using typescript-eslint)
vitest.js           — Vitest-specific ESLint config (imported via "eslint-config-lukehansford-base/vitest")
svelte.js           — Svelte-specific ESLint config (imported via "eslint-config-lukehansford-base/svelte")
prettier.js         — Base Prettier config export (imported via "eslint-config-lukehansford-base/prettier")
prettier-svelte.js  — Svelte Prettier config export (imported via "eslint-config-lukehansford-base/prettier-svelte")
eslint.config.js    — Local ESLint config (imports from index.js, used for self-linting)
package.json        — Package manifest (type: module, ESM only)
.prettierrc         — Prettier settings (singleQuote, trailingComma: all, printWidth: 100)
.nvmrc              — Node version: 22
```

## Key Technical Details

- **ESM module** — `"type": "module"` in package.json; use `import`/`export`, not `require`.
- **ESLint 10 flat config** — Uses `defineConfig()` from `eslint/config` composition pattern, not legacy `.eslintrc` extends.
- **Config composition** — Combines `@eslint/js` recommended, `typescript-eslint` recommended, `eslint-config-prettier`, `eslint-plugin-unicorn`, and `eslint-plugin-import-x` (for `.ts`/`.tsx` files only).
- **Vitest config** — Separate export (`./vitest`) using `@vitest/eslint-plugin`. Applies to test files (`*.test.*`, `*.spec.*`, `__tests__/**`). Enforces `vitest/recommended` rules plus capitalised test titles, `describe` function titles, and `it` over `test`.
- **Svelte config** — Separate export (`./svelte`) using `eslint-plugin-svelte`. Applies `svelte/recommended` rules to `*.svelte`, `*.svelte.ts`, and `*.svelte.js` files.
- **Prettier config** — Separate export (`./prettier`) with base Prettier settings (singleQuote, trailingComma all, printWidth 100).
- **Prettier Svelte config** — Separate export (`./prettier-svelte`) extending base Prettier config with `prettier-plugin-svelte`.
- **Package exports** — Uses `exports` field to expose `"."`, `"./vitest"`, `"./svelte"`, `"./prettier"`, and `"./prettier-svelte"` as separate entry points.
- **Optional peer dependencies** — `@vitest/eslint-plugin`, `eslint-plugin-svelte`, and `prettier-plugin-svelte` are optional peer dependencies. Consumers only install what they use.
- **Files field** — Only the 5 config JS files are published to npm.
- **Peer dependency** — TypeScript 6.x is a peer dependency; consumers must install it.

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

- `eslint.config.js` imports `index.js` and adds a local override to disable `unicorn/filename-case` for the prettier config files (kebab-case entry points).
- No tests exist. Linting the config files against themselves is the only validation.
- The `eslint-plugin-import-x` rules only apply to `**/*.{ts,tsx}` files, not plain JS.
- `vitest.js`, `svelte.js`, `prettier.js`, and `prettier-svelte.js` are all standalone configs — not included in the main `index.js` export. Consumers must import them separately.
- `prettier-svelte.js` imports and spreads `prettier.js`, so changes to base Prettier config propagate automatically.
