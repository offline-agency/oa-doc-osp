# Four projects: independent compatibility-line documentation

User brief16/10/2026. Base82a63b0, isolated existing docs/verified-package-guides worktree. Preserve all siblings and Cart, OA theme, VuePress1.9.10/Node24 frozen setup, Mongo current and Legacy naming. No upstream runtime/workflow modification, push/release/deploy.

Architecture: extend existing package-sources/documentation-versions registries, do not create another site. Only SPID, pgr_dmmsy, Burger and Braintree opt into compatibility-line routing. Exact source tags/SHAs remain independent of documentation keys: v2, v0.1, v1, next respectively, subject to refreshed real source evidence. Existing other package version routes remain untouched.

One tree per real stable major (major0 uses minor line); prereleases cannot become stable defaults. Development is explicit next with noindex. Support status defaults to not documented unless actual policy found. Selected full package version visible; minor-specific differences annotated from real tags. Frozen prior major trees retained; a deliberate minor/patch refresh updates its own tree with pin history.

Unversioned routes for these four become actual static redirects to preferred available line, preserving fragments and fallback links without host rewrites. Old exact-tag routes redirect to corresponding line. Versioned canonical URLs self-reference; next noindex/excluded sitemap. Existing sibling current aliases canonicalize to their identical selected version, without changing their content/routes. Historical archives keep their own canonical.

Version selectors scoped per package, numeric SemVer ordering, matching topics where available. Missing topics go to target overview with explicit label and query-driven notice. Search orders current stable before other versions/development and labels exact documented version.

Pinned update workflow validates local source tag/commit integrity, composes deterministic source imports (Braintree guides/API and source-generated references where feasible), writes snapshots/provenance only on explicit update. Frozen check/build never chooses latest or fetches upstream. Archived trees are not overwritten automatically. Imported assets version-namespaced, repository-only links immutable, attribution retained.

Parallel source tasks: SPID/pgr all-tag audit+real SQL fixture; Braintree deterministic existing-guide/API import; Burger distributions/two-real-tag verification. Root owns architecture, tests, shared registry integration, redirects/SEO/search, frozen install/build/browser and Italian handoff.

Validation: SemVer/prerelease/0.minor/unit and synthetic multi-major fixtures; at least two real tags where available; missing-topic/registry-only/source-only cases; import drift; all existing routes/anchors plus migration redirects, no cross-version links, static HTML/canonical/sitemap/noindex; mock auth/payment and disposable SQL; mobile/keyboard/SSR search/version switches. Source gaps isolated with actual unavailable results. Commit locally only after checks/review.
