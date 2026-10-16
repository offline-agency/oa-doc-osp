# Fixture Vue 3 Burger Menu

Richiede Node e un checkout esterno pulito al commit del tag `1.1.2`, `27ed3fe184f55de51401590f3975011c4131f65a`, oltre al tarball npm `@offlineagency/vue3-burger-menu@1.0.0` estratto in una directory temporanea. Nessuna installazione npm è necessaria. Lo SHA-1 del tarball scaricato dal registro è `161137e9d41c13bf8b0b91fb423977921ddda577`, verificato con `shasum`.

```bash
node maintenance/fixtures/vue3-burger-menu/smoke.mjs /path/to/vue3-burger-menu /path/to/extracted/package
```

Il test verifica SHA e pulizia dei sorgenti prima di eseguire lo script setup/metodi del vero `Menu.vue` con DOM e funzioni Vue sintetici. Verifica anche che il `main` dichiarato dal manifest npm non esista nel tarball estratto. Questa asserzione documenta un difetto reale della distribuzione; il PASS non significa che il pacchetto npm funzioni.

Risultato del 16 ottobre 2026 con Node 25.0.0: PASS per difetto main mancante, width in pixel, eventi, Escape, overlay e rimozione listener. Nessun browser, test visivo, accessibilità, montaggio Vue reale o build del bundle è stato eseguito. `results.json` riporta l'output effettivo.

Riesecuzione finale del coordinatore con Node24.13.0 LTS: PASS con gli stessi confini sintetici; `results.json` aggiornato alla verifica finale.
