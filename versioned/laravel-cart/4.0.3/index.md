---
title: Laravel Cart — stable 4.0.3
description: 'Released Laravel Cart 4.0.3: laravel cart — stable 4.0.3.'
permalink: /laravel-cart/4.0.3/
packageVersion: 4.0.3
cartRelease: 4.0.3
sourceCommit: 60eb1006c9c2b31ff50cebd7b8b677a1dd16cc16
documentationSnapshot: true
---

# Laravel Cart

A server-side shopping cart for Laravel, with session or database persistence, product variants, coupons and VAT fields. **This is the released package 4.0.3 guide.** The version number refers to the PHP package.

[Release 4.0.3](https://github.com/offline-agency/laravel-cart/releases/tag/4.0.3) · [Packagist](https://packagist.org/packages/offline-agency/laravel-cart) · [Unreleased PR #50 preview](https://github.com/offline-agency/laravel-cart/pull/50) · [Historical documentation](/laravel-cart/legacy/)

::: warning Checkout and tax boundary
Cart-level coupons reduce the payable total but are **not allocated into VAT**. `vatBreakdown()` describes amounts before cart-level discounts. The package is not a certified tax engine, payment gateway, inventory reservation system or exact multi-currency ledger. Recheck prices, tax treatment, stock and coupon eligibility against your trusted server catalog before checkout.
:::

## Overview

[Historical overview section](/laravel-cart/legacy/#overview).

Use it for guest session carts, authenticated database carts, separate wishlist instances and JSON-backed application interfaces. Your application supplies the catalog, authorization, checkout and UI. No Livewire, Inertia, Vue or AI dependency is required by the PHP package.

## Installation

[Historical installation section](/laravel-cart/legacy/#installation).

The exact constraints are PHP `~8.4.0 || ~8.5.0` and Illuminate components `^12.69.2 || ^13.32`. Enable BCMath when using cart-level coupons; 4.0.3 calls it at runtime although Composer does not declare `ext-bcmath`.

```sh
composer require offline-agency/laravel-cart:4.0.3
```

This command pins the contract described here. Evaluate later release notes before changing your constraint. See [installation and migration choices](/laravel-cart/4.0.3/installation/).

## Start here

| Goal | Guide |
| --- | --- |
| Add, update and remove products | [Quick start](/laravel-cart/4.0.3/quick-start/) |
| Sizes, wishlist and Eloquent models | [Variants and Buyable](/laravel-cart/4.0.3/variants-and-wishlist/) |
| Net/gross, VAT, coupons and rounding | [Money and tax](/laravel-cart/4.0.3/money-and-tax/) |
| Ownership, sessions, database and snapshots | [Storage](/laravel-cart/4.0.3/storage/) |
| Login and guest carts | [Authentication](/laravel-cart/4.0.3/authentication/) |
| JSON resources, mobile, Livewire and Inertia | [Integration recipes](/laravel-cart/4.0.3/integrations/) |
| Upgrade existing applications | [Upgrade guide](/laravel-cart/4.0.3/upgrading/) |
| Methods, events and errors | [Full reference](/laravel-cart/4.0.3/reference/) |
| Diagnose limitations and contribute | [Troubleshooting and support](/laravel-cart/4.0.3/support/) |
| Old inbound links | [Route and anchor map](/laravel-cart/url-migration/) |

## Release availability

PR #50 remains open at `131f2e6e00522f97c8f85adf18d3469cf4de527b`, verified 16 October 2026. Its corrected repricing, atomic mutation guarantees and explicit opt-in guest transfer are **unreleased**, and absent from 4.0.3. Read them only in the [preview](https://github.com/offline-agency/laravel-cart/pull/50). A merge alone does not make those features available through Composer.


---

Source contract: [released 4.0.3 at `60eb100`](https://github.com/offline-agency/laravel-cart/tree/60eb1006c9c2b31ff50cebd7b8b677a1dd16cc16). [Stable overview](/laravel-cart/4.0.3/) · [Unreleased preview](https://github.com/offline-agency/laravel-cart/pull/50) · [Historical site](/laravel-cart/legacy/).

## Historical links

Old anchors below lead to the archived explanation; they do not redefine historical APIs as v4 APIs.

<span id="usage"></span>

[Historical: usage](/laravel-cart/legacy/#usage).

<span id="cart-add"></span>

[Historical: cart add](/laravel-cart/legacy/#cart-add).

<span id="cart-update"></span>

[Historical: cart update](/laravel-cart/legacy/#cart-update).

<span id="cart-remove"></span>

[Historical: cart remove](/laravel-cart/legacy/#cart-remove).

<span id="cart-get"></span>

[Historical: cart get](/laravel-cart/legacy/#cart-get).

<span id="cart-content"></span>

[Historical: cart content](/laravel-cart/legacy/#cart-content).

<span id="cart-destroy"></span>

[Historical: cart destroy](/laravel-cart/legacy/#cart-destroy).

<span id="cart-total"></span>

[Historical: cart total](/laravel-cart/legacy/#cart-total).

<span id="cart-vat"></span>

[Historical: cart vat](/laravel-cart/legacy/#cart-vat).

<span id="cart-subtotal"></span>

[Historical: cart subtotal](/laravel-cart/legacy/#cart-subtotal).

<span id="cart-count"></span>

[Historical: cart count](/laravel-cart/legacy/#cart-count).

<span id="cart-search"></span>

[Historical: cart search](/laravel-cart/legacy/#cart-search).

<span id="collections"></span>

[Historical: collections](/laravel-cart/legacy/#collections).

<span id="instances"></span>

[Historical: instances](/laravel-cart/legacy/#instances).

<span id="models"></span>

[Historical: models](/laravel-cart/legacy/#models).

<span id="database"></span>

[Historical: database](/laravel-cart/legacy/#database).

<span id="configuration"></span>

[Historical: configuration](/laravel-cart/legacy/#configuration).

<span id="storing-the-cart"></span>

[Historical: storing the cart](/laravel-cart/legacy/#storing-the-cart).

<span id="restoring-the-cart"></span>

[Historical: restoring the cart](/laravel-cart/legacy/#restoring-the-cart).

<span id="add-a-coupon-to-cart-instance-for-a-specific-cart-item"></span>

[Historical: add a coupon to cart instance for a specific cart item](/laravel-cart/legacy/#add-a-coupon-to-cart-instance-for-a-specific-cart-item).

<span id="exceptions"></span>

[Historical: exceptions](/laravel-cart/legacy/#exceptions).

<span id="events"></span>

[Historical: events](/laravel-cart/legacy/#events).

<span id="example"></span>

[Historical: example](/laravel-cart/legacy/#example).

<span id="testing"></span>

[Historical: testing](/laravel-cart/legacy/#testing).

<span id="contributing"></span>

[Historical: contributing](/laravel-cart/legacy/#contributing).

<span id="security"></span>

[Historical: security](/laravel-cart/legacy/#security).

<span id="credits"></span>

[Historical: credits](/laravel-cart/legacy/#credits).

<span id="about-us"></span>

[Historical: about us](/laravel-cart/legacy/#about-us).

<span id="license"></span>

[Historical: license](/laravel-cart/legacy/#license).
