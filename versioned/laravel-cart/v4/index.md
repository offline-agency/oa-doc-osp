---
title: Laravel Cart v4 — v4 · 4.1.0
description: >-
  Laravel 12/13 shopping cart for PHP 8.4/8.5: installation, VAT, coupons,
  persistent carts and released 4.1 guarantees.
packageVersion: 4.1.0
sourceCommit: b89d3219202703203453890e2e46467e79ad415d
permalink: /laravel-cart/v4/
documentationSnapshot: true
documentationKey: v4
documentationChannel: stable
---

# Laravel Cart v4

> **Release 4.1.0.** This guide describes the selected `4.1.0` release, pinned below. **Since 4.1.0:** built-in atomic live mutations, repricing that preserves and reapplies item coupons, and opt-in live guest-cart transfer. These guarantees must not be assumed for the earlier 4.0.3 release. See [storage](/laravel-cart/v4/storage/), [money and tax](/laravel-cart/v4/money-and-tax/) and [authentication](/laravel-cart/v4/authentication/). Public amounts remain floats; cart coupons do not allocate post-discount VAT per tax rate.

A Laravel shopping cart with VAT, item/cart coupons, session or database persistence,
resources and testing helpers. It fits applications that own their catalog and checkout.
Choose a full commerce framework when you also need inventory, orders, payments,
shipping or a redemption ledger. No production adoption or comparative performance is claimed.

- [Installation](/laravel-cart/v4/installation/) and [configuration](/laravel-cart/v4/configuration/)
- [Usage and executable example](/laravel-cart/v4/usage/), [full API reference](/laravel-cart/v4/reference/)
- [Money and tax](/laravel-cart/v4/money-and-tax/), [coupons](/laravel-cart/v4/coupons/)
- [Storage and atomic mutations](/laravel-cart/v4/storage/), [authentication](/laravel-cart/v4/authentication/)
- [Testing](/laravel-cart/v4/testing/), [upgrading](/laravel-cart/v4/upgrading/), [troubleshooting](/laravel-cart/v4/troubleshooting/)
- [Agent integration](/laravel-cart/v4/agents/), [dated alternatives](/laravel-cart/v4/alternatives/)

These pages document released Laravel Cart `4.1.0` from the pinned tag. The public documentation website is maintained separately from the package release.


- [Historical site documentation](/laravel-cart/legacy/)
- [Archived 4.0.3 release documentation](/laravel-cart/4.0.3/)
- [Site URL migration map](/laravel-cart/url-migration/)


## Install and try it

Requires PHP `~8.4.0 || ~8.5.0`, BCMath and Illuminate `^12.69.2 || ^13.32`.

```sh
composer require offline-agency/laravel-cart:4.1.0
```

In a configured Laravel application, use an isolated demo instance with synthetic trusted catalog values. The snippet below is extracted from the released executable example; its two-driver test verifies the expected total.

```php
use OfflineAgency\LaravelCart\CartCoupon;

$cart = app('cart')->instance('documentation-example');
$cart->destroy(); // Reset only this isolated demo instance.
$item = $cart->add(id: 1, name: 'Widget', qty: 2, price: 10.00, totalPrice: 12.20, vat: 2.20);
$cart->addItemCoupon($item->rowId, 'ROW10', 'percentage', 10.0);
$cart->update($item->rowId, ['price' => 20.00]);
// Two units at 24.40, with 2.44 discounted once per row: 46.36.
$cart->addCoupon(new CartCoupon(hash: 'welcome', code: 'WELCOME', type: 'fixed', value: 1.00));
$payable = $cart->total(); // 45.36; item tax breakdown is before this cart coupon.
```

[Executable example](https://github.com/offline-agency/laravel-cart/blob/b89d3219202703203453890e2e46467e79ad415d/examples/quick-start.php) · [Session and database assertions](https://github.com/offline-agency/laravel-cart/blob/b89d3219202703203453890e2e46467e79ad415d/tests/Feature/DocumentationExamplesTest.php)

## Choose a practical guide

- [Choosing Laravel Cart: fit, limitations and alternatives](/laravel-cart/v4/choosing/)
- [Product variants, wishlist and Buyable models](/laravel-cart/v4/variants-and-wishlist/)
- [Livewire and Inertia/Vue application scaffolding](/laravel-cart/v4/integrations/)
- [Authenticated API and mobile carts](/laravel-cart/v4/api-and-mobile/)
- [Redis-backed Laravel sessions versus a cart driver](/laravel-cart/v4/redis-sessions/)

---

Imported from [docs/v4/index.md](https://github.com/offline-agency/laravel-cart/blob/b89d3219202703203453890e2e46467e79ad415d/docs/v4/index.md) at `b89d3219202703203453890e2e46467e79ad415d` (release `4.1.0`). Upstream [MIT license](https://github.com/offline-agency/laravel-cart/blob/b89d3219202703203453890e2e46467e79ad415d/LICENSE) retained in the frozen import.
