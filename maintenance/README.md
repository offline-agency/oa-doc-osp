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

`docs:verify` checks frontmatter, the six nonempty catalog cards, release provenance, 13 Node regression tests, production rendering, seven existing landing pages, 232 historical anchor IDs, internal links and assets. PHP fixtures are deliberately outside this JavaScript dependency graph. Each `fixtures/*/README.md` describes its isolated dependencies and limitations; no real provider requests are required.

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
