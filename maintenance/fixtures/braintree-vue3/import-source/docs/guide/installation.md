# Installation

## Package manager

```bash
npm install braintree-vue3 braintree-web
npm install --save-dev @types/braintree-web
```

```bash
pnpm add braintree-vue3 braintree-web
pnpm add -D @types/braintree-web
```

```bash
yarn add braintree-vue3 braintree-web
yarn add -D @types/braintree-web
```

## Peer dependencies

| Package | Required version |
|---|---|
| `vue` | `^3.3.0` |
| `braintree-web` | `^3.x` |

Both are peer dependencies — you must install them separately. This keeps your bundle size under control when you already have `vue` as a dependency.

## TypeScript

`braintree-vue3` ships with full TypeScript declarations. The package also applies local augmentations to `braintree-web`'s type definitions (via `declare module 'braintree-web'`) that are missing from `@types/braintree-web@3.96.x` but present in the `braintree-web@3.138+` runtime:

- `HostedFieldsTokenizePayload.binData` — Enhanced BIN data object
- `HostedFieldsField.supportedCardBrands` — Per-field card brand restrictions

These augmentations are applied automatically when you import from `braintree-vue3`.

## Module formats

The package ships as dual ESM/CJS with bundled `.d.ts` declarations:

| Entry | Format |
|---|---|
| `dist/braintree-vue3.js` | ESM (tree-shakeable) |
| `dist/braintree-vue3.cjs` | CommonJS |
| `dist/braintree-vue3.d.ts` | TypeScript declarations |
| `dist/braintree-vue3.d.cts` | CTS declarations (CJS consumers) |

## Registering as a Vue plugin (optional)

You do **not** need to register `braintree-vue3` as a global Vue plugin. All composables and components are imported directly on use. However, if you want to register the components globally:

```typescript
// main.ts
import { createApp } from 'vue'
import { BraintreeProvider, BraintreeHostedFields } from 'braintree-vue3'
import App from './App.vue'

const app = createApp(App)
app.component('BraintreeProvider', BraintreeProvider)
app.component('BraintreeHostedFields', BraintreeHostedFields)
app.mount('#app')
```
