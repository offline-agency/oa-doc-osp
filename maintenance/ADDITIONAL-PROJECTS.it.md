# Sei progetti aggiunti —16 ottobre2026

Richieste esplicite del maintainer: Laravel Bank of Italy, ODPS Validator, SPID Laravel Trentino, pgr_dmmsy, Braintree Vue3 e Vue3 Burger Menu. L'estensione è implementata nella worktree `/private/tmp/oa-doc-osp-packages`, branch `docs/verified-package-guides`, partendo da `ec791d8`. Nessuna modifica ai repository dei progetti, release/tag, deploy, messaggio esterno o push.

## Fonti e documentazione

| Progetto | Fonte selezionata / SHA | Guida e versione pubblica | Correzioni/limiti principali |
| --- | --- | --- | --- |
| Laravel Bank of Italy |1.0.1 / `8b4ae70b92d0b802139138e70367d789d80251af` |`/laravel-bank-of-italy/`, `/laravel-bank-of-italy/1.0.1/` |GitHub/Packagist coincidenti; requisiti Illuminate8/9 e PHP reali, API diretta, date Y-m-d, union Entity/Error/MessageBag, parser CSV limitato; facade non espone il servizio. |
| ODPS Validator |1.0.1 / `bed32b74b2cf353bfebb134aab9dfb41ac033d81` |`/odps-validator/`, `/odps-validator/1.0.1/` |App Next.js da sorgente, non libreria Composer; nome npm non trovato. Tag diverso dal manifest1.0.0. Asset reali3.0/3.1, export statico e limiti Ajv/schema espliciti. |
| SPID Laravel Trentino |v2.3.0 / `0fdb1e870606e471a39d35c144cde58158e023d6` |`/spid-laravel-trentino/`, `/spid-laravel-trentino/v2.3.0/` |Distribuzione Composer verificata; AAC/OIDC/PKCE, publish/config/route, mapping utenti, middleware token e log. Nessuna autenticazione reale eseguita. |
| pgr_dmmsy |v0.1.0 / `86b21b8efd8edd0c2851ba2b433b4481d0c37de9` |`/pgr_dmmsy/`, `/pgr_dmmsy/v0.1.0/` |Estensione C PostgreSQL/pgRouting; asset/checksum verificati. SQL con target esplicito e tipi/ordine reali. Target NULL non produce righe; nessun benchmark o licenza inventati. PostGIS prima di pgRouting. |
| Braintree Vue3 |sorgente senza release / `ff99c39e9fd45e6fe43440f8c3b7bcda58e01775` |`/braintree-vue3/`, nessuna versione fittizia |GitHub senza tag/release e npm404; guida Source references. API/composable/componenti reali, readiness/errori/ciclo vita; token client e nonce distinti da credenziali e pagamento server. |
| Vue3 Burger Menu |GitHub1.1.2 / `27ed3fe184f55de51401590f3975011c4131f65a` |`/vue3-burger-menu/`, `/vue3-burger-menu/1.1.2/` |Npm1.0.0 ha altro gitHead e manca dist/main: normale import non funzionante. Fonte GitHub, export default e API reali; workaround build esplicitamente non eseguito. |

Il catalogo ha12 schede:10 progetti rilasciati,1 integrazione Legacy/API ritirata,1 sorgente senza release. Mongo resta corrente. Moneta resta un riferimento non verificato fuori dalle schede. I riferimenti pubblici esistenti non cambiano. Nessuna versione è dedotta dal solo package.json o da una PR non rilasciata.

## File e motivi

- Sei nuove pagine inglesi root, seguendo il tema e la struttura esistenti; cinque nuovi snapshot release sotto `versioned/`, per22 pagine snapshot/11 release complessive. Braintree mostra solo il commit.
- `README.md` e navigazione: “Projects”/“Current projects” coprono anche applicazione JS ed estensione C; “Legacy” conserva il nome richiesto e “Source references” separa gli unreleased. Nessun redesign.
- `package-sources.json`: sei nuove fonti, release/commit, distribuzione, vincoli Composer/npm/build, file ispezionati e verifiche indisponibili. `documentation-versions.json` conserva metadati specifici dei progetti non Composer.
- Validatori: fonte senza release deve corrispondere al commit e non può dichiarare packageVersion; source checks verificano manifest Composer o hash dei manifest npm/C. Supportati repository con underscore e tag v-prefissati. Il selettore usa “Release”, evitando di chiamare ogni progetto un package PHP.
- Fixture/evidenze/findings sotto `maintenance/`; dipendenze/runtime/build temporanei restano fuori dal sito. Eccezione `.gitignore` solo per tracciare i lock Composer delle fixture isolate, che altrimenti sarebbero nascosti dal gitignore globale.
- Nessuna nuova dipendenza nel package.json/lockfile JavaScript del sito. CI di sola validazione già presente esegue i controlli aggiornati; nessun workflow di deploy aggiunto.

## Verifiche realmente eseguite

| Controllo | Risultato |
| --- | --- |
| `npm run docs:verify` con Node24.13.0/npm11.6.2 |Exit0:26 test, catalogo/provenienza/drift, build VuePress,7 landing originarie e232 anchor, link/asset/frammenti interni. |
| `python3 scripts/check-sources.py --references /private/tmp/oa-package-evidence --cart-reference /private/tmp/oa-laravel-cart-reference --http --output maintenance/evidence/link-checks.json` |119 link a file immutabili e61 URL esterni validi; nessun404 finale o controllo HTTP indisponibile. Manifest12 sorgenti verificati, incluso il commit non rilasciato. |
| Browser sito |12 schede,16 route/refresh, ricerca5argomenti, selettore/tastiera/mobile/404 e49 pagine senzaJS; nessun errore runtime/screenshot. Rapporto `evidence/browser-checks.json`. |
| Bank fixture |21 asserzioni fake; PHP8.1.34/Illuminate9.52.16/Guzzle7.15.5.3 snippet PHP e fixture lintati. Nessuna API provider. |
| ODPS install/build |`npm ci` in estrazione del tag:38 dipendenze; `npm run build`:exit0, statico `out/`. Node24.13.0, Next15.3.2/React19.1.0/Ajv8.17.1/js-yaml4.1.0 da lock originale. |
| ODPS handler/UI |Handler/getStaticProps del sorgente reale con fetch intercettato: YAML/JSON, tipi/parse/schema mancante e permissività. Chromium dell'export statico conferma successi/errori/404. Nessuna richiesta esterna. |
| SPID fixture |PHP8.5.10/Illuminate13.35 compatibile coi vincoli dichiarati; DTO, token/sessione e redazione log offline passano. Nessun login, IdP o DB persistente. |
| pgr fixture |Quattro suite C rilasciate compilate in directory temporanea:38 controlli passati. Tre asset scaricati, checksum e contenuti verificati; binari soltanto ispezionati. Nessun caricamento DB. |
| Vue fixtures |Sorgenti reali con confini Vue/SDK/DOM sintetici: lifecycle/errori/tokenize Braintree, open/close/width/Escape/listener e main npm assente Burger. Rerun finale Node24.13.0 passato. Esempi SFC controllati sintatticamente, non integrazioni Vue/browser reali. |

Comandi riproduttori dettagliati nei sei README `maintenance/fixtures/PROGETTO/`. ODPS usa `ODPS_SOURCE` e `ODPS_REPOSITORY`; SPID `SPID_SOURCE`/`LARAVEL_AUTOLOAD`; pgr `PGR_SOURCE`. Le fixture non installano PHPStan/Larastan o frontend nel sito e non contattano servizi produttivi.

Log build: `/private/tmp/oa-additional-projects-build.log` e `/private/tmp/oa-odps-build.log`. Il warning VuePress updater/tty è ambientale e non bloccante; nessun sudo/crypto workaround. La sicurezza residua del toolchain VuePress1/Vue2 resta descritta nel rapporto precedente: questo lavoro non ne costituisce una migrazione o audit pulito.

La revisione indipendente non ha rilevato altri difetti sostanziali; ha richiesto la sequenza PostGIS→pgRouting→pgr_dmmsy per un database nuovo, verificata nel Docker init rilasciato e applicata alla guida corrente/snapshot. Nessuna API è stata corretta surrettiziamente nei progetti.

Non eseguiti: suite/matrici complete upstream e CI remota sul commit finale, OAuth/SPID/Bank/Braintree reali, pagamento/3DS/PayPal/Venmo, build delle librerie Vue senza lock, montaggio Vue/iframe/animazioni/accessibilità reali, PostgreSQL/SQL/PGXS installcheck/caricamento binari/performance, audit dipendenze dei sei progetti. La fixture ODPS/browser non certifica completezza ufficiale degli schemi.

## Handoff upstream e pubblicazione

Difetti esterni documentati senza modificare quei repository:

- Bank: facade priva di endpoint delegato, parser CSV ingenuo e nessun retry/gestione trasporto applicativa.
- ODPS: README/versioni asset disallineati, schema permissivo (anche inputvuoto/42), URI ignorati, root required v3.0 disallineati; manifest tag diverso e latest non congelato senza lock. Static export incompatibile con suggerire nextstart.
- pgr: target omesso/NULL senza output, parametri/limiti effettivi differenti dalle promesse generiche; LICENSE mancante nella release e assenza asset Windows nonostante testo. Nessuna complessità/benchmark teorico certificato.
- Braintree: distribuzione non pubblicata, opzioni/token non automaticamente riconciliati e creazioni SDK pendenti non cancellate. Nessun flusso pagamento server implementato dalla guida.
- Burger: artifact npm incompleto, tag/npm/gitHead disallineati, export/props/eventi README non corrispondenti; limiti SSR/focus/DOM globale. Il workaround source-build resta da verificare upstream.
- SPID: nessun nuovo difetto API confermato in questi controlli; interoperabilità AAC non eseguita.

Hosting del sito non identificato autorevolmente: nessuna impostazione o produzione modificata. Resta al proprietario confermare il sistema attivo, eseguire la CI dopo eventuale push autorizzato e pubblicare `.vuepress/dist/`; nessuna delle guide richiede di rilasciare una PR upstream aperta. Pubblicare la guida Braintree non equivale a pubblicare il componente.

Titolo PR proposto: **docs: add six verified project guides and release snapshots**

Descrizione proposta: Add Bank of Italy, ODPS Validator, SPID Trentino, pgr_dmmsy, Braintree Vue3 and Vue3 Burger Menu guides from verified releases or pinned source. Extend catalog/provenance checks for JavaScript applications, PostgreSQL extensions and explicit source-only projects, preserving existing URLs and Mongo/Legacy classifications. Include five release snapshots, mocked/isolated fixtures and desktop/mobile static-site verification. Document broken npm artifacts and source limitations; no project code, deployment or account changes. No draft PR created.
