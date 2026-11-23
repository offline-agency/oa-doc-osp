---
title: Fatture in Cloud API v1 — historical integration
description: Historical package 2.2.8 for the retired Fatture in Cloud API v1; migration to API v2 is required.
packageVersion: "2.2.8"
sourceCommit: b37155297538fa3dcbbcb16d633d926091734690
packageStatus: historical-integration
gitName: laravel-fatture-in-cloud
---

# Fatture in Cloud API v1

::: danger Retired provider API — historical documentation
Fatture in Cloud announced that API v1 would be dismissed starting **31 January 2023**. This wrapper targets that retired service. Do not start a new integration with it or expect the historical calls below to work today. Read the [official retirement notice](https://developers.fattureincloud.it/blog/v1-deprecation/) and the [current API v2 wrapper guide](/laravel-fatture-in-cloud-v2/).
:::

## Selected release and scope

This reference records package **2.2.8** at [`b37155297538fa3dcbbcb16d633d926091734690`](https://github.com/offline-agency/laravel-fatture-in-cloud/tree/b37155297538fa3dcbbcb16d633d926091734690). GitHub release and Packagist source/dist metadata were matched on **16 October 2026**. Availability of the old package does not make the provider API available. The provider's retirement is separate from the repository's archival metadata; this page does not claim the repository is archived.

Its declared constraints are PHP `>=7.1`, `ext-json`, and Illuminate support/container `^5.8|^6.0|^7.0|^8.0|^9.0`. These historical constraints are not recommended platforms or a current tested support promise. Use a currently supported PHP/Laravel combination allowed by the replacement wrapper when migrating.

## Installation and setup

### Basic installation

For forensic reproduction of an existing legacy application only:

```sh
composer require offline-agency/laravel-fatture-in-cloud:2.2.8
php artisan vendor:publish --provider="OfflineAgency\FattureInCloud\FattureInCloudServiceProvider" --tag=config
```

The provider merges configuration under `fatture-in-cloud`, publishes **`config/fatture-in-cloud.php`** and auto-discovers the provider/facade. The previous `config/backup.php` instruction was copied from another package and was wrong.

### Configuration reference

| Key under `fatture-in-cloud` | Historical default / meaning |
| --- | --- |
| `api_uid` | `FATTURE_CLOUD_API_UID` |
| `api_key` | `FATTURE_CLOUD_API_KEY` |
| `endpoint` | `https://api.fattureincloud.it/v1/`, the retired API |
| `errors` | Mapping of old provider error codes to status/message metadata |
| `timeout-errors-codes` | `[2002]`, old throttle response code |
| `times` | `3`, retry ceiling used by the Auth instance |
| `sleep-seconds` | `5000000` in the config, but the tagged throttle path does not read this key |

See the exact [configuration](https://github.com/offline-agency/laravel-fatture-in-cloud/blob/b37155297538fa3dcbbcb16d633d926091734690/config/fatture-in-cloud.php) and [provider](https://github.com/offline-agency/laravel-fatture-in-cloud/blob/b37155297538fa3dcbbcb16d633d926091734690/src/FattureInCloudServiceProvider.php).

### Test environment

No live API v1 quickstart is offered: the upstream service was retired. Tests and payload validation can be studied in an isolated legacy application; do not put old production credentials into documentation examples. The historical suite has not been executed by this site change.

## Basic usage

The following is **historical application code**, for recognizing a legacy integration during migration. It is not a runnable current-service quickstart:

```php
use OfflineAgency\FattureInCloud\Entities\Clienti;

// Historical API v1 call only; do not run against today's provider service.
$clients = new Clienti();
$result = $clients->lista(['pagina' => 1]);
if (is_object($result) && ($result->success ?? null) === false) {
    // Legacy error object: inspect error and code in your migration tooling.
}
```

The constructor obtains UID/key from package configuration. Calls return decoded provider data, or legacy error objects with `success: false`, `error` and `code`; payload validation can throw before the request. Do not apply the API v2 wrapper's readonly Entity/Error types to this package. Its [Auth implementation](https://github.com/offline-agency/laravel-fatture-in-cloud/blob/b37155297538fa3dcbbcb16d633d926091734690/src/Auth.php) uses PHP stream requests, not the modern Laravel HTTP client.

## Entities and implemented API

| Historical area | Tagged classes / behavior |
| --- | --- |
| Account | `Entities\Account` and `Requests\Account` |
| Registry | `Clienti`, `Fornitori` inherit `Anagrafica`: `lista`, `nuovo`, `importa`, `modifica`, `elimina` |
| Products | `Entities\Prodotti` implements old product paths; inspect the actual methods rather than inferring behavior from names |
| Documents issued | `Fatture`, `Ndc`, `Ordini`, `Preventivi`, `Proforma`, `Rapporti`, `Ricevute`, `Ddt` and shared `Documenti` |
| Purchases | `Acquisti`, `OrdiniFornitori` |
| Compensation | `Corrispettivi` |
| Warehouse | `Magazzino` |
| Mail | `Mail` |

This is a historical code inventory, not proof of endpoint availability or full provider coverage. Refer to the pinned [Entities](https://github.com/offline-agency/laravel-fatture-in-cloud/tree/b37155297538fa3dcbbcb16d633d926091734690/src/Entities) and [Requests](https://github.com/offline-agency/laravel-fatture-in-cloud/tree/b37155297538fa3dcbbcb16d633d926091734690/src/Requests). `Prodotti::importa()` actually calls the old product-details path; do not infer batch import semantics from that name.

### Operational constraints

The old throttle path recognizes configured error code 2002, parses the Italian `Attendi … secondi` text and sleeps synchronously before retrying, up to the configured Auth-instance attempt ceiling. This is historical implementation behavior, not a current provider retry recommendation. The source includes fragile stream/header error handling; do not treat every transport failure as a reliable normalized result.

## Use cases and migration

Use this page to inventory legacy customer, product and invoice code, then implement the replacement against the current API. Old invoice-creation examples are intentionally not presented as working recipes.

The [official API migration guide](https://developers.fattureincloud.it/docs/api-v2-migration/) explains changes to authentication, HTTP methods, resources and payload shapes. API v1's per-company UID/key pair is not an API v2 bearer token. Renaming the Composer dependency alone does not migrate consent/token handling, field mappings, document calculations or endpoint behavior.

1. Inventory the old operations, credentials and persisted provider identifiers.
2. Establish the API v2 authentication/authorization flow and token ownership in your application.
3. Map old resources and payloads to the [released API v2 wrapper](/laravel-fatture-in-cloud-v2/) and verify which operations it actually implements.
4. Test success/error flows using HTTP fakes or a verified provider sandbox, then plan the application rollout separately.

For API v2 document downloads, URLs expire: the new guide explains re-fetching them rather than persisting them permanently. This site update does not migrate customer data or call the provider.

## Sources, support and historical links

[Release 2.2.8](https://github.com/offline-agency/laravel-fatture-in-cloud/releases/tag/2.2.8) · [Composer manifest](https://github.com/offline-agency/laravel-fatture-in-cloud/blob/b37155297538fa3dcbbcb16d633d926091734690/composer.json) · [MIT license](https://github.com/offline-agency/laravel-fatture-in-cloud/blob/b37155297538fa3dcbbcb16d633d926091734690/LICENSE.md) · [Contributing source](https://github.com/offline-agency/laravel-fatture-in-cloud/blob/b37155297538fa3dcbbcb16d633d926091734690/CONTRIBUTING.md).

Old links to invoice/customer/product recipes now land in this historical reference; they do not imply those calls still work. For package defects use its issue tracker without credentials/customer data; for provider API migration use the official developer support channel.

## Compatibility anchors

These anchors preserve historical links; read the status notice above before interpreting old examples.

<span id="laravel-fatture-in-cloud"></span>
<span id="entities"></span>
<span id="account"></span>
<span id="available-methods"></span>
<span id="registry"></span>
<span id="available-methods-2"></span>
<span id="products"></span>
<span id="documents-issued"></span>
<span id="available-methods-3"></span>
<span id="purchases"></span>
<span id="compensation"></span>
<span id="warehouse"></span>
<span id="mail"></span>
<span id="use-cases"></span>
<span id="create-an-invoice"></span>
<span id="update-a-customer"></span>
<span id="add-a-new-product"></span>
<span id="update-a-product-availability"></span>
<span id="roadmap"></span>
<span id="questions-issues"></span>
<span id="about-us"></span>
