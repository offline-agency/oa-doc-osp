---
title: Variants, wishlist and Buyable models
description: Validated options, product identity, wishlist instances and the released 4.1.0 Buyable contract.
packageVersion: '4.1.0'
sourceCommit: b89d3219202703203453890e2e46467e79ad415d
---

# Variants, wishlist and Buyable models

Requires PHP 8.4/8.5, BCMath and supported Laravel 12/13 dependencies:

```sh
composer require offline-agency/laravel-cart:4.1.0
```

Default session storage needs no package tables. For database carts, [publish the live-cart migrations](/laravel-cart/installation/).

## Product id and row id are different

Use real server catalog product ids. A row id derives from the product id plus options; the same product in M and L is two rows. Do not invent string product ids to simulate variants. Normalize allowed options consistently: top-level keys are sorted for identity, but nested option structures are not recursively canonicalized. Name, amount and associated model do not distinguish rows.

Using the complete, authenticated synthetic catalog service from [integrations](/laravel-cart/integrations/#trusted-server-mutation), this server-side illustration adds two validated variants:

```php
use App\Services\DemoCart;
use OfflineAgency\LaravelCart\Cart;

$service = app(DemoCart::class);
$medium = $service->add(['product_id' => 101, 'size' => 'M', 'qty' => 1]);
$large = $service->add(['product_id' => 101, 'size' => 'L', 'qty' => 2]);
$cart = app(Cart::class)->instance('shopping');
// On an initially empty shopping cart:
$cart->count();       // 3 units
$cart->uniqueCount(); // 2 rows, though there is only one catalog product
$cart->content()->pluck('id')->unique()->count(); // 1 distinct product id
```

`update($rowId, ['options' => ...])` can change the row id and merge with an existing row. Resolve the original row from the current authorized owner's cart, validate its new variant and quantity, and use the returned item's row id. In 4.1.0, `sync()` preserves variants by product id plus options and rejects duplicate row identities. Existing sync rows receive absolute quantities while retaining their stored prices; use explicit updates to reprice.

## Wishlist instance

`instance()` switches the shared Cart object for later calls in the same request/job. Select the instance explicitly at each boundary. The package supplies instances, not wishlist UI or a stock workflow:

```php
use App\Services\DemoCart;
use OfflineAgency\LaravelCart\Cart;

$service = app(DemoCart::class);
$wish = $service->add(['product_id' => 101, 'size' => 'M', 'qty' => 1], 'wishlist');
app(Cart::class)->instance('shopping');
```

To move an existing selection, take its row id from the authenticated customer's wishlist and load fresh authorized catalog data. This application fragment uses the same synthetic service, which validates the product and variant again:

```php
use App\Services\DemoCart;
use OfflineAgency\LaravelCart\Cart;

abort_unless(auth()->check(), 401);
$cart = app(Cart::class);
$selection = $cart->instance('wishlist')->get($validatedRowId);
app(DemoCart::class)->add([
    'product_id' => $selection->id,
    'size' => $selection->options->size,
    'qty' => 1,
]);
$cart->instance('wishlist')->remove($selection->rowId);
$cart->instance('shopping');
```

Here `$validatedRowId` is an application-validated string from the request, used only to look up a row in the current owner's wishlist. Each mutation is atomic under the built-in 4.1.0 mutation contract, but the add-plus-remove sequence is not a package atomic transfer API. If removal fails after add, reconcile rather than blindly repeating the add; design idempotency/transaction behavior for your app. Do not use snapshot `store()`/`restore()` to imply a wishlist move.

## Buyable getters and model attributes

For an application Eloquent product model:

```php
<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use OfflineAgency\LaravelCart\CanBeBought;
use OfflineAgency\LaravelCart\Contracts\Buyable;

class Product extends Model implements Buyable
{
    use CanBeBought;
}
```

`CanBeBought` reads `getKey()` for the id; name falls back to title; subtitle falls back to description. It reads net `price`, per-unit `vat`, image fields, `cartOptions`, and `weight`; `getTotalPrice()` computes `getPrice() + getVat()`. Validate and authorize the product before adding it. The trait is not a catalog policy.

The getter-only `Buyable` interface requires `getId()` (documented `int|string`), `getName(): string`, `getSubtitle(): string`, `getQty(): int`, `getPrice(): float`, `getTotalPrice(): float`, `getVat(): float`, `getUrlImg(): string`, `getOptions(): array` and `getWeight(): float`. Setters are available on the trait but are not required by the interface. Do not copy another library's `getBuyableIdentifier()` contract; the similarly named trait methods are deprecated compatibility helpers.

After your application's policy and catalog validation have produced `$product`, `$validatedSize` and `$validatedQuantity`:

```php
use OfflineAgency\LaravelCart\Facades\Cart;

$product->setOptions(['size' => $validatedSize, 'weight' => (float) $product->weight]);
$item = Cart::instance('shopping')->add($product, $validatedQuantity);
```

The second argument selects quantity (default 1), overriding `getQty()`. Options must come from `getOptions()`/`cartOptions` or an item attributes array; the third positional parameter is `subtitle`, not options. Adding a Buyable automatically associates its model, but association does not authorize access or keep amounts synchronized with the catalog. Existing-row adds retain stored base prices; explicit Buyable/array `update()` reprices in 4.1.0 and retains row coupons.

`getVat()` returns an explicit float: zero VAT does not invoke the automatic default tax rate. `Cart::weight()` sums `options['weight'] * qty`; it does not call `getWeight()` automatically. Use one catalog weight unit. Implement `FiscalBuyable` for `getVatFcCode()` and `getProductFcCode()` if fiscal fields are required; a plain Buyable produces empty fiscal codes.

Recheck current authorization, variant availability, stock, prices, tax and coupons at checkout. The package reserves no inventory. Cart-level coupons are not allocated into VAT buckets, and amounts are floats; see [money and tax](/laravel-cart/money-and-tax/).

Source: [Buyable contract](https://github.com/offline-agency/laravel-cart/blob/b89d3219202703203453890e2e46467e79ad415d/src/Contracts/Buyable.php), [CanBeBought getters](https://github.com/offline-agency/laravel-cart/blob/b89d3219202703203453890e2e46467e79ad415d/src/CanBeBought.php), [variant and repricing regressions](https://github.com/offline-agency/laravel-cart/blob/b89d3219202703203453890e2e46467e79ad415d/tests/Regression/MutationCorrectnessTest.php), [options tests](https://github.com/offline-agency/laravel-cart/blob/b89d3219202703203453890e2e46467e79ad415d/tests/Feature/CartOptionsTest.php).
