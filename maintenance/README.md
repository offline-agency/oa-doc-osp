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
3. Update the selected manifest entry, page frontmatter and English examples together. These are site-authored guides, not a copy of a moving upstream README. Importing future maintained upstream docs requires an explicit pinned source/transform; never fetch `main` during the production build.
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

Keep existing landing routes and `legacy-anchors.json`. Add compatibility anchors when moving headings; do not replace historical API semantics silently. Cart's detailed route map is `/laravel-cart/url-migration/`; its June 2024 site archive is historical documentation, not an independently verified package 3.x tag.

## CI, hosting and security debt

`.github/workflows/docs.yml` runs frozen install and verification for PRs and pushes to `master`, with read-only permissions and a downloadable static artifact. It does **not** deploy. No remote run is claimed before this branch is pushed.

The GitHub Pages API did not establish deployment ownership. DNS/public content and the old Bitbucket file do not prove which service publishes the domain. `bitbucket-pipelines.yml` is left unchanged pending confirmation of its operational role; its Node 10 configuration is **obsolete and not the intended build procedure**. The verified intended build is the Node 24 GitHub workflow above. Before publication the owner must confirm the active host, build command, root source/base `/`, artifact directory and production 404 handling, then either retire or update the legacy Bitbucket job. No credentials or hosting settings were changed.

VuePress **1.9.10** is the npm `latest` stable release observed on 16 October 2026. VuePress 2 is `2.0.0-rc.31` under `next`, a prerelease. The v1 update preserves the Vue 2 custom theme and fixes the Node 24 build; it does not make Vue 2 maintained. The audit reports **121 dependency findings: 6 low, 73 moderate, 37 high, 5 critical** (including transitive/metavulnerability entries), in the build/development tree. No claim of a clean security audit or production readiness is made. See [the concrete migration proposal](vuepress-migration.md). Do not apply npm's suggested VuePress downgrade blindly.

Publication is a separate owner action after review, CI and the hosting/security decision. No package release must precede publication of these stable guides; development features remain excluded. Promoting a future Cart/Mongo/FIC release requires the evidence/update process above, not removal of an “unreleased” label alone.

## Independent documentation versions

The registry `package-sources.json` drives homepage cards/categories, navigation, pinned source metadata and import adapters. `documentation-versions.json` drives version routes, sidebars, selectors and redirects. The four projects added in this extension use compatibility lines:

| Project | Documentation key | Exact source | Policy |
| --- | --- | --- | --- |
| SPID Laravel Trentino | `v2` | `v2.3.0` | Latest verified stable release in major 2 |
| Vue 3 Burger Menu | `v1` | `1.1.2` | Source release; npm artifact warning remains |
| pgr_dmmsy | `v0.1` | `v0.1.0` | Pre-1.0 minor compatibility line |
| Braintree Vue 3 | `next` | Immutable commit in manifest | Unreleased; noindex, excluded from sitemap |

No earlier major is invented. Existing Cart and sibling release routes retain their exact-tag scheme. Every tree displays its exact source release/SHA and support status; tag existence does not establish a support policy. A selector lists only that project's actual content, preserves a matching topic and links to the target overview with an explicit `missing-topic` notice when absent.

The four unversioned roots and their former exact-tag routes are **generated static HTML redirects**, including canonical/noindex metadata and fallback links for captured anchors. They require no server rewrite configuration. `compatibility-route-anchors.json` records previous anchors; `.vuepress/dist/redirects.json` is the complete generated route/anchor migration map. Pages self-canonicalize within their version; older sibling current aliases canonicalize only to their identical selected snapshot. No historical API page is canonicalized to unrelated current content.

### Intentional update versus frozen build

Use one public update command after independently checking all GitHub tag/release pages and relevant registry metadata. The command does not discover or promote releases automatically:

```bash
# Review pinned inputs and local candidate tags without changing content.
npm run docs:update -- --package spid-laravel-trentino --reference /path/to/read-only/clone --plan
# Verify tag/SHA, import where configured, generate current snapshots and provenance.
npm run docs:update -- --package spid-laravel-trentino --reference /path/to/read-only/clone --apply
npm run docs:verify
```

`--apply` checks the exact tag's peeled commit, never substitutes HEAD, hashes recorded inputs and saves a deterministic report under `update-provenance/`. Builds and `docs:update --check` use committed snapshots only; they never fetch moving branches, install upstream dependencies or select “latest”. Braintree's adapter imports its complete upstream guides and an export index, retaining pinned raw inputs for offline drift checks. Site-specific corrections are explicit transforms/integration notes.

For a **minor/patch release**, verify publication, update that project's selected tag/SHA, distribution evidence, verification date, root frontmatter and source-based guidance; then run the command above. It refreshes the same compatibility tree and records previous pins. A same-version tag cannot silently move to another SHA. Existing historical major trees stay frozen.

For a **new major** (or new pre-1.0 minor), perform the same evidence/content update: the derived key creates a new tree and leaves previous ones unchanged. Prereleases are rejected as stable defaults. Use a separately labeled preview instead.

To **promote next**, first establish a real release and registry/source mapping, update the source entry from `development` to `compatibility`, set the verified tag/distribution and stable status, update frontmatter/guidance, then run `docs:update --apply`. The released tree becomes the root redirect target; the old next tree remains a clearly marked noindex source snapshot. Do not relabel an unverified manifest version as a release.

To **add a project**, add its verified source/distribution/status/catalog record, English root guide and optional deterministic importer, then run `docs:update --apply`. A package with no accessible authoritative evidence must remain an unverified status page, outside promoted cards. Record source/license gaps explicitly.

The low-level `docs:version -- --package NAME --refresh` remains available for site-authored corrections and existing exact-tag guides; `node scripts/catalog.mjs` regenerates only homepage cards/categories while preserving other home fields and prose. `docs:check` rejects stale catalog/import/snapshot content. Historical corrections must use their own source version.

## Mixed project types and source references

The catalog now includes Laravel packages, Vue libraries, a Next.js application and a PostgreSQL extension. `Current projects` identifies released project guides, `Legacy` retains the retired provider integration, and `Source references` identifies Braintree's unreleased pinned source. Dependency age alone does not classify a project as legacy.

Composer releases use independently checked Packagist source/dist references. ODPS and Burger guides use their GitHub source release: their `package.json` versions differ, and a GitHub release does not establish a usable npm artifact. Braintree has no verified release/tag/npm distribution, so its selector contains only the explicitly labeled next source snapshot. Source checks compare appropriate Composer metadata or immutable npm/C manifest hashes and all recorded source files. Version snapshots preserve that project-specific provenance.

Fixtures for the six added projects live under `maintenance/fixtures/`; the PHP dependency locks are intentionally tracked despite common global ignore rules. PHP, application dependencies, source builds and compiled test output stay outside the documentation dependency tree. Scripts and fixtures never require production credentials, login/payment requests, a running production PostgreSQL database or deployment.
