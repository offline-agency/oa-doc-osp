# Verifica browser locale

Usa Playwright/Chromium installati in una directory temporanea esterna, senza aggiungerli al package JavaScript del sito. Avviare prima `npm run docs:preview`, dopo `npm run docs:verify`.

```bash
PLAYWRIGHT_MODULE=/path/to/external/node_modules/playwright/index.mjs \
CHROMIUM_EXECUTABLE=/path/to/chromium \
node maintenance/fixtures/browser/verify.mjs
```

`PREVIEW_URL` è opzionale (default http://127.0.0.1:4175). Blocca le risorse di rete esterne per rendere il controllo locale deterministico; i link esterni sono verificati separatamente. Salva solo il rapporto JSON in `maintenance/evidence/browser-checks.json`, nessuno screenshot. Prova desktop1440px/mobile390px, card del manifest,route correnti/refresh dal manifest, ricerca5argomenti e tastiera, menu mobile Enter/Escape/Space, assenza overflow del documento, codice/tabelle scrollabili,404 e HTML senzaJS di tutte le pagine generate. I controlli automatici/browser non equivalgono a una certificazione WCAG.

Eseguito con Chromium headless1234 e Playwright esterno in `/private/tmp/oa-cart-browser`; nessun errore JS rilevato.

Il versionamento aggiunge verifiche del selettore desktop sulla sottopagina Cart, sidebar della release, refresh, link corrente, selezione Mongo con tastiera mobile e opzione HTML selezionata senzaJavaScript su tutte le pagine snapshot registrate. Il totale verificato è salvato in `maintenance/evidence/browser-checks.json`.

## VuePress 2 / Cart 4.1 verification

The current runtime is VuePress2/Vue3. `verify.mjs` uses the current `Current project` dropdown, scoped `.vp-sidebar` links and archive4.0.3→v4 topic switching; it crawls all generated HTML without JavaScript. `compatibility.mjs` resolves relative heading hashes before asserting version scope and target IDs, and verifies canonical/robots during SPA navigation. `home-filters.mjs` asserts only the two homepage sections `Current project` and `Legacy`, all16 filter combinations, mobile and keyboard reset. Latest reports supersede earlier VuePress1 results; no screenshots are saved.
