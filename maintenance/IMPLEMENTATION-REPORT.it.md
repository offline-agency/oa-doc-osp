# Aggiornamento documentazione — 16 ottobre 2026

Implementazione locale in `docs/verified-package-guides`, worktree `/private/tmp/oa-doc-osp-packages`, base `master` **6404296f0dd38b1243e15ac1c444a505c2ece667**. Il precedente lavoro Cart/VuePress 2 su un altro branch non è stato integrato. Nessun push, PR, merge, tag, release, deploy, modifica ai package o messaggio esterno.

## Release e pagine

Tutte le sei release sono state ricontrollate su GitHub e su metadata freschi Packagist: versione, source reference e dist reference corrispondono. Gli SHA completi, vincoli Composer e percorsi esaminati sono nel manifest `package-sources.json`.

| Pacchetto | Release / SHA | Pagine e correzioni principali | Limiti della verifica |
| --- | --- | --- | --- |
| Laravel Cart | 4.0.3 / `60eb1006c9c2b31ff50cebd7b8b677a1dd16cc16` | Landing e guide `laravel-cart/`: requisiti, publish tag distinti, prezzo netto/VAT, float/rounding, coupon, Buyable/FiscalBuyable, session/database, snapshot, owner/TTL, sync/limiti, eventi/comandi/risorse/fake, ricette e upgrade. Archivio sito 2024 separato. | Fixture session array; non suite SQL, migrazioni, concorrenza o matrice completa. PR50 aperta: nuove garanzie/guest transfer esclusi. Ricette UI sono scaffolding, non integrazioni frontend collaudate. |
| Laravel Webex | 2.0.0 / `c4aec48c1c416676cc411936fe7e905398f66b8c` | `laravel-webex.md` e `laravel-webex/coverage.md`: casing namespace, bearer/resolver, responsabilità OAuth, eventi, errori, retry, paginazione/origin guard e 52 accessor realmente registrati. | HTTP fake, nessun OAuth/provider reale o promessa di copertura completa. |
| Fatture in Cloud API v2 | package 3.0.1 / `04360c77c68e4d481f5a4943ffc2541f26b19767` | `laravel-fatture-in-cloud-v2.md`: API v2 ≠ major package; classi e readonly entity, aziende/config, payload, Error/MessageBag, paginazione, retry effettivi, URL a scadenza. `binDetail()` distinto da `bin()`. | Fixture list/create/edit/errore/validazione; nessuna chiamata reale, nessun retry infinito eseguito. PR88 esclusa. |
| Aruba SMS | 1.1.0 / `b090caba23f4882486619f2eaed90dfa9b7a2014` | `laravel-aruba-sms.md`: tag/config corretti, fluent message, notifica/client/facade, telefono, eventi/eccezioni, comandi, sandbox e 401. | Successo/errore con fake; nessun SMS/email reale e nessuna suite completa. |
| Mongo Auto Sync | 3.1.1 / `487a622ab48017f8839f4b90a0844d5c8fcbae7f` | `laravel-mongo-auto-sync.md`: slug Composer corretto, dipendenze legacy e base Jenssegers, CRUD/relazioni/partial request/limiti; demo Laravel6 marcata storica. | Sorgente e lint di 7 snippet; nessun database legacy eseguito. PR40/99/100 non sono release e non forniscono API stabili. |
| Fatture in Cloud API v1 | storico 2.2.8 / `b37155297538fa3dcbbcb16d633d926091734690` | `laravel-fatture-in-cloud.md`: avviso API ritirata dal31/01/2023, configurazione reale, snippet solo storici e migrazione autentica ad APIv2. | API ritirata, non eseguita. Nessuna deduzione “repository archived”. |
| Moneta Online | non verificabile / nessuno SHA | `laravel-moneta-online.md`: stato onesto, frontmatter riparato, nessun comando/API inventato, route conservata. | Repository presunto restituisce404: identità/distribuzione non accertate, non prova di cancellazione. |

PHP/Laravel dichiarati dal Composer sono separati dai runtime effettivamente provati e dalle piattaforme consigliate. Laravel11 ammesso dal wrapper FICv2 ha terminato supporto sicurezza; non è raccomandato per nuovi progetti. Non sono stati aggiunti Bank of Italy o altri package proposti nella PR12. Il diff della PR12 è stato letto, senza merge/cherry-pick automatico.

## File e comportamento del sito

- `README.md`: stessa home/custom frontmatter e identità OA; sei card valide, quattro attuali, Mongo legacy e FICv1 storica. Rimossa card vuota; Moneta non promossa.
- Guide root inglesi e riferimenti Cart/Webex: sostituiti esempi obsoleti, checklist speculative, badge/link errati e boilerplate. Licenze e contributi puntano ai file effettivi dei commit selezionati. Mantenute sette route originarie e **232 anchor** tramite heading/shim, con mappa Cart esplicita.
- `maintenance/`: manifest, evidenze, fixture isolate, limiti/upstream handoff, istruzioni di aggiornamento e proposta di migrazione engine. Esclusa dalla pubblicazione.
- `.vuepress/config.js`: lingua `en-US`, descrizioni, navigazione attuali/storici, sidebar Cart/Webex, nessun vecchio Universal Analytics; footnote, container e last-updated conservati.
- Tema copiato: correzione selezione sidebar con clean URL/fallback auto, pulsanti nativi e attributi accessibili per menu/mobile, Escape e focus visibile. Home, logo, colori e impianto conservati; nessun redesign.
- `package.json`, lock, `.nvmrc`, `.npmrc`: VuePress stabile1.9.10 e Node24.13.0/npm11.6.2; script root coerenti e veri test. Repository GitHub corretto; una sola lockfile/npm; nessun PHPStan/Larastan o dipendenza PHP nella root.
- `scripts/`: controlli catalogo/frontmatter/provenienza, test sidebar e collegamenti, build/static HTML/asset/anchor, preview con404 reale e controllo opzionale sorgenti/HTTP.
- `.github/workflows/docs.yml`: install frozen, verifiche e artifact, permessi sola lettura, PR/master. Nessun deploy. Pipeline Bitbucket lasciata invariata perché ruolo operativo non dimostrato, esplicitamente obsoleta e non procedura build prevista.

## Comandi e risultati reali

Runtime: Node24.13.0, npm11.6.2; fixture PHP8.5.10. Comandi dalla worktree salvo indicazione diversa:

| Verifica | Comando / risultato |
| --- | --- |
| Baseline originale | Scratch del commit base + `npm ci --offline` con lock originale: install riuscita1231 package; `npm run docs:build` su Node24 falliva `ERR_OSSL_EVP_UNSUPPORTED`. Distinto dal warning ambientale updater/tty. |
| Install finale | `PATH=/Users/gfabbian/.nvm/versions/node/v24.13.0/bin:$PATH npm ci --cache /private/tmp/oa-doc-osp-npm-cache --no-audit --no-fund --offline`: exit0,1477 package, lock coerente. Cache già popolata; fetch online in CI non ancora eseguito. |
| Verifica sito | `npm run docs:verify`: exit0; catalogo/frontmatter,13 test Node, build produzione,7 route/232 anchor e link/fragment/asset interni passano. Nessun crypto flag. |
| Sorgenti/esterni | `python3 scripts/check-sources.py --references /private/tmp/oa-package-evidence --cart-reference /private/tmp/oa-laravel-cart-reference --http --output maintenance/evidence/link-checks.json`: exit0;6 tag/manifest Composer,93 link a file di release e45 link HTTP validi; nessun404 o check indisponibile finale. |
| Cart | `CART_PACKAGE_REPO=/private/tmp/oa-laravel-cart-reference CART_VENDOR_AUTOLOAD=/Users/gfabbian/projects/laravel-cart/vendor/autoload.php bash maintenance/fixtures/cart/run.sh`: exit0; prezzi/tasse/coupon/rounding/meta/sync/limiti/CartFake/eventi. Laravel13.35.0, BCMath presente. |
| Webex | `WEBEX_PACKAGE_REPO=/private/tmp/oa-package-evidence/laravel-webex WEBEX_VENDOR_AUTOLOAD=/Users/gfabbian/projects/laravel-webex/vendor/autoload.php bash maintenance/fixtures/webex/run.sh`: exit0; Meetings/Messaging,401/malformedJSON/204,retryGET/noPOST,cursor/origin/failure. Laravel13.35.0. |
| FICv2 | `php maintenance/fixtures/fic-v2/run.php /Users/gfabbian/projects/laravel-fatture-in-cloud-v2/vendor/autoload.php /private/tmp/fic-v2-release`: exit0,4 richieste fake, list/APIerror/validazione/create/edit. Laravel13.2.0/Guzzle7.10.0. |
| Aruba | `LARAVEL_AUTOLOAD=/Users/gfabbian/projects/laravel-webex/vendor/autoload.php ARUBA_SOURCE=/private/tmp/oa-package-evidence/laravel-aruba-sms php maintenance/fixtures/aruba/verify.php`: exit0; multi-recipient,channel/facade,sessione/401,errori/eventi,sandbox. Laravel13.35.0. |
| Mongo | `python3 maintenance/fixtures/mongo/verify.py --source /private/tmp/oa-package-evidence/laravel-mongo-auto-sync`: exit0; sorgente released,7 snippet PHP lintati,44 anchor. Nessuna esecuzione database. |
| Audit | `npm audit --json`: exit1;121 finding (6low,73moderate,37high,5critical), incluse metavulnerabilità, nel toolchain build/dev. Non è un audit pulito. Riepilogo in `evidence/npm-audit-summary.json`. |

Le fixture reindirizzano l'autoload al codice della release e verificano la sorgente caricata, leggendo dipendenze compatibili preesistenti senza modificarle. Non sono una matrice completa o una misura di coverage. Nessuna richiesta di produzione/invio fatture/SMS/meeting/messaggi. README specifici contengono riproduttori e dettagli.

Log locali: `/private/tmp/oa-packages-baseline-install.log`, `/private/tmp/oa-packages-baseline-build.log`, `/private/tmp/oa-packages-verification-final.log`, `/private/tmp/oa-packages-audit.json`. Il warning updater VuePress sul config globale non scrivibile/tty è non bloccante; non sono stati alterati permessi globali o usato sudo.

Verifica browser/HTTP: `PLAYWRIGHT_MODULE=/private/tmp/oa-cart-browser/node_modules/playwright/index.mjs CHROMIUM_EXECUTABLE=/Users/gfabbian/Library/Caches/ms-playwright/chromium_headless_shell-1234/chrome-headless-shell-mac-arm64/chrome-headless-shell node maintenance/fixtures/browser/verify.mjs` passa; vedere `evidence/browser-checks.json`, raccolta con Chromium headless su desktop1440px/mobile390px, senza screenshot. L'anteprima locale è `http://127.0.0.1:4175`; output `.vuepress/dist/`. Le verifiche comprendono navigazione/refresh di guide attuali e storiche, menu tastiera, ricerca,404, layout mobile di codice/tabelle e tutte le21 pagine generate via HTTP con JavaScript disabilitato. Nessun confronto visivo pixel-per-pixel o certificazione WCAG. Una precedente asserzione del riproduttore presumeva che ogni risultato ricerca avesse un anchor: corretta confrontando l’URL del risultato effettivamente selezionato; riesecuzione finale riuscita. Le richieste esterne del browser sono bloccate, verificate separatamente dal link checker.

Non eseguiti: workflow GitHub del commit finale (nessun push), suite/matrici complete upstream, database/concorrenza Cart, MongoDB legacy/demo, OAuth/provider reali, APIv1 ritirata, Moneta non disponibile, install delle fixture alternative da zero. Nessuna CI dichiarata verde da una sola configurazione presente nel sorgente.

## Difetti esterni alla documentazione

Nessun repository package è stato modificato; questi sono handoff concreti, non nuove promesse:

- Cart4.0.3: Composer omette BCMath usato dai coupon cart-level; breakdown VAT è prima dei coupon cart-level, non allocazione fiscale finale. Nuove garanzie atomiche/trasferimento guest in PR50 non rilasciate. Ricette frontend complete e imposte post-sconto richiedono lavoro upstream verificato; scaffold sito etichettato.
- Webex2.0.0: riepilogo coverage upstream sovrastima accessor esposti; qui inventario52 confrontato con registro reale. Creazione client/evento non certifica token valido. OAuth applicativo rimane esterno.
- FICv2 3.0.1: retry403/429 ricorsivo senza limite, unità commentate ms ma passate a `usleep` in microsecondi; paginazione helper può perdere connector azienda/token; changelog contiene voce futura non prova di release. Documentati limiti, nessun fix PHP surrettizio.
- Aruba1.1.0: comando notification usa solo primo `--phoneNumber`; raw credit ritorna invece di stampare; sandbox SMS non impedisce eventuale email soglia, valore credito casuale. Documentati limiti senza invii.
- Mongo3.1.1: dipendenze legacy, nessuna garanzia atomica inter-collection, relazione one-to-one non implementata genericamente. Demo Laravel6/mongo1.x storica. Proposte4.x/geospatial non distribuite.
- FICv1: ritiro provider, differenze credenziali/payload richiedono migrazione; repository non dichiarato archiviato. Moneta: identità non accertata.
- Toolchain documentale: Vue2 EOL e vulnerabilità residue; la release npm VuePress2 `next` è prerelease. Proposta separata concreta in `vuepress-migration.md`, senza affermare una migrazione completata.

## Pubblicazione e proposta PR

Non è stato possibile identificare autorevolmente il servizio/account che pubblica `docs.offlineagency.com`. Prima della pubblicazione: proprietario conferma host attivo e ruolo Bitbucket, decide migrazione/security debt, esegue nuova CI sul commit proposto, configura root `/`, build `npm ci && npm run docs:verify`, artifact `.vuepress/dist/` e404 statico. Nessuna credenziale, setting o produzione modificata. Le guide stabili non richiedono il rilascio delle PR aperte.

Titolo proposto: **docs: refresh released package guides and reproducible VuePress checks**

Descrizione proposta:

> Replace stale package guides with release-pinned documentation for Cart4.0.3, Webex2.0.0, FICv2 wrapper3.0.1, Aruba1.1.0 and legacy Mongo3.1.1; mark retired FICv1 and unverified Moneta clearly. Preserve existing landing URLs and232 heading anchors, the OA catalog and copied theme. Add provenance, isolated mocked PHP fixtures, supported Node24 frozen builds, focused content/link tests and read-only GitHub validation.
>
> Local verification: npm ci,13 Node tests, production build/internal links,93 pinned source links,45 external URLs and mocked success/error fixtures passed; desktop/mobile browser report included. Vue2 EOL/npm audit debt, legacy Mongo execution and unknown production ownership remain explicitly documented. No deployment or package changes.
