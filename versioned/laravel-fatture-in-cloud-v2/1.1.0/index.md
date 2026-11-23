---
title: "Laravel Fatture in Cloud API v2 — 1.1.0"
description: "Archived Laravel Fatture in Cloud API v2 1.1.0 (commit 3a40a37, 2022-06-09): requirements, changes since 1.0.0 and the README shipped with the tag."
permalink: /laravel-fatture-in-cloud-v2/1.1.0/
packageVersion: "1.1.0"
sourceCommit: 3a40a37d9b81a54318b51e64df74b817edb6c164
documentationSnapshot: true
documentationArchive: generated-tag
---
# Laravel Fatture in Cloud API v2 1.1.0

This archived page describes tag `1.1.0` of [offline-agency/laravel-fatture-in-cloud-v2](https://github.com/offline-agency/laravel-fatture-in-cloud-v2). It is generated from the repository at that tag: the manifest, the history since the previous tag and the README shipped with the release. It is not a reviewed guide; read the [current documentation](/laravel-fatture-in-cloud-v2/) for the maintained release (3.0.1).

## Release

| Fact | Value |
| --- | --- |
| Tag | [1.1.0](https://github.com/offline-agency/laravel-fatture-in-cloud-v2/releases/tag/1.1.0) |
| Commit | [`3a40a37d9b81a54318b51e64df74b817edb6c164`](https://github.com/offline-agency/laravel-fatture-in-cloud-v2/tree/3a40a37d9b81a54318b51e64df74b817edb6c164) |
| Commit date | 2022-06-09 |
| Composer package | `offline-agency/laravel-fatture-in-cloud-v2` |
| Packagist | Version `1.1.0`, source reference matches this commit (checked 2026-11-23) |
| Declared license | MIT |

## Requirements

Declared in `composer.json` `require`:

- `php`: `>=7.3`
- `ext-json`: `*`
- `illuminate/support`: `^6.0|^7.0|^8.0|^9.0`
- `guzzlehttp/guzzle`: `^6.5|7.0.1|^7.2`
- `illuminate/container`: `^6.0|^7.0|^8.0|^9.0`
- `illuminate/http`: `^6.0|^7.0|^8.0|^9.0`

## Changes since 1.0.0

[Compare 1.0.0...1.1.0 on GitHub](https://github.com/offline-agency/laravel-fatture-in-cloud-v2/compare/1.0.0...1.1.0).

11 non-merge commits and 2 changed files.

Commits:

- `0bde0db` Update main.yml
- `674a904` Update main.yml
- `e93b062` Update main.yml
- `bcd050a` Update main.yml
- `d62a687` Update composer.json
- `f34ae86` Update main.yml
- `b92cc07` Update main.yml
- `c76d543` Update main.yml
- `5dd70be` Update main.yml
- `d47314d` Update main.yml
- `627c405` Update composer.json

Changed files:

- modified `.github/workflows/main.yml`
- modified `composer.json`

## README at 1.1.0

Shipped as [`README.md`](https://github.com/offline-agency/laravel-fatture-in-cloud-v2/blob/3a40a37d9b81a54318b51e64df74b817edb6c164/README.md). Headings are shifted one level, HTML markup is reduced to text and images, repository links are kept only when their target exists at this tag, and external links verified as unreachable are shown as text.

::: v-pre
### Laravel Fatture in Cloud v2

[![Latest Stable Version](https://poser.pugx.org/offline-agency/laravel-fatture-in-cloud-v2/v/stable)](https://packagist.org/packages/offline-agency/laravel-fatture-in-cloud-v2)
[![MIT Licensed](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](https://github.com/offline-agency/laravel-fatture-in-cloud-v2/blob/3a40a37d9b81a54318b51e64df74b817edb6c164/LICENSE.md)
[![Laravel](https://github.com/offline-agency/laravel-fatture-in-cloud-v2/actions/workflows/main.yml/badge.svg?branch=master)](https://github.com/offline-agency/laravel-fatture-in-cloud-v2/actions/workflows/main.yml)

[![Total Downloads](https://img.shields.io/packagist/dt/offline-agency/laravel-fatture-in-cloud-v2.svg?style=flat-square)](https://packagist.org/packages/offline-agency/laravel-fatture-in-cloud-v2)

A simple Laravel integration with Fatture in Cloud APIs v2.

![Laravel Fatture in Cloud v2](https://banners.beyondco.de/Laravel%20Fatture%20in%20Cloud%20v2.png?theme=dark&packageManager=composer+require&packageName=offline-agency%2Flaravel-fatture-in-cloud-v2&pattern=autumn&style=style_1&description=A+simple+laravel+integration+with+Fatture+in+Cloud+APIs+v2&md=1&showWatermark=0&fontSize=100px&images=currency-euro&widths=200)

#### Documentation

You can find the documentation [here](https://docs.offlineagency.com/laravel-fatture-in-cloud-v2/)

#### Installation

Install the package through [Composer](http://getcomposer.org/).

Run the Composer require command from the Terminal:

```bash
composer require offline-agency/laravel-fatture-in-cloud-v2
```

You should publish config file with:

```bash
php artisan vendor:publish --provider="Offlineagency\LaravelWebex\Providers\LaravelWebexServiceProvider"
```

Package provide multiple-companies handling. In your config you can provide more companies like that 
```php
... 

'companies' => [
    'default' => [
        'id' => env('FCV2_DEFAULT_ID', ''),
        'bearer' => env('FCV2_DEFAULT_BEARER', '')
    ],
    'first_company' => [
        'id' => env('FCV2_FIRST_COMPANY_ID', ''),
        'bearer' => env('FCV2_FIRST_COMPANY_BEARER', '')
    ],
    'second_company' => [
        'id' => env('FCV2_SECOND_COMPANY_ID', ''),
        'bearer' => env('FCV2_SECOND_COMPANY_BEARER', '')
    ]
]
```

Then you can specify (or not) a company on class initialization:
```php
// take the default
$issued_documents = new IssuedDocument();

// specify company
$issued_documents = new IssuedDocument('first_company');
```
#### Usage

Each callback accept a number of parameters equals to the sum of the required parameters +1 that is $additional_data
that accept all optional parameters.

#### Examples

##### Issued documents
```php
$issued_documents = new IssuedDocument();
$response = $issued_documents->list($document_type);
```

#### Testing

```bash
composer test
```

#### Contributing

Please see [CONTRIBUTING](https://github.com/offline-agency/laravel-fatture-in-cloud-v2/blob/3a40a37d9b81a54318b51e64df74b817edb6c164/CONTRIBUTING.md) for details.

#### Security

If you discover any security-related issues, please email &lt;support@offlineagency.com> instead of using the issue
tracker.

#### Credits

- [Offline Agency](https://github.com/offline-agency)
- [Giacomo Fabbian](https://github.com/Giacomo92)
- [Nicolas Sanavia](https://github.com/SanaviaNicolas)
- All Contributors

#### About us

Offline Agency is a web design agency based in Padua, Italy. You'll find an overview of our
projects [on our website](https://offlineagency.it/).

#### License

The MIT License (MIT). Please see [License File](https://github.com/offline-agency/laravel-fatture-in-cloud-v2/blob/3a40a37d9b81a54318b51e64df74b817edb6c164/LICENSE.md) for more information.
:::
