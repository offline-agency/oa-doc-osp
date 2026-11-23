# Verifica Laravel Webex 2.0.0

Data verificata con `clock.curr_time`: 2026-10-16 10:47:57 UTC. Ambito: sola documentazione nel worktree `/private/tmp/oa-doc-osp-packages`; nessuna modifica al pacchetto, pubblicazione, tag, commento remoto o chiamata Webex reale.

## Identità e distribuzione

Sorgente selezionato: tag `2.0.0`, commit `c4aec48c1c416676cc411936fe7e905398f66b8c`. `git -C /private/tmp/oa-package-evidence/laravel-webex rev-parse HEAD` restituisce lo stesso commit.

Refresh indipendente eseguito con:

```bash
gh api repos/offline-agency/laravel-webex/releases/latest
gh repo view offline-agency/laravel-webex --json defaultBranchRef
curl -fsSL https://repo.packagist.org/p2/offline-agency/laravel-webex.json
```

Il tentativo nel sandbox falliva per DNS/rete; ripetuto con escalation approvata. Risultati: release stabile `2.0.0`, `target_commitish` uguale al commit selezionato, pubblicazione `2026-10-13T21:13:05Z`, branch predefinito `main`. Packagist contiene `2.0.0` con `source.reference` e `dist.reference` coincidenti; requisiti `php: ~8.4.0 || ~8.5.0`, `ext-json: *`, `laravel/framework: ^12.69.2 || ^13.32`. Nessuna deduzione da badge o branch di sviluppo. Snapshot aggregato del refresh disponibile anche in `/private/tmp/oa-package-evidence/refreshed.json`.

## Correzioni documentali

Letti `README.md`, `UPGRADE.md`, `composer.json`, `config/webex.php`, `src/LaravelWebex.php`, `src/LaravelWebexFacade.php`, `src/Api/AbstractApi.php`, entità, contratto TokenResolver, provider, controller auth, API Meetings/Messaging e test rilasciati. I collegamenti di sorgente puntano al commit selezionato.

- La classe concreta non riceve un token nel costruttore: `forToken()` clona il client. Risoluzione per richiesta: token associato, classe TokenResolver, configurazione bearer.
- Le chiavi OAuth non implementano callback/scambio/persistenza/refresh. Queste responsabilità restano dell'applicazione; un resolver può delegare al servizio applicativo.
- Eventi: `AuthenticationRequested`, poi `WebexClientConfigured`, poi `SuccessfulAuthentication` deprecato. Nessuno dimostra che Webex abbia accettato il token. GET `/auth` è disabilitato per default; il controller invia anche l'evento deprecato e risponde OK, senza OAuth.
- Errori HTTP non-2xx espongono status/trackingId/retryAfter. Il percorso locale `failure()` non inserisce status nei dati dell'entità: per JSON 2xx invalido e problemi di rete `Error::$status` resta null. La guida descrive questa differenza concreta.
- GET/PUT/DELETE ritentano errori di rete, 429 e 503; POST/PATCH no. Il limite ritardi riguarda il sonno, non il valore del Retry-After restituito nell'Error.
- `listWithPagination()` restituisce una pagina. `cursor()` è lazy e controlla origine HTTPS, host e rappresentazione esplicita della porta, link ripetuti e limite pagine. Le eccezioni di pagina sono distinte dai normali Error di endpoint.
- Il riferimento coverage enumera i 52 accessor effettivamente registrati e i metodi pubblici dichiarati dalle relative classi. Il riepilogo manuale `WEBEX_ENDPOINT_COVERAGE.md` riporta conteggi superiori: la guida non li ripete. Sono distinti metodi registrati, classi e API esterne non implementate. Non si promette copertura Webex completa.
- Conservati gli 80 ID storici del percorso `/laravel-webex/`: gli ID delle vecchie famiglie API portano a brevi spiegazioni e collegamenti al nuovo riferimento, inclusi avvisi sulle famiglie non implementate.

Il diff PR12 `/private/tmp/oa-package-evidence/docs-pr12.diff` è stato letto nella sezione Webex. Sovrapposizioni utili: facade/config/eventi e sostituzione checklist. Non copiati i requisiti `PHP 8.4+ / Laravel 11+`, i badge develop, l'implicazione di refresh mediante SuccessfulAuthentication o altre affermazioni non corrispondenti al rilascio 2.0.0.

## Verifica eseguibile locale

Comando finale effettivamente eseguito:

```bash
WEBEX_PACKAGE_REPO=/private/tmp/oa-package-evidence/laravel-webex \
WEBEX_VENDOR_AUTOLOAD=/Users/gfabbian/projects/laravel-webex/vendor/autoload.php \
bash maintenance/fixtures/webex/run.sh
php -l maintenance/fixtures/webex/smoke.php
git diff --check
```

`run.sh` verifica il tag e usa `git archive` per estrarre una copia temporanea del commit; il loader Composer sostituisce soltanto le mappe del namespace pacchetto e una reflection controlla l'origine della classe. Le dipendenze preesistenti sono lette senza modifiche. Nessun Composer install, PHPStan o Larastan nella repository docs. Runtime: PHP 8.5.10, Laravel v13.35.0.

Output finale:

```text
PASS: released Webex source; Meetings/Messaging requests, typed results, 401/malformed JSON/204, GET retry, POST no retry, two-page cursor, origin guard and failed-page exception. PHP 8.5.10; Laravel v13.35.0
No syntax errors detected in maintenance/fixtures/webex/smoke.php
```

`git diff --check` non produce errori. Primo smoke diretto passato; il primo tentativo attraverso il wrapper rilevava correttamente una differenza di percorso `/var` vs `/private/var` nella reflection su macOS. Corretto canonicalizzando il percorso della sorgente con `realpath`, quindi rieseguito con successo. Il guard non è stato rimosso.

Non eseguite: API Webex reali, OAuth reale, suite completa del pacchetto, matrice PHP/Laravel, workflow remoto. Il build e la verifica collegamenti del sito vengono coordinati dal task principale; questo rapporto non li dichiara già passati.
