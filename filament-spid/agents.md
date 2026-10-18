---
title: Filament SPID AI agent reference
description: Use release-pinned SPID installation sources and preserve dependency, authorization and formal acceptance boundaries in AI-assisted work.
gitName: filament-spid
packageVersion: '1.0.0'
sourceCommit: 99f80235a6be15b6365840f46f160476e2fdb38e
---

# Filament SPID AI agent reference

## Select the actual version

Run `composer show offline-agency/filament-spid` first. This guide applies to stable `1.0.0` at `99f80235a6be15b6365840f46f160476e2fdb38e` in the v1 documentation line; do not project its commands onto 0.1.x. The plugin is listed on Packagist (checked 18 October 2026), separately from its GitHub release. Registry presence is not a fresh-application install test.

## Sources and constraints

- Follow the complete [installation](/filament-spid/installation/) including the exact fork pin and Composer patch permission. [Issue #16](https://github.com/offline-agency/filament-spid/issues/16) remains open at verification; do not replace the fork with an unverified upstream tag or ignore advisories.
- Read the [tagged Composer manifest](https://github.com/offline-agency/filament-spid/blob/99f80235a6be15b6365840f46f160476e2fdb38e/composer.json), [configuration](https://github.com/offline-agency/filament-spid/blob/99f80235a6be15b6365840f46f160476e2fdb38e/config/filament-spid.php) and command implementations before proposing flags or keys.
- Prefer installer `--dry-run` first, then review its plan/manual steps. Run doctor with `--json --strict`; treat exit 1/2 and skip explicitly. Metadata validation is local evidence, not acceptance.
- Preserve SpidL2 minimum, explicit canAccessPanel checks, fiscal-code identity matching, guarded provisioning, narrow ACS CSRF exception and SAML response/signature validation.
- Do not invent CIE, SPID OIDC, official Filament status, an AgID endorsement, certification or completed accreditation. Do not put keys, identity payloads or production reports into prompts.

## Laravel Boost

The package ships [Boost guidelines](https://github.com/offline-agency/filament-spid/blob/99f80235a6be15b6365840f46f160476e2fdb38e/resources/boost/guidelines/core.blade.php) and its `spid-integration` skill. When it is a direct dependency, `php artisan boost:install` installs these resources; Boost is not required at runtime. The tagged source is immutable, so its obsolete prerelease wording must be interpreted against the independently verified release/distribution facts above. The current main documentation corrects publication status without changing the 1.0.0 artifact.

The site's catalog, canonical metadata, SoftwareSourceCode JSON-LD, sitemap and `llms.txt` use this same release/version registry. Prefer the [versioned overview](/filament-spid/v1/) and its source links rather than assuming the repository default branch equals the installed release.
