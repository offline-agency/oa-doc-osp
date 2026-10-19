---
title: Quick start and core operations — 4.0.3
description: 'Released Laravel Cart 4.0.3: quick start and core operations.'
permalink: /laravel-cart/4.0.3/quick-start/
packageVersion: 4.0.3
cartRelease: 4.0.3
sourceCommit: 60eb1006c9c2b31ff50cebd7b8b677a1dd16cc16
documentationSnapshot: true
---

# Quick start and core operations

Run these examples inside a Laravel request with a started session and the default zero VAT rate. They describe isolated carts, not production endpoints.

```php
use OfflineAgency\LaravelCart\Facades\Cart;

Cart::instance('shopping');
$item = Cart::add([
    'id' => 'shirt-42',
    'name' => 'Cotton shirt',
    'qty' => 2,
    'price' => 10.00,
    'options' => ['size' => 'M', 'color' => 'blue'],
]);

$rowId = $item->rowId;
Cart::count();       // 2 units
Cart::uniqueCount(); // 1 row
Cart::subtotal();    // 20.0 net
Cart::vat();         // 0.0
Cart::total();       // 20.0 gross

Cart::update($rowId, 3); // quantity becomes 3
Cart::get($rowId);       // CartItem
Cart::content();         // Collection of rows
Cart::remove($rowId);
Cart::isEmpty();         // true
```

## Product ID versus row ID

The product ID identifies your catalog product. The package derives `rowId` from product ID plus top-level sorted options. Same product/options can increase an existing row's quantity; different size/color options create distinct rows. Use the returned row ID for `get()`, `update()`, `remove()` and item coupons. Do not treat a browser-provided row ID as authorization.

`count()` sums quantities; `uniqueCount()` counts rows. Quantity entry points are not uniformly restricted to positive integers. Validate positive, bounded integers for countable products, or explicitly define a fractional-quantity policy in your app.

## Updates and repricing

```php
// Start with a fresh row if you followed the removal example above.
$item = Cart::add(['id' => 'shirt-42', 'name' => 'Cotton shirt', 'qty' => 1, 'price' => 10.0]);
$rowId = $item->rowId;
Cart::update($rowId, 2);
Cart::update($rowId, ['name' => 'Updated display name']);
Cart::update($rowId, 0); // removes the row; returns null
```

**4.0.3 limitation:** `update(['price' => ...])` and updating from a Buyable do not rebuild all gross, VAT and original-price fields. Do not use those calls as a complete repricing operation. Rebuild items from trusted catalog data under application-controlled serialization, preserving only fields your business rules permit. This multi-step application operation is not an atomic package guarantee. PR #50 changes this contract; it is not released.

`add()` also accepts multiple item arrays and returns a PHP array of CartItems. `addBatch()` returns a Collection. Do not infer all-or-nothing failure semantics for stable batch operations.

## Querying and clearing

```php
$blue = Cart::search(fn ($item, $rowId) => $item->options->get('color') === 'blue');
$rows = Cart::content()->values();
Cart::destroy(); // clears the current instance
```

`instance('wishlist')` selects another instance on the same scoped cart service. Select an instance explicitly at request boundaries, and restore the shopping instance after temporary operations. `sync()` matches product IDs rather than variant row IDs and primarily updates quantity; it is not a full financial reconciliation API.

## Metadata, cart options and memory snapshots

```php
use OfflineAgency\LaravelCart\Facades\Cart;

Cart::instance('shopping');
Cart::setMeta('delivery', ['note' => 'Side entrance']);
$note = Cart::getMeta('delivery.note', ''); // nested reads use data_get
$metadata = Cart::meta();
$export = Cart::snapshot(); // timestamp plus toArray(); no database write
Cart::forgetMeta('delivery');

Cart::setOptions(['channel' => 'web']);
$channel = Cart::getOptionsByKey('channel', 'web');
```

Metadata and cart options belong to the current instance; item variant options remain a separate concept. `setMeta()`/`forgetMeta()` operate on literal top-level keys, while `getMeta()` supports dotted reads. `snapshot()` returns an in-memory export including totals, items, coupons and metadata; it is not `store()` and creates no restorable database record. `destroy()` clears the current instance's items, cart coupons, metadata and cart options. Legacy `store()`/`restore()` can persist metadata if the snapshot table has its meta column, but do not persist cart options.

## Limits and synchronization

| Configuration | Stable behavior |
| --- | --- |
| `cart.limits.max_items` | Maximum distinct rows, not unit count |
| `cart.limits.max_qty_per_item` | Maximum quantity of the affected row (configured maximum is cast to int) |
| `cart.limits.max_total` | Maximum raw gross item total after item coupons, before cart coupons |
| `cart.limits.min_total` | Queried by `meetsMinimum()` against raw gross; not an automatic checkout rejection |

Null disables a limit. Add/update limit failures throw `CartLimitExceededException`. Validate positive quantities and perform checkout eligibility checks in the application. A caught failure does not establish atomic rollback of mutated objects or batches in 4.0.3.

`sync($items)` first removes rows whose product ID is absent, using strict ID comparison (`1` differs from `'1'`). It then updates only the quantity of the **first** row with each existing ID; other variants of that product remain. Existing names, prices and options are not replaced from the input. Missing IDs are added from the supplied fields, with omitted VAT defaulting to explicit zero on this path. It is neither variant reconciliation nor an all-or-nothing mutation.

## Scoped clients in workers

The provider registers both `cart` and `CartStorage` as scoped bindings, so Laravel's request/job lifecycle can rebuild state containing the selected instance, coupons and storage cache. Resolve Cart within each request or job; do not capture it in an application singleton or retain it across owners. A manually managed long-running loop must establish the correct Laravel scope/session/auth context itself. Session storage still needs the intended started session; scoped construction does not create a browser session or automatically transfer guest database rows at login.


---

Source contract: [released 4.0.3 at `60eb100`](https://github.com/offline-agency/laravel-cart/tree/60eb1006c9c2b31ff50cebd7b8b677a1dd16cc16). [Stable overview](/laravel-cart/4.0.3/) · [Unreleased preview](https://github.com/offline-agency/laravel-cart/pull/50) · [Historical site](/laravel-cart/legacy/).
