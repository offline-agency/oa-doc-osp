---
title: Alternatives — checked 2026-10-15 — v4 · 4.1.0
description: >-
  Dated primary-source alternatives and boundaries for choosing a Laravel
  shopping cart.
packageVersion: 4.1.0
sourceCommit: b89d3219202703203453890e2e46467e79ad415d
permalink: /laravel-cart/v4/alternatives/
documentationSnapshot: true
documentationKey: v4
documentationChannel: stable
---

# Alternatives — checked 2026-10-15

Choose against application requirements. These are declared capabilities/metadata
from primary package listings, not comparative integration tests or benchmarks.
Only this repository's package is exercised by its test suite.

| Package | Evidence to evaluate |
| --- | --- |
| offline-agency/laravel-cart | This checkout: VAT amounts, once-per-row item coupons, cart coupons, session/database live storage and explicit snapshots. PHP 8.4/8.5 and Laravel 12/13 policy. Review tax/currency limits before choosing. |
| wearepixel/laravel-cart | [Package listing and source](https://packagist.org/packages/wearepixel/laravel-cart): 3.0.0 declares PHP >=8.3 and Illuminate 11/12/13; its documentation covers conditions, storage drivers and testing. Not installed/tested in this work. |
| hardevine/shoppingcart | [3.4 metadata/reference](https://packagist.org/packages/hardevine/shoppingcart) declares Illuminate support through Laravel 12; documents variants, tax rates and explicit database persistence. Not tested here. |
| darryldecode/cart | [Package listing/reference](https://packagist.org/packages/darryldecode/cart) documents cart conditions and session-oriented usage. Not tested here. |

For inventory/orders/payments or a global redemption ledger, evaluate a full commerce
framework or dedicated service instead of assuming a cart package provides those systems.
Recheck released metadata before adoption; do not infer performance or maintenance
commitments from this table. No install counts, production testimonials or rankings are claimed.

---

Imported from [docs/v4/alternatives.md](https://github.com/offline-agency/laravel-cart/blob/b89d3219202703203453890e2e46467e79ad415d/docs/v4/alternatives.md) at `b89d3219202703203453890e2e46467e79ad415d` (release `4.1.0`). Upstream [MIT license](https://github.com/offline-agency/laravel-cart/blob/b89d3219202703203453890e2e46467e79ad415d/LICENSE) retained in the frozen import.
