# Site maintenance

The public source is the repository root, not `docs/`. This directory is excluded from VuePress pages. English guides describe released code; evidence and handoff notes are kept here. The default branch is `master`.

## Build and preview

Use Node **24.13.0** (Node 24 LTS) and npm **11.6.2** as pinned in `.nvmrc`/`package.json`:

```bash
nvm use
npm ci
npm run docs:verify
npm run docs:preview
```

The output is `.vuepress/dist/`; preview is http://127.0.0.1:4175. The preview serves real files and returns HTTP 404 for missing paths. `docs:dev` also uses the root. Do not run `npm install --force`, `--legacy-peer-deps` or a permanent OpenSSL legacy-provider workaround.

`docs:verify` checks frontmatter, the six nonempty catalog cards, release provenance, 23 Node regression tests, production rendering, seven existing landing pages, 232 historical anchor IDs, internal links and assets. PHP fixtures are deliberately outside this JavaScript dependency graph. Each `fixtures/*/README.md` describes its isolated dependencies and limitations; no real provider requests are required.

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

Reference clones use the package repository basename under `--references`; Cart may be elsewhere. This command verifies all six tags/Composer manifests and immutable GitHub file links with Git, then optionally checks public links with read-only HTTP HEAD requests. HTTP 401/403/429/network failures are unavailable checks; actual 404s fail. It never contacts authenticated service endpoints or mutates external resources. Fresh release/Packagist discovery remains a deliberate maintainer step.

Keep existing landing routes and `legacy-anchors.json`. Add compatibility anchors when moving headings; do not replace historical API semantics silently. Cart's detailed route map is `/laravel-cart/url-migration/`; its June 2024 site archive is historical documentation, not an independently verified package 3.x tag.

## CI, hosting and security debt

`.github/workflows/docs.yml` runs frozen install and verification for PRs and pushes to `master`, with read-only permissions and a downloadable static artifact. It does **not** deploy. No remote run is claimed before this branch is pushed.

The GitHub Pages API did not establish deployment ownership. DNS/public content and the old Bitbucket file do not prove which service publishes the domain. `bitbucket-pipelines.yml` is left unchanged pending confirmation of its operational role; its Node 10 configuration is **obsolete and not the intended build procedure**. The verified intended build is the Node 24 GitHub workflow above. Before publication the owner must confirm the active host, build command, root source/base `/`, artifact directory and production 404 handling, then either retire or update the legacy Bitbucket job. No credentials or hosting settings were changed.

VuePress **1.9.10** is the npm `latest` stable release observed on 16 October 2026. VuePress 2 is `2.0.0-rc.31` under `next`, a prerelease. The v1 update preserves the Vue 2 custom theme and fixes the Node 24 build; it does not make Vue 2 maintained. The audit reports **121 dependency findings: 6 low, 73 moderate, 37 high, 5 critical** (including transitive/metavulnerability entries), in the build/development tree. No claim of a clean security audit or production readiness is made. See [the concrete migration proposal](vuepress-migration.md). Do not apply npm's suggested VuePress downgrade blindly.

Publication is a separate owner action after review, CI and the hosting/security decision. No package release must precede publication of these stable guides; development features remain excluded. Promoting a future Cart/Mongo/FIC release requires the evidence/update process above, not removal of an “unreleased” label alone.

## Documentation versions

Each verified package release has a checked-in snapshot under `versioned/PACKAGE/TAG/` and a public `/PACKAGE/TAG/` route. Current root sources and their old public routes remain the authoring entry point/current aliases. The native version selector preserves the corresponding page, falling back to the selected release landing if a page does not exist there. Static version/current links work without JavaScript. Only six actual releases are currently available; no invented older major or development release is selectable. Mongo remains current; API v1 remains under Legacy. Moneta, the undated Cart archive and the site-specific route map have no package-release selector.

`documentation-versions.json` records the package tag/SHA, verified Composer/distribution metadata and current/snapshot page mapping for each release. `docs:check` verifies provenance and deterministic equality between current authoring files and the selected release's snapshots. Build and CI do not fetch upstream or refresh historical content.

For documentation corrections to an existing current release:

```bash
# Edit current root/package Markdown first.
npm run docs:version -- --package laravel-cart --refresh
npm run docs:verify
```

For a newly verified release, first update `package-sources.json`, all current package frontmatter and English guidance against its actual code/distribution, then:

```bash
npm run docs:version -- --package laravel-cart
npm run docs:verify
```

The command adds the new selected tag and leaves previous snapshots intact. It refuses to overwrite an existing release without `--refresh`, or reassign a release to another package SHA. `--refresh` affects the current selected release only; it never regenerates older versions from newer source. Historical documentation corrections belong to their own versioned files and must still match that release's API/provenance. Internal package links in snapshots are rewritten to versioned routes, retaining fragments; explicit historical and cross-package links remain deliberate references.

Run `npm run docs:version -- --check` to verify snapshots alone. To refresh all currently selected snapshots after a coordinated documentation correction, use `npm run docs:version -- --refresh`. No package installation, network access, new runtime dependency, tag/release or deployment is involved.
