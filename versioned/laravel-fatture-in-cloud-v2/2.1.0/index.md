---
title: "Laravel Fatture in Cloud API v2 — 2.1.0"
description: "Archived Laravel Fatture in Cloud API v2 2.1.0 (commit d4ba190, 2022-10-26): requirements, changes since 2.0.3 and the README shipped with the tag."
permalink: /laravel-fatture-in-cloud-v2/2.1.0/
packageVersion: "2.1.0"
sourceCommit: d4ba1904187516ba9ffeba913cda3e63d6d8f2bc
documentationSnapshot: true
documentationArchive: generated-tag
---
# Laravel Fatture in Cloud API v2 2.1.0

This archived page describes tag `2.1.0` of [offline-agency/laravel-fatture-in-cloud-v2](https://github.com/offline-agency/laravel-fatture-in-cloud-v2). It is generated from the repository at that tag: the manifest, the history since the previous tag and the README shipped with the release. It is not a reviewed guide; read the [current documentation](/laravel-fatture-in-cloud-v2/) for the maintained release (3.0.1).

## Release

| Fact | Value |
| --- | --- |
| Tag | [2.1.0](https://github.com/offline-agency/laravel-fatture-in-cloud-v2/releases/tag/2.1.0) |
| Commit | [`d4ba1904187516ba9ffeba913cda3e63d6d8f2bc`](https://github.com/offline-agency/laravel-fatture-in-cloud-v2/tree/d4ba1904187516ba9ffeba913cda3e63d6d8f2bc) |
| Commit date | 2022-10-26 |
| Composer package | `offline-agency/laravel-fatture-in-cloud-v2` |
| Packagist | Version `2.1.0`, source reference matches this commit (checked 2026-11-23) |
| Declared license | MIT |

## Requirements

Declared in `composer.json` `require`:

- `php`: `>=7.3`
- `ext-json`: `*`
- `illuminate/support`: `^6.0|^7.0|^8.0|^9.0`
- `guzzlehttp/guzzle`: `^6.5|7.0.1|^7.2`
- `illuminate/container`: `^6.0|^7.0|^8.0|^9.0`
- `illuminate/http`: `^6.0|^7.0|^8.0|^9.0`

## Changes since 2.0.3

[Compare 2.0.3...2.1.0 on GitHub](https://github.com/offline-agency/laravel-fatture-in-cloud-v2/compare/2.0.3...2.1.0).

34 non-merge commits and 45 changed files.

Commits:

- `d58529e` Update README.md
- `34242ec` Update README.md
- `210d8bf` Apply fixes from StyleCI
- `5a27b3e` fix: avoid breaking changes
- `5c0152c` Delete .github/ISSUE\_TEMPLATE directory
- `7d31ab5` fix: repo settings
- `2546265` Apply fixes from StyleCI
- `ad52d77` fix: receipts methods
- `b423047` Update README.md
- `7b0a99e` Update README.md
- `356c3b1` feat: add c prefix on url for all methods
- `e840d3a` feat: add test for errors on all method
- `539080b` refactor: move all global variable into trait
- `52add2d` feat: add all method to readme
- `db30400` Apply fixes from StyleCI
- `1d37eb5` feat: add all method for supplier
- `3883221` feat: add all method for products
- `e053308` refactor: move all method test on client entity test
- `dd73ed7` feat: add all method for issued documents
- `ef62baf` feat: add all method
- `6feabfd` fix: receipts
- `a9682b3` fix-receipt-endpoint
- `8aabee8` feat-add-receipts-endpoint
- `dec62c7` feat: tick receipts on readme
- `2e3ef70` feat-add-receipts-endpoint
- `56c37cd` fix: readme
- `7812cd0` Apply fixes from StyleCI
- `dec0210` fix: user endpoint &amp; tests
- `3db5098` fix: base url
- `9624393` feat-add-companies-endpoiny
- `8488d8a` fix: user-endpoint
- `b85a39e` fix: doc
- `183036e` feat-add-user-endpoint
- `04cb6f7` Create User.php

Changed files:

- deleted `.github/ISSUE_TEMPLATE/config.yml`
- modified `.github/SECURITY.md`
- modified `README.md`
- modified `config/fatture-in-cloud-v2.php`
- modified `src/Api/Api.php`
- modified `src/Api/Client.php`
- added `src/Api/Company.php`
- modified `src/Api/IssuedDocument.php`
- modified `src/Api/Product.php`
- added `src/Api/Receipt.php`
- modified `src/Api/Supplier.php`
- added `src/Api/User.php`
- added `src/Entities/Company/Company.php`
- modified `src/Entities/Pagination.php`
- added `src/Entities/Receipt/Receipt.php`
- added `src/Entities/Receipt/ReceiptList.php`
- added `src/Entities/Receipt/ReceiptMonthlyTotals.php`
- added `src/Entities/Receipt/ReceiptPagination.php`
- added `src/Entities/Receipt/ReceiptPreCreateInfo.php`
- added `src/Entities/User/Company.php`
- added `src/Entities/User/CompanyList.php`
- added `src/Entities/User/User.php`
- modified `src/Traits/ListTrait.php`
- modified `tests/Fake/ClientFakeResponse.php`
- added `tests/Fake/Company/SingleCompany.php`
- added `tests/Fake/CompanyFakeResponse.php`
- modified `tests/Fake/IssuedDocumentFakeResponse.php`
- modified `tests/Fake/ProductFakeResponse.php`
- added `tests/Fake/Receipt/MonthlyTotal.php`
- added `tests/Fake/Receipt/PreCreateInfo.php`
- added `tests/Fake/Receipt/SingleReceipt.php`
- added `tests/Fake/ReceiptFakeResponse.php`
- modified `tests/Fake/SupplierFakeResponse.php`
- added `tests/Fake/User/EmailConfirmationState.php`
- added `tests/Fake/User/SingleCompany.php`
- added `tests/Fake/User/SingleUser.php`
- added `tests/Fake/User/UserInfo.php`
- added `tests/Fake/UserFakeResponse.php`
- modified `tests/Feature/ClientEntityTest.php`
- added `tests/Feature/CompanyEntityTest.php`
- modified `tests/Feature/IssuedDocumentEntityTest.php`
- modified `tests/Feature/ProductEntityTest.php`
- added `tests/Feature/ReceiptEntityTest.php`
- modified `tests/Feature/SupplierEntityTest.php`
- added `tests/Feature/UserEntityTest.php`

## README at 2.1.0

Shipped as [`README.md`](https://github.com/offline-agency/laravel-fatture-in-cloud-v2/blob/d4ba1904187516ba9ffeba913cda3e63d6d8f2bc/README.md). Headings are shifted one level, HTML markup is reduced to text and images, repository links are kept only when their target exists at this tag, and external links verified as unreachable are shown as text.

::: v-pre
### Laravel Fatture in Cloud v2

[![Latest Stable Version](https://poser.pugx.org/offline-agency/laravel-fatture-in-cloud-v2/v/stable)](https://packagist.org/packages/offline-agency/laravel-fatture-in-cloud-v2)
[![MIT Licensed](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](https://github.com/offline-agency/laravel-fatture-in-cloud-v2/blob/d4ba1904187516ba9ffeba913cda3e63d6d8f2bc/LICENSE.md)
[![run-tests](https://github.com/offline-agency/laravel-fatture-in-cloud-v2/actions/workflows/main.yml/badge.svg)](https://github.com/offline-agency/laravel-fatture-in-cloud-v2/actions/workflows/main.yml)
[![codecov](https://codecov.io/gh/offline-agency/laravel-fatture-in-cloud-v2/branch/master/graph/badge.svg?token=02NPUBvT9i)](https://codecov.io/gh/offline-agency/laravel-fatture-in-cloud-v2)

[![Total Downloads](https://img.shields.io/packagist/dt/offline-agency/laravel-fatture-in-cloud-v2.svg?style=flat-square)](https://packagist.org/packages/offline-agency/laravel-fatture-in-cloud-v2)
![Laravel Fatture in Cloud v2](https://banners.beyondco.de/Laravel%20Fatture%20in%20Cloud%20v2.png?theme=dark&packageManager=composer+require&packageName=offline-agency%2Flaravel-fatture-in-cloud-v2&pattern=autumn&style=style_1&description=A+simple+laravel+integration+with+Fatture+in+Cloud+APIs+v2&md=1&showWatermark=0&fontSize=100px&images=currency-euro&widths=200)

🔙 This is the documentation for the API v2. You can find the package for the API v1 [here](https://docs.offlineagency.com/laravel-fatture-in-cloud/#laravel-fatture-in-cloud).

#### Documentation, Installation, and Usage Instructions
See the [documentation](https://docs.offlineagency.com/laravel-fatture-in-cloud-v2/) for detailed installation and usage instructions.

#### What It Does

This package provides a simple Laravel integration with [Fatture in Cloud APIs v2](https://developers.fattureincloud.it/). Let's see some example:

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
This package provides a method to intercept throttle errors (403, 429) and automatically retry.
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

🔜 Issued e-invoices

❌ Received Documents

✅ Receipts

❌ Taxes

❌ Archive

❌ Cashbook

🔜 Info

❌ Settings

#### Testing

```bash
composer test
```

#### Contributing

Please see [CONTRIBUTING](https://github.com/offline-agency/laravel-fatture-in-cloud-v2/blob/d4ba1904187516ba9ffeba913cda3e63d6d8f2bc/CONTRIBUTING.md) for details.

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

The MIT License (MIT). Please see [License File](https://github.com/offline-agency/laravel-fatture-in-cloud-v2/blob/d4ba1904187516ba9ffeba913cda3e63d6d8f2bc/LICENSE.md) for more information.
:::
