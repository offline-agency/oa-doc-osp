# Laravel Cart 4.1: implementazione e consegna

Lavoro locale nel worktree `/private/tmp/oa-doc-osp-packages`, branch `docs/verified-package-guides`, base di questa attività **85e98c3**. Il master remoto è stato riverificato: **6404296f0dd38b1243e15ac1c444a505c2ece667**; non è stato rinominato. Il checkout principale è rimasto pulito. Nessun push, PR, tag, release, modifica di account, deploy o modifica del runtime upstream.

## Release e versioni documentate

| Contenuto | Fonte | Percorso e stato |
| --- | --- | --- |
| Cart corrente | **4.1.0**, `b89d3219202703203453890e2e46467e79ad415d` | `/laravel-cart/v4/`, 19 pagine; release stabile corrente verificata, durata supporto package non documentata |
| Archivio precedente | 4.0.3, `60eb1006c9c2b31ff50cebd7b8b677a1dd16cc16` | `/laravel-cart/4.0.3/`, 11 pagine congelate, contenuto Markdown invariato e canonical proprio |
| Vecchio sito | Revisione docs `6404296...` del giugno2024 | `/laravel-cart/legacy/`, storico del sito, non una finta versione package3.x |

GitHub conferma PR#50 unita alle15:16:40UTC e release4.1.0 pubblicata alle15:19:22UTC del16ottobre2026. Il tag annotated risolve al commit sopra; Packagist source/dist corrispondono. PHP `~8.4.0 || ~8.5.0`, **ext-bcmath**, Illuminate `^12.69.2 || ^13.32`: requisiti letti dal tag, non dedotti dal branch. Evidenza: `evidence/cart41-release.json`.

Repricing, mutazioni atomiche built-in, concorrenza database e trasferimento guest opt-in sono indicati **since4.1**. Non vengono più descritti come promesse di PR aperta. Gli importi pubblici restano float; i coupon carrello **non riallocano l'IVA dopo lo sconto**. Non è pubblicata una futura API di allocazione fiscale. Gli ID prodotto scalari stringa sono stati verificati e funzionano già; non è stato inventato un bug o un fix di release successiva.

## Contenuti e flusso autorevole

Import deterministico delle **14 guide docs/v4** del tag, dell'esempio delimitato `docs:start/end`, della configurazione reale e dei relativi collegamenti. **164 input** conservati con hash e licenza originale; nessuna build scarica main o seleziona latest. I collegamenti fra guide diventano percorsi del sito/versione; esempi, test, UPGRADE, script, risorse Boost e file sorgente puntano allo SHA immutabile.

Cinque adattamenti del sito completano scelta del package, varianti/wishlist, Livewire/Inertia, API/mobile e sessioni Redis. Prezzi/IVA vengono dal catalogo server, quantità/varianti sono validate e ownership autorizzata; checkout e stock restano responsabilità applicative. Gli esempi frontend sono dichiarati scaffolding: nessuna integrazione Livewire/Inertia/mobile/Redis reale viene spacciata per testata. L'esempio PHP condiviso è eseguito separatamente.

Le pagine coprono installazione e publish tag separati, configurazione, operazioni e reference, Buyable/FiscalBuyable/peso, coupon e mixed VAT, session/database, owner/TTL, lock/concorrenza, snapshot e login, risorse/eventi/comandi/fake, upgrade e supporto. La home Cart collega tutte le ricette e mostra un quickstart estratto dall'esempio upstream con risultato45.36. Le descrizioni distinguono piattaforma, tasse, database e autenticazione senza creare pagine keyword duplicate.

Comando di manutenzione:

```bash
npm run docs:update -- --package laravel-cart --reference /read-only/laravel-cart --plan
npm run docs:update -- --package laravel-cart --reference /read-only/laravel-cart --apply
npm run docs:verify
```

`--plan` non modifica pin o contenuti. `--apply` verifica tag/SHA, importa sorgenti/adattatori, genera l'albero del major, aggiorna catalogo e date di contenuto e salva la provenienza input/output. `--check` è offline. Un tag mancante/spostato, raw input alterato, pagina generata divergente o metadato errato falliscono. Un minor/patch verificato aggiorna v4; un nuovo major richiede verifica del suo sorgente/import e crea un albero distinto. Gli archivi restano congelati. Gli adattatori applicativi richiedono revisione e test del nuovo contratto, non una sostituzione cieca delle etichette.

## URL, ricerca e home

`/laravel-cart/` e gli argomenti attuali usano redirect HTML statici a `/laravel-cart/v4/`. `quick-start` passa a `usage`, `support` a `troubleshooting`; lo switch di versione conosce questi argomenti equivalenti. Gli anchor originali della landing rimandano esplicitamente al contenuto storico. Nessun rewrite server da configurare. Mappa leggibile: `/laravel-cart/url-migration/`; mappa effettiva completa: `.vuepress/dist/redirects.json`.

La vista corrente offre un solo albero v4, con release esatta4.1.0. L'archivio4.0.3 conserva API, banner e titolo storico, canonical proprio e collegamento all'argomento corrente. I test coprono argomento assente/rinominato, esclusione prerelease, rimozione/ripristino e conservazione dei major precedenti. Non è stata creata una documentazione3.x da esempi4.x.

Ricerca locale senza credenziali: versione corrente prima degli archivi; next non sostituisce stable. Canonical e robots funzionano anche nel cambio pagina SPA. Il nuovo `documentation-index.json` contiene URL canonici, descrizioni, versioni e SHA, non istruzioni di ranking per agenti. Next è noindex ed escluso dall'indice canonico/sitemap. `sitemap.xml` usa date registrate di modifiche Markdown reali: rebuild identici non aggiornano lastmod.

Secondo l'ultima indicazione, **home e navigazione mantengono solo Current project e Legacy**. Restano i filtri combinabili Maintained/Legacy/Next e PHP/JavaScript/PostgreSQL, conteggio/reset e stato vuoto. Mongo resta Maintained; Braintree resta Next/unreleased. Guide e snapshot degli altri package non sono stati riscritti.

## Toolchain e file principali

La baseline precedente VuePress1.9.10/Node24 costruiva il sito e passava45test; non rendeva mantenuto Vue2. La nuova implementazione usa **VuePress2.0.0-rc.31**, Vue3.5.44, bundler Vite rc31, tema/search/container rc137, Node24.13.0/npm11.6.2 e lockfile npm congelato. VuePress2 è esplicitamente una **RC**, non la latest stabile: la scelta elimina Vue2 fuori supporto, con rischio API delle RC riconosciuto e pin esatti. Il tema Vue2 e i suoi plugin runtime sono rimossi; restano piccole utilità pure usate dai vecchi test e relativa attribuzione.

Preservati logo, sfondo/identità, schema home, filtri, codice leggibile, container/footnote, last-updated, mobile e tastiera. Adattati layout/version banner, sidebar, dropdown con Escape/aria-expanded, ricerca e 404. Nessuna analytics sostitutiva o account introdotto. Dev/build puntano alla root.

Audit effettivo: **30 moderate, zero high/critical**, propagazioni di un unico advisory sprintf-js senza versione patch disponibile. Non è un audit pulito. Nessun force downgrade, legacy-peer-deps, override incompatibile o workaround OpenSSL. Motivazione e fonte: `cart41-toolchain-findings.md`, `vuepress-migration.md`.

Gruppi di file cambiati:

- `laravel-cart.md`, `laravel-cart/`, `versioned/laravel-cart/v4/`: guide importate e ricette; vecchi authoring quick-start/support sostituiti da redirect, archive4.0.3 invariato.
- `maintenance/package-sources.json`, `documentation-versions.json`, raw fixture/provenance/adapters: pin, disponibilità4.1 e flusso ripetibile sul registro condiviso.
- `scripts/import-cart*`, helper versioni/update, content-history/postbuild/publication: drift, alias, date reali, indice e sitemap.
- `.vuepress/config.mjs`, client/layout/components/styles, manifest npm/lock: migrazione Vue3 compatibile e preservazione layout/funzionalità.
- Home frontmatter/catalogo e fixture browser: sole due sezioni richieste e regressioni sul nuovo tema.
- Documenti di manutenzione, evidenze e fixture PHP isolate: risultati e consegna. Nessun PHPStan/Larastan installato nella root JavaScript.

## Comandi e risultati reali

| Verifica | Risultato |
| --- | --- |
| `npm ci --cache /private/tmp/oa-cart-npm-cache --no-audit --no-fund` | PASS, 293 package, Node24.13/npm11.6; un warning upstream whatwg-encoding |
| `npm run docs:verify` | PASS: contenuti/provenienza/drift, **58 test Node**, produzione, link/anchor/asset/canonical |
| `npm run docs:build` dopo l'ultima modifica alle due sezioni | PASS; output **103 HTML**, 52 snapshot, 38 redirect; 7 landing/232 anchor originali preservati |
| `python3 scripts/check-sources.py ... --http --output maintenance/evidence/cart41-source-checks.json` | PASS, **160 link sorgente immutabili e63 HTTP**, nessun404/unavailable |
| Browser `home-filters.mjs` | PASS, **16 combinazioni**, due sole sezioni, tastiera/reset/mobile e12card senzaJS |
| Browser `verify.mjs` | PASS, **16 ingressi**, ricerca5argomenti, tastiera/mobile/404, **102 HTML pubblici viaHTTP senzaJS**, zero errori runtime |
| Browser `compatibility.mjs` | PASS, **5 progetti versionati**,38redirect, selector/banner/sidebar/anchor, canonical/robots SPA e sitemap, zero errori runtime |

La sidebar VuePress2 usa anche hash relativi: il controllo li risolve rispetto alla pagina e verifica gli ID, anziché scambiarli per link fuori versione. Nessuno screenshot salvato. Corretto anche un precedente selettore del test che cercava un link figlio anziché il link stesso; non era un difetto della sidebar.

Verifica PHP sul **tag esportato** con autoload/reflection che impediscono di caricare il branch di sviluppo:

| Runtime | Esito suite upstream | Asserzioni |
| --- | --- | ---: |
| SQLite | 636 passati,2 skip concorrenza server | 1796 |
| PostgreSQL | 636 passati,2 skip dati non rappresentabili | 1814 |
| MySQL | 637 passati,1 skip JSON invalido | 1816 |

Entrambi i test di concorrenza reale con due processi passano su entrambi i server. Smoke per float, ID stringa,46.36 repricing con coupon e48.8 dopo detach, rollback/limiti e varianti: PASS. PHP8.5.10/Laravel13.35/Pest5.3.2/Testbench11.3. Container dedicati rimossi; nessun database applicativo o repository upstream alterato.

Ricette del sito: **4 test/14 asserzioni** sul servizio PHP con dati sintetici (Laravel13.36, PHP8.5.10);12blocchi PHP passano lint. Non eseguiti frontend Livewire/Inertia, client mobile, Redis reale, Octane/queue reali, matrice completa PHP8.4/Laravel12 o certificazione fiscale. Non viene rivendicata coverage misurata. Tutti i comandi/riproduzioni/log sono nelle evidenze e fixture dedicate.

Log sito locali: `/private/tmp/cart41-frozen-install.log`, `/private/tmp/cart41-final-verify.log`, `/private/tmp/cart41-final-build.log`. Nessuna CI remota dichiarata verde sul commit finale prima del push/run effettivo.

## Handoff upstream

1. `docs/v4/index.md` nel tag4.1.0 dice ancora “proposed next v4”: corretto nel transform del sito usando release/tag/distribuzione verificati.
2. `docs/v4/reference.md`, “Syncing with a list”, descrive identità solo per ID: il runtime `Cart::sync()` usa ID più opzioni. Frase corretta nel transform, con sorgente raw preservato e link alle regressioni.
3. Esempi completi riutilizzabili Livewire/Inertia/mobile/Redis restano lavoro upstream; il servizio e le fixture del sito sono una base da trasferire con revisione, non una modifica fatta al package.
4. Allocazione IVA post-coupon carrello non disponibile: documentata come limite, senza inventare API/signature o promettere una release.
5. Audit toolchain sprintf-js senza patch: seguire advisory/upstream. Nessun runtime PHP modificato e nessun messaggio esterno inviato.

## Pubblicazione e misurazione

Anteprima **http://127.0.0.1:4175/**; artefatto `.vuepress/dist/`. GitHub workflow read-only esegue npmci/check/test/build/link e carica l'artefatto, senza deploy. HEAD pubblico mostra Netlify Edge dietro Cloudflare; Pages API404 non identifica il proprietario del servizio. Account/progetto Netlify, branch collegato, build settings e ruolo operativo Bitbucket restano da confermare. La pipeline Node10 è lasciata intatta perché non è provata la sua ownership, ma è obsoleta e non è la procedura prevista.

Il proprietario deve: confermare host/branch e Node24, eseguire CI sul commit revisionato, verificare base `/`, pubblicare **atomicamente** pagine/redirect/asset/robots/sitemap/indice, verificare HTTP pubblico/404 e cache, poi avviare eventuali misurazioni. Nessun accesso o impostazione è stato modificato. La release4.1 è già pubblicata: il lavoro package futuro non blocca questa documentazione, e nessuna futura API viene promossa insieme.

`cart-discovery-measurement.md`/JSON forniscono scenari, landing canoniche, prove di capacità e campi per risultati grezzi. Baseline riportata dall'utente: **9 selezioni su20,7/8 high-fit**, non una probabilità fra agenti. Gli identificatori originali dei prompt e le sessioni grezze non sono nel checkout: campi originalPromptId esplicitamente null, da recuperare prima di un confronto valido. Nessuna sessione commerciale/AI esterna o aumento di raccomandazioni viene rivendicato.

## Proposta PR

**Titolo:** `docs: publish released Cart 4.1 guides with v4 routes and VuePress 2`

**Descrizione:**

> Document published Laravel Cart4.1.0 from pinned upstream guides and executable examples. Add a canonical v4 tree, preserve the4.0.3 archive and legacy anchors, and supply practical selection/UI/API/Redis recipes with explicit tax and integration boundaries. Reuse the shared source/version registry and add deterministic import/provenance, canonical index and content-based sitemap dates.
>
> Migrate the shared site to pinned VuePress2RC/Vue3 while preserving OA branding, package routes and filters. Home/navigation now expose only Current project and Legacy. Validation: frozen Node24 install,58site tests, full released PHP suites on SQLite/PostgreSQL/MySQL, isolated recipe checks, HTTP/source checks and browser/no-JavaScript crawl. VuePress RC and30moderate audit findings remain explicit. No package changes or deployment.
