# Fixture documentale Webex

Questa fixture usa esclusivamente risposte HTTP simulate e blocca richieste non previste con `Http::preventStrayRequests()`. Non invoca API Webex e non richiede token reali. Non installa dipendenze nella repository della documentazione.

Prerequisiti: PHP compatibile con 2.0.0, un clone contenente il tag `2.0.0`, e un `vendor/autoload.php` con Laravel compatibile, Guzzle e le dipendenze di test Laravel/Mockery per le asserzioni HTTP. È possibile usare in sola lettura le dipendenze già installate del repository del pacchetto. Per riprodurre da zero, installare le dipendenze in un'applicazione o checkout temporaneo esterno a questo repository.

```bash
WEBEX_PACKAGE_REPO=/path/to/laravel-webex \
WEBEX_VENDOR_AUTOLOAD=/path/to/compatible/vendor/autoload.php \
bash maintenance/fixtures/webex/run.sh
```

Lo script verifica il commit del tag ed estrae il rilascio in una nuova directory temporanea. Il bootstrap sostituisce le mappe PSR-4 del solo namespace del pacchetto e verifica via reflection che la classe client provenga dall'estrazione. Il clone e le dipendenze esistenti non vengono modificati.

La fixture verifica le chiamate Meetings/Messaging mostrate nella guida, parametri/metodi HTTP e bearer, entità e fallimento 401 con tracking ID, JSON malformato, cancellazione 204, retry GET, assenza di retry POST, metadati Retry-After, cursor multipagina, rifiuto di origine esterna e conversione di pagina fallita in eccezione. Il ritardo massimo dei retry è impostato a zero nella sola configurazione della fixture.

Risultato locale del 16 ottobre 2026: PASS con PHP 8.5.10 e Laravel 13.35.0. Non equivale all'esecuzione della suite completa del pacchetto, alla matrice PHP/Laravel o alla verifica dei permessi Webex reali. La directory estratta resta disponibile per ispezione.
