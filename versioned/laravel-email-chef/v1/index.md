---
title: Laravel Email Chef — v1 · 1.0.5
description: >-
  Reference for Laravel Email Chef 1.0.5, the superseded 1.x client for
  EmailChef lists and contacts on Illuminate 9 or older.
gitName: laravel-email-chef
packageVersion: 1.0.5
sourceCommit: 3c8c81bba981d368e6c484d3cc172068e2fd856c
permalink: /laravel-email-chef/v1/
documentationSnapshot: true
documentationKey: v1
documentationChannel: stable
---

# Laravel Email Chef

::: warning Superseded release
2.0.0 replaces this line. 1.x supports Illuminate 9 at most, and no support policy covers it. For new work and upgrades use the [v2 guide](/laravel-email-chef/v2/) and its [upgrade section](/laravel-email-chef/v2/#upgrading-from-1-x).
:::

This is the **v1 reference**, documenting release [1.0.5](https://github.com/offline-agency/laravel-email-chef/releases/tag/1.0.5) (16 January 2025), the last 1.x release, checked on 19 October 2026. [Packagist](https://packagist.org/packages/offline-agency/laravel-email-chef#1.0.5) source and dist references match the source commit above. It is kept for applications still running 1.x.

## Installation status

The [Composer manifest](https://github.com/offline-agency/laravel-email-chef/blob/3c8c81bba981d368e6c484d3cc172068e2fd856c/composer.json) requires PHP `>=7.4`, `ext-json`, `guzzlehttp/guzzle ^5.8|^6.5|7.0.1|^7.2` and `illuminate/support`, `illuminate/container`, `illuminate/http` `^5.8|^6.0|^7.0|^8.0|^9.0`.

Checked with Composer 2.10.2 on 19 October 2026:

- On its own (platform PHP 8.1 or 8.2), 1.0.5 resolves. An install with platform PHP 8.2 selected Illuminate 9.52.16 and Guzzle 7.16.0, and `composer audit` reported no advisory for those packages.
- Together with `illuminate/support ^10.0` it cannot resolve: 1.x does not support Laravel 10 or later.
- Together with `laravel/framework ^9.0`, Composer refuses to load every Laravel 9 release because of security advisories, so a Laravel 9 application cannot add it with default Composer settings.

In practice 1.0.5 fits only applications already locked to Laravel 9 or older. Laravel's [support policy](https://laravel.com/docs/13.x/releases#support-policy) no longer covers those versions.

## What 1.0.5 provides

Only two EmailChef groups, in `OfflineAgency\LaravelEmailChef\Api\Resources`:

| Class | Methods |
| --- | --- |
| `ListsApi` | `getCollection(?int $limit, ?int $offset, ?string $orderby, ?string $order_type)`, `getInstance(int $id)`, `getStats(string $list_id, string $start_date, string $end_date)`, `create(array)`, `update(string $list_id, array)`, `delete(string $list_id)`, `unsubscribe(string $list_id, string $contact_id)` |
| `ContactsApi` | `count(int $list_id)`, `getCollection(string $status, int $list_id, ?int $limit, ?int $offset, ?string $order_by, ?string $order_type)`, `getInstance(int $contact_id, int $list_id)`, `create(array, string $mode = 'ADMIN')`, `update(int $contact_id, array, string $mode = 'ADMIN')` |

There is no contact deletion and no list subscription method in 1.0.5.

As in 2.0.0, each `new ListsApi()` or `new ContactsApi()` logs in with `EMAIL_CHEF_USERNAME` and `EMAIL_CHEF_PASSWORD`. Missing or wrong credentials throw an `Exception`; API errors are returned as `OfflineAgency\LaravelEmailChef\Entities\Error` objects; `create()` methods return validation errors without calling the API. On a 403 or 429, GET, PUT and DELETE calls wait and call the endpoint again, but return the first response. `ListsApi::unsubscribe()` builds a malformed query string and returns a fixed text.

## Configuration

`config/email-chef.php` at 1.0.5 holds `baseUrl`, `login_url`, `username`, `password` and the example IDs `list_id` and `contact_id`. Publish it with:

```bash
php artisan vendor:publish --provider="OfflineAgency\LaravelEmailChef\LaravelEmailChefServiceProvider" --tag=config
```

The throttle wait reads `email-chef.limits.403`, `.429` and `.default`, which this config file does not contain: the wait then receives `null` and does not pause. Add the `limits` keys from the [2.0.0 configuration](/laravel-email-chef/v2/#configuration) to a published file if you rely on the retry.

## Upstream wording issues at 1.0.5

The tagged README does not match the code in several places:

- It shows `--tag="laravel-email-chef-config"` and a `laravel-email-chef-migrations` tag; the provider registers only `config`, and the package has no migrations.
- Its usage example calls an `echoPhrase()` method that does not exist, with a variable name (`$laravel-email-chef`) that is not valid PHP.
- It passes integer IDs to `ListsApi::unsubscribe()`, which takes strings.

## Upgrading

Move to 2.0.0: it requires PHP 8.4 and Laravel 12 or 13, takes string IDs and covers the full EmailChef API. See [Upgrading from 1.x](/laravel-email-chef/v2/#upgrading-from-1-x).

## Source, support and license

The package is distributed under the [MIT license](https://github.com/offline-agency/laravel-email-chef/blob/3c8c81bba981d368e6c484d3cc172068e2fd856c/LICENSE.md). The [security policy](https://github.com/offline-agency/laravel-email-chef/blob/3c8c81bba981d368e6c484d3cc172068e2fd856c/.github/SECURITY.md) asks for reports by email rather than in the issue tracker and does not state supported versions. Issues and contributions go to the [repository](https://github.com/offline-agency/laravel-email-chef).
