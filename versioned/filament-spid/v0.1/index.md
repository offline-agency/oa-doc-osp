---
title: Filament SPID — v0.1 · 0.1.8
description: >-
  Archived reference for Filament SPID 0.1.8, an unsupported pre-1.0 release
  that can no longer be installed in a new application.
gitName: filament-spid
packageVersion: 0.1.8
sourceCommit: c2203534dd8de740c2c6e1421abc0f50e38d6ccd
permalink: /filament-spid/v0.1/
documentationSnapshot: true
documentationKey: v0.1
documentationChannel: stable
---

# Filament SPID

::: danger Unsupported release
0.1.x receives no fixes. The upstream security policy marks it unsupported, and its dependency chain resolves `italia/spid-laravel` releases that pin `onelogin/php-saml` 4.1.0 ([CVE-2025-66475](https://github.com/advisories/GHSA-5j8p-438x-rgg5)). For new work and upgrades use the [v1 guide](/filament-spid/v1/) and its [upgrade section](/filament-spid/v1/#upgrading-from-0-1-x).
:::

This is the **v0.1 reference**, documenting release [0.1.8](https://github.com/offline-agency/filament-spid/releases/tag/0.1.8) (29 October 2025), the last 0.1.x release, checked on 19 October 2026. [Packagist](https://packagist.org/packages/offline-agency/filament-spid#0.1.8) source and dist references match the source commit above. It exists so that teams still running 0.1.x can read what their installation does before upgrading.

## Installation status

0.1.8 cannot be installed in a new application. Its [Composer manifest](https://github.com/offline-agency/filament-spid/blob/c2203534dd8de740c2c6e1421abc0f50e38d6ccd/composer.json) requires `italia/spid-laravel: dev-feat-add-l12`, a branch of the [offline-agency fork](https://github.com/offline-agency/spid-laravel) that no longer exists. A dependency's own `repositories` entry is ignored by Composer, so the README command `composer require offline-agency/filament-spid` does not see the fork either.

On 19 October 2026, a Composer 2.10.2 dry-run resolution of `offline-agency/filament-spid 0.1.8` failed both on Packagist alone and with the fork added as a root VCS repository: neither offers `dev-feat-add-l12`. Existing installations keep working from their `composer.lock` and vendor copy, but cannot be rebuilt from scratch.

Earlier 0.1.x releases are not a way around this: 0.1.3 to 0.1.7 also require fork branches that no longer exist (`dev-fix/optimize-error`, `dev-feat-add-l12`), and 0.1.1 and 0.1.2 require `italia/spid-laravel ^2.0`, whose tagged releases pin the vulnerable php-saml 4.1.0 according to the 1.0 installation guide.

## Requirements declared by 0.1.8

| | Declared constraint |
| --- | --- |
| PHP | `^8.2\|^8.3\|^8.4` |
| Laravel (`illuminate/contracts`) | `^11.0\|^12.0` |
| Filament | `^3.0\|^4.0` |
| `italia/spid-laravel` | `dev-feat-add-l12` (unavailable) |
| `spatie/laravel-package-tools` | `^1.16` |
| Package `minimum-stability` | `dev` |

The tagged README also lists Laravel 10, which the manifest does not allow. CI at the time ran PHP 8.2–8.4 with Laravel 11 and 12; the CI results on this commit were not re-checked for this page.

## What 0.1.8 does

The plugin replaces the Filament login page with a SPID button, and handles the SAML flow through the library. Register it on the panel:

```php
use OfflineAgency\FilamentSpid\SpidPlugin;

public function panel(Panel $panel): Panel
{
    return $panel
        ->default()
        ->id('admin')
        ->path('admin')
        ->plugin(
            SpidPlugin::make()
                ->spidButtonLabel('Entra con SPID')
                ->providers(['posteid', 'arubaid', 'infocertid'])
        );
}
```

Plugin methods in 0.1.8: `loginView()`, `showSpidButton()`, `spidButtonLabel()`, `spidButtonIcon()`, `providers()`, `registerRoutes()`, and route-name setters `loginRoute()`, `logoutRoute()`, `acsRoute()`, `metadataRoute()`, `providersRoute()`.

**Routes are on by default.** Unless `registerRoutes(false)` is called, the plugin registers its own routes under the panel path with the `web` middleware: `GET spid/login`, `GET spid/providers`, `POST spid/logout`, `POST spid/acs` and `GET spid/metadata`. Its `spid/acs` handler reads the SPID user from the library, finds or creates the account, logs it in on the current panel's guard, regenerates the session and redirects to `redirect_after_login`.

**Publish tags.** `filament-spid-config` (the plugin config, plus the library's `spid-auth.php` and `spid-idps.php`), `filament-spid-migrations`, `filament-spid-views` and `filament-spid-images`. On boot the service provider also copies the library's config files into `config/` when they are missing.

The migration adds a unique nullable `fiscal_code` and a JSON `spid_data` column to `users`.

## Configuration

`config/filament-spid.php` in 0.1.8:

| Key | Env | Default | Read by |
| --- | --- | --- | --- |
| `user_model` | `SPID_USER_MODEL` | `App\Models\User` | User service |
| `redirect_after_login` | `SPID_REDIRECT_AFTER_LOGIN` | `/admin` | The plugin's ACS route |
| `spid_level` | `SPID_LEVEL` | SpidL2 URI | The plugin's login route, as the default when the request has no `level` |
| `auto_create_users` | `SPID_AUTO_CREATE_USERS` | **`true`** | User service |
| `update_user_data` | `SPID_UPDATE_USER_DATA` | `true` | User service |
| `providers` | | `[]` | Providers route and plugin |
| `cache.providers_ttl` | `FILAMENT_SPID_PROVIDERS_TTL` | `3600` | Providers route |
| `field_mapping` | | Closures for name, email, fiscal code | User service |
| `create_user_callback`, `update_user_callback` | | `null` | User service |

Points that differ from 1.x and matter for a running 0.1.8 installation:

- **Accounts are created by default.** With `auto_create_users` true, any SPID citizen without a matching `fiscal_code` gets an account. Whether they reach the panel then depends only on your `canAccessPanel()`.
- **No plugin-side minimum SPID level.** 0.1.8 has no `minimum_level`; set the library's `spid-auth.sp_spid_level` deliberately. 1.0 refuses logins below SpidL2 by default.
- **Fallback email** is `<fiscalNumber>@spid.local`; 1.0 uses `@spid.invalid`.
- **Closures in `field_mapping`** prevent `php artisan config:cache`.

The 1.0 upgrade guide describes `redirect_after_login`, `spid_level` and `providers` as never read. In the 0.1.8 source they are read by the plugin's own controller routes listed above, which are registered by default.

## Upgrading

Upgrade to 1.x: it requires PHP 8.3+, Laravel 12 or 13, and the pinned fork setup described in the [v1 installation guide](/filament-spid/v1/#installation). The [v1 upgrade list](/filament-spid/v1/#upgrading-from-0-1-x) covers the changed defaults, removed keys, mappers, events and routes.

## Source, support and license

0.1.8 contains no `CHANGELOG.md` and no `SECURITY.md`, although its README links to both. Release notes for 0.1.8 contain only the [compare link](https://github.com/offline-agency/filament-spid/compare/0.1.7...0.1.8). Report security issues as described in the [current security policy](https://github.com/offline-agency/filament-spid/blob/99f80235a6be15b6365840f46f160476e2fdb38e/SECURITY.md), which also states that 0.1.x is unsupported. The package is distributed under the [MIT license](https://github.com/offline-agency/filament-spid/blob/c2203534dd8de740c2c6e1421abc0f50e38d6ccd/LICENSE.md).
