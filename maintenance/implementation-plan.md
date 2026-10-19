# Verified package documentation plan — 16 October 2026

User brief: update the six published package guides from released APIs; keep English site and Italian handoff, preserve public URLs/brand, no publishing or package modifications.

Base: current master 6404296f0dd38b1243e15ac1c444a505c2ece667. Separate prior Cart/VuePress2 work remains on docs/laravel-cart-v4 and is not merged here.

Architecture: retain VuePress1 copied theme and root source layout; focused latest stable v1 update on maintained Node24 LTS. Six release-pinned guide landings, optional child references, explicit historical notices and unavailable Moneta page. Small maintenance manifest records immutable source and fresh distribution metadata. External wrappers have isolated PHP fixtures with HTTP fakes; PHP tooling is not installed in the JavaScript project.

- [x] Refresh current releases, Packagist, PR12 and package proposal states; inspect primary provider/support sources.
- [x] Reproduce committed lockfile baseline in separate scratch checkout, then verify focused compatible toolchain.
- [x] Rewrite Webex, FICv2 and Aruba with independent released-source review and success/error fixtures.
- [x] Rewrite Mongo stable, historical APIv1 and Moneta; integrate stable Cart guides without development guarantees.
- [x] Repair catalog, navigation, anchor compatibility, metadata, stale links and tracking; preserve custom theme.
- [x] Add evidence/content/static link checks and read-only GitHub CI; verify frozen install/build/HTTP/browser without saving screenshots.
- [x] Review all changes, record defects/unavailable checks, commit locally and deliver Italian package table and suggested PR text.

Release boundaries and validation results are binding; source README prose alone is not evidence of an API. No new Bank of Italy package or proposed Mongo4 APIs will be promoted.
