# Cart 4.1 site toolchain findings

Checked on 2026-10-16 against the committed package manifest and lockfile using
Node 24.13.0 and npm 11.6.2. The site engine is now VuePress 2.0.0-rc.31 with Vue
3.5.44. The old unsupported Vue 2 runtime and v1 runtime plugins/theme were removed.
VuePress 2 is a release candidate with possible API changes; this is an explicit
maintained-runtime decision, not a stable-release claim. Exact pins and a frozen
lockfile bound upgrade drift. See [the migration record](vuepress-migration.md).

## Dependency audit

`npm audit --json` completed with a vulnerability exit status and reported:

| Severity | Count |
| --- | ---: |
| Critical | 0 |
| High | 0 |
| Moderate | 30 |
| Low / informational | 0 |

These are 30 affected package nodes propagating **one underlying advisory**:
[sprintf-js unbounded precision denial of service, GHSA-hp3w-g68c-fv3c / CVE-2026-97058](https://github.com/advisories/GHSA-hp3w-g68c-fv3c).
The advisory affects `sprintf-js <=1.1.3` and lists no patched version. The chain
is `gray-matter 4.0.3 -> js-yaml 3.x -> argparse 1.x -> sprintf-js`. Both the shared
site helpers and VuePress frontmatter/helper packages consume gray-matter. The
other 26 affected nodes are propagation through VuePress's package graph, not 26
independent exploit reports.

The reported impact concerns attacker-controlled format strings causing uncaught
RangeError through numeric precision. This site builds trusted repository Markdown
and emits static artifacts; it has no hosted runtime accepting arbitrary YAML or
format strings. That narrows the exposure but does not remove the flagged dependency
or establish that all transitive paths are unexploitable. Retain the finding until
a compatible upstream patch/removal is available and rerun the audit on updates.
No package was patched locally. No forced major downgrade, audit suppression or
incompatible js-yaml override was applied to make the count appear zero.

The npm audit automatic suggestions include downgrading VuePress packages to 1.9.10
and gray-matter to 2.0.1. Those suggestions conflict with the maintained Vue 3
requirement and the current helper contract, so `npm audit fix --force` was not used.

Audit metadata reported 328 resolved package records, including optional/platform
records; frozen npm ci installed 293 packages on this host. The one installation
deprecation warning was `whatwg-encoding@3.1.1` recommending `@exodus/bytes` upstream.
No Vue 2 runtime appears in the lockfile or installed Vue dependency tree.

## Reproducibility

The first sandboxed npm ci failed while resolving registry DNS (ENOTFOUND and npm's
secondary exit-handler error); the same frozen command succeeded with approved
network access. This is a network-environment event, not evidence of a successful
first install. The resulting lockfile was not rewritten by npm ci.

`npm test` passes all 58 tests. `npm run docs:build` passes VuePress SSR and the shared
postbuild publication/legacy checks. An earlier initial build rendered successfully
but its postbuild history check detected a concurrent legacy-page edit; the final
build after the content refresh passed. The complete site/browser audit is a separate
check and should be rerun after any further UI changes.
