---
title: Laravel Bank of Italy
description: Install Laravel Bank of Italy 1.0.1 and retrieve daily exchange-rate time series with explicit validation and error handling.
packageVersion: '1.0.1'
sourceCommit: 8b4ae70b92d0b802139138e70367d789d80251af
gitName: laravel-bank-of-italy
---

# Laravel Bank of Italy

Retrieve daily exchange-rate time series from the Bank of Italy in a Laravel application. This guide describes **1.0.1**, checked against its released source on **16 October 2026**. It covers the implemented `dailyTimeSeries` operation; other endpoints in the provider's API are not implemented.

[Release](https://github.com/offline-agency/laravel-bank-of-italy/releases/tag/1.0.1) · [Packagist](https://packagist.org/packages/offline-agency/laravel-bank-of-italy) · [Released source](https://github.com/offline-agency/laravel-bank-of-italy/tree/8b4ae70b92d0b802139138e70367d789d80251af)

## Requirements

| Dependency | Released Composer requirement |
| --- | --- |
| PHP | `>=8.0` |
| JSON extension | `*` |
| Illuminate support, container and HTTP | `^8.0 \| ^9.0` |
| Guzzle | `7.0.1 \| ^7.2` |

These are the constraints in the [released composer.json](https://github.com/offline-agency/laravel-bank-of-italy/blob/8b4ae70b92d0b802139138e70367d789d80251af/composer.json). They do not establish compatibility with newer Laravel versions. The package uses Laravel's validator as well as its HTTP client; the examples assume a Laravel application with those services available.

## Installation and configuration

Run in your Laravel application:

```bash
composer require offline-agency/laravel-bank-of-italy:1.0.1
```

Composer metadata enables Laravel discovery of `OfflineAgency\LaravelBankOfItaly\LaravelBankOfItalyServiceProvider` and the `LaravelBankOfItaly` facade alias. If discovery is disabled, register that service provider in your application's provider configuration.

The provider merges defaults automatically. Publishing is optional when you need to change them:

```bash
php artisan vendor:publish --provider="OfflineAgency\LaravelBankOfItaly\LaravelBankOfItalyServiceProvider" --tag=config
```

This creates `config/bank-of-italy.php`:

```php
<?php

return [
    'exchange-rate' => [
        'url' => 'https://tassidicambio.bancaditalia.it/terzevalute-wf-web/rest/v1.0/dailyTimeSeries',
        'default_query_params' => [
            'lang' => 'it',
            'baseCurrencyIsoCode' => 'USD',
            'currencyIsoCode' => 'EUR',
        ],
    ],
];
```

Use the API class directly. The discovered facade resolves the empty `LaravelBankOfItaly` class in this release, so it does **not** expose `getExchangeRates()`.

## Quickstart with all outcomes handled

This server-side example requests a fixed historical interval. The dates and currencies are examples; no rate or availability is guaranteed for that interval.

```php
use Illuminate\Http\Client\ConnectionException;
use Illuminate\Support\MessageBag;
use OfflineAgency\LaravelBankOfItaly\Api\ExchangeRate;
use OfflineAgency\LaravelBankOfItaly\Entities\Error as BankOfItalyError;
use OfflineAgency\LaravelBankOfItaly\Entities\ExchangeRate\ExchangeRates;

try {
    $result = (new ExchangeRate())->getExchangeRates([
        'lang' => 'en',
        'baseCurrencyIsoCode' => 'USD',
        'currencyIsoCode' => 'EUR',
        'startDate' => '2026-01-02',
        'endDate' => '2026-01-09',
    ]);
} catch (ConnectionException $exception) {
    report($exception);
    return response()->json(['message' => 'Exchange-rate service unavailable.'], 503);
}

if ($result instanceof MessageBag) {
    return response()->json(['errors' => $result->messages()], 422);
}

if ($result instanceof BankOfItalyError) {
    // Keep the provider's raw response body out of public error messages.
    return response()->json(['message' => 'Exchange-rate request failed.'], 502);
}

/** @var ExchangeRates $result */
$rows = [];
foreach ($result->getItems() as $item) {
    $rows[] = [
        'currency' => $item->currency,
        'currencyIsoCode' => $item->currencyIsoCode,
        'rate' => $item->rate,
        'rateConvention' => $item->rateConvention,
        'referenceDate' => $item->referenceDate,
    ];
}

return response()->json(['rates' => $rows]);
```

An empty array is a possible result. Inspect the rate convention and reference date before applying a rate. Values remain strings; the package does not perform conversions, rounding or decimal arithmetic.

## Test with synthetic data

In a Laravel test, fake the request before calling the API class. This example uses an invented rate and makes no provider request:

```php
use Illuminate\Support\Facades\Http;
use OfflineAgency\LaravelBankOfItaly\Api\ExchangeRate;

Http::fake([
    '*' => Http::response(
        "currency,currencyIsoCode,currencyUicCode,rate,rateConvention,referenceDate\n"
        . "Synthetic dollar,USD,001,1.2345,synthetic units per base unit,2026-01-02\n",
        200
    ),
]);

$result = (new ExchangeRate())->getExchangeRates([
    'startDate' => '2026-01-02',
    'endDate' => '2026-01-02',
]);

// $result->getItems()[0]->rate === '1.2345'
```

## Query parameters and defaults

`OfflineAgency\LaravelBankOfItaly\Api\ExchangeRate::getExchangeRates(array $query_params = [])` returns `Illuminate\Support\MessageBag`, `OfflineAgency\LaravelBankOfItaly\Entities\Error`, or `OfflineAgency\LaravelBankOfItaly\Entities\ExchangeRate\ExchangeRates`.

| Key | Local validation | Default when omitted |
| --- | --- | --- |
| `lang` | Nullable string; no local language allowlist | Configured `it` |
| `baseCurrencyIsoCode` | Nullable string; no local currency allowlist | Configured `USD` |
| `currencyIsoCode` | Nullable string, restricted to uppercase `EUR`, `USD`, `ITL` | Configured `EUR` |
| `startDate` | Nullable date in `Y-m-d` format | `Carbon::now()->subYear()`, formatted `Y-m-d` |
| `endDate` | Nullable date in `Y-m-d` format | `Carbon::now()`, formatted `Y-m-d` |

For example, use `2000-01-01`, not `01-01-2000`. Each missing or null date is computed independently using Carbon's current clock and application/default timezone. Omitting both dates requests a rolling year, not a calendar year. Pin both dates for reproducible jobs.

Call parameters override the configured query defaults, then computed dates override those merged values. Date keys added to `default_query_params` do not replace the date calculation. Unknown keys are silently filtered out; computed `startYear`, `startMonth`, `endYear` and `endMonth` are also filtered out and are not sent.

Explicit null for language or currency passes validation and replaces its configured default; it does not restore that default. Prefer omitting a key when you want its configured value. Configuration defaults are merged **after** validation, so validate any custom configuration yourself.

The package does not validate date order, restrict interval length, or verify whether a currency or language is supported upstream. Validate public input and bound date ranges in your application before calling the client. The [provider's REST instructions](https://tassidicambio.bancaditalia.it/terzevalute-wf-ui-web/assets/files/Operating_Instructions.pdf) describe the endpoint's parameters and upstream constraints, including ordered dates. Local validation can be stricter or looser than provider validation.

## Returned entities

On HTTP status **exactly 200**, `ExchangeRates` parses the response body and exposes `getItems(): array`. Each item is `OfflineAgency\LaravelBankOfItaly\Entities\ExchangeRate\ExchangeRate`, with six public string properties:

| Property | Meaning |
| --- | --- |
| `currency` | Currency label from the response |
| `currencyIsoCode` | Currency ISO code from the response |
| `currencyUicCode` | Currency UIC code from the response |
| `rate` | Rate text |
| `rateConvention` | Quotation convention text |
| `referenceDate` | Reference date text |

The parser assigns these fields by column position. It does not validate their content, normalize dates, cast rates, or retain other columns. `referenceDate` is returned as received; the `Y-m-d` request validation does not enforce the response's date format.

`ExchangeRates::__construct(string $body)` and `setItems(string $body): void` both parse a body; `setItems()` replaces the existing items. `Error` exposes `getError(): string` and `setError(string $error): void` for the raw response body.

## Errors and transport behavior

| Situation | Behavior in 1.0.1 |
| --- | --- |
| Invalid supplied query | Returns `MessageBag`; sends no HTTP request |
| HTTP status other than 200, including 204 | Returns `Error` containing only the raw body |
| HTTP 200 | Parses body as comma-separated text without checking content type |
| Connection failure or timeout from Laravel's HTTP client | Exception propagates; it is not converted into `Error` |

The implementation issues `Http::get()` with the configured URL and filtered query. It adds no authentication, custom headers, explicit `Accept` header, timeout setting, retry loop, cache or pagination. Transport defaults come from the installed Laravel HTTP client. There is no package API to retrieve an error's HTTP status or headers, and there are no per-call transport options. If your application needs retries or caching, implement those policies around this operation with bounded attempts and appropriate failure handling.

## Response-format limitations

The parser trims the whole body, discards the first line as a header, splits remaining lines by newline and fields by a literal comma, skips empty lines and rows with fewer than six fields, and uses only the first six fields. It is not a general CSV reader: quoted commas and embedded newlines are not handled, and a headerless response loses its first row. Individual values are not trimmed.

The provider documents content negotiation, but this release does not explicitly request CSV. A JSON body returned with status 200 can silently produce an empty result, and other unexpected bodies can be misread. An empty result alone therefore cannot distinguish no available rates from an incompatible response format. Confirm the provider response format in your deployment and monitor unexpected empty results. The isolated check below verifies parser behavior with synthetic bodies; it does not confirm today's live provider response.

Keep the endpoint URL in trusted server-side configuration. Do not let a browser request choose that URL or pass arbitrary configuration. Apply application-level authorization, date-range limits and usage controls to any public route. Treat remote labels and error bodies as untrusted text when rendering HTML.

## Verification and references

The [released implementation](https://github.com/offline-agency/laravel-bank-of-italy/blob/8b4ae70b92d0b802139138e70367d789d80251af/src/Api/ExchangeRate.php), [parser](https://github.com/offline-agency/laravel-bank-of-italy/blob/8b4ae70b92d0b802139138e70367d789d80251af/src/Entities/ExchangeRate/ExchangeRates.php) and [provider](https://github.com/offline-agency/laravel-bank-of-italy/blob/8b4ae70b92d0b802139138e70367d789d80251af/src/LaravelBankOfItalyServiceProvider.php) are the basis of this guide. A documentation fixture exercised the released source with PHP 8.1 and Illuminate 9 using HTTP fakes, covering query defaults, validation, result parsing, non-200 responses and connection exceptions. It made no requests to the Bank of Italy. This is not a full framework compatibility matrix or a run of the upstream test suite.

Consult the [Bank of Italy exchange-rate portal](https://www.bancaditalia.it/compiti/operazioni-cambi/portale-tassi/index.html?com.dotmarketing.htmlpage.language=1) and its [REST operating instructions](https://tassidicambio.bancaditalia.it/terzevalute-wf-ui-web/assets/files/Operating_Instructions.pdf) for data coverage, quotation conventions and provider behavior.

The package is MIT licensed: [license](https://github.com/offline-agency/laravel-bank-of-italy/blob/8b4ae70b92d0b802139138e70367d789d80251af/LICENSE.md). For contributions, read the [released contribution guide](https://github.com/offline-agency/laravel-bank-of-italy/blob/8b4ae70b92d0b802139138e70367d789d80251af/CONTRIBUTING.md).
