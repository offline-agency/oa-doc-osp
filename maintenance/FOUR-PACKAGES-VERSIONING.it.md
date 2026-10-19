# Quattro progetti: documentazione per linee indipendenti

Implementazione locale del 16 ottobre 2026, nel worktree `/private/tmp/oa-doc-osp-packages`, branch `docs/verified-package-guides`. Base di questa estensione: `82a63b0`; base originaria di master: `6404296f0dd38b1243e15ac1c444a505c2ece667`. Il checkout principale rimane pulito. Nessun push, PR, release, modifica upstream o deploy.

## Matrice verificata

| Progetto | Linea / pagina pubblica | Fonte immutabile | Pubblicazione e supporto |
| --- | --- | --- | --- |
| SPID Laravel Trentino | `/spid-laravel-trentino/v2/` | v2.3.0 · `0fdb1e870606e471a39d35c144cde58158e023d6` | Quattro tag/release 2.x, tutti risolti anche attraverso gli oggetti annotated; Packagist source/dist corrispondenti. Nessun v1 verificato. Durata di supporto non documentata. |
| pgr_dmmsy | `/pgr_dmmsy/v0.1/` | v0.1.0 · `86b21b8efd8edd0c2851ba2b433b4481d0c37de9` | Unica release, pre-1.0; sorgente e tre asset verificati. Nessuna promessa di compatibilità con un futuro 0.2. Supporto non documentato. |
| Braintree Vue 3 | `/braintree-vue3/next/` | `ff99c39e9fd45e6fe43440f8c3b7bcda58e01775` | Nessun tag/release e npm E404 alla verifica. Versione manifest 0.1.0 non promossa a release. Next noindex, escluso dalla sitemap. Supporto non documentato. |
| Vue 3 Burger Menu | `/vue3-burger-menu/v1/` | 1.1.2 · `27ed3fe184f55de51401590f3975011c4131f65a` | Tag 1.0.0 e 1.1.2 identici; sola release GitHub 1.1.2. npm scoped pubblica solo 1.0.0, con bundle mancante e gitHead diverso. Nome unscoped appartenente a un altro progetto. Supporto non documentato. |

Ogni pagina mostra versione esatta e stato. Le API aggiunte nei minor SPID sono annotate: fallback 2.1, transaction log/prune 2.2, fail-closed/check 2.3. Non sono state inventate versioni o policy EOL. Mongo resta nei progetti correnti; la categoria dell'integrazione API ritirata resta **Legacy**.

## Implementazione

`package-sources.json` ora contiene categorie/cards, strategia, pin, distribuzione e riferimenti agli audit. `documentation-versions.json` guida percorsi, sidebar e selettori specifici del progetto. Le linee >=1 seguono il major; pre-1.0 seguono il minor. Gli altri progetti, incluso Cart, conservano contenuti e percorsi di release già presenti.

Il comando pubblico `npm run docs:update -- --package NAME --reference CLONE --plan|--apply` controlla tag/SHA, importa quando configurato, aggiorna snapshot e catalogo e salva hash di input/output in `update-provenance/`. Non seleziona automaticamente release e non modifica il clone. Build/check usano solo materiale committato, senza rete. Un tag mancante o spostato causa errore; non viene usato HEAD come ripiego.

Braintree importa integralmente sette guide, adatta la home VitePress a Markdown e genera un indice degli export da `src/index.ts`. Conserva 36 input con hash e separa le note del sito. L'indice è esplicitamente diverso da una reference TypeDoc completa. Burger genera dichiarazioni props/export/eventi dal sorgente e pubblica la licenza MIT sotto `/assets/vue3-burger-menu/v1/`. Nessun componente Vue 3 viene montato nel runtime VuePress 1/Vue 2.

Il tema mantiene identità e struttura esistenti. Modifiche circoscritte: selettore/version banner con link statici, fallback esplicito per argomento assente, ricerca locale ordinata per versione corrente/storica/next, categorie nel menu e home. Canonical e robots usano il meccanismo nativo VuePress anche nella navigazione SPA. Non sono state cambiate dipendenze root o lockfile: VuePress 1.9.10 e Node 24.13.0 sono quelli già verificati nel lavoro precedente. Restano il debito Vue 2 EOL e le vulnerabilità di toolchain documentati in `vuepress-migration.md`; nessuna dichiarazione di audit pulito.

## Migrazione URL e anchor

| Vecchio ingresso | Destinazione |
| --- | --- |
| `/spid-laravel-trentino/`, `/spid-laravel-trentino/v2.3.0/` | `/spid-laravel-trentino/v2/` |
| `/pgr_dmmsy/`, `/pgr_dmmsy/v0.1.0/` | `/pgr_dmmsy/v0.1/` |
| `/vue3-burger-menu/`, `/vue3-burger-menu/1.1.2/` | `/vue3-burger-menu/v1/` |
| `/braintree-vue3/` e nuovi ingressi argomento non versionati | `/braintree-vue3/next/` e argomento corrispondente |
| `/vue3-burger-menu/reference/` | `/vue3-burger-menu/v1/reference/` |

Sono generati **17 redirect HTML statici**, con link di ripiego, canonical/noindex e mappa anchor. Non servono rewrite del server. `compatibility-route-anchors.json` conserva gli ID precedenti; l'artefatto `.vuepress/dist/redirects.json` contiene tutte le destinazioni effettive degli anchor, anche verso argomenti spostati. Un argomento assente porta all'overview con avviso esplicito, non a un 404. Le versioni storiche mantengono canonical proprio; next non sostituisce la release stabile. Sitemap e robots sono generati. Le sette landing precedenti e i 232 anchor originari rimangono verificati.

## Verifiche effettive

- `npm ci --cache /private/tmp/oa-doc-osp-npm-cache --no-audit --no-fund`, Node 24.13.0/npm 11.6.2: PASS, 1477 pacchetti; warning deprecazioni upstream, nessun force/legacy-peer/OpenSSL workaround.
- `npm run docs:verify`: PASS. Frontmatter/catalogo, import offline, provenienza e drift, **45 test Node**, build produzione, link/fragment/asset/canonical. Artefatto `.vuepress/dist/`: **74 HTML**, 33 snapshot, 17 redirect.
- `npm test` dopo gli ultimi test di rimozione/ripristino argomento e promozione nuovo major: PASS, 45/45. Fixture sintetiche v1/v2/v3 e 0.1 usate solo nei test, mai pubblicate come release reali.
- `python3 scripts/check-sources.py --references /private/tmp/oa-package-evidence --cart-reference /private/tmp/oa-laravel-cart-reference --http --output maintenance/evidence/compatibility-source-checks.json`: PASS, **141 link sorgente immutabili e 63 link HTTP**, nessun 404/unavailable.
- Tutti e quattro i `docs:update --apply` sono stati eseguiti sui clone esterni fissati. Eseguito anche `--plan` per SPID: nessuna modifica in modalità revisione. Gli import Braintree/Burger passano `--check` senza clone/rete; i test rilevano output/raw input alterati, pin errati e argomenti rimossi.
- SPID: fixture offline su **v2.0.0 e v2.3.0**, PHP 8.5.10/Laravel 13.35.0: PASS per DTO/claim/JSON/errori, redazione log, risposta token e scadenza sessione. Nessun login AAC o verifica firme reale.
- pgr_dmmsy: quattro suite C, **38 controlli PASS**; sorgente v0.1.0 compilato/installato in container usa-e-getta, rete disabilitata, PostgreSQL 17.11/PostGIS 3.5.7/pgRouting 4.0.1 arm64. SQL PASS per grafo esatto 1→2→3, direzionalità, non raggiungibilità, target NULL/omesso e cap zero. È un runtime osservato, non una matrice di supporto; pgRouting 4 supera il requisito dichiarato 3.x. Nessun database esistente o binario release caricato.
- Braintree: mock lifecycle/Hosted Fields PASS; `vue-tsc --noEmit` sorgenti e SFC completo selezionato PASS con toolchain isolata bloccata. TypeDoc 0.28.14/markdown 4.9.0/TS 5.9.3 **fallisce exit 3 TS2307** sui due export `.vue`; risultato registrato, non mascherato con shim. Nessuna reference generata da quel fallimento.
- Burger: logica effettiva eseguita separatamente su entrambi i tag, PASS con confini Vue/DOM sintetici; entrambi gli esempi SFC compilano con compiler 3.5.22. Non costituisce test browser/SSR del pacchetto.
- Browser finale: PASS per 4 sezioni e 17 redirect, 16 ingressi di regressione, ricerca su 5 argomenti, canonical/robots nel cambio pagina SPA, fallback di argomento, tastiera/mobile e blocchi lunghi. Tutti i 73 HTML pubblici diversi dal 404 caricati via HTTP anche senza JavaScript; 404 verificato separatamente. Risultati in `evidence/browser-checks.json` e `evidence/compatibility-browser.json`, nessun errore runtime e nessuno screenshot salvato.

Build log locali: `/private/tmp/oa-compatibility-final-verify.log`; test finali `/private/tmp/oa-compat-final-tests.log`. Le fixture e gli audit dettagliati elencano comandi, toolchain e output. Nessuna CI remota dichiarata verde prima di un run sul commit finale.

Non eseguiti: login identità reale, pagamenti/SDK live, montaggio dei pacchetti Vue in browser o SSR, suite upstream complete, benchmark e matrice PostgreSQL/pgRouting/piattaforme, caricamento dei binari release. Le verifiche mock/typecheck non dimostrano autenticazione o pagamenti funzionanti. Non sono stati usati segreti o API produttive.

## Difetti upstream separati

Riferimenti esatti nei findings e negli audit per progetto:

- pgr: default SQL target NULL produce zero righe; `max_levels` può interrompere il calcolo, `constant_degree` accettato ma inutilizzato; asset Windows annunciato ma assente; licenza standalone assente. Nessuna promessa di accelerazione teorica trasformata in garanzia del codice.
- Burger: artefatto scoped npm privo di dist, gitHead diverso dai tag, README confonde nome unscoped; `onStateChange` non invocato, controllo iniziale/watch/right e pulizia globale con limiti; controlli interni senza gestione completa tastiera/focus/ARIA. Non viene dichiarata accessibilità o SSR garantita.
- Braintree: TypeDoc non risolve SFC, lockfile/licenza standalone upstream assenti; guida originale confonde payment ID/nonce PayPal e riutilizzo nonce, promesse di cancellazione 3DS e compliance non dimostrate. Correzioni del sito sono trasformazioni esplicite; sorgenti originali conservati.
- SPID: differenze per minor rese esplicite; nessuna garanzia di accreditamento, firme reali o matrice framework dedotta dal solo manifest. Persistenza/controller e transaction log DB non verificati dalle fixture offline.

Nessun difetto è stato corretto nei repository upstream né comunicato esternamente.

## Manutenzione e pubblicazione

Procedura completa in `maintenance/README.md`: aggiungere progetto verificato al registro e guida/importer; minor/patch aggiorna la stessa linea e conserva pin precedenti; nuovo major o minor pre-1 crea un nuovo albero congelando i precedenti; next si promuove solo dopo prova di release/distribuzione e revisione dei contenuti. I test coprono anche promozione, argomenti assenti/ripristinati e conservazione snapshot. La home viene rigenerata dal registro preservando i campi custom.

Anteprima: `npm run docs:preview`, **http://127.0.0.1:4175/**. Output: `.vuepress/dist/`. Il workflow GitHub esistente resta di sola validazione: npm ci/check/test/build e artefatto, nessun deploy. Ownership dell'hosting non verificata; il proprietario deve confermare servizio effettivo, Node/build command, base `/`, directory artefatto, 404 e pubblicazione atomica dei redirect/assets/sitemap insieme alle pagine. La pipeline Bitbucket Node 10 resta obsoleta e non va usata come procedura di build; non viene sovrascritta senza sapere se sia operativa. Nessuna release package è necessaria per pubblicare queste guide alle release già verificate; next mantiene la propria etichetta.

## PR proposta

**Titolo:** `docs: add independent versioned guides for four OSS projects`

**Descrizione:**

> Document SPID v2, pgr_dmmsy v0.1, Burger Menu v1 and unreleased Braintree next from immutable verified sources. Add registry-driven categories, compatibility-line selectors, deterministic imports/provenance and static route/anchor redirects with canonical/sitemap policy. Preserve existing package routes and the shared VuePress layout.
>
> Validation: frozen Node 24 install; 45 regression tests; production build and internal/source/HTTP checks; offline SPID, isolated SQL, Vue compilation/typechecks and mocked Braintree fixtures. TypeDoc's Vue SFC resolution failure and upstream distribution/API limitations remain explicit. No deployment or package changes.
