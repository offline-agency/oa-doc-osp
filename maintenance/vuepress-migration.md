# VuePress 2 migration

The documentation site uses VuePress `2.0.0-rc.31` with Vue `3.5.44`, replacing
VuePress 1 and its unsupported Vue 2 runtime. VuePress 2 is a **release candidate**,
not a claimed stable release. This choice follows the requirement to use a maintained
Vue runtime; the current VuePress 1 stable tag does not satisfy that requirement.
VuePress 2's APIs can still change. Dependencies are exact pins with a committed
lockfile, and upgrades require the complete static/build/browser checks.

Primary references checked on 2026-10-16:

- [VuePress 2 migration guide](https://v2.vuepress.vuejs.org/guide/migration.html):
  Vue 3, ESM configuration and incompatible v1 plugins/themes.
- [VuePress 2 introduction](https://v2.vuepress.vuejs.org/guide/introduction.html):
  the v2 project and release status.
- [Official default theme extension](https://ecosystem.vuejs.press/themes/default/extending.html):
  layout slots and component aliases.
- [Official local search plugin](https://ecosystem.vuejs.press/plugins/search/search.html):
  local index, inclusion policy, extra searchable fields and keyboard shortcuts.

## Exact toolchain

| Package | Pin |
| --- | --- |
| vuepress | 2.0.0-rc.31 |
| @vuepress/bundler-vite | 2.0.0-rc.31 |
| @vuepress/theme-default | 2.0.0-rc.137 |
| @vuepress/plugin-search | 2.0.0-rc.137 |
| @vuepress/plugin-markdown-container | 2.0.0-rc.137 |
| vue | 3.5.44 |
| sass | 1.105.0 |
| markdown-it-footnote | 4.0.0 |
| gray-matter | 4.0.3 |

The differing core/theme release-candidate numbers are the upstream package lines,
not an accidental mixed v1/v2 installation. Node remains `>=24.13.0 <25`, npm
`>=11.6.2 <12`, with `npm@11.6.2` selected. Use `npm ci` for installation.
`gray-matter` remains needed by the shared content and version tools.

## Runtime and publication changes

The old Vue 2 theme components, layouts, plugin entry point and Stylus runtime are
removed. The old theme's small pure JavaScript utility modules and MIT attribution
remain solely for existing navigation/search unit tests; the new runtime does not
load that theme. The new ESM configuration uses the official default VuePress 2
theme, Vite bundler, local search and Markdown containers. The upstream default-theme
dropdown adaptation has its separate retained VuePress Community MIT license.

A Vue 3 home component preserves the English project catalog, category groups,
OA identity, background, keyboard-visible controls and combinable status/technology
filters. The controls use AND filtering, a live result count, empty state and reset;
all projects remain in prerendered HTML for a no-JavaScript request.

A layout wrapper uses the default theme's `page-top` slot for a Vue 3 version
component. The shared `documentation-versions.cjs` helper remains the authority for
version choices, compatibility lines, topic fallback links and archival behavior.
Static select labels, native links and release provenance are server-rendered.
The missing-topic query notice activates after hydration to avoid an SSR mismatch.
Archived page titles receive an explicit archive prefix in generated page data,
without editing frozen Markdown. The preserved Cart 4.0.3 archive has a visible note
that its statements about open PR #50 belong to that historical snapshot.

Current source aliases receive their shared publication redirect policy. SPA
navigation hard-loads the generated redirect document so historical anchors follow
the same redirect map as direct requests. Canonical and robots tags come from
`pagePolicy`, using frontmatter permalinks; postbuild retains the shared sitemap,
robots, static redirects and generated discovery index. Source Markdown is unchanged
by this engine migration. Fenced Vue examples remain text examples.

Sidebars derive from every registered release and remain package/version scoped.
The global navbar derives current categories, legacy packages and source references
from the source registry. No Cart release is hardcoded as current in the engine.
The official local search indexes exact generated titles plus paths, package names,
descriptions, versions and compatibility keys. It excludes aliases, prioritizes the
current release, and retains archival and development results with their labels.
The checked index contains 57 entries; Cart v4 precedes the exact 4.0.3 archive.
Search is local and requires no hosted credentials, analytics or remote search API.

The default theme provides the 404 layout, page metadata/last-updated UI, code
highlighting and hint/warning containers. Custom `right` and `theorem` containers
and footnotes remain enabled. The mobile sidebar toggle exposes expanded state
and Escape-to-close/focus; the copied default navbar dropdown adds expanded state
and Escape-to-close/focus for keyboard navigation. Search receives an explicit
accessible label on mount and after content changes. Browser coverage is recorded
in the broader site audit; these changes do not claim a comprehensive accessibility
certification.

## Verification

On Node 24.13.0 / npm 11.6.2:

```sh
npm ci
npm test
npm run docs:build
npm audit --json
```

The migration verification installed 293 packages with frozen `npm ci`; all 58 Node
tests passed. The production build rendered 98 pages and postbuild verified static
version navigation for 13 releases / 52 versioned pages, generated 38 static
redirects, and preserved 7 legacy landing pages / 232 original anchors. The lockfile
has zero Vue 2 runtime entries. The current audit residual and its limits are
recorded in [the toolchain findings](cart41-toolchain-findings.md).
