---
title: "Usage"
description: "Executable Laravel Cart quick start with named arguments, repricing, row coupons and expected float totals."
packageVersion: "4.1.0"
sourceCommit: b89d3219202703203453890e2e46467e79ad415d
permalink: /laravel-cart/usage/
---

# Usage

> **Release 4.1.0.** This guide describes the selected `4.1.0` release, pinned below. **Since 4.1.0:** built-in atomic live mutations, repricing that preserves and reapplies item coupons, and opt-in live guest-cart transfer. These guarantees must not be assumed for the earlier 4.0.3 release. See [storage](/laravel-cart/storage/), [money and tax](/laravel-cart/money-and-tax/) and [authentication](/laravel-cart/authentication/). Public amounts remain floats; cart coupons do not allocate post-discount VAT per tax rate.

Use trusted server catalog data for amounts. Authorize the current owner and
revalidate catalog prices, tax eligibility and availability before checkout.
Never use a browser-submitted payable price.

Import `OfflineAgency\LaravelCart\Facades\Cart` in a Laravel application;
the executable example receives the resolved `OfflineAgency\LaravelCart\Cart` service.
Import `OfflineAgency\LaravelCart\CartCoupon` for the coupon class used below.

<!-- example:quick-start:start -->

```php
    $item = $cart->add(id: 1, name: 'Widget', qty: 2, price: 10.00, totalPrice: 12.20, vat: 2.20);
    $cart->addItemCoupon($item->rowId, 'ROW10', 'percentage', 10.0);
    $cart->update($item->rowId, ['price' => 20.00]);
    // Two units at 24.40, with 2.44 discounted once per row: 46.36.
    $cart->addCoupon(new CartCoupon(hash: 'welcome', code: 'WELCOME', type: 'fixed', value: 1.00));
    $payable = $cart->total(); // 45.36; item tax breakdown is before this cart coupon.
```

<!-- example:quick-start:end -->

Source: [examples/quick-start.php](https://github.com/offline-agency/laravel-cart/blob/b89d3219202703203453890e2e46467e79ad415d/examples/quick-start.php). Executed on both drivers
by [DocumentationExamplesTest](https://github.com/offline-agency/laravel-cart/blob/b89d3219202703203453890e2e46467e79ad415d/tests/Feature/DocumentationExamplesTest.php).

`add()` accepts named arguments, a Buyable, an attributes array or multiple arrays.
`addBatch()` is one logical operation. `update($rowId, $quantityOrAttributesOrBuyable)`
returns an item, or null on removal. `sync()` identifies rows by product id plus
sorted options, retains distinct variants and rejects duplicate row identities.
Adding more units to an existing row retains its base prices and coupons; explicitly update to reprice.
Existing rows in sync retain their prices and receive the supplied absolute quantity.
Use explicit `update()` to refresh catalog amounts.

Resource recipe (illustrative controller fragment):

```php
return new \OfflineAgency\LaravelCart\Resources\CartResource(app('cart'));
```

Blade recipe (illustrative): render `{{ $cart->numberFormat($cart->total(), 2, '.', ',') }}`
with `cart` supplied by the controller. In Livewire, authorize and load catalog data
inside the server action, then call `add()`; derive totals again during render.
In Inertia, return a CartResource as a page prop and reload it after the server mutation.
These optional frontend stacks are not runtime dependencies.

---

Imported from [docs/v4/usage.md](https://github.com/offline-agency/laravel-cart/blob/b89d3219202703203453890e2e46467e79ad415d/docs/v4/usage.md) at `b89d3219202703203453890e2e46467e79ad415d` (release `4.1.0`). Upstream [MIT license](https://github.com/offline-agency/laravel-cart/blob/b89d3219202703203453890e2e46467e79ad415d/LICENSE) retained in the frozen import.
