# VuePress engine follow-up

16 October 2026. This change deliberately retains the copied VuePress 1 theme. It updates the latest stable v1 patch and proves Node 24/npm 11 frozen installation and rendering. Vue 2 is EOL and npm audit remains non-clean; the focused update is not a complete security modernization.

## Proposed separate change

1. Recheck official VuePress releases and npm tags. At verification, v2 `2.0.0-rc.31` is a release candidate; adopting it requires an explicit prerelease acceptance or waiting for a stable release. Do not call `next` stable.
2. In an isolated branch, use VuePress with its compatible Vue 3 default-theme/bundler versions pinned together. Keep the existing root Markdown, `/` base and every package landing route. Do not substitute another documentation platform.
3. Port `Home.vue` frontmatter/catalog and Offline Agency logo, typography, colors and background. Review Vue 2-only templates, filters, slot APIs, router hooks and component lifecycle. Preserve keyboard/mobile behavior and text contrast.
4. Replace v1 clean-URL, container, last-updated and search integrations with maintained compatible equivalents. Keep footnotes, tip/warning/danger/right/theorem blocks, static search without hosted credentials and git timestamps. Do not restore Universal Analytics.
5. Run the current catalog, metadata, route/232-anchor, link/asset checks and mocked fixtures. Extend browser checks for desktop/mobile, keyboard menus/search, no-JS content, long code/tables, direct refresh and 404; verify all sibling package routes.
6. Compare production HTML and dependency audit to this baseline. Require reproducible `npm ci`, a reviewed lockfile and no global cryptography workaround. Confirm host artifact/404 behavior separately before any deployment.

Acceptance: recognizable layout and existing URLs survive, rendered documentation is complete, current package semantics remain pinned, dependency/support risks are explicitly assessed, and no hosting change is bundled implicitly.

Primary references: https://v1.vuepress.vuejs.org/ ; https://v2.vuepress.vuejs.org/guide/migration.html ; https://v2.vuejs.org/eol/ ; https://nodejs.org/en/about/previous-releases .
