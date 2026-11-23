---
title: "Laravel Bank of Italy — 1.0.0"
description: "Archived Laravel Bank of Italy 1.0.0 (commit 808ee70, 2024-09-11): requirements, changes and the README shipped with the tag."
permalink: /laravel-bank-of-italy/1.0.0/
packageVersion: "1.0.0"
sourceCommit: 808ee7011e76c5db4f684e112d72fce80b61db26
documentationSnapshot: true
documentationArchive: generated-tag
---
# Laravel Bank of Italy 1.0.0

This archived page describes tag `1.0.0` of [offline-agency/laravel-bank-of-italy](https://github.com/offline-agency/laravel-bank-of-italy). It is generated from the repository at that tag: the manifest, the history since the previous tag and the README shipped with the release. It is not a reviewed guide; read the [current documentation](/laravel-bank-of-italy/) for the maintained release (1.0.1).

## Release

| Fact | Value |
| --- | --- |
| Tag | [1.0.0](https://github.com/offline-agency/laravel-bank-of-italy/releases/tag/1.0.0) |
| Commit | [`808ee7011e76c5db4f684e112d72fce80b61db26`](https://github.com/offline-agency/laravel-bank-of-italy/tree/808ee7011e76c5db4f684e112d72fce80b61db26) |
| Commit date | 2024-09-11 |
| Composer package | `offline-agency/laravel-bank-of-italy` |
| Packagist | Version `1.0.0`, source reference matches this commit (checked 2026-11-23) |
| Declared license | MIT |

## Requirements

Declared in `composer.json` `require`:

- `php`: `>=8.0`
- `ext-json`: `*`
- `illuminate/support`: `^8.0|^9.0`
- `guzzlehttp/guzzle`: `7.0.1|^7.2`
- `illuminate/container`: `^8.0|^9.0`
- `illuminate/http`: `^8.0|^9.0`

## Changes

First tag of the repository: 9 non-merge commits up to this tag.

## README at 1.0.0

Shipped as [`README.md`](https://github.com/offline-agency/laravel-bank-of-italy/blob/808ee7011e76c5db4f684e112d72fce80b61db26/README.md). Headings are shifted one level, HTML markup is reduced to text and images, repository links are kept only when their target exists at this tag, and external links verified as unreachable are shown as text.

::: v-pre
### Laravel Bank of Italy

[![Latest Stable Version](https://poser.pugx.org/offline-agency/laravel-bank-of-italy/v/stable)](https://packagist.org/packages/offline-agency/laravel-bank-of-italy)
[![MIT Licensed](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](https://github.com/offline-agency/laravel-bank-of-italy/blob/808ee7011e76c5db4f684e112d72fce80b61db26/LICENSE.md)
[![Total Downloads](https://img.shields.io/packagist/dt/offline-agency/laravel-bank-of-italy.svg?style=flat-square)](https://packagist.org/packages/offline-agency/laravel-bank-of-italy)
![Laravel Bank of Italy](https://banners.beyondco.de/Laravel%20Bank%20of%20Italy.png?theme=dark&packageManager=composer+require&packageName=offline-agency%2Flaravel-bank-of-italy&pattern=yyy&style=style_1&description=A+simple+Laravel+package+to+retrieve+information+from+the+Bank+of+Italy&md=1&showWatermark=1&fontSize=100px&images=cash)

A simple Laravel package to retrieve information from the Bank of Italy.

#### Installation

You can install the package via composer:

```bash
composer require offline-agency/laravel-bank-of-italy
```

You need to publish config file with:

```bash
php artisan vendor:publish --provider="OfflineAgency\LaravelFattureInCloudV2\LaravelFattureInCloudV2ServiceProvider"
```

#### Usage

Currently, the package provides a method to retrieve exchange rates between currencies.

##### Basic

```php
$exchange_rate = new ExchangeRate();
$exchange_rates = $exchange_rate->getExchangeRates();

foreach ($exchange_rates->getItems() as $exchange_rate) {
    dd($exchange_rate); 
    /*
     OfflineAgency\LaravelBankOfItaly\Entities\ExchangeRate\ExchangeRate {
        +currency: "Dollaro USA"
        +currencyIsoCode: "USD"
        +currencyUicCode: "001"
        +rate: "1.0724"
        +rateConvention: "Quantità di valuta estera per 1 Euro"
        +referenceDate: "Y-m-d"
     }
     */
}
```

In this example, the method `getExchangeRates()` returns an instance of `OfflineAgency\LaravelBankOfItaly\Entities\ExchangeRate\ExchangeRates`. You can use the `getItems()` method to retrieve an array of `ExchangeRate` objects. Each `ExchangeRate` object contains the following properties:
* currency: The name of the currency (e.g., "Dollaro USA")
* currencyIsoCode: The ISO code of the currency (e.g., "USD")
* currencyUicCode: The UIC code of the currency (e.g., "001")
* rate: The exchange rate (e.g., "1.0724")
* rateConvention: The rate convention (e.g., "Quantità di valuta estera per 1 Euro")
* referenceDate: The reference date of the rate (format: Y-m-d)

##### Custom Query Parameters

You can also provide custom query parameters to filter the results. Here are the fields you can specify:

```php
$exchange_rate = new ExchangeRate();
$response = $exchange_rate->getExchangeRates([
    'lang' => 'en', // Default: it
    'baseCurrencyIsoCode' => 'EUR', // Default: USD
    'currencyIsoCode' => 'ITL', // Default: EUR (accepted values: EUR, USD, ITL)
    'startDate' => '01-01-2000', // Default: Carbon::now()->subYear() (format: Y-m-d)
    'endDate' => '01-01-2000' // Default: Carbon::now() (format: Y-m-d)
]);
```

##### Error Handling

* If there is a validation error, the method returns an instance of `Illuminate\Support\MessageBag`.
* If there is an error during the API call, the method returns an instance of `OfflineAgency\LaravelBankOfItaly\Entities\Error`, which contains an error property.

#### Contributing

Please see [CONTRIBUTING](https://github.com/offline-agency/laravel-bank-of-italy/blob/808ee7011e76c5db4f684e112d72fce80b61db26/CONTRIBUTING.md) for details.

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

The MIT License (MIT). Please see [License File](https://github.com/offline-agency/laravel-bank-of-italy/blob/808ee7011e76c5db4f684e112d72fce80b61db26/LICENSE.md) for more information.
:::
