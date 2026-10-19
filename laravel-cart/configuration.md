---
title: "Configuration"
description: "Laravel Cart configuration for drivers, owners, TTL, rounding, limits, events and guest transfer."
packageVersion: "4.1.0"
sourceCommit: b89d3219202703203453890e2e46467e79ad415d
permalink: /laravel-cart/configuration/
---

# Configuration

The canonical defaults are [config/cart.php](https://github.com/offline-agency/laravel-cart/blob/b89d3219202703203453890e2e46467e79ad415d/config/cart.php). Configure the
storage driver, connection, `carts_table`, `cart_items_table`, snapshot `table`,
user foreign key column/type, TTL in minutes, format decimals/rounding, tax defaults,
limits and optional guest transfer. Use distinct instances for distinct carts;
instances are not a currency conversion mechanism.

Tax defaults affect new rows without explicit VAT. Inclusive input is gross;
exclusive input is net. Explicit VAT bypasses these defaults. Updates with `price`
always mean net. See [money](/laravel-cart/money-and-tax/). `min_total` is a checkout predicate
(`meetsMinimum()`); maximum limits reject mutations.


## Released configuration defaults

This block is imported from the same release as this guide. Publish the config before changing application settings; configure owner schema before running its migrations. The [full API reference](/laravel-cart/reference/#configuration-reference) describes the related operations.

```php
<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Cart database settings
    |--------------------------------------------------------------------------
    |
    | Here you can set the connection that the shopping cart should use when
    | storing and restoring a cart.
    |
    */

    /*
    |--------------------------------------------------------------------------
    | Storage driver
    |--------------------------------------------------------------------------
    |
    | The driver used to store the active cart. Supported: "session", "database".
    |
    */

    'storage' => [

        'driver' => env('CART_STORAGE_DRIVER', 'session'),

    ],

    'database' => [

        'connection' => null,

        'table' => 'cart',

        'carts_table' => 'carts',

        'cart_items_table' => 'cart_items',

    ],

    /*
    |--------------------------------------------------------------------------
    | User foreign key configuration
    |--------------------------------------------------------------------------
    |
    | Column (and its type) holding the authenticated owner of a cart in the
    | "carts" table used by the database storage driver. Guest carts are
    | stored under the nullable "session_id" column instead.
    |
    */

    'users' => [

        'foreign_key' => 'user_id',

        'foreign_key_type' => 'unsignedBigInteger',

        'table' => 'users',

    ],

    /*
    |--------------------------------------------------------------------------
    | Destroy the cart on user logout
    |--------------------------------------------------------------------------
    |
    | When this option is set to 'true' the cart will automatically
    | destroy all cart instances when the user logs out.
    |
    */

    'destroy_on_logout' => false,

    /*
    |--------------------------------------------------------------------------
    | Legacy string events
    |--------------------------------------------------------------------------
    |
    | Besides the typed event classes (CartItemAdded, CartStored, ...) the cart
    | dispatches the v3 string events ('cart.added', 'cart.stored', ...).
    | Set this to 'false' to dispatch only the typed events.
    |
    */

    'use_legacy_events' => true,

    /*
    |--------------------------------------------------------------------------
    | Cart TTL (time to live)
    |--------------------------------------------------------------------------
    |
    | Number of minutes before a stored cart expires. null = no expiration.
    | Applies only to the database storage driver.
    |
    */

    'ttl' => null,

    /*
    |--------------------------------------------------------------------------
    | Middleware
    |--------------------------------------------------------------------------
    */

    'guest_transfer' => [
        'enabled' => false,
        'instances' => ['default'],
    ],

    'middleware' => [

        'merge_on_login' => false,

        'auto_restore' => false,

    ],

    /*
    |--------------------------------------------------------------------------
    | Default number format
    |--------------------------------------------------------------------------
    |
    | This defaults will be used for the formatted numbers if you don't
    | set them in the method call.
    |
    */

    'format' => [

        'decimals' => 2,

        'decimal_point' => '.',

        'thousand_separator' => ',',

        'rounding_mode' => PHP_ROUND_HALF_UP,

    ],

    /*
    |--------------------------------------------------------------------------
    | Tax configuration
    |--------------------------------------------------------------------------
    |
    | Configure the default tax behavior. The 'default_rate' is applied
    | automatically when no explicit VAT is provided. Set 'tax_behavior'
    | to 'inclusive' (EU: price includes tax) or 'exclusive' (US: tax on top).
    |
    */

    /*
    |--------------------------------------------------------------------------
    | Cart limits
    |--------------------------------------------------------------------------
    |
    | Configurable constraints on cart operations. Set to null to disable.
    |
    */

    'limits' => [

        'max_items' => null,

        'max_qty_per_item' => null,

        'max_total' => null,

        'min_total' => null,

    ],

    'tax' => [

        'default_rate' => 0.0,

        'tax_behavior' => 'inclusive',

        'fiscal_codes' => [
            'enabled' => false,
        ],

    ],
];
```

---

Imported from [docs/v4/configuration.md](https://github.com/offline-agency/laravel-cart/blob/b89d3219202703203453890e2e46467e79ad415d/docs/v4/configuration.md) at `b89d3219202703203453890e2e46467e79ad415d` (release `4.1.0`). Upstream [MIT license](https://github.com/offline-agency/laravel-cart/blob/b89d3219202703203453890e2e46467e79ad415d/LICENSE) retained in the frozen import.
