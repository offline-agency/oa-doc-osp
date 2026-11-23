# Fixture Vue 3 Burger Menu

Richiede Node e un checkout esterno pulito al commit del tag `1.1.2`, `27ed3fe184f55de51401590f3975011c4131f65a`, oltre al tarball npm `@offlineagency/vue3-burger-menu@1.0.0` estratto in una directory temporanea. Nessuna installazione npm è necessaria. Lo SHA-1 del tarball scaricato dal registro è `161137e9d41c13bf8b0b91fb423977921ddda577`, verificato con `shasum`.

```bash
node maintenance/fixtures/vue3-burger-menu/smoke.mjs /path/to/vue3-burger-menu /path/to/extracted/package
```

Il test verifica SHA e pulizia dei sorgenti prima di eseguire lo script setup/metodi del vero `Menu.vue` con DOM e funzioni Vue sintetici. Verifica anche che il `main` dichiarato dal manifest npm non esista nel tarball estratto. Questa asserzione documenta un difetto reale della distribuzione; il PASS non significa che il pacchetto npm funzioni.

Risultato del 16 ottobre 2026 con Node 25.0.0: PASS per difetto main mancante, width in pixel, eventi, Escape, overlay e rimozione listener. Nessun browser, test visivo, accessibilità, montaggio Vue reale o build del bundle è stato eseguito. `results.json` riporta l'output effettivo.

Riesecuzione finale del coordinatore con Node24.13.0 LTS: PASS con gli stessi confini sintetici; `results.json` aggiornato alla verifica finale.

## Release-line refresh (16 October 2026)

`smoke.mjs` now accepts a third argument (`1.0.0` or `1.1.2`) and reads the real `Menu.vue` through `git show TAG:…`. Both resolve to the same checked commit; `results.json` records each execution without claiming distinct APIs.

```bash
node maintenance/fixtures/vue3-burger-menu/smoke.mjs /path/to/checkout /path/to/extracted/package 1.0.0
node maintenance/fixtures/vue3-burger-menu/smoke.mjs /path/to/checkout /path/to/extracted/package 1.1.2
node maintenance/fixtures/vue3-burger-menu/compile-examples.cjs /path/to/isolated-vue3-toolchain vue3-burger-menu.md
```

The independent toolchain used `@vue/compiler-sfc@3.5.22` and Node 24.13.0. Both fenced Vue examples passed parsing, script compilation and template compilation. This does not resolve package imports, typecheck package declarations, mount a browser app or execute SSR hydration. The documentation runtime is not used to mount Vue 3 components. Full refreshed release/registry inventory is recorded in `maintenance/evidence/burger-lines.json`.
