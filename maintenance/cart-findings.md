# Verifica documentale Cart 4.0.3

Rilascio: `4.0.3`, commit `60eb1006c9c2b31ff50cebd7b8b677a1dd16cc16`, clone di sola lettura `/private/tmp/oa-laravel-cart-reference`. Tag, Composer e distribuzione Packagist corrispondono al refresh principale registrato in `maintenance/package-sources.json` il 16 ottobre 2026. Usato anche il precedente rapporto di ispezione `/private/tmp/cart-stable-contract.md`, verificando nel sorgente le parti ampliate.

## Completamenti

- `reference.md`: sette eventi typed con payload reali, namespace/import dell'esempio, string events e differenze temporali; firme complete dei sette comandi Artisan, con default e opzioni. Corretto il rischio di leggere `cart:migrate-driver` come trasferimento generico del live driver: legge solo sessioni file/database, scrive la tabella snapshot legacy e non importa i coupon. `--dry-run` non dimostra la decodifica di ogni record. Nessun comando operativo eseguito.
- `support.md`: CartFake reale, metodi di asserzione e recorder. La facade fake usa SessionStorage e la sessione corrente, non un backend autonomo; non svuota il carrello e non sopprime i listener. Esempio con import completi e specifica dipendenza PHPUnit.
- `quick-start.md`: metadati per istanza, lettura dotted ma scrittura/rimozione top-level, opzioni cart separate dalle opzioni variante; snapshot in memoria distinto da SQL store/restore. Limiti con max_items a righe, max_total/min_total sul lordo prima dei coupon cart-level, minimo solo interrogabile, nessuna promessa di rollback atomico. Sync usa ID stretti, rimuove ID assenti e aggiorna solo quantità del primo match; non riconcilia varianti/prezzi. Binding scoped nel provider e gestione corretta di session/auth nel lifecycle worker.
- `money-and-tax.md`: quattro risultati numerici HALF_UP/DOWN/EVEN/ODD e esempio TowardsZero sui totali; mantenuta l'eccezione coupon cart-level con scala BCMath4 e finale a due decimali.
- `upgrading.md`: esempi effettivi v4 dal pinned UPGRADE (Buyable getter-only, FiscalBuyable/trait), senza attribuire l'archivio giugno 2024 a una release 3.x verificata. PR50 resta esplicitamente non rilasciata; nessuna garanzia preview promossa a 4.0.3.

I 32 anchor storici del root Cart non sono stati rimossi: il root e la pagina legacy non sono stati modificati da questo completamento. Nessuna modifica a config, manifest principale, package.json o script sito.

## Esecuzione isolata

Comandi eseguiti:

```bash
php -m
php -l maintenance/fixtures/cart/smoke.php
CART_PACKAGE_REPO=/private/tmp/oa-laravel-cart-reference \
CART_VENDOR_AUTOLOAD=/Users/gfabbian/projects/laravel-cart/vendor/autoload.php \
bash maintenance/fixtures/cart/run.sh
git diff --check
```

`php -m` conferma BCMath. Lo script verifica il commit del tag, estrae con git archive una nuova copia temporanea e sostituisce esplicitamente la mappa PSR-4 del namespace `OfflineAgency\LaravelCart\`; una reflection verifica la provenienza della classe Cart. Il vendor preesistente è soltanto letto, il suo eventuale codice pacchetto diverso non viene caricato. Nessun install Composer/PHPStan/Larastan nella repository documentale, nessuna modifica al clone o ai pacchetti applicativi.

Bootstrap con Application/Repository/Dispatcher/SessionManager Laravel; SessionStorage effettivo con driver array e sessione avviata. CartFake viene poi eseguito tramite la facade con asserzioni PHPUnit. Output finale:

```text
No syntax errors detected in maintenance/fixtures/cart/smoke.php
PASS: release source, SessionStorage array driver, quickstart20, item-coupon280, tax122, rounding4modes+TowardsZero, meta/snapshot, sync, limits, CartFake typed events; cart coupons PASS (BCMath enabled). PHP 8.5.10; Laravel v13.35.0
```

Eseguito due volte con successo; nessun fallimento da nascondere. `git diff --check` senza output. La fixture verifica chiamate/metodi locali e casi numerici, non l'intera suite PHP, SQL/live database driver, store/restore, migrazioni, comandi manutentivi, concorrenza, matrice PHP/Laravel o CI remota. Build e verifica collegamenti del sito restano coordinati dal task principale.
