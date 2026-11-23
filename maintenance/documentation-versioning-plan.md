# Documentation versioning

User request: use versioned documentation. Preserve the root source layout, existing URLs, OA theme and the maintainer's Mongo=current / retired integrations=Legacy classifications. No deployment or package changes.

Design: version by verified package release, independently of VuePress. Existing URLs remain current aliases; explicit release URLs are `/PACKAGE/TAG/` with nested pages under that prefix. Show a native keyboard-accessible version selector and static links on package pages. Only real content versions are selectable; Moneta and the undated Cart archive are not release versions.

Authoring: current Markdown stays in the root/package directories. A deterministic local command snapshots it into `versioned/PACKAGE/TAG/`, rewrites within-package page links and frontmatter permalinks, and records the immutable package SHA and page mapping in `maintenance/documentation-versions.json`. Committed snapshots preserve old content when the current source advances. Builds never fetch upstream or regenerate historical content. Checks reject stale current snapshots and mismatched version provenance. Existing snapshots require explicit refresh for documentation corrections.

Implementation:
1. Add tested snapshot/link/context helpers and a local create/refresh/check command. Test isolation of package versions, old fragments, missing-page fallback, provenance and stale snapshots.
2. Generate snapshots for the six already verified releases; add drift checks to normal validation. Configure version-specific sidebar/navigation without changing old routes.
3. Add theme version selector/static links; preserve no-JS content and keyboard/mobile layout. No extra runtime dependencies.
4. Verify full build, old routes/232 anchors, generated links, snapshots and desktop/mobile selector behavior; update maintenance instructions and Italian report; commit locally without push.

Promotion: verify a new release and its distribution, update current guides/manifest, run the snapshot command. It adds the new version and retains all previous ones; no manual page-by-page version copying.
