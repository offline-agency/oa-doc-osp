# Fixture documentale Cart 4.1.0

Il tag è fissato a `b89d3219202703203453890e2e46467e79ad415d`. Richiede PHP 8.4/8.5, BCMath e dipendenze compatibili già installate in una directory esterna. Nessun `composer install` nel repository docs. Il clone sorgente e le dipendenze sono letti; `git archive` esporta il rilascio in una directory temporanea e la reflection verifica il file Cart effettivamente caricato.

```bash
CART_PACKAGE_REPO=/path/to/laravel-cart \
CART_VENDOR_AUTOLOAD=/path/to/compatible/vendor/autoload.php \
bash maintenance/fixtures/cart/run.sh
```

Lo smoke usa SessionStorage reale, sessione array, autenticazione guest e dispatcher Laravel. Verifica importi, tasse, coupon, arrotondamenti, string product ID, identità righe/varianti sync, metadati/snapshot in memoria, rollback limiti e repricing netto coerente con IVA/coupon. Nessuna rete o database.

Per eseguire tutti i test upstream esattamente dal tag, incluse le regressioni 4.1:

```bash
CART_PACKAGE_REPO=/path/to/laravel-cart \
CART_VENDOR_AUTOLOAD=/path/to/compatible/vendor/autoload.php \
bash maintenance/fixtures/cart/run-upstream.sh
```

Il runner copia il launcher Pest e lo scheletro Testbench in un export temporaneo e rimappa source/tests. Non altera runtime o test upstream. Testbench scrive solo nella copia dell'app. L'export resta disponibile per ispezione. SQLite è il default; i due test di concorrenza richiedono PostgreSQL/MySQL e pcntl.

Per i database reali, avviare esclusivamente i container usa e getta del `compose.test.yaml` esportato, con un nome progetto dedicato. Il runner inoltra `CART_TEST_DB_DRIVER`, `CART_TEST_DB_PORT`, `CART_TEST_DB_DATABASE`, `CART_TEST_DB_USERNAME`, `CART_TEST_DB_PASSWORD` e gli argomenti Pest. I test svuotano il database a ogni caso: usare soltanto database `laravel_cart_test*` dedicati, mai database applicativi. Il compose upstream usa tmpfs e porte locali 18471/18472. Arrestare il progetto dopo la verifica.

Esecuzione registrata: PHP 8.5.10, Laravel 13.35.0, Pest 5.3.2, Testbench 11.3.0. Tutti i test passano: SQLite 636 + 2 skip (1796 asserzioni), PostgreSQL 636 + 2 skip (1814), MySQL 637 + 1 skip (1816). I test con due processi/lock reali passano su entrambi i server. Gli skip server riguardano dati legacy non rappresentabili nei rispettivi schemi, non la concorrenza. Log e comandi: `maintenance/evidence/cart41-runtime.json` e `results/`.

Queste prove coprono una combinazione PHP/Laravel; non sostituiscono la matrice di compatibilità, test Octane/queue reali, frontend consumer o conformità fiscale.
