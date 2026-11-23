---
title: "Installation"
description: "Pinned source-only Braintree Vue 3 documentation: Installation."
sourceCommit: ff99c39e9fd45e6fe43440f8c3b7bcda58e01775
permalink: /braintree-vue3/installation/
---

# Installation

> **Unreleased source snapshot.** Public npm returned 404 and GitHub had no tags or releases on 16 October 2026. Package-manager commands below describe the intended distribution; use the [pinned source-build instructions](/braintree-vue3/next/integration/) for evaluation. Examples are application snippets, never mounted in this VuePress site. Some omit readiness/error handling, declarations or server functions; `useTemplateRef` examples require Vue 3.5+. See the integration notes for lifecycle, SSR and typing limits.

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

---

Adapted from [offline-agency/braintree-vue3, docs/guide/installation.md](https://github.com/offline-agency/braintree-vue3/blob/ff99c39e9fd45e6fe43440f8c3b7bcda58e01775/docs/guide/installation.md) at `ff99c39e9fd45e6fe43440f8c3b7bcda58e01775`. The manifest declares MIT; this snapshot contains no standalone LICENSE file. Site adaptations are recorded in [integration notes](/braintree-vue3/next/integration/).
