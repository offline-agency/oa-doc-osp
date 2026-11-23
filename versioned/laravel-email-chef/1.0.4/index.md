---
title: "Laravel Email Chef — 1.0.4"
description: "Archived Laravel Email Chef 1.0.4 (commit 69bce04, 2023-11-27): requirements, changes since 1.0.3 and the README shipped with the tag."
permalink: /laravel-email-chef/1.0.4/
packageVersion: "1.0.4"
sourceCommit: 69bce04d4299636db5933cf9e4163a8aaccf5731
documentationSnapshot: true
documentationArchive: generated-tag
---
# Laravel Email Chef 1.0.4

This archived page describes tag `1.0.4` of [offline-agency/laravel-email-chef](https://github.com/offline-agency/laravel-email-chef). It is generated from the repository at that tag: the manifest, the history since the previous tag and the README shipped with the release. It is not a reviewed guide; read the [current documentation](/laravel-email-chef/) for the maintained release (2.0.0).

## Release

| Fact | Value |
| --- | --- |
| Tag | [1.0.4](https://github.com/offline-agency/laravel-email-chef/releases/tag/1.0.4) |
| Commit | [`69bce04d4299636db5933cf9e4163a8aaccf5731`](https://github.com/offline-agency/laravel-email-chef/tree/69bce04d4299636db5933cf9e4163a8aaccf5731) |
| Commit date | 2023-11-27 |
| Composer package | `offline-agency/laravel-email-chef` |
| Packagist | Version `1.0.4`, source reference matches this commit (checked 2026-11-23) |
| Declared license | MIT |

## Requirements

Declared in `composer.json` `require`:

- `php`: `>=7.4`
- `ext-json`: `*`
- `illuminate/support`: `^5.8|^6.0|^7.0|^8.0|^9.0`
- `guzzlehttp/guzzle`: `^5.8|^6.5|7.0.1|^7.2`
- `illuminate/container`: `^5.8|^6.0|^7.0|^8.0|^9.0`
- `illuminate/http`: `^5.8|^6.0|^7.0|^8.0|^9.0`

## Changes since 1.0.3

[Compare 1.0.3...1.0.4 on GitHub](https://github.com/offline-agency/laravel-email-chef/compare/1.0.3...1.0.4).

2 non-merge commits and 2 changed files.

Commits:

- `4d0c80f` Apply fixes from StyleCI
- `d81688b` fix: missing unsub params

Changed files:

- modified `src/Api/Resources/ListsApi.php`
- modified `tests/Feature/Resources/ListsTest.php`

## README at 1.0.4

Shipped as [`README.md`](https://github.com/offline-agency/laravel-email-chef/blob/69bce04d4299636db5933cf9e4163a8aaccf5731/README.md). Headings are shifted one level, HTML markup is reduced to text and images, repository links are kept only when their target exists at this tag, and external links verified as unreachable are shown as text.

::: v-pre
### Laravel Email Chef API

[![Latest Stable Version](http://poser.pugx.org/offline-agency/laravel-email-chef/v)](https://packagist.org/packages/offline-agency/laravel-email-chef)
[![License](http://poser.pugx.org/offline-agency/laravel-email-chef/license)](https://packagist.org/packages/offline-agency/laravel-email-chef)
[![run-tests](https://github.com/offline-agency/laravel-email-chef/actions/workflows/main.yml/badge.svg)](https://github.com/offline-agency/laravel-email-chef/actions/workflows/main.yml)

[![Total Downloads](http://poser.pugx.org/offline-agency/laravel-email-chef/downloads)](https://packagist.org/packages/offline-agency/laravel-email-chef)
[![PHP Version Require](http://poser.pugx.org/offline-agency/laravel-email-chef/require/php)](https://packagist.org/packages/offline-agency/laravel-email-chef)
![Laravel Email Chef Integration](https://banners.beyondco.de/Laravel%20Email%20Chef%20API.png?theme=dark&packageManager=composer+require&packageName=offline-agency%2Flaravel-email-chef&pattern=charlieBrown&style=style_2&description=A+simple+Laravel+integration+with+Email+Chef+API&md=1&showWatermark=0&fontSize=100px&images=mail-open)
#### Installation

You can install the package via composer:

```bash
composer require offline-agency/laravel-email-chef
```

You can publish and run the migrations with:

```bash
php artisan vendor:publish --provider="OfflineAgency\LaravelEmailChef\LaravelEmailChefServiceProvider" --tag="laravel-email-chef-migrations"
```

You can publish the config file with:
```bash
php artisan vendor:publish --provider="OfflineAgency\LaravelEmailChef\LaravelEmailChefServiceProvider" --tag="laravel-email-chef-config"
```

This is the contents of the published config file:

```php
return [
    'baseUrl' => 'https://app.emailchef.com/apps/api/v1/',

    'login_url' => 'https://app.emailchef.com/api/',

    'username' =>  env('EMAIL_CHEF_USERNAME'),

    'password' => env('EMAIL_CHEF_PASSWORD'),

    'list_id' => '97322',
    
    'contact_id' => '656023'
];
```

#### Usage

```php
$laravel-email-chef = new OfflineAgency\LaravelEmailChef();
echo $laravel-email-chef->echoPhrase('Hello, OfflineAgency!');

//List create
$list = new ListsApi();
$list->create([
    'list_name' => 'OA list name',
    'list_description' => 'description'
]);

//List unsubscribe
$list = new ListsApi();
$list->unsubscribe(
    97322, //list_id
    53998920 //contact_id
);

//Contacts get count
$contacts = new ContactsApi;
$contacts->count(config('email-chef.list_id'));
```

#### API coverage

We are currently work on this package to implement all endpoints. Enable notifications to be notified when new API are released.

❌ Account

❌ Account infos

❌ Subscription

✅ Lists

✅ Contacts

❌ Predefined Fields

❌ Custom Fields

❌ Blockings

❌ Import Tasks

❌ Segments

❌ Campaigns

❌ Autoresponders

❌ Send mail

❌ SMS

#### Testing

```bash
composer test
```

#### Contributing

Please see [CONTRIBUTING](https://github.com/offline-agency/laravel-email-chef/blob/69bce04d4299636db5933cf9e4163a8aaccf5731/.github/CONTRIBUTING.md) for details.

#### Security Vulnerabilities

If you discover any security-related issues, please email support@offlineagency.com instead of using the issue tracker.

#### Credits

- [Offline Agency](https://github.com/offline-agency)
- [Manuel Romanato](https://github.com/ManuelRomanato)
- All Contributors

#### License

The MIT License (MIT). Please see [License File](https://github.com/offline-agency/laravel-email-chef/blob/69bce04d4299636db5933cf9e4163a8aaccf5731/LICENSE.md) for more information.
:::
