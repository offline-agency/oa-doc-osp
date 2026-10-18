---
title: Install Filament SPID
description: Install stable Filament SPID 1.0.0 with the pinned corrected SAML fork and run the idempotent installer safely.
gitName: filament-spid
packageVersion: '1.0.0'
sourceCommit: 99f80235a6be15b6365840f46f160476e2fdb38e
---

# Install Filament SPID

## Prerequisites

Start in a Laravel 12 or 13 application with a registered Filament panel, database access and your organisation's SP identity, HTTPS URLs, contacts and signing key pair. Copy [setup.public.json](https://github.com/offline-agency/filament-spid/blob/99f80235a6be15b6365840f46f160476e2fdb38e/examples/setup.public.json) or [setup.private.json](https://github.com/offline-agency/filament-spid/blob/99f80235a6be15b6365840f46f160476e2fdb38e/examples/setup.private.json) from the installed package to `setup.json`; replace all synthetic values and paths. Keys stay outside `public/` and Git: input contains paths, never private key material. Public SPs supply an IPA code; private SPs supply VAT and billing contact details.

## Composer and setup

This quick start reproduces the [release's tested snippet](https://github.com/offline-agency/filament-spid/blob/99f80235a6be15b6365840f46f160476e2fdb38e/docs/snippets/quickstart.sh). Review migrations against your schema and back up your database before the migration step.

```bash
# Run in the root of a Laravel 12 or 13 application with a Filament panel.

# 1. italia/spid-laravel with the SPID patch for php-saml ^4.3.1: until
#    upstream tags a release, the offline-agency fork at a pinned commit.
composer config repositories.spid-laravel vcs https://github.com/offline-agency/spid-laravel
composer config allow-plugins.cweagans/composer-patches true
composer config extra.enable-patching true --json
composer require "italia/spid-laravel:dev-feat/laravel-13#b8dd1a484d8e6551a1a84e90220c2e9dc0d0a0fe as 2.1.0-beta" --no-update

# 2. The plugin.
composer require offline-agency/filament-spid:^1.0

# 3. Install and configure from setup.json (copy examples/setup.public.json or
#    setup.private.json from the package and fill in your SP's real data and
#    key pair paths). --dry-run shows the plan and writes nothing.
php artisan filament-spid:install --panel=admin --input=setup.json --dry-run
php artisan filament-spid:install --panel=admin --input=setup.json

# 4. Check.
php artisan migrate
php artisan filament-spid:doctor
```

Set `COMPOSER_EXIT_ON_PATCH_FAILURE=1` in your shell/CI before dependency installation so patch failures stop the operation. Preserve the resulting `composer.lock`; review the fork commit and patch source before trusting them. Run `composer audit` after installation. Do not disable Composer security blocking, ignore advisories, remove the php-saml conflict, or fall back to 0.1.8 to resolve an install failure. This update checked registry metadata and source; it did not execute a fresh application installation.

## Why the fork remains necessary

The stable plugin is distributed on Packagist. [Issue #16](https://github.com/offline-agency/filament-spid/issues/16), still open on 18 October 2026, separately tracks the corrected upstream release: the latest published `italia/spid-laravel` version, `v2.1.0-beta`, pins `onelogin/php-saml 4.1.0`. The plugin conflicts with versions below 4.3.1. The quick start therefore pins `offline-agency/spid-laravel` at `b8dd1a484d8e6551a1a84e90220c2e9dc0d0a0fe` and aliases only that dependency to `2.1.0-beta`; it does not lower global `minimum-stability`.

Do not remove this workaround merely because an upstream PR is merged. First verify a published tag's constraints, reachable immutable SPID patch URL and actual patch behavior, then re-run fresh Laravel 12/13 installation, `composer audit` and the doctor. A future upstream major may not match the current constraint.

## Installer behavior

`filament-spid:install` accepts `--panel=`, `--input=`, `--dry-run`, `--migrate`; without `--input` it prompts. It validates before writing, shows a plan, publishes missing files without overwriting existing ones, writes supported configuration, sets `FILAMENT_SPID_*` values, registers the plugin after `->login()` in a recognized provider, and exempts only the ACS from CSRF in a recognized bootstrap file. Custom files can require manual changes. Exit 1 means follow-up steps remain, not a complete setup. Re-running with the same input is idempotent. Migrations run only with `--migrate` or a separate explicit `artisan migrate`.

For manual setup, use the [pinned installation reference](https://github.com/offline-agency/filament-spid/blob/99f80235a6be15b6365840f46f160476e2fdb38e/docs/installation.md). Register `->login()->plugin(\OfflineAgency\FilamentSpid\SpidPlugin::make())`. Review the resulting files and [configuration](/filament-spid/configuration/) before allowing login.
