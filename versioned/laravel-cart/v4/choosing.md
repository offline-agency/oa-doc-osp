---
title: Choosing Laravel Cart — v4 · 4.1.0
description: 'Fit, limits and dated alternatives for Laravel Cart 4.1.0.'
packageVersion: 4.1.0
sourceCommit: b89d3219202703203453890e2e46467e79ad415d
permalink: /laravel-cart/v4/choosing/
documentationSnapshot: true
documentationKey: v4
documentationChannel: stable
---

# Choosing Laravel Cart

Laravel Cart fits Laravel applications that need cart rows, variants, VAT amounts, coupons and session or database persistence while keeping catalog, authorization and checkout logic in their own application. It does not provide a storefront, inventory reservation, orders or payments.

Start with PHP `~8.4.0 || ~8.5.0`, BCMath and Illuminate `^12.69.2 || ^13.32`:

```sh
composer require offline-agency/laravel-cart:4.1.0
```

See [installation](/laravel-cart/v4/installation/) for publishing configuration and the migrations appropriate to your chosen storage. Default session storage needs no package tables.

## Match the application to the package

| Application requirement | Package support and application work |
| --- | --- |
| A browser cart with size/color choices | Product id plus options distinguish rows. Validate variants against your own catalog; see [variants and wishlist](/laravel-cart/v4/variants-and-wishlist/). |
| Explicit VAT amounts and fiscal codes | Per-unit net/gross/VAT, tax breakdowns and fiscal fields. Decide tax eligibility and invoicing treatment in your application. |
| Saved carts across authenticated devices | Built-in database live storage selects the authenticated owner and instance. Publish its migrations; protect routes with authentication. |
| Livewire or Inertia storefront | Use server actions and fresh cart props; see [application scaffolding](/laravel-cart/v4/integrations/). Neither framework is a package dependency. |
| A mobile client | Implement authenticated endpoints and authorized serialization; see [API and mobile](/laravel-cart/v4/api-and-mobile/). |
| Redis infrastructure | Use [Laravel Redis-backed sessions](/laravel-cart/v4/redis-sessions/); `redis` is not a built-in cart storage driver. |

## Limits to resolve before adoption

Amounts are floats with configurable calculation rounding. BCMath is required for cart-coupon calculation; this does not make the public API an integer minor-unit or arbitrary precision money API. There is no built-in currency conversion or mixed-currency accounting. Cart-level coupons reduce the payable total without allocating their discount back into VAT buckets. Item coupons apply once per row, rather than once per unit. Confirm these semantics with your tax and checkout design; read [money and tax](/laravel-cart/v4/money-and-tax/) and [coupons](/laravel-cart/v4/coupons/).

Cart rows are purchase intent. Revalidate owner authorization, current catalog prices, variant availability, stock, tax and coupon eligibility before checkout; reserve inventory and create orders in your application. Global coupon redemption quotas, tax jurisdiction decisions and payment settlement are outside this package.

In 4.1.0, explicit array/Buyable updates recalculate net/VAT/gross while retaining row coupons, batches and sync stage logical mutations, and database package mutations lock before reading. The opt-in live database guest-transfer middleware handles login/session regeneration separately from saved snapshots. Older 4.0.x guidance that required an application lock solely to prevent lost package database adds does not describe 4.1.0. Application stock/order invariants still need their own concurrency design. See [storage](/laravel-cart/v4/storage/) and [authentication](/laravel-cart/v4/authentication/).

## Alternatives checked 2026-10-16

These are declared capabilities and release metadata from primary package listings, not comparative tests. Recheck Composer constraints before choosing; no performance, adoption or maintenance ranking is implied.

| Package | Evidence to evaluate |
| --- | --- |
| `offline-agency/laravel-cart` 4.1.0 | The source pinned here: VAT amounts, once-per-row coupons, cart coupons, session/database live carts and explicit snapshots. PHP 8.4/8.5; Laravel 12/13 at the floors above. |
| `wearepixel/laravel-cart` 3.0.0 | Its listing declares PHP `>=8.3` and Illuminate 11/12/13. Evaluate its documented conditions and storage model against your requirements. [Primary listing](https://packagist.org/packages/wearepixel/laravel-cart). |
| `hardevine/shoppingcart` 3.4 | Its listing declares Illuminate support through 12 and documents item options, tax rates and explicit database persistence. [Primary listing](https://packagist.org/packages/hardevine/shoppingcart). |
| `darryldecode/cart` 4.2.6 | Its listing declares PHP `>=7.3` and Illuminate support through 12; documentation covers conditions and session binding. [Primary listing](https://packagist.org/packages/darryldecode/cart). |

The alternatives were not installed or integration-tested for this guide. If you need an order/inventory/payment platform, evaluate a commerce framework or dedicated services as a separate decision.

Source: [4.1.0 installation contract](https://github.com/offline-agency/laravel-cart/blob/b89d3219202703203453890e2e46467e79ad415d/docs/v4/installation.md), [money/tax contract](https://github.com/offline-agency/laravel-cart/blob/b89d3219202703203453890e2e46467e79ad415d/docs/v4/money-and-tax.md), [mutation regressions](https://github.com/offline-agency/laravel-cart/blob/b89d3219202703203453890e2e46467e79ad415d/tests/Regression/MutationCorrectnessTest.php).
