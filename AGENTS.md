# AGENTS.md

## Project Overview

Shared ESLint configuration package (`eslint-config-lukehansford-base`) for personal projects. Published to npm. Built on ESLint 9 flat config with TypeScript support.

## Commands

| Command | Description |
|---------|-------------|
| `npm install` | Install dependencies |
| `npm run lint` | Lint `index.js` with ESLint (the only validation — no tests) |

There is **no test suite**. The `lint` script is the sole CI check.

## Project Structure

```
index.js          — Main config export (ESLint flat config using typescript-eslint)
eslint.config.js  — Local ESLint config (imports from index.js, used for self-linting)
.eslintrc         — Legacy ESLint config (extends index.js)
package.json      — Package manifest (type: module, ESM only)
.prettierrc       — Prettier settings (singleQuote, trailingComma: all, printWidth: 100)
.nvmrc            — Node version: 22
```

## Key Technical Details

- **ESM module** — `"type": "module"` in package.json; use `import`/`export`, not `require`.
- **ESLint 9 flat config** — Uses `tseslint.config()` composition pattern, not legacy `.eslintrc` extends.
- **Config composition** — Combines `@eslint/js` recommended, `typescript-eslint` recommended, `eslint-config-prettier`, and `eslint-plugin-import` (for `.ts`/`.tsx` files only).
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

- The `.eslintrc` file is a legacy artifact — the real config is `eslint.config.js` (flat config format).
- `eslint.config.js` just re-exports `index.js` — all config logic lives in `index.js`.
- No tests exist. Linting `index.js` against itself is the only validation.
- The `eslint-plugin-import` rules only apply to `**/*.{ts,tsx}` files, not plain JS.
