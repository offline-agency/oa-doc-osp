---
title: "Variants, wishlist and Buyable models"
description: "Released Laravel Cart 4.0.3: variants, wishlist and buyable models."
permalink: /laravel-cart/variants-and-wishlist/
packageVersion: "4.0.3"
cartRelease: "4.0.3"
sourceCommit: 60eb1006c9c2b31ff50cebd7b8b677a1dd16cc16
---

# Variants, wishlist and Buyable models

## Options identify variants

```php
use OfflineAgency\LaravelCart\Facades\Cart;

$medium = Cart::instance('shopping')->add([
    'id' => 'shirt', 'name' => 'Shirt', 'qty' => 1, 'price' => 20.0,
    'options' => ['size' => 'M', 'weight' => 0.25],
]);
$large = Cart::add([
    'id' => 'shirt', 'name' => 'Shirt', 'qty' => 2, 'price' => 20.0,
    'options' => ['size' => 'L', 'weight' => 0.25],
]);
// Distinct rowIds; count() = 3; uniqueCount() = 2; weight() = 0.75.
```

Derive allowed variant combinations and prices from your server catalog. Normalize option values consistently; row identity uses serialized options and only top-level key sorting. Name, price and associated model do not distinguish variants. Changing options can change the row ID and merge rows; use the returned updated item.

## Wishlist recipe

This is application scaffolding using stable public APIs, not a package-supplied wishlist UI or inventory workflow.

```php
Cart::instance('wishlist')->add([
    'id' => $product->getKey(),
    'name' => $product->name,
    'qty' => 1,
    'price' => (float) $product->price,
    'options' => ['size' => $validatedSize],
]);
Cart::instance('shopping');
```

To move a wishlist selection to shopping, authorize the selection and resolve its current catalog price, VAT, stock and options on the server; add a fresh shopping item and remove the wishlist row only after the add succeeds. The two operations are not an atomic transfer API in 4.0.3. Do not use `store()` / `restore()` as an implicit wishlist move.

## Eloquent Buyable

```php
use Illuminate\Database\Eloquent\Model;
use OfflineAgency\LaravelCart\CanBeBought;
use OfflineAgency\LaravelCart\Contracts\Buyable;

class Product extends Model implements Buyable
{
    use CanBeBought;
}
```

The trait reads model attributes such as `id`, `name`, `price`, `vat`, `cartOptions` and `weight`. It does not validate your catalog. The getter-only contract requires `getId()`, `getName(): string`, `getSubtitle(): string`, `getQty(): int`, `getPrice(): float`, `getTotalPrice(): float`, `getVat(): float`, `getUrlImg(): string`, `getOptions(): array`, `getWeight(): float`.

```php
$product->cartOptions = ['size' => $validatedSize, 'weight' => (float) $product->weight];
$item = Cart::instance('shopping')->add($product, 2);
// Argument two selects quantity (default 1), overriding getQty().
// The model is automatically associated.
```

Do not pass options as a positional third argument: v4's third parameter is `subtitle`. Supply model `getOptions()`/`cartOptions`, or an item array. Do not copy `getBuyableIdentifier()` contracts from other cart libraries.

A Buyable's `getVat()` returns a float. Zero means explicit zero VAT and does not trigger automatic default-rate tax. `Cart::weight()` uses `options['weight'] * qty`; it does not call `getWeight()` itself. Adopt one weight unit across your catalog.

For fiscal codes implement `FiscalBuyable`, which extends Buyable, with `getVatFcCode()` and `getProductFcCode()`; `Traits\HasFiscalCodes` can supply them. A plain Buyable produces empty fiscal codes. `associate($rowId, Product::class)` is model association, not ownership validation or a guarantee that catalog fields will refresh automatically.


---

Source contract: [released 4.0.3 at `60eb100`](https://github.com/offline-agency/laravel-cart/tree/60eb1006c9c2b31ff50cebd7b8b677a1dd16cc16). [Stable overview](/laravel-cart/) · [Unreleased preview](https://github.com/offline-agency/laravel-cart/pull/50) · [Historical site](/laravel-cart/legacy/).
