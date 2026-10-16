# Fixture SPID v2 compatibility line

Verifica offline passata sia con v2.0.0 (`28944c619e1f2c78370676405772a9a669185eba`) sia con v2.3.0 (`0fdb1e870606e471a39d35c144cde58158e023d6`): mapping claim DTO, serializzazione JSON, claim malformati, pseudonimizzazione con chiave, normalizzazione risposta token e scadenza sessione. Nessun client OIDC viene istanziato, nessuna richiesta identità/login/HTTP, nessun database persistente.

```bash
SPID_SOURCE=/path/to/spid-laravel-trentino \
LARAVEL_AUTOLOAD=/path/to/compatible/vendor/autoload.php \
php maintenance/fixtures/spid-laravel-trentino/verify.php
```

Autoloader eseguito il 16 ottobre 2026: `/Users/gfabbian/projects/laravel-webex/vendor/autoload.php`, PHP 8.5.10, Laravel 13.35.0. La sorgente SPID viene caricata con priorità dal checkout indicato, senza usare eventuali copie del package nel vendor. Il manifest incluso permette di preparare un runtime alternativo in una directory temporanea; tale installazione alternativa non è stata eseguita. Nessuna dipendenza PHP è stata aggiunta alla root JavaScript della documentazione.

Output verificato:

```text
PASS: DTO claim mapping/JSON, malformed claims, keyed log redaction, token response and session expiry; no network or database.
```

Non copre login AAC, firme JWT reali, creazione utente/controller, transaction log su database, suite Pest/PHPStan/Pint upstream o matrice PHP/Laravel completa.
