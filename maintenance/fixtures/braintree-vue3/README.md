# Fixture Braintree Vue 3

Fixture senza dipendenze npm, eseguita con Node 25.0.0 (richiede `node:module.stripTypeScriptTypes`, disponibile nei Node recenti). Riceve un checkout esterno pulito al commit `ff99c39e9fd45e6fe43440f8c3b7bcda58e01775`; verifica SHA e assenza di modifiche tracciate a `src` prima di eseguire il codice effettivo dei composable.

```bash
node maintenance/fixtures/braintree-vue3/smoke.mjs /path/to/braintree-vue3
```

Sostituisce esclusivamente i confini Vue/SDK con oggetti sintetici. Nessuna dipendenza frontend viene installata nella documentazione. Non carica il vero Braintree SDK, non apre browser, non contatta provider e non usa token veri. Il nonce e il token nel test sono stringhe sintetiche.

Risultato del 16 ottobre 2026: PASS per ciclo client, guardia initialize duplicata, reinitialize, errore creazione, tokenize prima della readiness e tokenize simulato. `results.json` registra l'output effettivo. Non equivale alla suite Vitest upstream o alla verifica di reattività Vue, build, montaggio degli iframe o pagamenti reali.

Riesecuzione finale del coordinatore con Node24.13.0 LTS: PASS con gli stessi confini sintetici; `results.json` aggiornato alla verifica finale.
