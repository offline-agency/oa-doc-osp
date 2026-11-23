# Fixture Aruba SMS 1.1.0

Verifica il codice rilasciato, senza modificare il package. Tutte le richieste sono intercettate da `Http::fake()` e le richieste impreviste sono bloccate. Credenziali e host sono fittizi. Nessun SMS o messaggio email viene inviato.

Da un checkout di questa documentazione, impostare `ARUBA_SOURCE` al checkout pulito del tag `1.1.0` (`b090caba23f4882486619f2eaed90dfa9b7a2014`). Per dipendenze isolate, copiare il manifest in una directory temporanea e installarle lì:

```bash
fixture_dir=$(mktemp -d)
cp maintenance/fixtures/aruba/composer.json "$fixture_dir/composer.json"
composer install --working-dir="$fixture_dir" --no-interaction
LARAVEL_AUTOLOAD="$fixture_dir/vendor/autoload.php" \
ARUBA_SOURCE=/path/to/laravel-aruba-sms \
php maintenance/fixtures/aruba/verify.php
```

In alternativa `LARAVEL_AUTOLOAD` può indicare un autoloader Laravel già presente; il package Aruba viene caricato dal percorso `ARUBA_SOURCE`, senza dipendere da copie eventualmente installate in quel vendor. Nessuna dipendenza PHP è installata nella root della documentazione.

Esecuzione del 16 ottobre 2026: PHP 8.5.10, Laravel 13.35.0 da vendor preesistente `/Users/gfabbian/projects/laravel-webex/vendor/autoload.php`; sorgente Aruba del tag verificato in `/private/tmp/oa-package-evidence/laravel-aruba-sms`. Il manifest minimale è un riproduttore alternativo, non un'installazione eseguita in questa verifica.

Output effettivo:

```text
PASS: client multi-recipient success, notification channel, facade, session cache, 401 reauthentication, delivery error/event, auth error, sandbox; no live HTTP.
```

Coperti anche notifica personalizzata fluente, metodi facade per stato/storico e assenza di `SmsFailed` sul fallimento di login. Non costituisce esecuzione dell'intera matrice upstream né verifica live dell'API Aruba. `php -l` e `git diff --check` superati.
