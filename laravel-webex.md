---
title: Laravel Webex
description: Install and use Laravel Webex 2.0 with per-request tokens, typed results and guarded pagination.
packageVersion: '2.0.0'
sourceCommit: c4aec48c1c416676cc411936fe7e905398f66b8c
gitName: laravel-webex
---

# Laravel Webex

A Laravel client for implemented Webex Meetings, Messaging, Admin, Calling and Devices operations. This guide targets **2.0.0**, released on 13 October 2026; GitHub and Packagist were checked on 16 October 2026. The package does not implement the entire Webex API.

[Release](https://github.com/offline-agency/laravel-webex/releases/tag/2.0.0) · [Package](https://packagist.org/packages/offline-agency/laravel-webex) · [Implemented API reference](/laravel-webex/coverage/)

## Requirements

| Dependency | Composer requirement in 2.0.0 |
| --- | --- |
| PHP | `~8.4.0 \|\| ~8.5.0` |
| Laravel framework | `^12.69.2 \|\| ^13.32` |
| JSON extension | `*` |

These are package constraints, not a promise that every newer PHP or Laravel release is supported. See the [released composer.json](https://github.com/offline-agency/laravel-webex/blob/c4aec48c1c416676cc411936fe7e905398f66b8c/composer.json).

## Installation

Run in your Laravel application:

```bash
composer require offline-agency/laravel-webex:^2.0
php artisan vendor:publish --tag=webex-config
```

Laravel auto-discovers the service provider and facade. Publishing creates `config/webex.php`.

```dotenv
WEBEX_BEARER=your-webex-bearer-token
WEBEX_TIMEOUT=30
WEBEX_AUTH_ROUTE_ENABLED=false
```

Supply a Webex token with the scopes and account permissions required by the operation. Keep tokens in your application's secret storage. The default API base URL is `https://webexapis.com/v1/`; the request timeout defaults to 30 seconds.

## Usage

Import the facade with the exact namespace casing:

```php
use Offlineagency\LaravelWebex\LaravelWebexFacade as LaravelWebex;

$client = LaravelWebex::forToken($token);
```

The concrete class is `Offlineagency\LaravelWebex\LaravelWebex`. Its constructor takes no token argument; `forToken(string $token)` returns a cloned client with a bound token. Required arguments are positional; each endpoint's optional `$additional_data` array accepts only the keys allowed by that method. Unknown keys are discarded.

### Tokens and OAuth

Each request resolves its bearer token in this order:

1. The token bound by `forToken($token)`.
2. A class named in `config('webex.token_resolver')`, implementing `Offlineagency\LaravelWebex\Contracts\TokenResolver`.
3. `config('webex.bearer')`.

For an application-managed OAuth integration:

```php
namespace App\Services;

use Offlineagency\LaravelWebex\Contracts\TokenResolver;

final class WebexTokenResolver implements TokenResolver
{
    public function __construct(private WebexTokenStore $tokens) {}

    public function token(): string
    {
        return $this->tokens->validAccessToken();
    }
}
```

`WebexTokenStore` is an application service you implement: persist tokens securely, select the correct account and refresh expired OAuth tokens there. Set `'token_resolver' => App\Services\WebexTokenResolver::class` in `config/webex.php`. The resolver runs before each request, including in long-running workers. Use a bound client per account when that makes account selection explicit.

The configuration includes `WEBEX_CLIENT_ID`, `WEBEX_CLIENT_SECRET`, `WEBEX_CLIENT_CODE` and `WEBEX_REDIRECT_URI`, plus access/refresh-token settings. Those settings do **not** implement an OAuth consent, callback, token exchange or token storage flow. Your application owns that flow.

### Events and the optional auth route

Client construction dispatches `AuthenticationRequested` before building the legacy HTTP builder, then `WebexClientConfigured`, then deprecated `SuccessfulAuthentication`. Their namespace is `Offlineagency\LaravelWebex\Events`. An `AuthenticationRequested` listener can set configuration before client setup. Use the resolver for token refresh before each request; do not refresh tokens in a `SuccessfulAuthentication` listener.

These events describe local client setup. They do not validate a token with Webex; a rejected request returns an `Error`, normally with status 401.

The package's `GET /auth` route is **disabled by default**. Enable it only when needed with `WEBEX_AUTH_ROUTE_ENABLED=true`. `webex.auth_route` controls its `enabled`, `path` and `name` values (default path `/auth`, name `auth`). `webex.auth_route_middleware` defaults to `['throttle:60,1']`. The route returns `OK` and dispatches `WebexClientConfigured` and deprecated `SuccessfulAuthentication`; it is not an OAuth callback or login endpoint.

## Examples

These synthetic examples run inside a bootstrapped Laravel application. Replace IDs and credentials with your own values. The local documentation fixture (`maintenance/fixtures/webex`) executes the Meetings and Messaging calls against mocked HTTP responses; it does not contact Webex.

### Meetings

```php
use Offlineagency\LaravelWebex\Entities\Error;
use Offlineagency\LaravelWebex\LaravelWebexFacade as LaravelWebex;

$client = LaravelWebex::forToken('synthetic-token');
$meetings = $client->meeting()->list(['state' => 'inProgress', 'max' => 10]);
if ($meetings instanceof Error) {
    throw new RuntimeException($meetings->message ?? 'Unable to list meetings');
}

$meeting = $client->meeting()->create(
    'Project review',
    '2026-11-15T10:00:00Z',
    '2026-11-15T11:00:00Z',
    ['agenda' => 'Review the next milestone']
);
if ($meeting instanceof Error) {
    throw new RuntimeException($meeting->message ?? 'Unable to create meeting');
}
$meetingId = $meeting->id;
```

### Meetings participants

```php
use Offlineagency\LaravelWebex\Entities\Error;
use Offlineagency\LaravelWebex\LaravelWebexFacade as LaravelWebex;

$participants = LaravelWebex::meeting_participants()->list('synthetic-meeting-id', ['max' => 20]);
if ($participants instanceof Error) {
    throw new RuntimeException($participants->message ?? 'Unable to list participants');
}
```

### Messaging

```php
use Offlineagency\LaravelWebex\Entities\Error;
use Offlineagency\LaravelWebex\LaravelWebexFacade as LaravelWebex;

$message = LaravelWebex::forToken('synthetic-token')->messages()->create(
    'synthetic-room-id',
    'Hello from the application',
    ['markdown' => '**Hello** from the application']
);
if ($message instanceof Error) {
    throw new RuntimeException($message->message ?? 'Unable to create message');
}
$messageId = $message->id;
```

Use `messages()->edit($messageId, 'Updated text')` to update a message and `messages()->destroy($messageId)` to delete it. A deletion returns `true` or `Error`.

## Results and errors

| Response | Package result |
| --- | --- |
| Valid 2xx JSON document | Endpoint entity, entity array or documented raw result |
| Successful deletion, including empty 204 | `true` |
| Entity endpoint with an empty 2xx body / JSON null | `Error` describing the missing document |
| Malformed JSON or a JSON scalar on 2xx | `Error` |
| Non-2xx Webex error document | `Error` retaining Webex details |
| Other non-2xx body | `Error` with `Webex request failed (HTTP n).`; body is not echoed |
| Network failure after allowed attempts | `Error` with `Connection to Webex failed: ...` |
| Programming/configuration errors, such as `TypeError` or invalid resolver class | Exception propagates |

An `Error` exposes `message`, `errors`, `trackingId`, `status` and `retryAfter`. For HTTP failures, `status` is the response status and `retryAfter` is the parsed `Retry-After` delay in seconds, if supplied. Network failures and locally detected invalid successful responses have `status === null` in this release.

```php
use Offlineagency\LaravelWebex\Entities\Error;
use Offlineagency\LaravelWebex\LaravelWebexFacade as LaravelWebex;

$result = LaravelWebex::messages()->detail('synthetic-message-id');
if ($result instanceof Error) {
    logger()->warning('Webex request failed', [
        'message' => $result->message,
        'status' => $result->status,
        'trackingId' => $result->trackingId,
        'retryAfter' => $result->retryAfter,
    ]);
}
```

Entities expose declared properties. Where the Webex schema consistently defines a primitive type, properties use nullable PHP types such as `?string`, `?int`, `?bool`, `?array` or `int|float|null`; ambiguous properties are `mixed`. Unknown properties and values incompatible with a declared type are ignored. A rejected value leaves the property's default, usually `null`.

### Retries

`GET`, `PUT` and `DELETE` retry network failures and HTTP 429/503. `webex.retry.times` counts **all attempts**, including the first (default 3; set 1 to disable retries). Delay uses `Retry-After` as seconds or an HTTP date, otherwise exponential backoff. `webex.retry.max_delay_seconds` caps the wait (default 30). The returned error's `retryAfter` retains the server's announced delay; it is not the capped sleep duration. `POST` and `PATCH` are never retried automatically.

### Pagination

`messages()->list()` and `rooms()->list()` fetch one page. `listWithPagination()` returns `['items' => [...], 'nextLink' => ?string]` or an `Error`; it does not traverse subsequent pages.

```php
use Offlineagency\LaravelWebex\Entities\Error;
use Offlineagency\LaravelWebex\LaravelWebexFacade as LaravelWebex;

$page = LaravelWebex::messages()->listWithPagination('synthetic-room-id', ['max' => 100]);
if ($page instanceof Error) {
    throw new RuntimeException($page->message ?? 'Unable to fetch page');
}
$messages = $page['items'];
$nextLink = $page['nextLink'];
```

For traversal, use `cursor()` on Messages or Rooms. It returns a lazy collection and follows the `Link` header's `rel="next"` URL as the collection is consumed.

```php
use Offlineagency\LaravelWebex\Exceptions\WebexPaginationException;
use Offlineagency\LaravelWebex\Exceptions\WebexRequestException;
use Offlineagency\LaravelWebex\LaravelWebexFacade as LaravelWebex;

try {
    $messages = LaravelWebex::messages()
        ->cursor('synthetic-room-id', ['max' => 100], maxPages: 10)
        ->take(50)
        ->all();
} catch (WebexRequestException $exception) {
    $error = $exception->error;
    // Handle the failed page; earlier items may already have been consumed.
} catch (WebexPaginationException $exception) {
    // Repeated link, page limit or a next link outside the permitted origin.
}
```

`rooms()->cursor(['max' => 100], maxPages: 10)` works similarly. The default limit is 100 pages. Next links must be absolute HTTPS URLs with the same scheme, host and explicit port representation as `webex.base_url`. Repeated links, an external origin and an exhausted page limit throw `WebexPaginationException`; a failed page throws `WebexRequestException` containing its `Error`. Prefer `cursor()` over manually requesting an unvalidated `nextLink`.

## Api coverage

[Browse the implemented facade accessors and operations](/laravel-webex/coverage/). This replaces the old external API checklist with the capabilities present in 2.0.0. A Webex endpoint appearing in Webex's documentation does not imply this package implements it.

<span id="admin"></span>
<span id="admin-audit-events"></span>
<span id="events"></span>
<span id="historical-analytics"></span>
<span id="hybrid-clusters"></span>
<span id="hybrid-connectors"></span>
<span id="licenses"></span>
<span id="locations"></span>
<span id="meeting-qualities"></span>
<span id="memberships"></span>
<span id="organizations"></span>
<span id="people"></span>
<span id="recording-report"></span>
<span id="recordings"></span>
<span id="report-templates"></span>
<span id="reports"></span>
<span id="resource-group-memberships"></span>
<span id="resource-group"></span>
<span id="roles"></span>
<span id="space-classifications"></span>
<span id="webex-calling-organization-settings"></span>
<span id="webex-calling-person-settings"></span>
<span id="workspace-locations"></span>
<span id="workspace-metrics"></span>
<span id="workspaces"></span>

**[Admin operations](/laravel-webex/coverage/#admin)** — Audit events, hybrid clusters/connectors, licenses, locations, organizations, reports/templates, resource groups/memberships, roles, classifications and workspaces are registered. Historical Analytics and the old checklist entries for Calling Organization/Person Settings are not implemented accessors in this release.

<span id="calling"></span>
<span id="broadworks-enterprises"></span>
<span id="broadworks-subscribers"></span>
<span id="call-controls"></span>
<span id="locations-2"></span>
<span id="people-2"></span>
<span id="recording-report-2"></span>
<span id="webex-calling-organization-settings-2"></span>
<span id="webex-calling-person-settings-2"></span>
<span id="webex-calling-voice-messaging"></span>

**[Calling operations](/laravel-webex/coverage/#calling)** — Use `broadworks_enterprises()`, `broadworks_subscribers()`, `call_controls()` and `voice_messaging()`. Legacy checklist entries such as Calling Person/Organization Settings have no matching accessor in this release.

<span id="devices"></span>
<span id="device-configurations"></span>
<span id="devices-2"></span>
<span id="places"></span>
<span id="workspace-locations-2"></span>
<span id="workspace-metrics-2"></span>
<span id="workspace-personalization"></span>
<span id="workspaces-2"></span>
<span id="xapi"></span>

**[Devices operations](/laravel-webex/coverage/#devices)** — Use `devices()`, `device_configurations()`, `device_workspaces()`, `device_workspace_locations()`, `device_workspace_metrics()` and `xapi()`. The legacy Places and Workspace Personalization checklist entries do not identify registered APIs.

<span id="meetings-2"></span>
<span id="meeting-invitees"></span>
<span id="meeting-participants"></span>
<span id="meeting-preferences"></span>
<span id="meeting-qualities-2"></span>
<span id="meeting-transcripts"></span>
<span id="meetings-3"></span>
<span id="people-3"></span>
<span id="recording-report-3"></span>
<span id="recordings-2"></span>
<span id="webhooks"></span>

**[Meetings operations](/laravel-webex/coverage/#meetings)** — Meeting, invitee, participant, preference, quality, transcript, recording, people, report and webhook operations are registered. Meeting Messages exposes deletion only; use the documented Events resource for meeting-message events.

<span id="attachment-actions"></span>
<span id="events-2"></span>
<span id="memberships-2"></span>
<span id="messages"></span>
<span id="messages-with-edit"></span>
<span id="people-4"></span>
<span id="room-tabs"></span>
<span id="rooms"></span>
<span id="team-memberships"></span>
<span id="teams"></span>
<span id="webhooks-2"></span>

**[Messaging operations](/laravel-webex/coverage/#messaging)** — Messages (including edit), rooms, teams, memberships, team memberships, room tabs, attachment actions and Events are registered. People and webhooks use the shared `people()` and `webhooks()` accessors.

## Upgrading from 1.x

Upgrade the application platform first. Replace `Messages::delete()` with `destroy()`, pass resource/event strings to `createWebhook()`, and replace token constructor arguments with `forToken()`. Review listeners and opt in explicitly if you need `/auth`. Check code relying on returned errors, typed entities or removed endpoints against the [released upgrade guide](https://github.com/offline-agency/laravel-webex/blob/c4aec48c1c416676cc411936fe7e905398f66b8c/UPGRADE.md).

## Testing

The documentation fixture checks released source with mocked HTTP, including success, HTTP error, pagination and retry behavior. It does not establish live Webex permissions or remote CI status. Package test definitions are in the [released tests directory](https://github.com/offline-agency/laravel-webex/tree/c4aec48c1c416676cc411936fe7e905398f66b8c/tests).

## Contributing

See the [released contribution guide](https://github.com/offline-agency/laravel-webex/blob/c4aec48c1c416676cc411936fe7e905398f66b8c/CONTRIBUTING.md).

## Security

Report vulnerabilities privately to `info@offlineagency.it`, as described in the [security policy](https://github.com/offline-agency/laravel-webex/blob/c4aec48c1c416676cc411936fe7e905398f66b8c/SECURITY.md).

## Credits

Created by [Offline Agency](https://github.com/offline-agency) and [contributors](https://github.com/offline-agency/laravel-webex/graphs/contributors).

## About us

[Offline Agency](https://offlineagency.it) builds web applications and open-source Laravel packages.

## License

[MIT](https://github.com/offline-agency/laravel-webex/blob/c4aec48c1c416676cc411936fe7e905398f66b8c/LICENSE.md).
