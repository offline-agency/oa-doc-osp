# Fixture ODPS Validator1.0.1

Sorgente GitHub tag1.0.1, commit `bed32b74b2cf353bfebb134aab9dfb41ac033d81`. Non è una libreria Composer/npm: il nome npm del manifest restituisce404. I controlli usano una copia estratta in directory temporanea, mai il checkout upstream modificato.

```bash
git -C /path/to/odps-validator archive 1.0.1 -o /tmp/odps-release.tar
mkdir -p /tmp/odps-release
tar -xf /tmp/odps-release.tar -C /tmp/odps-release
# Nella directory estratta, con Node24.13.0/npm11.6.2:
npm ci
NEXT_TELEMETRY_DISABLED=1 npm run build
# Dalla documentazione:
ODPS_SOURCE=/tmp/odps-release ODPS_REPOSITORY=/path/to/odps-validator \
node maintenance/fixtures/odps-validator/verify.mjs
```

Esecuzione16/10/2026: `/private/tmp/oa-odps-release-1.0.1`, dipendenze lock Next15.3.2/React19.1.0/Ajv8.17.1/js-yaml4.1.0; `npm ci` exit0 (38 package), build statica exit0, output `out/`. Log `/private/tmp/oa-odps-build.log`. Nessuna nuova dipendenza nel sito VuePress, nessun deploy.

La fixture confronta i file effettivamente caricati con `git show` del commit, esegue `getStaticProps()` e il corpo del submit handler della release in VM, usando Ajv/js-yaml reali e un fetch locale intercettato. Il logger Ajv è catturato per non ripetere i warning; la configurazione di validazione resta quella del sorgente. Casi: YAML/JSON validi, numero invece di stringa, parse error, schema non trovato, permissività su42/inputvuoto/versionestringanoncoincidente/URI e required di v3.0. Nessuna richiesta di rete. La build non equivale a un audit sicurezza o a una suite upstream, assente nella release.

Verificata anche la UI esportata con Chromium: selector3.0/3.1, YAML valido, errore tipo, input42 accettato, parse error e schema404, con tutte le richieste esterne bloccate. Riproduttore `browser.mjs`, rapporto `browser-results.json`; nessuno screenshot.
