---
title: "Laravel Cart v4 — 4.1.0"
description: "Archived Laravel Cart v4 4.1.0 (commit b89d321, 2026-10-16): requirements, changes since 4.0.3 and the README shipped with the tag."
permalink: /laravel-cart/4.1.0/
packageVersion: "4.1.0"
sourceCommit: b89d3219202703203453890e2e46467e79ad415d
documentationSnapshot: true
documentationArchive: generated-tag
---
# Laravel Cart v4 4.1.0

This archived page describes tag `4.1.0` of [offline-agency/laravel-cart](https://github.com/offline-agency/laravel-cart). It is generated from the repository at that tag: the manifest, the history since the previous tag and the README shipped with the release. It is not a reviewed guide; read the [current documentation](/laravel-cart/) for the maintained release (4.2.0).

## Release

| Fact | Value |
| --- | --- |
| Tag | [4.1.0](https://github.com/offline-agency/laravel-cart/releases/tag/4.1.0) |
| Commit | [`b89d3219202703203453890e2e46467e79ad415d`](https://github.com/offline-agency/laravel-cart/tree/b89d3219202703203453890e2e46467e79ad415d) |
| Commit date | 2026-10-16 |
| Composer package | `offline-agency/laravel-cart` |
| Packagist | Version `4.1.0`, source reference matches this commit (checked 2026-11-23) |
| Declared license | MIT |

## Requirements

Declared in `composer.json` `require`:

- `php`: `~8.4.0 || ~8.5.0`
- `ext-bcmath`: `*`
- `illuminate/auth`: `^12.69.2 || ^13.32`
- `illuminate/console`: `^12.69.2 || ^13.32`
- `illuminate/contracts`: `^12.69.2 || ^13.32`
- `illuminate/database`: `^12.69.2 || ^13.32`
- `illuminate/events`: `^12.69.2 || ^13.32`
- `illuminate/http`: `^12.69.2 || ^13.32`
- `illuminate/session`: `^12.69.2 || ^13.32`
- `illuminate/support`: `^12.69.2 || ^13.32`
- `nesbot/carbon`: `^3.8`
- `nunomaduro/termwind`: `^2.3`

## Changes since 4.0.3

[Compare 4.0.3...4.1.0 on GitHub](https://github.com/offline-agency/laravel-cart/compare/4.0.3...4.1.0).

5 non-merge commits and 59 changed files.

Commits:

- `131f2e6` style: normalize database storage exception imports
- `e896729` docs: remove implementation records and stale links
- `ef5f199` ci: gate MySQL, examples and consumer checks with review evidence
- `171c3eb` docs: ship executable v4 reference and optional Boost integration
- `0fd5f5e` feat: coordinate atomic cart mutations and opt-in guest transfer

Changed files:

- modified `.github/workflows/ci.yml`
- added `AGENTS.md`
- modified `CHANGELOG.md`
- modified `CONTRIBUTING.md`
- added `IMPLEMENTATION_REPORT.it.md`
- modified `LARASTAN.md`
- modified `README.md`
- added `SECURITY.md`
- modified `UPGRADE.md`
- added `compose.test.yaml`
- modified `composer.json`
- modified `config/cart.php`
- added `docs/README.md`
- added `docs/v4/agents.md`
- added `docs/v4/alternatives.md`
- added `docs/v4/authentication.md`
- added `docs/v4/configuration.md`
- added `docs/v4/coupons.md`
- added `docs/v4/index.md`
- added `docs/v4/installation.md`
- added `docs/v4/money-and-tax.md`
- added `docs/v4/reference.md`
- added `docs/v4/storage.md`
- added `docs/v4/testing.md`
- added `docs/v4/troubleshooting.md`
- added `docs/v4/upgrading.md`
- added `docs/v4/usage.md`
- added `examples/quick-start.php`
- modified `phpstan.neon`
- added `resources/boost/guidelines/core.blade.php`
- added `resources/boost/skills/laravel-cart-development/SKILL.md`
- added `scripts/boost-smoke.php`
- added `scripts/consumer-smoke.mjs`
- added `scripts/docs.mjs`
- added `scripts/release-dry-run.mjs`
- added `scripts/test/docs.test.mjs`
- modified `src/Cart.php`
- modified `src/CartCoupon.php`
- modified `src/CartItem.php`
- added `src/Contracts/AtomicCartStorage.php`
- added `src/Events/GuestCartTransferFailed.php`
- added `src/Events/GuestCartTransferred.php`
- added `src/Exceptions/GuestCartTransferException.php`
- added `src/Http/Middleware/TransferGuestCart.php`
- modified `src/Storage/DatabaseStorage.php`
- modified `src/Storage/SessionStorage.php`
- added `src/Storage/StagedStorage.php`
- modified `src/Support/Coerce.php`
- modified `tests/Coverage/CartInspectCommandTest.php`
- added `tests/Feature/DocumentationExamplesTest.php`
- added `tests/Feature/GuestTransferPolicyTest.php`
- added `tests/Feature/GuestTransferTest.php`
- modified `tests/FeatureTestCase.php`
- added `tests/Fixtures/LegacyStorage.php`
- added `tests/Regression/CartReferenceOwnerTest.php`
- modified `tests/Regression/DatabaseStorageAtomicityTest.php`
- added `tests/Regression/MutationCorrectnessTest.php`
- added `tests/Regression/ServerConcurrencyTest.php`
- added `tests/Regression/SnapshotMutationAtomicityTest.php`

## README at 4.1.0

Shipped as [`README.md`](https://github.com/offline-agency/laravel-cart/blob/b89d3219202703203453890e2e46467e79ad415d/README.md). Headings are shifted one level, HTML markup is reduced to text and images, repository links are kept only when their target exists at this tag, and external links verified as unreachable are shown as text.

::: v-pre
### Laravel Cart

[![Packagist](https://img.shields.io/packagist/v/offline-agency/laravel-cart)](https://packagist.org/packages/offline-agency/laravel-cart)
[![CI](https://github.com/offline-agency/laravel-cart/actions/workflows/ci.yml/badge.svg)](https://github.com/offline-agency/laravel-cart/actions/workflows/ci.yml)
[![MIT](https://img.shields.io/packagist/l/offline-agency/laravel-cart)](https://github.com/offline-agency/laravel-cart/blob/b89d3219202703203453890e2e46467e79ad415d/LICENSE)

A Laravel shopping cart with VAT, row/cart coupons, session or database persistence,
API resources and testing helpers. Useful when your application owns its catalog and
checkout. For inventory, payments, shipping and order management, evaluate a full commerce framework.

Requires **PHP 8.4/8.5**, **BCMath** and **Laravel components ^12.69.2 or ^13.32**.
Composer enforces the exact requirements; PHP prereleases and Laravel 10/11 are excluded.

```sh
composer require offline-agency/laravel-cart
```

```php
use OfflineAgency\LaravelCart\Facades\Cart;

// Prices come from your trusted catalog, never from browser payable amounts.
$item = Cart::add(id: 1, name: 'Widget', qty: 2, price: 10.00, totalPrice: 12.20, vat: 2.20);
Cart::update($item->rowId, ['price' => 20.00]);
Cart::total(); // 48.80
```

See the [maintained v4 docs](https://github.com/offline-agency/laravel-cart/blob/b89d3219202703203453890e2e46467e79ad415d/docs/v4/index.md), [executable quick start](https://github.com/offline-agency/laravel-cart/blob/b89d3219202703203453890e2e46467e79ad415d/examples/quick-start.php),
[full reference](https://github.com/offline-agency/laravel-cart/blob/b89d3219202703203453890e2e46467e79ad415d/docs/v4/reference.md), [upgrade guide](https://github.com/offline-agency/laravel-cart/blob/b89d3219202703203453890e2e46467e79ad415d/UPGRADE.md) and [contributing](https://github.com/offline-agency/laravel-cart/blob/b89d3219202703203453890e2e46467e79ad415d/CONTRIBUTING.md).
The external documentation site is pending alignment with these sources.

Item coupons apply once per row. Cart coupons reduce payable total without a final VAT
allocation. Built-in live mutations stage changes and database operations lock the complete
read/modify/write boundary; [storage guarantees and custom-driver limits](https://github.com/offline-agency/laravel-cart/blob/b89d3219202703203453890e2e46467e79ad415d/docs/v4/storage.md)
explain their scope. [Guest transfer](https://github.com/offline-agency/laravel-cart/blob/b89d3219202703203453890e2e46467e79ad415d/docs/v4/authentication.md) is explicitly enabled;
legacy saved snapshots remain a separate mechanism.

#### Reference links

[Installation and publish tags](https://github.com/offline-agency/laravel-cart/blob/b89d3219202703203453890e2e46467e79ad415d/docs/v4/installation.md)

[Configuration](https://github.com/offline-agency/laravel-cart/blob/b89d3219202703203453890e2e46467e79ad415d/docs/v4/configuration.md)

[Usage](https://github.com/offline-agency/laravel-cart/blob/b89d3219202703203453890e2e46467e79ad415d/docs/v4/usage.md) · [Coupons](https://github.com/offline-agency/laravel-cart/blob/b89d3219202703203453890e2e46467e79ad415d/docs/v4/coupons.md) · [Storage](https://github.com/offline-agency/laravel-cart/blob/b89d3219202703203453890e2e46467e79ad415d/docs/v4/storage.md)

#### Credits and license

Maintained by Offline Agency. Original package credits and contributors are preserved
in the [expanded reference](https://github.com/offline-agency/laravel-cart/blob/b89d3219202703203453890e2e46467e79ad415d/docs/v4/reference.md). Released under the [MIT license](https://github.com/offline-agency/laravel-cart/blob/b89d3219202703203453890e2e46467e79ad415d/LICENSE).
:::
