# Laravel Cart 4.1.0 import findings

The website import uses release tag `4.1.0`, commit
`b89d3219202703203453890e2e46467e79ad415d` from
<https://github.com/offline-agency/laravel-cart>. The manifest is authoritative.
The importer never reads the checkout's HEAD and never modifies the upstream clone.
No package PHP, release, deployment or package installation is performed by this importer.

## Content and provenance

All 14 `docs/v4/*.md` files are retained. `index.md` maps to `laravel-cart.md`;
the other 13 map to `laravel-cart/<topic>.md`. The site versioning command derives
the compatibility route `/laravel-cart/v4/` from these current-source pages.
Every guide receives an English title and description, exact `packageVersion`,
`sourceCommit`, current permalink and immutable source/license attribution.
Original Markdown bodies, tables, code fences and generated example markers remain.
The upstream expanded reference remains a reference, rather than being silently
replaced by a shorter rewrite. The dedicated money/storage/authentication pages
remain authoritative for their more precise guarantees, as upstream itself explains.

The source fixture retains the 14 guides plus the tagged source, tests, examples,
configuration, migrations, Boost resources, documentation script, Composer metadata,
license and referenced project documents. Exact paths and SHA-256 hashes are recorded
in `maintenance/evidence/cart-import.json`. No linked binary or image assets occur
in the selected guide set; no site asset namespace was needed.

Markdown links and fragments resolving to an imported guide map to that guide's
current site route. Relative links to config, code, examples, tests, Boost resources,
UPGRADE, LICENSE and project maintenance files map to immutable commit GitHub blobs.
The version snapshot command subsequently scopes guide links to `/v4/`.
External links and fenced executable examples keep their source values.

The source index says “These sources describe the proposed next v4 release. Public
website deployment is pending.” This wording is stale in a released tag. The importer
replaces precisely that expected sentence with released-version provenance and
separates public website maintenance from the package release. If upstream changes
the correction target, import stops for review. Dated alternatives remain dated;
the import does not imply that those third-party comparisons were rerun.

## Compatibility and limits retained

Each guide prominently labels atomic built-in mutations, coupon-preserving repricing
and opt-in live guest transfer as **since 4.1.0**. These are not backported guarantees
of the site's former 4.0.3 snapshot. The landing links the preserved historical site,
exact 4.0.3 archive and site URL migration map without relabeling them as 4.1.0.

The source guides explicitly distinguish built-in logical mutations from direct
`DatabaseStorage::put()` replacement; database retries and deferred events from
arbitrary external side effects; session blocking from database transaction locks;
live guest transfer from saved snapshots; and custom driver preparation from a
transactional custom backend. Those distinctions are retained verbatim.

Public monetary amounts remain floats. `DECIMAL(12,4)` persistence is not an exact
public money-object API. Row coupons apply once per row; fixed row discounts retain
their historical uncapped behavior. Cart coupons reduce payable total without
allocating VAT by tax rate. `vatBreakdown()` is not a final payable fiscal allocation
when cart coupons are present. The import preserves all of these limitations.

## Site adapters

Reviewed site-specific source lives in `maintenance/cart-adapters/*.md`. It is copied
verbatim to `laravel-cart/<name>.md` with explicit pinned release metadata, and its
hashes are separate evidence inputs. It cannot overwrite an imported guide,
`legacy.md` or `url-migration.md`. Adapter changes need an explicit source refresh
so a check cannot silently bless changed recipes. Upstream code is never changed
to make a site adapter pass.

## Reproduction and checks

```sh
node scripts/import-cart.mjs --reference /read-only/laravel-cart-clone
node scripts/import-cart.mjs --check
node --test scripts/import-cart.test.mjs
```

An explicit refresh verifies that the selected local tag resolves to the manifest
commit and reads only immutable blobs from that commit using Git's batch reader.
An unknown commit or tag/pin disagreement fails. Check mode reads no Git repository,
uses no network, verifies the frozen raw bytes before transformation, and compares
all generated outputs and evidence deterministically. A changed commit or selected
release requires a new explicit reference refresh. Hashes provide reproducibility
and drift detection, not a claim of independent release-signature authentication.

Importer tests exercise no-clone regeneration, raw/source/output/adapter drift,
release metadata drift, unknown pins, tag mismatch, 14-page coverage, English metadata,
immutable source links and release-label corrections. Package runtime verification
and recipe execution are recorded separately by the site audit; importing the tagged
upstream tests is not a claim that all of them were executed by the importer.

## Additional reviewed site transforms

The site landing extracts the `docs:start`/`docs:end` executable quick-start region from the same pinned example, includes its imports and an isolated demo instance, and links all five practical adapters. Page descriptions distinguish platform, VAT, concurrency, authentication and reference topics. The detailed since4.1 release boundary is attached to affected pages rather than repeated on every short guide.

The tagged reference's sync sentence says product IDs alone determine retained rows. This contradicts `src/Cart.php::sync()` and the mutation tests, which derive row IDs from product ID plus options. The import explicitly corrects that sentence, preserves the raw source and links the source/test evidence. Upstream handoff: correct `docs/v4/reference.md`, “Syncing with a list”; remove the stale proposed-release sentence from `docs/v4/index.md`. No PHP change is required. Scalar string IDs already work; no generic string-ID bug is documented.

The site additionally pins all Composer install commands to the documented tag and imports the full released config into the configuration page. The original upstream installation prose remains byte-preserved in raw inputs. Release labels use manifest metadata; since4.1 availability remains explicit. Evidence verification dates come from the maintainer-verified source manifest, not the build clock.
