# Verifica browser locale

Usa Playwright/Chromium installati in una directory temporanea esterna, senza aggiungerli al package JavaScript del sito. Avviare prima `npm run docs:preview`, dopo `npm run docs:verify`.

```bash
PLAYWRIGHT_MODULE=/path/to/external/node_modules/playwright/index.mjs \
CHROMIUM_EXECUTABLE=/path/to/chromium \
node maintenance/fixtures/browser/verify.mjs
```

`PREVIEW_URL` è opzionale (default http://127.0.0.1:4175). Blocca le risorse di rete esterne per rendere il controllo locale deterministico; i link esterni sono verificati separatamente. Salva solo il rapporto JSON in `maintenance/evidence/browser-checks.json`, nessuno screenshot. Prova desktop1440px/mobile390px, sei card,10 route/refresh, ricerca5argomenti e tastiera, menu mobile Enter/Escape/Space, assenza overflow del documento, codice/tabelle scrollabili,404 e HTML senzaJS di tutte le pagine generate. I controlli automatici/browser non equivalgono a una certificazione WCAG.

Eseguito con Chromium headless1234 e Playwright esterno in `/private/tmp/oa-cart-browser`; nessun errore JS rilevato.
