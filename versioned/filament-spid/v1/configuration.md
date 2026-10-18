---
title: Configure Filament SPID — v1 · 1.0.0
description: >-
  Configure SP identity, panel guards, minimum SPID level, user authorization
  and data minimization for release 1.0.0.
gitName: filament-spid
packageVersion: 1.0.0
sourceCommit: 99f80235a6be15b6365840f46f160476e2fdb38e
permalink: /filament-spid/v1/configuration/
documentationSnapshot: true
documentationKey: v1
documentationChannel: stable
---

# Configure Filament SPID

## Identity and levels

Keep SP identity, organisation, IPA/VAT contacts, signing certificate paths and HTTPS entity/base URLs in `config/spid-auth.php`. Set `spid-auth.sp_spid_level` to `https://www.spid.gov.it/SpidL2` or higher; the library's SpidL1 default fails the plugin's default minimum. Review [tagged configuration](https://github.com/offline-agency/filament-spid/blob/99f80235a6be15b6365840f46f160476e2fdb38e/docs/configuration.md) and [config/filament-spid.php](https://github.com/offline-agency/filament-spid/blob/99f80235a6be15b6365840f46f160476e2fdb38e/config/filament-spid.php).

```dotenv
FILAMENT_SPID_PANEL=admin
FILAMENT_SPID_MINIMUM_LEVEL=https://www.spid.gov.it/SpidL2
FILAMENT_SPID_SP_PROFILE=public
FILAMENT_SPID_DEPLOYMENT=local
SPID_AUTO_CREATE_USERS=false
SESSION_SECURE_COOKIE=true
```

Use your actual panel ID and SP profile (`public` or `private`). `local` is for development; use `acceptance` only during the Validator window and `production` for deployment. Never mark a production application as local to hide test IdPs.

## Users and authorization

The panel configured by `filament-spid.panel` determines the guard. An unknown explicit ID fails; a null setting falls back to the default panel. Matching uses `fiscal_code`, never email. Prepare the model's table and unique fiscal-code index; map fillable columns and cast `spid_data` to an array. Implement `Filament\Models\Contracts\FilamentUser::canAccessPanel()` with an explicit application role or permission rule. SPID authentication alone grants no panel authorization.

`auto_create_users` defaults to false. Enable it only after defining a provisioning and authorization policy. `update_user_data` defaults to true; review mappings and collisions before upgrading. A missing SPID email maps to a lowercased fiscal-code placeholder at `spid.invalid`, not a deliverable address. Provisioning role assignment belongs in `SpidUserProvisioning` (before the gate, inside the transaction). Post-commit effects belong in `SpidUserCreated`/`SpidUserUpdated`.

## Routes and assets

Register the plugin after `->login()`; a later `->login()` replaces the SPID page. `registerRoutes()` defaults to false: `italia/spid-laravel` owns the ACS (`spid-auth_acs`), and the plugin authenticates through events. Do not create a second ACS. If helper routes are needed, explicitly use `->registerRoutes(true)`. The default ACS path is `spid/acs`; resolve the actual `spid-auth.routes_prefix` and exempt only that path from CSRF, never `spid/*`.

Run `php artisan filament:assets` when deploying/upgrading. Configure trusted proxies and php-saml proxy variables per the [pinned installation guide](https://github.com/offline-agency/filament-spid/blob/99f80235a6be15b6365840f46f160476e2fdb38e/docs/installation.md). Check actual external HTTPS URLs and secure session cookies after proxy termination.

## Data and upgrades

`store_spid_data` defaults to true and `spid_data_attributes=null` keeps all eight supported attributes. Reduce both requested and stored attributes to the service's needs; use `store_spid_data=false` when not needed, and define retention. Default mapping is cacheable; user closures may prevent config caching. Review `php artisan config:cache` in deployment.

From 0.1.x review [upgrading](https://github.com/offline-agency/filament-spid/blob/99f80235a6be15b6365840f46f160476e2fdb38e/docs/upgrading.md): PHP/Laravel support floors, SpidL2 enforcement, opt-in provisioning, removed `redirect_after_login` / `spid_level` / `providers` config keys, helper routes opt-in and removal of the plugin ACS. Use `spid-auth.after_login_url`, `spid-auth.sp_spid_level` and `SpidPlugin::providers()` respectively.
