---
title: Filament SPID — v1 · 1.0.0
description: >-
  Add SPID SAML 2.0 login to Filament panels with italia/spid-laravel, an
  installer, a doctor command and a metadata validator adapter.
gitName: filament-spid
packageVersion: 1.0.0
sourceCommit: 99f80235a6be15b6365840f46f160476e2fdb38e
permalink: /filament-spid/v1/
documentationSnapshot: true
documentationKey: v1
documentationChannel: stable
---

# Filament SPID

Sign citizens in to [Filament](https://filamentphp.com) panels with [SPID](https://www.spid.gov.it), the Italian public digital identity system, over SAML 2.0. The SAML protocol is handled by [italia/spid-laravel](https://github.com/italia/spid-laravel). The plugin puts the SPID button on the panel login page, turns a validated SPID identity into a login on the panel's guard, and adds an installer, a doctor command and an adapter for AgID's metadata checks.

[![Packagist version](https://img.shields.io/packagist/v/offline-agency/filament-spid.svg?style=flat-square)](https://packagist.org/packages/offline-agency/filament-spid)
[![Total downloads](https://img.shields.io/packagist/dt/offline-agency/filament-spid.svg?style=flat-square)](https://packagist.org/packages/offline-agency/filament-spid)
[![Tests](https://img.shields.io/github/actions/workflow/status/offline-agency/filament-spid/run-tests.yml?branch=main&label=tests&style=flat-square)](https://github.com/offline-agency/filament-spid/actions/workflows/run-tests.yml?query=branch%3Amain)
[![SPID lab](https://img.shields.io/github/actions/workflow/status/offline-agency/filament-spid/spid-validation.yml?branch=main&label=spid%20lab&style=flat-square)](https://github.com/offline-agency/filament-spid/actions/workflows/spid-validation.yml?query=branch%3Amain)
[![PHPStan](https://img.shields.io/github/actions/workflow/status/offline-agency/filament-spid/phpstan.yml?branch=main&label=phpstan&style=flat-square)](https://github.com/offline-agency/filament-spid/actions/workflows/phpstan.yml?query=branch%3Amain)
[![License](https://img.shields.io/packagist/l/offline-agency/filament-spid.svg?style=flat-square)](https://github.com/offline-agency/filament-spid/blob/99f80235a6be15b6365840f46f160476e2fdb38e/LICENSE.md)

These badges are live: they show the latest Packagist release and the default branch, not necessarily the release documented here. The results recorded for this release are in [Testing and evidence](#testing-and-evidence).

This is the **v1 compatibility-line guide**, verified against release [1.0.0](https://github.com/offline-agency/filament-spid/releases/tag/1.0.0) on 19 October 2026. [Packagist](https://packagist.org/packages/offline-agency/filament-spid) source and dist references match the source commit above.

It is a community package, not an official Filament plugin and not an AgID product. Installing it does not make a service accredited to SPID: accreditation is AgID's own procedure.

## Versions and compatibility

| Documentation line | Latest stable | Status |
| --- | --- | --- |
| [v1](/filament-spid/v1/) | `1.0.0` | Released; the [security policy](https://github.com/offline-agency/filament-spid/blob/99f80235a6be15b6365840f46f160476e2fdb38e/SECURITY.md) supports the latest 1.x release |
| [v0.1](/filament-spid/v0.1/) | `0.1.8` | Unsupported; archived reference for existing installations, cannot be installed in a new application |

GitHub releases and tags list `0.1.1` to `0.1.8` and `1.0.0`. The security policy marks 0.1.x as unsupported: it receives no fixes, and its releases resolve `italia/spid-laravel` versions that pin `onelogin/php-saml` 4.1.0 ([CVE-2025-66475](https://github.com/advisories/GHSA-5j8p-438x-rgg5)). The [v0.1 reference](/filament-spid/v0.1/) describes 0.1.8 for teams still running it; see [Upgrading from 0.1.x](#upgrading-from-0-1-x).

Two upstream wording issues at the `1.0.0` tag, recorded so they do not mislead readers of the tagged files:

- The tagged README and guides still say that 1.0.0 is "not on Packagist yet". Packagist publishes 1.0.0 with source and dist references equal to the release commit; the wording was corrected on the default branch after the tag.
- The changelog's 1.0.0 entry says the application needs beta stability, while the tagged installation guide (whose quick start runs in CI) gives the fork only a dev constraint and leaves `minimum-stability` unchanged. This guide follows the installation guide.

## Requirements

| | Supported by 1.0.0 |
| --- | --- |
| PHP | 8.3, 8.4, 8.5 |
| Laravel | 12.x, 13.x |
| Filament | 3.x, 4.x, 5.x |
| SPID service provider | Public and private SPs; aggregators and operators are not covered |

The [Composer manifest](https://github.com/offline-agency/filament-spid/blob/99f80235a6be15b6365840f46f160476e2fdb38e/composer.json) requires PHP `^8.3`, `filament/filament ^3.0|^4.0|^5.0`, `illuminate/contracts ^12.0|^13.0`, `italia/spid-laravel ^2.1.0-beta` and `spatie/laravel-package-tools ^1.93`, and declares a conflict with `onelogin/php-saml <4.3.1`. CI on the release commit ran every PHP × Laravel × Filament combination above.

You also need HTTPS, the service provider's real data (the organisation running the service, its IPA code for public administrations or VAT number for private organisations, a contact email) and the SP signing key pair.

## Who does what

| Responsibility | Owner |
| --- | --- |
| SAML: AuthnRequest, Response validation, signatures, metadata, the SPID patch to `onelogin/php-saml`, the IdP list | `italia/spid-laravel` |
| The SPID button on the panel, login on the panel guard, fail-closed errors, optional provisioning, events, the install/doctor/metadata commands | Filament SPID |
| Who may enter (`canAccessPanel()`), the SP identity and key pair, sessions, logout policy, data retention, HTTPS and proxies, AgID acceptance | Your application and organisation |

## Installation

Run these in the application root, in this order:

```bash
# 1. italia/spid-laravel with the SPID patch for php-saml ^4.3.1:
#    until upstream tags a release, the offline-agency fork at a pinned commit.
composer config repositories.spid-laravel vcs https://github.com/offline-agency/spid-laravel
composer config allow-plugins.cweagans/composer-patches true
composer config extra.enable-patching true --json
composer require "italia/spid-laravel:dev-feat/laravel-13#b8dd1a484d8e6551a1a84e90220c2e9dc0d0a0fe as 2.1.0-beta" --no-update

# 2. The plugin.
composer require offline-agency/filament-spid:^1.0
```

| Line | Why | Remove when |
| --- | --- | --- |
| `repositories.spid-laravel` | Every tagged `italia/spid-laravel` (latest `v2.1.0-beta`, 18 December 2025) pins `onelogin/php-saml` 4.1.0. The fix is merged upstream ([italia/spid-laravel#132](https://github.com/italia/spid-laravel/pull/132)) but not tagged. | Upstream tags a release with php-saml ^4.3.1 ([filament-spid#16](https://github.com/offline-agency/filament-spid/issues/16), open on 19 October 2026) |
| `allow-plugins` and `extra.enable-patching` | The library adapts php-saml to the SPID rules with a patch applied by `cweagans/composer-patches`, which applies dependency patches only when the root package opts in. Without it IdPs reject the requests. | Never, while the library ships its SPID patch |
| `dev-feat/laravel-13#b8dd1a48… as 2.1.0-beta` | The fork pinned to commit `b8dd1a484d8e6551a1a84e90220c2e9dc0d0a0fe`, whose patch URL is itself pinned. Only this package gets a dev constraint; `minimum-stability` stays as it is. | With the repository line |

Do not tell Composer to ignore the `onelogin/php-saml` or `robrichards/xmlseclibs` advisories. `php artisan filament-spid:doctor` checks that the patch actually reached php-saml.

## The installer

```bash
cp vendor/offline-agency/filament-spid/examples/setup.public.json setup.json   # or setup.private.json
# edit setup.json: your SP's real data and the paths of its key pair
php artisan filament-spid:install --panel=admin --input=setup.json --dry-run
php artisan filament-spid:install --panel=admin --input=setup.json
php artisan migrate
php artisan filament-spid:doctor
```

| Option | Effect |
| --- | --- |
| `--panel=<id>` | The panel SPID users sign in to; required, never guessed, when several panels exist |
| `--input=<file>` | Answers as JSON (`schema_version` 1); without it the command asks the questions |
| `--dry-run` | Prints the plan and writes nothing |
| `--migrate` | Also runs `php artisan migrate --force`; otherwise migrations are only published |
| `--no-interaction` | Never prompts; requires `--input` |

After validating all input, the installer publishes missing config, migration and asset files without overwriting existing ones; writes `config/spid-auth.php` only while it is the library's untouched copy or the installer's own output; sets `FILAMENT_SPID_PANEL`, `SPID_AUTO_CREATE_USERS`, `FILAMENT_SPID_SP_PROFILE` and `FILAMENT_SPID_DEPLOYMENT` in `.env`; runs `php artisan filament:assets`; registers the plugin after `->login()` when the panel provider can be edited safely; and exempts only the ACS from CSRF. Anything it cannot do safely is printed as a manual step, and the command then exits with 1. A second run with the same input changes nothing.

The input's `sp.profile` is `public` (requires `contact.ipa_code`) or `private` (requires `contact.vat_number`); URLs must be `https://`; `sp.attributes` must include `fiscalNumber`; the key pair is given as file paths, never as key material. The example files hold synthetic values: replace every one.

## Deciding who may enter

SPID proves who the citizen is, not what they may do. Implement `canAccessPanel()` with an explicit rule:

```php
use Filament\Models\Contracts\FilamentUser;
use Filament\Panel;

class User extends Authenticatable implements FilamentUser
{
    protected $fillable = ['name', 'email', 'password', 'fiscal_code', 'spid_data'];

    protected $casts = ['spid_data' => 'array'];

    public function canAccessPanel(Panel $panel): bool
    {
        // Your own rule, e.g. a role column your application manages.
        return $panel->getId() === 'admin' && $this->role === 'administrator';
    }
}
```

Accounts are matched by fiscal code, never by email. No account is created for a citizen unless `auto_create_users` is on, and even then `canAccessPanel()` decides who gets in. To admit existing users, store their fiscal code in `fiscal_code` beforehand.

## Manual installation

```bash
php artisan vendor:publish --tag=filament-spid-config      # filament-spid, spid-auth and spid-idps config
php artisan vendor:publish --tag=filament-spid-migrations  # fiscal_code (unique) and spid_data on users
php artisan migrate
php artisan vendor:publish --tag=spid-assets               # AgID button CSS, JS and IdP logos
php artisan vendor:publish --tag=filament-spid-images      # the SPID logo
php artisan filament:assets                                # button script and jQuery; re-run after upgrades
```

Then fill in `config/spid-auth.php` (entityID, base URL, organisation, contacts, requested attributes, key pair paths, `sp_spid_level` at least SpidL2) without keeping the library's example certificate and key, whose private key is public. Register the plugin **after** `->login()`:

```php
use OfflineAgency\FilamentSpid\SpidPlugin;

return $panel
    ->default()
    ->id('admin')
    ->path('admin')
    ->login()
    ->plugin(SpidPlugin::make());
```

Exempt the ACS, and only the ACS, from CSRF in `bootstrap/app.php`. The IdP posts the Response from another site, so it cannot carry a token; the library accepts only a signed Response correlated with a request it issued.

```php
->withMiddleware(function (Middleware $middleware): void {
    // Laravel 13
    $middleware->preventRequestForgery(except: ['spid/acs']);
    // Laravel 12: $middleware->validateCsrfTokens(except: ['spid/acs']);
})
```

Use the real routes prefix (`auth/spid/acs` for `routes_prefix = 'auth/spid'`) and never exempt `spid/*`. Set `FILAMENT_SPID_PANEL` when the application has more than one panel.

## Configuration reference

The SAML side (entityID, certificates, level, IdPs, routes prefix) lives in `config/spid-auth.php` and `config/spid-idps.php`, owned by `italia/spid-laravel`. The plugin's own settings are in `config/filament-spid.php`:

| Key | Env | Default | Purpose |
| --- | --- | --- | --- |
| `enabled` | `FILAMENT_SPID_ENABLED` | `true` | Replace the panel login page with the SPID one |
| `register_listeners` | `FILAMENT_SPID_REGISTER_LISTENERS` | `true` | Listen to the library's login and logout events |
| `panel` | `FILAMENT_SPID_PANEL` | `null` | Panel SPID users sign in to; an unknown id throws `SpidPanelNotFoundException` |
| `minimum_level` | `FILAMENT_SPID_MINIMUM_LEVEL` | SpidL2 | Lowest `spid-auth.sp_spid_level` the plugin accepts |
| `user_model` | `SPID_USER_MODEL` | `App\Models\User` | Authenticatable Eloquent model |
| `auto_create_users` | `SPID_AUTO_CREATE_USERS` | `false` | Create an account when no `fiscal_code` matches |
| `update_user_data` | `SPID_UPDATE_USER_DATA` | `true` | Refresh mapped columns and `spid_data` on each login |
| `sp_profile` | `FILAMENT_SPID_SP_PROFILE` | `null` | `public` or `private`, used by the metadata validator |
| `deployment` | `FILAMENT_SPID_DEPLOYMENT` | `null` | `local`, `acceptance` or `production`: which test IdPs the doctor expects |
| `validation.spid_sp_test` | `SPID_SP_TEST_BIN` | `spid_sp_test` | Executable used by `filament-spid:metadata:validate` |
| `store_spid_data` | `FILAMENT_SPID_STORE_SPID_DATA` | `true` | Store SPID attributes in `spid_data` |
| `spid_data_attributes` | | `null` (all) | Attributes kept in `spid_data` |
| `field_mapping` | | name, email, fiscal_code, password | Column to SPID attribute, mapper class or callable |
| `create_user_callback` | | `null` | `callable(SpidUserData): Authenticatable` replacing account creation |
| `update_user_callback` | | `null` | `callable(Authenticatable, SpidUserData): void` replacing the update |

Prefer attribute names and invokable classes over closures so `php artisan config:cache` keeps working.

### SPID levels

| Level | URI | Credentials |
| --- | --- | --- |
| SpidL1 | `https://www.spid.gov.it/SpidL1` | Username and password |
| SpidL2 | `https://www.spid.gov.it/SpidL2` | Plus a one-time code |
| SpidL3 | `https://www.spid.gov.it/SpidL3` | Plus a smart card or hardware token |

The library requests `spid-auth.sp_spid_level` and rejects assertions below it. The plugin refuses every login, and warns at boot, while that level is below `filament-spid.minimum_level`. The library's own default is SpidL1, so set `sp_spid_level` to SpidL2 or higher.

### Field mapping and data minimisation

```php
'field_mapping' => [
    'name' => \OfflineAgency\FilamentSpid\Mapping\FullName::class,        // "Name FamilyName"
    'email' => \OfflineAgency\FilamentSpid\Mapping\EmailOrFallback::class, // SPID email or <fiscal code>@spid.invalid
    'fiscal_code' => 'fiscalNumber',                                         // a SPID attribute
    'password' => \OfflineAgency\FilamentSpid\Mapping\RandomPassword::class, // creation only
],
```

An entry is a SPID attribute name, an invokable mapper class, or a closure or static array callable. A plain function name maps to `null`: configuration never runs an arbitrary function. `fiscal_code` is never updated after creation. `RandomPassword` only fills a NOT NULL column; it does not disable password login or reset, so disable those where SPID must be the only way in.

Keep only the attributes the panel needs, for example `'spid_data_attributes' => ['fiscalNumber', 'name', 'familyName', 'email', 'spidCode']`, and request fewer in the first place with `spid-auth.sp_requested_attributes`. These settings support data protection obligations; they do not fulfil them on their own.

### The login page and button

```php
SpidPlugin::make()
    ->spidButtonLabel('Entra con SPID')
    ->spidButtonIcon('heroicon-o-shield-check')
    ->providers(['poste', 'aruba'])          // optional allowlist over config/spid-idps.php keys
    ->loginView('auth.spid-login')
    ->credentialsLoginUrl('/staff/login')
    ->showSpidButton(false);
```

By default the button lists every active real IdP in random order, as the AgID rules require. Its script is a Filament asset with no inline script, so a Content-Security-Policy needs only `script-src 'self'`. Helper routes under the panel path (login redirect, providers endpoint, SP metadata, logout through the IdP) are off until `->registerRoutes(true)`.

## How login works

1. The SPID button posts its form, with a CSRF token, to the library's login route, which redirects to the chosen IdP.
2. The IdP posts the Response to the ACS. `italia/spid-laravel` validates it and fires its login event; an invalid Response stops there.
3. The plugin resolves the panel and guard, checks the SPID level, then provisions in one transaction on the user model's connection: find by `fiscal_code`, create or update as configured, fire `SpidUserProvisioning`, ask `canAccessPanel()`. A refusal rolls back.
4. It logs the citizen in on the panel guard without a remember-me cookie, regenerates the session id and fires `SpidAuthenticationSucceeded`. Once every listener returns, the login has succeeded.

Anything that throws before that point fails closed: the panel guard is logged out, the SPID session keys are cleared so the citizen can retry, the error is logged with the exception class only (never SPID attributes), `SpidAuthenticationFailed` fires after the cleanup, and the citizen returns to the login page with a translated message.

| Event | When |
| --- | --- |
| `SpidUserProvisioning` | Inside the provisioning transaction, before `canAccessPanel()`: assign roles here |
| `SpidUserCreated`, `SpidUserUpdated` | After the transaction really commits: send emails and notifications here |
| `SpidAuthenticationSucceeded` | On the panel guard, before the success boundary; a throwing listener fails the login |
| `SpidAuthenticationFailed` | After a refused login and its cleanup; carries a reason, no personal data |

A rollback undoes database writes on the user model's connection only, not emails, queued jobs, HTTP calls or other databases, so keep side effects out of `SpidUserProvisioning`. Panels that share a guard share its session.

**Logout.** Filament's local logout ends the application session; the citizen stays signed in at the IdP. Single logout through the IdP uses the plugin's `spid.logout` route, available with `registerRoutes(true)`. Which one the service offers is your decision.

## Diagnostics

```bash
php artisan filament-spid:doctor            # readable report
php artisan filament-spid:doctor --json     # JSON only on stdout
php artisan filament-spid:doctor --strict   # warnings fail too
```

The doctor is read-only and makes no network request. It checks dependency versions (`onelogin/php-saml` ≥ 4.3.1, `robrichards/xmlseclibs` ≥ 3.1.5), that the SPID patch changes the metadata php-saml builds, the panel and guard, the user model and schema, entityID and base URL over HTTPS, the requested level, published assets, secure session cookies, the SP key pair (matching, expiry, not the library's example pair) and test IdPs against the declared deployment. `csrf` and `csp` are reported as `skip`, meaning "not observable here", never "passed". Exit codes: `0` no failure, `1` a failure (or a warning with `--strict`), `2` an internal error.

```bash
php artisan filament-spid:metadata:validate --url=https://sp.example.test/spid/metadata --profile=spid-sp-public \
    --report=storage/app/private/spid-validation/metadata.json
```

The metadata command is an adapter over [`spid_sp_test`](https://github.com/italia/spid-sp-test), which it requires at exactly version 1.2.18 together with `xmlsec1`; install the tool apart from the application (`uv tool install spid-sp-test==1.2.18` or `pipx install spid-sp-test==1.2.18`). Missing tools, other versions, crashes or anything that is not metadata are errors, never a pass. The report always records `HOSTED_VALIDATOR_NOT_RUN` and `FORMAL_AGID_ACCEPTANCE_NOT_OBTAINED`: passing it is not AgID acceptance.

## Testing and evidence

Upstream separates three levels of evidence that are not interchangeable: Pest and Node tests in CI (the plugin's behaviour with real Laravel and Filament, SAML simulated); a local SPID lab running pinned `spid_sp_test` against a fresh application installed from the distributable archive; and AgID's hosted Validator, which only your own HTTPS deployment can use.

On the release commit `99f8023`, the [tests workflow](https://github.com/offline-agency/filament-spid/actions/runs/38946163154) (all 18 PHP × Laravel × Filament combinations, three archive install checks, coverage and the button script), PHPStan, code style and the [SPID lab workflow](https://github.com/offline-agency/filament-spid/actions/runs/38946163180) passed (checked 19 October 2026). The upstream [evidence record](https://github.com/offline-agency/filament-spid/blob/99f80235a6be15b6365840f46f160476e2fdb38e/docs/testing/evidence.md) states that the hosted Validator was not run and AgID acceptance was not requested. This site did not run its own PHP fixture for this package.

## Production checklist

The upstream [production checklist](https://github.com/offline-agency/filament-spid/blob/99f80235a6be15b6365840f46f160476e2fdb38e/docs/production-checklist.md) helps prepare a deployment; it does not make a service compliant or accredited. In short:

- `composer audit` is clean and the doctor's `dependencies` and `spid_patch` checks pass.
- `config/spid-auth.php` holds the SP's real identity and contacts, with no example values; a private SP also needs the billing contact, which the installer never invents.
- Your own SP key pair, outside `public/` and Git, readable only by the application user, with a renewal date someone owns. Renewing the certificate changes the metadata registered with AgID.
- SpidL2 or higher, minimal requested and stored attributes, an explicit `canAccessPanel()`, `auto_create_users` off unless every SPID citizen may hold an account, password login and reset disabled where SPID must be the only way in.
- HTTPS everywhere and `SESSION_SECURE_COOKIE=true`. Behind a TLS-terminating proxy, trust the proxy in Laravel and call `\OneLogin\Saml2\Utils::setProxyVars(true)` only when nothing but the proxy can reach the application.
- Only the ACS exempt from CSRF; `php artisan filament-spid:doctor --strict` and `filament-spid:metadata:validate` pass on the deployed metadata.
- For the AgID acceptance test, `FILAMENT_SPID_DEPLOYMENT=acceptance` with only the official Validator as extra IdP; afterwards switch back to `production` with no test IdP.

## Troubleshooting

| Symptom | Fix |
| --- | --- |
| Composer refuses `onelogin/php-saml` 4.1.0 or reports the `<4.3.1` conflict | Add the fork repository and pinned constraint before `composer require`; do not ignore the advisory |
| IdPs reject the AuthnRequest, or metadata shows `AttributeConsumingService index="1"` | Enable `extra.enable-patching` and allow `cweagans/composer-patches`, then `composer reinstall onelogin/php-saml` |
| The panel shows the email/password form | Register the plugin after `->login()` |
| 419 on `POST /spid/acs` | Exempt exactly `<routes_prefix>/acs` from CSRF |
| 500 on the ACS mentioning a non-HTTPS request or `http://` destination | Serve over HTTPS; behind a proxy configure trusted proxies and php-saml's proxy variables |
| "access denied" after a successful SPID login | Write the `canAccessPanel()` rule that admits this user |
| `authentication_failed` / no account | Store the citizen's fiscal code, or enable `auto_create_users` knowingly |
| NOT NULL error on `password` when creating users | Map `password` to `RandomPassword::class` and make it fillable |
| The button does not open | Publish `spid-assets` and run `php artisan filament:assets`; let the CSP allow your own scripts |

## Upgrading from 0.1.x

- PHP 8.3+ and Laravel 12 or 13; follow [Installation](#installation), then `composer require offline-agency/filament-spid:^1.0`.
- `sp_spid_level` must be SpidL2 or higher; `auto_create_users` now defaults to `false` (`SPID_AUTO_CREATE_USERS=true` keeps creating accounts).
- Delete the unused `redirect_after_login`, `spid_level` and `providers` keys (and `SPID_REDIRECT_AFTER_LOGIN`, `SPID_LEVEL`); use `spid-auth.after_login_url`, `spid-auth.sp_spid_level` and `SpidPlugin::providers()`.
- Replace mapping closures with the `Mapping` classes; the fallback email domain is now `@spid.invalid` instead of `@spid.local`.
- An unknown `FILAMENT_SPID_PANEL` throws; `SpidUserCreated`/`SpidUserUpdated` fire after commit, so move role assignment to `SpidUserProvisioning`; a throwing `SpidAuthenticationSucceeded` listener now fails the login.
- Helper routes are opt-in; the "Login with credentials" link uses `credentialsLoginUrl()`; custom views must use the `fi-spid-*` classes.

The full list is in the upstream [upgrade guide](https://github.com/offline-agency/filament-spid/blob/99f80235a6be15b6365840f46f160476e2fdb38e/docs/upgrading.md).

## Source, support and license

Use the [repository](https://github.com/offline-agency/filament-spid) for issues and contributions ([contributing guide](https://github.com/offline-agency/filament-spid/blob/99f80235a6be15b6365840f46f160476e2fdb38e/CONTRIBUTING.md)). Report vulnerabilities by email as described in the [security policy](https://github.com/offline-agency/filament-spid/blob/99f80235a6be15b6365840f46f160476e2fdb38e/SECURITY.md), never in a public issue; it supports the latest 1.x release and routes dependency issues upstream. Release notes are in the [changelog](https://github.com/offline-agency/filament-spid/blob/99f80235a6be15b6365840f46f160476e2fdb38e/CHANGELOG.md). The package is distributed under the [MIT license](https://github.com/offline-agency/filament-spid/blob/99f80235a6be15b6365840f46f160476e2fdb38e/LICENSE.md). An Italian guide is available [upstream](https://github.com/offline-agency/filament-spid/blob/99f80235a6be15b6365840f46f160476e2fdb38e/docs/it/README.md).
