---
title: "Laravel Fatture in Cloud API v2 — 3.0.0"
description: "Archived Laravel Fatture in Cloud API v2 3.0.0 (commit eb25a6a, 2026-03-28): requirements, changes since 2.1.3 and the README shipped with the tag."
permalink: /laravel-fatture-in-cloud-v2/3.0.0/
packageVersion: "3.0.0"
sourceCommit: eb25a6a3c3a521f7ea84f866cb1e397597f13b60
documentationSnapshot: true
documentationArchive: generated-tag
---
# Laravel Fatture in Cloud API v2 3.0.0

This archived page describes tag `3.0.0` of [offline-agency/laravel-fatture-in-cloud-v2](https://github.com/offline-agency/laravel-fatture-in-cloud-v2). It is generated from the repository at that tag: the manifest, the history since the previous tag and the README shipped with the release. It is not a reviewed guide; read the [current documentation](/laravel-fatture-in-cloud-v2/) for the maintained release (3.0.1).

## Release

| Fact | Value |
| --- | --- |
| Tag | [3.0.0](https://github.com/offline-agency/laravel-fatture-in-cloud-v2/releases/tag/3.0.0) |
| Commit | [`eb25a6a3c3a521f7ea84f866cb1e397597f13b60`](https://github.com/offline-agency/laravel-fatture-in-cloud-v2/tree/eb25a6a3c3a521f7ea84f866cb1e397597f13b60) |
| Commit date | 2026-03-28 |
| Composer package | `offline-agency/laravel-fatture-in-cloud-v2` |
| Packagist | Version `3.0.0`, source reference matches this commit (checked 2026-11-23) |
| Declared license | MIT |

## Requirements

Declared in `composer.json` `require`:

- `php`: `^8.4`
- `ext-json`: `*`
- `guzzlehttp/guzzle`: `^7.9`
- `illuminate/container`: `^11.0|^12.0`
- `illuminate/http`: `^11.0|^12.0`
- `illuminate/support`: `^11.0|^12.0`

## Changes since 2.1.3

[Compare 2.1.3...3.0.0 on GitHub](https://github.com/offline-agency/laravel-fatture-in-cloud-v2/compare/2.1.3...3.0.0).

84 non-merge commits and 194 changed files.

Commits:

- `eb25a6a` chore: bump pint to ^1.29 to match ci environment
- `ce25b58` style: fix fully\_qualified\_strict\_types and operator spacing issues
- `1972d38` fix: type field
- `9af5c60` add: space
- `4b8bb12` fix: add traits normaliazedates
- `ea311bc` fix: required fields on the various API and update tests
- `87477ac` fix: add some specifics on README
- `7eddc2c` fix: remove '/c' from the baseUrl
- `ed1351f` fix: php stan
- `a50e817` fix lint
- `27ec659` refactor: improve FattureInCloud.php readability and add safety checks
- `6910e1b` test: 100% coverage for FattureInCloud.php — resolveCompany branches
- `c380de1` fix: get companyId and bearer
- `eed3794` fix: php stan
- `b508aac` style: add missing return types to IssuedDocument and Info API classes
- `a614722` refactor: add strict types, fix const visibility, normalize property usage
- `17f3a77` perf: fix ListTrait state pollution between successive all() calls
- `7092dd1` fix: correct Info endpoint URLs and IssuedEInvoice return type
- `040d592` fix: baseUrl
- `b8998b5` fix: remove config variables
- `e47a110` test: reach 100% coverage on Api/Taxes and Api/IssuedDocument
- `4cb7a78` fix: test and fix API
- `f1c7142` test: 100% coverage for remaining Entity classes
- `208fea2` test: 100% coverage for all List entity classes
- `bdd8c90` test: 100% coverage for all Info list entity classes
- `3d52cd4` test: 100% coverage for all Pagination entity classes
- `65c2711` test: add IssuedDocument and ReceivedDocument pagination navigation tests
- `baca5e6` test: add CashbookPagination and ProductPagination navigation tests
- `afdf5aa` test: add ClientPagination and ArchivePagination navigation tests
- `c16dc2c` test: reach 100% Entity coverage on Api, IssuedDocument, ReceivedDocument, Taxes
- `79d5b79` test: 100% coverage for Api/Email, Pagination, Situation, Webhook, User
- `185aab8` test: 100% coverage for Api/PriceList, Settings, IssuedDocument
- `345c18c` test: 100% coverage for Api/Taxes, Supplier, Product, Receipt, ReceivedDocument
- `b381669` test: 100% coverage for Api/Info, Api/Archive, Api/CashBook
- `9251506` test: reach 100% coverage on ListTrait
- `67d7f7b` test: increase Api coverage for Info, Archive, CashBook to 90%+
- `535d7cd` feat: add more tests
- `dd8dc22` fix: test pint
- `33fa6f9` feat: add more tests
- `0f6c1bb` fix: ci
- …and 44 more (see the comparison)

Changed files:

- modified `.github/workflows/main.yml`
- modified `.gitignore`
- deleted `.php_cs.dist.php`
- added `.phpunit.cache/test-results`
- deleted `.styleci.yml`
- modified `CHANGELOG.md`
- modified `CONTRIBUTING.md`
- modified `README.md`
- modified `composer.json`
- modified `composer.lock`
- modified `config/fatture-in-cloud-v2.php`
- added `package-lock.json`
- added `phpstan.neon`
- modified `phpunit.xml`
- added `pint.json`
- modified `src/Api/Api.php`
- added `src/Api/Archive.php`
- added `src/Api/Cashbook.php`
- modified `src/Api/Client.php`
- modified `src/Api/Company.php`
- added `src/Api/Email.php`
- modified `src/Api/Info.php`
- modified `src/Api/IssuedDocument.php`
- modified `src/Api/IssuedEInvoice.php`
- added `src/Api/PaymentAccount.php`
- added `src/Api/PaymentMethod.php`
- added `src/Api/PriceList.php`
- modified `src/Api/Product.php`
- modified `src/Api/Receipt.php`
- added `src/Api/ReceivedDocument.php`
- added `src/Api/Situation.php`
- modified `src/Api/Supplier.php`
- added `src/Api/Taxes.php`
- modified `src/Api/User.php`
- added `src/Api/VatType.php`
- added `src/Api/Webhook.php`
- modified `src/Entities/AbstractEntity.php`
- added `src/Entities/Archive/Archive.php`
- added `src/Entities/Archive/ArchiveList.php`
- added `src/Entities/Archive/ArchivePagination.php`
- added `src/Entities/CashBook/CashbookEntry.php`
- added `src/Entities/CashBook/CashbookList.php`
- added `src/Entities/CashBook/CashbookPagination.php`
- modified `src/Entities/Client/Client.php`
- modified `src/Entities/Client/ClientList.php`
- modified `src/Entities/Client/ClientPagination.php`
- modified `src/Entities/Company/Company.php`
- added `src/Entities/Email/Email.php`
- added `src/Entities/Email/EmailList.php`
- modified `src/Entities/Error.php`
- added `src/Entities/Info/ArchiveCategories.php`
- added `src/Entities/Info/CostCenters.php`
- added `src/Entities/Info/InfoArchiveCategoriesList.php`
- added `src/Entities/Info/InfoCostCentersList.php`
- modified `src/Entities/Info/InfoList.php`
- added `src/Entities/Info/InfoPaymentAccountsList.php`
- added `src/Entities/Info/InfoPaymentMethodsList.php`
- added `src/Entities/Info/InfoProductsCategoriesList.php`
- added `src/Entities/Info/InfoReceivedDocumentCategoriesList.php`
- added `src/Entities/Info/InfoRevenueCentersList.php`
- …and 134 more (see the comparison)

## README at 3.0.0

Shipped as [`README.md`](https://github.com/offline-agency/laravel-fatture-in-cloud-v2/blob/eb25a6a3c3a521f7ea84f866cb1e397597f13b60/README.md). Headings are shifted one level, HTML markup is reduced to text and images, repository links are kept only when their target exists at this tag, and external links verified as unreachable are shown as text.

::: v-pre
### Laravel Fatture in Cloud v2

[![Latest Stable Version](https://poser.pugx.org/offline-agency/laravel-fatture-in-cloud-v2/v/stable)](https://packagist.org/packages/offline-agency/laravel-fatture-in-cloud-v2)
[![MIT Licensed](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](https://github.com/offline-agency/laravel-fatture-in-cloud-v2/blob/eb25a6a3c3a521f7ea84f866cb1e397597f13b60/LICENSE.md)
[![run-tests](https://github.com/offline-agency/laravel-fatture-in-cloud-v2/actions/workflows/main.yml/badge.svg)](https://github.com/offline-agency/laravel-fatture-in-cloud-v2/actions/workflows/main.yml)
[![codecov](https://codecov.io/gh/offline-agency/laravel-fatture-in-cloud-v2/branch/master/graph/badge.svg?token=02NPUBvT9i)](https://codecov.io/gh/offline-agency/laravel-fatture-in-cloud-v2)
[![Laravel Pint](https://img.shields.io/badge/code%20style-pint-orange)](https://github.com/laravel/pint)
[![PHPStan Level 6](https://img.shields.io/badge/PHPStan-level%206-brightgreen)](https://phpstan.org/)
[![Total Downloads](https://img.shields.io/packagist/dt/offline-agency/laravel-fatture-in-cloud-v2.svg?style=flat-square)](https://packagist.org/packages/offline-agency/laravel-fatture-in-cloud-v2)
![Laravel Fatture in Cloud v2](https://banners.beyondco.de/Laravel%20Fatture%20in%20Cloud%20v2.png?theme=dark&packageManager=composer+require&packageName=offline-agency%2Flaravel-fatture-in-cloud-v2&pattern=autumn&style=style_1&description=A+simple+laravel+integration+with+Fatture+in+Cloud+APIs+v2&md=1&showWatermark=0&fontSize=100px&images=currency-euro&widths=200)

🔙 This is the documentation for the API v2. You can find the package for the API v1 [here](https://docs.offlineagency.com/laravel-fatture-in-cloud/#laravel-fatture-in-cloud).

##### Warning for integrators

- **Keep your copy up to date:** Check the [official laravel-fatture-in-cloud-v2](https://github.com/offline-agency/laravel-fatture-in-cloud-v2) package and update your local dependency (e.g. run `composer update offline-agency/laravel-fatture-in-cloud-v2` or pull the latest from the repository).
- **Response variables are camelCase:** Entity properties use **camelCase** (e.g. `amountGross`, `amountNet`, `amountVat`), not snake_case (`amount_gross`, `amount_net`, `amount_vat`). If you have existing code that reads response data, update it to use the new property names. Use the entity classes in this package as the reference—for example, [`IssuedDocument`](https://github.com/offline-agency/laravel-fatture-in-cloud-v2/blob/eb25a6a3c3a521f7ea84f866cb1e397597f13b60/src/Entities/IssuedDocument/IssuedDocument.php) for issued documents. Examples: `amount_gross` → `amountGross`, `amount_net` → `amountNet`, `created_at` → `createdAt`.
- **Config:** Check the package config [`config/fatture-in-cloud-v2.php`](https://github.com/offline-agency/laravel-fatture-in-cloud-v2/blob/eb25a6a3c3a521f7ea84f866cb1e397597f13b60/config/fatture-in-cloud-v2.php) and update your project’s config to match, especially **`baseUrl`**. Use the root API URL only (no extra path segments).

#### Requirements

- PHP ^8.4 (includes 8.5)
- Laravel ^11.0|^12.0

| PHP | Laravel 11 | Laravel 12 |
|-----|:----------:|:----------:|
| 8.4 | ✅ | ✅ |
| 8.5 | ✅ | ✅ |

##### API Granularization (Breaking Changes)
The monolithic `Settings` and `Setting` classes have been split into granular resources to improve maintainability and strictly follow the Single Responsibility Principle:
- `Settings` -> Split into `VatType`, `PaymentAccount`, and `PaymentMethod`.
- `ArchiveDocument` -> Renamed to `Archive`.
- `Cashbooks` -> Renamed to `Cashbook`.
- New classes added: `Email`, `Situation`, `PriceList`, and `Webhook`.

##### Strictly Typed & Readonly Entities
All entities (e.g., `Client`, `IssuedDocument`, `PriceList`) have been refactored to be **readonly** classes with **strict types**.
- Properties are now immutable.
- Usage of `mixed` types has been minimized in favor of strict `string`, `int`, `float`, `bool`, etc.
- Constructors ensure safe data mapping from API responses.

##### Modern testing suite
- Switched from PHPUnit to **Pest PHP** for a more expressive and modern testing experience.
- Automated code styling with **Laravel Pint**.

##### Architecture
- The package now utilizes a central `FattureInCloud` connector for better state management.
- API interactions are handled via the native Laravel `Http` client.

#### Documentation, Installation, and Usage Instructions

This package provides a simple Laravel integration with [Fatture in Cloud APIs v2](https://developers.fattureincloud.it/).

See the [documentation](https://docs.offlineagency.com/laravel-fatture-in-cloud-v2/) for detailed installation and usage instructions.
``` php
$issued_documents = new \OfflineAgency\LaravelFattureInCloudV2\Api\IssuedDocument();
$issued_document_list = $issued_document->list('invoice', [
    'per_page' => 50
]);  

// return an array of invoices 
$issued_document_list->getItems();

// return pagination fields like page, per_page...
$issued_document_list->getPagination();

// return single product's fields
$product = new \OfflineAgency\LaravelFattureInCloudV2\Api\Product();
$product_detail = $product->detail($product_id);
```

#### Features

##### All [![HOT](https://img.shields.io/static/v1.svg?label=&message=HOT&color=red)]()
This package provide `all()` method that allow you to get an array of all results without pagination. It's implemented for all endpoint that provide a list method with pagination. Let's see an example:

```php
$issued_documents = new \OfflineAgency\LaravelFattureInCloudV2\Api\IssuedDocument();
$issued_document_list = $issued_documents->all('invoice');
```

##### Pagination
This package provides a pagination system that allow you to move between pages using simple methods:

```php
$issued_documents = new \OfflineAgency\LaravelFattureInCloudV2\Api\IssuedDocument();
$issued_document_list = $issued_documents->list('invoice');

// check if the response has more than one page
$issued_document_list->getPagination()->isSinglePage();

// check if the document has a next page
$issued_document_list->getPagination()->hasNextPage();

// check if the document has a previous page
$issued_document_list->getPagination()->hasPrevPage();

// return documents of the next page
$issued_document_list->getPagination()->goToNextPage();

// return documents of the previous page
$issued_document_list->getPagination()->goToPrevPage();

// return documents of the first page
$issued_document_list->getPagination()->goToFirstPage();

// return documents of the last page
$issued_document_list->getPagination()->goToLastPage();
```

##### Bin [![HOT](https://img.shields.io/static/v1.svg?label=&message=HOT&color=red)]()
This package provides bin() method for deleted issued documents that allow you to get its detail. This is very useful, for example, when you convert a
proforma into an invoice (deleting the proforma) and you need old document's detail. Let's see an example:

```php
$issued_documents = new \OfflineAgency\LaravelFattureInCloudV2\Api\IssuedDocument();
$response = $issued_documents->bin($document_id);
```

##### Rate limit [![HOT](https://img.shields.io/static/v1.svg?label=&message=HOT&color=red)]()
This     package provides a method to intercept throttle errors (403, 429) and automatically retry.
You can specify limits on your config, remember to use milliseconds to indicate time:

```php
'limits' => [
    'default' => 300000,
    '403' => 300000,
    '429' => 3600000,
],
```

#### API coverage

We are currently work on this package to implement all endpoints. Enable notifications to be notified when new API are released.

✅ User

✅ Companies

✅ Clients

✅ Suppliers

✅ Products

✅ Issued Documents

✅ Issued e-invoices

✅ Received Documents

✅ Receipts

✅ Taxes

✅ Archive

✅ Cashbook

✅ Info

✅ Price Lists

✅ Webhooks

✅ Situation

✅ Emails

✅ Stock

✅ Payment Accounts

✅ Payment Methods

✅ VAT Types

#### Testing

```bash
composer test
```

Unit and Feature tests use mocked HTTP. To run **integration tests** (real HTTP calls to Fatture in Cloud), set in `.env`:

- `FCV2_DEFAULT_ID` – company ID
- `FCV2_DEFAULT_BEARER` – API bearer token

Then run:

```bash
php vendor/bin/pest tests/Integration
```

If these env vars are not set, integration tests are skipped.

#### Contributing

Please see [CONTRIBUTING](https://github.com/offline-agency/laravel-fatture-in-cloud-v2/blob/eb25a6a3c3a521f7ea84f866cb1e397597f13b60/CONTRIBUTING.md) for details.

#### Security

If you discover any security-related issues, please email &lt;support@offlineagency.com> instead of using the issue
tracker.

#### Credits

- [Offline Agency](https://github.com/offline-agency)
- [Giacomo Fabbian](https://github.com/Giacomo92)
- [Nicolas Sanavia](https://github.com/SanaviaNicolas)
- [All Contributors](https://github.com/offline-agency/laravel-fatture-in-cloud-v2/graphs/contributors)

#### About us

Offline Agency is a web design agency based in Padua, Italy. You'll find an overview of our
projects [on our website](https://offlineagency.it/).

#### License

The MIT License (MIT). Please see [License File](https://github.com/offline-agency/laravel-fatture-in-cloud-v2/blob/eb25a6a3c3a521f7ea84f866cb1e397597f13b60/LICENSE.md) for more information.
:::
