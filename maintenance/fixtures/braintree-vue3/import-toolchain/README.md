# Isolated import verification toolchain

Exact dependencies and npm lockfile for the source and selected example checks. This directory is never installed by the documentation build. Node 24.13.0 is the verification runtime.

To reproduce, copy this directory into a temporary directory, copy `../import-source/src` there as `src`, and `../import-source/tsconfig.app.json` there as `tsconfig.app.json`. Do not edit the upstream reference clone. Then run:

```sh
npm ci --ignore-scripts --no-audit --no-fund
./node_modules/.bin/vue-tsc --noEmit -p tsconfig.app.json
./node_modules/.bin/vue-tsc --noEmit -p tsconfig.example.json
./node_modules/.bin/typedoc --entryPoints src/index.ts --tsconfig tsconfig.app.json --plugin typedoc-plugin-markdown --out api --readme none --excludePrivate --excludeInternal --excludeExternals --disableSources false
```

Source and integration SFC typechecks pass. The TypeDoc command exits 3 with TS2307 for `./components/BraintreeProvider.vue` and `./components/BraintreeHostedFields.vue` from `src/index.ts`. It does not understand the Vue SFC exports using this upstream setup. No shim or source change was introduced to disguise that failure; the published API page is a source export inventory, not generated TypeDoc.

`typedoc-vitepress-theme` is intentionally omitted: this is a Markdown-generation attempt for VuePress 1, not a second VitePress site. No generated reference is published from this failed attempt. No SDK call, transaction or provider flow is exercised by typechecking.
