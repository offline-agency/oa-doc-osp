---
title: Laravel Email Chef
description: Call the EmailChef API from Laravel 12 and 13 with typed resource classes for lists, contacts, campaigns, autoresponders, transactional mail and SMS.
gitName: laravel-email-chef
packageVersion: '2.0.0'
sourceCommit: eff422c06f89f61f00eae5293e703e49638285d1
---

# Laravel Email Chef

Call the [EmailChef](https://emailchef.com) API from a Laravel application. The package provides one resource class per EmailChef API group (account, lists, contacts, fields, blockings, import tasks, segments, campaigns, autoresponders, transactional mail and SMS). Each class logs in with your EmailChef credentials and returns typed entity objects.

This is the **v2 compatibility-line guide**, verified against release [2.0.0](https://github.com/offline-agency/laravel-email-chef/releases/tag/2.0.0) on 19 October 2026. [Packagist](https://packagist.org/packages/offline-agency/laravel-email-chef) source and dist references match the source commit above.

## Versions and compatibility

| Documentation line | Latest stable | Status |
| --- | --- | --- |
| [v2](/laravel-email-chef/v2/) | `2.0.0` | Current release; no support window or supported-versions policy is published |
| [v1](/laravel-email-chef/v1/) | `1.0.5` | Superseded; lists and contacts only, Illuminate 9 or older |

GitHub releases and Packagist list `1.0.0` to `1.0.5` and `2.0.0`; no prereleases. 2.0.0 is the default branch's current commit.

## Requirements

The [Composer manifest](https://github.com/offline-agency/laravel-email-chef/blob/eff422c06f89f61f00eae5293e703e49638285d1/composer.json) requires PHP `^8.4` and `illuminate/contracts`, `illuminate/http` and `illuminate/support` `^12.0|^13.0`. CI on the release commit ran PHP 8.4 and 8.5 with Laravel 12 and 13. You need an EmailChef account; the package signs in with its username and password.

## Installation

```bash
composer require offline-agency/laravel-email-chef:^2.0
php artisan vendor:publish --provider="OfflineAgency\LaravelEmailChef\LaravelEmailChefServiceProvider" --tag=config
```

The service provider is auto-discovered and merges the package configuration, so publishing is optional. It publishes `config/email-chef.php` under the tag **`config`**. The README at the tag shows `--tag="laravel-email-chef-config"`, which the provider does not register.

Add the credentials to `.env`:

```dotenv
EMAIL_CHEF_USERNAME=your-account@example.com
EMAIL_CHEF_PASSWORD=your-password
```

## Configuration

`config/email-chef.php` at 2.0.0:

| Key | Default | Purpose |
| --- | --- | --- |
| `baseUrl` | `https://app.emailchef.com/apps/api/v1/` | Base URL of every API call |
| `login_url` | `https://app.emailchef.com/api/` | Login endpoint base; the package posts to `<login_url>login` |
| `username`, `password` | `EMAIL_CHEF_USERNAME`, `EMAIL_CHEF_PASSWORD` | Account credentials |
| `list_id`, `contact_id` | `'97322'`, `'656023'` | Example IDs shipped in the file; nothing in `src/` reads them. Replace or remove them |
| `limits.403`, `limits.429`, `limits.default` | `500_000`, `1_000_000`, `500_000` | Wait in **microseconds** (`usleep`) after a 403 or 429 response |

## How a request works

Every resource class extends `OfflineAgency\LaravelEmailChef\Api\Api`. Its constructor reads the configuration and **logs in immediately** with `POST <login_url>login`, then sends the returned `authkey` header on each call. Each `new SomethingApi()` therefore makes one login request; reuse an instance within a unit of work.

- Missing `username` or `password` throws an `Exception` ("Missing Credentials!") from the constructor.
- A login answered with `error_credential_wrong` throws an `Exception` ("Auth Error! Wrong Credentials."). Other login failures are not checked by 2.0.0.
- API errors are **returned, not thrown**: a non-200 response returns an `OfflineAgency\LaravelEmailChef\Entities\Error` object whose `error` property holds the decoded body.
- Methods that validate input (for example `ListsApi::create()`, `ContactsApi::create()`) return Laravel validation errors (a `MessageBag`) instead of calling the API when validation fails.

Check the type of every result:

```php
use OfflineAgency\LaravelEmailChef\Api\Resources\ListsApi;
use OfflineAgency\LaravelEmailChef\Entities\Error;

$lists = new ListsApi();
$result = $lists->getInstance('12345');

if ($result instanceof Error) {
    report(new RuntimeException('EmailChef error: '.json_encode($result->error)));
}
```

**Rate limits.** On a 403 or 429, `get()`, `put()` and `destroy()` wait for the configured `limits` value and call the endpoint again, but in 2.0.0 the retried result is discarded: the method still returns the first, failed response (as an `Error`). `post()` does not retry. Handle a returned `Error` for 403/429 in your own retry or queue logic.

## Usage

All classes are in `OfflineAgency\LaravelEmailChef\Api\Resources`. IDs are strings unless noted.

| Class | Methods |
| --- | --- |
| `AccountApi` | `getCollection()` |
| `AccountInfosApi` | `getInstance($accountId)`, `update(array $instance_in)` |
| `SubscriptionApi` | `getCollection()` |
| `ListsApi` | `getCollection(?int $limit, ?int $offset, ?string $orderby, ?string $order_type)`, `getInstance($id)`, `getStats($list_id, $start_date, $end_date)`, `create(array)`, `update($list_id, array)`, `delete($list_id)`, `subscribe($list_id, $contact_id)`, `unsubscribe($list_id, $contact_id)` |
| `ContactsApi` | `count($list_id)`, `getCollection($status, $list_id, ?int $limit, ?int $offset, ?string $order_by, ?string $order_type)`, `getInstance($contact_id, $list_id)`, `create(array, $mode = 'ADMIN')`, `update($contact_id, array, $mode = 'ADMIN')`, `delete($list_id, $contact_id)` |
| `PredefinedFieldsApi` | `getCollection()` |
| `CustomFieldsApi` | `getCollection($list_id)`, `getInstance($field_id)`, `count($list_id)`, `create($list_id, array)`, `update($field_id, array)`, `delete($field_id)` |
| `BlockingsApi` | `getCollection($query_string, ?int $limit, ?int $offset)`, `count($query_string)`, `create($email, $type)`, `delete($email)` |
| `ImportTasksApi` | `getCollection()`, `getInstance($task_id)`, `create($list_id, array)` |
| `SegmentsApi` | `getCollection($list_id, ?int $limit, ?int $offset)`, `getInstance($segment_id)`, `getCount($list_id)`, `getContactsCount($segment_id)`, `createInstance(int $list_id, array)`, `updateInstance($list_id, $segment_id, array)`, `deleteInstance($segment_id)` |
| `CampaignsApi` | `getCount()`, `getCollection($status, ?int $limit, ?int $offset, $orderby, $ordertype)`, `getInstance($id)`, `createInstance(array)`, `updateInstance($id, array)`, `deleteInstance($id)`, `sendTestEmail($id, array)`, `sendCampaign($id, array)`, `schedule($id, array)`, `cancelScheduling($id)`, `archive($id)`, `unarchive($campaign_id)`, `cloning(array)`, `getLinkCollection($id)` |
| `AutorespondersApi` | `getCount()`, `getCollection(?int $limit, ?int $offset, $orderby, $ordertype)`, `getInstance($id)`, `createInstance(array)`, `updateInstance($id, array)`, `deleteInstance($id)`, `sendTestEmail($id, array)`, `activate($id, array)`, `deactivate($id, array)`, `cloning(array)`, `getLinksCollection($id)` |
| `SendEmailApi` | `sendMail(array $body)` |
| `SMSApi` | `send(array $body)`, `getBalance()`, `getStatusMessage($messageId)`, `getBulkMessageStatus($bulkId)` |

Lists and contacts:

```php
use OfflineAgency\LaravelEmailChef\Api\Resources\ContactsApi;
use OfflineAgency\LaravelEmailChef\Api\Resources\ListsApi;

$lists = new ListsApi();
$page = $lists->getCollection(limit: 10, offset: 0, orderby: 'name', order_type: 'asc'); // Collection of list entities
$created = $lists->create(['list_name' => 'Newsletter', 'list_description' => 'Main list']);

$contacts = new ContactsApi();
$contact = $contacts->create([
    'list_id' => '12345',
    'email' => 'jane@example.com',
    'firstname' => 'Jane',
]);
$contacts->delete('12345', '67890');
```

`ContactsApi::create()` requires `list_id` and `email`. `ListsApi::create()` requires `list_name`. Request bodies for campaigns, autoresponders, segments, transactional mail and SMS are passed through to EmailChef as given: check the field names against EmailChef's own API documentation.

Known 2.0.0 behaviour:

- `ListsApi::unsubscribe()` builds a malformed query string and, on success, returns the fixed text `Actually Contact #<id> is not in your list` rather than an API result. Verify the outcome with `ContactsApi::getInstance()`.
- `ContactsApi::delete()` returns the text `Contact #<id> deleted from list #<id>` on success.

The facade alias `LaravelEmailChef` resolves the base client (`OfflineAgency\LaravelEmailChef\LaravelEmailChef`), which logs in and exposes the auth key but no EmailChef resource methods; use the resource classes. The upstream throttle tests document the discarded retry result described above.

## Testing

The package's own tests fake HTTP with `Http::fake()` and set credentials in the Orchestra Testbench environment. In your application, fake both the login and the API URLs so no request reaches EmailChef:

```php
use Illuminate\Support\Facades\Http;

Http::fake([
    'app.emailchef.com/api/login' => Http::response(['message' => 'ok', 'authkey' => 'test-key']),
    'app.emailchef.com/apps/api/v1/*' => Http::response([]),
]);
config(['email-chef.username' => 'test', 'email-chef.password' => 'test']);
```

On the release commit, the [run-tests workflow](https://github.com/offline-agency/laravel-email-chef/actions/runs/24078142855) passed for PHP 8.4/8.5 with Laravel 12/13, including Pint, PHPStan and Pest with an 80% coverage gate (checked 19 October 2026). This site sent no request to the EmailChef API.

## Upgrading from 1.x

- **Platform.** 1.x allows PHP 7.4+ with Illuminate 5.8 to 9; 2.0.0 requires PHP 8.4 and Laravel 12 or 13.
- **Coverage.** 1.0.5 has only `ListsApi` and `ContactsApi`; 2.0.0 adds the twelve other resource classes above, plus `ListsApi::subscribe()` and `ContactsApi::delete()`.
- **IDs.** `ContactsApi::count()`, `getCollection()`, `getInstance()`, `update()` and `ListsApi::getInstance()` took `int` IDs in 1.0.5 and take `string` IDs in 2.0.0, under `declare(strict_types=1)`. Pass strings.
- **Configuration.** Add the `limits` keys to a published `config/email-chef.php`: 1.0.5 read them but did not ship them. The publish tag is still `config`.
- **Dependencies.** `guzzlehttp/guzzle` and `illuminate/container` are no longer direct requirements.

The changelog at the tag has no 2.0.0 entry; this list comes from comparing the two tags.

## Source, support and license

Use the [repository](https://github.com/offline-agency/laravel-email-chef) for issues and contributions ([contributing guide](https://github.com/offline-agency/laravel-email-chef/blob/eff422c06f89f61f00eae5293e703e49638285d1/CONTRIBUTING.md)). Report vulnerabilities by email as described in the [security policy](https://github.com/offline-agency/laravel-email-chef/blob/eff422c06f89f61f00eae5293e703e49638285d1/.github/SECURITY.md), not in the issue tracker; it does not state supported versions or response times. The [changelog](https://github.com/offline-agency/laravel-email-chef/blob/eff422c06f89f61f00eae5293e703e49638285d1/CHANGELOG.md) at the tag contains only a placeholder 1.0.0 entry. The package is distributed under the [MIT license](https://github.com/offline-agency/laravel-email-chef/blob/eff422c06f89f61f00eae5293e703e49638285d1/LICENSE.md).
