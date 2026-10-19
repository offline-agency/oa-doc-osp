---
title: Installation and configuration — 4.0.3
description: 'Released Laravel Cart 4.0.3: installation and configuration.'
permalink: /laravel-cart/4.0.3/installation/
packageVersion: 4.0.3
cartRelease: 4.0.3
sourceCommit: 60eb1006c9c2b31ff50cebd7b8b677a1dd16cc16
documentationSnapshot: true
---

# Installation and configuration

## Exact requirements

| Dependency | Released 4.0.3 constraint |
| --- | --- |
| PHP | `~8.4.0 \|\| ~8.5.0` |
| Illuminate auth, console, contracts, database, events, http, session, support | `^12.69.2 \|\| ^13.32` |
| Carbon | `^3.8` |
| Termwind | `^2.3` |
| Symfony Translation | versions below `7.2` conflict |

Laravel 12.0, Laravel 10/11 and PHP 8.2/8.3 do not satisfy this release. BCMath is required for **cart-level coupon calculations** even though 4.0.3 Composer metadata omits the extension. Check the PHP runtime handling web requests and workers, not just your CLI.

```sh
composer require offline-agency/laravel-cart:4.0.3
php artisan vendor:publish --provider="OfflineAgency\LaravelCart\CartServiceProvider" --tag=config
```

Laravel auto-discovers the provider and `Cart` alias. Examples explicitly import `OfflineAgency\LaravelCart\Facades\Cart`. The default `session` driver needs a started Laravel session, normally the `web` middleware group; no cart database tables are needed for this path.

## Choose the migration set

| Tag | Purpose | When to publish |
| --- | --- | --- |
| `config` | `config/cart.php` | Configure the package |
| `cart-database-migrations` | Live `carts` and `cart_items` tables | Fresh database driver setup |
| `migrations` | Legacy `cart` snapshot table, coupons and meta columns | Fresh `store()` / `restore()` setup |
| `cart-legacy-column-migrations` | Coupons and meta additions to an existing legacy table | Upgrade an existing snapshot table after checking its columns |
| `laravel-cart-lang` | Translation overrides | Optional |

Do not publish every migration tag. Live storage and legacy snapshots are separate features. Configure `cart.database.connection`, table names and `cart.users.foreign_key`, `foreign_key_type` and `table` **before** publishing/running database migrations.

For a custom connection, use `php artisan migrate --database=your_connection` instead of the bare migration commands below, for both live tables and snapshots. The tagged migrations use the selected Artisan connection; setting `cart.database.connection` alone does not choose the migration connection.

Fresh live database setup:

```sh
php artisan vendor:publish --provider="OfflineAgency\LaravelCart\CartServiceProvider" --tag=cart-database-migrations
php artisan migrate
```

```dotenv
CART_STORAGE_DRIVER=database
```

Fresh legacy snapshot setup, only if your application calls `store()` / `restore()`:

```sh
php artisan vendor:publish --provider="OfflineAgency\LaravelCart\CartServiceProvider" --tag=migrations
php artisan migrate
```

For an existing snapshot table, inspect the migration history and columns, then publish only missing upgrades with `cart-legacy-column-migrations`. Do not recreate the existing table or rerun equivalent column migrations.

```sh
php artisan vendor:publish --provider="OfflineAgency\LaravelCart\CartServiceProvider" --tag=laravel-cart-lang
```

## Runtime configuration

`cart.tax.default_rate` is a percentage; `cart.tax.tax_behavior` is `inclusive` or `exclusive`. Default rate is zero and behavior inclusive. An explicitly supplied item `vat` is an **amount**, not that percentage.

`cart.format` controls decimals, decimal/thousands separators and rounding mode (default `PHP_ROUND_HALF_UP`). See the [coupon precision exception](/laravel-cart/4.0.3/money-and-tax/). Limits include `max_items`, `max_qty_per_item`, `max_total`, `min_total`; null disables each. Validate quantities and enforce your checkout minimum in the application too.

After environment/config changes, refresh your deployment's Laravel configuration cache in the normal way. Register optional cart middleware in your app explicitly; setting flags alone does not register it.


---

Source contract: [released 4.0.3 at `60eb100`](https://github.com/offline-agency/laravel-cart/tree/60eb1006c9c2b31ff50cebd7b8b677a1dd16cc16). [Stable overview](/laravel-cart/4.0.3/) · [Unreleased preview](https://github.com/offline-agency/laravel-cart/pull/50) · [Historical site](/laravel-cart/legacy/).
