# Released Laravel Cart 4.1 documentation implementation plan

> Execution follows the explicit user implementation brief without approval checkpoints. Native coordination with independent import/runtime/recipe subtasks; final independent review.

Goal: make published package4.1.0 at b89d3219202703203453890e2e46467e79ad415d the stable v4 documentation using the existing shared registry, preserving siblings, filters and historical API semantics.

Architecture: deterministic docs/v4 import + explicit site adapters; shared docs:update and frozen build; /laravel-cart/v4/ canonical content and static aliases with source-owned executable examples. Keep existing4.0.3 snapshot frozen as a historical archive, not another current major tree. Do not invent v3 documentation without verifying source. Latest package major is independent of VuePress.

Tasks:
- [x] Refresh GitHub/Packagist/tag/PR and official Node/VuePress evidence; reproduce current build; pin release manifest and source paths.
- [x] Import all14 maintained upstream pages/raw inputs, handle relative links, source attribution, stale release labels, API availability and drift tests.
- [x] Inspect/execute released examples and targeted fiscal/storage/guest tests in isolated exported source; record concrete upstream defects and unexecuted runtime/UI boundaries.
- [x] Add consolidated source-verified selection/variants/Livewire/Inertia/API/Redis recipes; explicit server trust and release/tax/string-ID limitations.
- [x] Integrate v4 version tree, frozen4.0.3 archive, selectors, per-topic redirects/legacy anchors, sidebar, canonical/robots, sitemap real lastmod and generated canonical index.
- [x] Update/check CI and hosting handoff without guessing publisher; maintain VuePress1 stable/Node24 build, record EOL/security debt and concrete migration assessment.
- [x] Frozen install/check/test/build, links/sources/HTTP, browser and no-JS crawl including homefilters/siblings, review and Italian report with benchmark measurement contract and PR proposal; local commit only.

Review focus: stable-vs-preview regressions; archived API canonical collapse; broken repository-relative fragments; removed/missing topic fallback; build-time source fetching. Tests must reject drift, moved tags/prerelease defaults and cross-version/source-link leakage; browser must exercise query/SPA hydration and canonical labels.

Completed: source/update/runtime/recipe checks, VuePress2 migration, frozen install,58Node tests, browser/static crawl, sourceHTTP checks and independent review. Homepage/navigation retain only Current project and Legacy per latest steering. Publication remains an owner action; no deploy performed.
