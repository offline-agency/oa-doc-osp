# Site maintenance

The public source is the repository root, not `docs/`. This directory is excluded from VuePress pages. English guides describe verified releases or explicitly identified source revisions; evidence and handoff notes are kept here. The default branch is `master`.

## Build and preview

Use Node **24.13.0** (Node 24 LTS) and npm **11.6.2** as pinned in `.nvmrc`/`package.json`:

```bash
nvm use
npm ci
npm run docs:verify
npm run docs:preview
```

The output is `.vuepress/dist/`; preview is http://127.0.0.1:4175. The preview serves real files and returns HTTP 404 for missing paths. `docs:dev` also uses the root. Do not run `npm install --force`, `--legacy-peer-deps` or a permanent OpenSSL legacy-provider workaround.

`docs:verify` checks frontmatter, the nonempty catalog cards, release provenance, Node regression tests, production rendering, seven existing landing pages, 232 historical anchor IDs, internal links and assets. PHP fixtures are deliberately outside this JavaScript dependency graph. Each `fixtures/*/README.md` describes its isolated dependencies and limitations; no real provider requests are required.

## Release evidence and updates

`package-sources.json` records tag, immutable commit, actual Composer requirements, independently checked Packagist source/dist references, status and verification date. Package major and provider API generation are separate fields in the prose. `evidence/` and the package findings record the checks actually performed; they are snapshots, not continuously green CI badges.

For an update:

1. Refresh GitHub latest release, default branch and relevant proposal state using read-only GitHub API requests. Resolve the release tag to a commit. Independently retrieve `https://repo.packagist.org/p2/offline-agency/PACKAGE.json` and compare version/source/dist references. A merged PR is insufficient.
2. Fetch the tag into an external reference clone. Inspect its manifest, provider/config, signatures, tests, upgrade guide and workflow. Do not modify that package repository. Review proposal branches separately.
3. Update the selected manifest entry, page frontmatter and English examples together. These are site-authored guides, not a copy of a moving upstream README. Cart and Braintree use explicit pinned import transforms; maintain site adaptations separately. Never fetch `main` during the production build.
4. Run the isolated fixtures against that exact source and compatible external dependencies, then the following drift/source checks. Update the verification date only after performing verification. Record unavailable checks instead of assuming success.

```bash
python3 scripts/check-sources.py \
  --references /path/to/package-reference-clones \
  --cart-reference /path/to/laravel-cart \
  --http --output maintenance/evidence/link-checks.json
npm ci
npm run docs:verify
```

Reference clones use the package repository basename under `--references`; Cart may be elsewhere. This command verifies every selected tag or source commit, the appropriate recorded manifests and immutable GitHub file links with Git, then optionally checks public links with read-only HTTP HEAD requests. HTTP 401/403/429/network failures are unavailable checks; actual 404s fail. It never contacts authenticated service endpoints or mutates external resources. Fresh release and registry discovery remains a deliberate maintainer step.

Keep existing landing routes and `legacy-anchors.json`. Cart root and topics redirect to `/laravel-cart/v4/`; old original root anchors explicitly link to the historical site text. The exact4.0.3 archive retains its original API and a visible archival notice. Add compatibility anchors when moving headings; do not replace historical API semantics silently. Cart's detailed route map is `/laravel-cart/url-migration/`; its June 2024 site archive is historical documentation, not an independently verified package 3.x tag.

## CI, hosting and security debt

`.github/workflows/docs.yml` runs frozen install and verification for PRs and pushes to `master`, with read-only permissions and a downloadable static artifact. It does **not** deploy. No remote run is claimed before this branch is pushed.

The GitHub Pages API did not establish deployment ownership. DNS/public content and the old Bitbucket file do not prove which service publishes the domain. `bitbucket-pipelines.yml` is left unchanged pending confirmation of its operational role; its Node 10 configuration is **obsolete and not the intended build procedure**. The verified intended build is the Node 24 GitHub workflow above. Before publication the owner must confirm the active host, build command, root source/base `/`, artifact directory and production 404 handling, then either retire or update the legacy Bitbucket job. No credentials or hosting settings were changed.

The site now uses **VuePress 2.0.0-rc.31 / Vue 3.5.44** with compatible exact theme/bundler/plugin pins. VuePress 2 is explicitly a release candidate, not the npm latest stable release (1.9.10). The migration removes the unsupported Vue 2 runtime while preserving the brand, filters and routes. The audit reports **30 moderate, zero high/critical findings**, propagated from one unpatched sprintf-js advisory. This is not a clean audit claim. See the [migration assessment](vuepress-migration.md) and [actual toolchain findings](cart41-toolchain-findings.md); do not force an unsafe downgrade to hide the advisory.

Publication is a separate owner action after review, CI and the hosting/security decision. No package release must precede publication of these stable guides; development features remain excluded. Promoting a future Cart/Mongo/FIC release requires the evidence/update process above, not removal of an “unreleased” label alone.

## Independent documentation versions

The registry `package-sources.json` drives homepage cards/categories, navigation, pinned source metadata and import adapters. `documentation-versions.json` drives version routes, sidebars, selectors and redirects. Laravel Cart and the added projects use independent compatibility lines:

| Project | Documentation key | Exact source | Policy |
| --- | --- | --- | --- |
| Laravel Cart | `v4` | `4.1.0` | Current stable; since4.1 guarantees explicit |
| SPID Laravel Trentino | `v2` | `v2.3.0` | Latest verified stable release in major 2 |
| Filament SPID | `v1`, `v0.1` | `1.0.0`, `0.1.8` | v1 current; v0.1 frozen reference for existing installs (unsupported, not installable: its fork branch is gone). `trust.releases` overrides facts missing at 0.1.8 |
| Laravel Email Chef | `v2`, `v1` | `2.0.0`, `1.0.5` | v2 current; v1 frozen superseded reference (Illuminate 9 or older) |
| Image Puzzle | `v1` | `1.0.0` | Packagist offers only 1.0.0; GitHub tags 1.0.1/1.0.2 change README/tests only. Repository is `php-image-puzzle` |
| AWS Blockchain Laravel | `v0.0` | `0.0.4` | Legacy: pre-1.0, only the mock driver works; AWS drivers target retired or retiring services |
| Vue 3 Burger Menu | `v1` | `1.1.2` | Source release; npm artifact warning remains |
| pgr_dmmsy | `v0.1` | `v0.1.0` | Pre-1.0 minor compatibility line |
| Braintree Vue 3 | `next` | Immutable commit in manifest | Unreleased; noindex, excluded from sitemap |

No earlier major is invented. The existing Cart4.0.3 tree remains a frozen, visibly archived reference with its own canonical; it is not a second current v4 tree. Other sibling release routes retain their exact-tag scheme. Every tree displays its exact source release/SHA and support status; tag existence does not establish a support policy. A selector lists only that project's actual content, preserves a matching topic and links to the target overview with an explicit `missing-topic` notice when absent.

The compatibility-line projects’ unversioned roots and appropriate former exact-tag routes are **generated static HTML redirects**, including canonical/noindex metadata and fallback links for captured anchors. They require no server rewrite configuration. `compatibility-route-anchors.json` records previous anchors; `.vuepress/dist/redirects.json` is the complete generated route/anchor migration map. Pages self-canonicalize within their version; older sibling current aliases canonicalize only to their identical selected snapshot. No historical API page is canonicalized to unrelated current content.

### Intentional update versus frozen build

Use one public update command after independently checking all GitHub tag/release pages and relevant registry metadata. The command does not discover or promote releases automatically:

```bash
# Review pinned inputs and local candidate tags without changing content.
npm run docs:update -- --package spid-laravel-trentino --reference /path/to/read-only/clone --plan
# Verify tag/SHA, import where configured, generate current snapshots and provenance.
npm run docs:update -- --package spid-laravel-trentino --reference /path/to/read-only/clone --apply
npm run docs:verify
```

`--apply` checks the exact tag's peeled commit, never substitutes HEAD, hashes recorded inputs and saves a deterministic report under `update-provenance/`. Builds and `docs:update --check` use committed snapshots only; they never fetch moving branches, install upstream dependencies or select “latest”. Cart's adapter imports all14 docs/v4 guides and the marked executable example from the published4.1 tag, plus five explicit site recipes; it corrects two verified upstream wording defects. Braintree's adapter imports its complete upstream guides and an export index. Both retain pinned raw inputs for offline drift checks. Site-specific corrections are explicit transforms/integration notes.

For a **minor/patch release**, verify publication, update that project's selected tag/SHA, distribution evidence, verification date, root frontmatter and source-based guidance; then run the command above. It refreshes the same compatibility tree and records previous pins. A same-version tag cannot silently move to another SHA. Existing historical major trees stay frozen.

For a **new major** (or new pre-1.0 minor), perform the same evidence/content update: the derived key creates a new tree and leaves previous ones unchanged. Prereleases are rejected as stable defaults. Use a separately labeled preview instead.

To **promote next**, first establish a real release and registry/source mapping, update the source entry from `development` to `compatibility`, set the verified tag/distribution and stable status, update frontmatter/guidance, then run `docs:update --apply`. The released tree becomes the root redirect target; the old next tree remains a clearly marked noindex source snapshot. Do not relabel an unverified manifest version as a release.

To **add a project**, add its verified source/distribution/status/catalog record, English root guide and optional deterministic importer, then run `docs:update --apply`. A package with no accessible authoritative evidence must remain an unverified status page, outside promoted cards. Record source/license gaps explicitly.

The low-level `docs:version -- --package NAME --refresh` remains available for site-authored corrections and existing exact-tag guides; `node scripts/catalog.mjs` regenerates only homepage cards/categories while preserving other home fields and prose. `docs:check` rejects stale catalog/import/snapshot content. Historical corrections must use their own source version.

## Mixed project types and source references

The catalog includes Laravel packages, Vue libraries, a Next.js application and a PostgreSQL extension. The homepage has exactly two sections: `Current project` and `Legacy`. Braintree remains visibly Next/unreleased within the former; filtering does not relabel it as a published release. Dependency age alone does not classify a project as legacy.

Composer releases use independently checked Packagist source/dist references. ODPS and Burger guides use their GitHub source release: their `package.json` versions differ, and a GitHub release does not establish a usable npm artifact. Braintree has no verified release/tag/npm distribution, so its selector contains only the explicitly labeled next source snapshot. Source checks compare appropriate Composer metadata or immutable npm/C manifest hashes and all recorded source files. Version snapshots preserve that project-specific provenance.

Fixtures for the six added projects live under `maintenance/fixtures/`; the PHP dependency locks are intentionally tracked despite common global ignore rules. PHP, application dependencies, source builds and compiled test output stay outside the documentation dependency tree. Scripts and fixtures never require production credentials, login/payment requests, a running production PostgreSQL database or deployment.

## Homepage filters

Each promoted source's `catalog` record defines `maintenanceStatus` (`maintained`, `legacy`, `next`) and `ecosystem` (`php`, `javascript`, `postgresql`). These are editorial catalog filters: `maintained` groups the current released projects requested for the home; it does not add a publisher support window or override the separately recorded support policy. Unreleased Braintree stays under `next`; the retired API v1 integration stays under `legacy`. Mongo remains in the maintained group. PostgreSQL is a separate technology, not a JavaScript/PHP package.

After editing catalog metadata, run `node scripts/catalog.mjs`; frozen checks reject invalid filter metadata or homepage drift. The home combines a text search with Status and Technology toggle-button groups (`aria-pressed`), hides empty categories, announces the result count and offers reset/empty states. Card release labels derive from the verified `selectedTag` (source references show `Pinned commit`); the optional `catalog.requirements` string is shown beside it. All cards remain in static HTML without JavaScript. `fixtures/browser/home-filters.mjs` verifies the actual UI combinations, keyboard reset, mobile layout and no-JavaScript fallback.

## Cart 4.1 source updates and publication

Current release evidence, runtime matrix and known upstream wording issues are recorded in `evidence/cart41-release.json`, `evidence/cart41-runtime.json` and `cart41-upstream-findings.md`. Root `/laravel-cart/` redirects to canonical `/laravel-cart/v4/`; the 4.0.3 archive and June2024 site archive remain separate. The package owns executable PHP/API guarantees; this repository owns presentation/import adapters, recipes and deployment configuration.

Run `npm run docs:update -- --package laravel-cart --reference /read-only/laravel-cart-clone --plan` then `--apply` after review. The source must contain the exact selected tag. `--apply` verifies it, imports documents/adapters, snapshots the current major, refreshes registry-driven cards, records input/output provenance and updates `content-history.json` only when Markdown hashes change. Builds never update dates. For non-imported site edits such as home copy or URL migration notes, run `node scripts/content-history.mjs --update` after review. Frozen checks reject stale dates/imports.

The production artifact contains `documentation-index.json` (canonical pages, descriptions, package/source metadata), `redirects.json` (route/anchor map), `sitemap.xml` (real content dates) and `robots.txt`. Next remains noindex and is omitted from the canonical index/sitemap; archives self-canonicalize. All files must be published together.

Public HEAD exposes Netlify Edge and Cloudflare; GitHub Pages lookup returns404. Project/account, connected branch and build settings remain unknown. See `evidence/cart41-hosting.json`. The owner must confirm Node24/npm11, `npm ci`, `npm run docs:verify`, source root/base `/`, `.vuepress/dist`, and real404 handling before publication. Do not reactivate Node10. No hosting/account changes or deploy were performed.

Post-publication discovery measurement: `cart-discovery-measurement.md`/JSON retain the user-provided baseline9/20 and7/8 high-fit counts without a probability/improvement claim. Original benchmark prompt identifiers/raw sessions are unavailable; recover them before a comparable rerun, rather than inventing IDs.

## Metadata, project facts and the philosophy page

`scripts/site-metadata.mjs` is the only source of page titles, breadcrumbs, Open Graph/Twitter tags and JSON-LD; `.vuepress/config.mjs` applies it in `extendsPage`, and `.vuepress/client.mjs` reuses the build-time title during SPA navigation. Package overviews render **Project facts** from each source's `trust` record in `package-sources.json`; those facts were read from the repository tree at the pinned commit, and a missing license, policy or CI result stays explicitly missing. Re-verify them when a pin changes. Site-authored pages outside the registry (currently `open-source-philosophy.md`) are listed in `sitePages` in `scripts/content-history.mjs`. `scripts/check-metadata.mjs` (part of `docs:verify`) rejects duplicate titles, wrong `lang`, canonical/`og:url` mismatches, invalid JSON-LD, rating claims, extra H1s and empty headings. The Italian handoff is in `SEO-GEO-AUTHORITY-REPORT.it.md`.
