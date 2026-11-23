---
title: Laravel Fatture in Cloud API v2 — 3.0.1
description: >-
  Install and use release 3.0.1 of the Laravel wrapper for Fatture in Cloud API
  v2.
packageVersion: 3.0.1
sourceCommit: 04360c77c68e4d481f5a4943ffc2541f26b19767
gitName: laravel-fatture-in-cloud-v2
meta:
  - name: description
    content: >-
      Release 3.0.1 configuration, typed results, pagination and implemented API
      reference.
permalink: /laravel-fatture-in-cloud-v2/3.0.1/
documentationSnapshot: true
---

# laravel-fatture-in-cloud-v2

Use [Fatture in Cloud API v2](https://developers.fattureincloud.it/) from Laravel with `offline-agency/laravel-fatture-in-cloud-v2`. This page describes **package 3.0.1**, source [`04360c77`](https://github.com/offline-agency/laravel-fatture-in-cloud-v2/tree/04360c77c68e4d481f5a4943ffc2541f26b19767), checked on 16 October 2026. API v2 is the provider API generation; the package major is **3**. The [API v1 wrapper](/laravel-fatture-in-cloud/) is a separate package.

Start with [installation](#installation), [configuration](#configuration), the [safe quickstart](#usage-instructions-examples), or the [implemented API reference](#api-coverage).

## Installation

```bash
composer require offline-agency/laravel-fatture-in-cloud-v2:^3.0.1
php artisan vendor:publish --provider="OfflineAgency\LaravelFattureInCloudV2\LaravelFattureInCloudV2ServiceProvider"
```

Laravel discovers the service provider automatically. It merges `config/fatture-in-cloud-v2.php`, publishes it with the `config` tag, and binds the connector singleton and facade alias.

| Evidence | Compatibility |
| --- | --- |
| Released Composer requirements | PHP `^8.4`, `ext-json`, Guzzle `^7.9`; Illuminate container, HTTP and support `^11.0\|^12.0\|^13.0` |
| Released CI workflow matrix | PHP 8.4 / 8.5 with Laravel 11 / 12 / 13; matrix configuration is not proof that every run passed |
| Local documentation example verification | PHP 8.5.10, Laravel framework 13.2.0; HTTP fakes against the pinned release |
| Recommended framework choices on 16 October 2026 | Laravel 12 or 13, on a PHP version also supported by the framework |

Laravel 11 remains in the package constraint, but its security support ended **12 March 2026**. Check the [official Laravel support policy](https://laravel.com/docs/13.x/releases) before selecting a framework. Historical CI run results were not verified for this documentation; no full test coverage claim is made.

## Configuration

Set these exact default environment variables in the application environment:

```dotenv
FCV2_DEFAULT_ID=your-company-id
FCV2_DEFAULT_BEARER=your-access-token
```

`FCV2_DEFAULT_BEARER` is an API bearer access token. Registering an OAuth application and obtaining, refreshing and securely storing OAuth tokens belong to your application; this wrapper does not implement the OAuth authorization flow or automatic token refresh. Never expose the bearer token to a browser or commit it to source control.

The published `config/fatture-in-cloud-v2.php` can contain multiple companies:

```php
<?php

return [
    'baseUrl' => 'https://api-v2.fattureincloud.it/',
    'companies' => [
        'default' => [
            'id' => env('FCV2_DEFAULT_ID', ''),
            'bearer' => env('FCV2_DEFAULT_BEARER', ''),
        ],
        'branch' => [
            'id' => env('FCV2_BRANCH_ID', ''),
            'bearer' => env('FCV2_BRANCH_BEARER', ''),
        ],
    ],
    'limits' => ['default' => 300000, '403' => 300000, '429' => 3600000],
];
```

The branch variable names are application choices. Construct a connector, then pass it to the API class:

```php
use OfflineAgency\LaravelFattureInCloudV2\Api\Client;
use OfflineAgency\LaravelFattureInCloudV2\FattureInCloud;

$defaultClients = new Client();
$branchConnector = new FattureInCloud(companyName: 'branch');
$branchClients = new Client($branchConnector);
$explicitClients = new Client(new FattureInCloud(
    companyId: '123',
    accessToken: 'token-obtained-and-stored-by-your-application',
));
```

API constructors accept `?FattureInCloud`, not a company name string. The connector signature is `__construct(?string $companyId = null, ?string $accessToken = null, ?string $companyName = null)`. Explicit ID/token parameters override the resolved company values. Without a name, a non-empty `default` entry is selected, then the first configured entry. An unknown explicit company name resolves to empty values unless ID/token parameters override it; validate configuration before sending requests. The release does not reject empty credentials at construction.

## Features

### All

`all()` follows `next_page_url` and returns an array of entity objects or `Entities\Error`. It exists on `Client`, `Supplier`, `Product`, `IssuedDocument`, `ReceivedDocument`, `Receipt`, `Taxes`, `Archive` and `Cashbook`. `Cashbook::all()` may also return `MessageBag` for invalid date filters. Other list endpoints do not automatically gain `all()`.

```php
use OfflineAgency\LaravelFattureInCloudV2\Api\Client;
use OfflineAgency\LaravelFattureInCloudV2\Entities\Error;

$result = (new Client())->all(['per_page' => 50]);
if ($result instanceof Error) {
    throw new RuntimeException(json_encode($result->error));
}
foreach ($result as $client) {
    echo $client->name, PHP_EOL;
}
```

`all()` accumulates every page in memory, and follows server page links recursively. Prefer explicit pages for large datasets. Subsequent requests use the query parameters from `next_page_url`, filtered through each endpoint's allowlist. Do not assume the original filter survives if the server omits it from the next-page URL.

### Pagination

Paginated list results expose `getItems()`, `hasItems()` and `getPagination()`. Pagination metadata uses camelCase public readonly properties, including `currentPage`, `perPage`, `total`, `nextPageUrl` and `prevPageUrl`. Helpers include `isSinglePage()`, `hasNextPage()`, `hasPrevPage()`, `goToFirstPage()`, `goToLastPage()`, `goToNextPage()` and `goToPrevPage()`. Navigation returns a list, `Error`, or `null` when a URL is absent; some endpoint validation paths also yield `MessageBag`.

::: warning Company selection during pagination
In 3.0.1, navigation helpers construct a new API object using the default connector. They do not retain an explicitly selected company/token. For named companies, call `list()` again on the original API instance, preserving your filters and changing `page`, as below. `all()` uses the original instance.
:::

```php
use OfflineAgency\LaravelFattureInCloudV2\Api\Client;
use OfflineAgency\LaravelFattureInCloudV2\Entities\Error;
use OfflineAgency\LaravelFattureInCloudV2\FattureInCloud;

$clients = new Client(new FattureInCloud(companyName: 'branch'));
$filters = ['per_page' => 50];
$page = 1;
do {
    $result = $clients->list($filters + ['page' => $page]);
    if ($result instanceof Error) {
        throw new RuntimeException(json_encode($result->error));
    }
    foreach ($result->getItems() as $client) {
        echo $client->name, PHP_EOL;
    }
    $hasNextPage = $result->getPagination()->hasNextPage();
    $page++;
} while ($hasNextPage);
```

### Bin

For `IssuedDocument`, `ReceivedDocument` and `Taxes`, `bin(int $id)` looks up a deleted item. `binDetail(int $id, array $additionalData = [])` first calls `detail()`, falls back to `bin()` on error, and can follow a pro forma document's `merged_in` reference to the active merged document. Neither method restores a document. Check for `Error` before accessing the returned entity.

### Rate limit

::: warning Blocking retries in release 3.0.1
Every HTTP 403 or 429 triggers a sleep and a recursive repeat of the request. There is **no maximum retry count**, no exponential backoff and no `Retry-After` handling. A persistent authorization failure can keep a worker occupied indefinitely; writes are retried too. An outer retry counter cannot bound this internal recursion.
:::

Although the config comment labels values as milliseconds, `Api::waitThrottle()` passes the integer directly to PHP `usleep()`, which takes **microseconds**. The shipped 403 value `300000` therefore sleeps **0.3 seconds**, and 429 value `3600000` sleeps **3.6 seconds**. The `default` value is present but the response handler only invokes throttling for 403/429. Budget execution time externally (for example, a queue worker/process timeout), and arrange bounded retries and authorization-failure handling in application infrastructure or a reviewed package change. Do not run a persistent 403/429 test against the live API.

## Usage instructions & examples

API responses are typed entities with public readonly properties. For example, a client exposes `$client->id`, `$client->name`, `$client->vatNumber` and `$client->addressStreet`; it has no generic `getName()` or writable fields. Payload keys remain API snake_case (`vat_number`, `address_street`), wrapped in `['data' => [...]]` for create/edit operations. A locally valid body can still be rejected by the provider.

Check the result before reading properties or calling list methods:

| Result | Handling |
| --- | --- |
| Entity or endpoint-specific list | Read its declared properties or supported list methods |
| `OfflineAgency\LaravelFattureInCloudV2\Entities\Error` | Inspect public `$result->error` (provider error payload, possibly null) |
| `Illuminate\Support\MessageBag` | Local validation errors; use `all()` or `toJson()` |
| Delete success | Endpoint-specific string |

Transport failures can throw Laravel HTTP client exceptions; an `Error` check does not handle all network failures. `IssuedEInvoice::getXML()` declares `object`: it returns `Error` on HTTP failure and the internal `{success, data}` response object on success, rather than an XML entity. Check for `Error` before inspecting that response.

The following **test-only quickstart** uses fabricated data and Laravel HTTP fakes. Run it inside a Laravel test/bootstrap, or use `maintenance/fixtures/fic-v2` in a checkout of this documentation repository. It demonstrates list success, provider failure, local validation, create and edit without contacting Fatture in Cloud or creating invoices.

```php

use Illuminate\Support\Facades\Http;
use Illuminate\Support\MessageBag;
use OfflineAgency\LaravelFattureInCloudV2\Api\Client;
use OfflineAgency\LaravelFattureInCloudV2\Entities\Error;
use OfflineAgency\LaravelFattureInCloudV2\FattureInCloud;

// Synthetic responses only. Prevent accidental requests to any real API.
Http::preventStrayRequests();
Http::fakeSequence()
    ->push(['data' => [['id' => 101, 'name' => 'Example client']],
        'current_page' => 1, 'per_page' => 50, 'total' => 1,
        'next_page_url' => null])
    ->push(['error' => ['message' => 'Synthetic API failure']], 422)
    ->push(['data' => ['id' => 101, 'name' => 'Example client']])
    ->push(['data' => ['id' => 101, 'name' => 'Updated example']]);

$clients = new Client(new FattureInCloud('123', 'synthetic-token'));
$list = $clients->list(['per_page' => 50]);
if ($list instanceof Error) {
    throw new RuntimeException(json_encode($list->error));
}
echo $list->getItems()[0]->name, PHP_EOL;

$failure = $clients->detail(999);
if ($failure instanceof Error) {
    echo $failure->error->message, PHP_EOL;
}

$invalid = $clients->create([]);
if ($invalid instanceof MessageBag) {
    echo 'Local validation rejected missing data.name', PHP_EOL;
}

$created = $clients->create(['data' => ['name' => 'Example client']]);
if ($created instanceof MessageBag) {
    throw new RuntimeException($created->toJson());
}
if ($created instanceof Error) {
    throw new RuntimeException(json_encode($created->error));
}
$edited = $clients->edit($created->id, ['data' => ['name' => 'Updated example']]);
if ($edited instanceof MessageBag) {
    throw new RuntimeException($edited->toJson());
}
if ($edited instanceof Error) {
    throw new RuntimeException(json_encode($edited->error));
}
echo $edited->name, PHP_EOL;
```

The fixture checks the output and request count, so local validation is verified to send no HTTP request. Remove HTTP fakes only when integrating into your own deliberately configured application workflow.

### Document download URLs

Since **10 September 2025**, document URLs returned by the provider expire **seven days after retrieval**. Store the document ID and obtain a fresh URL when needed, rather than persisting a download URL forever. The provider recommends getting the document again or listing documents with appropriate response fields. For this wrapper, use supported `IssuedDocument::detail($id, ['fields' => 'id,url'])` or `list('invoice', ['fields' => 'id,url'])`, check for `Error`, then read the entity's `$url`. See the [official URL expiration notice](https://developers.fattureincloud.it/blog/url-expiration/).

## Api coverage

This reference lists public endpoint methods actually implemented in release 3.0.1. The provider's newer endpoints are not automatically available through the wrapper. All classes below are in `OfflineAgency\LaravelFattureInCloudV2\Api`; pass a shared `FattureInCloud` connector to select a company. `Error` means `Entities\Error`; `MessageBag` means `Illuminate\Support\MessageBag`. Entity aliases in signatures refer to the corresponding classes imported in each [released API source](https://github.com/offline-agency/laravel-fatture-in-cloud-v2/tree/04360c77c68e4d481f5a4943ffc2541f26b19767/src/Api).

### User

`Api\User`:

```text
userInfo(): UserEntity|Error
listCompanies(array $additionalData = []): CompanyList|Error
```

### Companies

`Api\Company`:

```text
detail(int $companyId, array $additionalData = []): CompanyEntity|Error
```

### Clients

`list()` and `all()` accept `fields`, `fieldset`, `sort`, `page`, `per_page`, `q`; `detail()` accepts `fields` and `fieldset`. Create/edit require `data.name`. The quickstart above covers both methods.

`Api\Client`:

```text
list(array $additionalData = []): ClientList|Error
all(array $additionalData = []): array|Error
detail(int $clientId, array $additionalData = []): ClientEntity|Error
delete(int $clientId): string|Error
create(array $body = []): ClientEntity|Error|MessageBag
edit(int $clientId, array $body = []): ClientEntity|Error|MessageBag
```

### Suppliers

Create/edit require `data.name`. List and all use the standard entity pagination filters.

`Api\Supplier`:

```text
list(array $additionalData = []): SupplierList|Error
all(array $additionalData = []): array|Error
detail(int $supplierId, array $additionalData = []): SupplierEntity|Error
delete(int $supplierId): string|Error
create(array $body = []): SupplierEntity|Error|MessageBag
edit(int $supplierId, array $body = []): SupplierEntity|Error|MessageBag
```

### Products

Create/edit require at least one of `data.name`, `data.code` or `data.description` under the released `required_without_all` rules. Stock movement methods are separate from product CRUD; do not assume stock movement lists implement the product pagination API.

`Api\Product`:

```text
list(array $additionalData = []): ProductList|Error
all(array $additionalData = []): array|Error
detail(int $productId, array $additionalData = []): ProductEntity|Error
delete(int $productId): string|Error
create(array $body = []): ProductEntity|Error|MessageBag
edit(int $productId, array $body = []): ProductEntity|Error|MessageBag
listStockMovements(int $productId, array $additionalData = []): StockMovementList|Error
createStockMovement(int $productId, array $body = []): StockMovement|Error|MessageBag
deleteStockMovement(int $productId, int $stockMovementId): string|Error
editStockMovement(int $productId, int $stockMovementId, array $body = []): StockMovement|Error|MessageBag
```

### Issued Documents

`list()` and `all()` require a document type (for example `invoice` or `quote`); detail accepts `fields`/`fieldset`. Create requires `data.type` from `DOCUMENT_TYPES` and `data.entity.name`; edit requires `data.entity.name`. Create/edit take a body array, not an entity instance. Optional `data.date` / `data.due_date` are normalized. Attachment calls require `filename` and `attachment`. See the download URL lifecycle above.

`Api\IssuedDocument`:

```text
list(string $type, ?array $additional_data = []): IssuedDocumentList|Error
all(string $type, ?array $additional_data = []): array|Error
detail(int $document_id, ?array $additional_data = []): IssuedDocumentEntity|Error
bin(int $document_id): IssuedDocumentEntity|Error
delete(int $document_id): string|Error
create(array $body = []): IssuedDocumentEntity|Error|MessageBag
edit(int $document_id, array $body = []): IssuedDocumentEntity|Error|MessageBag
getNewTotals(array $body): IssuedDocumentTotals|Error|MessageBag
getExistingTotals(int $document_id, array $body = []): IssuedDocumentTotals|Error|MessageBag
preCreateInfo(string $type): IssuedDocumentPreCreateInfo|Error
emailData(int $document_id): IssuedDocumentEmail|Error
attachment(array $body = []): IssuedDocumentAttachment|Error|MessageBag
deleteAttachment(int $document_id): string|Error
scheduleEmail(int $document_id, array $body = []): IssuedDocumentScheduleEmail|Error|MessageBag
binDetail(int $document_id, ?array $additional_data = []): IssuedDocumentEntity|Error
```

### Issued e-invoice

`Api\IssuedEInvoice`:

```text
send(int $documentId, array $body = []): IssuedEInvoiceSend|Error
verifyXML(int $documentId): IssuedEInvoiceVerifyXML|Error
getXML(int $documentId, array $additionalData = []): object
getRejectionReason(int $documentId): IssuedEInvoiceRejectionReason|Error
```

### Received Documents

Create requires `data.type` from `ReceivedDocument::DOCUMENT_TYPES` and `data.entity.name`; edit requires `data.entity.name`. Optional `data.date` and `data.due_date` are normalized to `Y-m-d`. List/all require the type as their first string argument and accept an optional query array.

`Api\ReceivedDocument`:

```text
list(string $type, array $additionalData = []): ReceivedDocumentList|Error
all(string $type, array $additionalData = []): array|Error
detail(int $documentId, array $additionalData = []): ReceivedDocumentEntity|Error
bin(int $documentId): ReceivedDocumentEntity|Error
delete(int $documentId): string|Error
create(array $body = []): ReceivedDocumentEntity|Error|MessageBag
edit(int $documentId, array $body = []): ReceivedDocumentEntity|Error|MessageBag
getNewTotals(array $body): ReceivedDocumentTotals|Error|MessageBag
getExistingTotals(int $documentId, array $body = []): ReceivedDocumentTotals|Error|MessageBag
preCreateInfo(string $type): ReceivedDocumentPreCreateInfo|Error
attachment(array $body = []): ReceivedDocumentAttachment|Error|MessageBag
deleteAttachment(int $documentId): string|Error
binDetail(int $documentId, array $additionalData = []): ReceivedDocumentEntity|Error
```

### Receipts

Create/edit use conditional `required_without_all` rules for date, type and payment account. Supply a provider-valid receipt body and use `preCreateInfo()` to inspect available setup; local validation alone does not establish provider validity. Dates, when present, use `Y-m-d`.

`Api\Receipt`:

```text
list(array $additionalData = []): ReceiptList|Error
all(array $additionalData = []): array|Error
detail(int $receiptId, array $additionalData = []): ReceiptEntity|Error
delete(int $receiptId): string|Error
create(array $body = []): ReceiptEntity|Error|MessageBag
edit(int $receiptId, array $body = []): ReceiptEntity|Error|MessageBag
preCreateInfo(): ReceiptPreCreateInfo|Error
monthlyTotals(string $type, string $year): array|Error|MessageBag
```

### Taxes

List/all require the type as their first string argument. Create requires `data.type` from `Taxes::DOCUMENT_TYPES`, `data.entity.name`, `data.due_date` in `Y-m-d`, numeric `data.amount` and `data.description`; edit requires `data.entity.name`, with optional due date normalization.

`Api\Taxes`:

```text
list(string $type, array $additionalData = []): TaxesList|Error
all(string $type, array $additionalData = []): array|Error
detail(int $documentId, array $additionalData = []): TaxesEntity|Error
bin(int $documentId): TaxesEntity|Error
delete(int $documentId): string|Error
create(array $body = []): TaxesEntity|Error|MessageBag
edit(int $documentId, array $body = []): TaxesEntity|Error|MessageBag
binDetail(int $documentId, array $additionalData = []): TaxesEntity|Error
attachment(array $body = []): TaxesAttachment|Error|MessageBag
deleteAttachment(int $documentId): string|Error
```

### Archive

The class is `Archive`, not `ArchiveDocument`. Create/edit require `data.date` in `Y-m-d`, `data.description` and `data.category`. `upload()` is separate from creating an archive record.

`Api\Archive`:

```text
list(array $additionalData = []): ArchiveList|Error
all(array $additionalData = []): array|Error
detail(int $archiveId, array $additionalData = []): ArchiveEntity|Error
delete(int $archiveId): string|Error
create(array $body = []): ArchiveEntity|Error|MessageBag
edit(int $archiveId, array $body = []): ArchiveEntity|Error|MessageBag
upload(array $body = []): \stdClass|Error|MessageBag
```

### Cashbook

The class is `Cashbook`, not `Cashbooks`. List/all require `date_from` and `date_to` in `Y-m-d`. Create/edit require `data.date`, `data.description`, `data.kind` (cashbook, issued_document, received_document, tax or receipt), and `data.payment_account_in`.

`Api\Cashbook`:

```text
list(array $additionalData = []): CashbookList|Error|MessageBag
all(array $additionalData = []): array|Error|MessageBag
detail(int $entryId, array $additionalData = []): CashbookEntity|Error
delete(int $entryId): string|Error
create(array $body = []): CashbookEntity|Error|MessageBag
edit(int $entryId, array $body = []): CashbookEntity|Error|MessageBag
```

### Info

Only the two methods below are implemented on `Info`. Existing entity classes for other provider info categories do not make those endpoints callable.

`Api\Info`:

```text
listVatTypes(?array $additional_data = []): InfoList|Error
listPaymentAccounts(?array $additional_data = []): InfoList|Error
```

### Settings

There is no general `Settings`/`Setting` API class in this release. Use the three classes below. VAT create/edit require `data.value`; payment account and payment method create/edit require `data.name`. Each supports list/detail/delete/create/edit, without paginated `all()`. Result properties include VAT `value`, `description`, `eInvoice`, `eiType`, `isDisabled`; account `name`, `type`, `iban`, `virtual`; method `name`, `type`, `isDefault`, `defaultPaymentAccount`, `details`.

`Api\VatType`:

```text
list(): VatTypeList|Error
detail(int $vatTypeId): VatTypeEntity|Error
delete(int $vatTypeId): string|Error
create(array $body = []): VatTypeEntity|Error|MessageBag
edit(int $vatTypeId, array $body = []): VatTypeEntity|Error|MessageBag
```

`Api\PaymentAccount`:

```text
list(): PaymentAccountList|Error
detail(int $paymentAccountId): PaymentAccountEntity|Error
delete(int $paymentAccountId): string|Error
create(array $body = []): PaymentAccountEntity|Error|MessageBag
edit(int $paymentAccountId, array $body = []): PaymentAccountEntity|Error|MessageBag
```

`Api\PaymentMethod`:

```text
list(): PaymentMethodList|Error
detail(int $paymentMethodId): PaymentMethodEntity|Error
delete(int $paymentMethodId): string|Error
create(array $body = []): PaymentMethodEntity|Error|MessageBag
edit(int $paymentMethodId, array $body = []): PaymentMethodEntity|Error|MessageBag
```

### Email

`Api\Email`:

```text
list(): EmailList|Error
```

### Situation

`Api\Situation`:

```text
getSituation(array $additionalData = []): SituationEntity|Error
```

### Price lists

`Api\PriceList`:

```text
list(): PriceListList|Error
detail(int $priceListId): PriceListEntity|Error
delete(int $priceListId): string|Error
create(array $body = []): PriceListEntity|Error|MessageBag
edit(int $priceListId, array $body = []): PriceListEntity|Error|MessageBag
```

### Webhooks

`Api\Webhook`:

```text
list(): WebhookSubscriptionList|Error
detail(string $subscriptionId): WebhookEntity|Error
delete(string $subscriptionId): string|Error
create(array $body = []): WebhookEntity|Error|MessageBag
edit(string $subscriptionId, array $body = []): WebhookEntity|Error|MessageBag
```

## Upgrading from older releases

Review the [pinned changelog](https://github.com/offline-agency/laravel-fatture-in-cloud-v2/blob/04360c77c68e4d481f5a4943ffc2541f26b19767/CHANGELOG.md) and your installed version before upgrading. Package 3 requires PHP 8.4+, changes API construction to connector injection, splits `Settings`/`Setting` into `VatType`, `PaymentAccount`, `PaymentMethod`, renames `ArchiveDocument` to `Archive` and `Cashbooks` to `Cashbook`, and returns readonly typed entities. Replace old property getters/mutations with actual readonly properties and send write payloads as arrays. Recheck error unions, pagination company selection, configured sleep units and OAuth token ownership. No standalone `UPGRADE` file exists at the pinned release; this page derives migration guidance from the changelog and source.

## Testing

Use Laravel `Http::fake()` with `preventStrayRequests()` for application tests. The quickstart above was executed against the pinned release with synthetic responses, including HTTP 422 and local validation. Package integration tests require separate credentials and were not run for this documentation. The documentation fixture does not claim to validate every provider schema or every package method.

## Contributing

Use the package [contribution guide](https://github.com/offline-agency/laravel-fatture-in-cloud-v2/blob/04360c77c68e4d481f5a4943ffc2541f26b19767/CONTRIBUTING.md) and [issue tracker](https://github.com/offline-agency/laravel-fatture-in-cloud-v2/issues) for wrapper changes.

## Security

Follow the package [security policy](https://github.com/offline-agency/laravel-fatture-in-cloud-v2/security/policy) for vulnerability reporting. Keep tokens and customer data out of logs and test fixtures.

## Credits

Maintained by [Offline Agency and contributors](https://github.com/offline-agency/laravel-fatture-in-cloud-v2/graphs/contributors).

## About us

[Offline Agency](https://offlineagency.com/) builds and maintains this integration.

## License

Released under the [MIT license](https://github.com/offline-agency/laravel-fatture-in-cloud-v2/blob/04360c77c68e4d481f5a4943ffc2541f26b19767/LICENSE.md).
