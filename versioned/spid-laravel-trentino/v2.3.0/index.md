---
title: SPID Laravel Trentino — v2.3.0
description: >-
  Configure AAC Trentino OpenID Connect login, Laravel user mapping, token
  middleware and transaction logs.
gitName: spid-laravel-trentino
packageVersion: v2.3.0
sourceCommit: 0fdb1e870606e471a39d35c144cde58158e023d6
permalink: /spid-laravel-trentino/v2.3.0/
documentationSnapshot: true
---

# SPID Laravel Trentino

Add SPID login to a Laravel application through AAC Trentino using OpenID Connect authorization code flow with PKCE. The package maps the AAC identity to a local Eloquent user, stores tokens in the Laravel session, and provides token refresh and validation middleware.

This guide covers [v2.3.0](https://github.com/offline-agency/spid-laravel-trentino/releases/tag/v2.3.0), checked on 16 October 2026. [Packagist](https://packagist.org/packages/offline-agency/spid-laravel-trentino) source and dist references match the source commit above.

## Requirements

The [Composer manifest](https://github.com/offline-agency/spid-laravel-trentino/blob/0fdb1e870606e471a39d35c144cde58158e023d6/composer.json) requires PHP `^8.4`, Illuminate components `^12.69|^13.30`, and `jumbojett/openid-connect-php ^1.0.2`. An AAC OIDC client must be registered with your application's exact callback URL and the requested scopes. This guide does not establish the availability of an AAC account or service.

## Installation and setup

```bash
composer require offline-agency/spid-laravel-trentino:^2.3
php artisan vendor:publish --tag=spid-laravel-trentino-config
php artisan vendor:publish --tag=spid-laravel-trentino-migrations
```

Laravel discovers the service provider and facade. Review the published migrations against your user schema before running `php artisan migrate`: the package adds a unique nullable `fiscal_code`, profile columns and `spid_profile`, makes `email` and `password` nullable, and creates the transaction log table. The user migration targets `users`; selecting another auth model does not rename this migration's table.

Configure your application's `.env` with the AAC-issued client credentials:

```dotenv
SPID_TRENTINO_CLIENT_ID=your-client-id
SPID_TRENTINO_CLIENT_SECRET=your-client-secret
SPID_TRENTINO_REDIRECT_URI=https://your-app.test/spid/callback
SPID_TRENTINO_PROVIDER_URL=https://aac-test.cloud-test.tndigit.it
SPID_TRENTINO_SCOPES="openid profile.codicefiscale.me email offline_access"
```

The provider shown is the default AAC test environment. Set the provider appropriate to your registered deployment. The callback URL must match the registration. When `redirect_uri` is unset, the package generates an absolute URL from the callback path.

Prepare the model configured by `auth.providers.users.model`:

```php
protected $fillable = [
    'name', 'email', 'password', 'fiscal_code', 'surname',
    'preferred_username', 'locale', 'zoneinfo',
];

protected function casts(): array
{
    return ['password' => 'hashed', 'spid_profile' => 'array'];
}
```

The model must extend Eloquent `Model` and implement Laravel's `Authenticatable` contract. Users are found or created by the complete AAC fiscal-code claim, including any prefix such as `TINIT-`. The package updates profile fields, sets fiscal code and profile explicitly, and assigns the supplied email only if another local user does not already own it. It does not merge accounts by email. Applications with existing accounts should decide how those accounts acquire fiscal codes before rollout.

## Quick start

The default routes run under `web` middleware:

| Method | Path | Route name |
| --- | --- | --- |
| GET | `/spid/login` | `spid.login` |
| GET | `/spid/callback` | `spid.callback` |
| POST | `/spid/logout` | `spid.logout` |

Add the login button to a Blade view:

```blade
<x-spid-laravel-trentino::login-button />
```

Protect application routes in `routes/web.php`, with refresh before validation:

```php
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'spid.refresh', 'spid.valid'])->group(function () {
    Route::get('/account', fn () => 'Hello, '.auth()->user()->name);
});
```

If SPID is your guest entry point, configure Laravel's guest redirect in the existing `withMiddleware` callback in `bootstrap/app.php`:

```php
$middleware->redirectGuestsTo(fn () => route('spid.login'));
```

After AAC returns to the callback, the controller authenticates the local user and redirects to the intended URL. With no intended URL it uses `redirect_to`; when unset, a user with `hasRole('admin')` goes to `/admin/dashboard`, and others go to `/`. Set `SPID_TRENTINO_REDIRECT_TO=/account` for an explicit fallback.

Logout through a CSRF-protected POST form:

```blade
<form method="POST" action="{{ route('spid.logout') }}">
    @csrf
    <button type="submit">Log out</button>
</form>
```

Logout ends the local Laravel session. The package does not revoke provider tokens. Authentication errors are flashed under `OfflineAgency\SpidLaravelTrentino\SessionKeys::ERROR` and redirect to `error_redirect_to` (default `/`).

## Configuration reference

Keys below are relative to `spid-laravel-trentino` in the published config file.

| Key | Default / behavior |
| --- | --- |
| `client_id`, `client_secret` | Read from the corresponding `SPID_TRENTINO_*` variables |
| `provider_url` | AAC test environment; discovery uses `/.well-known/openid-configuration` |
| `redirect_uri` | Configured callback URL, otherwise generated from `routes.callback` |
| `scopes` | `openid profile.codicefiscale.me email offline_access`; `openid` is always added |
| `cache_ttl` | `3600` seconds for discovery/JWKS caching; `0` disables caching |
| `session_fallback` | `false`; `SPID_TRENTINO_SESSION_FALLBACK` enables one-use cached login recovery bound to IP and user agent |
| `register_routes` | `true`; set false when supplying your own named routes |
| `routes.login`, `routes.callback`, `routes.logout` | Paths in the route table above |
| `auth_controller` | `OfflineAgency\SpidLaravelTrentino\Http\Controllers\SpidAuthController` |
| `redirect_to` | `SPID_TRENTINO_REDIRECT_TO`, otherwise role-based fallback |
| `logout_redirect_to`, `error_redirect_to` | `/` |

Read the pinned [security guide](https://github.com/offline-agency/spid-laravel-trentino/blob/0fdb1e870606e471a39d35c144cde58158e023d6/docs/security.md) before enabling session fallback. Keep session cookies and shared cache correctly configured across your application instances.

## Tokens, identity and events

`spid.refresh` refreshes tokens nearing expiry; `spid.valid` rejects an invalid or expired SPID session. Use them together in the order shown. These middleware complement application authentication and authorization; app permissions still belong to your application.

The `OfflineAgency\SpidLaravelTrentino\SpidTrentino` service exposes `redirectToLogin()`, `handleCallback()`, `refreshAccessToken()`, `logout()` and `getUserInfo()`. `handleCallback()` returns a `SpidTrentinoUser` and dispatches `Events\SpidTrentinoLoggedIn`; the controller subsequently authenticates the local user. Do not assume a logged-in local user inside that event listener. `Events\SpidTrentinoLoggedOut` is dispatched after local logout when an identity was present. These event classes use the package namespace.

For an already obtained AAC userinfo payload, the DTO can be used independently:

```php
use OfflineAgency\SpidLaravelTrentino\SpidTrentinoUser;

$identity = SpidTrentinoUser::fromArray([
    'given_name' => 'Example',
    'family_name' => 'User',
    'enti-codicefiscale' => ['fiscalCode' => 'TINIT-EXAMPLE'],
]);

$name = $identity->getName();
$fiscalCode = $identity->getFiscalNumber();
$profile = $identity->toArray();
```

Hydrating a DTO does not authenticate an identity. The normal callback validates the OIDC response and rejects an empty fiscal code. See the [DTO reference](https://github.com/offline-agency/spid-laravel-trentino/blob/0fdb1e870606e471a39d35c144cde58158e023d6/docs/user-dto.md) for additional claims and JSON methods.

## Transaction logs

Logging is enabled by default. Payloads are encrypted using Laravel's application key and carry an HMAC; searchable metadata, including some identity and request fields, remain in clear database columns. Access and refresh token payload values are hashed. See the [source transaction-log guide](https://github.com/offline-agency/spid-laravel-trentino/blob/0fdb1e870606e471a39d35c144cde58158e023d6/docs/transaction-log.md) for the exact recorded fields.

| Environment variable | Default |
| --- | --- |
| `SPID_TRENTINO_TRANSACTION_LOG_ENABLED` | `true` |
| `SPID_TRENTINO_TRANSACTION_LOG_TABLE` | `spid_transaction_logs` |
| `SPID_TRENTINO_TRANSACTION_LOG_RETENTION_MONTHS` | `24` |
| `SPID_TRENTINO_TRANSACTION_LOG_FAIL_CLOSED` | `false` |

The default logs write failures and continues login. Enabling fail-closed aborts login or refresh when a log write fails; logout remains available. Monitor the log in either configuration:

```bash
php artisan spid:check-logs --max-age=24h --sample=20
php artisan spid:prune-logs --dry-run
```

`spid:check-logs` reports disabled/missing logging, recent write failures without later rows, missing writes after a recent login, and sampled integrity failures. Without recent activity it can warn and still succeed; it does not actively test an AAC login. The pruning command deletes old rows unless `--dry-run` is used and clamps retention to at least 24 months. Schedule maintenance in the host application as appropriate. These are package behaviors, not an assessment of a deployment's legal compliance.

Keep application keys and retained logs together in your recovery plan. In v2.3.0, previous keys may allow decryption after rotation, but HMAC verification uses the current `APP_KEY`, so old rows can fail integrity checks after rotation.

## Testing and troubleshooting

The documentation fixture exercises DTO claims/JSON, keyed log redaction, normalized token responses and session expiry with PHP 8.5.10 and Laravel 13.35.0. It sends no identity, login or other HTTP request and uses no database. The complete package test suite, CI outcomes and live AAC interoperability were not verified here.

Application tests can bind the included `Testing\MockOpenIDConnectClient` to `OpenIdConnect\LaravelOpenIDConnectClient`; it uses fixed tokens and mock claims without HTTP. This tests application behavior, not real token signature validation. See [upstream testing instructions](https://github.com/offline-agency/spid-laravel-trentino/blob/0fdb1e870606e471a39d35c144cde58158e023d6/docs/development.md).

Check callback URL registration and the requested fiscal-code scope for failed callbacks, user schema/fillable/casts for persistence errors, middleware order for expired sessions, and the log table plus `spid:check-logs` for transaction-log failures. See [known issues](https://github.com/offline-agency/spid-laravel-trentino/blob/0fdb1e870606e471a39d35c144cde58158e023d6/docs/known-issues.md) and [troubleshooting](https://github.com/offline-agency/spid-laravel-trentino/blob/0fdb1e870606e471a39d35c144cde58158e023d6/docs/troubleshooting.md).

## Source, support and license

Use the [repository](https://github.com/offline-agency/spid-laravel-trentino) for issues and contributions, and the [security policy](https://github.com/offline-agency/spid-laravel-trentino/blob/0fdb1e870606e471a39d35c144cde58158e023d6/SECURITY.md) for private vulnerability reporting. The package is distributed under the [MIT license](https://github.com/offline-agency/spid-laravel-trentino/blob/0fdb1e870606e471a39d35c144cde58158e023d6/LICENSE.md).
