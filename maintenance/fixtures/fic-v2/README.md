# Fixture documentazione Fatture in Cloud API v2

Verifica il quickstart inglese contro il pacchetto **3.0.1**, commit `04360c77c68e4d481f5a4943ffc2541f26b19767`. Nessuna richiesta di rete: dati sintetici, dominio `example.invalid`, `Http::preventStrayRequests()` e sequenza fake. Non crea fatture. `quickstart.php` deve coincidere con il blocco principale della pagina.

Verifica eseguita il 16 ottobre 2026 con PHP 8.5.10, dipendenze preesistenti Laravel 13.2.0 e Guzzle 7.10.0. Il loader Composer viene riconfigurato per caricare **solo il codice del pacchetto estratto dal commit**, con controllo `ReflectionClass`; non si usa il codice eventualmente diverso nel checkout delle dipendenze. Nessun file del repository del pacchetto viene modificato.

Comandi effettivamente eseguiti:

```bash
mkdir -p /private/tmp/fic-v2-release
git -C /private/tmp/oa-package-evidence/laravel-fatture-in-cloud-v2 archive 04360c77c68e4d481f5a4943ffc2541f26b19767 | tar -x -C /private/tmp/fic-v2-release
php /private/tmp/oa-doc-osp-packages/maintenance/fixtures/fic-v2/run.php /Users/gfabbian/projects/laravel-fatture-in-cloud-v2/vendor/autoload.php /private/tmp/fic-v2-release
php -l /private/tmp/oa-doc-osp-packages/maintenance/fixtures/fic-v2/quickstart.php
php -l /private/tmp/oa-doc-osp-packages/maintenance/fixtures/fic-v2/run.php
```

Risultato: exit 0; entrambi i file validi sintatticamente; output:

```text
Example client
Synthetic API failure
Local validation rejected missing data.name
Updated example
PASS: pinned-release list, API error, validation, create and edit; 4 fake requests
```

Si verificano proprietà readonly della risposta, errore API 422, validazione locale senza chiamata HTTP, payload create/edit e header bearer sintetico. `run.php` controlla output e richieste senza PHPUnit. Non esegue l'intera suite del pacchetto e non certifica gli schemi del provider.

Per riprodurre senza dipendenze già disponibili, installarle **in una directory temporanea**, mai nella root documentazione o nel repository del pacchetto. Il manifest include solo dipendenze runtime Illuminate/Guzzle; nessun PHPStan/Larastan:

```bash
fixture_dir="$PWD/maintenance/fixtures/fic-v2"
fixture_deps_dir="$(mktemp -d /private/tmp/fic-v2-deps.XXXXXX)"
cp "$fixture_dir/composer.json" "$fixture_deps_dir/composer.json"
composer install --working-dir="$fixture_deps_dir" --no-interaction --prefer-dist
php "$fixture_dir/run.php" "$fixture_deps_dir/vendor/autoload.php" /private/tmp/fic-v2-release
```

Questa variante è un'istruzione di riproduzione, non una seconda matrice di compatibilità già eseguita. Le versioni risolte da Composer possono essere più recenti; conservarne il lock nella directory temporanea quando si registra una nuova esecuzione.
