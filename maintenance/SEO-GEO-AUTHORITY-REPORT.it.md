# Report SEO/GEO, autorevolezza e filosofia open source

Data: 17 ottobre 2026. Branch: `docs/verified-package-guides`, base `70bc9df` (che a sua volta parte da `master` `6404296f0dd38b1243e15ac1c444a505c2ece667`). Modifiche solo locali: nessun push, merge, deploy o cambio CDN.

Gran parte dell'audit (migrazione a VuePress 2, versioni per major, redirect, sitemap, robots, ancore, pagine dei quattro pacchetti aggiuntivi) era già stata implementata nei commit precedenti di questo branch. Questo intervento completa ciò che mancava.

## Matrice prima/dopo

"Prima" = crawl HTTP reale della produzione del 17/10/2026 00:07 (`maintenance/evidence/seo-production-baseline.json`). "Dopo" = build locale servita da `scripts/preview.mjs`. Il dopo in produzione va verificato dopo il deploy.

| Area | Prima (produzione) | Dopo (build locale) |
| --- | --- | --- |
| Canonical | assente | uno per pagina, assoluto, verificato da `check-metadata` |
| Sitemap / robots | sitemap 404, nessuna direttiva | `/sitemap.xml` (47 URL indicizzabili, lastmod reali), robots con `Sitemap:` |
| `lang` | `English` | `en` su tutte le pagine e sui redirect |
| Titoli | duplicati, suffisso ripetuto | unici, `Pagina — Pacchetto linea | OFFLINE Agency`; home "Open-source package documentation"; Cart "Laravel Cart v4: VAT, coupons and persistent carts" |
| Open Graph / Twitter / JSON-LD | assenti | presenti su ogni pagina indicizzabile; immagine reale 1200×630 con alt |
| Link/ancore rotti dell'audit | 404 e ancore mancanti | 0 errori nel crawl completo della build (`check-site`) |
| `/laravel-cart/v4/` e nuovi pacchetti | 404 | 200 |
| H1 doppio (Cart reference) | — | corretto nell'importer, una sola H1 per pagina |
| Heading vuoti | presenti in home | 0 (verificato) |
| UA analytics | presente | nessun tracker nella build; nessun GA4 aggiunto |
| `/llms.txt` | 404 | generato dallo stesso indice della sitemap |
| `/open-source-philosophy/` | 404 | 200, indicizzabile, AboutPage, in nav, home, footer, sitemap e ricerca |
| Pagina 404 | 404 reale | 404 reale, titolo "Page not found" |

## Cosa è stato aggiunto

- `scripts/site-metadata.mjs`: un solo livello di metadati (titolo, breadcrumb, OG/Twitter, JSON-LD con Organization/WebSite/WebPage/BreadcrumbList/SoftwareSourceCode, `@id` stabili).
- Breadcrumb visibile (`PageBreadcrumbs.vue`) coerente con il BreadcrumbList.
- Pannello **Project facts** (`ProjectFacts.vue`) su ogni overview: editore, repository, commit documentato, release e changelog, licenza, guida ai contributi, issue tracker, security policy, CI, supporto, data revisione contenuto. Le informazioni mancanti sono dichiarate come tali.
- Campo `trust` per pacchetto in `maintenance/package-sources.json`, letto dagli alberi Git ai commit pinnati (non dal default branch).
- Pagina `open-source-philosophy.md`.
- `scripts/check-metadata.mjs` + 12 test con fixture negative (canonical errato, `lang="English"`, og:url diverso, H1 doppia, heading vuoti, rating nel JSON-LD, titoli duplicati, escape JSON-LD).

## Mappa affermazioni → evidenze

| Affermazione (pagina filosofia / pannelli) | Fonte primaria |
| --- | --- |
| Editore "OFFLINE Agency", sito offlineagency.it | `og:site_name` di offlineagency.it; profilo GitHub `offline-agency` (offlineagency.com reindirizza a .it) |
| Pacchetti Laravel, Vue 3, app JavaScript, estensione PostgreSQL | `catalog.ecosystem` nel registro |
| Licenza MIT di 10 progetti; nessun file di licenza per Braintree e pgr_dmmsy | file `LICENSE*` letti ai commit pinnati |
| CI Cart verde sul commit di release 4.1.0 | GitHub check-runs del commit `b89d321` (run 38922612753), verificato il 16/10/2026 |
| Per gli altri progetti: solo definizioni workflow, esiti non verificati | `.github/workflows` ai commit pinnati; nessuna interrogazione degli esiti |
| Alcuni progetti senza test | `unavailableChecks` (ODPS, Burger Menu) |
| Nessun accordo di supporto generale; impegni solo nelle singole policy | SPID `SECURITY.md` (presa in carico entro 5 giorni lavorativi), tabelle "Supported versions" in Webex/SPID, Cart "No response SLA is promised" |
| GitHub Sponsors | `hasSponsorsListing: true` e `FUNDING.yml` (`github: offline-agency`) |
| Limite IVA dei coupon carrello | `laravel-cart/money-and-tax.md` importato dalla release 4.1.0 |

Non sono stati usati: anno 2016, clienti, numeri di adozione, testimonianze, biografie, certificazioni.

## Comandi

```sh
npm ci                     # install bloccato (Node >=24.13 <25)
npm run docs:check         # registro, versioni, import pinnati, cronologia contenuti
npm test                   # 70 test unitari
npm run docs:build         # build + postbuild (seo.json, redirect, sitemap, robots, llms.txt)
node scripts/check-site.mjs && node scripts/check-metadata.mjs
npm run docs:verify        # tutto quanto sopra
npm run docs:preview       # anteprima statica, PORT configurabile
```

Aggiornamenti intenzionali (mai durante la build): `npm run docs:update -- --package NOME --reference /clone --plan|--apply`; dopo modifiche al catalogo `node scripts/catalog.mjs`; dopo modifiche ai contenuti scritti a mano `node scripts/content-history.mjs --update`.

## Risultati dei test eseguiti

- `npm run docs:verify`: superato (70/70 test, build, crawl link/ancore, metadati su 47 pagine indicizzabili).
- HTTP locale: home, filosofia, overview e topic correnti/storici, alias (`/laravel-cart/`, `/spid-laravel-trentino/` → stub noindex), Moneta 200, 404 reale, robots/sitemap/llms con content type corretti.
- Browser (Chromium headless locale): filtri home 16 combinazioni + mobile + no-JS superati; ricerca trova la pagina filosofia e mette prima le guide v4 correnti; titoli corretti anche in navigazione SPA; mobile senza overflow; pannello, breadcrumb e codice presenti senza JavaScript; nessun errore console.
- Lighthouse non eseguito: nessun punteggio di performance è riportato.
- Ambiente: Node 25.0.0 locale (il progetto dichiara Node 24); la build passa, ma la CI deve usare la versione dichiarata.

## Azioni per l'operatore

1. Revisione e merge del branch; deploy della build (`.vuepress/dist`) sull'hosting reale: la proprietà del deploy (Bitbucket, Netlify, Cloudflare) non è dimostrata dal repository.
2. Verificare che l'edge serva `robots.txt` dell'origine (o lo combini) mantenendo la riga `Sitemap:`; non sono state toccate impostazioni Cloudflare.
3. Dopo il deploy, ripetere il crawl HTTP reale sul dominio pubblico: status, canonical, sitemap, robots, `lang`, titoli e data contenuti.
4. Search Console: ispezione URL e invio della sitemap (nessuna garanzia di indicizzazione o ranking).
5. Misurazione: decidere se e come misurare i clic verso GitHub/Packagist; nessun tracker è stato aggiunto.

## PR suggerita

**Titolo:** `docs: add metadata layer, project facts and open-source philosophy page`

**Descrizione:**

> Completes the SEO/GEO audit on the VuePress 2 site and adds a verifiable authority layer.
>
> - One metadata layer: unique titles without a repeated suffix, `lang="en"`, Open Graph/Twitter with a real 1200×630 image, JSON-LD (Organization, WebSite, WebPage/AboutPage, BreadcrumbList, SoftwareSourceCode) with stable `@id`s, and a visible breadcrumb matching it.
> - "Project facts" on every package overview, built from repository facts recorded at each pinned commit; missing licenses, policies and CI results are stated as missing.
> - New `/open-source-philosophy/` page, linked from navigation, home and footer.
> - `llms.txt` generated from the same index as the sitemap; Cart reference keeps a single H1.
> - Home redesign: search, status/technology chips, release and requirements on cards.
> - `check-metadata` with negative fixtures; `docs:verify` passes.
>
> Not deployed. After deployment, re-crawl production and submit the sitemap in Search Console.
