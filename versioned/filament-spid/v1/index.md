---
title: Filament SPID — v1 · 1.0.0
description: >-
  Integrate SPID SAML authentication in Filament with verified 1.0.0 sources, a
  patched upstream dependency and explicit acceptance limits.
gitName: filament-spid
packageVersion: 1.0.0
sourceCommit: 99f80235a6be15b6365840f46f160476e2fdb38e
permalink: /filament-spid/v1/
documentationSnapshot: true
documentationKey: v1
documentationChannel: stable
---

# Filament SPID

Filament SPID connects a validated SPID identity to a Filament panel's auth guard, using `italia/spid-laravel` for SAML 2.0. Offline Agency maintains this MIT community package. It is not an official Filament or AgID product. It does not implement CIE or SPID OIDC; [SPID Laravel Trentino](/spid-laravel-trentino/) is a separate AAC/OIDC integration.

## Release and distribution

This **v1 compatibility-line guide** is pinned to [stable 1.0.0](https://github.com/offline-agency/filament-spid/releases/tag/1.0.0), published on GitHub on **16 October 2026 at 18:17:21 UTC**, with `prerelease: false`. Separately checked on **18 October 2026**, [Packagist metadata](https://repo.packagist.org/p2/offline-agency/filament-spid.json) lists `1.0.0`; its source and dist references both equal `99f80235a6be15b6365840f46f160476e2fdb38e`, the peeled Git tag commit.

| Documentation line | Verified release | Status |
| --- | --- | --- |
| [v1](/filament-spid/v1/) | `1.0.0` | Stable plugin; patched upstream fork still required |

Registry publication proves availability of the package metadata, not successful dependency resolution in an arbitrary application. The old 0.1.x line is no longer maintained according to [SECURITY.md](https://github.com/offline-agency/filament-spid/blob/99f80235a6be15b6365840f46f160476e2fdb38e/SECURITY.md); this guide does not apply its commands to 0.1.x.

## Compatibility

The [tagged manifest](https://github.com/offline-agency/filament-spid/blob/99f80235a6be15b6365840f46f160476e2fdb38e/composer.json) requires:

| Component | Constraint / documented matrix |
| --- | --- |
| PHP | `^8.3`; release documents PHP 8.3, 8.4 and 8.5 |
| Filament | `^3.0` or `^4.0` or `^5.0` |
| Illuminate contracts | `^12.0` or `^13.0`; Laravel 12 and 13 |
| SAML integration | `italia/spid-laravel ^2.1.0-beta`, with the pinned patched fork below |
| Package tools | `spatie/laravel-package-tools ^1.93` |
| Profiles | Public and private SPs; aggregators and identity providers are outside this guide |

The release describes a CI matrix; this documentation update does not independently certify every run. Laravel 11 and PHP 8.2 are outside this release's support. Stable plugin status does not make its upstream dependency stable.

## Guide

- [Installation and installer](/filament-spid/v1/installation/)
- [Configuration and authorization](/filament-spid/v1/configuration/)
- [Doctor and metadata validation](/filament-spid/v1/diagnostics/)
- [Troubleshooting](/filament-spid/v1/troubleshooting/)
- [Security and acceptance boundaries](/filament-spid/v1/security/)
- [AI agent reference](/filament-spid/v1/agents/)

The installer, doctor and metadata adapter are available from 1.0.0. The plugin handles panel login and optional provisioning; SAML validation remains with the patched upstream stack. Application authorization, infrastructure, retention and formal acceptance remain the deployer's responsibility.
