---
title: "Laravel Fatture in Cloud API v2 — 2.0.0"
description: "Archived Laravel Fatture in Cloud API v2 2.0.0 (commit 87a9290, 2022-06-21): requirements, changes since 1.2.0 and the README shipped with the tag."
permalink: /laravel-fatture-in-cloud-v2/2.0.0/
packageVersion: "2.0.0"
sourceCommit: 87a92907b862a7208cdb6fc15d15dbbe3ebda561
documentationSnapshot: true
documentationArchive: generated-tag
---
# Laravel Fatture in Cloud API v2 2.0.0

This archived page describes tag `2.0.0` of [offline-agency/laravel-fatture-in-cloud-v2](https://github.com/offline-agency/laravel-fatture-in-cloud-v2). It is generated from the repository at that tag: the manifest, the history since the previous tag and the README shipped with the release. It is not a reviewed guide; read the [current documentation](/laravel-fatture-in-cloud-v2/) for the maintained release (3.0.1).

## Release

| Fact | Value |
| --- | --- |
| Tag | [2.0.0](https://github.com/offline-agency/laravel-fatture-in-cloud-v2/releases/tag/2.0.0) |
| Commit | [`87a92907b862a7208cdb6fc15d15dbbe3ebda561`](https://github.com/offline-agency/laravel-fatture-in-cloud-v2/tree/87a92907b862a7208cdb6fc15d15dbbe3ebda561) |
| Commit date | 2022-06-21 |
| Composer package | `offline-agency/laravel-fatture-in-cloud-v2` |
| Packagist | Version `2.0.0`, source reference matches this commit (checked 2026-11-23) |
| Declared license | MIT |

## Requirements

Declared in `composer.json` `require`:

- `php`: `>=7.3`
- `ext-json`: `*`
- `illuminate/support`: `^6.0|^7.0|^8.0|^9.0`
- `guzzlehttp/guzzle`: `^6.5|7.0.1|^7.2`
- `illuminate/container`: `^6.0|^7.0|^8.0|^9.0`
- `illuminate/http`: `^6.0|^7.0|^8.0|^9.0`

## Changes since 1.2.0

[Compare 1.2.0...2.0.0 on GitHub](https://github.com/offline-agency/laravel-fatture-in-cloud-v2/compare/1.2.0...2.0.0).

45 non-merge commits and 58 changed files.

Commits:

- `d36b0db` feat: add path for api classes on readme
- `de55dfa` feat: add path before api classes on readme
- `4c23936` feat: add client example on readme
- `dcd8963` feat: add pagination and products example on readme
- `c71d1d4` Apply fixes from StyleCI
- `4cb51d3` Apply fixes from StyleCI
- `462c948` fix: update api coverage on readme
- `c7505b7` feat: add issued document attachment endpoints
- `62b72da` feat: add bin on readme
- `770f106` Apply fixes from StyleCI
- `85addcf` feat: add client edit enpoint
- `a368211` feat: ad client on README
- `caf3c0e` feat: add product create endpoint
- `6abae78` feat: add issued document schedule email endpoint
- `1014f48` feat: add check mark to products on readme
- `cd7f384` feat: add product edit enpoint
- `26fcbd9` feat: add product create method
- `bc0e89b` feat: add issued document attachment endpoint
- `98cc116` feat: add API coverage
- `d72e929` feat: add emails endpoint
- `55913ec` feat: add issued document pre create info endpoint
- `b2ae0e2` feat: add issued document existing totals
- `e8c4b65` feat: add issued document totals endpoint
- `c04d41d` feat: add edit method for issued documents
- `ea5f91b` fix: creation method for issued documents
- `c5040a1` feat: add client delete method
- `5c22bd4` feat: add detail and tests
- `dbc8879` feat: add client list
- `8c58288` feat: add client enpoint
- `48c2fc4` feat: start to add document creation enpoint
- `5bbadbc` Apply fixes from StyleCI
- `63e4ee3` feat: add product detail and destroy
- `eb6b9e2` fix: issued documents &amp; product test
- `deace7a` refactor: test name
- `fc416b5` refactor: move product single entity to new directory
- `492e165` feat: add product methods
- `c8edd6d` feat: add pagination methods
- `bddb670` Apply fixes from StyleCI
- `3a4d2df` fix: issued documents methods
- `d1fc496` refactor: move issued document entity
- …and 5 more (see the comparison)

Changed files:

- modified `README.md`
- modified `src/Api/Api.php`
- added `src/Api/Client.php`
- modified `src/Api/IssuedDocument.php`
- added `src/Api/Product.php`
- modified `src/Entities/AbstractEntity.php`
- added `src/Entities/Client/Client.php`
- added `src/Entities/Client/ClientList.php`
- added `src/Entities/Client/ClientPagination.php`
- deleted `src/Entities/IssuedDocument.php`
- renamed `src/Entities/Document/IssuedDocument.php` → `src/Entities/IssuedDocument/IssuedDocument.php`
- added `src/Entities/IssuedDocument/IssuedDocumentAttachment.php`
- added `src/Entities/IssuedDocument/IssuedDocumentEmail.php`
- added `src/Entities/IssuedDocument/IssuedDocumentList.php`
- added `src/Entities/IssuedDocument/IssuedDocumentPagination.php`
- added `src/Entities/IssuedDocument/IssuedDocumentPreCreateInfo.php`
- added `src/Entities/IssuedDocument/IssuedDocumentScheduleEmail.php`
- added `src/Entities/IssuedDocument/IssuedDocumentTotals.php`
- added `src/Entities/Pagination.php`
- added `src/Entities/Product/Product.php`
- added `src/Entities/Product/ProductList.php`
- added `src/Entities/Product/ProductPagination.php`
- added `tests/Fake/Client/DefaultPaymentMethod.php`
- added `tests/Fake/Client/DefaultVat.php`
- added `tests/Fake/Client/SingleClient.php`
- added `tests/Fake/ClientFakeResponse.php`
- added `tests/Fake/ErrorFakeResponse.php`
- modified `tests/Fake/IssuedDocument/AccInvTemplate.php`
- added `tests/Fake/IssuedDocument/Attachment.php`
- modified `tests/Fake/IssuedDocument/Currency.php`
- modified `tests/Fake/IssuedDocument/DeliveryNoteTemplate.php`
- modified `tests/Fake/IssuedDocument/Document.php`
- added `tests/Fake/IssuedDocument/DocumentList.php`
- modified `tests/Fake/IssuedDocument/EiData.php`
- modified `tests/Fake/IssuedDocument/EiRaw.php`
- modified `tests/Fake/IssuedDocument/EiTsData.php`
- added `tests/Fake/IssuedDocument/Email.php`
- modified `tests/Fake/IssuedDocument/Entity.php`
- modified `tests/Fake/IssuedDocument/ExtraData.php`
- modified `tests/Fake/IssuedDocument/Item.php`
- modified `tests/Fake/IssuedDocument/Language.php`
- added `tests/Fake/IssuedDocument/MergedIn.php`
- modified `tests/Fake/IssuedDocument/Payment.php`
- modified `tests/Fake/IssuedDocument/PaymentMethod.php`
- added `tests/Fake/IssuedDocument/PreCreateInfo.php`
- added `tests/Fake/IssuedDocument/ScheduleEmail.php`
- modified `tests/Fake/IssuedDocument/Template.php`
- added `tests/Fake/IssuedDocument/Total.php`
- modified `tests/Fake/IssuedDocumentFakeResponse.php`
- added `tests/Fake/PaginationFakeResponse.php`
- added `tests/Fake/Product/DefaultVat.php`
- added `tests/Fake/Product/SingleProduct.php`
- added `tests/Fake/ProductFakeResponse.php`
- added `tests/Feature/ClientEntityTest.php`
- modified `tests/Feature/IssuedDocumentEntityTest.php`
- added `tests/Feature/PaginationTest.php`
- added `tests/Feature/ProductEntityTest.php`
- added `tests/Unit/FakeResponseTest.php`

## README at 2.0.0

Shipped as [`README.md`](https://github.com/offline-agency/laravel-fatture-in-cloud-v2/blob/87a92907b862a7208cdb6fc15d15dbbe3ebda561/README.md). Headings are shifted one level, HTML markup is reduced to text and images, repository links are kept only when their target exists at this tag, and external links verified as unreachable are shown as text.

::: v-pre
### Laravel Fatture in Cloud v2

[![Latest Stable Version](https://poser.pugx.org/offline-agency/laravel-fatture-in-cloud-v2/v/stable)](https://packagist.org/packages/offline-agency/laravel-fatture-in-cloud-v2)
[![MIT Licensed](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](https://github.com/offline-agency/laravel-fatture-in-cloud-v2/blob/87a92907b862a7208cdb6fc15d15dbbe3ebda561/LICENSE.md)
[![Laravel](https://github.com/offline-agency/laravel-fatture-in-cloud-v2/actions/workflows/main.yml/badge.svg?branch=master)](https://github.com/offline-agency/laravel-fatture-in-cloud-v2/actions/workflows/main.yml)

[![Total Downloads](https://img.shields.io/packagist/dt/offline-agency/laravel-fatture-in-cloud-v2.svg?style=flat-square)](https://packagist.org/packages/offline-agency/laravel-fatture-in-cloud-v2)

A simple Laravel integration with [Fatture in Cloud APIs v2](https://developers.fattureincloud.it/).

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

#### Configuration

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
$issued_documents = new \OfflineAgency\LaravelFattureInCloudV2\Api\IssuedDocument();

// specify company
$issued_documents = new \OfflineAgency\LaravelFattureInCloudV2\Api\IssuedDocument('first_company');
```

#### Features

##### Rate limit

Package provide a method to intercept throttle errors (403, 429) and automatically retry. You can specify limits on your config, remember to use ms:

```php
'limits' => [
    'default' => 300000,
    '403' => 300000,
    '429' => 3600000,
],
```

##### Issued document bin

Package provide bin() method for deleted issued documents that allow you to get its detail. This is very useful, for example, when you convert a
proforma into an invoice (deleting the proforma) and you need old document's detail. Let's see an example:

```php
$issued_documents = new \OfflineAgency\LaravelFattureInCloudV2\Api\IssuedDocument();
$response = $issued_documents->bin($document_id);
```

It returns the same class of detail method  with all its fields.

#### Api coverage

###### Issued Documents ✅

- [X] List Issued Documents [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()
- [X] Create Issued Documents [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=blue)]()
- [X] Get Issued Document [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()
- [X] Get Deleted Document [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()
- [X] Modify Issued Document [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=violet)]()
- [X] Delete Issued Document [![DELETE method](https://img.shields.io/static/v1.svg?label=&message=DELETE&color=red)]()
- [X] Get New Issued Document Totals [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=blue)]()
- [X] Get Existing Issued Document Totals [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=blue)]()
- [X] Upload Issued Document Attachment [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=blue)]()
- [X] Delete Issued Document Attachment [![DELETE method](https://img.shields.io/static/v1.svg?label=&message=DELETE&color=red)]()
- [X] Get Issued Document Pre-create info [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()
- [X] Get Email Data [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()
- [X] Schedule Email [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=blue)]()

###### Products ✅

- [X] List products [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()
- [X] Create product [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=blue)]()
- [X] Get product [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()
- [X] Modify product [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=violet)]()
- [X] Delete product [![DELETE method](https://img.shields.io/static/v1.svg?label=&message=DELETE&color=red)]()

###### Clients ✅

- [X] List clients [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()
- [X] Create client [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=blue)]()
- [X] Get client [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()
- [X] Modify client [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=violet)]()
- [X] Delete client [![DELETE method](https://img.shields.io/static/v1.svg?label=&message=DELETE&color=red)]()

#### Usage

Each callback accept a number of parameters equals to the sum of the required parameters +1 that is $additional_data
that accept all optional parameters.

##### Pagination
Package provide some pagination methods for list endpoints. Let's see a few examples:

``` php
$issued_documents = new \OfflineAgency\LaravelFattureInCloudV2\Api\IssuedDocument();
$issued_document_list = $issued_documents->list($document_type);

// return pagination fields like page, per_page...
$issued_document_list->getPagination() 

// return documents of the next page or null if there aren't next pages
$issued_document_list->getPagination()->goToNextPage()

// some logic of next page fort other methods
$issued_document_list->getPagination()->goToPrevPage()
$issued_document_list->getPagination()->goToFirstPage()
$issued_document_list->getPagination()->goToLastPage()
```

#### Examples

##### Issued documents
```php
$issued_documents = new \OfflineAgency\LaravelFattureInCloudV2\Api\IssuedDocument();
$response = $issued_documents->list($document_type);
```

##### Products
```php
$products = new \OfflineAgency\LaravelFattureInCloudV2\Api\Product();
$response = $products->list();
```

##### Clients
```php
$clients = new \OfflineAgency\LaravelFattureInCloudV2\Api\Client();
$response = $clients->list();
```

#### Testing

```bash
composer test
```

#### Contributing

Please see [CONTRIBUTING](https://github.com/offline-agency/laravel-fatture-in-cloud-v2/blob/87a92907b862a7208cdb6fc15d15dbbe3ebda561/CONTRIBUTING.md) for details.

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

The MIT License (MIT). Please see [License File](https://github.com/offline-agency/laravel-fatture-in-cloud-v2/blob/87a92907b862a7208cdb6fc15d15dbbe3ebda561/LICENSE.md) for more information.
:::
